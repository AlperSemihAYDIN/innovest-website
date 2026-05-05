'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Shield, Award, Zap, Users } from 'lucide-react';

const valueIcons = [Shield, Award, Zap, Users];
const valueRoman = ['I', 'II', 'III', 'IV'];
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import PageHero from '@/components/ui/PageHero';
import type { Dictionary } from '@/lib/dictionary';
import type { AboutPageContent } from '@/lib/pageDefaults';

interface AboutContentProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
  content?: AboutPageContent;
}

export default function AboutContent({ dict, locale, content }: AboutContentProps) {
  const prefix = locale === 'tr' ? '/tr' : '';
  const l = locale === 'en';
  const c = content;

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow={locale === 'tr' ? 'HAKKIMIZDA' : 'ABOUT US'}
        title={dict.about.title}
        titleHighlight={dict.about.titleHighlight}
        subtitle={dict.about.subtitle}
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
        imageAlt="About Innovest"
      />

      {/* Who We Are — centred grid matching Story section layout */}
      <section className="bg-background min-h-[60vh] flex flex-col justify-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="site-container flex flex-col items-center">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <Image
                  src="/stocks/campaign-creators.jpg"
                  alt="Innovest Founder"
                  width={600}
                  height={650}
                  className="w-full h-[600px] object-cover object-center"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-gold/20 -z-10" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-gold/50" />
                  <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase' }}>
                    {c?.whoWeAre?.[l ? 'taglineEn' : 'taglineTr'] ?? (l ? 'Who We Are' : 'Biz Kimiz')}
                  </span>
                </div>
                <h2
                  style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 400, marginBottom: '24px', fontFamily: 'var(--font-display)' }}
                >
                  {c?.whoWeAre?.[l ? 'titleEn' : 'titleTr'] ?? (l ? 'A Vision Built on ' : 'Güven Üzerine İnşa Edilmiş ')}
                  <span className="text-gradient-gold">
                    {c?.whoWeAre?.[l ? 'titleHighlightEn' : 'titleHighlightTr'] ?? (l ? 'Trust & Expertise' : 'Bir Vizyon')}
                  </span>
                </h2>
                <div className="w-16 h-px bg-gold/60 mb-10" />
              </div>

              <div className="flex flex-col gap-5">
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '12px', padding: '28px 32px', marginBottom: '0' }}>
                  <h3
                    className="text-gold mb-3"
                    style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', fontStyle: 'normal' }}
                  >
                    {dict.about.mission.title}
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: '1.9', color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>{dict.about.mission.desc}</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '12px', padding: '28px 32px', marginBottom: '0' }}>
                  <h3
                    className="text-gold mb-3"
                    style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  >
                    {dict.about.vision.title}
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: '1.9', color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>{dict.about.vision.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Team section ──────────────────────────────────────────── */}
      <section className="bg-surface" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="site-container">
          <AnimatedSection>
            <div className="w-full text-center mb-20 px-4 flex flex-col items-center">
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '16px' }}>
                {c?.team?.[l ? 'taglineEn' : 'taglineTr'] ?? (l ? 'Our People' : 'Ekibimiz')}
              </p>
              <h2
                style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 400, marginBottom: '20px', fontFamily: 'var(--font-display)', color: '#C9A84C' }}
              >
                {c?.team?.[l ? 'titleEn' : 'titleTr'] ?? (l ? 'Our Expert Team' : 'Uzman Ekibimiz')}
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.9', color: 'rgba(255,255,255,0.65)', fontWeight: 300, maxWidth: '42rem', textAlign: 'center' }}>
                {c?.team?.[l ? 'subtitleEn' : 'subtitleTr'] ?? (l ? 'A team of seasoned professionals based in the United Kingdom' : "Birleşik Krallık'ta tecrübeli profesyonellerden oluşan uzman ekibimiz")}
              </p>
              <div className="w-16 h-px bg-gold/40 mt-8" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto" style={{ marginTop: '64px' }}>
            {(c?.team?.members ?? [
              { name: 'Buhari Burak', image: '/team/bbtweb.png' },
              { name: 'Asel', image: '/team/at.png' },
              { name: 'Ceylin', image: '/team/coweb.png' },
              { name: 'Ali', image: '/team/akweb.png' },
              { name: 'Tarık', image: '/team/ttweb.png' },
              { name: 'Efe', image: '/team/etweb.png' },
              { name: 'Zehra', image: '/team/zkweb.png' },
              { name: 'Berat', image: '/team/bweb.png' },
              { name: 'Salih', image: '/team/skweb.jpeg' },
            ]).map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.06}>
                <div className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-background border border-border group-hover:border-gold/40 transition-colors duration-500 rounded-lg">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="mt-4 text-center">
                    <h3
                      style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.05em', marginBottom: '8px', fontFamily: 'var(--font-display)', color: 'white' }}
                    >
                      {member.name}
                    </h3>
                    <div className="w-8 h-px bg-gold/40 mx-auto" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="bg-surface min-h-[60vh] flex flex-col justify-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="site-container flex flex-col items-center">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000"
                  alt="Innovest team"
                  width={600}
                  height={500}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-gold/20 -z-10" />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>
                {c?.story?.[l ? 'taglineEn' : 'taglineTr'] ?? (l ? 'Our Story' : 'Hikayemiz')}
              </span>
              <h2
                style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 400, marginBottom: '24px', fontFamily: 'var(--font-display)' }}
              >
                {c?.story?.[l ? 'titleEn' : 'titleTr'] ?? (l ? 'Building Bridges Across ' : 'Küresel Pazarlarda ')}
                <span className="text-gradient-gold">
                  {c?.story?.[l ? 'titleHighlightEn' : 'titleHighlightTr'] ?? (l ? 'Global Markets' : 'Köprüler Kuruyoruz')}
                </span>
              </h2>
              <div className="space-y-4" style={{ fontSize: '15px', lineHeight: '1.9', color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
                {(c?.story?.paragraphs ?? [
                  { textEn: 'Founded with a clear vision to bridge the gap between international investors and premium global opportunities, Innovest has established itself as a trusted name in cross-border investment advisory.', textTr: 'Uluslararası yatırımcılar ile premium küresel fırsatlar arasındaki boşluğu kapatma vizyonuyla kurulan Innovest, sınır ötesi yatırım danışmanlığında güvenilir bir isim olarak kendini kanıtlamıştır.' },
                  { textEn: 'Our team combines deep market expertise with a client-first philosophy, ensuring every investment decision is backed by thorough research, local knowledge and personalised guidance.', textTr: 'Ekibimiz, derin pazar uzmanlığını müşteri odaklı bir felsefeyle birleştirerek her yatırım kararının kapsamlı araştırma, yerel bilgi ve kişiselleştirilmiş rehberlikle desteklenmesini sağlar.' },
                  { textEn: 'With offices in London and strong partnerships across the UAE, EU and beyond, we provide a truly global service with local insight.', textTr: "Londra'daki ofisimiz ve BAE, AB ve ötesindeki güçlü ortaklıklarımızla, yerel içgörüyle gerçek anlamda küresel bir hizmet sunuyoruz." },
                ]).map((para, i) => (
                  <p key={i}>{l ? para.textEn : para.textTr}</p>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background min-h-[60vh] flex flex-col justify-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="site-container flex flex-col items-center">
          {/* Heading */}
          <AnimatedSection className="w-full max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 pb-12 border-b border-border">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px bg-gold/50" />
                  <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase' }}>
                    {c?.values?.[l ? 'taglineEn' : 'taglineTr'] ?? (l ? 'Our Values' : 'Değerlerimiz')}
                  </span>
                </div>
                <h2
                  style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, fontFamily: 'var(--font-display)' }}
                >
                  {c?.values?.[l ? 'titleEn' : 'titleTr'] ?? (l ? 'What Drives ' : 'Bizi ')}
                  <span className="text-gradient-gold">
                    {c?.values?.[l ? 'titleHighlightEn' : 'titleHighlightTr'] ?? (l ? 'Us Forward' : 'İleri Taşıyan')}
                  </span>
                </h2>
              </div>
              <p style={{ fontSize: '14px', lineHeight: '1.9', color: 'rgba(255,255,255,0.65)', fontWeight: 300, maxWidth: '24rem', textAlign: 'right', paddingBottom: '8px' }}>
                {c?.values?.[l ? 'subtitleEn' : 'subtitleTr'] ?? (l ? 'The principles that shape how we work, how we decide, and what we stand for.' : 'Nasıl çalıştığımızı, nasıl karar verdiğimizi ve neye inandığımızı şekillendiren ilkeler.')}
              </p>
            </div>
          </AnimatedSection>

          {/* Value rows */}
          <div className="w-full max-w-6xl mx-auto divide-y divide-border border-y border-border">
            {dict.about.values.map((value, index) => {
              const Icon = valueIcons[index];
              const roman = valueRoman[index];
              return (
                <AnimatedSection key={value.title} delay={index * 0.08}>
                  <div className="group py-10 lg:py-12 flex flex-col lg:flex-row lg:items-center gap-8 md:gap-12 lg:gap-12 hover:bg-surface/50 transition-colors duration-500 cursor-default px-4 -mx-4">
                    {/* Roman numeral */}
                    <div className="shrink-0 w-16 lg:w-20">
                      <span
                        className="text-5xl lg:text-6xl font-light text-gold/12 group-hover:text-gold/25 transition-colors duration-500 leading-none select-none"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {roman}
                      </span>
                    </div>

                    {/* Expanding gold line */}
                    <div className="hidden lg:block h-px bg-gold/25 w-12 group-hover:w-20 group-hover:bg-gold/60 transition-all duration-500 shrink-0" />

                    {/* Icon + Title */}
                    <div className="flex items-center gap-4 lg:w-56 shrink-0">
                      <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s ease' }} className="group-hover:border-[rgba(201,168,76,0.5)]">
                        <Icon size={20} className="text-gold" />
                      </div>
                      <h3
                        style={{ fontSize: '18px', fontWeight: 400, fontFamily: 'var(--font-display)', color: 'white', transition: 'color 0.3s ease' }}
                        className="group-hover:text-gold"
                      >
                        {value.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p style={{ flex: 1, fontSize: '14px', lineHeight: '1.9', color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
                      {value.desc}
                    </p>

                    {/* Hover arrow */}
                    <div className="hidden lg:flex items-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-px bg-gold" />
                      <div className="w-2 h-2 border-t border-r border-gold rotate-45 -ml-1" />
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-dark relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2070"
            alt="Partner with Innovest"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(6,14,26,0.78) 0%, rgba(10,22,40,0.85) 100%)' }} />
        </div>
        <div className="relative site-container flex flex-col items-center text-center py-24 md:py-32">
          <AnimatedSection className="flex flex-col items-center text-center w-full">
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '20px', display: 'block' }}>
              {locale === 'en' ? 'Get Started' : 'Başlayın'}
            </span>
            <h2
              style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 400, lineHeight: '1.15', maxWidth: '780px', margin: '0 auto 24px', textAlign: 'center', fontFamily: 'var(--font-display)' }}
            >
              {locale === 'en' ? 'Ready to Partner with ' : 'Innovest ile '}
              <span className="text-gradient-gold">
                {locale === 'en' ? 'Innovest?' : 'Ortaklığa Hazır mısınız?'}
              </span>
            </h2>
            <p style={{ fontSize: '17px', lineHeight: '1.9', color: 'rgba(255,255,255,0.65)', fontWeight: 300, maxWidth: '520px', margin: '0 auto 8px', textAlign: 'center' }}>
              {locale === 'en'
                ? 'Schedule a complimentary consultation and discover how we can help achieve your investment goals.'
                : 'Ücretsiz bir danışmanlık görüşmesi planlayın ve yatırım hedeflerinize nasıl ulaşabileceğinizi keşfedin.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link
                href={`${prefix}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-lg hover:opacity-90 transition-all duration-300 btn-shine group"
                style={{ padding: '16px 48px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', background: '#C9A84C', color: '#0a1628', whiteSpace: 'nowrap' }}
              >
                {dict.nav.getConsultation}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <p className="mt-5 text-xs text-white/50 tracking-wide text-center">
              {locale === 'en' ? 'No commitment · Confidential · Worldwide' : 'Bağlayıcı değil · Gizli · Dünya genelinde'}
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
