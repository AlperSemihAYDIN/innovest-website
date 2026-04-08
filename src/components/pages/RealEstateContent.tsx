'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import type { Dictionary } from '@/lib/dictionary';

interface RealEstateContentProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

export default function RealEstateContent({ dict, locale }: RealEstateContentProps) {
  const prefix = locale === 'tr' ? '/tr' : '';

  const markets = [
    {
      city: 'London',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200',
      href: `${prefix}/real-estate/london`,
      desc: locale === 'en'
        ? 'One of the most resilient and sought-after property markets globally. Premium developments across central and greater London.'
        : 'Küresel olarak en dayanıklı ve aranan gayrimenkul pazarlarından biri. Merkez ve büyük Londra genelinde premium projeler.',
      stats: dict.realEstatePage.london.stats,
    },
    {
      city: 'Dubai',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200',
      href: `${prefix}/real-estate/dubai`,
      desc: locale === 'en'
        ? "The world's fastest-growing luxury real estate market. Tax-free investments with world-class developments and exceptional yields."
        : 'Dünyanın en hızlı büyüyen lüks gayrimenkul pazarı. Dünya standartlarında projeler ve olağanüstü getirilerle vergisiz yatırımlar.',
      stats: dict.realEstatePage.dubai.stats,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero-dark relative py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
            alt="Real Estate"
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
              tagline={dict.realEstatePage.tagline}
              title={dict.realEstatePage.title}
              titleHighlight={dict.realEstatePage.titleHighlight}
              subtitle={dict.realEstatePage.subtitle}
              center
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Markets */}
      <section className="py-44 md:py-64 bg-background">
        <div className="px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 space-y-20">
          {markets.map((market, index) => (
            <AnimatedSection key={market.city}>
              <Link href={market.href} className="block group">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 bg-surface border border-border hover:border-gold/30 overflow-hidden transition-all duration-500 ${index % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
                  <div className="relative h-80 lg:h-[500px] overflow-hidden">
                    <Image
                      src={market.image}
                      alt={market.city}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                  </div>
                  <div className="p-10 lg:p-16 flex flex-col justify-center" style={{ direction: 'ltr' }}>
                    <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4">
                      {locale === 'en' ? 'Invest in' : 'Yatırım Yap'}
                    </span>
                    <h3
                      className="text-3xl md:text-4xl font-light mb-4 group-hover:text-gold transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {market.city}
                    </h3>
                    <p className="text-muted leading-relaxed mb-8">{market.desc}</p>

                    <div className="grid grid-cols-3 gap-6 py-6 border-t border-b border-border mb-8">
                      {market.stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="text-xl md:text-2xl font-light text-gold" style={{ fontFamily: 'var(--font-display)' }}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-muted mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-2 text-gold group-hover:gap-3 transition-all duration-300">
                      {locale === 'en' ? 'Explore Properties' : 'Gayrimenkulleri Keşfet'}
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  );
}
