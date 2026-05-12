'use client';

import Image from 'next/image';
import type { Builder } from '@/lib/builders';

interface BuildersMarqueeProps {
  logos: Builder[];
  /** Animation duration in seconds (lower = faster). Default 40. */
  speed?: number;
  /** Optional eyebrow / heading text */
  title?: string;
}

export default function BuildersMarquee({ logos, speed = 40, title }: BuildersMarqueeProps) {
  if (!logos || logos.length === 0) return null;

  // Duplicate the array so the translate -50% creates a seamless loop.
  const loop = [...logos, ...logos];

  return (
    <section
      className="bg-background"
      style={{ paddingTop: '72px', paddingBottom: '72px' }}
      aria-label={title ?? 'Trusted developers'}
    >
      {title && (
        <div className="px-6 md:px-12 lg:px-16 xl:px-20 mb-10 text-center">
          <p
            className="text-[11px] tracking-[0.28em] uppercase text-muted-light"
            style={{ fontWeight: 500 }}
          >
            {title}
          </p>
        </div>
      )}

      <div
        className="builders-marquee"
        // expose duration as CSS var so we can tune per usage
        style={{ ['--marquee-duration' as string]: `${speed}s` }}
      >
        <div className="builders-marquee__track" aria-hidden={false}>
          {loop.map((b, i) => (
            <div className="builders-marquee__item" key={`${b.name}-${i}`}>
              <Image
                src={b.logo}
                alt={b.alt}
                width={160}
                height={80}
                sizes="160px"
                className="builders-marquee__logo"
                style={{ objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .builders-marquee {
          position: relative;
          overflow: hidden;
          width: 100%;
          /* fade edges */
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            black 80px,
            black calc(100% - 80px),
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0,
            black 80px,
            black calc(100% - 80px),
            transparent 100%
          );
        }
        .builders-marquee__track {
          display: flex;
          width: max-content;
          animation: builders-scroll var(--marquee-duration) linear infinite;
        }
        .builders-marquee:hover .builders-marquee__track {
          animation-play-state: paused;
        }
        .builders-marquee__item {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 28px;
          height: 80px;
        }
        .builders-marquee__logo {
          height: 48px;
          width: auto;
          max-width: 160px;
          opacity: 0.7;
          /* invert: dark logo -> white, white bg -> black */
          /* screen blend on dark bg: black becomes transparent, white stays */
          filter: invert(1) brightness(1.05) contrast(1.1);
          mix-blend-mode: screen;
          transition: opacity 0.3s ease;
        }
        .builders-marquee__item:hover .builders-marquee__logo {
          opacity: 1;
        }
        @media (min-width: 768px) {
          .builders-marquee__item {
            padding: 0 48px;
            height: 96px;
          }
          .builders-marquee__logo {
            height: 56px;
            max-width: 180px;
          }
        }
        @keyframes builders-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .builders-marquee__track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
