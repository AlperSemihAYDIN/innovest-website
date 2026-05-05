'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, BedDouble, Calendar, TrendingUp } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import InvestmentMap from '@/components/home/InvestmentMap';
import type { Dictionary } from '@/lib/dictionary';

interface Property {
  name: string;
  developer: string;
  location: string;
  price: string;
  yield: string;
  completion: string;
  beds: string;
  image: string;
  slug?: string;
}

interface CityContentProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
  city: string;
  tagline: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  properties: Property[];
  heroImage: string;
  mapRegion?: 'UK' | 'UAE';
}

export default function CityContent({
  dict,
  locale,
  city,
  tagline,
  title,
  titleHighlight,
  subtitle,
  stats,
  properties,
  heroImage,
  mapRegion,
}: CityContentProps) {
  const prefix = locale === 'tr' ? '/tr' : '';

  return (
    <>
      {/* Hero */}
      <section className="hero-dark relative py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroImage} alt={city} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="relative px-6 md:px-12 lg:px-16 xl:px-20 flex flex-col items-center">
          <div className="w-full max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <SectionHeading
              tagline={tagline}
              title={title}
              titleHighlight={titleHighlight}
              subtitle={subtitle}
              center
            />
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-16 mt-12 pt-8 border-t border-border/50">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-light text-gold" style={{ fontFamily: 'var(--font-display)' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-24 bg-background min-h-[60vh] flex flex-col justify-center">
        <div className="px-6 md:px-12 lg:px-16 xl:px-20 flex flex-col items-center">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4 block">
                {locale === 'en' ? 'Available Developments' : 'Mevcut Projeler'}
              </span>
              <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
                {locale === 'en' ? `Featured ${city} ` : `Öne Çıkan ${city} `}
                <span className="text-gradient-gold">
                  {locale === 'en' ? 'Properties' : 'Gayrimenkulleri'}
                </span>
              </h2>
              <div className="gold-line-center mt-6" />
            </div>
          </AnimatedSection>

          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((property, index) => (
              <AnimatedSection key={property.name} delay={index * 0.1}>
                <div className="bg-surface border border-border/40 rounded-xl overflow-hidden group hover:border-gold/30 transition-all duration-500 card-hover">
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs text-white/70 mb-1">{property.developer}</p>
                      <h3 className="text-lg font-light text-white" style={{ fontFamily: 'var(--font-display)' }}>
                        {property.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-4 text-xs text-muted mb-5">
                      <span className="flex items-center gap-1"><MapPin size={12} />{property.location}</span>
                      <span className="flex items-center gap-1"><BedDouble size={12} />{property.beds}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 py-5 border-t border-border/30">
                      <div>
                        <p className="text-xs text-muted mb-1">{dict.featured.from}</p>
                        <p className="text-sm font-medium text-gold">{property.price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted mb-1">{dict.featured.yield}</p>
                        <p className="text-sm font-medium">{property.yield}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted mb-1">{dict.featured.completion}</p>
                        <p className="text-sm font-medium">{property.completion}</p>
                      </div>
                    </div>
                    <Link
                      href={property.slug ? `${prefix}/real-estate/${city.toLowerCase() === 'londra' ? 'london' : city.toLowerCase()}/${property.slug}` : `${prefix}/contact`}
                      className="mt-5 w-full inline-flex items-center justify-center gap-2 py-3.5 border border-border/30 text-sm hover:border-gold hover:text-gold transition-all duration-300 group/btn rounded-lg"
                    >
                      {locale === 'en' ? 'Enquire Now' : 'Bilgi Al'}
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* City Map Section */}
      {mapRegion && (
        <InvestmentMap
          locale={locale}
          defaultRegion={mapRegion}
          hideTabs
          tagline={
            mapRegion === 'UK'
              ? (locale === 'en' ? 'London Project Map' : 'Londra Proje Haritası')
              : (locale === 'en' ? 'Dubai Project Map' : 'Dubai Proje Haritası')
          }
        />
      )}

      {/* CTA */}
      <section className="py-24 bg-surface border-t border-border min-h-[40vh] flex flex-col justify-center">
        <div className="px-6 md:px-12 lg:px-16 xl:px-20 flex flex-col items-center">
          <div className="flex flex-col items-center text-center">
            <AnimatedSection className="flex flex-col items-center text-center w-full">
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-center" style={{ fontFamily: 'var(--font-display)' }}>
                {locale === 'en' ? `Interested in ${city} ` : `${city} `}
                <span className="text-gradient-gold">
                  {locale === 'en' ? 'Property?' : 'Gayrimenkulü ile İlgileniyor musunuz?'}
                </span>
              </h2>
              <p className="text-muted mb-10 max-w-xl mx-auto text-center">
                {locale === 'en'
                  ? 'Our expert advisors can provide personalised guidance and access to exclusive off-market opportunities.'
                  : 'Uzman danışmanlarımız kişiselleştirilmiş rehberlik ve özel fırsatlara erişim sağlayabilir.'}
              </p>
              <Link
                href={`${prefix}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-white font-medium hover:bg-gold-light transition-all duration-300 btn-shine group rounded-lg"
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
