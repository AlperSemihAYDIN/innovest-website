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
          src="/stocks/photo-cityscape.jpg"
          alt="Investment"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/65" />
      </div>

      <div className="relative site-container flex flex-col items-center text-center py-24">
        <AnimatedSection className="flex flex-col items-center text-center w-full">
          <span className="inline-flex items-center px-4 py-1.5 bg-gold/10 border border-gold/20 text-gold text-xs tracking-[0.2em] uppercase mb-8">
            {locale === 'en' ? 'Get Started' : 'Başlayın'}
          </span>

          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 max-w-3xl mx-auto text-center"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {dict.cta.title}{' '}
            <span className="text-gradient-gold">{dict.cta.titleHighlight}</span>
          </h2>

          <p className="text-muted text-lg max-w-2xl mx-auto mb-10 text-center">
            {dict.cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href={`${prefix}/contact`}
              className="inline-flex items-center gap-2 px-10 py-4 bg-gold text-white font-medium text-lg hover:bg-gold-light transition-all duration-300 btn-shine group rounded-lg"
            >
              {dict.cta.button}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="text-xs text-muted tracking-wider text-center">{dict.cta.note}</p>
        </AnimatedSection>
      </div>
    </section>
  );
}
