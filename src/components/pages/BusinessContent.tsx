'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Globe, Users, FileCheck, Building } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import type { Dictionary } from '@/lib/dictionary';

interface BusinessContentProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

const serviceIcons = [Globe, Users, FileCheck, Building];

export default function BusinessContent({ dict, locale }: BusinessContentProps) {
  const prefix = locale === 'tr' ? '/tr' : '';

  return (
    <>
      {/* Hero */}
      <section className="hero-dark relative py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
            alt="Business Expansion"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center">
          <AnimatedSection>
            <SectionHeading
              tagline={dict.businessPage.tagline}
              title={dict.businessPage.title}
              titleHighlight={dict.businessPage.titleHighlight}
              subtitle={dict.businessPage.subtitle}
              center
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section className="py-64 md:py-96 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dict.businessPage.services.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <AnimatedSection key={service.title} delay={index * 0.1}>
                  <div className="p-10 bg-surface border border-border group hover:border-gold/30 transition-all duration-500 h-full">
                    <div className="w-14 h-14 mb-6 border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                      <Icon size={24} className="text-gold" />
                    </div>
                    <h3
                      className="text-xl font-light mb-4 group-hover:text-gold transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-muted leading-relaxed">{service.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Markets we cover */}
      <section className="py-64 md:py-96 bg-surface">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center">
          <AnimatedSection>
            <div className="text-center mb-20">
              <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4 block">
                {locale === 'en' ? 'Markets We Cover' : 'Kapsadığımız Pazarlar'}
              </span>
              <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
                {locale === 'en' ? 'Global ' : 'Küresel '}
                <span className="text-gradient-gold">{locale === 'en' ? 'Reach' : 'Erişim'}</span>
              </h2>
              <div className="gold-line-center mt-6" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'United Kingdom', flag: '🇬🇧' },
              { name: 'United Arab Emirates', flag: '🇦🇪' },
              { name: 'European Union', flag: '🇪🇺' },
              { name: 'United States', flag: '🇺🇸' },
              { name: 'Turkey', flag: '🇹🇷' },
              { name: 'Saudi Arabia', flag: '🇸🇦' },
              { name: 'Qatar', flag: '🇶🇦' },
              { name: 'Singapore', flag: '🇸🇬' },
            ].map((market, index) => (
              <AnimatedSection key={market.name} delay={index * 0.05}>
                <div className="p-6 bg-background border border-border text-center group hover:border-gold/30 transition-all duration-300">
                  <span className="text-3xl mb-3 block">{market.flag}</span>
                  <p className="text-sm text-muted group-hover:text-gold transition-colors">{market.name}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-56 md:py-80 bg-background border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center">
          <div className="flex flex-col items-center text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                {locale === 'en' ? 'Ready to Expand ' : 'İşinizi Genişletmeye '}
                <span className="text-gradient-gold">{locale === 'en' ? 'Globally?' : 'Hazır mısınız?'}</span>
              </h2>
              <p className="text-muted mb-10 max-w-2xl mx-auto">
                {locale === 'en'
                  ? "Let's discuss how we can help you enter new markets and grow your business internationally."
                  : 'Yeni pazarlara girmenize ve işinizi uluslararası alanda büyütmenize nasıl yardımcı olabileceğimizi konuşalım.'}
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
