'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import PageHero from '@/components/ui/PageHero';
import type { Dictionary } from '@/lib/dictionary';
import { articles as staticArticles, type Article } from '@/lib/articleData';

interface InsightsContentProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

export default function InsightsContent({ dict, locale }: InsightsContentProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = dict.insightsPage.categories;
  const [articleList, setArticleList] = useState<Article[]>(staticArticles);

  useEffect(() => {
    fetch('/api/articles')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setArticleList(data); })
      .catch(() => {});
  }, []);

  const categoryMap: Record<string, string> = {
    'Market Reports': 'Market Reports',
    'Investment Guides': 'Investment Guides',
    'Residency': 'Residency',
    'Business': 'Business',
    'Pazar Raporları': 'Market Reports',
    'Yatırım Rehberleri': 'Investment Guides',
    'Oturum İzni': 'Residency',
    'İş Dünyası': 'Business',
  };

  const categoryDisplayMap: Record<string, string> = locale === 'tr' ? {
    'Market Reports': 'Pazar Raporları',
    'Investment Guides': 'Yatırım Rehberleri',
    'Residency': 'Oturum İzni',
    'Business': 'İş Dünyası',
  } : {};

  const articleHref = (slug: string) =>
    locale === 'tr' ? `/tr/insights/${slug}` : `/insights/${slug}`;

  const filteredArticles = activeCategory === 'All' || activeCategory === 'Tümü'
    ? articleList
    : articleList.filter((a) => a.category === (categoryMap[activeCategory] || activeCategory));

  const featuredArticle = articleList.find((a) => a.featured);

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow={locale === 'tr' ? 'İÇGÖRÜLER' : 'INSIGHTS'}
        title={dict.insightsPage.title}
        titleHighlight={dict.insightsPage.titleHighlight}
        subtitle={dict.insightsPage.subtitle}
        image="https://images.unsplash.com/photo-1504711434969-e33886168d5c?q=80&w=2070"
        imageAlt="Insights"
      />

      {/* Featured article */}
      {featuredArticle && (
        <section className="py-24 bg-background min-h-[60vh] flex flex-col justify-center">
          <div className="site-container flex flex-col items-center">
            <AnimatedSection>
              <Link
                href={articleHref(featuredArticle.slug)}
                className="block max-w-6xl mx-auto w-full"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-surface border border-border overflow-hidden group rounded-xl">
                  <div className="relative h-72 lg:h-auto overflow-hidden">
                    <Image
                      src={featuredArticle.image}
                      alt={locale === 'tr' ? featuredArticle.titleTr : featuredArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-10 lg:p-16 flex flex-col justify-center">
                    <span className="text-xs text-gold tracking-widest uppercase mb-6">
                      {locale === 'en' ? 'Featured Article' : 'Öne Çıkan Makale'}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-light mb-6 group-hover:text-gold transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                      {locale === 'tr' ? featuredArticle.titleTr : featuredArticle.title}
                    </h2>
                    <p className="text-muted leading-[1.85] mb-8">{locale === 'tr' ? featuredArticle.excerptTr : featuredArticle.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted mb-8">
                      <span className="flex items-center gap-1"><Calendar size={12} />{locale === 'tr' ? featuredArticle.dateTr : featuredArticle.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{locale === 'tr' ? featuredArticle.readTimeTr : featuredArticle.readTime}</span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-gold group-hover:gap-3 transition-all">
                      {dict.insightsPage.readMore}
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Category filter + Articles */}
      <section className="py-24 bg-background min-h-[60vh] flex flex-col justify-center">
        <div className="site-container flex flex-col items-center">
          <AnimatedSection>
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 text-sm border transition-all duration-300 rounded-lg ${
                    activeCategory === cat
                      ? 'border-gold text-gold bg-gold/5'
                      : 'border-border text-muted hover:border-gold/50 hover:text-gold'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredArticles.filter((a) => !a.featured).map((article, index) => (
              <AnimatedSection key={article.id} delay={index * 0.1} className="h-full">
                <Link href={articleHref(article.slug)} className="block group h-full">
                  <article className="bg-surface border border-border overflow-hidden group-hover:border-gold/30 transition-all duration-500 card-hover rounded-xl h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={locale === 'tr' ? article.titleTr : article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-background/80 text-xs text-gold border border-gold/20 backdrop-blur-sm">
                        {categoryDisplayMap[article.category] || article.category}
                      </span>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-xs text-muted mb-3">
                        <span className="flex items-center gap-1"><Calendar size={11} />{locale === 'tr' ? article.dateTr : article.date}</span>
                        <span className="flex items-center gap-1"><Clock size={11} />{locale === 'tr' ? article.readTimeTr : article.readTime}</span>
                      </div>
                      <h3 className="text-base font-light mb-3 group-hover:text-gold transition-colors leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                        {locale === 'tr' ? article.titleTr : article.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">{locale === 'tr' ? article.excerptTr : article.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-sm text-gold">
                        {dict.insightsPage.readMore}
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
