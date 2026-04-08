'use client';

import { useEffect, useRef, useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface StatItemProps {
  value: string;
  label: string;
  suffix?: string;
}

function AnimatedStat({ value, label }: StatItemProps) {
  return (
    <div className="text-center p-8">
      <div
        className="text-4xl md:text-5xl font-light text-gold mb-2"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {value}
      </div>
      <div className="text-sm text-muted tracking-wider uppercase">{label}</div>
    </div>
  );
}

export default function Stats() {
  const stats = [
    { value: '£500M+', label: 'Assets Under Advisory' },
    { value: '25+', label: 'Countries Covered' },
    { value: '500+', label: 'Successful Investments' },
    { value: '98%', label: 'Client Satisfaction' },
  ];

  return (
    <section className="py-48 md:py-64 bg-background border-y border-border">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center">
        <AnimatedSection>
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background">
                <AnimatedStat value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
