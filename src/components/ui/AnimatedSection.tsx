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
    <div className={`w-full ${center ? 'text-center' : ''}`}>
      <span className="inline-block text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4">
        {tagline}
      </span>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-4 ${
          light ? 'text-foreground' : 'text-foreground'
        }`}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}{' '}
        <span className="text-gradient-gold">{titleHighlight}</span>
      </h2>
      {subtitle && (
        <p className={`text-muted text-base md:text-lg leading-relaxed ${center ? 'mx-auto text-center' : ''}`}>
          {subtitle}
        </p>
      )}
      <div className={`gold-line mt-6 ${center ? 'mx-auto' : ''}`} />
    </div>
  );
}
