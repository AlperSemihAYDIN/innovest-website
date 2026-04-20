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

  return (
    <section className="pt-32 pb-24 bg-surface border-t border-border min-h-[60vh] flex flex-col justify-center">
      <div className="site-container flex flex-col items-center">
        <div className="w-full max-w-3xl mx-auto text-center mb-16">
          <AnimatedSection>
            <div className="flex flex-col items-center gap-8">
              <SectionHeading
                tagline={dict.featured.tagline}
                title={dict.featured.title}
                titleHighlight={dict.featured.titleHighlight}
                subtitle={dict.featured.subtitle}
                center
              />
              <Link
                href={`${prefix}/real-estate`}
                className="inline-flex items-center gap-2 text-gold text-sm hover:gap-3 transition-all duration-300 whitespace-nowrap"
              >
                {dict.featured.viewAll}
                <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
          {properties.map((property, index) => (
            <AnimatedSection key={property.id} delay={index * 0.1}>
              <Link href={`${prefix}/real-estate/${property.tag === 'UK' ? 'london' : 'dubai'}`} className="block group">
                <div className="bg-background border border-border/40 rounded-xl hover:border-gold/30 overflow-hidden transition-all duration-500 card-hover">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 bg-gold/90 text-white text-xs font-medium">
                      {property.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    <p className="text-xs text-muted mb-1">{property.developer}</p>
                    <h3
                      className="text-lg font-light mb-2 group-hover:text-gold transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {property.name}
                    </h3>
                    <p className="flex items-center gap-1 text-xs text-muted mb-4">
                      <MapPin size={12} />
                      {property.location}
                    </p>

                    <div className="grid grid-cols-3 gap-3 pt-5 border-t border-border/30">
                      <div>
                        <p className="text-xs text-muted mb-0.5">{dict.featured.from}</p>
                        <p className="text-sm font-medium text-gold">{property.price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted mb-0.5">{dict.featured.yield}</p>
                        <p className="text-sm font-medium">{property.yield}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted mb-0.5">{dict.featured.completion}</p>
                        <p className="text-sm font-medium">{property.completion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
