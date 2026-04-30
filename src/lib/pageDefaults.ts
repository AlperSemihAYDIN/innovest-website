/**
 * Default content for editable site pages, used as a fallback when Firestore
 * has no override. Admin panel reads this shape and writes the same shape back.
 *
 * NOTE: keep in sync with the components that consume these slugs.
 */

export type PageSlug = 'home' | 'about' | 'services' | 'contact' | 'footer';

export interface HomePageContent {
  hero: {
    titleEn: string;
    titleTr: string;
    titleHighlightEn: string;
    titleHighlightTr: string;
    subtitleEn: string;
    subtitleTr: string;
    ctaEn: string;
    ctaTr: string;
    ctaSecondaryEn: string;
    ctaSecondaryTr: string;
  };
  stats: Array<{
    value: string;
    labelEn: string;
    labelTr: string;
  }>;
  services: {
    taglineEn: string;
    taglineTr: string;
    titleEn: string;
    titleTr: string;
    titleHighlightEn: string;
    titleHighlightTr: string;
    subtitleEn: string;
    subtitleTr: string;
    items: Array<{
      titleEn: string;
      titleTr: string;
      descEn: string;
      descTr: string;
      ctaEn: string;
      ctaTr: string;
    }>;
  };
  testimonials: Array<{
    quoteEn: string;
    quoteTr: string;
    name: string;
    role: string;
    image: string;
  }>;
  cta: {
    titleEn: string;
    titleTr: string;
    titleHighlightEn: string;
    titleHighlightTr: string;
    subtitleEn: string;
    subtitleTr: string;
    buttonEn: string;
    buttonTr: string;
    noteEn: string;
    noteTr: string;
  };
}

