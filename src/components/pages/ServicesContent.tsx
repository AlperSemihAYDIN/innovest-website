'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, Shield, Briefcase, Search, BarChart3, FileText, Scale, Users, HeadphonesIcon } from 'lucide-react';
import AnimatedSection, { SectionHeading } from '@/components/ui/AnimatedSection';
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
      desc: locale === 'en' ? 'Comprehensive financial analysis, yield projections and risk assessment for every opportunity.' : 'Her fırsat için kapsamlı finansal analiz, getiri projeksiyonları ve risk değerlendirmesi.',
      href: `${prefix}/real-estate`,
    },
    {
      icon: Shield,
      title: locale === 'en' ? 'Residency Programmes' : 'Oturum Programları',
      desc: locale === 'en' ? 'Expert guidance on Golden Visa and residency-by-investment programmes worldwide.' : 'Dünya genelinde Altın Vize ve yatırım yoluyla oturum programlarında uzman rehberliği.',
      href: `${prefix}/residency`,
    },
    {
      icon: Briefcase,
      title: locale === 'en' ? 'Business Advisory' : 'İş Danışmanlığı',
      desc: locale === 'en' ? 'Strategic consulting for market entry, business setup and commercial expansion.' : 'Pazar girişi, iş kurulumu ve ticari genişleme için stratejik danışmanlık.',
      href: `${prefix}/business-expansion`,
    },
    {
      icon: Scale,
      title: locale === 'en' ? 'Legal Support' : 'Hukuki Destek',
      desc: locale === 'en' ? 'Access to specialised legal counsel for property transactions, immigration and company formation.' : 'Gayrimenkul işlemleri, göç ve şirket kuruluşu için uzman hukuk danışmanlığına erişim.',
      href: `${prefix}/contact`,
    },
    {
      icon: FileText,
      title: locale === 'en' ? 'Due Diligence' : 'Durum Tespiti',
      desc: locale === 'en' ? 'Thorough verification of investments, developers, legal compliance and market conditions.' : 'Yatırımların, geliştiricilerin, yasal uyumluluğun ve pazar koşullarının kapsamlı doğrulanması.',
      href: `${prefix}/contact`,
    },
    {
      icon: Users,
      title: locale === 'en' ? 'Partner Matching' : 'Partner Eşleştirme',
      desc: locale === 'en' ? 'We connect you with vetted business partners, distributors and industry contacts globally.' : 'Sizi dünya genelinde doğrulanmış iş ortakları, distribütörler ve sektör bağlantılarıyla buluşturuyoruz.',
      href: `${prefix}/business-expansion`,
    },
    {
      icon: HeadphonesIcon,
      title: locale === 'en' ? 'Post-Investment Support' : 'Yatırım Sonrası Destek',
      desc: locale === 'en' ? 'Ongoing portfolio management, tenant sourcing, property management and reporting.' : 'Sürekli portföy yönetimi, kiracı bulma, mülk yönetimi ve raporlama.',
      href: `${prefix}/contact`,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero-dark relative py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
            alt="Services"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="relative px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <AnimatedSection>
            <SectionHeading
              tagline={dict.servicesPage.tagline}
              title={dict.servicesPage.title}
              titleHighlight={dict.servicesPage.titleHighlight}
              subtitle={dict.servicesPage.subtitle}
              center
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-44 md:py-64 bg-background">
        <div className="px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {allServices.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.08}>
                <Link href={service.href} className="block group h-full">
                  <div className="p-8 bg-surface border border-border group-hover:border-gold/30 transition-all duration-500 h-full flex flex-col">
                    <div className="w-12 h-12 mb-6 border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                      <service.icon size={22} className="text-gold" />
                    </div>
                    <h3
                      className="text-base font-light mb-3 group-hover:text-gold transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed flex-1">{service.desc}</p>
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
      <section className="py-36 md:py-48 bg-surface border-t border-border">
        <div className="px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <div className="flex flex-col items-center text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                {locale === 'en' ? "Need a Service That's " : 'Size Özel Bir Hizmet mi '}
                <span className="text-gradient-gold">{locale === 'en' ? 'Tailored to You?' : 'Arıyorsunuz?'}</span>
              </h2>
              <p className="text-muted mb-10 max-w-2xl mx-auto">
                {locale === 'en'
                  ? "Every client is unique. Let's discuss your specific needs and create a bespoke service package."
                  : 'Her müşteri benzersizdir. Özel ihtiyaçlarınızı görüşelim ve size özel bir hizmet paketi oluşturalım.'}
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
