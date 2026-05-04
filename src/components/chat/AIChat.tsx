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
  { name: 'Westminster Tower', developer: 'London Square', location: 'SE1, Zone 1', price: '£550,000', yield: '5.2%', highlight: 'Thames manzarası, 218 daire' },
  { name: "Ransome's Wharf", developer: 'London Square', location: 'Battersea SW11', price: '£725,000', yield: '4.8%', highlight: 'nehir kenarı, 152 daire' },
  { name: 'Woolwich Central', developer: 'London Square', location: 'SE18', price: '£380,000', yield: '5.5%', highlight: 'Elizabeth Line, rekabetçi fiyat' },
  { name: 'Prince of Wales Drive', developer: 'Berkeley Group', location: 'Battersea SW11', price: '£850,000', yield: '4.5%', highlight: 'Battersea Park karşısı' },
  { name: 'Sterling Place', developer: 'Barratt London', location: 'Tooting SW17', price: '£420,000', yield: '5.0%', highlight: 'Northern Line bağlantısı' },
  { name: 'White City Living', developer: 'Berkeley Group', location: 'W12', price: '£650,000', yield: '4.6%', highlight: 'Westfield komşusu, 1400+ konut' },
];

const DUBAI_PROJECTS = [
  { name: 'Binghatti Flare', developer: 'Binghatti', location: 'Business Bay', price: '$380,000', yield: '8.5%', highlight: 'Dubai Kanalı manzarası' },
  { name: 'The Alba', developer: 'Omniyat × Dorchester', location: 'Palm Jumeirah', price: '$1,200,000', yield: '7.2%', highlight: '80 premium rezidans' },
  { name: 'Binghatti Aquarise', developer: 'Binghatti', location: 'Al Jaddaf', price: '$290,000', yield: '9.0%', highlight: 'en uygun fiyat, yüksek getiri' },
  { name: 'Mercedes-Benz Places', developer: 'Binghatti', location: 'Downtown Dubai', price: '$750,000', yield: '7.5%', highlight: '65 kat, ikonik tasarım' },
  { name: 'Belgrove Residences', developer: 'Ellington', location: 'JVC', price: '$350,000', yield: '8.2%', highlight: 'aile odaklı, modern yaşam' },
  { name: 'Solaya', developer: 'Meraas', location: 'Jumeirah', price: '$950,000', yield: '6.8%', highlight: 'premium konum' },
  { name: 'One River Point', developer: 'Ellington', location: 'Business Bay', price: '$620,000', yield: '7.8%', highlight: 'kanal cephesi' },
  { name: 'Cala Del Mar', developer: 'Ellington', location: 'Al Marjan Island, RAK', price: '$474,000', yield: '9.0%', highlight: 'Wynn Resort yakını' },
];

function formatProjectList(projects: typeof LONDON_PROJECTS, locale: 'en' | 'tr'): string {
  return projects.map(p =>
    `• **${p.name}** — ${p.location}\n  ${locale === 'tr' ? 'Fiyat' : 'Price'}: ${p.price} | ${locale === 'tr' ? 'Getiri' : 'Yield'}: ${p.yield}\n  ${p.highlight}`
  ).join('\n\n');
}

function findProjectByName(query: string): typeof LONDON_PROJECTS[0] | null {
  const q = query.toLowerCase().replace(/['']/g, '');
  const all = [...LONDON_PROJECTS, ...DUBAI_PROJECTS];
  return all.find(p => q.includes(p.name.toLowerCase().replace(/['']/g, ''))) || null;
}

