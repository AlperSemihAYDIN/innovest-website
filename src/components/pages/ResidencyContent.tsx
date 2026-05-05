'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Clock, Banknote } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import PageHero from '@/components/ui/PageHero';
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
      <PageHero
        eyebrow={locale === 'tr' ? 'OTURUM & VATANDAŞLIK' : 'RESIDENCY & CITIZENSHIP'}
        title={dict.residencyPage.title}
        titleHighlight={dict.residencyPage.titleHighlight}
        subtitle={dict.residencyPage.subtitle}
        image="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070"
        imageAlt="Residency by Investment"
      />

      {/* Programmes */}
      <section className="py-24 bg-background min-h-[60vh] flex flex-col justify-center">
        <div className="site-container flex flex-col items-center">
          <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
            {dict.residencyPage.programmes.map((programme, index) => (
              <AnimatedSection key={programme.country} delay={index * 0.1} className="h-full">
                <div className="bg-surface border border-border overflow-hidden group hover:border-gold/30 transition-all duration-500 rounded-xl h-full flex flex-col">
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
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-8 md:gap-12 mb-6 text-sm">
                      <span className="flex items-center gap-2 text-gold">
                        <Banknote size={16} />
                        {programme.investment}
                      </span>
                      <span className="flex items-center gap-2 text-muted">
                        <Clock size={16} />
                        {programme.timeline}
                      </span>
                    </div>

                    <ul className="space-y-4 mb-8 flex-1">
                      {programme.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3 text-sm text-muted leading-loose">
                          <Check size={14} className="text-gold flex-shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`${prefix}/contact`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 border border-border text-sm hover:border-gold hover:text-gold transition-all duration-300 group/btn rounded-lg"
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
      <section className="bg-surface min-h-[60vh] flex flex-col justify-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="site-container flex flex-col items-center">
          <AnimatedSection>
            <div className="text-center">
              <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium block" style={{ marginBottom: '16px' }}>
                {locale === 'en' ? 'The Process' : 'Süreç'}
              </span>
              <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
                {locale === 'en' ? 'How It ' : 'Nasıl '}
                <span className="text-gradient-gold">{locale === 'en' ? 'Works' : 'Çalışır'}</span>
              </h2>
              <div className="gold-line-center mt-6" />
            </div>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto w-full" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', marginTop: '72px' }}>
            {[
              { num: '01', title: locale === 'en' ? 'Initial Consultation' : 'İlk Değerlendirme', desc: locale === 'en' ? 'We assess your goals, budget and preferred destinations.' : 'Hedeflerinizi, finansal çerçevenizi ve tercih ettiğiniz ülkeleri kapsamlı şekilde analiz ederiz.' },
              { num: '02', title: locale === 'en' ? 'Programme Selection' : 'Strateji & Program Seçimi', desc: locale === 'en' ? 'We recommend the most suitable residency programme for you.' : 'Profilinize en uygun oturum programını belirler ve size özel bir yol haritası oluştururuz.' },
              { num: '03', title: locale === 'en' ? 'Application & Investment' : 'Başvuru & Yatırım Süreci', desc: locale === 'en' ? 'We handle all documentation and guide you through the investment.' : 'Tüm başvuru ve yatırım süreçlerini titizlikle yönetir, her aşamada size rehberlik ederiz.' },
              { num: '04', title: locale === 'en' ? 'Approval & Beyond' : 'Onay & Süreklilik', desc: locale === 'en' ? 'From permit receipt to renewal and citizenship pathways.' : 'Oturum izninin alınmasından yenileme ve vatandaşlık süreçlerine kadar uzun vadeli destek sunarız.' },
            ].map((step, index) => (
              <AnimatedSection key={step.num} delay={index * 0.15}>
                <div
                  className="text-center"
                  style={{ padding: '0 40px', borderRight: index < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}
                >
                  <span style={{ fontSize: '48px', fontWeight: '200', color: 'rgba(201,168,76,0.3)', marginBottom: '24px', lineHeight: '1', display: 'block', fontFamily: 'var(--font-display)' }}>
                    {step.num}
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: '500', color: 'white', marginBottom: '16px', lineHeight: '1.4', fontFamily: 'var(--font-display)' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: '1.9', color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden" style={{ minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070"
            alt="Dubai cityscape"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(5,15,35,0.75)' }} />
        </div>
        <div className="relative site-container flex flex-col items-center" style={{ textAlign: 'center', paddingTop: '100px', paddingBottom: '100px' }}>
          <AnimatedSection className="flex flex-col items-center text-center w-full">
            <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: '400', marginBottom: '24px', lineHeight: '1.2', fontFamily: 'var(--font-display)' }}>
              {locale === 'en' ? 'Start Your Residency ' : 'Oturum Yolculuğunuza '}
              <span className="text-gradient-gold">{locale === 'en' ? 'Journey' : 'Başlayın'}</span>
            </h2>
            <p style={{ fontSize: '16px', lineHeight: '1.9', color: 'rgba(255,255,255,0.70)', fontWeight: 300, maxWidth: '480px', margin: '0 auto 48px', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
              {locale === 'en'
                ? 'Our immigration and investment experts are ready to guide you through the entire process.'
                : 'Göç ve yatırım uzmanlarımız tüm süreçte size rehberlik etmeye hazır.'}
            </p>
            <Link
              href={`${prefix}/contact`}
              className="inline-flex items-center gap-2 hover:opacity-90 transition-all duration-300 btn-shine group rounded-lg"
              style={{ padding: '16px 48px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', background: '#C9A84C', color: '#0a1628' }}
            >
              {dict.nav.getConsultation}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
