'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, BookOpen } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { Guide } from '@/lib/knowledgeHubData';

interface GuideDetailProps {
  guide: Guide;
  locale: 'en' | 'tr';
}

export default function GuideDetail({ guide, locale }: GuideDetailProps) {
  const hubHref = locale === 'tr' ? '/tr/knowledge-hub' : '/knowledge-hub';
  const contactHref = locale === 'tr' ? '/tr/contact' : '/contact';

  const title = locale === 'tr' ? guide.titleTr : guide.title;
  const excerpt = locale === 'tr' ? guide.excerptTr : guide.excerpt;
  const body = locale === 'tr' ? guide.bodyTr : guide.bodyEn;
  const category = locale === 'tr' ? guide.categoryTr : guide.category;
  const keyPoints = locale === 'tr' ? guide.keyPointsTr : guide.keyPoints;
  const ctaText = locale === 'tr' ? guide.ctaTextTr : guide.ctaText;

  const backLabel = locale === 'tr' ? 'Bilgi Merkezine Dön' : 'Back to Knowledge Hub';

  return (
    <>
      {/* Hero */}
      <section className="hero-dark relative pt-32 pb-0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={guide.image} alt={title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-background/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background" />
        </div>
        <div className="relative site-container pb-20 md:pb-28">
          <AnimatedSection>
            <Link
              href={hubHref}
              className="inline-flex items-center gap-2 text-xs text-gold/70 hover:text-gold tracking-widest uppercase mb-10 transition-colors"
            >
              <ArrowLeft size={14} />
              {backLabel}
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1 border border-gold/30 text-gold text-xs tracking-widest uppercase">
                {category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted/80">
                <BookOpen size={12} />
                {locale === 'en' ? 'Investment Guide' : 'Yatırım Rehberi'}
              </span>
            </div>

            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground max-w-4xl leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {title}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Guide body */}
      <section className="py-20 md:py-28 bg-background">
        <div className="site-container">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              {/* Lead excerpt */}
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-12 font-light border-l-2 border-gold pl-6">
                {excerpt}
              </p>

              {/* Featured image */}
              <div className="relative aspect-[16/9] overflow-hidden my-12">
                <Image src={guide.image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
              </div>

              {/* Body paragraphs */}
              <div className="space-y-7">
                {body.map((paragraph, i) => (
                  <Fragment key={i}>
                    <p className="text-base text-muted leading-[1.85] font-light">{paragraph}</p>
                    {/* Key points after second paragraph */}
                    {i === 1 && keyPoints && keyPoints.length > 0 && (
                      <div className="bg-surface border border-border/40 p-8 my-4">
                        <h3
                          className="text-sm font-medium text-gold tracking-[0.15em] uppercase mb-5"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {locale === 'en' ? 'Key Points' : 'Önemli Noktalar'}
                        </h3>
                        <ul className="space-y-3">
                          {keyPoints.map((point, j) => (
                            <li key={j} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                              <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-2 flex-shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </AnimatedSection>

            {/* CTA Box */}
            <AnimatedSection>
              <div className="mt-16 bg-surface border border-border/40 p-10 text-center">
                {guide.ctaType === 'inline' ? (
                  <>
                    <p className="text-base text-foreground font-light mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                      {ctaText}
                    </p>
                    <Link
                      href={contactHref}
                      className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-white text-sm font-medium tracking-widest uppercase hover:bg-gold-light transition-all duration-300"
                    >
                      {locale === 'en' ? 'Contact Us' : 'Bize Ulaşın'}
                      <ArrowRight size={14} />
                    </Link>
                  </>
                ) : guide.ctaType === 'soft' && guide.ctaLink ? (
                  <>
                    <a
                      href={guide.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-10 py-4 border border-gold text-gold text-sm tracking-widest uppercase hover:bg-gold hover:text-background transition-all duration-300"
                    >
                      {ctaText}
                      <ExternalLink size={14} />
                    </a>
                    <div className="mt-6">
                      <Link
                        href={contactHref}
                        className="text-xs text-muted hover:text-gold transition-colors tracking-wide"
                      >
                        {locale === 'en' ? 'Or get a full investment breakdown →' : 'Veya kapsamlı bir yatırım analizi alın →'}
                      </Link>
                    </div>
                  </>
                ) : (
                  <Link
                    href={contactHref}
                    className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-white text-sm font-medium tracking-widest uppercase hover:bg-gold-light transition-all duration-300"
                  >
                    {ctaText}
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </AnimatedSection>

            {/* Divider */}
            <div className="my-16 flex items-center gap-4">
              <div className="flex-1 h-px bg-border/60" />
              <div className="w-1.5 h-1.5 bg-gold/40 rotate-45" />
              <div className="flex-1 h-px bg-border/60" />
            </div>

            {/* Back link bottom */}
            <AnimatedSection>
              <Link href={hubHref} className="inline-flex items-center gap-2 text-sm text-gold hover:gap-3 transition-all">
                <ArrowLeft size={14} />
                {backLabel}
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Bottom CTA section */}
      <section className="py-24 bg-surface border-t border-border/40">
        <div className="site-container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <p className="text-xs text-gold tracking-widest uppercase mb-3">
                  {locale === 'en' ? 'EXPERT GUIDANCE' : 'UZMAN DANIŞMANLIK'}
                </p>
                <h2
                  className="text-2xl md:text-3xl font-light mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {locale === 'en' ? 'Want to Learn More About This Topic?' : 'Bu Konuda Daha Fazla Bilgi Almak İster Misiniz?'}
                </h2>
                <p className="text-muted text-sm leading-relaxed max-w-lg">
                  {locale === 'en'
                    ? 'Our expert advisors provide personalised guidance tailored to your investment objectives.'
                    : 'Uzman danışmanlarımız, yatırım hedefleriniz doğrultusunda kişiselleştirilmiş rehberlik sunar.'}
                </p>
              </div>
              <Link
                href={contactHref}
                className="shrink-0 inline-flex items-center gap-2 px-8 py-4 border border-gold text-gold text-sm tracking-widest uppercase hover:bg-gold hover:text-background transition-all duration-300"
              >
                {locale === 'en' ? 'Get in Touch' : 'Bizimle İletişime Geçin'}
                <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
