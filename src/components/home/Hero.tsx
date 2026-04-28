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
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
          className="w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/3629519/3629519-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 py-36 text-center mx-auto">
          {mounted && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <span className="inline-flex items-center text-gold text-xs tracking-[0.35em] uppercase font-semibold">
                  {dict.hero.tagline}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-8 mx-auto w-full"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {dict.hero.title}
                <br />
                <span className="text-gradient-gold">{dict.hero.titleHighlight}</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex justify-center mb-14"
              >
                <p className="text-base md:text-lg text-muted leading-relaxed max-w-2xl text-center">
                  {dict.hero.subtitle}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap justify-center gap-5 mb-24"
              >
                <Link
                  href={`${prefix}/contact`}
                  className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-white text-sm font-medium tracking-wide hover:bg-gold-light transition-all duration-300 btn-shine group rounded-lg"
                >
                  {dict.hero.cta}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  href={`${prefix}/services`}
                  className="inline-flex items-center gap-3 px-10 py-4 text-sm text-foreground/80 tracking-wide hover:text-gold transition-all duration-300 rounded-lg"
                >
                  {dict.hero.ctaSecondary}
                  <ArrowRight
                    size={18}
                    className="opacity-50 group-hover:opacity-100"
                  />
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
