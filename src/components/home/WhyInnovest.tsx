'use client';

import Image from 'next/image';
import { Target, Users, Globe, Award, Handshake, Eye } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import type { Dictionary } from '@/lib/dictionary';

interface WhyUsProps {
  dict: Dictionary;
}

const icons = [Target, Users, Globe, Award, Handshake, Eye];

export default function WhyInnovest({ dict }: WhyUsProps) {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row bg-background overflow-hidden">
      {/* Left: heading + feature grid */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-12 lg:px-16 py-24 lg:py-0">
        <AnimatedSection>
          <div className="mb-16">
            <SectionHeading
              tagline={dict.whyUs.tagline}
              title={dict.whyUs.title}
              titleHighlight={dict.whyUs.titleHighlight}
              subtitle={dict.whyUs.subtitle}
            />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dict.whyUs.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <div className="group flex items-start gap-4 p-6 border border-border hover:border-gold/30 hover:bg-surface/50 transition-all duration-500">
                  <div className="w-10 h-10 shrink-0 border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <h3
                      className="text-base font-light mb-1.5 group-hover:text-gold transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>

      {/* Right: full-height image */}
      <div className="relative w-full lg:w-1/2 min-h-[40vh] lg:min-h-screen">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200"
          alt="Why Innovest"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Gradient blending with left panel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r lg:from-background/80 lg:via-background/20 lg:to-transparent" />

        {/* Floating stat box */}
        <div className="absolute bottom-10 right-10 hidden lg:block">
          <div className="border border-gold/40 bg-black/60 backdrop-blur-sm px-8 py-6">
            <div
              className="text-4xl font-light text-gold mb-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {dict.whyUs.items.length}
            </div>
            <div className="text-xs text-white/60 tracking-widest uppercase">
              {dict.whyUs.tagline}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
