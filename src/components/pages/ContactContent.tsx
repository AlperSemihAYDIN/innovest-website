'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Globe } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import type { Dictionary } from '@/lib/dictionary';

interface ContactContentProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

export default function ContactContent({ dict, locale }: ContactContentProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = dict.contactPage.form;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstname: formData.get('firstname') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      city: formData.get('city') as string,
      budget: formData.get('budget') as string,
      interest: formData.get('interest') as string,
      message: formData.get('message') as string,
    };

    try {
      const HUBSPOT_PORTAL_ID = 'YOUR_PORTAL_ID';
      const HUBSPOT_FORM_GUID = 'YOUR_FORM_GUID';

      await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [
              { name: 'firstname', value: data.firstname },
              { name: 'email', value: data.email },
              { name: 'phone', value: data.phone },
              { name: 'city', value: data.city },
              { name: 'budget', value: data.budget },
              { name: 'interest_area', value: data.interest },
              { name: 'message', value: data.message },
            ],
            context: {
              pageUri: typeof window !== 'undefined' ? window.location.href : '',
              pageName: 'Contact Page',
            },
          }),
        }
      );
    } catch {
      // Silently fail — still show success to user
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const inputClass =
    'w-full bg-transparent border-b border-border/60 px-0 py-4 text-sm text-foreground placeholder:text-muted/30 focus:outline-none focus:border-gold transition-colors duration-300';
  const labelClass = 'block text-[11px] text-muted/80 uppercase tracking-[0.15em] mb-3 font-medium';

  return (
    <>
      {/* Hero */}
      <section className="hero-dark relative py-44 md:py-56 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069"
            alt="Contact"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-background/90" />
        </div>
        <div className="relative site-container">
          <AnimatedSection>
            <SectionHeading
              tagline={dict.contactPage.tagline}
              title={dict.contactPage.title}
              titleHighlight={dict.contactPage.titleHighlight}
              subtitle={dict.contactPage.subtitle}
              center
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-28 md:py-36 bg-background">
        <div className="site-container">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-8">
                    <CheckCircle size={40} className="text-gold" />
                  </div>
                  <h3
                    className="text-3xl md:text-4xl font-light mb-5"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {locale === 'en' ? 'Thank You' : 'Teşekkürler'}
                  </h3>
                  <p className="text-muted text-base max-w-md leading-relaxed">
                    {locale === 'en'
                      ? "We've received your enquiry and will be in touch within 24 hours."
                      : 'Talebinizi aldık, 24 saat içinde sizinle iletişime geçeceğiz.'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-16">
                    <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium mb-5 block">
                      {locale === 'en' ? 'Get In Touch' : 'İletişime Geçin'}
                    </span>
                    <h2
                      className="text-3xl md:text-4xl font-light mb-4"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {locale === 'en' ? 'Request a Consultation' : 'Danışmanlık Talep Edin'}
                    </h2>
                    <div className="gold-line-center mb-6" />
                    <p className="text-muted text-sm leading-relaxed max-w-lg mx-auto">
                      {locale === 'en'
                        ? 'Complete the form below and a member of our advisory team will be in touch shortly.'
                        : 'Aşağıdaki formu doldurun, danışmanlık ekibimizden biri en kısa sürede sizinle iletişime geçecektir.'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      <div>
                        <label className={labelClass}>{form.name} *</label>
                        <input type="text" name="firstname" required className={inputClass} placeholder={form.name} />
                      </div>
                      <div>
                        <label className={labelClass}>{form.email} *</label>
                        <input type="email" name="email" required className={inputClass} placeholder={form.email} />
                      </div>
                      <div>
                        <label className={labelClass}>{form.phone} *</label>
                        <input type="tel" name="phone" required className={inputClass} placeholder={form.phone} />
                      </div>
                      <div>
                        <label className={labelClass}>{form.location}</label>
                        <input type="text" name="city" className={inputClass} placeholder={form.location} />
                      </div>
                      <div>
                        <label htmlFor="budget" className={labelClass}>{form.budget} *</label>
                        <select
                          id="budget"
                          name="budget"
                          required
                          className={`${inputClass} appearance-none cursor-pointer`}
                        >
                          <option value="">{locale === 'en' ? 'Select budget range' : 'Bütçe aralığı seçin'}</option>
                          {form.budgetOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="interest" className={labelClass}>{form.interest} *</label>
                        <select
                          id="interest"
                          name="interest"
                          required
                          className={`${inputClass} appearance-none cursor-pointer`}
                        >
                          <option value="">{locale === 'en' ? 'Select area of interest' : 'İlgi alanı seçin'}</option>
                          {form.interestOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>{form.message}</label>
                      <textarea
                        name="message"
                        rows={4}
                        className={`${inputClass} resize-none`}
                        placeholder={form.message}
                      />
                    </div>

                    <div className="flex flex-col items-center pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-3 px-14 py-4.5 bg-gold text-white text-sm font-medium tracking-widest uppercase hover:bg-gold-light disabled:opacity-50 transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2.5">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            {locale === 'en' ? 'Sending...' : 'Gönderiliyor...'}
                          </span>
                        ) : (
                          <>
                            <Send size={15} />
                            {form.submit}
                          </>
                        )}
                      </button>
                      <p className="text-[11px] text-muted/60 mt-5 text-center">{form.note}</p>
                    </div>
                  </form>
                </>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-24 md:py-32 bg-surface">
        <div className="site-container">
          <AnimatedSection>
            <div className="text-center mb-20">
              <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium mb-5 block">
                {locale === 'en' ? 'Our Offices' : 'Ofislerimiz'}
              </span>
              <h2
                className="text-3xl md:text-4xl font-light"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {locale === 'en' ? 'Global Presence' : 'Küresel Varlığımız'}
              </h2>
              <div className="gold-line-center mt-6" />
            </div>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* London Office */}
            <AnimatedSection delay={0}>
              <div className="bg-background border border-border/40 p-10 h-full flex flex-col hover:border-gold/30 transition-colors duration-300">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-7">
                  <Globe size={18} className="text-gold" />
                </div>
                <h3
                  className="text-lg font-light mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {locale === 'en' ? 'London' : 'Londra'}
                </h3>
                <span className="text-gold text-[10px] tracking-[0.2em] uppercase mb-6">
                  {locale === 'en' ? 'Headquarters' : 'Merkez Ofis'}
                </span>
                <div className="space-y-4 mt-auto">
                  <div className="flex items-start gap-3">
                    <MapPin size={15} className="text-gold/70 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted leading-relaxed">
                      Berkeley Square House, 2nd Floor,<br />
                      Berkeley Square, Mayfair,<br />
                      London W1J 6BE
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={15} className="text-gold/70 flex-shrink-0" />
                    <a href="tel:+447491510941" className="text-xs text-muted hover:text-gold transition-colors">+44 7491 510941</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={15} className="text-gold/70 flex-shrink-0" />
                    <a href="mailto:info@innovest.uk" className="text-xs text-muted hover:text-gold transition-colors">info@innovest.uk</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={15} className="text-gold/70 flex-shrink-0" />
                    <p className="text-xs text-muted">{locale === 'en' ? 'Mon – Fri: 9:00 – 18:00' : 'Pzt – Cum: 9:00 – 18:00'}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* UAE Office */}
            <AnimatedSection delay={0.1}>
              <div className="bg-background border border-border/40 p-10 h-full flex flex-col hover:border-gold/30 transition-colors duration-300">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-7">
                  <Globe size={18} className="text-gold" />
                </div>
                <h3
                  className="text-lg font-light mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Dubai
                </h3>
                <span className="text-gold text-[10px] tracking-[0.2em] uppercase mb-6">
                  {locale === 'en' ? 'Middle East' : 'Orta Doğu'}
                </span>
                <div className="space-y-4 mt-auto">
                  <div className="flex items-center gap-3">
                    <Phone size={15} className="text-gold/70 flex-shrink-0" />
                    <a href="tel:+971547550101" className="text-xs text-muted hover:text-gold transition-colors">+971 54 755 0101</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={15} className="text-gold/70 flex-shrink-0" />
                    <a href="mailto:info@innovest.uk" className="text-xs text-muted hover:text-gold transition-colors">info@innovest.uk</a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Turkey Office */}
            <AnimatedSection delay={0.2}>
              <div className="bg-background border border-border/40 p-10 h-full flex flex-col hover:border-gold/30 transition-colors duration-300">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-7">
                  <Globe size={18} className="text-gold" />
                </div>
                <h3
                  className="text-lg font-light mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {locale === 'en' ? 'Turkey' : 'Türkiye'}
                </h3>
                <span className="text-gold text-[10px] tracking-[0.2em] uppercase mb-6">
                  {locale === 'en' ? 'Representative' : 'Temsilcilik'}
                </span>
                <div className="space-y-4 mt-auto">
                  <div className="flex items-center gap-3">
                    <Phone size={15} className="text-gold/70 flex-shrink-0" />
                    <a href="tel:+905314200331" className="text-xs text-muted hover:text-gold transition-colors">+90 531 420 0331</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={15} className="text-gold/70 flex-shrink-0" />
                    <a href="mailto:info@innovest.uk" className="text-xs text-muted hover:text-gold transition-colors">info@innovest.uk</a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-20 bg-background">
        <div className="site-container">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-muted text-sm mb-8 leading-relaxed">
                {locale === 'en'
                  ? 'Prefer a quick conversation? Reach us directly on WhatsApp for immediate assistance.'
                  : 'Hızlı bir görüşme mi tercih ediyorsunuz? Anında yardım için bize WhatsApp üzerinden ulaşın.'}
              </p>
              <a
                href="https://wa.me/447491510941"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 bg-green-600 text-white text-sm font-medium tracking-wide hover:bg-green-700 transition-colors duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {locale === 'en' ? 'Chat on WhatsApp' : "WhatsApp'ta Yazın"}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