const ANSWERS_TR: [RegExp, string | ((msg: string) => string)][] = [
  // 0. Specific project queries — must be first
  [
    /westminster tower|ransome|woolwich central|prince of wales|sterling place|white city|binghatti flare|the alba|binghatti aquarise|mercedes.?benz|belgrove|solaya|one river point|cala del mar/i,
    (msg: string) => {
      const project = findProjectByName(msg);
      if (!project) return 'Bu proje hakkında bilgi bulunamadı. Lütfen proje adını kontrol ediniz.';
      const isLondon = LONDON_PROJECTS.includes(project);
      const pageLink = isLondon ? '/tr/real-estate/london' : '/tr/real-estate/dubai';
      const cityLabel = isLondon ? 'Londra' : 'Dubai';
      return `**${project.name}**\n📍 ${project.location}\n🏗️ ${project.developer}\n💰 Başlangıç: ${project.price}\n📈 Beklenen Getiri: ${project.yield}\n✨ ${project.highlight}\n\nBu ${isLondon ? '🇬🇧 Londra' : '🇦🇪 Dubai'} projesi hakkında danışmanlık almak ister misiniz?\n\n📧 info@innovest.uk | 📞 +44 7491 510941\n\n[${cityLabel} Projeleri →](${pageLink})`;
    },
  ],
  // 1. Residency / Oturum
  [
    /oturum|golden visa|vize|ikamet|göç|pasaport|hangi.*ülke.*otur|yatırım yoluyla.*otur|residence/i,
    'Yatırım yoluyla oturum izni alabileceğiniz ülkeler:\n\n• 🇵🇹 Portekiz Golden Visa: 500.000€\'dan\n• 🇬🇷 Yunanistan Golden Visa: 250.000€\'dan\n• 🇦🇪 BAE Golden Visa: AED 2.000.000\'dan\n• 🇬🇧 İngiltere Innovator Vizesi: İş planı onayına tabi\n\nHer programın farklı avantajları, süreleri ve aile dahil etme koşulları vardır. Hangi ülke sizi ilgilendiriyor?',
  ],
  // 2. Business / İş kurma
  [
    /iş kur|partner bul|ticari bağlantı|ticari.*gelişt|firma kur|şirket kur|pazar.*giriş|iş.*genişlet|iş ortağı|distribüt/i,
    'Uluslararası iş geliştirme hizmetlerimiz:\n\n• 🌍 Pazar Giriş Stratejisi (UK, BAE, AB, ABD)\n• 🤝 Partner & Distribütör Eşleştirme\n• 📋 Şirket Kurulumu ve yasal işlemler\n• 📊 Ticaret Kolaylaştırma & uyum danışmanlığı\n\nHedef pazarınız ve sektörünüze göre size özel strateji hazırlıyoruz. Hangi ülkede faaliyete geçmeyi düşünüyorsunuz?',
  ],
  // 3. Dubai specific — now with ALL projects
  [
    /dubai/i,
    () => `Dubai\'de en çok tercih edilen 4 projemiz:\n\n• **Binghatti Aquarise** — $290K | %9.0 getiri — Al Jaddaf\n• **Binghatti Flare** — $380K | %8.5 getiri — Business Bay, kanal manzarası\n• **Belgrove Residences** — $350K | %8.2 getiri — JVC, Ellington\n• **Mercedes-Benz Places** — $750K | %7.5 getiri — Downtown, ikonik kule\n\n🇦🇪 Vergisiz getiri + Golden Visa imkânı. Bütçenizi paylaşırsanız size özel liste hazırlarım.\n\n[Tüm Dubai Projeleri →](/tr/real-estate/dubai)`,
  ],
  // 4. London specific
  [
    /londra|london/i,
    () => `Londra\'da en çok tercih edilen 4 projemiz:\n\n• **Woolwich Central** — £380K | %5.5 getiri — SE18, Elizabeth Line\n• **Sterling Place** — £420K | %5.0 getiri — Tooting, Northern Line\n• **Westminster Tower** — £550K | %5.2 getiri — SE1, Thames manzarası\n• **White City Living** — £650K | %4.6 getiri — W12, Westfield komşusu\n\n🇬🇧 Sermaye kazancı ve kira getirisi için ideal lokasyonlar.\n\n[Tüm Londra Projeleri →](/tr/real-estate/london)`,
  ],
  // 5. Generic investment
  [
    /nereye yatırım|yatırım.*nerede|yatırım.*yapabilir|gayrimenkul|emlak|mülk|proje|invest/i,
    'Size en uygun yatırımı bulabilmem için birkaç bilgiye ihtiyacım var:\n\n1️⃣ **Bütçe aralığınız?** (örn. $300K, £500K, $1M+)\n2️⃣ **Amacınız?** Kira getirisi / sermaye kazancı / oturum izni\n3️⃣ **Tercihli lokasyon?** Londra 🇬🇧, Dubai 🇦🇪, ya da her ikisi\n\nBu bilgilere göre size özel 4-5 proje önereceğim.',
  ],
  // 6. Budget / price
  [
    /bütçe|fiyat|£500|500k|minimum|uygun|kaç para|ne kadar|ucuz|pahalı/i,
    '**Bütçeye göre öneriler:**\n\n🇬🇧 £500K altı Londra:\n• **Woolwich Central** — £380K, %5.5 getiri\n• **Sterling Place** — £420K, %5.0 getiri\n[Londra Projeleri →](/tr/real-estate/london)\n\n🇦🇪 $500K altı Dubai:\n• **Binghatti Aquarise** — $290K, %9.0 getiri\n• **Belgrove Residences** — $350K, %8.2 getiri\n• **Binghatti Flare** — $380K, %8.5 getiri\n[Dubai Projeleri →](/tr/real-estate/dubai)\n\nBütçenizi belirtirseniz daha kişisel bir öneri yapabilirim.',
  ],
  // 7. Yield / return
  [
    /getiri|kira|roi|kazanç|kar|yüzde|%/i,
    'Portföyümüzdeki getiri aralıkları:\n\n🇬🇧 Londra: %4.5 – %5.5\n🇦🇪 Dubai: %6.8 – %9.0\n\n**En yüksek getirili projeler:**\n• Binghatti Aquarise — %9.0 ($290K)\n• Cala Del Mar — %9.0 ($474K)\n• Binghatti Flare — %8.5 ($380K)\n• Belgrove Residences — %8.2 ($350K)\n\nDetaylı getiri analizi için danışmanlık ekibimize ulaşın.',
  ],
  // 8. Contact
  [
    /iletişim|randevu|görüşme|telefon|email|adres|ulaş/i,
    'Ekibimize ulaşın:\n\n📍 Berkeley Square House, Mayfair, Londra\n📧 info@innovest.uk\n📞 +44 7491 510941 (İngiltere)\n📞 +971 54 755 0101 (BAE)\n📞 +90 531 420 0331 (Türkiye)\n\nÜcretsiz danışmanlık randevusu için İletişim sayfamızı ziyaret edin.',
  ],
  // 9. Greeting — SHORT, no heavy intro
  [
    /merhaba|selam|günaydın|iyi günler|iyi akşam|nasılsın|hello|hi\b/i,
    'Merhaba! 👋 Size nasıl yardımcı olabilirim?\n\n1️⃣ Londra veya Dubai\'de gayrimenkul yatırımı\n2️⃣ Yatırım yoluyla oturum izni\n3️⃣ Uluslararası iş geliştirme',
  ],
];

