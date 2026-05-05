'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, Shield, Briefcase, Search, BarChart3, FileText, Scale, Users, HeadphonesIcon } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
import PageHero from '@/components/ui/PageHero';
import type { Dictionary } from '@/lib/dictionary';

interface ServicesContentProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

export default function ServicesContent({ dict, locale }: ServicesContentProps) {
  const prefix = locale === 'tr' ? '/tr' : '';

  const allServices = [
    {
      icon: Building2,
      title: locale === 'en' ? 'Property Sourcing' : 'Gayrimenkul Bulma',
      desc: locale === 'en' ? 'Expert identification of high-yield investment properties across London and Dubai markets.' : 'Londra ve Dubai pazarlarında yüksek getirili yatırım gayrimenkullerinin uzman tespiti.',
      href: `${prefix}/real-estate`,
    },
    {
      icon: BarChart3,
      title: locale === 'en' ? 'Investment Analysis' : 'Yatırım Analizi',
      desc: locale === 'en' ? 'Comprehensive financial analysis, yield projections and risk assessment for every opportunity.' : 'Her fırsat için kapsamlı finansal değerlendirme, getiri projeksiyonları ve risk analizi.',
      href: `${prefix}/real-estate`,
    },
    {
      icon: Shield,
      title: locale === 'en' ? 'Residency Programmes' : 'Oturum Programları',
      desc: locale === 'en' ? 'Expert guidance on Golden Visa and residency-by-investment programmes worldwide.' : 'Altın Vize ve yatırım yoluyla oturum programlarında uluslararası uzman rehberlik.',
      href: `${prefix}/residency`,
    },
    {
      icon: Briefcase,
      title: locale === 'en' ? 'Business Advisory' : 'İş Danışmanlığı',
      desc: locale === 'en' ? 'Strategic consulting for market entry, business setup and commercial expansion.' : 'Pazar girişi, şirket kurulumu ve ticari genişleme için stratejik danışmanlık.',
      href: `${prefix}/business-expansion`,
    },
    {
      icon: Scale,
      title: locale === 'en' ? 'Legal Support' : 'Hukuki Destek',
      desc: locale === 'en' ? 'Access to specialised legal counsel for property transactions, immigration and company formation.' : 'Gayrimenkul işlemleri, göç süreçleri ve şirket kuruluşları için uzman hukuk erişimi.',
      href: `${prefix}/contact`,
    },
    {
      icon: FileText,
      title: locale === 'en' ? 'Due Diligence' : 'Durum Tespiti',
      desc: locale === 'en' ? 'Thorough verification of investments, developers, legal compliance and market conditions.' : 'Yatırımların, geliştiricilerin, uyumluluğun ve piyasa koşullarının detaylı doğrulaması.',
      href: `${prefix}/contact`,
    },
    {
      icon: Users,
      title: locale === 'en' ? 'Partner Matching' : 'Partner Eşleştirme',
      desc: locale === 'en' ? 'We connect you with vetted business partners, distributors and industry contacts globally.' : 'Dünya genelinde doğrulanmış iş ortakları, distribütörler ve sektör bağlantılarıyla stratejik eşleştirme.',
      href: `${prefix}/business-expansion`,
    },
    {
      icon: HeadphonesIcon,
      title: locale === 'en' ? 'Post-Investment Support' : 'Yatırım Sonrası Destek',
      desc: locale === 'en' ? 'Ongoing portfolio management, tenant sourcing, property management and reporting.' : 'Portföy yönetimi, kiracı bulma, mülk yönetimi ve performans raporlaması ile sürekli destek.',
      href: `${prefix}/contact`,
    },
  ];

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow={locale === 'tr' ? 'HİZMETLERİMİZ' : 'OUR SERVICES'}
        title={dict.servicesPage.title}
        titleHighlight={dict.servicesPage.titleHighlight}
        subtitle={dict.servicesPage.subtitle}
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
        imageAlt="Services"
      />

      {/* Services Grid */}
      <section className="bg-background min-h-[60vh] flex flex-col justify-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="site-container flex flex-col items-center">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '32px', marginTop: '64px' }}>
            {allServices.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.08}>
                <Link href={service.href} className="block group h-full">
                  <div
                    className="h-full flex flex-col group-hover:border-[rgba(201,168,76,0.25)] group-hover:bg-white/5"
                    style={{ padding: '36px 32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', transition: 'all 0.3s ease' }}
                  >
                    <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <service.icon size={22} className="text-gold" />
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 500, marginTop: '24px', marginBottom: '12px', color: 'white', fontFamily: 'var(--font-display)' }}>
                      {service.title}
                    </h3>
                    <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'rgba(255,255,255,0.6)', fontWeight: 300, flex: 1 }}>{service.desc}</p>
                    <span className="inline-flex items-center gap-1 text-xs text-gold mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      {locale === 'en' ? 'Learn more' : 'Daha fazla'}
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-dark relative flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: '600px' }}>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
            alt="Bespoke service"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[rgba(5,15,35,0.65)]" />
        </div>
        <div className="relative site-container flex flex-col items-center text-center" style={{ paddingTop: '120px', paddingBottom: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatedSection className="flex flex-col items-center text-center w-full">
            <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.2em', color: '#C9A84C', marginBottom: '20px', display: 'block', textTransform: 'uppercase' }}>
              {locale === 'en' ? 'Get Started' : 'Başlayın'}
            </span>
            <h2 style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, marginBottom: '28px', lineHeight: '1.2', fontFamily: 'var(--font-display)' }}>
              {locale === 'en' ? "Need a Service That's " : 'Size Özel Bir Hizmet mi '}
              <span className="text-gradient-gold">{locale === 'en' ? 'Tailored to You?' : 'Arıyorsunuz?'}</span>
            </h2>
            <p style={{ fontSize: '17px', lineHeight: '1.9', color: 'rgba(255,255,255,0.90)', fontWeight: 300, maxWidth: '540px', margin: '0 auto 48px', textAlign: 'center', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
              {locale === 'en'
                ? "Every client is unique. Let's discuss your specific needs and create a bespoke service package."
                : 'Her yatırımcı ve her hedef benzersizdir. İhtiyaçlarınızı birlikte değerlendirerek size özel bir hizmet paketi oluşturalım.'}
            </p>
            <Link
              href={`${prefix}/contact`}
              className="inline-flex items-center gap-2 bg-gold text-white hover:bg-gold-light transition-all duration-300 btn-shine group rounded-lg"
              style={{ padding: '16px 48px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em' }}
            >
              {dict.nav.getConsultation}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
