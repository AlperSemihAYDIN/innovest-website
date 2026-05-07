'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionary';

interface AIChatProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

// ─── Knowledge Base ──────────────────────────────────────────────────────────
// Patterns are checked in order; first match wins.
// TR patterns must work with Turkish chars after message.toLowerCase().

// ─── Property Database (14 projects) ─────────────────────────────────────────
const LONDON_PROJECTS = [
  { name: 'Westminster Tower', developer: 'London Square', location: 'SE1, Zone 1', price: '£550,000', yield: '5.2%', highlight: 'Zone 1 konumu ve Thames manzarası güçlü ve istikrarlı kira talebi sağlıyor.' },
  { name: "Ransome's Wharf", developer: 'London Square', location: 'Battersea SW11', price: '£725,000', yield: '4.8%', highlight: 'Battersea nehir kenarında düşük arz ve üst segment kiracı profili öne çıkarıyor.' },
  { name: 'Woolwich Central', developer: 'London Square', location: 'SE18', price: '£380,000', yield: '5.5%', highlight: 'Elizabeth Line bağlantısı bu fiyat noktasında portföyün en iyi getiri/fiyat dengesini sunuyor.' },
  { name: 'Prince of Wales Drive', developer: 'Berkeley Group', location: 'Battersea SW11', price: '£850,000', yield: '4.5%', highlight: 'Battersea Park karşısında Berkeley Group kalitesi, uzun vadeli sermaye kazancı güçlü.' },
  { name: 'Sterling Place', developer: 'Barratt London', location: 'Tooting SW17', price: '£420,000', yield: '5.0%', highlight: 'Northern Line ile merkeze hızlı erişim, geniş ve istikrarlı kiracı tabanı.' },
  { name: 'White City Living', developer: 'Berkeley Group', location: 'W12', price: '£650,000', yield: '4.6%', highlight: "Westfield'a komşu 1400 konutluk master plan; altyapı yatırımları tamamlanmış, değer artışı süreci başlamış." },
];

const DUBAI_PROJECTS = [
  { name: 'Binghatti Flare', developer: 'Binghatti', location: 'Business Bay', price: '$380,000', yield: '8.5%', highlight: 'Dubai Kanalı manzarası ve Business Bay lokasyonu yüksek kira getirisini destekliyor.' },
  { name: 'The Alba', developer: 'Omniyat × Dorchester', location: 'Palm Jumeirah', price: '$1,200,000', yield: '7.2%', highlight: 'Dorchester Collection yönetiminde Palm Jumeirah ultra-premium segmenti.' },
  { name: 'Binghatti Aquarise', developer: 'Binghatti', location: 'Al Jaddaf', price: '$290,000', yield: '9.0%', highlight: 'Portföyde en düşük giriş fiyatıyla en yüksek getiri kombinasyonu.' },
  { name: 'Mercedes-Benz Places', developer: 'Binghatti', location: 'Downtown Dubai', price: '$750,000', yield: '7.5%', highlight: "Downtown'da 65 katlı ikonik kule; prestij ve talep daima yüksek." },
  { name: 'Belgrove Residences', developer: 'Ellington', location: 'JVC', price: '$350,000', yield: '8.2%', highlight: 'Ellington kalitesi ve JVC aile odaklı lokasyonu uzun vadeli kira istikrarı sağlıyor.' },
  { name: 'Solaya', developer: 'Meraas', location: 'Jumeirah', price: '$950,000', yield: '6.8%', highlight: 'Meraas geliştirmesi; Jumeirah sahil koridorunda kira talebi sürekli güçlü.' },
  { name: 'One River Point', developer: 'Ellington', location: 'Business Bay', price: '$620,000', yield: '7.8%', highlight: 'Business Bay kanal cephesi ve Ellington markasıyla kiracı profili üst segment.' },
  { name: 'Cala Del Mar', developer: 'Ellington', location: 'Al Marjan Island, RAK', price: '$474,000', yield: '9.0%', highlight: "Wynn Resort komşuluğu RAK'ı yeni destinasyon yapıyor; erken giriş avantajı belirgin." },
];

// ─── Conversation Context ────────────────────────────────────────────────────
interface ConvContext {
  location: 'london' | 'dubai' | null;
  budgetK: number | null;
  budgetCurrency: 'GBP' | 'USD' | null;
  goal: 'rental' | 'capital' | 'residency' | null;
  prevAskedFor: Set<string>;
}