const ANSWERS_EN: [RegExp, string | ((msg: string) => string)][] = [
  // 0. Specific project queries
  [
    /westminster tower|ransome|woolwich central|prince of wales|sterling place|white city|binghatti flare|the alba|binghatti aquarise|mercedes.?benz|belgrove|solaya|one river point|cala del mar/i,
    (msg: string) => {
      const project = findProjectByName(msg);
      if (!project) return 'Project not found. Please check the project name.';
      const isLondon = LONDON_PROJECTS.includes(project);
      const pageLink = isLondon ? '/real-estate/london' : '/real-estate/dubai';
      const cityLabel = isLondon ? 'London' : 'Dubai';
      return `**${project.name}**\n📍 ${project.location}\n🏗️ ${project.developer}\n💰 From: ${project.price}\n📈 Projected Yield: ${project.yield}\n✨ ${project.highlight}\n\nWould you like more details about this ${isLondon ? '🇬🇧 London' : '🇦🇪 Dubai'} project?\n\n📧 info@innovest.uk | 📞 +44 7491 510941\n\n[View ${cityLabel} Portfolio →](${pageLink})`;
    },
  ],
  [
    /residency|golden visa|visa|citizenship|passport|which.*country.*reside|residence by invest/i,
    'Countries where you can obtain residency through investment:\n\n• 🇵🇹 Portugal Golden Visa: From €500,000\n• 🇬🇷 Greece Golden Visa: From €250,000\n• 🇦🇪 UAE Golden Visa: From AED 2,000,000\n• 🇬🇧 UK Innovator Visa: Subject to business plan approval\n\nEach programme has different benefits, timelines and family inclusion options. Which country interests you?',
  ],
  [
    /business setup|set up.*business|partner|trade connection|expand.*business|company formation|market entry|new.*market|trade facilit|distributor/i,
    'Our Business Expansion services:\n\n• 🌍 Market Entry Strategy (UK, UAE, EU, US)\n• 🤝 Partner & Distributor Matching\n• 📋 Company Formation & legal support\n• 📊 Trade Facilitation & compliance advisory\n\nWe tailor strategies to your sector and target market. Which country are you considering?',
  ],
  [
    /dubai/i,
    () => `Our top 4 Dubai projects:\n\n• **Binghatti Aquarise** — $290K | 9.0% yield — Al Jaddaf\n• **Binghatti Flare** — $380K | 8.5% yield — Business Bay, canal views\n• **Belgrove Residences** — $350K | 8.2% yield — JVC, Ellington\n• **Mercedes-Benz Places** — $750K | 7.5% yield — Downtown, iconic tower\n\n🇦🇪 Tax-free returns + Golden Visa eligibility. Share your budget for a tailored shortlist.\n\n[View All Dubai Projects →](/real-estate/dubai)`,
  ],
  [
    /london/i,
    () => `Our top 4 London projects:\n\n• **Woolwich Central** — £380K | 5.5% yield — SE18, Elizabeth Line\n• **Sterling Place** — £420K | 5.0% yield — Tooting, Northern Line\n• **Westminster Tower** — £550K | 5.2% yield — SE1, Thames views\n• **White City Living** — £650K | 4.6% yield — W12, next to Westfield\n\n🇬🇧 Capital growth and rental income in prime London locations.\n\n[View All London Projects →](/real-estate/london)`,
  ],
  [
    /where.*invest|invest.*where|property|real estate|apartment|development|invest/i,
    'To find the right investment for you, I need a few details:\n\n1️⃣ **Budget range?** (e.g. $300K, £500K, $1M+)\n2️⃣ **Goal?** Rental yield / capital growth / residency by investment\n3️⃣ **Preferred market?** London 🇬🇧, Dubai 🇦🇪, or open to both\n\nI\'ll come back with a personalised shortlist of 4–5 projects.',
  ],
  [
    /budget|price|£500|500k|minimum|affordable|how much|cost|cheap/i,
    '**Budget-matched recommendations:**\n\n🇬🇧 Under £500K in London:\n• **Woolwich Central** — £380K, 5.5% yield\n• **Sterling Place** — £420K, 5.0% yield\n[London Projects →](/real-estate/london)\n\n🇦🇪 Under $500K in Dubai:\n• **Binghatti Aquarise** — $290K, 9.0% yield\n• **Belgrove Residences** — $350K, 8.2% yield\n• **Binghatti Flare** — $380K, 8.5% yield\n[Dubai Projects →](/real-estate/dubai)\n\nShare your exact budget for a tailored recommendation.',
  ],
  [
    /yield|rental.*return|roi|return on invest/i,
    'Yield ranges across our portfolio:\n\n🇬🇧 London: 4.5% – 5.5%\n🇦🇪 Dubai: 6.8% – 9.0%\n\n**Highest yielding projects:**\n• Binghatti Aquarise — 9.0% ($290K)\n• Cala Del Mar — 9.0% ($474K)\n• Binghatti Flare — 8.5% ($380K)\n• Belgrove Residences — 8.2% ($350K)\n\nSpeak to an advisor for a detailed project analysis.',
  ],
  [
    /contact|appointment|consult|phone|email|address|reach/i,
    'Get in touch with our team:\n\n📍 Berkeley Square House, Mayfair, London\n📧 info@innovest.uk\n📞 +44 7491 510941 (UK)\n📞 +971 54 755 0101 (UAE)\n📞 +90 531 420 0331 (Turkey)\n\nVisit our Contact page to schedule a free consultation.',
  ],
  [
    /hello|hi\b|good morning|good afternoon|good evening|how are you/i,
    'Hello! 👋 How can I help you today?\n\n1️⃣ Property investment in London or Dubai\n2️⃣ Residency by investment (Golden Visa)\n3️⃣ International business expansion',
  ],
];

