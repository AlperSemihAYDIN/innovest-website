'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionary';

interface HeroProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

export default function Hero({ dict, locale }: HeroProps) {
  const prefix = locale === 'tr' ? '/tr' : '';
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="hero-dark relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
          alt="Modern architecture"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
      </div>

      <div className="relative z-10 w-full max-w-3xl px-6 py-36 text-center">
          {mounted && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <span className="inline-flex items-center px-4 py-1.5 bg-gold/10 border border-gold/20 text-gold text-xs tracking-[0.2em] uppercase">
                  {dict.hero.tagline}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {dict.hero.title}
                <br />
                <span className="text-gradient-gold">{dict.hero.titleHighlight}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base md:text-lg text-muted leading-relaxed max-w-2xl mx-auto mb-14"
              >
                {dict.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap justify-center gap-5 mb-24"
              >
                <Link
                  href={`${prefix}/contact`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-white font-medium hover:bg-gold-light transition-all duration-300 btn-shine group"
                >
                  {dict.hero.cta}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  href={`${prefix}/services`}
                  className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground hover:border-gold hover:text-gold transition-all duration-300"
                >
                  {dict.hero.ctaSecondary}
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-12 md:gap-20 pt-12 border-t border-border/50"
              >
                {[
                  { value: dict.hero.stat1Value, label: dict.hero.stat1Label },
                  { value: dict.hero.stat2Value, label: dict.hero.stat2Label },
                  { value: dict.hero.stat3Value, label: dict.hero.stat3Label },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-light text-gold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted tracking-wider uppercase">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </>
          )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-muted tracking-widest uppercase">{locale === 'tr' ? 'Kaydır' : 'Scroll'}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
