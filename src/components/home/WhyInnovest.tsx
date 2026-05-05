'use client';

import { Target, Users, Globe, Award, Handshake, Eye } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import type { Dictionary } from '@/lib/dictionary';

interface WhyUsProps {
  dict: Dictionary;
}

const icons = [Target, Users, Globe, Award, Handshake, Eye];

export default function WhyInnovest({ dict }: WhyUsProps) {
  return (
    <section className="bg-background relative overflow-hidden border-t border-border" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="relative site-container flex flex-col items-center">
        <div className="w-full max-w-3xl mx-auto text-center mb-16">
          <AnimatedSection>
            <SectionHeading
              tagline={dict.whyUs.tagline}
              title={dict.whyUs.title}
              titleHighlight={dict.whyUs.titleHighlight}
              subtitle={dict.whyUs.subtitle}
              center
            />
          </AnimatedSection>
        </div>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {dict.whyUs.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <div
                  className="group h-full text-center flex flex-col items-center hover:border-[rgba(201,168,76,0.25)] hover:bg-white/5"
                  style={{ padding: '36px 32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', transition: 'all 0.3s ease' }}
                >
                  <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                    <Icon size={22} className="text-gold" />
                  </div>
                  <h3
                    style={{ fontSize: '16px', fontWeight: 500, marginBottom: '16px', fontFamily: 'var(--font-display)', color: 'white' }}
                    className="group-hover:text-gold transition-colors duration-300"
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '13px', lineHeight: '1.9', color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>{item.desc}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
