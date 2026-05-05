'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeadingProps {
  tagline: string;
  title: string;
  titleHighlight: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export function SectionHeading({
  tagline,
  title,
  titleHighlight,
  subtitle,
  center = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`w-full mb-16 ${center ? 'text-center' : ''}`}>
      {/* Tagline with decorative lines */}
      <div className={`flex items-center gap-4 mb-4 ${center ? 'justify-center' : ''}`}>
        {center && <div className="w-12 h-px bg-gold/50" />}
        <span className="inline-block text-gold text-xs md:text-sm tracking-[0.35em] uppercase font-semibold">
          {tagline}
        </span>
        <div className="w-12 h-px bg-gold/50" />
      </div>
      <h2
        className={`text-4xl md:text-5xl lg:text-6xl font-light leading-tight ${
          light ? 'text-foreground' : 'text-foreground'
        } ${center ? 'text-center' : ''}`}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}{' '}
        <span className="text-gradient-gold" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>{titleHighlight}</span>
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl font-light tracking-wide text-center max-w-2xl mx-auto leading-loose" style={{ color: 'rgba(255,255,255,0.85)', marginTop: '24px', marginBottom: '8px', textAlign: 'center', width: '100%', display: 'block' }}>
          {subtitle}
        </p>
      )}
      <div className={`gold-line mt-8 ${center ? 'mx-auto' : ''}`} />
    </div>
  );
}
