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
      return `**${project.name}**\n📍 ${project.location}\n🏗️ ${project.developer}\n💰 Başlangıç: ${project.price}\n📈 Beklenen Getiri: ${project.yield}\n✨ ${project.highlight}\n\n${isLondon ? '🇬🇧 Londra' : '🇦🇪 Dubai'} portföyümüzdeki bu proje hakkında detaylı bilgi almak ister misiniz?\n\n📧 info@innovest.uk | 📞 +44 7491 510941`;
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
    () => `Dubai portföyümüzdeki projeler:\n\n${formatProjectList(DUBAI_PROJECTS, 'tr')}\n\nDubai\'de vergisiz getiri ve Golden Visa imkânıyla yatırım yapabilirsiniz. Bütçenizi paylaşır mısınız?`,
  ],
  // 4. London specific — now with ALL projects
  [
    /londra|london/i,
    () => `Londra portföyümüzdeki projeler:\n\n${formatProjectList(LONDON_PROJECTS, 'tr')}\n\n£285.000\'dan başlayan fiyatlarla Londra\'da yatırım yapabilirsiniz. Hangi bütçe aralığı sizi ilgilendiriyor?`,
  ],
  // 5. Generic investment
  [
    /nereye yatırım|yatırım.*nerede|yatırım.*yapabilir|gayrimenkul|emlak|mülk|proje|invest/i,
    'İki ana pazarda toplam 14 aktif projemiz var:\n\n🇬🇧 **Londra** — 6 proje, £380.000\'dan başlayan fiyatlar, %4-6 getiri\n🇦🇪 **Dubai** — 8 proje, $290.000\'dan başlayan fiyatlar, %7-9 getiri\n\nHangi pazarı incelemek istersiniz? Proje ismi de sorabilirsiniz (örn. "Westminster Tower", "Binghatti Aquarise").',
  ],
  // 6. Budget / price
  [
    /bütçe|fiyat|£500|500k|minimum|uygun|kaç para|ne kadar|ucuz|pahalı/i,
    '**£500K altı Londra projeleri:**\n• Woolwich Central — £380.000, %5.5 getiri\n• Sterling Place — £420.000, %5.0 getiri\n\n**$500K altı Dubai projeleri:**\n• Binghatti Aquarise — $290.000, %9.0 getiri\n• Belgrove Residences — $350.000, %8.2 getiri\n• Binghatti Flare — $380.000, %8.5 getiri\n• Cala Del Mar — $474.000, %9.0 getiri\n\nBütçenizi ve tercih ettiğiniz pazarı belirtirseniz size özel seçenekler sunabiliriz.',
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
      return `**${project.name}**\n📍 ${project.location}\n🏗️ ${project.developer}\n💰 From: ${project.price}\n📈 Projected Yield: ${project.yield}\n✨ ${project.highlight}\n\nWould you like more details about this ${isLondon ? '🇬🇧 London' : '🇦🇪 Dubai'} project?\n\n📧 info@innovest.uk | 📞 +44 7491 510941`;
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
    () => `Our Dubai portfolio:\n\n${formatProjectList(DUBAI_PROJECTS, 'en')}\n\nDubai offers tax-free returns and a path to Golden Visa. What is your budget range?`,
  ],
  [
    /london/i,
    () => `Our London portfolio:\n\n${formatProjectList(LONDON_PROJECTS, 'en')}\n\nStarting from £285,000 in London. What is your target budget?`,
  ],
  [
    /where.*invest|invest.*where|property|real estate|apartment|development|invest/i,
    'We have 14 active projects across two markets:\n\n🇬🇧 **London** — 6 projects, from £380,000, 4-6% yield\n🇦🇪 **Dubai** — 8 projects, from $290,000, 7-9% yield\n\nWhich market interests you? You can also ask about a specific project (e.g. "Westminster Tower", "Binghatti Aquarise").',
  ],
  [
    /budget|price|£500|500k|minimum|affordable|how much|cost|cheap/i,
    '**Under £500K in London:**\n• Woolwich Central — £380,000, 5.5% yield\n• Sterling Place — £420,000, 5.0% yield\n\n**Under $500K in Dubai:**\n• Binghatti Aquarise — $290,000, 9.0% yield\n• Belgrove Residences — $350,000, 8.2% yield\n• Binghatti Flare — $380,000, 8.5% yield\n• Cala Del Mar — $474,000, 9.0% yield\n\nShare your budget and preferred market for tailored recommendations.',
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
  const [hovered, setHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const quickReplies = locale === 'tr' ? QUICK_REPLIES_TR : QUICK_REPLIES_EN;
  const tooltipLabel = locale === 'tr' ? 'AI Asistan' : 'AI Assistant';

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

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setIsTyping(true);
    setTimeout(() => {
      const response = getAIResponse(text, locale);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  };

  const showQuickReplies = messages.length === 1 && messages[0].role === 'assistant';

  return (
    <>
      {/* ─── Chat Toggle Button (bottom-24, above WhatsApp) ─── */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 flex items-center gap-0 overflow-hidden shadow-lg shadow-black/20"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.95 }}
        aria-label={tooltipLabel}
      >
        {/* Label — slides in from right, same style as WhatsApp */}
        <AnimatePresence>
          {hovered && !isOpen && (
            <motion.span
              key="label"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0B2236] border border-gold/40 text-white text-xs tracking-widest uppercase px-4 h-14 flex items-center whitespace-nowrap border-r-0"
            >
              {tooltipLabel}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Icon square */}
        <div className="w-14 h-14 bg-gold flex items-center justify-center shrink-0">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={24} color="white" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <MessageCircle size={24} color="white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      {/* ─── Chat Window (opens above the button) ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-44 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] bg-background border border-border/50 shadow-2xl shadow-black/20 flex flex-col rounded-sm"
            style={{ height: '560px' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-border/40">
              <div className="w-8 h-8 bg-gold/10 border border-gold/30 flex items-center justify-center">
                <Bot size={18} className="text-gold" />
              </div>
              <div>
                <p className="text-sm font-medium">{dict.chat.title}</p>
                <p className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
                  Online
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto text-muted hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={12} className="text-gold" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed whitespace-pre-line rounded-sm ${
                      msg.role === 'user'
                        ? 'bg-gold/5 text-foreground border border-gold/10'
                        : 'bg-surface/40 text-muted-light border border-border/15'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Quick reply buttons — shown only after greeting */}
              {showQuickReplies && (
                <div className="flex flex-col gap-2.5 mt-3">
                  {quickReplies.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-left text-xs px-4 py-3 border border-border/20 text-muted hover:text-gold hover:border-gold/20 hover:bg-gold/3 transition-all duration-300 leading-snug rounded-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot size={12} className="text-gold" />
                  </div>
                  <div className="bg-surface/60 border border-border/30 px-4 py-3 text-sm rounded-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border/40 p-4">
              <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={dict.chat.placeholder}
                  className="flex-1 bg-background border border-border/40 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors rounded-sm"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="px-4 py-3 bg-gold text-white hover:bg-gold-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-sm"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
