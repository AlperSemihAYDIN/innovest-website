'use client';

import type { Builder } from '@/lib/builders';

interface BuildersMarqueeProps {
  logos: Builder[];
  /** Animation duration in seconds (lower = faster). Default 50. */
  speed?: number;
  /** Optional eyebrow / heading text */
  title?: string;
}

export default function BuildersMarquee({ logos, speed = 50, title }: BuildersMarqueeProps) {
  if (!logos || logos.length === 0) return null;

  // Duplicate the array so the translate -50% creates a seamless loop.
  const loop = [...logos, ...logos];

  return (
    <section
      className="bg-white"
      style={{ paddingTop: '88px', paddingBottom: '88px' }}
      aria-label={title ?? 'Trusted developers'}
    >
      {/* Title — separate block above the marquee */}
      {title && (
        <div className="px-6 md:px-12 lg:px-16 xl:px-20" style={{ marginBottom: '56px' }}>
          <p
            className="text-center text-[11px] uppercase"
            style={{ fontWeight: 600, color: '#C1A45D', letterSpacing: '0.32em' }}
          >
            {title}
          </p>
        </div>
      )}

      {/* Marquee */}
      <div
        className="builders-marquee"
        style={{ ['--marquee-duration' as string]: `${speed}s` }}
      >
        <div className="builders-marquee__track">
          {loop.map((b, i) => (
            <div className="builders-marquee__item" key={`${b.name}-${i}`}>
              {/* Native img: lets us enforce uniform height + auto width without next/image constraints */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.logo}
                alt={b.alt}
                className="builders-marquee__logo"
                decoding="async"
                style={b.height ? { height: `${b.height}px`, maxHeight: `${b.height}px`, maxWidth: '200px', width: 'auto' } : undefined}
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
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            black 120px,
            black calc(100% - 120px),
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0,
            black 120px,
            black calc(100% - 120px),
            transparent 100%
          );
        }
        .builders-marquee__track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: builders-scroll var(--marquee-duration) linear infinite;
        }
        .builders-marquee:hover .builders-marquee__track {
          animation-play-state: paused;
        }
        .builders-marquee__item {
          /* Fixed-width slot: every logo gets the same horizontal space */
          flex: 0 0 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 160px;
          background: #ffffff;
          overflow: visible;
        }
        .builders-marquee__logo {
          max-width: 140px;
          max-height: 80px;
          width: auto;
          height: auto;
          object-fit: contain;
        }
        @media (min-width: 768px) {
          .builders-marquee__item {
            flex: 0 0 260px;
            height: 190px;
          }
          .builders-marquee__logo {
            max-width: 170px;
            max-height: 96px;
          }
        }
        @keyframes builders-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .builders-marquee__track { animation: none; }
        }
      `}</style>
    </section>
  );
}
