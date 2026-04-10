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

const ANSWERS_TR: [RegExp, string][] = [
  // 1. Residency / Oturum
  [
    /oturum|golden visa|vize|ikamet|göç|pasaport|hangi.*ülke.*otur|yatırım yoluyla.*otur|residence/i,
    'Yatırım yoluyla oturum izni alabileceğiniz ülkeler:\n\n• 🇵🇹 Portekiz Golden Visa: 500.000€\'dan\n• 🇬🇷 Yunanistan Golden Visa: 250.000€\'dan\n• 🇦🇪 BAE Golden Visa: AED 2.000.000\'dan\n• 🇬🇧 İngiltere Innovator Vizesi: £50.000\'dan\n\nHer programın farklı avantajları, süreleri ve aile dahil etme koşulları vardır. Hangi ülke sizi ilgilendiriyor?\n\nÜcretsiz danışmanlık için: info@innovest.uk',
  ],
  // 2. Business / İş kurma / Partner
  [
    /iş kur|partner bul|ticari bağlantı|ticari.*gelişt|yol gösteri|firma kur|şirket kur|yeni.*ülke.*iş|pazar.*giriş|ticari aracı|iş.*genişlet|iş ortağı|distribüt/i,
    'Yeni bir ülkede iş kurma ve ticari genişleme hizmetlerimiz:\n\n• 🌍 Pazar Giriş Stratejisi (UK, BAE, AB, ABD)\n• 🤝 Partner & Distribütör Eşleştirme\n• 📋 Şirket Kurulumu ve yasal işlemler\n• 📊 Ticaret Kolaylaştırma & uyum danışmanlığı\n\nHedef pazarınız ve sektörünüze göre size özel strateji hazırlıyoruz. Hangi ülkede faaliyete geçmeyi düşünüyorsunuz?\n\nBize ulaşın: info@innovest.uk | +44 7491 510941',
  ],
  // 3. Dubai specific
  [
    /dubai/i,
    'Dubai\'de yatırım için en popüler bölgeler:\n\n• 🏙️ Business Bay – yüksek getiri, %7-9\n• 🌴 Palm Jumeirah – premium konut\n• 🛥️ Dubai Marina – kiracı talebi yüksek\n• 🏗️ Al Jaddaf – gelişen bölge, uygun fiyat\n\nBinghatti Aquarise (Al Jaddaf) – $290.000\'dan, %9 beklenen getiri\n\nDubai\'de vergisiz getiri ve Golden Visa imkânıyla yatırım yapabilirsiniz. Bütçenizi paylaşır mısınız?',
  ],
  // 4. London specific
  [
    /londra|london/i,
    'Londra\'da yatırım için öne çıkan bölgeler:\n\n• 🏛️ Mayfair / Westminster – premium, uzun vadeli değer\n• 🔨 Woolwich / SE18 – £380K\'dan, gelişen bölge\n• 🌿 Battersea / SW11 – Thames kenarı, yüksek talep\n• 🏘️ Mill Hill / NW7 – aile konutu, istikrarlı getiri\n\nLondra\'da ortalama kira getirisi %4-6, uzun vadeli sermaye artışı %15+ beklenmektedir.\n\nHangi bütçe aralığı sizi ilgilendiriyor?',
  ],
  // 5. Generic investment / where to invest
  [
    /nereye yatırım|yatırım.*nerede|yatırım.*yapabilir|gayrimenkul|emlak|mülk|proje|invest/i,
    'Innovest olarak iki ana gayrimenkul pazarında hizmet veriyoruz:\n\n🇬🇧 **Londra** – £380.000\'dan başlayan projeler, %4-6 getiri\n🇦🇪 **Dubai** – $290.000\'dan başlayan projeler, %7-9 getiri\n\nÜç temel sorunuzu yanıtlıyoruz:\n1. Dubai veya Londra\'da nereye yatırım yapmalıyım?\n2. Hangi ülkelerde yatırımla oturum alabilirim?\n3. Yeni ülkede iş kurmak için nasıl destek alırım?\n\nHangi konuda daha fazla bilgi almak istiyorsunuz?',
  ],
  // 6. Budget / price
  [
    /bütçe|fiyat|£500|500k|minimum|uygun|kaç para|ne kadar/i,
    '£500K altında önerdiğimiz projeler:\n\n• London Square Woolwich (SE18) – £380.000\'dan\n• Sterling Place, SW17 – £420.000\'dan  \n• Ridgeway Views, NW7 – £450.000\'dan\n\nDubai\'de $500K altı projeler:\n• Binghatti Aquarise – $290.000\'dan\n• Business Bay projeleri – $200.000\'dan\n\nBütçenizi ve tercih ettiğiniz pazarı belirtirseniz size özel seçenekler sunabiliriz.',
  ],
  // 7. Yield / return
  [
    /getiri|kira|roi|kazanç|kar|yüzde|%/i,
    'Güncel beklenen kira getirileri:\n\n🇬🇧 Londra: %4-6 (dış bölgelerde daha yüksek)\n🇦🇪 Dubai: %7-10 (bölgeye göre değişir)\n\n5 yıllık sermaye değer artışı tahmini:\n• Londra: ~%15\n• Dubai: ~%25\n\nBunlar piyasa ortalamalarıdır; belirli projelerde bu oranların üzerine çıkılabilir. Detaylı analiz için danışmanlık alın.',
  ],
  // 8. Contact
  [
    /iletişim|randevu|görüşme|telefon|email|adres|ulaş/i,
    'Ekibimize ulaşın:\n\n📍 Berkeley Square House, Mayfair, Londra\n📧 info@innovest.uk\n📞 +44 7491 510941 (İngiltere)\n📞 +971 54 755 0101 (BAE)\n📞 +90 531 420 0331 (Türkiye)\n\nÜcretsiz danışmanlık randevusu için İletişim sayfamızı ziyaret edin.',
  ],
  // 9. Greeting
  [
    /merhaba|selam|günaydın|iyi günler|iyi akşam|nasılsın|hello|hi\b/i,
    'Merhaba! Innovest\'e hoş geldiniz. 👋\n\nSize şu konularda yardımcı olabilirim:\n\n1️⃣ Dubai veya Londra\'da gayrimenkul yatırımı\n2️⃣ Yatırım yoluyla oturum izni (Golden Visa)\n3️⃣ Yeni ülkede iş kurma & partner bulma\n\nHangi konuda bilgi almak istersiniz?',
  ],
];