function parseBudgetK(raw: string, suffix?: string): number {
  const n = parseFloat(raw.replace(/,/g, ''));
  const s = (suffix ?? '').toLowerCase();
  if (s === 'k' || s === 'bin') return n;
  if (s === 'm' || s === 'milyon') return n * 1000;
  return n >= 1000 ? n / 1000 : n;
}

function extractConvContext(history: Message[]): ConvContext {
  const ctx: ConvContext = { location: null, budgetK: null, budgetCurrency: null, goal: null, prevAskedFor: new Set() };
  for (const msg of history) {
    const lower = msg.content.toLowerCase();
    if (msg.role === 'user') {
      const hasLon = /londra|london/.test(lower);
      const hasDub = /dubai/.test(lower);
      if (hasLon && !hasDub) ctx.location = 'london';
      else if (hasDub && !hasLon) ctx.location = 'dubai';
      const mGBP = lower.match(/£\s*(\d[\d,.]+)\s*(k|bin|milyon|m)?/);
      const mUSD = lower.match(/\$\s*(\d[\d,.]+)\s*(k|bin|milyon|m)?/);
      const mBare = lower.match(/\b(\d[\d,.]+)\s*(k|bin)\b/);
      if (mGBP) { ctx.budgetK = parseBudgetK(mGBP[1], mGBP[2]); ctx.budgetCurrency = 'GBP'; }
      else if (mUSD) { ctx.budgetK = parseBudgetK(mUSD[1], mUSD[2]); ctx.budgetCurrency = 'USD'; }
      else if (mBare) { ctx.budgetK = parseBudgetK(mBare[1], mBare[2]); }
      if (/kira|getiri|rental|yield|passive/i.test(lower)) ctx.goal = 'rental';
      else if (/oturum|golden visa|vize|ikamet|residency/i.test(lower)) ctx.goal = 'residency';
      else if (/sermaye|capital growth/i.test(lower)) ctx.goal = 'capital';
    }
    if (msg.role === 'assistant') {
      if (/tercihli lokasyon|preferred market|her ikisi/i.test(lower)) ctx.prevAskedFor.add('location');
      if (/bütçe aralığınız|budget range/i.test(lower)) ctx.prevAskedFor.add('budget');
      if (/amacınız\?|your goal\?/i.test(lower)) ctx.prevAskedFor.add('goal');
    }
  }
  return ctx;
}

function filterByBudget(projects: typeof LONDON_PROJECTS, budgetK: number): typeof LONDON_PROJECTS {
  const max = budgetK * 1000 * 1.1;
  return projects.filter(p => {
    const m = p.price.match(/[\d,]+/);
    return m ? parseInt(m[0].replace(/,/g, '')) <= max : true;
  });
}

function findProjectByName(query: string): typeof LONDON_PROJECTS[0] | null {
  const q = query.toLowerCase().replace(/['']/g, '');
  const all = [...LONDON_PROJECTS, ...DUBAI_PROJECTS];
  return all.find(p => q.includes(p.name.toLowerCase().replace(/['']/g, ''))) || null;
}

function buildProjectBlock(
  projects: typeof LONDON_PROJECTS,
  locale: 'en' | 'tr',
  cityKey: 'london' | 'dubai'
): string {
  const tr = locale === 'tr';
  const cityLabel = tr ? (cityKey === 'london' ? 'Londra' : 'Dubai') : (cityKey === 'london' ? 'London' : 'Dubai');
  const linkPath = (tr ? '/tr' : '') + `/real-estate/${cityKey}`;
  const intro = tr ? `${cityLabel} portföyümden önerilerim:\n\n` : `My ${cityLabel} recommendations:\n\n`;
  const priceLabel = tr ? 'Fiyat' : 'Price';
  const yieldLabel = tr ? 'Getiri' : 'Yield';
  const linkLabel = tr ? `Tüm ${cityLabel} projelerini görüntüle` : `View all ${cityLabel} projects`;
  const list = projects.slice(0, 4).map(p =>
    `${p.name} — ${p.location}\n${priceLabel}: ${p.price}  |  ${yieldLabel}: ${p.yield}\n${p.highlight}`
  ).join('\n\n');
  return `${intro}${list}\n\n[${linkLabel}](${linkPath})`;
}

// ─── Smart Response (context-aware, full history) ─────────────────────────────
const PROJECT_NAME_RE = /westminster tower|ransome|woolwich central|prince of wales|sterling place|white city living|binghatti flare|the alba|binghatti aquarise|mercedes.?benz places|belgrove|solaya|one river point|cala del mar/i;

