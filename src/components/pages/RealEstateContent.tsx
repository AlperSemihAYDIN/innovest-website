'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import PageHero from '@/components/ui/PageHero';
import InvestmentMap from '@/components/home/InvestmentMap';
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
      <PageHero
        eyebrow={locale === 'tr' ? 'GAYRİMENKUL' : 'REAL ESTATE'}
        title={dict.realEstatePage.title}
        titleHighlight={dict.realEstatePage.titleHighlight}
        subtitle={dict.realEstatePage.subtitle}
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
        imageAlt="Real Estate"
      />

      {/* Markets */}
      <section className="bg-background" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="site-container flex flex-col" style={{ gap: '40px' }}>
          {markets.map((market) => (
            <AnimatedSection key={market.city} className="w-full">
              <Link href={market.href} className="block group">
                <div
                  className="grid grid-cols-2 overflow-hidden"
                  style={{
                    minHeight: '420px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Left: Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={market.image}
                      alt={market.city}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="50vw"
                    />
                  </div>

                  {/* Right: Content */}
                  <div
                    className="flex flex-col justify-center"
                    style={{ background: 'rgba(10,22,40,0.97)', padding: '56px 48px' }}
                  >
                    <span className="text-gold text-xs font-semibold tracking-widest uppercase" style={{ marginBottom: '16px' }}>
                      {locale === 'en' ? 'INVEST IN' : 'YATIRIM YAP'}
                    </span>
                    <h3
                      className="text-white"
                      style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '20px', fontFamily: 'var(--font-display)' }}
                    >
                      {market.city}
                    </h3>
                    <p
                      className="leading-loose"
                      style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', marginBottom: '32px' }}
                    >
                      {market.desc}
                    </p>

                    {/* Stats */}
                    <div className="flex" style={{ gap: '40px', marginBottom: '32px' }}>
                      {market.stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="text-white" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                            {stat.value}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.50)', letterSpacing: '0.05em', marginTop: '4px' }}>
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold group-hover:gap-3 transition-all duration-300">
                      {locale === 'en' ? 'Explore Properties' : 'Gayrimenkulleri Keşfet'}
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <InvestmentMap locale={locale} />
    </>
  );
}
