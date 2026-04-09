'use client';

import Image from 'next/image';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import type { Dictionary } from '@/lib/dictionary';

interface ProcessProps {
  dict: Dictionary;
}

export default function Process({ dict }: ProcessProps) {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row bg-surface overflow-hidden">
      {/* Left: full-height image */}
      <div className="relative w-full lg:w-1/2 min-h-[40vh] lg:min-h-screen">
        <Image
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200"
          alt="Investment Process"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent lg:bg-gradient-to-l lg:from-surface/90 lg:via-surface/40 lg:to-transparent" />

      </div>

      {/* Right: heading + steps */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-12 lg:px-16 py-24 lg:py-0">
        <AnimatedSection>
          <div className="mb-16">
            <SectionHeading
              tagline={dict.process.tagline}
              title={dict.process.title}
              titleHighlight={dict.process.titleHighlight}
              subtitle={dict.process.subtitle}
              center
            />
          </div>
        </AnimatedSection>

        <div className="space-y-0 divide-y divide-border">
          {dict.process.steps.map((step, index) => (
            <AnimatedSection key={step.num} delay={index * 0.12}>
              <div className="group flex items-start gap-8 py-8 hover:bg-surface-light transition-colors duration-300 px-4 -mx-4">
                {/* Step number */}
                <span
                  className="text-5xl font-light text-gold/20 group-hover:text-gold/50 transition-colors duration-500 leading-none shrink-0 w-16 text-right"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {step.num}
                </span>
                <div className="flex-1 pt-1">
                  <div className="w-8 h-px bg-gold mb-4 group-hover:w-16 transition-all duration-500" />
                  <h3
                    className="text-xl font-light mb-3 group-hover:text-gold transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
