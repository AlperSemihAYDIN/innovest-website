'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Shield, Award, Zap, Users } from 'lucide-react';

const valueIcons = [Shield, Award, Zap, Users];
const valueRoman = ['I', 'II', 'III', 'IV'];
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
        <div className="relative px-6 md:px-12 lg:px-16 xl:px-20 flex flex-col items-center">
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

      {/* Mission & Vision — split screen with founder photo */}
      <section className="min-h-screen flex flex-col lg:flex-row bg-background overflow-hidden">
        {/* Left: founder photo with layered design elements */}
        <div className="relative w-full lg:w-5/12 min-h-[50vh] lg:min-h-screen">
          <Image
            src="/founder.jpg"
            alt="Innovest Founder – Dubai"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
          {/* Dark gradient bottom-to-top */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          {/* Subtle right fade blending into content */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/60 hidden lg:block" />

          {/* City label bottom-left */}
          <div className="absolute bottom-8 left-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-gold" />
              <span className="text-white/70 text-xs tracking-[0.3em] uppercase">Dubai, UAE</span>
            </div>
          </div>
        </div>

        {/* Right: mission + vision content */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-24 lg:py-0">
          <AnimatedSection>
            <div className="mb-14">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-gold/50" />
                <span className="text-gold text-xs tracking-[0.35em] uppercase font-semibold">
                  {locale === 'en' ? 'Who We Are' : 'Biz Kimiz'}
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-light mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {locale === 'en' ? 'A Vision Built on ' : 'Güven Üzerine İnşa Edilmiş '}
                <span className="text-gradient-gold">
                  {locale === 'en' ? 'Trust & Expertise' : 'Bir Vizyon'}
                </span>
              </h2>
              <div className="w-16 h-px bg-gold/60 mb-10" />
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            <AnimatedSection delay={0.1}>
              <div className="group p-8 border border-border hover:border-gold/40 bg-surface/30 hover:bg-surface/60 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="shrink-0 mt-1">
                    <div className="w-10 h-10 border border-gold/40 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                      <div className="w-4 h-px bg-gold" />
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-light mb-3 text-gold"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {dict.about.mission.title}
                    </h3>
                    <p className="text-muted leading-relaxed text-sm">{dict.about.mission.desc}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="group p-8 border border-border hover:border-gold/40 bg-surface/30 hover:bg-surface/60 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="shrink-0 mt-1">
                    <div className="w-10 h-10 border border-gold/40 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                      <div className="w-4 h-px bg-gold" />
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-light mb-3 text-gold"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {dict.about.vision.title}
                    </h3>
                    <p className="text-muted leading-relaxed text-sm">{dict.about.vision.desc}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="min-h-screen flex flex-col justify-center py-24 bg-surface">
        <div className="px-6 md:px-12 lg:px-16 xl:px-20 flex flex-col items-center">
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
      <section className="bg-background overflow-hidden">
        {/* Asymmetric heading strip */}
        <div className="px-6 md:px-12 lg:px-16 xl:px-20 pt-24 pb-16 border-b border-border">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px bg-gold/50" />
                  <span className="text-gold text-xs tracking-[0.35em] uppercase font-semibold">
                    {locale === 'en' ? 'Our Values' : 'Değerlerimiz'}
                  </span>
                </div>
                <h2
                  className="text-4xl md:text-5xl lg:text-6xl font-light"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {locale === 'en' ? 'What Drives ' : 'Bizi '}
                  <span className="text-gradient-gold">
                    {locale === 'en' ? 'Us Forward' : 'İleri Taşıyan'}
                  </span>
                </h2>
              </div>
              <p className="text-muted text-sm max-w-sm leading-relaxed lg:text-right lg:pb-2">
                {locale === 'en'
                  ? 'The principles that shape how we work, how we decide, and what we stand for.'
                  : 'Nasıl çalıştığımızı, nasıl karar verdiğimizi ve neye inandığımızı şekillendiren ilkeler.'}
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Value rows — full width editorial layout */}
        <div className="divide-y divide-border pb-24">
          {dict.about.values.map((value, index) => {
            const Icon = valueIcons[index];
            const roman = valueRoman[index];
            return (
              <AnimatedSection key={value.title} delay={index * 0.08}>
                <div className="group px-6 md:px-12 lg:px-16 xl:px-20 py-10 lg:py-12 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 hover:bg-surface/50 transition-colors duration-500 cursor-default">
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
                  <div className="flex items-center gap-4 lg:w-60 shrink-0">
                    <div className="w-11 h-11 border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/60 transition-all duration-400 shrink-0">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <h3
                      className="text-xl font-light group-hover:text-gold transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {value.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="flex-1 text-sm text-muted leading-relaxed max-w-2xl">
                    {value.desc}
                  </p>

                  {/* Hover arrow indicator */}
                  <div className="hidden lg:flex items-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-px bg-gold" />
                    <div className="w-2 h-2 border-t border-r border-gold rotate-45 -ml-1" />
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-surface border-t border-border">
        <div className="px-6 md:px-12 lg:px-16 xl:px-20 flex flex-col items-center">
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
