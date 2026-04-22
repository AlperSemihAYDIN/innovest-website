'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import type { Dictionary } from '@/lib/dictionary';
import { guides as staticGuides, knowledgeCategories, type Guide } from '@/lib/knowledgeHubData';

interface KnowledgeHubContentProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

export default function KnowledgeHubContent({ dict, locale }: KnowledgeHubContentProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [guideList, setGuideList] = useState<Guide[]>(staticGuides);

  useEffect(() => {
    fetch('/api/guides')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setGuideList(data); })
      .catch(() => {});
  }, []);

  const guideHref = (slug: string) =>
    locale === 'tr' ? `/tr/knowledge-hub/${slug}` : `/knowledge-hub/${slug}`;

  const filteredGuides =
    activeCategory === 'All' || activeCategory === 'Tümü'
      ? guideList
      : guideList.filter((g) =>
          locale === 'tr'
            ? g.categoryTr === activeCategory
            : g.category === activeCategory
        );

  const getCategoryLabel = (cat: typeof knowledgeCategories[number]) =>
    locale === 'tr' ? cat.tr : cat.en;

  const getCategoryValue = (cat: typeof knowledgeCategories[number]) =>
    locale === 'tr' ? cat.tr : cat.en;

  return (
    <>
      {/* Hero */}
      <section className="hero-dark relative py-44 md:py-56 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2069"
            alt="Knowledge Hub"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-background/90" />
        </div>
        <div className="relative site-container">
          <AnimatedSection>
            <SectionHeading
              tagline={locale === 'en' ? 'Knowledge Hub' : 'Bilgi Merkezi'}
              title={locale === 'en' ? 'Investment Guides &' : 'Yatırım Rehberleri &'}
              titleHighlight={locale === 'en' ? 'Expert Resources' : 'Uzman Kaynaklar'}
              subtitle={
                locale === 'en'
                  ? 'In-depth guides to help you navigate property investment, residency programmes and international business expansion.'
                  : 'Gayrimenkul yatırımı, oturum programları ve uluslararası iş geliştirme konularında kapsamlı rehberler.'
              }
              center
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Category Filter + Guides Grid */}
      <section className="py-28 md:py-36 bg-background min-h-[60vh] flex flex-col justify-center">
        <div className="site-container">
          {/* Category Pills */}
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-3 mb-20">
              {knowledgeCategories.map((cat) => {
                const value = getCategoryValue(cat);
                const isActive = activeCategory === value;
                return (
                  <button
                    key={cat.en}
                    onClick={() => setActiveCategory(value)}
                    className={`px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300 border rounded-lg ${
                      isActive
                        ? 'bg-gold text-white border-gold'
                        : 'bg-transparent text-muted border-border/50 hover:border-gold/50 hover:text-gold'
                    }`}
                  >
                    {getCategoryLabel(cat)}
                  </button>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Guides Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide, index) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                locale={locale}
                href={guideHref(guide.slug)}
                delay={index * 0.06}
              />
            ))}
          </div>

          {filteredGuides.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted text-sm">
                {locale === 'en' ? 'No guides found in this category.' : 'Bu kategoride rehber bulunamadı.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-surface border-t border-border min-h-[50vh] flex flex-col justify-center">
        <div className="site-container flex flex-col items-center">
          <AnimatedSection className="flex flex-col items-center text-center w-full">
            <span className="inline-flex items-center px-4 py-1.5 bg-gold/10 border border-gold/20 text-gold text-xs tracking-[0.25em] uppercase font-medium mb-6">
              {locale === 'en' ? 'Need Personalised Advice?' : 'Kişiselleştirilmiş Danışmanlık mı Gerekiyor?'}
            </span>
            <h2
              className="text-3xl md:text-4xl font-light mb-4 text-center"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {locale === 'en' ? 'Get a Tailored ' : 'Kişiye Özel '}
              <span className="text-gradient-gold">
                {locale === 'en' ? 'Investment Plan' : 'Yatırım Planı Alın'}
              </span>
            </h2>
            <div className="gold-line-center mb-8" />
            <p className="text-muted leading-relaxed mb-10 text-center max-w-xl mx-auto">
              {locale === 'en'
                ? 'Our advisory team can provide a personalised investment breakdown based on your goals, budget and timeline.'
                : 'Danışmanlık ekibimiz, hedeflerinize, bütçenize ve zaman çizelgenize göre kişiselleştirilmiş bir yatırım analizi sunabilir.'}
            </p>
            <Link
              href={locale === 'tr' ? '/tr/contact' : '/contact'}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-white font-medium hover:bg-gold-light transition-all duration-300 btn-shine group rounded-lg"
            >
              {locale === 'en' ? 'Book Free Consultation' : 'Ücretsiz Danışmanlık Alın'}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

function GuideCard({
  guide,
  locale,
  href,
  delay,
}: {
  guide: Guide;
  locale: 'en' | 'tr';
  href: string;
  delay: number;
}) {
  const title = locale === 'tr' ? guide.titleTr : guide.title;
  const excerpt = locale === 'tr' ? guide.excerptTr : guide.excerpt;
  const category = locale === 'tr' ? guide.categoryTr : guide.category;

  return (
    <AnimatedSection delay={delay}>
      <Link href={href} className="group block h-full">
        <div className="bg-surface border border-border/40 h-full flex flex-col hover:border-gold/30 transition-all duration-300 rounded-xl">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={guide.image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
          <div className="p-7 flex flex-col flex-1">
            <span className="text-gold text-[10px] tracking-[0.2em] uppercase font-medium mb-3">
              {category}
            </span>
            <h3
              className="text-base font-light mb-3 group-hover:text-gold transition-colors duration-300 leading-snug"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {title}
            </h3>
            <p className="text-muted text-xs leading-relaxed flex-1 mb-5">{excerpt}</p>
            <div className="flex items-center gap-2 text-gold text-xs font-medium tracking-wide">
              <BookOpen size={14} />
              {locale === 'en' ? 'Read Guide' : 'Rehberi Oku'}
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </AnimatedSection>
  );
}
