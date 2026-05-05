'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import PageHero from '@/components/ui/PageHero';
import InvestmentMap from '@/components/home/InvestmentMap';
import type { Dictionary } from '@/lib/dictionary';
import type { RealEstatePageContent } from '@/lib/pageDefaults';

interface RealEstateContentProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
  content?: RealEstatePageContent;
}

export default function RealEstateContent({ dict, locale, content }: RealEstateContentProps) {
  const prefix = locale === 'tr' ? '/tr' : '';
  const l = locale === 'en';
  const cm = content?.markets;

  const markets = [
    {
      city: 'London',
      image: cm?.[0]?.image ?? 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200',
      href: `${prefix}/real-estate/london`,
      tagline: cm?.[0]?.[l ? 'taglineEn' : 'taglineTr'] ?? (l ? 'INVEST IN' : 'YATIRIM YAP'),
      desc: cm?.[0]?.[l ? 'descEn' : 'descTr'] ?? (l
        ? 'One of the most resilient and sought-after property markets globally. Premium developments across central and greater London.'
        : 'Küresel olarak en dayanıklı ve aranan gayrimenkul pazarlarından biri. Merkez ve büyük Londra genelinde premium projeler.'),
      cta: cm?.[0]?.[l ? 'ctaEn' : 'ctaTr'] ?? (l ? 'Explore Properties' : 'Gayrimenkulleri Keşfet'),
      stats: dict.realEstatePage.london.stats,
    },
    {
      city: 'Dubai',
      image: cm?.[1]?.image ?? 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200',
      href: `${prefix}/real-estate/dubai`,
      tagline: cm?.[1]?.[l ? 'taglineEn' : 'taglineTr'] ?? (l ? 'INVEST IN' : 'YATIRIM YAP'),
      desc: cm?.[1]?.[l ? 'descEn' : 'descTr'] ?? (l
        ? "The world's fastest-growing luxury real estate market. Tax-free investments with world-class developments and exceptional yields."
        : 'Dünyanın en hızlı büyüyen lüks gayrimenkul pazarı. Dünya standartlarında projeler ve olağanüstü getirilerle vergisiz yatırımlar.'),
      cta: cm?.[1]?.[l ? 'ctaEn' : 'ctaTr'] ?? (l ? 'Explore Properties' : 'Gayrimenkulleri Keşfet'),
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
      <section className="bg-background" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="site-container flex flex-col" style={{ gap: '40px' }}>
          {markets.map((market) => (
            <AnimatedSection key={market.city} className="w-full">
              <Link href={market.href} className="block group">
                <div
                  className="grid grid-cols-2 overflow-hidden group-hover:border-[rgba(201,168,76,0.25)] transition-all duration-300"
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
                    <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>
                      {market.tagline}
                    </span>
                    <h3
                      className="text-white"
                      style={{ fontSize: '3rem', fontWeight: 400, lineHeight: 1.1, marginBottom: '20px', fontFamily: 'var(--font-display)' }}
                    >
                      {market.city}
                    </h3>
                    <p
                      style={{ fontSize: '1rem', lineHeight: '1.9', color: 'rgba(255,255,255,0.65)', fontWeight: 300, marginBottom: '32px' }}
                    >
                      {market.desc}
                    </p>

                    {/* Stats */}
                    <div className="flex" style={{ gap: '40px', marginBottom: '32px' }}>
                      {market.stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="text-white" style={{ fontSize: '1.5rem', fontWeight: 500 }}>
                            {stat.value}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.50)', letterSpacing: '0.05em', marginTop: '4px' }}>
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold group-hover:gap-3 transition-all duration-300">
                      {market.cta}
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
