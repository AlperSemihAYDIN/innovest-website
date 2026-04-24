'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Globe, ArrowRight, ChevronDown } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import type { Dictionary } from '@/lib/dictionary';

interface ContactContentProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

export default function ContactContent({ dict, locale }: ContactContentProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        setSubmitError(true);
        setIsSubmitting(false);
        return;
      }
    } catch {
      setSubmitError(true);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const inputClass =
    'w-full bg-transparent border-b border-gold/15 px-0 py-5 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-gold/60 transition-colors duration-500';
  const labelClass = 'block text-[10px] text-gold/70 uppercase tracking-[0.2em] mb-2 font-medium';

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

      {/* Main Content — Two Column Premium Layout */}
      <section className="py-32 md:py-40 bg-background min-h-[80vh] flex flex-col justify-center">
        <div className="site-container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 lg:gap-24">

              {/* LEFT — Form (3 cols) */}
              <div className="lg:col-span-3">
                <AnimatedSection>
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-28 text-center">
                      <div className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center mb-10">
                        <CheckCircle size={44} className="text-gold" />
                      </div>
                      <h3
                        className="text-3xl md:text-4xl font-light mb-6"
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
                  ) : submitError ? (
                    <div className="flex flex-col items-center justify-center py-28 text-center">
                      <p className="text-red-400 text-base max-w-md leading-relaxed mb-6">
                        {locale === 'en'
                          ? 'Something went wrong. Please try again or contact us directly.'
                          : 'Bir hata oluştu. Lütfen tekrar deneyin veya bize doğrudan ulaşın.'}
                      </p>
                      <button
                        onClick={() => setSubmitError(false)}
                        className="text-gold text-sm underline underline-offset-4"
                      >
                        {locale === 'en' ? 'Try again' : 'Tekrar dene'}
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-14">
                        <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium mb-5 block">
                          {locale === 'en' ? 'Get In Touch' : 'İletişime Geçin'}
                        </span>
                        <h2
                          className="text-3xl md:text-4xl font-light mb-5"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {locale === 'en' ? 'Request a ' : 'Danışmanlık '}
                          <span className="text-gradient-gold">
                            {locale === 'en' ? 'Consultation' : 'Talep Edin'}
                          </span>
                        </h2>
                        <div className="w-12 h-px bg-gold/40 mb-7" />
                        <p className="text-muted text-sm leading-relaxed max-w-lg">
                          {locale === 'en'
                            ? 'Complete the form below and a member of our advisory team will be in touch shortly.'
                            : 'Aşağıdaki formu doldurun, danışmanlık ekibimizden biri en kısa sürede sizinle iletişime geçecektir.'}
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
                          <div className="py-5">
                            <label className={labelClass}>{form.name} *</label>
                            <input type="text" name="firstname" required className={inputClass} placeholder={form.name} />
                          </div>
                          <div className="py-5">
                            <label className={labelClass}>{form.email} *</label>
                            <input type="email" name="email" required className={inputClass} placeholder={form.email} />
                          </div>
                          <div className="py-5">
                            <label className={labelClass}>{form.phone} *</label>
                            <input type="tel" name="phone" required className={inputClass} placeholder={form.phone} />
                          </div>
                          <div className="py-5">
                            <label className={labelClass}>{form.location}</label>
                            <input type="text" name="city" className={inputClass} placeholder={form.location} />
                          </div>
                          <div className="py-5">
                            <label htmlFor="budget" className={labelClass}>{form.budget} *</label>
                            <div className="relative">
                              <select
                                id="budget"
                                name="budget"
                                required
                                className="w-full bg-[#091B2A] border border-gold/15 px-4 py-4 pr-10 text-sm text-foreground focus:outline-none focus:border-gold/60 transition-colors duration-500 appearance-none cursor-pointer rounded-lg"
                              >
                                <option value="" className="bg-[#091B2A] text-muted">{locale === 'en' ? 'Select budget range' : 'Bütçe aralığı seçin'}</option>
                                {form.budgetOptions.map((opt) => (
                                  <option key={opt} value={opt} className="bg-[#091B2A] text-foreground">{opt}</option>
                                ))}
                              </select>
                              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/50 pointer-events-none" />
                            </div>
                          </div>
                          <div className="py-5">
                            <label htmlFor="interest" className={labelClass}>{form.interest} *</label>
                            <div className="relative">
                              <select
                                id="interest"
                                name="interest"
                                required
                                className="w-full bg-[#091B2A] border border-gold/15 px-4 py-4 pr-10 text-sm text-foreground focus:outline-none focus:border-gold/60 transition-colors duration-500 appearance-none cursor-pointer rounded-lg"
                              >
                                <option value="" className="bg-[#091B2A] text-muted">{locale === 'en' ? 'Select area of interest' : 'İlgi alanı seçin'}</option>
                                {form.interestOptions.map((opt) => (
                                  <option key={opt} value={opt} className="bg-[#091B2A] text-foreground">{opt}</option>
                                ))}
                              </select>
                              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/50 pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        <div className="py-5">
                          <label className={labelClass}>{form.message}</label>
                          <textarea
                            name="message"
                            rows={4}
                            className={`${inputClass} resize-none`}
                            placeholder={form.message}
                          />
                        </div>

                        <div className="pt-10">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center gap-3 px-16 py-5 bg-gold text-white text-sm font-medium tracking-[0.15em] uppercase hover:bg-gold-light disabled:opacity-50 transition-all duration-300 rounded-lg"
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
                          <p className="text-[11px] text-muted/50 mt-6">{form.note}</p>
                        </div>
                      </form>
                    </>
                  )}
                </AnimatedSection>
              </div>

              {/* RIGHT — Contact Info (2 cols) */}
              <div className="lg:col-span-2">
                <AnimatedSection delay={0.15}>
                  <div className="lg:sticky lg:top-32 space-y-12">

                    {/* Direct Contact */}
                    <div>
                      <h3
                        className="text-lg font-light mb-8"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {locale === 'en' ? 'Direct Contact' : 'Doğrudan İletişim'}
                      </h3>
                      <div className="space-y-7">
                        <a href="tel:+447491510941" className="flex items-center gap-5 group">
                          <div className="w-12 h-12 rounded-full bg-gold/8 flex items-center justify-center group-hover:bg-gold/15 transition-colors duration-300">
                            <Phone size={18} className="text-gold" />
                          </div>
                          <div>
                            <p className="text-[10px] text-muted/60 uppercase tracking-[0.15em] mb-1">
                              {locale === 'en' ? 'Phone' : 'Telefon'}
                            </p>
                            <p className="text-sm text-foreground group-hover:text-gold transition-colors">+44 7491 510941</p>
                          </div>
                        </a>
                        <a href="tel:+447769212877" className="flex items-center gap-5 group">
                          <div className="w-12 h-12 rounded-full bg-gold/8 flex items-center justify-center group-hover:bg-gold/15 transition-colors duration-300">
                            <Phone size={18} className="text-gold" />
                          </div>
                          <div>
                            <p className="text-[10px] text-muted/60 uppercase tracking-[0.15em] mb-1">
                              {locale === 'en' ? 'Phone' : 'Telefon'}
                            </p>
                            <p className="text-sm text-foreground group-hover:text-gold transition-colors">+44 7769 212877</p>
                          </div>
                        </a>
                        <a href="mailto:info@innovest.uk" className="flex items-center gap-5 group">
                          <div className="w-12 h-12 rounded-full bg-gold/8 flex items-center justify-center group-hover:bg-gold/15 transition-colors duration-300">
                            <Mail size={18} className="text-gold" />
                          </div>
                          <div>
                            <p className="text-[10px] text-muted/60 uppercase tracking-[0.15em] mb-1">
                              {locale === 'en' ? 'Email' : 'E-posta'}
                            </p>
                            <p className="text-sm text-foreground group-hover:text-gold transition-colors">info@innovest.uk</p>
                          </div>
                        </a>
                        <a href="https://wa.me/447491510941" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group">
                          <div className="w-12 h-12 rounded-full bg-gold/8 flex items-center justify-center group-hover:bg-gold/15 transition-colors duration-300">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted/60 uppercase tracking-[0.15em] mb-1">WhatsApp</p>
                            <p className="text-sm text-foreground group-hover:text-gold transition-colors">
                              {locale === 'en' ? 'Send a message' : 'Mesaj gönderin'}
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-border/20" />

                    {/* Headquarters */}
                    <div>
                      <h3
                        className="text-lg font-light mb-6"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {locale === 'en' ? 'Headquarters' : 'Merkez Ofis'}
                      </h3>
                      <div className="flex items-start gap-4 mb-5">
                        <MapPin size={16} className="text-gold/60 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted leading-relaxed">
                          Berkeley Square House, 2nd Floor,<br />
                          Berkeley Square, Mayfair,<br />
                          London W1J 6BE
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Clock size={16} className="text-gold/60 flex-shrink-0" />
                        <p className="text-sm text-muted">
                          {locale === 'en' ? 'Mon – Fri: 9:00 – 18:00' : 'Pzt – Cum: 9:00 – 18:00'}
                        </p>
                      </div>
                    </div>

                  </div>
                </AnimatedSection>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-28 md:py-36 bg-surface min-h-[60vh] flex flex-col justify-center">
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
                {locale === 'en' ? 'Global ' : 'Küresel '}
                <span className="text-gradient-gold">
                  {locale === 'en' ? 'Presence' : 'Varlığımız'}
                </span>
              </h2>
              <div className="gold-line-center mt-6" />
            </div>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* London */}
            <AnimatedSection delay={0}>
              <div className="bg-background border border-border/30 p-12 h-full flex flex-col hover:border-gold/25 transition-all duration-500 rounded-xl">
                <div className="w-11 h-11 rounded-full bg-gold/8 flex items-center justify-center mb-8">
                  <Globe size={18} className="text-gold" />
                </div>
                <h3
                  className="text-xl font-light mb-1.5"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {locale === 'en' ? 'London' : 'Londra'}
                </h3>
                <span className="text-gold text-[10px] tracking-[0.2em] uppercase mb-8">
                  {locale === 'en' ? 'Headquarters' : 'Merkez Ofis'}
                </span>
                <div className="space-y-5 mt-auto">
                  <div className="flex items-start gap-3.5">
                    <MapPin size={15} className="text-gold/50 mt-0.5 flex-shrink-0" />
                    <p className="text-[13px] text-muted/80 leading-relaxed">
                      Berkeley Square House,<br />
                      Mayfair, London W1J 6BE
                    </p>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <Phone size={15} className="text-gold/50 flex-shrink-0" />
                    <a href="tel:+447491510941" className="text-[13px] text-muted/80 hover:text-gold transition-colors">+44 7491 510941</a>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <Phone size={15} className="text-gold/50 flex-shrink-0" />
                    <a href="tel:+447769212877" className="text-[13px] text-muted/80 hover:text-gold transition-colors">+44 7769 212877</a>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <Mail size={15} className="text-gold/50 flex-shrink-0" />
                    <a href="mailto:info@innovest.uk" className="text-[13px] text-muted/80 hover:text-gold transition-colors">info@innovest.uk</a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Dubai */}
            <AnimatedSection delay={0.1}>
              <div className="bg-background border border-border/30 p-12 h-full flex flex-col hover:border-gold/25 transition-all duration-500 rounded-xl">
                <div className="w-11 h-11 rounded-full bg-gold/8 flex items-center justify-center mb-8">
                  <Globe size={18} className="text-gold" />
                </div>
                <h3
                  className="text-xl font-light mb-1.5"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Dubai
                </h3>
                <span className="text-gold text-[10px] tracking-[0.2em] uppercase mb-8">
                  {locale === 'en' ? 'Middle East' : 'Orta Doğu'}
                </span>
                <div className="space-y-5 mt-auto">
                  <div className="flex items-center gap-3.5">
                    <Phone size={15} className="text-gold/50 flex-shrink-0" />
                    <a href="tel:+971547550101" className="text-[13px] text-muted/80 hover:text-gold transition-colors">+971 54 755 0101</a>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <Mail size={15} className="text-gold/50 flex-shrink-0" />
                    <a href="mailto:info@innovest.uk" className="text-[13px] text-muted/80 hover:text-gold transition-colors">info@innovest.uk</a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Turkey */}
            <AnimatedSection delay={0.2}>
              <div className="bg-background border border-border/30 p-12 h-full flex flex-col hover:border-gold/25 transition-all duration-500 rounded-xl">
                <div className="w-11 h-11 rounded-full bg-gold/8 flex items-center justify-center mb-8">
                  <Globe size={18} className="text-gold" />
                </div>
                <h3
                  className="text-xl font-light mb-1.5"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {locale === 'en' ? 'Turkey' : 'Türkiye'}
                </h3>
                <span className="text-gold text-[10px] tracking-[0.2em] uppercase mb-8">
                  {locale === 'en' ? 'Representative' : 'Temsilcilik'}
                </span>
                <div className="space-y-5 mt-auto">
                  <div className="flex items-center gap-3.5">
                    <Phone size={15} className="text-gold/50 flex-shrink-0" />
                    <a href="tel:+905314200331" className="text-[13px] text-muted/80 hover:text-gold transition-colors">+90 531 420 0331</a>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <Mail size={15} className="text-gold/50 flex-shrink-0" />
                    <a href="mailto:info@innovest.uk" className="text-[13px] text-muted/80 hover:text-gold transition-colors">info@innovest.uk</a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-background border-t border-border">
        <div className="site-container py-24">
          <AnimatedSection>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-14">
                <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium mb-4 block">
                  {locale === 'en' ? 'Find Us' : 'Bizi Bulun'}
                </span>
                <h3
                  className="text-2xl font-light mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Berkeley Square, Mayfair
                </h3>
                <p className="text-sm text-muted">
                  Berkeley Square House, 2nd Floor, London W1J 6BE
                </p>
              </div>
              <div className="relative w-full aspect-[16/7] border border-border/20 overflow-hidden rounded-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.2!2d-0.14601!3d51.50990!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876052f4e8bbbe7%3A0x6f87e2f2a4e53e3b!2sBerkeley%20Square%20House%2C%20Berkeley%20Square%2C%20London%20W1J%206BE!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Innovest Capital London Office"
                  className="absolute inset-0 w-full h-full"
                />
                {/* Get Directions overlay */}
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Berkeley+Square+House,Mayfair,London+W1J+6BE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 left-4 inline-flex items-center gap-2 px-5 py-3 bg-gold text-white text-sm font-medium hover:bg-gold-light transition-colors duration-300 shadow-lg z-10 rounded-lg"
                >
                  <MapPin size={15} />
                  {locale === 'en' ? 'Get Directions' : 'Yol Tarifi Al'}
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
