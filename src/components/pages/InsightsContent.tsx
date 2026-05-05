'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import PageHero from '@/components/ui/PageHero';
import type { Dictionary } from '@/lib/dictionary';
import { articles as staticArticles, type Article } from '@/lib/articleData';
import type { InsightsPageContent } from '@/lib/pageDefaults';

interface InsightsContentProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
  content?: InsightsPageContent;
}

export default function InsightsContent({ dict, locale, content }: InsightsContentProps) {
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
        <section className="bg-background" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
          <div className="site-container flex flex-col items-center">
            <AnimatedSection>
              <Link
                href={articleHref(featuredArticle.slug)}
                className="block max-w-6xl mx-auto w-full"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 overflow-hidden group" style={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
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
                    <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>
                      {content?.featuredArticle?.[locale === 'en' ? 'taglineEn' : 'taglineTr'] ?? (locale === 'en' ? 'Featured Article' : 'Öne Çıkan Makale')}
                    </span>
                    <h2 style={{ fontSize: 'clamp(20px, 2vw, 28px)', fontWeight: 400, lineHeight: '1.35', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>
                      {locale === 'tr' ? featuredArticle.titleTr : featuredArticle.title}
                    </h2>
                    <p style={{ lineHeight: '1.9', color: 'rgba(255,255,255,0.65)', fontWeight: 300, marginTop: '16px', marginBottom: 0 }}>{locale === 'tr' ? featuredArticle.excerptTr : featuredArticle.excerpt}</p>
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
      <section className="bg-background" style={{ paddingTop: '60px', paddingBottom: '120px' }}>
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
                  <article className="overflow-hidden group-hover:border-[rgba(201,168,76,0.25)] transition-all duration-300 h-full flex flex-col" style={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={locale === 'tr' ? article.titleTr : article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-col flex-1" style={{ padding: '28px 32px', marginTop: '0' }}>
                      <span className="text-xs font-semibold tracking-widest text-gold" style={{ letterSpacing: '0.12em', marginBottom: '12px', display: 'block' }}>
                        {categoryDisplayMap[article.category] || article.category}
                      </span>
                      <div className="flex items-center gap-4 text-xs text-white/40" style={{ marginBottom: '12px' }}>
                        <span className="flex items-center gap-1"><Calendar size={11} />{locale === 'tr' ? article.dateTr : article.date}</span>
                        <span className="flex items-center gap-1"><Clock size={11} />{locale === 'tr' ? article.readTimeTr : article.readTime}</span>
                      </div>
                      <h3 style={{ fontSize: '16px', fontWeight: 400, fontFamily: 'var(--font-display)', lineHeight: '1.45', marginBottom: 0 }}>
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
