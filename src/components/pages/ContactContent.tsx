'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, CheckCircle, ChevronDown } from 'lucide-react';
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
    'w-full bg-white/[0.02] border border-white/10 rounded-lg text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-gold/60 focus:bg-white/[0.04] transition-all duration-300';
  const labelClass = 'block text-sm font-medium text-foreground/80 mb-2';

  return (
    <>
      {/* Hero — compact */}
      <section className="hero-dark relative py-20 md:py-24 overflow-hidden">
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
      <section className="py-20 bg-background">
        <div className="site-container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5" style={{ gap: '80px' }}>

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
                      <div className="mb-10">
                        <span className="text-gold text-xs font-medium tracking-widest uppercase block" style={{ marginBottom: '12px' }}>
                          {locale === 'en' ? 'Get In Touch' : 'İletişime Geçin'}
                        </span>
                        <h2
                          className="text-3xl md:text-4xl font-light"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {locale === 'en' ? 'Request a ' : 'Danışmanlık '}
                          <span className="text-gradient-gold">
                            {locale === 'en' ? 'Consultation' : 'Talep Edin'}
                          </span>
                        </h2>
                        <p style={{ lineHeight: '1.8', color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginTop: '16px', marginBottom: '36px', maxWidth: '480px' }}>
                          {locale === 'en'
                            ? 'Complete the form below and a member of our advisory team will be in touch shortly.'
                            : 'Aşağıdaki formu doldurun, danışmanlık ekibimizden biri en kısa sürede sizinle iletişime geçecektir.'}
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6" style={{ paddingTop: '48px' }}>
                        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '20px' }}>
                          <div>
                            <label className={labelClass}>{form.name} *</label>
                            <input type="text" name="firstname" required className={inputClass} placeholder={form.name} style={{ padding: '14px 16px', lineHeight: '1.6' }} />
                          </div>
                          <div>
                            <label className={labelClass}>{form.email} *</label>
                            <input type="email" name="email" required className={inputClass} placeholder={form.email} style={{ padding: '14px 16px', lineHeight: '1.6' }} />
                          </div>
                          <div>
                            <label className={labelClass}>{form.phone} *</label>
                            <input type="tel" name="phone" required className={inputClass} placeholder={form.phone} style={{ padding: '14px 16px', lineHeight: '1.6' }} />
                          </div>
                          <div>
                            <label className={labelClass}>{form.location}</label>
                            <input type="text" name="city" className={inputClass} placeholder={form.location} style={{ padding: '14px 16px', lineHeight: '1.6' }} />
                          </div>
                          <div>
                            <label htmlFor="budget" className={labelClass}>{form.budget} *</label>
                            <div className="relative">
                              <select
                                id="budget"
                                name="budget"
                                required
                                className={`${inputClass} appearance-none cursor-pointer pr-10`}
                                style={{ padding: '14px 16px', lineHeight: '1.6' }}
                              >
                                <option value="" className="bg-[#091B2A] text-muted">{locale === 'en' ? 'Select budget range' : 'Bütçe aralığı seçin'}</option>
                                {form.budgetOptions.map((opt) => (
                                  <option key={opt} value={opt} className="bg-[#091B2A] text-foreground">{opt}</option>
                                ))}
                              </select>
                              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/50 pointer-events-none" />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="interest" className={labelClass}>{form.interest} *</label>
                            <div className="relative">
                              <select
                                id="interest"
                                name="interest"
                                required
                                className={`${inputClass} appearance-none cursor-pointer pr-10`}
                                style={{ padding: '14px 16px', lineHeight: '1.6' }}
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

                        <div style={{ marginTop: '24px' }}>
                          <label className={labelClass}>{form.message}</label>
                          <textarea
                            name="message"
                            rows={6}
                            className={`${inputClass} resize-none`}
                            style={{ minHeight: '130px', padding: '14px 16px', lineHeight: '1.6' }}
                            placeholder={form.message}
                          />
                        </div>

                        <div style={{ marginTop: '32px' }}>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full inline-flex items-center justify-center gap-3 bg-gold text-white uppercase hover:bg-gold-light disabled:opacity-50 transition-all duration-300 rounded-lg"
                            style={{ padding: '16px 0', fontSize: '14px', fontWeight: 600, letterSpacing: '0.08em' }}
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
                              <>{form.submit}</>
                            )}
                          </button>
                          <p className="mt-4 text-sm text-white/50 text-center">{form.note}</p>
                        </div>
                      </form>
                    </>
                  )}
                </AnimatedSection>
              </div>

              {/* RIGHT — Contact Info (2 cols) */}
              <div className="lg:col-span-2">
                <AnimatedSection delay={0.15}>
                  <div
                    className="lg:sticky lg:top-32"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '16px',
                      padding: '32px',
                    }}
                  >

                    {/* Direct Contact */}
                    <div>
                      <h3
                        className="text-lg font-medium mb-8 text-center"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {locale === 'en' ? 'Direct Contact' : 'Doğrudan İletişim'}
                      </h3>
                      <div>
                        <a href="tel:+447491510941" className="flex items-center group" style={{ gap: '16px', marginBottom: '28px' }}>
                          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Phone size={18} className="text-gold" />
                          </div>
                          <div>
                            <p className="text-base font-medium text-white group-hover:text-gold transition-colors">+44 7491 510941</p>
                          </div>
                        </a>
                        <a href="tel:+447769212877" className="flex items-center group" style={{ gap: '16px', marginBottom: '28px' }}>
                          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Phone size={18} className="text-gold" />
                          </div>
                          <div>
                            <p className="text-base font-medium text-white group-hover:text-gold transition-colors">+44 7769 212877</p>
                          </div>
                        </a>
                        <a href="mailto:info@innovest.uk" className="flex items-center group" style={{ gap: '16px', marginBottom: '28px' }}>
                          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Mail size={18} className="text-gold" />
                          </div>
                          <div>
                            <p className="text-base font-medium text-white group-hover:text-gold transition-colors">info@innovest.uk</p>
                          </div>
                        </a>
                        <a href="https://wa.me/447491510941" target="_blank" rel="noopener noreferrer" className="flex items-center group" style={{ gap: '16px' }}>
                          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-base font-medium text-white group-hover:text-gold transition-colors">
                              {locale === 'en' ? 'Send a message' : 'Mesaj gönderin'}
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Headquarters */}
                    <div style={{ marginTop: '28px', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <h3
                        className="text-lg font-medium mb-6 text-center"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {locale === 'en' ? 'Headquarters' : 'Merkez Ofis'}
                      </h3>
                      <div className="flex items-start gap-4 mb-5">
                        <MapPin size={18} className="text-gold mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-white/80 text-center w-full" style={{ lineHeight: '1.8' }}>
                          Berkeley Square House, 2nd Floor,<br />
                          Berkeley Square, Mayfair,<br />
                          London W1J 6BE
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Clock size={18} className="text-gold flex-shrink-0" />
                        <p className="text-sm text-white/80">
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
      <section className="bg-surface" style={{ paddingTop: '128px', paddingBottom: '128px' }}>
        <div className="site-container">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="text-gold text-xs font-semibold tracking-widest uppercase block" style={{ marginBottom: '16px' }}>
                {locale === 'en' ? 'Our Offices' : 'Ofislerimiz'}
              </span>
              <h2
                className="text-4xl md:text-5xl font-medium"
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

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24" style={{ marginTop: '48px' }}>
            {/* London */}
            <AnimatedSection delay={0}>
              <div
                className="h-full flex flex-col transition-all duration-500"
                style={{
                  padding: '32px',
                  borderRadius: '16px',
                  border: '1px solid var(--gold)',
                  background: 'rgba(255,255,255,0.04)',
                  boxShadow: '0 0 40px rgba(201, 168, 76, 0.08)',
                }}
              >
                <div className="flex items-center gap-3" style={{ marginBottom: '12px' }}>
                  <span className="text-2xl" aria-hidden="true">&#x1F1EC;&#x1F1E7;</span>
                  <h3 className="text-2xl font-medium text-white" style={{ fontFamily: 'var(--font-display)' }}>
                    {locale === 'en' ? 'London' : 'Londra'}
                  </h3>
                </div>
                <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 600, display: 'block', marginBottom: '32px' }}>
                  {locale === 'en' ? 'Headquarters' : 'Merkez Ofis'}
                </span>
                <div className="space-y-5 mt-auto">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gold opacity-80 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-white/70 leading-relaxed">
                      Berkeley Square House,<br />
                      Mayfair, London W1J 6BE
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-gold opacity-80 flex-shrink-0" />
                    <a href="tel:+447491510941" className="text-sm text-white/70 hover:text-gold transition-colors leading-relaxed">+44 7491 510941</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-gold opacity-80 flex-shrink-0" />
                    <a href="tel:+447769212877" className="text-sm text-white/70 hover:text-gold transition-colors leading-relaxed">+44 7769 212877</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-gold opacity-80 flex-shrink-0" />
                    <a href="mailto:info@innovest.uk" className="text-sm text-white/70 hover:text-gold transition-colors leading-relaxed">info@innovest.uk</a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Dubai */}
            <AnimatedSection delay={0.1}>
              <div
                className="h-full flex flex-col transition-all duration-500"
                style={{
                  padding: '32px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                <div className="flex items-center gap-3" style={{ marginBottom: '12px' }}>
                  <span className="text-2xl" aria-hidden="true">&#x1F1E6;&#x1F1EA;</span>
                  <h3 className="text-2xl font-medium text-white" style={{ fontFamily: 'var(--font-display)' }}>
                    Dubai
                  </h3>
                </div>
                <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 600, display: 'block', marginBottom: '32px' }}>
                  {locale === 'en' ? 'Middle East' : 'Orta Doğu'}
                </span>
                <div className="space-y-5 mt-auto">
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-gold opacity-80 flex-shrink-0" />
                    <a href="tel:+971547550101" className="text-sm text-white/70 hover:text-gold transition-colors leading-relaxed">+971 54 755 0101</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-gold opacity-80 flex-shrink-0" />
                    <a href="mailto:info@innovest.uk" className="text-sm text-white/70 hover:text-gold transition-colors leading-relaxed">info@innovest.uk</a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Turkey */}
            <AnimatedSection delay={0.2}>
              <div
                className="h-full flex flex-col transition-all duration-500"
                style={{
                  padding: '32px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                <div className="flex items-center gap-3" style={{ marginBottom: '12px' }}>
                  <span className="text-2xl" aria-hidden="true">&#x1F1F9;&#x1F1F7;</span>
                  <h3 className="text-2xl font-medium text-white" style={{ fontFamily: 'var(--font-display)' }}>
                    Türkiye
                  </h3>
                </div>
                <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 600, display: 'block', marginBottom: '32px' }}>
                  {locale === 'en' ? 'Representative' : 'Temsilcilik'}
                </span>
                <div className="space-y-5 mt-auto">
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-gold opacity-80 flex-shrink-0" />
                    <a href="tel:+905314200331" className="text-sm text-white/70 hover:text-gold transition-colors leading-relaxed">+90 531 420 0331</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-gold opacity-80 flex-shrink-0" />
                    <a href="mailto:info@innovest.uk" className="text-sm text-white/70 hover:text-gold transition-colors leading-relaxed">info@innovest.uk</a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-background border-t border-border" style={{ paddingTop: '80px', paddingBottom: '96px' }}>
        <div className="site-container">
          <AnimatedSection>
            <div className="max-w-5xl mx-auto">
              <div className="text-center">
                <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-2 block">
                  {locale === 'en' ? 'Find Us' : 'Bizi Bulun'}
                </span>
                <h3
                  className="text-4xl font-medium mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Berkeley Square, Mayfair
                </h3>
                <p className="text-base text-white/60">
                  Berkeley Square House, 2nd Floor, London W1J 6BE
                </p>
              </div>
              <div
                className="relative w-full h-[480px]"
                style={{ marginTop: '32px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=Berkeley+Square+House,+Mayfair,+London+W1J+6BE&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Innovest Capital London Office"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