const ANSWERS_EN: [RegExp, string][] = [
  [
    /residency|golden visa|visa|citizenship|passport|which.*country.*reside|residence by invest/i,
    'Countries where you can obtain residency through investment:\n\n• 🇵🇹 Portugal Golden Visa: From €500,000\n• 🇬🇷 Greece Golden Visa: From €250,000\n• 🇦🇪 UAE Golden Visa: From AED 2,000,000\n• 🇬🇧 UK Innovator Visa: From £50,000\n\nEach programme has different benefits, timelines and family inclusion options. Which country interests you?\n\nFor a free consultation: info@innovest.uk',
  ],
  [
    /business setup|set up.*business|partner|trade connection|expand.*business|company formation|market entry|new.*market|trade facilit|distributor/i,
    'Our Business Expansion services for entering new markets:\n\n• 🌍 Market Entry Strategy (UK, UAE, EU, US)\n• 🤝 Partner & Distributor Matching\n• 📋 Company Formation & legal support\n• 📊 Trade Facilitation & compliance advisory\n\nWe tailor strategies to your sector and target market. Which country are you considering?\n\nContact us: info@innovest.uk | +44 7491 510941',
  ],
  [
    /dubai/i,
    'Top investment areas in Dubai:\n\n• 🏙️ Business Bay – high yield, 7-9%\n• 🌴 Palm Jumeirah – premium residential\n• 🛥️ Dubai Marina – strong tenant demand\n• 🏗️ Al Jaddaf – emerging area, accessible pricing\n\nBinghatti Aquarise (Al Jaddaf) – From $290,000, 9% projected yield\n\nDubai offers tax-free returns and a path to Golden Visa. What is your budget range?',
  ],
  [
    /london/i,
    'Top investment areas in London:\n\n• 🏛️ Mayfair / Westminster – premium, long-term value\n• 🔨 Woolwich / SE18 – From £380K, up-and-coming\n• 🌿 Battersea / SW11 – Thames-side, high demand\n• 🏘️ Mill Hill / NW7 – family living, stable returns\n\nLondon average rental yield: 4-6%, 5-year capital growth: ~15%.\n\nWhat is your target budget?',
  ],
  [
    /where.*invest|invest.*where|property|real estate|apartment|development|invest/i,
    'Innovest operates in two prime property markets:\n\n🇬🇧 **London** – From £380,000, 4-6% yield\n🇦🇪 **Dubai** – From $290,000, 7-9% yield\n\nWe answer three core questions:\n1. Where should I invest in Dubai or London?\n2. Which countries offer residency through investment?\n3. How can I set up a business in a new country?\n\nWhich topic would you like to explore?',
  ],
  [
    /budget|price|£500|500k|minimum|affordable|how much|cost/i,
    'Our recommendations under £500K:\n\n• London Square Woolwich (SE18) – From £380,000\n• Sterling Place, SW17 – From £420,000\n• Ridgeway Views, NW7 – From £450,000\n\nIn Dubai under $500K:\n• Binghatti Aquarise – From $290,000\n• Business Bay developments – From $200,000\n\nShare your budget and preferred market and we\'ll find the best fit for you.',
  ],
  [
    /yield|rental.*return|roi|return on invest/i,
    'Current projected rental yields:\n\n🇬🇧 London: 4-6% (higher in outer zones)\n🇦🇪 Dubai: 7-10% (varies by area)\n\n5-year capital appreciation estimate:\n• London: ~15%\n• Dubai: ~25%\n\nThese are market averages; specific developments may exceed these figures. Speak to an advisor for a detailed analysis.',
  ],
  [
    /contact|appointment|consult|phone|email|address|reach/i,
    'Get in touch with our team:\n\n📍 Berkeley Square House, Mayfair, London\n📧 info@innovest.uk\n📞 +44 7491 510941 (UK)\n📞 +971 54 755 0101 (UAE)\n📞 +90 531 420 0331 (Turkey)\n\nVisit our Contact page to schedule a free consultation.',
  ],
  [
    /hello|hi\b|good morning|good afternoon|good evening|how are you/i,
    'Hello! Welcome to Innovest. 👋\n\nI can help you with:\n\n1️⃣ Property investment in Dubai or London\n2️⃣ Residency by investment (Golden Visa)\n3️⃣ Setting up a business & finding partners\n\nWhat would you like to know?',
  ],
];

