'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { Dictionary } from '@/lib/dictionary';

interface CTAProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

export default function CallToAction({ dict, locale }: CTAProps) {
  const prefix = locale === 'tr' ? '/tr' : '';

  return (
    <section className="hero-dark relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2070"
          alt="Investment"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(6,14,26,0.78) 0%, rgba(10,22,40,0.85) 100%)' }} />
      </div>

      <div className="relative site-container flex flex-col items-center text-center py-24 md:py-32">
        <AnimatedSection className="flex flex-col items-center text-center w-full">
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#C9A84C', marginBottom: '20px', display: 'block', textTransform: 'uppercase' }}>
            {locale === 'en' ? 'Get Started' : 'Başlayın'}
          </span>

          <h2
            style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 400, lineHeight: '1.15', maxWidth: '780px', margin: '0 auto 24px', textAlign: 'center', fontFamily: 'var(--font-display)' }}
          >
            {dict.cta.title}{' '}
            <span className="text-gradient-gold">{dict.cta.titleHighlight}</span>
          </h2>

          <p style={{ fontSize: '17px', lineHeight: '1.9', color: 'rgba(255,255,255,0.65)', fontWeight: 300, maxWidth: '520px', margin: '0 auto 8px', textAlign: 'center' }}>
            {dict.cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href={`${prefix}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-lg hover:opacity-90 transition-all duration-300 btn-shine group"
              style={{ padding: '16px 48px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', background: '#C9A84C', color: '#0a1628', whiteSpace: 'nowrap' }}
            >
              {dict.cta.button}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="mt-5 text-xs text-white/50 tracking-wide text-center">{dict.cta.note}</p>
        </AnimatedSection>
      </div>
    </section>
  );
}
