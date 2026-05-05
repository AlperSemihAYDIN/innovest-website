'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Globe, Users, FileCheck, Building } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import PageHero from '@/components/ui/PageHero';
import type { Dictionary } from '@/lib/dictionary';
import type { BusinessPageContent } from '@/lib/pageDefaults';

interface BusinessContentProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
  content?: BusinessPageContent;
}

const serviceIcons = [Globe, Users, FileCheck, Building];

export default function BusinessContent({ dict, locale, content }: BusinessContentProps) {
  const prefix = locale === 'tr' ? '/tr' : '';
  const l = locale === 'en';

  const mkTagline = content?.markets?.[l ? 'taglineEn' : 'taglineTr'] ?? (l ? 'Markets We Cover' : 'Faaliyet Gösterdiğimiz Pazarlar');
  const mkTitle = content?.markets?.[l ? 'titleEn' : 'titleTr'] ?? (l ? 'Global ' : 'Küresel ');
  const mkHighlight = content?.markets?.[l ? 'titleHighlightEn' : 'titleHighlightTr'] ?? (l ? 'Reach' : 'Ağımız');
  const mkItems = content?.markets?.items ?? [
    { name: 'United Kingdom', flag: '🇬🇧' },
    { name: 'United Arab Emirates', flag: '🇦🇪' },
    { name: 'European Union', flag: '🇪🇺' },
    { name: 'United States', flag: '🇺🇸' },
    { name: 'Turkey', flag: '🇹🇷' },
    { name: 'Saudi Arabia', flag: '🇸🇦' },
    { name: 'Qatar', flag: '🇶🇦' },
    { name: 'Singapore', flag: '🇸🇬' },
  ];
  const ctaTitle = content?.cta?.[l ? 'titleEn' : 'titleTr'] ?? (l ? 'Ready to Grow Your Business ' : 'İşinizi Doğru Stratejiyle Büyütmeye ');
  const ctaHighlight = content?.cta?.[l ? 'titleHighlightEn' : 'titleHighlightTr'] ?? (l ? 'Globally?' : 'Hazır mısınız?');
  const ctaSubtitle = content?.cta?.[l ? 'subtitleEn' : 'subtitleTr'] ?? (l ? "Let's discuss how we can help you enter new markets and grow your business internationally." : 'Yeni pazarlara açılmanız ve işinizi uluslararası ölçekte büyütmeniz için size nasıl değer katabileceğimizi birlikte değerlendirerim.');

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow={locale === 'tr' ? 'İŞ GELİŞTİRME' : 'BUSINESS DEVELOPMENT'}
        title={dict.businessPage.title}
        titleHighlight={dict.businessPage.titleHighlight}
        subtitle={dict.businessPage.subtitle}
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
        imageAlt="Business Expansion"
      />

      {/* Services */}
      <section className="bg-background min-h-[60vh] flex flex-col justify-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="site-container flex flex-col items-center">
          <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2" style={{ gap: '32px' }}>
            {dict.businessPage.services.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <AnimatedSection key={service.title} delay={index * 0.1}>
                  <div
                    className="h-full group hover:border-[rgba(201,168,76,0.25)] hover:bg-white/5"
                    style={{ padding: '36px 32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', transition: 'all 0.3s ease' }}
                  >
                    <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={22} className="text-gold" />
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 500, marginTop: '24px', marginBottom: '16px', color: 'white', fontFamily: 'var(--font-display)' }}>
                      {service.title}
                    </h3>
                    <p style={{ fontSize: '14px', lineHeight: '1.9', color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>{service.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Markets we cover */}
      <section className="bg-surface min-h-[60vh] flex flex-col justify-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="site-container flex flex-col items-center">
          <AnimatedSection>
            <div className="text-center">
              <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#C9A84C', marginBottom: '16px', display: 'block', textTransform: 'uppercase' }}>
                {mkTagline}
              </span>
              <h2 className="text-3xl md:text-4xl" style={{ fontWeight: 400, fontFamily: 'var(--font-display)' }}>
                {mkTitle}
                <span className="text-gradient-gold">{mkHighlight}</span>
              </h2>
              <div className="gold-line-center mt-6" />
            </div>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto w-full grid grid-cols-2 md:grid-cols-4" style={{ gap: '32px', marginTop: '64px' }}>
            {mkItems.map((market, index) => (
              <AnimatedSection key={market.name} delay={index * 0.05}>
                <div
                  className="text-center group hover:border-[rgba(201,168,76,0.25)] hover:bg-white/5"
                  style={{ padding: '28px 16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', transition: 'all 0.3s ease' }}
                >
                  <span className="text-3xl" style={{ display: 'block', marginBottom: '12px' }}>{market.flag}</span>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', fontWeight: 300, transition: 'color 0.3s' }}>{market.name}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background min-h-[40vh] flex flex-col justify-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="site-container flex flex-col items-center">
          <AnimatedSection className="flex flex-col items-center text-center w-full">
            <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 400, lineHeight: '1.2', marginBottom: '24px', fontFamily: 'var(--font-display)', textAlign: 'center' }}>
              {ctaTitle}
              <span className="text-gradient-gold">{ctaHighlight}</span>
            </h2>
            <p style={{ fontSize: '16px', lineHeight: '1.9', color: 'rgba(255,255,255,0.65)', fontWeight: 300, maxWidth: '480px', margin: '0 auto 48px', textAlign: 'center' }}>
              {ctaSubtitle}
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