function getAIResponse(message: string, locale: 'en' | 'tr'): string {
  const answers = locale === 'tr' ? ANSWERS_TR : ANSWERS_EN;
  for (const [pattern, response] of answers) {
    if (pattern.test(message)) {
      return typeof response === 'function' ? response(message) : response;
    }
  }
  // Fallback: try the other language set too
  const fallbackAnswers = locale === 'tr' ? ANSWERS_EN : ANSWERS_TR;
  for (const [pattern, response] of fallbackAnswers) {
    if (pattern.test(message)) {
      return typeof response === 'function' ? response(message) : response;
    }
  }
  return locale === 'tr'
    ? 'Bu konuda size en doğru bilgiyi danışmanlarımız verebilir.\n\n📧 info@innovest.uk | 📞 +44 7491 510941\n\nVeya şu konulardan birini seçin:\n1️⃣ Londra veya Dubai\'de gayrimenkul\n2️⃣ Yatırım ile oturum izni\n3️⃣ Uluslararası iş geliştirme'
    : 'Our advisors can best help you with this.\n\n📧 info@innovest.uk | 📞 +44 7491 510941\n\nOr choose a topic:\n1️⃣ Property in London or Dubai\n2️⃣ Residency by investment\n3️⃣ International business expansion';
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
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setIsTyping(true);
    setTimeout(() => {
      const response = getAIResponse(text, locale);
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
