'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import type { Dictionary } from '@/lib/dictionary';

interface FeaturedProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

const properties = [
  {
    id: 1,
    name: 'Westminster Tower',
    developer: 'London Square',
    location: 'London, SE1',
    price: '£550,000',
    yield: '5.2%',
    completion: 'Q2 2026',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000',
    tag: 'UK',
  },
  {
    id: 2,
    name: "Ransome's Wharf",
    developer: 'London Square',
    location: 'London, SW11',
    price: '£725,000',
    yield: '4.8%',
    completion: 'Q4 2026',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000',
    tag: 'UK',
  },
  {
    id: 3,
    name: 'Binghatti Flare',
    developer: 'Binghatti',
    location: 'Dubai, Business Bay',
    price: '$380,000',
    yield: '8.5%',
    completion: 'Q1 2027',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1000',
    tag: 'UAE',
  },
  {
    id: 4,
    name: 'The Alba',
    developer: 'Omniyat',
    location: 'Dubai, Palm Jumeirah',
    price: '$1,200,000',
    yield: '7.2%',
    completion: 'Q3 2026',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000',
    tag: 'UAE',
  },
];

export default function FeaturedInvestments({ dict, locale }: FeaturedProps) {
  const prefix = locale === 'tr' ? '/tr' : '';
  const [featured, ...rest] = properties;

  return (
    <section className="min-h-screen flex flex-col lg:flex-row bg-surface overflow-hidden">
      {/* Left: featured large property */}
      <AnimatedSection className="relative w-full lg:w-3/5 min-h-[50vh] lg:min-h-screen">
        <Link
          href={`${prefix}/real-estate/london`}
          className="block relative min-h-[50vh] lg:min-h-screen group"
        >
          <Image
            src={featured.image}
            alt={featured.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

          {/* Badges */}
          <div className="absolute top-6 left-6 flex gap-3">
            <span className="px-4 py-1.5 bg-gold/90 text-white text-xs font-medium tracking-widest uppercase">
              {featured.tag}
            </span>
            <span className="px-4 py-1.5 border border-gold/50 text-gold text-xs font-medium tracking-widest uppercase bg-black/30 backdrop-blur-sm">
              Featured
            </span>
          </div>

          {/* Property info at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 lg:p-12">
            <p className="text-white/60 text-xs mb-2 tracking-wider uppercase">{featured.developer}</p>
            <h3
              className="text-3xl md:text-4xl font-light text-white mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {featured.name}
            </h3>
            <p className="flex items-center gap-1.5 text-white/60 text-sm mb-8">
              <MapPin size={13} />
              {featured.location}
            </p>
            <div className="flex gap-10 pt-6 border-t border-white/20">
              <div>
                <p className="text-white/50 text-xs mb-1 tracking-wider">{dict.featured.from}</p>
                <p className="text-gold text-xl font-medium">{featured.price}</p>
              </div>
              <div>
                <p className="text-white/50 text-xs mb-1 tracking-wider">{dict.featured.yield}</p>
                <p className="text-white text-xl font-medium">{featured.yield}</p>
              </div>
              <div>
                <p className="text-white/50 text-xs mb-1 tracking-wider">{dict.featured.completion}</p>
                <p className="text-white text-xl font-medium">{featured.completion}</p>
              </div>
            </div>
          </div>
        </Link>
      </AnimatedSection>

      {/* Right: heading + 3 compact property rows */}
      <div className="w-full lg:w-2/5 flex flex-col bg-surface">
        {/* Heading section */}
        <div className="px-8 md:px-10 lg:px-12 pt-24 pb-10 shrink-0">
          <AnimatedSection>
            <SectionHeading
              tagline={dict.featured.tagline}
              title={dict.featured.title}
              titleHighlight={dict.featured.titleHighlight}
              subtitle={dict.featured.subtitle}
            />
            <Link
              href={`${prefix}/real-estate`}
              className="inline-flex items-center gap-2 text-gold text-sm hover:gap-3 transition-all duration-300 mt-8"
            >
              {dict.featured.viewAll}
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>

        {/* 3 compact property rows */}
        <div className="flex-1 flex flex-col divide-y divide-border border-t border-border">
          {rest.map((property, index) => (
            <AnimatedSection key={property.id} delay={index * 0.1} className="flex-1">
              <Link
                href={`${prefix}/real-estate/${property.tag === 'UK' ? 'london' : 'dubai'}`}
                className="flex items-stretch h-full group hover:bg-background/50 transition-colors duration-300"
              >
                {/* Image thumbnail */}
                <div className="relative w-28 lg:w-36 shrink-0 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="144px"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-gold/90 text-white text-xs font-medium">
                    {property.tag}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 p-5 lg:p-6 flex flex-col justify-center">
                  <p className="text-xs text-muted mb-1">{property.developer}</p>
                  <h3
                    className="text-base font-light mb-2 group-hover:text-gold transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {property.name}
                  </h3>
                  <p className="flex items-center gap-1 text-xs text-muted mb-3">
                    <MapPin size={11} />
                    {property.location}
                  </p>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-muted mb-0.5">{dict.featured.from}</p>
                      <p className="text-sm font-medium text-gold">{property.price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted mb-0.5">{dict.featured.yield}</p>
                      <p className="text-sm font-medium">{property.yield}</p>
                    </div>
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="flex items-center pr-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                  <ArrowRight size={16} className="text-gold" />
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
