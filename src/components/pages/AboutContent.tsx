'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import type { Dictionary } from '@/lib/dictionary';

interface AboutContentProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

export default function AboutContent({ dict, locale }: AboutContentProps) {
  const prefix = locale === 'tr' ? '/tr' : '';

  return (
    <>
      {/* Hero */}
      <section className="hero-dark relative py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
            alt="About Innovest"
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
              tagline={dict.about.tagline}
              title={dict.about.title}
              titleHighlight={dict.about.titleHighlight}
              subtitle={dict.about.subtitle}
              center
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-64 md:py-96 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <AnimatedSection>
              <div className="p-10 bg-surface border border-border h-full">
                <div className="w-16 h-px bg-gold mb-8" />
                <h3
                  className="text-2xl font-light mb-4 text-gold"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {dict.about.mission.title}
                </h3>
                <p className="text-muted leading-relaxed">{dict.about.mission.desc}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="p-10 bg-surface border border-border h-full">
                <div className="w-16 h-px bg-gold mb-8" />
                <h3
                  className="text-2xl font-light mb-4 text-gold"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {dict.about.vision.title}
                </h3>
                <p className="text-muted leading-relaxed">{dict.about.vision.desc}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-64 md:py-96 bg-surface">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
              <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4 block">
                {locale === 'en' ? 'Our Story' : 'Hikayemiz'}
              </span>
              <h2
                className="text-3xl md:text-4xl font-light mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {locale === 'en' ? 'Building Bridges Across ' : 'Küresel Pazarlarda '}
                <span className="text-gradient-gold">
                  {locale === 'en' ? 'Global Markets' : 'Köprüler Kuruyoruz'}
                </span>
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  {locale === 'en'
                    ? 'Founded with a clear vision to bridge the gap between international investors and premium global opportunities, Innovest has established itself as a trusted name in cross-border investment advisory.'
                    : 'Uluslararası yatırımcılar ile premium küresel fırsatlar arasındaki boşluğu kapatma vizyonuyla kurulan Innovest, sınır ötesi yatırım danışmanlığında güvenilir bir isim olarak kendini kanıtlamıştır.'}
                </p>
                <p>
                  {locale === 'en'
                    ? 'Our team combines deep market expertise with a client-first philosophy, ensuring every investment decision is backed by thorough research, local knowledge and personalised guidance.'
                    : 'Ekibimiz, derin pazar uzmanlığını müşteri odaklı bir felsefeyle birleştirerek her yatırım kararının kapsamlı araştırma, yerel bilgi ve kişiselleştirilmiş rehberlikle desteklenmesini sağlar.'}
                </p>
                <p>
                  {locale === 'en'
                    ? 'With offices in London and strong partnerships across the UAE, EU and beyond, we provide a truly global service with local insight.'
                    : "Londra'daki ofisimiz ve BAE, AB ve ötesindeki güçlü ortaklıklarımızla, yerel içgörüyle gerçek anlamda küresel bir hizmet sunuyoruz."}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-64 md:py-96 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center">
          <AnimatedSection>
            <div className="text-center mb-20">
              <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4 block">
                {locale === 'en' ? 'Our Values' : 'Değerlerimiz'}
              </span>
              <h2
                className="text-3xl md:text-4xl font-light"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {locale === 'en' ? 'What Drives ' : 'Bizi '}
                <span className="text-gradient-gold">
                  {locale === 'en' ? 'Us Forward' : 'İleri Taşıyan'}
                </span>
              </h2>
              <div className="gold-line-center mt-6" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dict.about.values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="p-8 bg-surface border border-border h-full group hover:border-gold/30 transition-colors duration-500">
                  <div className="w-12 h-12 bg-gold/10 border border-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                    <Check size={20} className="text-gold" />
                  </div>
                  <h3
                    className="text-lg font-light mb-3 group-hover:text-gold transition-colors"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{value.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-56 md:py-80 bg-surface border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center">
          <div className="flex flex-col items-center text-center">
            <AnimatedSection>
              <h2
                className="text-3xl md:text-4xl font-light mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {locale === 'en' ? 'Ready to Partner with ' : 'Innovest ile '}
                <span className="text-gradient-gold">
                  {locale === 'en' ? 'Innovest?' : 'Ortaklığa Hazır mısınız?'}
                </span>
              </h2>
              <p className="text-muted mb-10 max-w-2xl mx-auto">
                {locale === 'en'
                  ? 'Schedule a complimentary consultation and discover how we can help achieve your investment goals.'
                  : 'Ücretsiz bir danışmanlık görüşmesi planlayın ve yatırım hedeflerinize nasıl ulaşabileceğinizi keşfedin.'}
              </p>
              <Link
                href={`${prefix}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-white font-medium hover:bg-gold-light transition-all duration-300 btn-shine group"
              >
                {dict.nav.getConsultation}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
