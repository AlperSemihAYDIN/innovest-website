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
    <div className="flex flex-col items-center text-center p-8 md:p-12">
      <div
        className="text-4xl md:text-5xl font-light text-gold mb-3"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {value}
      </div>
      <div className="text-sm text-muted tracking-wider uppercase max-w-[160px] leading-snug">{label}</div>
    </div>
  );
}

interface StatsProps {
  locale?: 'en' | 'tr';
  stats?: Array<{ value: string; label: string }> | null;
}

export default function Stats({ locale = 'en', stats: override }: StatsProps) {
  const tr = locale === 'tr';
  const defaults = [
    { value: '£100M+', label: tr ? 'Danışmanlık Altındaki Varlık' : 'Assets Under Advisory' },
    { value: '25+', label: tr ? 'Kapsanan Ülke' : 'Countries Covered' },
    { value: '500+', label: tr ? 'Başarılı Yatırım' : 'Successful Investments' },
    { value: '%98', label: tr ? 'Müşteri Memnuniyeti' : 'Client Satisfaction' },
  ];
  const stats = override && override.length > 0 ? override : defaults;

  return (
    <section className="bg-background border-y border-border min-h-[30vh] flex flex-col justify-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="site-container">
        <AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border">
            {stats.map((stat) => (
              <div key={stat.label}>
                <AnimatedStat value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
