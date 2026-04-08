'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import type { Dictionary } from '@/lib/dictionary';

interface InsightsContentProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

const articles = [
  {
    id: 1,
    title: 'London Property Market Outlook 2026: What Investors Need to Know',
    excerpt: 'An in-depth analysis of the London property market, including emerging hotspots, price forecasts and the best investment strategies for the year ahead.',
    category: 'Market Reports',
    date: '15 March 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800',
    featured: true,
  },
  {
    id: 2,
    title: 'Complete Guide to Portugal Golden Visa 2026',
    excerpt: 'Everything you need to know about the Portugal Golden Visa programme, including the latest regulatory changes and investment options.',
    category: 'Residency',
    date: '10 March 2026',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800',
    featured: false,
  },
  {
    id: 3,
    title: 'Dubai vs London: Where Should You Invest in 2026?',
    excerpt: 'A comparative analysis of two of the world\'s most popular investment destinations, examining yields, capital growth and lifestyle factors.',
    category: 'Investment Guides',
    date: '5 March 2026',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800',
    featured: false,
  },
  {
    id: 4,
    title: 'Setting Up a Business in the UAE: A Comprehensive Guide',
    excerpt: 'From free zones to mainland companies, we break down everything you need to know about establishing your business presence in the UAE.',
    category: 'Business',
    date: '28 February 2026',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800',
    featured: false,
  },
  {
    id: 5,
    title: 'Understanding Rental Yields: A Beginner\'s Guide',
    excerpt: 'Learn how to calculate, compare and maximise rental yields on your property investments across different markets.',
    category: 'Investment Guides',
    date: '20 February 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800',
    featured: false,
  },
  {
    id: 6,
    title: 'Global Residency Programmes Compared: Which Is Right For You?',
    excerpt: 'We compare the leading residency-by-investment programmes across Portugal, Greece, UAE and the UK to help you make the right choice.',
    category: 'Residency',
    date: '15 February 2026',
    readTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
    featured: false,
  },
];

export default function InsightsContent({ dict, locale }: InsightsContentProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = dict.insightsPage.categories;

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

  const filteredArticles = activeCategory === 'All' || activeCategory === 'Tümü'
    ? articles
    : articles.filter((a) => a.category === (categoryMap[activeCategory] || activeCategory));

  const featuredArticle = articles.find((a) => a.featured);

  return (
    <>
      {/* Hero */}
      <section className="hero-dark relative py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504711434969-e33886168d5c?q=80&w=2070"
            alt="Insights"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center">
          <AnimatedSection>
            <SectionHeading
              tagline={dict.insightsPage.tagline}
              title={dict.insightsPage.title}
              titleHighlight={dict.insightsPage.titleHighlight}
              subtitle={dict.insightsPage.subtitle}
              center
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Featured article */}
      {featuredArticle && (
        <section className="py-36 md:py-48 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center">
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-surface border border-border overflow-hidden group">
                <div className="relative h-72 lg:h-auto overflow-hidden">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-10 lg:p-16 flex flex-col justify-center">
                  <span className="text-xs text-gold tracking-widest uppercase mb-4">
                    {locale === 'en' ? 'Featured Article' : 'Öne Çıkan Makale'}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-light mb-4 group-hover:text-gold transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                    {featuredArticle.title}
                  </h2>
                  <p className="text-muted leading-relaxed mb-6">{featuredArticle.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted mb-6">
                    <span className="flex items-center gap-1"><Calendar size={12} />{featuredArticle.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{featuredArticle.readTime}</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-gold group-hover:gap-3 transition-all">
                    {dict.insightsPage.readMore}
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Category filter + Articles */}
      <section className="py-64 md:py-96 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center">
          <AnimatedSection>
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 text-sm border transition-all duration-300 ${
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.filter((a) => !a.featured).map((article, index) => (
              <AnimatedSection key={article.id} delay={index * 0.1}>
                <article className="bg-surface border border-border overflow-hidden group hover:border-gold/30 transition-all duration-500 card-hover">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-background/80 text-xs text-gold border border-gold/20 backdrop-blur-sm">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted mb-3">
                      <span className="flex items-center gap-1"><Calendar size={11} />{article.date}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{article.readTime}</span>
                    </div>
                    <h3 className="text-base font-light mb-3 group-hover:text-gold transition-colors leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-gold">
                      {dict.insightsPage.readMore}
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
