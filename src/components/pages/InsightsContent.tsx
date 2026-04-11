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
    titleTr: 'Londra Gayrimenkul Piyasası 2026: Yatırımcıların Bilmesi Gerekenler',
    excerpt: 'An in-depth analysis of the London property market, including emerging hotspots, price forecasts and the best investment strategies for the year ahead.',
    excerptTr: 'Londra gayrimenkul piyasasının derinlemesine analizi: yükselen bölgeler, fiyat tahminleri ve önümüzdeki yıl için en iyi yatırım stratejileri.',
    category: 'Market Reports',
    date: '15 March 2026',
    dateTr: '15 Mart 2026',
    readTime: '8 min read',
    readTimeTr: '8 dk okuma',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800',
    featured: true,
  },
  {
    id: 2,
    title: 'Complete Guide to Portugal Golden Visa 2026',
    titleTr: 'Portekiz Altın Vize 2026: Kapsamlı Rehber',
    excerpt: 'Everything you need to know about the Portugal Golden Visa programme, including the latest regulatory changes and investment options.',
    excerptTr: 'Portekiz Altın Vize programı hakkında bilmeniz gereken her şey: son mevzuat değişiklikleri ve yatırım seçenekleri dahil.',
    category: 'Residency',
    date: '10 March 2026',
    dateTr: '10 Mart 2026',
    readTime: '12 min read',
    readTimeTr: '12 dk okuma',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800',
    featured: false,
  },
  {
    id: 3,
    title: 'Dubai vs London: Where Should You Invest in 2026?',
    titleTr: 'Dubai vs Londra: 2026\'da Nereye Yatırım Yapmalısınız?',
    excerpt: 'A comparative analysis of two of the world\'s most popular investment destinations, examining yields, capital growth and lifestyle factors.',
    excerptTr: 'Dünyanın en popüler iki yatırım destinasyonunun karşılaştırmalı analizi: getiri, sermaye büyümesi ve yaşam tarzı faktörleri.',
    category: 'Investment Guides',
    date: '5 March 2026',
    dateTr: '5 Mart 2026',
    readTime: '10 min read',
    readTimeTr: '10 dk okuma',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800',
    featured: false,
  },
  {
    id: 4,
    title: 'Setting Up a Business in the UAE: A Comprehensive Guide',
    titleTr: 'BAE\'de İş Kurmak: Kapsamlı Rehber',
    excerpt: 'From free zones to mainland companies, we break down everything you need to know about establishing your business presence in the UAE.',
    excerptTr: 'Serbest bölgelerden ana kara şirketlerine kadar, BAE\'de iş varlığınızı oluşturmak hakkında bilmeniz gereken her şey.',
    category: 'Business',
    date: '28 February 2026',
    dateTr: '28 Şubat 2026',
    readTime: '15 min read',
    readTimeTr: '15 dk okuma',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800',
    featured: false,
  },
  {
    id: 5,
    title: 'Understanding Rental Yields: A Beginner\'s Guide',
    titleTr: 'Kira Getirilerini Anlamak: Başlangıç Rehberi',
    excerpt: 'Learn how to calculate, compare and maximise rental yields on your property investments across different markets.',
    excerptTr: 'Farklı pazarlardaki gayrimenkul yatırımlarınızda kira getirilerini hesaplamayı, karşılaştırmayı ve maksimize etmeyi öğrenin.',
    category: 'Investment Guides',
    date: '20 February 2026',
    dateTr: '20 Şubat 2026',
    readTime: '7 min read',
    readTimeTr: '7 dk okuma',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800',
    featured: false,
  },
  {
    id: 6,
    title: 'Global Residency Programmes Compared: Which Is Right For You?',
    titleTr: 'Küresel Oturum Programları Karşılaştırması: Hangisi Size Uygun?',
    excerpt: 'We compare the leading residency-by-investment programmes across Portugal, Greece, UAE and the UK to help you make the right choice.',
    excerptTr: 'Portekiz, Yunanistan, BAE ve İngiltere\'deki önde gelen yatırım yoluyla oturum programlarını karşılaştırarak doğru seçimi yapmanıza yardımcı oluyoruz.',
    category: 'Residency',
    date: '15 February 2026',
    dateTr: '15 Şubat 2026',
    readTime: '11 min read',
    readTimeTr: '11 dk okuma',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
    featured: false,
  },
  {
    id: 7,
    title: 'UK Leasehold vs Freehold: What Every Investor Needs to Know',
    titleTr: 'İngiltere\'de Leasehold ve Freehold: Yatırımcıların Bilmesi Gerekenler',
    excerpt: 'Understand the fundamental differences between leasehold and freehold ownership in the UK property market, and what it means for your investment.',
    excerptTr: 'İngiltere gayrimenkul piyasasında leasehold ve freehold mülkiyet arasındaki temel farkları ve yatırımınız için ne anlama geldiğini anlayın.',
    category: 'Investment Guides',
    date: '8 February 2026',
    dateTr: '8 Şubat 2026',
    readTime: '9 min read',
    readTimeTr: '9 dk okuma',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800',
    featured: false,
  },
  {
    id: 8,
    title: 'UK Mortgage Guide for International Buyers',
    titleTr: 'Uluslararası Alıcılar İçin İngiltere Mortgage Rehberi',
    excerpt: 'A step-by-step guide to securing a mortgage in the UK as an overseas buyer, from eligibility criteria to the application process.',
    excerptTr: 'Yabancı alıcı olarak İngiltere\'de mortgage almanın adım adım rehberi: uygunluk kriterlerinden başvuru sürecine kadar.',
    category: 'Investment Guides',
    date: '1 February 2026',
    dateTr: '1 Şubat 2026',
    readTime: '13 min read',
    readTimeTr: '13 dk okuma',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800',
    featured: false,
  },
  {
    id: 9,
    title: 'Burj Khalifa vs Burj Al Arab: The Iconic Symbols of Dubai',
    titleTr: 'Burj Khalifa vs Burj Al Arab: Dubai\'nin İkonik Sembolleri',
    excerpt: 'Exploring the architectural marvels and investment appeal of Dubai\'s two most iconic landmarks and their surrounding property markets.',
    excerptTr: 'Dubai\'nin en ikonik iki simgesinin mimari hayranlığını ve çevresindeki gayrimenkul pazarlarının yatırım çekiciliğini keşfedin.',
    category: 'Market Reports',
    date: '25 January 2026',
    dateTr: '25 Ocak 2026',
    readTime: '6 min read',
    readTimeTr: '6 dk okuma',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800',
    featured: false,
  },
  {
    id: 10,
    title: 'UK Economic Outlook 2026: What It Means for Property Investors',
    titleTr: '2026 İngiltere Ekonomik Görünümü: Gayrimenkul Yatırımcıları İçin Ne Anlam İfade Ediyor?',
    excerpt: 'Navigating the UK economy in 2026: inflation trends, interest rate forecasts and their direct impact on property investment returns.',
    excerptTr: '2026\'da İngiltere ekonomisinde gezinmek: enflasyon eğilimleri, faiz oranı tahminleri ve gayrimenkul yatırım getirileri üzerindeki doğrudan etkileri.',
    category: 'Market Reports',
    date: '18 January 2026',
    dateTr: '18 Ocak 2026',
    readTime: '10 min read',
    readTimeTr: '10 dk okuma',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800',
    featured: false,
  },
  {
    id: 11,
    title: 'Historic Properties in England: Investment Potential and Preservation',
    titleTr: 'İngiltere\'de Tarihi Mülkler: Yatırım Potansiyeli ve Koruma',
    excerpt: 'Discover the unique investment opportunities in listed and heritage properties across England, and how preservation adds long-term value.',
    excerptTr: 'İngiltere genelinde tescilli ve tarihi mülklerdeki benzersiz yatırım fırsatlarını ve korumanın uzun vadeli değer nasıl kattığını keşfedin.',
    category: 'Investment Guides',
    date: '10 January 2026',
    dateTr: '10 Ocak 2026',
    readTime: '8 min read',
    readTimeTr: '8 dk okuma',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800',
    featured: false,
  },
  {
    id: 12,
    title: 'Greece Golden Visa: Updated Requirements and Benefits for 2026',
    titleTr: 'Yunanistan Altın Vize: 2026 İçin Güncellenmiş Gereksinimler ve Avantajlar',
    excerpt: 'The latest changes to the Greek Golden Visa programme, new minimum investment thresholds, and why it remains a top choice for EU residency.',
    excerptTr: 'Yunanistan Altın Vize programındaki son değişiklikler, yeni minimum yatırım eşikleri ve AB oturumu için neden en iyi seçenek olmaya devam ettiği.',
    category: 'Residency',
    date: '3 January 2026',
    dateTr: '3 Ocak 2026',
    readTime: '10 min read',
    readTimeTr: '10 dk okuma',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800',
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

  const categoryDisplayMap: Record<string, string> = locale === 'tr' ? {
    'Market Reports': 'Pazar Raporları',
    'Investment Guides': 'Yatırım Rehberleri',
    'Residency': 'Oturum İzni',
    'Business': 'İş Dünyası',
  } : {};

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
        <div className="relative px-6 md:px-12 lg:px-16 xl:px-20 flex flex-col items-center">
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
        <section className="min-h-screen flex flex-col justify-center py-24 bg-background">
          <div className="px-6 md:px-12 lg:px-16 xl:px-20 flex flex-col items-center">
            <AnimatedSection>
              <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-0 bg-surface border border-border overflow-hidden group">
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
                  <span className="text-xs text-gold tracking-widest uppercase mb-4">
                    {locale === 'en' ? 'Featured Article' : 'Öne Çıkan Makale'}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-light mb-4 group-hover:text-gold transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                    {locale === 'tr' ? featuredArticle.titleTr : featuredArticle.title}
                  </h2>
                  <p className="text-muted leading-relaxed mb-6">{locale === 'tr' ? featuredArticle.excerptTr : featuredArticle.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted mb-6">
                    <span className="flex items-center gap-1"><Calendar size={12} />{locale === 'tr' ? featuredArticle.dateTr : featuredArticle.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{locale === 'tr' ? featuredArticle.readTimeTr : featuredArticle.readTime}</span>
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
      <section className="min-h-screen flex flex-col justify-center py-24 bg-background">
        <div className="px-6 md:px-12 lg:px-16 xl:px-20 flex flex-col items-center">
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

          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.filter((a) => !a.featured).map((article, index) => (
              <AnimatedSection key={article.id} delay={index * 0.1}>
                <article className="bg-surface border border-border overflow-hidden group hover:border-gold/30 transition-all duration-500 card-hover">
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
                  <div className="p-6">
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
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
