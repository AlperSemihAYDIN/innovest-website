'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface PageHeroProps {
  /** Top eyebrow tag, rendered uppercase between two short lines */
  eyebrow: string;
  /** Main title prefix (white) */
  title: string;
  /** Highlighted portion of the title (gold) */
  titleHighlight?: string;
  /** Optional supporting copy below the title */
  subtitle?: string;
  /** Background image src (Next/Image) */
  image: string;
  /** Alt text for the bg image */
  imageAlt?: string;
}

export default function PageHero({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  image,
  imageAlt = '',
}: PageHeroProps) {
  return (
    <section
      className="hero-dark relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight: '45vh' }}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 mx-auto"
        style={{ paddingTop: '96px', paddingBottom: '96px', maxWidth: '720px' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <span className="block w-10 h-px bg-amber-400/70" />
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-400">
            {eyebrow}
          </span>
          <span className="block w-10 h-px bg-amber-400/70" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
        >
          {title}
          {titleHighlight ? (
            <>
              {' '}
              <span className="text-amber-400">{titleHighlight}</span>
            </>
          ) : null}
        </motion.h1>

        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-base text-white/65 max-w-xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