function getSmartResponse(text: string, locale: 'en' | 'tr', history: Message[]): string {
  const lower = text.toLowerCase();
  const tr = locale === 'tr';
  const ctx = extractConvContext([...history, { role: 'user', content: text }]);

  // 1. Specific project detail
  if (PROJECT_NAME_RE.test(lower)) {
    const project = findProjectByName(lower);
    if (project) {
      const isLon = LONDON_PROJECTS.some(p => p.name === project.name);
      const cityKey = isLon ? 'london' : 'dubai';
      const linkPath = (tr ? '/tr' : '') + `/real-estate/${cityKey}`;
      const cityLabel = tr ? (isLon ? 'Londra' : 'Dubai') : (isLon ? 'London' : 'Dubai');
      if (tr) return `${project.name}\nKonum: ${project.location}\nGeliştirici: ${project.developer}\nFiyat: ${project.price}\nGetiri: ${project.yield}\n${project.highlight}\n\nDanışmanlık için: info@innovest.uk  |  +44 7491 510941\n\n[Tüm ${cityLabel} Projeleri](${linkPath})`;
      return `${project.name}\nLocation: ${project.location}\nDeveloper: ${project.developer}\nPrice from: ${project.price}\nProjected yield: ${project.yield}\n${project.highlight}\n\nFor advisory: info@innovest.uk  |  +44 7491 510941\n\n[All ${cityLabel} Projects](${linkPath})`;
    }
  }

  // 2. Why did you recommend
  if (/neden.*önerd|neden.*tavsiye|neden bu|why.*recommend|why this/i.test(lower)) {
    const lastAi = [...history].reverse().find(m => m.role === 'assistant' && PROJECT_NAME_RE.test(m.content));
    if (lastAi) {
      const p = findProjectByName(lastAi.content);
      if (p) {
        if (tr) return `${p.name}'ı önerdim çünkü: ${p.highlight} Geliştirici ${p.developer} güçlü bir portföy geçmişine sahip. Bu lokasyon hem kira geliri hem uzun vadeli değer artışı açısından avantajlı.`;
        return `I recommended ${p.name} because: ${p.highlight} Developer ${p.developer} has a strong track record. The location offers good prospects for both rental income and capital appreciation.`;
      }
    }
    if (tr) return 'Hangi projeyi daha detaylı açıklamamı istersiniz?';
    return 'Which project would you like me to elaborate on?';
  }

  // 3. Greeting
  if (/merhaba|selam|günaydın|iyi günler|iyi akşam|nasılsın|hello|hi\b|good morning|good afternoon|good evening/i.test(lower)) {
    if (tr) return 'Merhaba, size nasıl yardımcı olabilirim?\n\n1. Londra veya Dubai\'de gayrimenkul yatırımı\n2. Yatırım yoluyla oturum izni\n3. Uluslararası iş geliştirme';
    return 'Hello, how can I help you today?\n\n1. Property investment in London or Dubai\n2. Residency by investment\n3. International business expansion';
  }

  // 4. Residency
  if (/oturum|golden visa|vize|ikamet|göç|pasaport|residence by invest/i.test(lower)) {
    if (tr) return 'Yatırım yoluyla oturum izni alınabilecek ülkeler:\n\nPortekiz: 500.000 EUR\'dan — Golden Visa\nYunanistan: 250.000 EUR\'dan — Golden Visa\nBirleşik Arap Emirlikleri: 2.000.000 AED\'dan — Golden Visa\nBirleşik Krallık: Innovator Vizesi — iş planı onayına tabi\n\nHer programın farklı avantajları ve aile dahil etme koşulları var. Hangi ülke sizi ilgilendiriyor?';
    return 'Countries offering residency through investment:\n\nPortugal: from EUR 500,000 — Golden Visa\nGreece: from EUR 250,000 — Golden Visa\nUAE: from AED 2,000,000 — Golden Visa\nUK: Innovator Visa — subject to business plan approval\n\nEach programme has different conditions and family inclusion options. Which country interests you?';
  }

  // 5. Business expansion
  if (/iş kur|partner bul|ticari bağlantı|firma kur|şirket kur|pazar.*giriş|iş.*genişlet|iş ortağı|business setup|set up.*business|market entry|expand.*business|distribüt/i.test(lower)) {
    if (tr) return 'Uluslararası iş geliştirme hizmetlerimiz:\n\n- Pazar giriş stratejisi (İngiltere, BAE, AB, ABD)\n- Partner ve distribütör eşleştirme\n- Şirket kurulumu ve yasal süreçler\n- Ticaret kolaylaştırma ve uyum danışmanlığı\n\nSektörünüze ve hedef pazarınıza özel strateji hazırlıyoruz. Hangi ülkede faaliyete geçmek istiyorsunuz?';
    return 'Our international business expansion services:\n\n- Market entry strategy (UK, UAE, EU, US)\n- Partner and distributor matching\n- Company formation and legal support\n- Trade facilitation and compliance advisory\n\nWe tailor strategies to your sector and target market. Which country are you considering?';
  }

  // 6. Contact
  if (/iletişim|randevu|görüşme|telefon|email|adres|ulaş|contact|appointment|phone|address/i.test(lower)) {
    if (tr) return 'Bize ulaşın:\n\nAdres: Berkeley Square House, Mayfair, Londra\nE-posta: info@innovest.uk\nTelefon (İngiltere): +44 7491 510941\nTelefon (BAE): +971 54 755 0101\nTelefon (Türkiye): +90 531 420 0331\n\nÜcretsiz danışmanlık için iletişim sayfamızı ziyaret edin.';
    return 'Get in touch:\n\nAddress: Berkeley Square House, Mayfair, London\nEmail: info@innovest.uk\nPhone (UK): +44 7491 510941\nPhone (UAE): +971 54 755 0101\nPhone (Turkey): +90 531 420 0331\n\nVisit our contact page to schedule a free consultation.';
  }

  // 7. Property recommendation
  const isPropertyIntent = /yatırım|gayrimenkul|emlak|mülk|proje|invest|property|real estate|apartment|development|öneri|tavsiye|öner|londra|london|dubai/i.test(lower);
  if (isPropertyIntent) {
    const hasLonInMsg = /londra|london/i.test(lower);
    const hasDubInMsg = /dubai/i.test(lower);
    const locFromMsg = hasLonInMsg && !hasDubInMsg ? 'london' : (!hasLonInMsg && hasDubInMsg ? 'dubai' : null);
    const loc = locFromMsg ?? ctx.location;

    if (loc === 'london') {
      let projects = [...LONDON_PROJECTS];
      if (ctx.budgetK && ctx.budgetCurrency === 'GBP') projects = filterByBudget(projects, ctx.budgetK);
      if (projects.length === 0) projects = LONDON_PROJECTS;
      return buildProjectBlock(projects, locale, 'london');
    }
    if (loc === 'dubai') {
      let projects = [...DUBAI_PROJECTS];
      if (ctx.budgetK && ctx.budgetCurrency === 'USD') projects = filterByBudget(projects, ctx.budgetK);
      if (projects.length === 0) projects = DUBAI_PROJECTS;
      return buildProjectBlock(projects, locale, 'dubai');
    }

    if (!ctx.prevAskedFor.has('location')) {
      const missing: string[] = [];
      if (!ctx.budgetK) missing.push(tr ? 'bütçe aralığınız (örn. £500K veya $300K)' : 'your budget range (e.g. £500K or $300K)');
      if (!ctx.goal) missing.push(tr ? 'amacınız: kira getirisi, sermaye kazancı veya oturum izni' : 'your goal: rental yield, capital growth, or residency');
      const extraLines = missing.length ? '\n' + missing.map(m => `- ${m}`).join('\n') : '';
      if (tr) return `Size en uygun projeleri belirleyebilmem için birkaç bilgiye ihtiyacım var:\n\n- Tercihli lokasyon: Londra, Dubai veya her ikisi${extraLines}\n\nBu bilgileri paylaşırsanız doğrudan öneri yaparım.`;
      return `To find the right investment for you, I need a few details:\n\n- Preferred market: London, Dubai, or open to both${extraLines}\n\nShare these and I'll come back with a tailored shortlist.`;
    }
    if (tr) return 'Londra mı, Dubai mi — ya da her ikisi de değerlendirilebilir mi?';
    return 'London or Dubai — or are you open to both?';
  }

  // 8. Yield / budget without explicit property intent
  if (/getiri|yield|kira.*gelir|bütçe|budget|fiyat|ne kadar|kaç para/i.test(lower)) {
    if (ctx.location === 'london') return buildProjectBlock(LONDON_PROJECTS, locale, 'london');
    if (ctx.location === 'dubai') return buildProjectBlock(DUBAI_PROJECTS, locale, 'dubai');
    if (tr) return 'Portföyümüzdeki getiri aralıkları:\n\nLondra: %4.5 – %5.5\nDubai: %6.8 – %9.0\n\nEn yüksek getirili projeler Dubai tarafında yer alıyor. Hangi pazarı tercih edersiniz — Londra mı, Dubai mi?';
    return 'Yield ranges across our portfolio:\n\nLondon: 4.5% – 5.5%\nDubai: 6.8% – 9.0%\n\nHighest yielding projects are in Dubai. Which market do you prefer — London or Dubai?';
  }

  // 9. Fallback
  if (tr) return 'Bu konuda size en doğru bilgiyi danışmanlarımız verebilir.\n\ninfo@innovest.uk  |  +44 7491 510941\n\nYa da şu konulardan birinde yardımcı olabilirim:\n\n1. Londra veya Dubai\'de gayrimenkul yatırımı\n2. Yatırım yoluyla oturum izni\n3. Uluslararası iş geliştirme';
  return 'Our advisors can best help you with this.\n\ninfo@innovest.uk  |  +44 7491 510941\n\nOr I can help with:\n\n1. Property investment in London or Dubai\n2. Residency by investment\n3. International business expansion';
}

