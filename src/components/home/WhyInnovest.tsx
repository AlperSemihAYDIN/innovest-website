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
    <section className="py-32 lg:py-40 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="relative site-container flex flex-col items-center">
        <div className="w-full max-w-3xl mx-auto text-center mb-20 lg:mb-24">
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

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 auto-rows-fr">
          {dict.whyUs.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <div className="group h-full p-14 lg:p-16 bg-surface/40 hover:bg-surface/70 transition-all duration-500 text-center rounded-2xl flex flex-col items-center">
                  <div className="w-20 h-20 mb-10 mx-auto border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/60 transition-all duration-300 rounded-full">
                    <Icon size={30} className="text-gold" />
                  </div>
                  <h3
                    className="text-xl lg:text-2xl font-light mb-6 group-hover:text-gold transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm lg:text-base text-muted leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
