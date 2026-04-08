'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
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
      // HubSpot Forms API — replace PORTAL_ID and FORM_GUID with your actual values
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

  return (
    <>
      {/* Hero */}
      <section className="hero-dark relative py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069"
            alt="Contact"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="relative px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
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

      {/* Contact Form + Info — Modern Premium Layout */}
      <section className="py-64 md:py-96 bg-background">
        <div className="px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 flex flex-col items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left — Form */}
            <div className="bg-surface p-10 md:p-14 lg:p-16">
              <AnimatedSection>
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                    <CheckCircle size={56} className="text-gold mb-8" />
                    <h3
                      className="text-3xl font-light mb-4"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {locale === 'en' ? 'Thank You!' : 'Teşekkürler!'}
                    </h3>
                    <p className="text-muted max-w-md">
                      {locale === 'en'
                        ? "We've received your enquiry and will be in touch within 24 hours."
                        : 'Talebinizi aldık, 24 saat içinde sizinle iletişime geçeceğiz.'}
                    </p>
                  </div>
                ) : (
                  <>
                    <span className="text-gold text-xs tracking-[0.2em] uppercase font-medium mb-4 block">
                      {locale === 'en' ? 'Get In Touch' : 'İletişime Geçin'}
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-light mb-3"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {locale === 'en' ? 'Request a Consultation' : 'Danışmanlık Talep Edin'}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-10">
                      {locale === 'en'
                        ? 'Complete the form below and a member of our advisory team will be in touch shortly.'
                        : 'Aşağıdaki formu doldurun, danışmanlık ekibimizden biri en kısa sürede sizinle iletişime geçecektir.'}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-7">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                        <div>
                          <label className="block text-[11px] text-muted uppercase tracking-[0.12em] mb-2.5">{form.name} *</label>
                          <input
                            type="text"
                            name="firstname"
                            required
                            className="w-full bg-background border-b border-border px-0 py-3.5 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-gold transition-colors"
                            placeholder={form.name}
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-muted uppercase tracking-[0.12em] mb-2.5">{form.email} *</label>
                          <input
                            type="email"
                            name="email"
                            required
                            className="w-full bg-background border-b border-border px-0 py-3.5 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-gold transition-colors"
                            placeholder={form.email}
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-muted uppercase tracking-[0.12em] mb-2.5">{form.phone} *</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            className="w-full bg-background border-b border-border px-0 py-3.5 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-gold transition-colors"
                            placeholder={form.phone}
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-muted uppercase tracking-[0.12em] mb-2.5">{form.location}</label>
                          <input
                            type="text"
                            name="city"
                            className="w-full bg-background border-b border-border px-0 py-3.5 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-gold transition-colors"
                            placeholder={form.location}
                          />
                        </div>
                        <div>
                          <label htmlFor="budget" className="block text-[11px] text-muted uppercase tracking-[0.12em] mb-2.5">{form.budget} *</label>
                          <select
                            id="budget"
                            name="budget"
                            required
                            className="w-full bg-background border-b border-border px-0 py-3.5 text-sm text-foreground focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                          >
                            <option value="">{locale === 'en' ? 'Select budget range' : 'Bütçe aralığı seçin'}</option>
                            {form.budgetOptions.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="interest" className="block text-[11px] text-muted uppercase tracking-[0.12em] mb-2.5">{form.interest} *</label>
                          <select
                            id="interest"
                            name="interest"
                            required
                            className="w-full bg-background border-b border-border px-0 py-3.5 text-sm text-foreground focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                          >
                            <option value="">{locale === 'en' ? 'Select area of interest' : 'İlgi alanı seçin'}</option>
                            {form.interestOptions.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-muted uppercase tracking-[0.12em] mb-2.5">{form.message}</label>
                        <textarea
                          name="message"
                          rows={4}
                          className="w-full bg-background border-b border-border px-0 py-3.5 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-gold transition-colors resize-none"
                          placeholder={form.message}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-gold text-white text-sm font-medium tracking-wide hover:bg-gold-light disabled:opacity-50 transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            {locale === 'en' ? 'Sending...' : 'Gönderiliyor...'}
                          </span>
                        ) : (
                          <>
                            <Send size={16} />
                            {form.submit}
                          </>
                        )}
                      </button>

                      <p className="text-[11px] text-muted mt-2">{form.note}</p>
                    </form>
                  </>
                )}
              </AnimatedSection>
            </div>

            {/* Right — Office Image + Contact Info */}
            <div className="relative hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200"
                alt="Innovest Office"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative z-10 flex flex-col justify-end h-full p-14 lg:p-16 text-white">
                <div className="space-y-10">
                  <div>
                    <h3
                      className="text-2xl font-light mb-6"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {locale === 'en' ? 'London Office' : 'Londra Ofisi'}
                    </h3>
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <MapPin size={18} className="text-gold mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-white/70 leading-relaxed">
                          Berkeley Square House, 2nd Floor,<br />
                          Berkeley Square, Mayfair,<br />
                          London W1J 6BE, UK
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Phone size={18} className="text-gold flex-shrink-0" />
                        <a href="tel:+447491510941" className="text-sm text-white/70 hover:text-white transition-colors">
                          +44 7491 510941
                        </a>
                      </div>
                      <div className="flex items-center gap-4">
                        <Mail size={18} className="text-gold flex-shrink-0" />
                        <a href="mailto:info@innovest.uk" className="text-sm text-white/70 hover:text-white transition-colors">
                          info@innovest.uk
                        </a>
                      </div>
                      <div className="flex items-center gap-4">
                        <Clock size={18} className="text-gold flex-shrink-0" />
                        <p className="text-sm text-white/70">
                          {locale === 'en' ? 'Mon – Fri: 9:00 – 18:00' : 'Pzt – Cum: 9:00 – 18:00'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/10" />

                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                      <span className="text-white/40 text-xs tracking-widest uppercase block mb-2">🇦🇪 UAE</span>
                      <a href="tel:+971547550101" className="text-white/70 hover:text-white transition-colors">+971 54 755 0101</a>
                    </div>
                    <div>
                      <span className="text-white/40 text-xs tracking-widest uppercase block mb-2">🇹🇷 Turkey</span>
                      <a href="tel:+905314200331" className="text-white/70 hover:text-white transition-colors">+90 531 420 0331</a>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/447491510941"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {locale === 'en' ? 'Chat on WhatsApp' : "WhatsApp'ta Yazın"}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-only contact info */}
          <div className="lg:hidden mt-10 space-y-6">
            <AnimatedSection>
              <div className="p-10 bg-surface border border-border">
                <h3
                  className="text-xl font-light mb-6"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {locale === 'en' ? 'London Office' : 'Londra Ofisi'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin size={18} className="text-gold mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted leading-relaxed">
                      Berkeley Square House, 2nd Floor,<br />
                      Berkeley Square, Mayfair,<br />
                      London W1J 6BE, UK
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone size={18} className="text-gold flex-shrink-0" />
                    <a href="tel:+447491510941" className="text-sm text-muted hover:text-gold transition-colors">+44 7491 510941</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail size={18} className="text-gold flex-shrink-0" />
                    <a href="mailto:info@innovest.uk" className="text-sm text-muted hover:text-gold transition-colors">info@innovest.uk</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock size={18} className="text-gold flex-shrink-0" />
                    <p className="text-sm text-muted">{locale === 'en' ? 'Mon – Fri: 9:00 – 18:00' : 'Pzt – Cum: 9:00 – 18:00'}</p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-border grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted text-xs tracking-widest uppercase block mb-1">🇦🇪 UAE</span>
                    <a href="tel:+971547550101" className="text-muted hover:text-gold transition-colors">+971 54 755 0101</a>
                  </div>
                  <div>
                    <span className="text-muted text-xs tracking-widest uppercase block mb-1">🇹🇷 Turkey</span>
                    <a href="tel:+905314200331" className="text-muted hover:text-gold transition-colors">+90 531 420 0331</a>
                  </div>
                </div>
                <div className="mt-6">
                  <a
                    href="https://wa.me/447491510941"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors w-full justify-center"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {locale === 'en' ? 'Chat on WhatsApp' : "WhatsApp'ta Yazın"}
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