function renderMessage(content: string): React.ReactNode[] | string {
  const tokenRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = tokenRegex.exec(content)) !== null) {
    if (match.index > lastIndex) parts.push(content.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith('**')) {
      parts.push(<strong key={match.index} style={{ fontWeight: 600, color: 'rgba(255,255,255,0.95)' }}>{token.slice(2, -2)}</strong>);
    } else {
      const lm = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (lm) parts.push(<a key={match.index} href={lm[2]} style={{ color: '#C1A45D', textDecoration: 'underline', textUnderlineOffset: '3px' }}>{lm[1]}</a>);
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < content.length) parts.push(content.slice(lastIndex));
  return parts.length ? (parts as React.ReactElement[]) : content;
}

// Quick reply buttons shown beneath the greeting
const QUICK_REPLIES_TR = [
  'Dubai veya Londra\'da nereye yatırım yapabilirim?',
  'Yatırım yoluyla hangi ülkelerde oturum alabilirim?',
  'Yeni ülkede iş kurmak için nasıl destek alırım?',
];

const QUICK_REPLIES_EN = [
  'Where should I invest in Dubai or London?',
  'Which countries offer residency by investment?',
  'How can I set up a business in a new country?',
];


export default function AIChat({ dict, locale }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiTooltip, setAiTooltip] = useState(false);
  const [sessionId] = useState(() => `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const quickReplies = locale === 'tr' ? QUICK_REPLIES_TR : QUICK_REPLIES_EN;
  const tooltipLabel = locale === 'tr' ? 'Innovest AI Asistan' : 'Innovest AI Assistant';

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: dict.chat.greeting }]);
    }
  }, [isOpen, messages.length, dict.chat.greeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const logConversation = (userMsg: string, aiMsg: string) => {
    fetch('/api/ai-conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        conversation_id: sessionId,
        user_message: userMsg,
        ai_response: aiMsg,
      }),
    }).catch(() => {/* fire-and-forget */});
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setInput('');
    const historySnapshot = messages; // capture before state update
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setIsTyping(true);
    setTimeout(() => {
      const response = getSmartResponse(text, locale, historySnapshot);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
      logConversation(text, response);
    }, 600 + Math.random() * 800);
  };

  const showQuickReplies = messages.length === 1 && messages[0].role === 'assistant';

  const containerStyle: React.CSSProperties = {
    width: '440px',
    maxWidth: 'calc(100vw - 32px)',
    height: '680px',
    borderRadius: '20px',
    background: 'linear-gradient(160deg, rgba(10,20,45,0.98), rgba(6,14,32,0.99))',
    border: '1px solid rgba(201,168,76,0.2)',
    boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
    backdropFilter: 'blur(24px)',
    fontFamily: "'Montserrat', sans-serif",
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <>
      {/* ─── Chat Toggle Button ─── */}
      <div className="fixed right-6 z-50" style={{ bottom: '88px', position: 'fixed' }}>
        {aiTooltip && !isOpen && (
          <div
            style={{
              position: 'absolute',
              bottom: '110%',
              right: 0,
              background: 'rgba(10,20,45,0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '11px',
              whiteSpace: 'nowrap',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '4px',
              fontFamily: "'Montserrat', sans-serif",
              pointerEvents: 'none',
              zIndex: 51,
            }}
          >
            {tooltipLabel}
          </div>
        )}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          onHoverStart={() => setAiTooltip(true)}
          onHoverEnd={() => setAiTooltip(false)}
          className="flex items-center justify-center"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #C1A45D 0%, #A8893A 100%)',
            border: '1px solid rgba(201,168,76,0.3)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
          whileTap={{ scale: 0.95 }}
          aria-label={tooltipLabel}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={22} color="white" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <MessageCircle size={22} color="white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ─── Chat Window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-44 right-6 z-50 max-w-[calc(100vw-48px)]"
            style={containerStyle}
          >
            {/* ── Header ── */}
            <div
              className="flex items-center gap-3 flex-shrink-0"
              style={{
                padding: '18px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.10))',
                  border: '1px solid rgba(201,168,76,0.30)',
                }}
              >
                <Bot size={17} style={{ color: '#C9A84C' }} />
              </div>
              <div>
                <p style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.95)', lineHeight: 1.2 }}>
                  Innovest AI
                </p>
                <p className="flex items-center gap-1.5" style={{ fontSize: '11px', color: '#4ade80', marginTop: '2px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                  Online
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto transition-colors"
                style={{ color: 'rgba(255,255,255,0.35)', padding: '4px' }}
                aria-label="Kapat"
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              >
                <X size={16} />
              </button>
            </div>

            {/* ── Messages ── */}
            <div
              className="flex-1 overflow-y-auto"
              style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'rgba(201,168,76,0.10)',
                        border: '1px solid rgba(201,168,76,0.20)',
                        marginTop: '2px',
                      }}
                    >
                      <Bot size={11} style={{ color: '#C9A84C' }} />
                    </div>
                  )}
                  <div
                    className="max-w-[80%] whitespace-pre-line"
                    style={
                      msg.role === 'assistant'
                        ? {
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '4px 14px 14px 14px',
                            padding: '14px 16px',
                            fontSize: '14px',
                            lineHeight: 1.7,
                            color: 'rgba(255,255,255,0.85)',
                          }
                        : {
                            background: 'rgba(201,168,76,0.15)',
                            border: '1px solid rgba(201,168,76,0.25)',
                            borderRadius: '14px 4px 14px 14px',
                            padding: '12px 16px',
                            fontSize: '14px',
                            lineHeight: 1.7,
                            color: 'rgba(255,255,255,0.85)',
                          }
                    }
                  >
                    {renderMessage(msg.content)}
                  </div>
                </div>
              ))}

              {/* Quick replies */}
              {showQuickReplies && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                  {quickReplies.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-left transition-all duration-200"
                      style={{
                        border: '1px solid rgba(255,255,255,0.10)',
                        borderRadius: '20px',
                        padding: '8px 14px',
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.60)',
                        background: 'transparent',
                        lineHeight: 1.5,
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.40)';
                        (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.85)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.10)';
                        (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.60)';
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2.5">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(201,168,76,0.10)',
                      border: '1px solid rgba(201,168,76,0.20)',
                      marginTop: '2px',
                    }}
                  >
                    <Bot size={11} style={{ color: '#C9A84C' }} />
                  </div>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '4px 14px 14px 14px',
                      padding: '14px 16px',
                    }}
                  >
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'rgba(255,255,255,0.30)', animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'rgba(255,255,255,0.30)', animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'rgba(255,255,255,0.30)', animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Input ── */}
            <div
              className="flex-shrink-0"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.07)',
                padding: '14px 16px',
                background: 'transparent',
                borderRadius: '0 0 20px 20px',
              }}
            >
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex gap-2 items-center"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={dict.chat.placeholder}
                  className="flex-1 bg-transparent focus:outline-none"
                  style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.85)',
                    fontFamily: "'Montserrat', sans-serif",
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: '20px',
                    padding: '10px 16px',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')}
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Gönder"
                  className="flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: input.trim()
                      ? 'linear-gradient(135deg, #C1A45D 0%, #A8893A 100%)'
                      : 'rgba(255,255,255,0.08)',
                    border: 'none',
                    cursor: input.trim() ? 'pointer' : 'not-allowed',
                    opacity: input.trim() ? 1 : 0.4,
                  }}
                >
                  <Send size={15} color="white" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