export const homeDefaults: HomePageContent = {
  hero: {
    titleEn: 'Where Insight Becomes',
    titleTr: 'Global Yatırımların',
    titleHighlightEn: 'Opportunity',
    titleHighlightTr: 'Başlangıç Noktası',
    subtitleEn:
      'Strategic investment solutions across the UK, UAE, EU, USA and key global markets. We help investors grow their portfolios through real estate, residency programmes and business expansion.',
    subtitleTr:
      'İngiltere, BAE, Avrupa ve ABD başta olmak üzere önde gelen global pazarlarda stratejik yatırım çözümleri sunuyoruz. Gayrimenkul, oturum programları ve uluslararası genişleme alanlarında, yatırımcıların yatırım portföylerini güvenli ve sürdürülebilir şekilde büyütmelerine rehberlik ediyoruz.',
    ctaEn: 'Schedule a Consultation',
    ctaTr: 'Danışmanlık Randevusu Al',
    ctaSecondaryEn: 'Explore Services',
    ctaSecondaryTr: 'Hizmetleri Keşfet',
  },
  stats: [
    { value: '£100M+', labelEn: 'Assets Under Advisory', labelTr: 'Danışmanlık Altındaki Varlık' },
    { value: '25+', labelEn: 'Countries Covered', labelTr: 'Kapsanan Ülke' },
    { value: '500+', labelEn: 'Successful Investments', labelTr: 'Başarılı Yatırım' },
    { value: '%98', labelEn: 'Client Satisfaction', labelTr: 'Müşteri Memnuniyeti' },
  ],
  services: {
    taglineEn: 'Our Expertise',
    taglineTr: 'Uzmanlık Alanlarımız',
    titleEn: 'Comprehensive Investment',
    titleTr: 'Kapsamlı Yatırım',
    titleHighlightEn: 'Solutions',
    titleHighlightTr: 'Çözümleri',
    subtitleEn: 'Three core pillars designed to maximise your global investment potential.',
    subtitleTr: 'Küresel yatırım potansiyelinizi maksimize etmek için tasarlanmış üç temel alan.',
    items: [
      {
        titleEn: 'Real Estate Investment Advisory',
        titleTr: 'Gayrimenkul Yatırım Danışmanlığı',
        descEn: 'Premium property opportunities in London and Dubai. We identify high-yield investments tailored to your portfolio.',
        descTr: 'Londra ve Dubai\'de öne çıkan gayrimenkul fırsatları. Portföyünüze uygun yüksek getirili yatırımları belirliyoruz.',
        ctaEn: 'Explore Properties',
        ctaTr: 'Gayrimenkulleri Keşfet',
      },
      {
        titleEn: 'Residency by Investment',
        titleTr: 'Yatırım Yoluyla Oturum',
        descEn: 'Secure residency and citizenship through strategic investments. We guide you through Golden Visa programmes across Portugal, Greece, UAE and more.',
        descTr: 'Stratejik yatırımlar yoluyla oturum ve vatandaşlık seçeneklerine erişim. Portekiz, Yunanistan, BAE ve daha fazlasında Altın Vize programlarında size rehberlik ediyoruz.',
        ctaEn: 'Learn More',
        ctaTr: 'Daha Fazla Bilgi',
      },
      {
        titleEn: 'Business Expansion & Advisory',
        titleTr: 'Uluslararası İş Geliştirme & Genişleme',
        descEn: 'Expand your commercial footprint internationally. From market entry strategies to partner matching and trade facilitation across key global markets.',
        descTr: 'Ticari varlığınızı uluslararası arenada genişletin. Pazar giriş stratejilerinden ortaklık eşleştirmesine ve ticaret kolaylaştırmasına kadar.',
        ctaEn: 'Get Started',
        ctaTr: 'Başlayın',
      },
    ],
  },
  testimonials: [
    {
      quoteEn:
        'Working with Innovest was transformative for my portfolio. Their deep understanding of the London market and personalised approach helped me secure two premium properties that have exceeded yield expectations.',
      quoteTr:
        'Innovest ile çalışmak portföyüm için dönüştürücü oldu. Londra pazarını derin anlayışları ve kişiselleştirilmiş yaklaşımları, getiri beklentilerimi aşan iki premium mülk edinmemi sağladı.',
      name: 'James Richardson',
      role: 'Private Investor, London',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    },
    {
      quoteEn:
        'Innovest made the Golden Visa process seamless. From initial consultation to receiving my residence permit, their team handled everything with exceptional professionalism and attention to detail.',
      quoteTr:
        'Innovest, Altın Vize sürecini sorunsuz hale getirdi. İlk danışmanlıktan oturma iznime kadar ekip her şeyi olağanüstü profesyonellik ve dikkatle yönetti.',
      name: 'Ayşe Demir',
      role: 'Girişimci, İstanbul',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    },
    {
      quoteEn:
        'Their business expansion advisory was invaluable for our UAE market entry. The local connections and strategic guidance they provided accelerated our timeline by at least six months.',
      quoteTr:
        'İş genişleme danışmanlıkları BAE pazarına girişimiz için paha biçilmezdi. Sağladıkları yerel bağlantılar ve stratejik rehberlik sürecimizi en az altı ay hızlandırdı.',
      name: 'Michael Chen',
      role: 'CEO, Tech Ventures',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200',
    },
  ],
  cta: {
    titleEn: 'Ready to Start Your',
    titleTr: 'Yatırım Yolculuğunuza',
    titleHighlightEn: 'Investment Journey?',
    titleHighlightTr: 'Başlamaya Hazır mısınız?',
    subtitleEn: 'Book a complimentary consultation with our senior advisors and discover how we can help you achieve your investment goals.',
    subtitleTr: 'Kıdemli danışmanlarımızla ücretsiz bir görüşme planlayın ve yatırım hedeflerinize nasıl ulaşabileceğinizi keşfedin.',
    buttonEn: 'Book Free Consultation',
    buttonTr: 'Ücretsiz Danışmanlık Al',
    noteEn: 'No obligation · Confidential · Available globally',
    noteTr: 'Bağlayıcı değil · Gizli · Dünya genelinde',
  },
};

/**
 * Map slug → defaults. Each editable page registers its default shape here so
 * the admin and public APIs can fall back when no override exists.
 */
export const pageDefaults: Record<PageSlug, unknown> = {
  home: homeDefaults,
  about: {},
  services: {},
  contact: {},
  footer: {},
};

export function getPageDefaults<T = unknown>(slug: PageSlug): T {
  return pageDefaults[slug] as T;
}
