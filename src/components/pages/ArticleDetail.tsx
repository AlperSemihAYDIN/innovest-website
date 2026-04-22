'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { Article } from '@/lib/articleData';

const categoryImages: Record<string, string> = {
  'Market Reports':
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1600',
  'Investment Guides':
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1600',
  Residency:
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600',
  Business:
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600',
};

interface ArticleDetailProps {
  article: Article;
  locale: 'en' | 'tr';
}

const categoryMap: Record<string, string> = {
  'Market Reports': 'Pazar Raporları',
  'Investment Guides': 'Yatırım Rehberleri',
  Residency: 'Oturum İzni',
  Business: 'İş Dünyası',
};

export default function ArticleDetail({ article, locale }: ArticleDetailProps) {
  const insightsHref = locale === 'tr' ? '/tr/insights' : '/insights';
  const contactHref = locale === 'tr' ? '/tr/contact' : '/contact';

  const title = locale === 'tr' ? article.titleTr : article.title;
  const excerpt = locale === 'tr' ? article.excerptTr : article.excerpt;
  const date = locale === 'tr' ? article.dateTr : article.date;
  const readTime = locale === 'tr' ? article.readTimeTr : article.readTime;
  const body = locale === 'tr' ? article.bodyTr : article.bodyEn;
  const category =
    locale === 'tr' ? categoryMap[article.category] || article.category : article.category;

  const backLabel = locale === 'tr' ? 'İçgörülere Dön' : 'Back to Insights';
  const ctaTagline = locale === 'tr' ? 'UZMAN DANIŞMANLIK' : 'EXPERT GUIDANCE';
  const ctaTitle =
    locale === 'tr'
      ? 'Bu Konuda Daha Fazla Bilgi Almak İster Misiniz?'
      : 'Want to Learn More About This Topic?';
  const ctaBody =
    locale === 'tr'
      ? 'Uzman danışmanlarımız, yatırım hedefleriniz doğrultusunda kişiselleştirilmiş rehberlik sunar.'
      : 'Our expert advisors provide personalised guidance tailored to your investment objectives.';
  const ctaButton = locale === 'tr' ? 'Bizimle İletişime Geçin' : 'Get in Touch';

  return (
    <>
      {/* Hero */}
      <section className="hero-dark relative pt-32 pb-0 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={article.image}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-background/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background" />
        </div>
        <div className="relative site-container pb-20 md:pb-28">
          <AnimatedSection>
            {/* Back link */}
            <Link
              href={insightsHref}
              className="inline-flex items-center gap-2 text-xs text-gold/70 hover:text-gold tracking-widest uppercase mb-10 transition-colors"
            >
              <ArrowLeft size={14} />
              {backLabel}
            </Link>

            {/* Category + meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1 border border-gold/30 text-gold text-xs tracking-widest uppercase">
                {category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted/80">
                <Calendar size={12} />
                {date}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted/80">
                <Clock size={12} />
                {readTime}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground max-w-4xl leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {title}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Article body */}
      <section className="py-20 md:py-28 bg-background">
        <div className="site-container">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              {/* Lead / excerpt */}
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-12 font-light border-l-2 border-gold pl-6">
                {excerpt}
              </p>

              {/* Featured article photo */}
              <div className="relative aspect-[16/9] overflow-hidden my-12">
                <Image
                  src={article.image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>

              {/* Body paragraphs with mid-article image */}
              <div className="space-y-7">
                {body.map((paragraph, i) => (
                  <Fragment key={i}>
                    <p className="text-base text-muted leading-[1.85] font-light">{paragraph}</p>
                    {i === 1 && (
                      <div className="relative aspect-[16/9] overflow-hidden my-4">
                        <Image
                          src={categoryImages[article.category] || article.image}
                          alt={category}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 768px"
                        />
                      </div>
                    )}
                  </Fragment>
                ))}
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
              <Link
                href={insightsHref}
                className="inline-flex items-center gap-2 text-sm text-gold hover:gap-3 transition-all"
              >
                <ArrowLeft size={14} />
                {backLabel}
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 bg-surface border-t border-border/40">
        <div className="site-container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <p className="text-xs text-gold tracking-widest uppercase mb-3">{ctaTagline}</p>
                <h2
                  className="text-2xl md:text-3xl font-light mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {ctaTitle}
                </h2>
                <p className="text-muted text-sm leading-relaxed max-w-lg">{ctaBody}</p>
              </div>
              <Link
                href={contactHref}
                className="shrink-0 inline-flex items-center gap-2 px-8 py-4 border border-gold text-gold text-sm tracking-widest uppercase hover:bg-gold hover:text-background transition-all duration-300"
              >
                {ctaButton}
                <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
