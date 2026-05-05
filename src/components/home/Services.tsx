'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2, Shield, Briefcase } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import type { Dictionary } from '@/lib/dictionary';

interface ServicesProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

const serviceImages = [
  '/stocks/real-estate.jpg',
  '/stocks/residency.jpg',
  '/stocks/business.jpg',
];

const serviceIcons = [Building2, Shield, Briefcase];

export default function Services({ dict, locale }: ServicesProps) {
  const prefix = locale === 'tr' ? '/tr' : '';

  const services = [
    {
      ...dict.services.realEstate,
      href: `${prefix}/real-estate`,
      image: serviceImages[0],
      Icon: serviceIcons[0],
    },
    {
      ...dict.services.residency,
      href: `${prefix}/residency`,
      image: serviceImages[1],
      Icon: serviceIcons[1],
    },
    {
      ...dict.services.business,
      href: `${prefix}/business-expansion`,
      image: serviceImages[2],
      Icon: serviceIcons[2],
    },
  ];

  return (
    <section className="bg-background min-h-[60vh] flex flex-col justify-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="site-container flex flex-col items-center">
        <div className="w-full max-w-3xl mx-auto text-center mb-12">
          <AnimatedSection>
            <SectionHeading
              tagline={dict.services.tagline}
              title={dict.services.title}
              titleHighlight={dict.services.titleHighlight}
              subtitle={dict.services.subtitle}
              center
            />
          </AnimatedSection>
        </div>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.15}>
              <Link href={service.href} className="block group h-full">
                <div
                  className="relative h-full flex flex-col bg-surface/40 hover:bg-surface/70 transition-all duration-500 card-hover"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 flex flex-col text-center"
                    style={{ padding: '36px 32px' }}
                  >
                    <div className="flex justify-center mb-5">
                      <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <service.Icon size={22} className="text-gold" />
                      </div>
                    </div>
                    <h3
                      style={{ fontSize: '18px', fontWeight: 500, marginTop: '28px', marginBottom: '16px', fontFamily: 'var(--font-display)', color: 'white' }}
                      className="group-hover:text-gold transition-colors duration-300"
                    >
                      {service.title}
                    </h3>
                    <p style={{ fontSize: '14px', lineHeight: '1.9', color: 'rgba(255,255,255,0.65)', fontWeight: 300, marginBottom: '24px' }} className="flex-1">
                      {service.desc}
                    </p>
                    <span className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-gold group-hover:gap-3 transition-all duration-300">
                      {service.cta}
                      <ArrowRight size={16} />
                    </span>
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
