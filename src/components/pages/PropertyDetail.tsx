'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, BedDouble, Building2, CheckCircle2, ArrowRight, X, ChevronLeft, ChevronRight, Navigation } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { PropertyData } from '@/lib/propertyData';

interface PropertyDetailProps {
  property: PropertyData;
  locale: 'en' | 'tr';
}

export default function PropertyDetail({ property, locale }: PropertyDetailProps) {
  const prefix = locale === 'tr' ? '/tr' : '';
  const cityPath = `${prefix}/real-estate/${property.city}`;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const t = {
    en: {
      backTo: `Back to ${property.city === 'london' ? 'London' : 'Dubai'} Properties`,
      priceFrom: 'Starting from',
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

  const amenityTranslations: Record<string, string> = {
    'Park Views': 'Park Manzarası',
    'Swimming Pool': 'Yüzme Havuzu',
    'Spa & Gym': 'Spa & Spor Salonu',
    '24hr Concierge': '24 Saat Konsiyerj',
    'Secure Parking': 'Güvenli Otopark',
    'Residents Garden': 'Sakinler Bahçesi',
    'Residents Lounge': 'Sakinler Salonu',
    'Gym & Wellness': 'Spor & Wellness',
    'Rooftop Terrace': 'Çatı Terası',
    'Cycle Storage': 'Bisiklet Deposu',
    'River Views': 'Nehir Manzarası',
    'Private Balconies': 'Özel Balkonlar',
    'Concierge': 'Konsiyerj',
    'Landscaped Gardens': 'Peyzajlı Bahçeler',
    'Elizabeth Line Hub': 'Elizabeth Line Bağlantısı',
    'Residents Gym': 'Sakinler Spor Salonu',
    'Roof Terrace': 'Çatı Terası',
    'Private Courtyard': 'Özel Avlu',
    'Bike Storage': 'Bisiklet Deposu',
    'Communal Gardens': 'Ortak Bahçeler',
    'EV Charging': 'Elektrikli Araç Şarjı',
    'Video Entry': 'Görüntülü Giriş',
    'Cinema Room': 'Sinema Odası',
    'Roof Garden': 'Çatı Bahçesi',
    'Private Dining': 'Özel Yemek Odası',
    'Infinity Pool': 'Sonsuzluk Havuzu',
    'Rooftop Gym': 'Çatı Spor Salonu',
    'Kids Pool': 'Çocuk Havuzu',
    'BBQ Area': 'Barbekü Alanı',
    'Smart Home': 'Akıllı Ev',
    'Dedicated Parking': 'Tahsisli Otopark',
    'Private Beach Club': 'Özel Plaj Kulübü',
    'Butler Service': 'Butler Hizmeti',
    'Spa & Wellness': 'Spa & Wellness',
    'Private Cinema': 'Özel Sinema',
    'Valet Parking': 'Vale Otopark',
    'Gym & Fitness': 'Spor Salonu',
    'Kids Play Area': 'Çocuk Oyun Alanı',
    'Retail Podium': 'Alışveriş Podiyumu',
    'Visitor Parking': 'Misafir Otoparkı',
    'Supercar Valet': 'Süpercar Vale',
    'Private Spa': 'Özel Spa',
    'Sky Lounge': 'Sky Lounge',
    'Branded Gym': 'Markalı Spor Salonu',
    'Art Gallery Lobby': 'Sanat Galerisi Lobi',
    'Pool & Cabanas': 'Havuz & Kabinler',
    'Gym': 'Spor Salonu',
    'Kids Club': 'Çocuk Kulübü',
    'BBQ Terrace': 'Barbekü Terası',
    'Coworking Space': 'Ortak Çalışma Alanı',
    'Beach Access': 'Plaj Erişimi',
    'Spa & Yoga': 'Spa & Yoga',
    'Fine Dining': 'Restoran',
    'Private Garden': 'Özel Bahçe',
    'Canal Views': 'Kanal Manzarası',
    'Art Gallery': 'Sanat Galerisi',
    'Gym & Spa': 'Spor Salonu & Spa',
    'Paddle Courts': 'Padel Kortları',
    'Sky Deck': 'Sky Deck',
    'Private Beach': 'Özel Plaj',
    'Boardwalk': 'Tahta Yürüyüş Yolu',
    'Yoga Pavilion': 'Yoga Pavyonu',
    'Kids Waterpark': 'Çocuk Su Parkı',
    'Beachfront Dining': 'Plaj Restoranı',
  };

  const translateAmenity = (a: string) =>
    locale === 'tr' ? (amenityTranslations[a] ?? a) : a;

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

        <div className="relative w-full site-container" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
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
              className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight max-w-3xl"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              {property.name}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-muted mb-8">
              <MapPin size={16} className="text-gold shrink-0" />
              <span>{property.location}</span>
            </div>

            {/* Key stats strip */}
            <div className="flex flex-wrap" style={{ gap: '48px' }}>
              <div>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', marginBottom: '6px', textTransform: 'uppercase' }}>{t.priceFrom}</p>
                <p style={{ fontSize: '28px', fontWeight: 400, color: '#C9A84C', fontFamily: 'var(--font-display)' }}>
                  {property.price}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', marginBottom: '6px', textTransform: 'uppercase' }}>{t.completion}</p>
                <div className="flex items-center gap-1" style={{ fontSize: '28px', fontWeight: 400, fontFamily: 'var(--font-display)' }}>
                  <Calendar size={16} className="text-gold" />
                  {property.completion}
                </div>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', marginBottom: '6px', textTransform: 'uppercase' }}>{t.beds}</p>
                <div className="flex items-center gap-1" style={{ fontSize: '28px', fontWeight: 400, fontFamily: 'var(--font-display)' }}>
                  <BedDouble size={16} className="text-gold" />
                  {property.beds}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Overview ──────────────────────────────────────────────── */}
      <section className="py-24 bg-background min-h-[60vh] flex flex-col justify-center">
        <div className="site-container flex flex-col items-center">
          <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Description — 2 cols */}
            <AnimatedSection className="lg:col-span-2">
              <div className="space-y-6">
                {paragraphs.map((para, i) => (
                  <p key={i} style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, fontWeight: 300, fontSize: '15px' }}>
                    {para}
                  </p>
                ))}
              </div>
            </AnimatedSection>

            {/* Sidebar — 1 col */}
            <AnimatedSection delay={0.15}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '36px 32px', borderRadius: '16px' }} className="space-y-6">
                {/* Extra stats */}
                {property.floors && (
                  <div className="flex items-center justify-between py-3 border-b border-border/30">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Building2 size={14} className="text-gold" />
                      {t.floors}
                    </div>
                    <span className="text-foreground font-medium">{property.floors}</span>
                  </div>
                )}
                {property.totalUnits && (
                  <div className="flex items-center justify-between py-3 border-b border-border/30">
                    <span className="text-sm text-muted">{t.totalUnits}</span>
                    <span className="text-foreground font-medium">{property.totalUnits}</span>
                  </div>
                )}

                {/* Amenities */}
                <div>
                  <p style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.15em', color: '#C9A84C', marginTop: '24px', marginBottom: '12px', textTransform: 'uppercase' }}>
                    {locale === 'tr' ? 'OLANAKLAR' : 'AMENITIES'}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {property.amenities.map((a) => (
                      <span key={a} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', marginBottom: '8px', lineHeight: '1.6' }}>
                        {translateAmenity(a)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <p style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.15em', color: '#C9A84C', marginTop: '24px', marginBottom: '12px', textTransform: 'uppercase' }}>
                    {t.address}
                  </p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.8' }}>{property.fullAddress}</p>
                </div>

                {/* CTA */}
                <Link
                  href={`${prefix}/contact`}
                  className="hover:opacity-80 transition-all duration-300"
                  style={{ padding: '16px 32px', border: '1px solid rgba(201,168,76,0.5)', borderRadius: '8px', background: 'transparent', color: '#C9A84C', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', textAlign: 'center', display: 'block', marginTop: '24px' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  {t.contact}
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Project Highlights ────────────────────────────────────── */}
      <section style={{ paddingTop: '100px', paddingBottom: '100px' }} className="bg-surface border-t border-border">
        <div className="site-container">
          <div className="max-w-5xl mx-auto w-full">
            <AnimatedSection>
              <h2 style={{ fontSize: '32px', fontWeight: '400', textAlign: 'center', marginBottom: '64px' }}>
                {t.highlights}
              </h2>
            </AnimatedSection>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 80px' }}>
              {highlights.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.07}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <CheckCircle2 style={{ color: '#C9A84C', marginTop: '3px', flexShrink: 0, width: '18px', height: '18px' }} />
                    <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'rgba(255,255,255,0.70)', fontWeight: '300' }}>{item}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Gallery ───────────────────────────────────────────────── */}
      <section style={{ paddingTop: '80px', paddingBottom: '96px' }} className="bg-background border-t border-border">
        <div className="site-container">
          <div className="max-w-5xl mx-auto w-full">
            <AnimatedSection>
              <h2
                style={{ marginBottom: '40px' }}
                className="text-2xl md:text-3xl font-light text-center"
              >
                {t.gallery}
              </h2>
            </AnimatedSection>

            {/* Clickable gallery grid */}
            <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '24px' }}>
              {property.images.map((src, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <button
                    onClick={() => setLightboxIndex(i)}
                    className="relative bg-surface cursor-pointer group w-full aspect-square"
                    style={{ borderRadius: '12px', overflow: 'hidden' }}
                  >
                    <Image
                      src={src}
                      alt={`${property.name} ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm tracking-widest uppercase">
                        {locale === 'en' ? 'View' : 'Görüntüle'}
                      </span>
                    </div>
                  </button>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Lightbox ──────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightboxIndex(null)}>
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X size={28} />
          </button>
          {property.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + property.images.length) % property.images.length); }}
                className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors z-10"
                aria-label="Previous"
              >
                <ChevronLeft size={36} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % property.images.length); }}
                className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors z-10"
                aria-label="Next"
              >
                <ChevronRight size={36} />
              </button>
            </>
          )}
          <div className="relative w-[90vw] h-[80vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={property.images[lightboxIndex]}
              alt={`${property.name} ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
          <div className="absolute bottom-6 text-white/50 text-sm">
            {lightboxIndex + 1} / {property.images.length}
          </div>
        </div>
      )}

      {/* ─── Location Map ──────────────────────────────────────────── */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px' }} className="bg-surface border-t border-border">
        <div className="site-container">
          <div className="max-w-5xl mx-auto w-full">
            <AnimatedSection>
              <h2
                className="text-2xl md:text-3xl font-light text-center"
                style={{ marginBottom: '12px' }}
              >
                {t.location}
              </h2>
              <p className="text-muted text-sm text-center">{property.fullAddress}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div
                className="w-full h-[400px] md:h-[500px]"
                style={{ marginTop: '32px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}
              >
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
              <div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${property.lat},${property.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '20px', padding: '12px 28px', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '8px', background: 'transparent', color: '#C9A84C', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', cursor: 'pointer' }}
                >
                  <Navigation size={14} />
                  {locale === 'en' ? 'Get Directions' : 'Yol Tarifi Al'}
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-background border-t border-border min-h-[40vh] flex flex-col justify-center">
        <div className="site-container max-w-3xl text-center">
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
            <p className="text-muted mb-10 leading-loose">{t.enquireDesc}</p>
            <Link
              href={`${prefix}/contact`}
              className="inline-flex items-center gap-2 bg-gold text-[#09090b] hover:bg-gold-light transition-all duration-300 group rounded-lg"
              style={{ padding: '16px 48px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', fontFamily: 'var(--font-display)' }}
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
