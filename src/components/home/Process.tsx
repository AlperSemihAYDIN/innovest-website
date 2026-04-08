'use client';

import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import type { Dictionary } from '@/lib/dictionary';

interface ProcessProps {
  dict: Dictionary;
}

export default function Process({ dict }: ProcessProps) {
  return (
    <section className="py-56 md:py-80 bg-surface relative overflow-hidden">
      {/* Accent lines */}
      <div className="absolute right-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 flex flex-col items-center">
        <AnimatedSection>
          <SectionHeading
            tagline={dict.process.tagline}
            title={dict.process.title}
            titleHighlight={dict.process.titleHighlight}
            subtitle={dict.process.subtitle}
            center
          />
        </AnimatedSection>

        <div className="w-full mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {dict.process.steps.map((step, index) => (
            <AnimatedSection key={step.num} delay={index * 0.15}>
              <div className="bg-surface p-8 h-full relative group hover:bg-surface-light transition-colors duration-500">
                {/* Step number */}
                <span
                  className="text-5xl font-light text-gold/10 group-hover:text-gold/20 transition-colors duration-500 block mb-6"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {step.num}
                </span>

                {/* Gold top border on hover */}
                <div className="absolute top-0 left-0 w-full h-px bg-border group-hover:bg-gold transition-colors duration-500" />

                <h3
                  className="text-lg font-light mb-3 group-hover:text-gold transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{step.desc}</p>

                {/* Connection line on larger screens */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-border" />
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
