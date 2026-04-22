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
    <section className="pt-32 pb-24 bg-background relative overflow-hidden min-h-[60vh] flex flex-col justify-center">
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
                <div className="group h-full p-12 bg-surface/40 hover:bg-surface/70 transition-all duration-500 text-center rounded-2xl flex flex-col items-center">
                  <div className="w-16 h-16 mb-8 mx-auto border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/60 transition-all duration-300 rounded-full">
                    <Icon size={26} className="text-gold" />
                  </div>
                  <h3
                    className="text-lg font-light mb-5 group-hover:text-gold transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
