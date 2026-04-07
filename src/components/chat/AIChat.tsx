'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionary';

interface AIChatProps {
  dict: Dictionary;
}

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

const knowledgeBase: Record<string, string> = {
  'dubai.*minimum|minimum.*dubai|dubai.*invest': 'The minimum investment for property in Dubai starts from approximately $200,000 for studio apartments in emerging areas. For Golden Visa eligibility, you need a minimum property investment of AED 2,000,000 (approximately $545,000). Our team can help you find the best options within your budget.',
  'london.*minimum|minimum.*london|london.*invest|uk.*invest': 'London property investments typically start from £350,000 for studio/1-bed apartments in zones 3-6. Premium developments in central London start from £550,000+. Average rental yields range from 4-6% depending on location. Would you like to explore specific developments?',
  'residency|oturum|golden visa|visa': 'We assist with residency-by-investment programmes in several countries:\n\n• Portugal Golden Visa: From €500,000\n• Greece Golden Visa: From €250,000\n• UAE Golden Visa: From AED 2,000,000\n• UK Innovator Visa: From £50,000\n\nEach programme has different benefits and timelines. Would you like details on a specific country?',
  'under.*500|below.*500|£500|500k': 'We have several excellent options under £500K:\n\n• London Square Woolwich (SE18) - From £380,000\n• Sterling Place, SW17 - From £420,000\n• Ridgeway Views, NW7 - From £450,000\n\nIn Dubai, options under $500K include Binghatti Flare and various Business Bay developments. Shall I provide more details?',
  'business|ticari|company|şirket|partner': 'Our Business Expansion services include:\n\n• Market Entry Strategy for UK, UAE, EU & US\n• Partner Matching with vetted local businesses\n• Company Formation in key jurisdictions\n• Trade Facilitation & compliance support\n\nWe help businesses navigate new markets with confidence. Would you like to discuss your specific expansion goals?',
  'yield|getiri|return|roi': 'Current approximate rental yields:\n\n• London: 4-6% (higher in outer zones)\n• Dubai: 6-10% (varies by area)\n\nCapital appreciation over 5 years:\n• London: ~15%\n• Dubai: ~20%\n\nThese are indicative figures. Actual returns depend on specific properties and market conditions.',
  'contact|iletişim|appointment|randevu': 'You can reach our team at:\n\n📍 Berkeley Square House, Mayfair, London\n📧 info@innovest.uk\n📞 +44 7491 510941 (UK)\n📞 +971 54 755 0101 (UAE)\n📞 +90 531 420 0331 (Turkey)\n\nOr visit our Contact page to schedule a free consultation.',
};

function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  for (const [pattern, response] of Object.entries(knowledgeBase)) {
    if (new RegExp(pattern, 'i').test(lowerMessage)) {
      return response;
    }
  }

  return "Thank you for your question. Our investment advisors can provide you with detailed, personalised guidance. Would you like to:\n\n1. Learn about London or Dubai properties\n2. Explore residency programmes\n3. Discuss business expansion\n4. Schedule a free consultation\n\nPlease let me know how I can help.";
}

export default function AIChat({ dict }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(userMessage);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gold text-white rounded-full flex items-center justify-center shadow-lg shadow-gold/20 hover:bg-gold-light transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-background border border-border rounded-sm shadow-2xl shadow-black/10 flex flex-col"
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
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={12} className="text-gold" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-gold/10 text-foreground border border-gold/20'
                        : 'bg-background text-muted-light border border-border'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot size={12} className="text-gold" />
                  </div>
                  <div className="bg-background border border-border px-4 py-3 text-sm">
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
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
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
