import AnimatedSection from '@/components/ui/AnimatedSection';

interface DisclaimerContentProps {
  locale: 'en' | 'tr';
}

const sections = {
  en: [
    {
      title: 'General Position',
      body: 'Innovest Capital operates strictly as a property advisory, introducer, and management coordination business. We do not act as a principal in any property transaction and do not own, sell, or let property in our own capacity unless expressly stated.',
    },
    {
      title: 'No Client Money',
      body: 'Innovest Capital does not receive, hold, or control client funds. All financial transactions such as property purchase payments, reservation fees, rental income, and tenancy deposits are made directly between clients and relevant third parties.',
    },
    {
      title: 'Advisory Nature of Services',
      body: 'All services provided are advisory and coordination-based only. We do not provide financial, investment, legal, or tax advice. Clients should seek independent professional advice.',
    },
    {
      title: 'Introductions and Third Parties',
      body: 'Innovest Capital may introduce clients to developers, landlords, tenants, contractors, and other providers. These operate independently and we are not responsible for their actions or performance.',
    },
    {
      title: 'Limitation of Liability',
      body: 'To the fullest extent permitted by law, Innovest Capital shall not be liable for any direct or indirect losses, reliance on information, or third-party failures.',
    },
    {
      title: 'Governing Law',
      body: 'This disclaimer is governed by the laws of England and Wales.',
    },
  ],
  tr: [
    {
      title: 'Genel Durum',
      body: 'Innovest Capital, yalnızca gayrimenkul danışmanlığı, aracılık ve yönetim koordinasyonu hizmeti vermektedir. Herhangi bir gayrimenkul işleminde asil taraf olarak hareket etmez ve aksi açıkça belirtilmedikçe kendi adına mülk satmaz, kiralamaz veya mülk sahibi olmaz.',
    },
    {
      title: 'Müşteri Parası Bulundurulmaz',
      body: 'Innovest Capital, müşteri fonlarını almaz, tutmaz veya kontrol etmez. Mülk satın alma ödemeleri, rezervasyon ücretleri, kira gelirleri ve depozitolar gibi tüm finansal işlemler doğrudan müşteriler ile ilgili üçüncü taraflar arasında gerçekleştirilir.',
    },
    {
      title: 'Hizmetlerin Danışmanlık Niteliği',
      body: 'Sunulan tüm hizmetler yalnızca danışmanlık ve koordinasyon niteliğindedir. Finansal, yatırım, hukuki veya vergi danışmanlığı hizmeti verilmez. Müşterilerin bağımsız profesyonel danışmanlık almaları önerilir.',
    },
    {
      title: 'Tanıtımlar ve Üçüncü Taraflar',
      body: 'Innovest Capital, müşterilerini geliştiriciler, ev sahipleri, kiracılar, yükleniciler ve diğer hizmet sağlayıcılarla tanıştırabilir. Bu taraflar bağımsız olarak faaliyet gösterir ve eylemlerinden veya performanslarından sorumluluk kabul edilmez.',
    },
    {
      title: 'Sorumluluk Sınırlaması',
      body: 'Yasaların izin verdiği en geniş ölçüde, Innovest Capital herhangi bir doğrudan veya dolaylı kayıptan, bilgilere güvenilmesinden veya üçüncü taraf başarısızlıklarından sorumlu tutulamaz.',
    },
    {
      title: 'Geçerli Yasa',
      body: 'Bu sorumluluk reddi, İngiltere ve Galler yasalarına tabidir.',
    },
  ],
};

export default function DisclaimerContent({ locale }: DisclaimerContentProps) {
  const content = sections[locale];

  return (
    <>
      <section className="hero-dark relative py-36 md:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="relative site-container">
          <AnimatedSection>
            <div className="text-center">
              <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium mb-5 block">
                {locale === 'en' ? 'Legal' : 'Yasal'}
              </span>
              <h1
                className="text-3xl md:text-4xl font-light mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {locale === 'en' ? 'Important Disclaimer' : 'Önemli Sorumluluk Reddi'}
              </h1>
              <div className="gold-line-center mb-6" />
              <p className="text-muted text-sm">Innovest Capital</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="site-container">
          <div className="max-w-3xl mx-auto space-y-14">
            {content.map((section, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div>
                  <h2
                    className="text-lg font-light text-foreground mb-4"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {section.title}
                  </h2>
                  <p className="text-muted text-sm leading-[1.85]">{section.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