function getAIResponse(message: string, locale: 'en' | 'tr'): string {
  const answers = locale === 'tr' ? ANSWERS_TR : ANSWERS_EN;
  for (const [pattern, response] of answers) {
    if (pattern.test(message)) return response;
  }
  // Fallback: try the other language set too
  const fallbackAnswers = locale === 'tr' ? ANSWERS_EN : ANSWERS_TR;
  for (const [pattern, response] of fallbackAnswers) {
    if (pattern.test(message)) return response;
  }
  return locale === 'tr'
    ? 'Sorunuz için teşekkürler. Uzman danışmanlarımız size özel rehberlik yapabilir.\n\nBize ulaşın: info@innovest.uk\n📞 +44 7491 510941\n\nVeya şu konulardan birini seçin:\n1️⃣ Dubai veya Londra\'da gayrimenkul\n2️⃣ Yatırım ile oturum izni\n3️⃣ Yeni ülkede iş kurma'
    : 'Thank you for your question. Our advisors are here to help.\n\nContact us: info@innovest.uk\n📞 +44 7491 510941\n\nOr choose a topic:\n1️⃣ Property in Dubai or London\n2️⃣ Residency by investment\n3️⃣ Business setup & expansion';
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
              className="bg-[#1a1a1a] border border-gold/40 text-white text-xs tracking-widest uppercase px-4 h-14 flex items-center whitespace-nowrap border-r-0"
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
            className="fixed bottom-44 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-background border border-border shadow-2xl shadow-black/10 flex flex-col"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
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
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={12} className="text-gold" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-gold/10 text-foreground border border-gold/20'
                        : 'bg-surface text-muted-light border border-border'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Quick reply buttons — shown only after greeting */}
              {showQuickReplies && (
                <div className="flex flex-col gap-2 mt-2">
                  {quickReplies.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-left text-xs px-3 py-2 border border-gold/30 text-gold hover:bg-gold/10 transition-colors leading-snug"
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
                  <div className="bg-surface border border-border px-4 py-3 text-sm">
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
            <div className="border-t border-border p-3">
              <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={dict.chat.placeholder}
                  className="flex-1 bg-background border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="px-3 py-2.5 bg-gold text-white hover:bg-gold-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
