'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, TrendingUp, Calendar, BedDouble, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { PropertyData } from '@/lib/propertyData';

interface PropertyDetailProps {
  property: PropertyData;
  locale: 'en' | 'tr';
}

export default function PropertyDetail({ property, locale }: PropertyDetailProps) {
  const prefix = locale === 'tr' ? '/tr' : '';
  const cityPath = `${prefix}/real-estate/${property.city}`;

  const t = {
    en: {
      backTo: `Back to ${property.city === 'london' ? 'London' : 'Dubai'} Properties`,
      priceFrom: 'Starting from',
      yield: 'Projected Yield',
      completion: 'Completion',
      beds: 'Bed Types',
      floors: 'Floors',
      totalUnits: 'Total Units',
      highlights: 'Project Highlights',
      gallery: 'Gallery',
      location: 'Location',
      enquire: 'Enquire About This Property',
      enquireDesc: 'Get personalised guidance from our expert advisors.',
      contact: 'Contact for Details',
      consultant: 'Get a Free Consultation',
      taxFree: 'Tax-free returns',
      developer: 'Developer',
      address: 'Address',
    },
    tr: {
      backTo: `${property.city === 'london' ? 'Londra' : 'Dubai'} Projelerine Dön`,
      priceFrom: 'Başlangıç fiyatı',
      yield: 'Beklenen Getiri',
      completion: 'Teslim',
      beds: 'Daire Tipleri',
      floors: 'Kat Sayısı',
      totalUnits: 'Toplam Daire',
      highlights: 'Proje Özellikleri',
      gallery: 'Galeri',
      location: 'Konum',
      enquire: 'Bu Proje Hakkında Bilgi Alın',
      enquireDesc: 'Uzman danışmanlarımızdan kişiselleştirilmiş rehberlik alın.',
      contact: 'Detaylar için İletişime Geçin',
      consultant: 'Ücretsiz Danışmanlık Alın',
      taxFree: 'Vergisiz gelir',
      developer: 'Müteahhit',
      address: 'Adres',
    },
  }[locale];

  const description = property.description[locale];
  const highlights = property.highlights[locale];
  const paragraphs = description.split('\n\n');

  const gmapSrc = `https://maps.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed`;

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────── */}
      <section className="hero-dark relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={property.heroImage}
            alt={property.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>

        <div className="relative w-full px-6 md:px-12 lg:px-16 xl:px-20 pb-16 pt-32">
          <AnimatedSection>
            {/* Back link */}
            <Link
              href={cityPath}
              className="inline-flex items-center gap-2 text-gold text-sm mb-8 hover:gap-3 transition-all duration-300"
            >
              <ArrowLeft size={16} />
              {t.backTo}
            </Link>

            {/* Developer badge */}
            <p
              className="text-gold text-xs tracking-[0.25em] uppercase font-medium mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {property.developer}
            </p>

            {/* Name */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4 leading-tight max-w-3xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {property.name}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-muted mb-8">
              <MapPin size={16} className="text-gold shrink-0" />
              <span>{property.location}</span>
            </div>

            {/* Key stats strip */}
            <div className="flex flex-wrap gap-6 md:gap-12">
              <div>
                <p className="text-xs text-muted mb-1">{t.priceFrom}</p>
                <p className="text-2xl font-light text-gold" style={{ fontFamily: 'var(--font-display)' }}>
                  {property.price}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">{t.yield}</p>
                <div className="flex items-center gap-1 text-2xl font-light text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                  <TrendingUp size={18} className="text-gold" />
                  {property.yield}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">{t.completion}</p>
                <div className="flex items-center gap-1 text-2xl font-light text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                  <Calendar size={16} className="text-gold" />
                  {property.completion}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">{t.beds}</p>
                <div className="flex items-center gap-1 text-2xl font-light text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                  <BedDouble size={16} className="text-gold" />
                  {property.beds}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Overview ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="px-6 md:px-12 lg:px-16 xl:px-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Description — 2 cols */}
            <AnimatedSection className="lg:col-span-2">
              <div className="space-y-6">
                {paragraphs.map((para, i) => (
                  <p key={i} className="text-muted leading-relaxed text-base">
                    {para}
                  </p>
                ))}
              </div>
            </AnimatedSection>

            {/* Sidebar — 1 col */}
            <AnimatedSection delay={0.15}>
              <div className="bg-surface border border-border p-6 space-y-5">
                {/* Extra stats */}
                {property.floors && (
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Building2 size={14} className="text-gold" />
                      {t.floors}
                    </div>
                    <span className="text-foreground font-medium">{property.floors}</span>
                  </div>
                )}
                {property.totalUnits && (
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-sm text-muted">{t.totalUnits}</span>
                    <span className="text-foreground font-medium">{property.totalUnits}</span>
                  </div>
                )}

                {/* Amenities */}
                <div>
                  <p className="text-xs text-gold tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                    Amenities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((a) => (
                      <span key={a} className="text-xs text-muted border border-border px-3 py-1">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-gold tracking-widest uppercase mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    {t.address}
                  </p>
                  <p className="text-sm text-muted">{property.fullAddress}</p>
                </div>

                {/* CTA */}
                <Link
                  href={`${prefix}/contact`}
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-gold text-[#09090b] py-3 text-sm tracking-widest uppercase hover:bg-gold-light transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {t.contact}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Project Highlights ────────────────────────────────────── */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="px-6 md:px-12 lg:px-16 xl:px-20 max-w-6xl mx-auto">
          <AnimatedSection>
            <h2
              className="text-2xl md:text-3xl font-light mb-10"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t.highlights}
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {highlights.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.07}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
                  <p className="text-muted leading-relaxed">{item}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Gallery ───────────────────────────────────────────────── */}
      <section className="py-20 bg-background border-t border-border">
        <div className="px-6 md:px-12 lg:px-16 xl:px-20 max-w-6xl mx-auto">
          <AnimatedSection>
            <h2
              className="text-2xl md:text-3xl font-light mb-10"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t.gallery}
            </h2>
          </AnimatedSection>

          {/* 2×2 grid for first 4 images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {property.images.map((src, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div
                  className={`relative overflow-hidden bg-surface ${
                    i === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-auto md:h-[420px]' : 'aspect-square'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${property.name} ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Location Map ──────────────────────────────────────────── */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="px-6 md:px-12 lg:px-16 xl:px-20 max-w-6xl mx-auto">
          <AnimatedSection>
            <h2
              className="text-2xl md:text-3xl font-light mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t.location}
            </h2>
            <p className="text-muted text-sm mb-8">{property.fullAddress}</p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="w-full h-[400px] md:h-[500px] border border-border overflow-hidden">
              <iframe
                title={`${property.name} location`}
                src={gmapSrc}
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-background border-t border-border">
        <div className="px-6 md:px-12 lg:px-16 xl:px-20 max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <span
              className="text-gold text-xs tracking-[0.25em] uppercase font-medium mb-4 block"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t.enquire}
            </span>
            <h2
              className="text-3xl md:text-4xl font-light mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {property.name}
            </h2>
            <p className="text-muted mb-10 leading-relaxed">{t.enquireDesc}</p>
            <Link
              href={`${prefix}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-[#09090b] font-medium hover:bg-gold-light transition-all duration-300 group"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t.consultant}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
