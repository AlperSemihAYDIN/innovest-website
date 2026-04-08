'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Clock, Banknote } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import type { Dictionary } from '@/lib/dictionary';

interface ResidencyContentProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

const countryImages: Record<string, string> = {
  Portugal: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800',
  Portekiz: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800',
  Greece: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800',
  Yunanistan: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800',
  UAE: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800',
  BAE: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800',
  'United Kingdom': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800',
  'İngiltere': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800',
};

export default function ResidencyContent({ dict, locale }: ResidencyContentProps) {
  const prefix = locale === 'tr' ? '/tr' : '';

  return (
    <>
      {/* Hero */}
      <section className="hero-dark relative py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070"
            alt="Residency by Investment"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="relative px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 flex flex-col items-center">
          <AnimatedSection>
            <SectionHeading
              tagline={dict.residencyPage.tagline}
              title={dict.residencyPage.title}
              titleHighlight={dict.residencyPage.titleHighlight}
              subtitle={dict.residencyPage.subtitle}
              center
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Programmes */}
      <section className="py-56 md:py-80 bg-background">
        <div className="px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dict.residencyPage.programmes.map((programme, index) => (
              <AnimatedSection key={programme.country} delay={index * 0.1}>
                <div className="bg-surface border border-border overflow-hidden group hover:border-gold/30 transition-all duration-500">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={countryImages[programme.country] || countryImages['Portugal']}
                      alt={programme.country}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                      <span className="text-xs text-gold tracking-widest uppercase">{programme.country}</span>
                      <h3 className="text-2xl font-light text-white mt-1" style={{ fontFamily: 'var(--font-display)' }}>
                        {programme.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-6 mb-6 text-sm">
                      <span className="flex items-center gap-2 text-gold">
                        <Banknote size={16} />
                        {programme.investment}
                      </span>
                      <span className="flex items-center gap-2 text-muted">
                        <Clock size={16} />
                        {programme.timeline}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {programme.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-sm text-muted">
                          <Check size={14} className="text-gold flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`${prefix}/contact`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 border border-border text-sm hover:border-gold hover:text-gold transition-all duration-300 group/btn"
                    >
                      {locale === 'en' ? 'Get Expert Guidance' : 'Uzman Rehberliği Alın'}
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-56 md:py-80 bg-surface">
        <div className="px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 flex flex-col items-center">
          <AnimatedSection>
            <div className="text-center mb-20">
              <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4 block">
                {locale === 'en' ? 'The Process' : 'Süreç'}
              </span>
              <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
                {locale === 'en' ? 'How It ' : 'Nasıl '}
                <span className="text-gradient-gold">{locale === 'en' ? 'Works' : 'Çalışır'}</span>
              </h2>
              <div className="gold-line-center mt-6" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '01', title: locale === 'en' ? 'Initial Consultation' : 'İlk Danışmanlık', desc: locale === 'en' ? 'We assess your goals, budget and preferred destinations.' : 'Hedeflerinizi, bütçenizi ve tercih ettiğiniz destinasyonları değerlendiriyoruz.' },
              { num: '02', title: locale === 'en' ? 'Programme Selection' : 'Program Seçimi', desc: locale === 'en' ? 'We recommend the most suitable residency programme for you.' : 'Size en uygun oturum programını öneriyoruz.' },
              { num: '03', title: locale === 'en' ? 'Application & Investment' : 'Başvuru & Yatırım', desc: locale === 'en' ? 'We handle all documentation and guide you through the investment.' : 'Tüm belgeleri hazırlıyor ve yatırım sürecinde size rehberlik ediyoruz.' },
              { num: '04', title: locale === 'en' ? 'Approval & Beyond' : 'Onay & Sonrası', desc: locale === 'en' ? 'From permit receipt to renewal and citizenship pathways.' : 'İzin alımından yenileme ve vatandaşlık yollarına kadar.' },
            ].map((step, index) => (
              <AnimatedSection key={step.num} delay={index * 0.15}>
                <div className="text-center group">
                  <span className="text-4xl font-light text-gold/20 group-hover:text-gold/40 transition-colors block mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                    {step.num}
                  </span>
                  <h3 className="text-lg font-light mb-3 group-hover:text-gold transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-48 md:py-64 bg-background border-t border-border">
        <div className="px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 flex flex-col items-center">
          <div className="flex flex-col items-center text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                {locale === 'en' ? 'Start Your Residency ' : 'Oturum Yolculuğunuza '}
                <span className="text-gradient-gold">{locale === 'en' ? 'Journey' : 'Başlayın'}</span>
              </h2>
              <p className="text-muted mb-10 max-w-2xl mx-auto">
                {locale === 'en'
                  ? 'Our immigration and investment experts are ready to guide you through the entire process.'
                  : 'Göç ve yatırım uzmanlarımız tüm süreçte size rehberlik etmeye hazır.'}
              </p>
              <Link
                href={`${prefix}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-white font-medium hover:bg-gold-light transition-all duration-300 btn-shine group"
              >
                {dict.nav.getConsultation}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
