'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import PageHero from '@/components/ui/PageHero';
import type { Dictionary } from '@/lib/dictionary';
import { guides as staticGuides, knowledgeCategories, type Guide } from '@/lib/knowledgeHubData';

interface KnowledgeHubContentProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

function calcReadTime(guide: Guide): string {
  const words = [...guide.bodyEn, ...guide.bodyTr]
    .join(' ')
    .split(/\s+/).length;
  const mins = Math.max(3, Math.round(words / 200));
  return `${mins} min`;
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

  const prefix = locale === 'tr' ? '/tr' : '';

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow={locale === 'tr' ? 'YATIRIM REHBERİ' : 'INVESTOR GUIDE'}
        title={locale === 'en' ? 'Investment Guides &' : 'Yatırım Rehberleri &'}
        titleHighlight={locale === 'en' ? 'Expert Resources' : 'Uzman Kaynakları'}
        subtitle={
          locale === 'en'
            ? 'In-depth guides to help you navigate property investment, residency programmes and international business expansion.'
            : 'Gayrimenkul yatırımı, oturum programları ve uluslararası iş geliştirme konularında kapsamlı rehberler.'
        }
        image="https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=2070"
        imageAlt="Investor Guide"
      />

      {/* Guide List */}
      <section className="bg-background" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="site-container max-w-5xl mx-auto">

          {/* Category tabs */}
          <div className="flex gap-12 justify-start border-b border-white/10" style={{ paddingBottom: 0, marginBottom: 0 }}>
            {knowledgeCategories.map((cat) => {
              const value = locale === 'tr' ? cat.tr : cat.en;
              const isActive = activeCategory === value;
              return (
                <button
                  key={cat.en}
                  onClick={() => setActiveCategory(value)}
                  className={`py-3 px-2 text-xs tracking-widest uppercase font-semibold cursor-pointer transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'text-gold border-b-2 border-gold'
                      : 'border-b-2 border-transparent hover:text-white/60'
                  }`}
                  style={!isActive ? { color: 'rgba(255,255,255,0.35)' } : {}}
                >
                  {locale === 'tr' ? cat.tr : cat.en}
                </button>
              );
            })}
          </div>

          {/* Count */}
          <p className="text-xs tracking-wider mt-2 mb-8" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {filteredGuides.length} {locale === 'en' ? 'guides' : 'rehber'}
          </p>

          {/* Horizontal list */}
          <div>
            {filteredGuides.map((guide, index) => {
              const title = locale === 'tr' ? guide.titleTr : guide.title;
              const excerpt = locale === 'tr' ? guide.excerptTr : guide.excerpt;
              const category = locale === 'tr' ? guide.categoryTr : guide.category;
              const readTime = calcReadTime(guide);

              return (
                <AnimatedSection key={guide.id} delay={index * 0.04}>
                  <Link
                    href={guideHref(guide.slug)}
                    className="group block py-12 grid grid-cols-12 gap-16 items-center transition-all duration-300 border-b"
                    style={{
                      borderBottomColor: 'rgba(255,255,255,0.08)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }}
                  >
                    {/* Col 1: Number */}
                    <div className="col-span-1 select-none" style={{ fontSize: '2.25rem', fontWeight: 300, color: 'rgba(255,255,255,0.15)', lineHeight: 1 }}>
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Col 2-9: Category + Title + Excerpt */}
                    <div className="col-span-8">
                      <span className="text-xs tracking-widest uppercase font-semibold text-gold" style={{ marginBottom: '12px', display: 'block' }}>
                        {category}
                      </span>
                      <h3 className="text-2xl text-white" style={{ fontWeight: 500, marginBottom: '12px', lineHeight: 1.25 }}>
                        {title}
                      </h3>
                      <p className="text-base leading-loose" style={{ color: 'rgba(255,255,255,0.60)', marginTop: '12px', marginBottom: 0 }}>
                        {excerpt}
                      </p>
                    </div>

                    {/* Col 10-12: Read time + CTA */}
                    <div className="col-span-3 flex flex-col items-end text-right">
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', marginBottom: '16px' }}>
                        {readTime} {locale === 'en' ? 'read' : 'okuma'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-base font-semibold text-gold group-hover:gap-3 transition-all duration-300">
                        {locale === 'en' ? 'Read Guide' : 'Okumaya Başla'}
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>

          {filteredGuides.length === 0 && (
            <p className="text-sm py-16 text-center" style={{ color: 'rgba(255,255,255,0.40)' }}>
              {locale === 'en' ? 'No guides found in this category.' : 'Bu kategoride rehber bulunamadı.'}
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface border-t" style={{ borderColor: 'rgba(255,255,255,0.06)', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="site-container flex flex-col items-center text-center">
          <AnimatedSection className="flex flex-col items-center w-full">
            <span className="text-gold text-xs font-semibold tracking-widest uppercase" style={{ marginBottom: '16px' }}>
              {locale === 'en' ? 'Need Personalised Advice?' : 'Kişiselleştirilmiş Danışmanlık mı Gerekiyor?'}
            </span>
            <h2
              className="text-3xl md:text-4xl font-light text-center"
              style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}
            >
              {locale === 'en' ? 'Get a Tailored ' : 'Kişiye Özel '}
              <span className="text-gradient-gold">
                {locale === 'en' ? 'Investment Plan' : 'Yatırım Planı Alın'}
              </span>
            </h2>
            <p className="text-lg leading-loose text-center max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.60)', marginBottom: '40px' }}>
              {locale === 'en'
                ? 'Our advisory team can provide a personalised investment breakdown based on your goals, budget and timeline.'
                : 'Danışmanlık ekibimiz, hedeflerinize, bütçenize ve zaman çizelgenize göre kişiselleştirilmiş bir yatırım analizi sunabilir.'}
            </p>
            <Link
              href={`${prefix}/contact`}
              className="inline-flex items-center gap-2 py-3.5 px-8 rounded-lg font-semibold text-sm bg-gold text-background hover:bg-gold-light transition-all duration-300 btn-shine group"
              style={{ minWidth: '220px', justifyContent: 'center' }}
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

