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
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070"
        imageAlt="Insights"
      />

      {/* Featured article */}
      {featuredArticle && (
        <section className="bg-background" style={{ marginTop: '80px' }}>
          <div className="site-container flex flex-col items-center">
            <AnimatedSection>
              <Link
                href={articleHref(featuredArticle.slug)}
                className="block max-w-6xl mx-auto w-full"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-surface border border-border overflow-hidden group rounded-xl">
                  <div className="relative h-72 lg:h-auto overflow-hidden">
                    <Image
                      src={featuredArticle.image}
                      alt={locale === 'tr' ? featuredArticle.titleTr : featuredArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-10 flex flex-col justify-center">
                    <span className="text-xs text-gold tracking-widest uppercase mb-4">
                      {locale === 'en' ? 'Featured Article' : 'Öne Çıkan Makale'}
                    </span>
                    <h2 className="text-2xl font-light leading-normal mb-4 group-hover:text-gold transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                      {locale === 'tr' ? featuredArticle.titleTr : featuredArticle.title}
                    </h2>
                    <p className="text-white/70 leading-loose mt-4 mb-0">{locale === 'tr' ? featuredArticle.excerptTr : featuredArticle.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted mt-5">
                      <span className="flex items-center gap-1"><Calendar size={12} />{locale === 'tr' ? featuredArticle.dateTr : featuredArticle.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{locale === 'tr' ? featuredArticle.readTimeTr : featuredArticle.readTime}</span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-gold group-hover:gap-3 transition-all mt-4">
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
      <section className="bg-background" style={{ marginTop: '64px', paddingBottom: '128px' }}>
        <div className="site-container flex flex-col items-center">
          <AnimatedSection>
            <div className="flex flex-wrap justify-center" style={{ gap: '12px' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="text-sm rounded-full transition-all duration-300"
                  style={activeCategory === cat
                    ? { padding: '10px 24px', background: '#C1A45D', color: '#081226', fontWeight: 500, border: '1px solid #C1A45D' }
                    : { padding: '10px 24px', background: 'transparent', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.12)' }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch" style={{ gap: '40px', marginTop: '48px' }}>
            {filteredArticles.filter((a) => !a.featured).map((article, index) => (
              <AnimatedSection key={article.id} delay={index * 0.1} className="h-full">
                <Link href={articleHref(article.slug)} className="block group h-full">
                  <article className="bg-surface border border-[rgba(255,255,255,0.07)] overflow-hidden group-hover:border-[rgba(255,255,255,0.15)] transition-all duration-300 card-hover rounded-2xl h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={locale === 'tr' ? article.titleTr : article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-col flex-1" style={{ padding: '24px', marginTop: '0' }}>
                      <span className="text-xs font-semibold tracking-widest text-gold" style={{ letterSpacing: '0.12em', marginBottom: '12px', display: 'block' }}>
                        {categoryDisplayMap[article.category] || article.category}
                      </span>
                      <div className="flex items-center gap-4 text-xs text-white/40" style={{ marginBottom: '12px' }}>
                        <span className="flex items-center gap-1"><Calendar size={11} />{locale === 'tr' ? article.dateTr : article.date}</span>
                        <span className="flex items-center gap-1"><Clock size={11} />{locale === 'tr' ? article.readTimeTr : article.readTime}</span>
                      </div>
                      <h3 className="text-base font-light group-hover:text-gold transition-colors leading-snug" style={{ fontFamily: 'var(--font-display)', marginBottom: '0' }}>
                        {locale === 'tr' ? article.titleTr : article.title}
                      </h3>
                      <p className="text-sm leading-loose line-clamp-2" style={{ color: 'rgba(255,255,255,0.65)', marginTop: '16px', marginBottom: '0' }}>{locale === 'tr' ? article.excerptTr : article.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-sm text-gold" style={{ marginTop: '24px' }}>
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
