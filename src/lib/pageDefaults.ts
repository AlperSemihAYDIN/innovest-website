/**
 * Default content for editable site pages, used as a fallback when Firestore
 * has no override. Admin panel reads this shape and writes the same shape back.
 *
 * NOTE: keep in sync with the components that consume these slugs.
 */

export type PageSlug =
  | 'home'
  | 'about'
  | 'services'
  | 'real-estate'
  | 'residency'
  | 'business-expansion'
  | 'insights'
  | 'guides'
  | 'contact'
  | 'footer';

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
  testimonials_visible: boolean;
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
  testimonials_visible: false,
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

/* ──────────────────────────────────────────────────────────────────────── */
/*  ABOUT                                                                  */
/* ──────────────────────────────────────────────────────────────────────── */

export interface AboutPageContent {
  hero: {
    titleEn: string; titleTr: string;
    titleHighlightEn: string; titleHighlightTr: string;
    subtitleEn: string; subtitleTr: string;
  };
  whoWeAre: {
    taglineEn: string; taglineTr: string;
    titleEn: string; titleTr: string;
    titleHighlightEn: string; titleHighlightTr: string;
  };
  mission: { titleEn: string; titleTr: string; descEn: string; descTr: string };
  vision: { titleEn: string; titleTr: string; descEn: string; descTr: string };
  team: {
    taglineEn: string; taglineTr: string;
    titleEn: string; titleTr: string;
    subtitleEn: string; subtitleTr: string;
    members: Array<{ name: string; image: string }>;
  };
  story: {
    taglineEn: string; taglineTr: string;
    titleEn: string; titleTr: string;
    titleHighlightEn: string; titleHighlightTr: string;
    paragraphs: Array<{ textEn: string; textTr: string }>;
  };
  values: {
    taglineEn: string; taglineTr: string;
    titleEn: string; titleTr: string;
    titleHighlightEn: string; titleHighlightTr: string;
    subtitleEn: string; subtitleTr: string;
    items: Array<{
      titleEn: string; titleTr: string;
      descEn: string; descTr: string;
      icon: string; roman: string;
    }>;
  };
}

export const aboutDefaults: AboutPageContent = {
  hero: {
    titleEn: 'Redefining Global', titleTr: 'Küresel Yatırım Danışmanlığını',
    titleHighlightEn: 'Investment Advisory', titleHighlightTr: 'Yeniden Tanımlıyoruz',
    subtitleEn: 'Founded with a vision to bridge international investment markets, Innovest has grown into a trusted advisory firm serving high-net-worth individuals and institutional investors worldwide.',
    subtitleTr: 'Uluslararası yatırım pazarlarını birbirine bağlama vizyonuyla kurulan Innovest, bugün global ölçekte güvenilir bir yatırım danışmanlığı markasıdır.',
  },
  whoWeAre: {
    taglineEn: 'Who We Are', taglineTr: 'Biz Kimiz',
    titleEn: 'A Vision Built on ', titleTr: 'Güven Üzerine İnşa Edilmiş ',
    titleHighlightEn: 'Trust & Expertise', titleHighlightTr: 'Bir Vizyon',
  },
  mission: {
    titleEn: 'Our Mission', titleTr: 'Misyonumuz',
    descEn: 'To empower investors with strategic insights, premium opportunities and comprehensive support that transforms capital into lasting wealth across global markets.',
    descTr: 'Yatırımcıları stratejik içgörüler, premium fırsatlar ve sermayeyi küresel pazarlarda kalıcı servete dönüştüren kapsamlı destekle güçlendirmek.',
  },
  vision: {
    titleEn: 'Our Vision', titleTr: 'Vizyonumuz',
    descEn: 'To be the most trusted cross-border investment advisory firm, recognised for integrity, expertise and the exceptional outcomes we deliver for our clients.',
    descTr: 'Dürüstlük, uzmanlık ve müşterilerimize sunduğumuz olağanüstü sonuçlarla tanınan, en güvenilir sınır ötesi yatırım danışmanlık firması olmak.',
  },
  team: {
    taglineEn: 'Our People', taglineTr: 'Ekibimiz',
    titleEn: 'Our Expert Team', titleTr: 'Uzman Ekibimiz',
    subtitleEn: 'A team of seasoned professionals based in the United Kingdom',
    subtitleTr: 'Birleşik Krallık\'ta tecrübeli profesyonellerden oluşan uzman ekibimiz',
    members: [
      { name: 'Buhari Burak', image: '/team/bbtweb.png' },
      { name: 'Asel', image: '/team/at.png' },
      { name: 'Ceylin', image: '/team/coweb.png' },
      { name: 'Ali', image: '/team/akweb.png' },
      { name: 'Tarık', image: '/team/ttweb.png' },
      { name: 'Efe', image: '/team/etweb.png' },
      { name: 'Zehra', image: '/team/zkweb.png' },
      { name: 'Berat', image: '/team/bweb.png' },
      { name: 'Salih', image: '/team/skweb.jpeg' },
    ],
  },
  story: {
    taglineEn: 'Our Story', taglineTr: 'Hikayemiz',
    titleEn: 'Building Bridges Across ', titleTr: 'Küresel Pazarlarda ',
    titleHighlightEn: 'Global Markets', titleHighlightTr: 'Köprüler Kuruyoruz',
    paragraphs: [
      {
        textEn: 'Founded with a clear vision to bridge the gap between international investors and premium global opportunities, Innovest has established itself as a trusted name in cross-border investment advisory.',
        textTr: 'Uluslararası yatırımcılar ile premium küresel fırsatlar arasındaki boşluğu kapatma vizyonuyla kurulan Innovest, sınır ötesi yatırım danışmanlığında güvenilir bir isim olarak kendini kanıtlamıştır.',
      },
      {
        textEn: 'Our team combines deep market expertise with a client-first philosophy, ensuring every investment decision is backed by thorough research, local knowledge and personalised guidance.',
        textTr: 'Ekibimiz, derin pazar uzmanlığını müşteri odaklı bir felsefeyle birleştirerek her yatırım kararının kapsamlı araştırma, yerel bilgi ve kişiselleştirilmiş rehberlikle desteklenmesini sağlar.',
      },
      {
        textEn: 'With offices in London and strong partnerships across the UAE, EU and beyond, we provide a truly global service with local insight.',
        textTr: 'Londra\'daki ofisimiz ve BAE, AB ve ötesindeki güçlü ortaklıklarımızla, yerel içgörüyle gerçek anlamda küresel bir hizmet sunuyoruz.',
      },
    ],
  },
  values: {
    taglineEn: 'Our Values', taglineTr: 'Değerlerimiz',
    titleEn: 'What Drives ', titleTr: 'Bizi ',
    titleHighlightEn: 'Us Forward', titleHighlightTr: 'İleri Taşıyan',
    subtitleEn: 'The principles that shape how we work, how we decide, and what we stand for.',
    subtitleTr: 'Nasıl çalıştığımızı, nasıl karar verdiğimizi ve neye inandığımızı şekillendiren ilkeler.',
    items: [
      { titleEn: 'Integrity', titleTr: 'Dürüstlük', descEn: 'We operate with the highest ethical standards, ensuring transparency and trust in every interaction.', descTr: 'Tüm ilişkilerimizin merkezinde şeffaflık ve güven yer alır. Her zaman açık, tutarlı ve etik bir yaklaşım benimseriz.', icon: 'Shield', roman: 'I' },
      { titleEn: 'Excellence', titleTr: 'Mükemmellik', descEn: 'We strive for excellence in every aspect of our service, from research to execution.', descTr: 'Her detaya özen gösterir, araştırmadan uygulamaya kadar her aşamada en yüksek kaliteyi hedefleriz.', icon: 'Award', roman: 'II' },
      { titleEn: 'Innovation', titleTr: 'İnovasyon', descEn: 'We leverage cutting-edge tools and strategies to identify opportunities others miss.', descTr: 'Değişen global dinamikleri yakından takip eder, fırsatları öngörmek için ileri görüşlü ve analitik bir yaklaşım benimseriz.', icon: 'Zap', roman: 'III' },
      { titleEn: 'Client First', titleTr: 'Müşteri Önceliği', descEn: 'Your success is our success. Every decision we make is guided by your best interests.', descTr: 'Her müşterimizin hedefini benzersiz kabul eder, tüm süreçlerimizi bu hedeflere en doğru şekilde hizmet edecek biçimde kurgularız.', icon: 'Users', roman: 'IV' },
    ],
  },
};

/* ──────────────────────────────────────────────────────────────────────── */
/*  SERVICES                                                               */
/* ──────────────────────────────────────────────────────────────────────── */

export interface ServicesPageContent {
  hero: {
    titleEn: string; titleTr: string;
    titleHighlightEn: string; titleHighlightTr: string;
    subtitleEn: string; subtitleTr: string;
  };
  services: Array<{
    titleEn: string; titleTr: string;
    descEn: string; descTr: string;
    icon: string; href: string;
  }>;
  cta: {
    taglineEn: string; taglineTr: string;
    titleEn: string; titleTr: string;
    titleHighlightEn: string; titleHighlightTr: string;
    subtitleEn: string; subtitleTr: string;
  };
}

export const servicesDefaults: ServicesPageContent = {
  hero: {
    titleEn: 'Comprehensive Advisory', titleTr: 'Kapsamlı Danışmanlık',
    titleHighlightEn: 'Solutions', titleHighlightTr: 'Çözümleri',
    subtitleEn: 'A full spectrum of investment and advisory services designed for global investors.',
    subtitleTr: 'Küresel yatırımcılar için tasarlanmış geniş bir yatırım ve danışmanlık hizmetleri yelpazesi.',
  },
  services: [
    { titleEn: 'Property Sourcing', titleTr: 'Gayrimenkul Bulma', descEn: 'Expert identification of high-yield investment properties across London and Dubai markets.', descTr: 'Londra ve Dubai pazarlarında yüksek getirili yatırım gayrimenkullerinin uzman tespiti.', icon: 'Building2', href: '/real-estate' },
    { titleEn: 'Investment Analysis', titleTr: 'Yatırım Analizi', descEn: 'Comprehensive financial analysis, yield projections and risk assessment for every opportunity.', descTr: 'Her fırsat için kapsamlı finansal değerlendirme, getiri projeksiyonları ve risk analizi.', icon: 'BarChart3', href: '/real-estate' },
    { titleEn: 'Residency Programmes', titleTr: 'Oturum Programları', descEn: 'Expert guidance on Golden Visa and residency-by-investment programmes worldwide.', descTr: 'Altın Vize ve yatırım yoluyla oturum programlarında uluslararası uzman rehberlik.', icon: 'Shield', href: '/residency' },
    { titleEn: 'Business Advisory', titleTr: 'İş Danışmanlığı', descEn: 'Strategic consulting for market entry, business setup and commercial expansion.', descTr: 'Pazar girişi, şirket kurulumu ve ticari genişleme için stratejik danışmanlık.', icon: 'Briefcase', href: '/business-expansion' },
    { titleEn: 'Legal Support', titleTr: 'Hukuki Destek', descEn: 'Access to specialised legal counsel for property transactions, immigration and company formation.', descTr: 'Gayrimenkul işlemleri, göç süreçleri ve şirket kuruluşları için uzman hukuk erişimi.', icon: 'Scale', href: '/contact' },
    { titleEn: 'Due Diligence', titleTr: 'Durum Tespiti', descEn: 'Thorough verification of investments, developers, legal compliance and market conditions.', descTr: 'Yatırımların, geliştiricilerin, uyumluluğun ve piyasa koşullarının detaylı doğrulaması.', icon: 'FileText', href: '/contact' },
    { titleEn: 'Partner Matching', titleTr: 'Partner Eşleştirme', descEn: 'We connect you with vetted business partners, distributors and industry contacts globally.', descTr: 'Dünya genelinde doğrulanmış iş ortakları, distribütörler ve sektör bağlantılarıyla stratejik eşleştirme.', icon: 'Users', href: '/business-expansion' },
    { titleEn: 'Post-Investment Support', titleTr: 'Yatırım Sonrası Destek', descEn: 'Ongoing portfolio management, tenant sourcing, property management and reporting.', descTr: 'Portföy yönetimi, kiracı bulma, mülk yönetimi ve performans raporlaması ile sürekli destek.', icon: 'HeadphonesIcon', href: '/contact' },
  ],
  cta: {
    taglineEn: 'Get Started', taglineTr: 'Başlayın',
    titleEn: "Need a Service That's ", titleTr: 'Size Özel Bir Hizmet mi ',
    titleHighlightEn: 'Tailored to You?', titleHighlightTr: 'Arıyorsunuz?',
    subtitleEn: "Every client is unique. Let's discuss your specific needs and create a bespoke service package.",
    subtitleTr: 'Her yatırımcı ve her hedef benzersizdir. İhtiyaçlarınızı birlikte değerlendirerek size özel bir hizmet paketi oluşturalım.',
  },
};

/* ──────────────────────────────────────────────────────────────────────── */
/*  REAL ESTATE                                                            */
/* ──────────────────────────────────────────────────────────────────────── */

export interface RealEstatePageContent {
  hero: {
    titleEn: string; titleTr: string;
    titleHighlightEn: string; titleHighlightTr: string;
    subtitleEn: string; subtitleTr: string;
  };
  markets: Array<{
    city: string;
    image: string;
    taglineEn: string; taglineTr: string;
    descEn: string; descTr: string;
    stats: Array<{ value: string; labelEn: string; labelTr: string }>;
    ctaEn: string; ctaTr: string;
    href: string;
  }>;
}

export const realEstateDefaults: RealEstatePageContent = {
  hero: {
    titleEn: 'Premium Property', titleTr: 'Öne Çıkan',
    titleHighlightEn: 'Opportunities', titleHighlightTr: 'Projeler',
    subtitleEn: "Discover high-yield investment properties in the world's most dynamic real estate markets.",
    subtitleTr: 'Dünyanın en dinamik gayrimenkul pazarlarında yüksek getirili yatırım fırsatlarını keşfedin.',
  },
  markets: [
    {
      city: 'London',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200',
      taglineEn: 'INVEST IN', taglineTr: 'YATIRIM YAP',
      descEn: 'One of the most resilient and sought-after property markets globally. Premium developments across central and greater London.',
      descTr: 'Küresel olarak en dayanıklı ve aranan gayrimenkul pazarlarından biri. Merkez ve büyük Londra genelinde premium projeler.',
      stats: [
        { value: '£285K', labelEn: 'Starting Price', labelTr: 'Başlangıç Fiyatı' },
        { value: '15%', labelEn: '5yr Capital Growth', labelTr: '5 Yıllık Değer Artışı' },
      ],
      ctaEn: 'Explore Properties', ctaTr: 'Gayrimenkulleri Keşfet',
      href: '/real-estate/london',
    },
    {
      city: 'Dubai',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200',
      taglineEn: 'INVEST IN', taglineTr: 'YATIRIM YAP',
      descEn: "The world's fastest-growing luxury real estate market. Tax-free investments with world-class developments and exceptional yields.",
      descTr: 'Dünyanın en hızlı büyüyen lüks gayrimenkul pazarı. Dünya standartlarında projeler ve olağanüstü getirilerle vergisiz yatırımlar.',
      stats: [
        { value: '$500K', labelEn: 'Starting Price', labelTr: 'Başlangıç Fiyatı' },
        { value: '20%', labelEn: '5yr Capital Growth', labelTr: '5 Yıllık Değer Artışı' },
      ],
      ctaEn: 'Explore Properties', ctaTr: 'Gayrimenkulleri Keşfet',
      href: '/real-estate/dubai',
    },
  ],
};

/* ──────────────────────────────────────────────────────────────────────── */
/*  RESIDENCY                                                              */
/* ──────────────────────────────────────────────────────────────────────── */

export interface ResidencyPageContent {
  hero: {
    titleEn: string; titleTr: string;
    titleHighlightEn: string; titleHighlightTr: string;
    subtitleEn: string; subtitleTr: string;
  };
  programmes: Array<{
    country: string;
    titleEn: string; titleTr: string;
    investmentEn: string; investmentTr: string;
    timelineEn: string; timelineTr: string;
    benefitsEn: string[];
    benefitsTr: string[];
  }>;
  process: {
    taglineEn: string; taglineTr: string;
    titleEn: string; titleTr: string;
    titleHighlightEn: string; titleHighlightTr: string;
    steps: Array<{
      num: string;
      titleEn: string; titleTr: string;
      descEn: string; descTr: string;
    }>;
  };
  cta: {
    titleEn: string; titleTr: string;
    titleHighlightEn: string; titleHighlightTr: string;
    subtitleEn: string; subtitleTr: string;
  };
}

export const residencyDefaults: ResidencyPageContent = {
  hero: {
    titleEn: 'Your Pathway to Global', titleTr: 'Küresel Oturuma',
    titleHighlightEn: 'Residency', titleHighlightTr: 'Giden Yolunuz',
    subtitleEn: 'Secure residency or citizenship through strategic investments. We guide you through the entire process with expert legal and financial support.',
    subtitleTr: 'Stratejik yatırımlar aracılığıyla oturum veya vatandaşlık seçeneklerine erişim imkânı. Uzman hukuki ve finansal danışmanlık desteğiyle sürecin her aşamasında profesyonel rehberlik sağlıyoruz.',
  },
  programmes: [
    {
      country: 'Portugal',
      titleEn: 'Portugal Golden Visa', titleTr: 'Portekiz Altın Vize',
      investmentEn: 'From €500,000', investmentTr: '€500.000\'den başlayan',
      timelineEn: '6-8 months', timelineTr: '6-8 ay',
      benefitsEn: ['EU residency', 'Schengen travel', 'Path to citizenship', 'Family inclusion'],
      benefitsTr: ['AB oturumu', 'Schengen seyahati', 'Vatandaşlığa giden yol', 'Aile dahil'],
    },
    {
      country: 'Greece',
      titleEn: 'Greece Golden Visa', titleTr: 'Yunanistan Altın Vize',
      investmentEn: 'From €250,000', investmentTr: '€250.000\'den başlayan',
      timelineEn: '3-6 months', timelineTr: '3-6 ay',
      benefitsEn: ['EU residency', 'Schengen travel', 'Low minimum investment', 'No stay requirements'],
      benefitsTr: ['AB oturumu', 'Schengen seyahati', 'Düşük minimum yatırım', 'İkamet zorunluluğu yok'],
    },
    {
      country: 'UAE',
      titleEn: 'UAE Golden Visa', titleTr: 'BAE Altın Vize',
      investmentEn: 'From AED 2,000,000', investmentTr: '2.000.000 AED\'den başlayan',
      timelineEn: '1-3 months', timelineTr: '1-3 ay',
      benefitsEn: ['10-year residency', 'No income tax', 'Business setup', 'Family sponsorship'],
      benefitsTr: ['10 yıllık oturum', 'Gelir vergisi yok', 'Şirket kuruluşu', 'Aile sponsorluğu'],
    },
    {
      country: 'United Kingdom',
      titleEn: 'UK Innovator Visa', titleTr: 'İngiltere İnovatör Vizesi',
      investmentEn: 'From £50,000', investmentTr: '£50.000\'den başlayan',
      timelineEn: '3-6 months', timelineTr: '3-6 ay',
      benefitsEn: [
        'No minimum investment requirement (subject to business plan approval)',
        'Requires an innovative, viable and scalable business idea',
        'Endorsement from an approved UK body is mandatory',
        'Access to the UK business ecosystem',
        'Pathway to permanent residency',
      ],
      benefitsTr: [
        'Minimum yatırım zorunluluğu yok (iş planı onayına tabi)',
        'Yenilikçi, uygulanabilir ve ölçeklenebilir bir iş fikri gerekli',
        'Onaylı bir İngiltere kurumundan onay zorunlu',
        'İngiltere iş ekosistemine erişim',
        'Süresiz oturuma giden yol',
      ],
    },
  ],
  process: {
    taglineEn: 'The Process', taglineTr: 'Süreç',
    titleEn: 'How It ', titleTr: 'Nasıl ',
    titleHighlightEn: 'Works', titleHighlightTr: 'Çalışır',
    steps: [
      { num: '01', titleEn: 'Initial Consultation', titleTr: 'İlk Değerlendirme', descEn: 'We assess your goals, budget and preferred destinations.', descTr: 'Hedeflerinizi, finansal çerçevenizi ve tercih ettiğiniz ülkeleri kapsamlı şekilde analiz ederiz.' },
      { num: '02', titleEn: 'Programme Selection', titleTr: 'Strateji & Program Seçimi', descEn: 'We recommend the most suitable residency programme for you.', descTr: 'Profilinize en uygun oturum programını belirler ve size özel bir yol haritası oluştururuz.' },
      { num: '03', titleEn: 'Application & Investment', titleTr: 'Başvuru & Yatırım Süreci', descEn: 'We handle all documentation and guide you through the investment.', descTr: 'Tüm başvuru ve yatırım süreçlerini titizlikle yönetir, her aşamada size rehberlik ederiz.' },
      { num: '04', titleEn: 'Approval & Beyond', titleTr: 'Onay & Süreklilik', descEn: 'From permit receipt to renewal and citizenship pathways.', descTr: 'Oturum izninin alınmasından yenileme ve vatandaşlık süreçlerine kadar uzun vadeli destek sunarız.' },
    ],
  },
  cta: {
    titleEn: 'Start Your Residency ', titleTr: 'Oturum Yolculuğunuza ',
    titleHighlightEn: 'Journey', titleHighlightTr: 'Başlayın',
    subtitleEn: 'Our immigration and investment experts are ready to guide you through the entire process.',
    subtitleTr: 'Göç ve yatırım uzmanlarımız tüm süreçte size rehberlik etmeye hazır.',
  },
};

/* ──────────────────────────────────────────────────────────────────────── */
/*  BUSINESS EXPANSION                                                     */
/* ──────────────────────────────────────────────────────────────────────── */

export interface BusinessPageContent {
  hero: {
    titleEn: string; titleTr: string;
    titleHighlightEn: string; titleHighlightTr: string;
    subtitleEn: string; subtitleTr: string;
  };
  services: Array<{
    titleEn: string; titleTr: string;
    descEn: string; descTr: string;
    icon: string;
  }>;
  markets: {
    taglineEn: string; taglineTr: string;
    titleEn: string; titleTr: string;
    titleHighlightEn: string; titleHighlightTr: string;
    items: Array<{ name: string; flag: string }>;
  };
  cta: {
    titleEn: string; titleTr: string;
    titleHighlightEn: string; titleHighlightTr: string;
    subtitleEn: string; subtitleTr: string;
  };
}

export const businessDefaults: BusinessPageContent = {
  hero: {
    titleEn: 'Business Expansion &', titleTr: 'İşinizi Doğru Stratejiyle',
    titleHighlightEn: 'International Growth', titleHighlightTr: 'Büyütmeye Hazır mısınız?',
    subtitleEn: 'Strategic advisory services for companies looking to enter new markets, find partners and scale internationally.',
    subtitleTr: 'Yeni pazarlara girmek, partner bulmak ve uluslararası ölçekte büyümek isteyen şirketler için stratejik danışmanlık hizmetleri.',
  },
  services: [
    { titleEn: 'Market Entry Strategy', titleTr: 'Pazar Giriş Stratejisi', descEn: 'Comprehensive market analysis and entry strategies for UK, UAE, EU and US markets.', descTr: 'İngiltere, BAE, AB ve ABD pazarları için kapsamlı analiz ve stratejik giriş planlaması.', icon: 'Globe' },
    { titleEn: 'Partner Matching', titleTr: 'Partner Eşleştirme', descEn: 'We connect you with vetted local partners, distributors and industry contacts.', descTr: 'Doğrulanmış yerel iş ortakları, distribütörler ve sektör bağlantıları ile stratejik bağlantı kurulumu.', icon: 'Users' },
    { titleEn: 'Trade Facilitation', titleTr: 'Ticaret Kolaylaştırma', descEn: 'End-to-end support for international trade, including logistics, compliance and documentation.', descTr: 'Uluslararası ticaret süreçlerinde lojistik, uyumluluk ve dokümantasyon dahil uçtan uca destek.', icon: 'FileCheck' },
    { titleEn: 'Company Formation', titleTr: 'Şirket Kuruluşu', descEn: 'Fast and compliant company setup in the UK, UAE and other key jurisdictions.', descTr: 'İngiltere, BAE ve diğer önemli yargı bölgelerinde hızlı, uyumlu ve sorunsuz şirket kurulumu.', icon: 'Building' },
  ],
  markets: {
    taglineEn: 'Markets We Cover', taglineTr: 'Faaliyet Gösterdiğimiz Pazarlar',
    titleEn: 'Global ', titleTr: 'Küresel ',
    titleHighlightEn: 'Reach', titleHighlightTr: 'Ağımız',
    items: [
      { name: 'United Kingdom', flag: '🇬🇧' },
      { name: 'United Arab Emirates', flag: '🇦🇪' },
      { name: 'European Union', flag: '🇪🇺' },
      { name: 'United States', flag: '🇺🇸' },
      { name: 'Turkey', flag: '🇹🇷' },
      { name: 'Saudi Arabia', flag: '🇸🇦' },
      { name: 'Qatar', flag: '🇶🇦' },
      { name: 'Singapore', flag: '🇸🇬' },
    ],
  },
  cta: {
    titleEn: 'Ready to Grow Your Business ', titleTr: 'İşinizi Doğru Stratejiyle Büyütmeye ',
    titleHighlightEn: 'Globally?', titleHighlightTr: 'Hazır mısınız?',
    subtitleEn: "Let's discuss how we can help you enter new markets and grow your business internationally.",
    subtitleTr: 'Yeni pazarlara açılmanız ve işinizi uluslararası ölçekte büyütmeniz için size nasıl değer katabileceğimizi birlikte değerlendirelim.',
  },
};

/* ──────────────────────────────────────────────────────────────────────── */
/*  INSIGHTS                                                               */
/* ──────────────────────────────────────────────────────────────────────── */

export interface InsightsPageContent {
  hero: {
    titleEn: string; titleTr: string;
    titleHighlightEn: string; titleHighlightTr: string;
    subtitleEn: string; subtitleTr: string;
  };
  featuredArticle: {
    taglineEn: string; taglineTr: string;
  };
  categoriesEn: string[];
  categoriesTr: string[];
  cta: {
    buttonTextEn: string; buttonTextTr: string;
  };
}

export const insightsDefaults: InsightsPageContent = {
  hero: {
    titleEn: 'Market Insights &', titleTr: 'Pazar İçgörüleri &',
    titleHighlightEn: 'Expert Analysis', titleHighlightTr: 'Uzman Analizi',
    subtitleEn: 'Stay informed with our latest research, market reports and expert commentary.',
    subtitleTr: 'Güncel araştırmalarımız, piyasa raporlarımız ve uzman değerlendirmelerimizle bilinçli yatırım kararları alın.',
  },
  featuredArticle: {
    taglineEn: 'Featured Article', taglineTr: 'Öne Çıkan Makale',
  },
  categoriesEn: ['All', 'Market Reports', 'Investment Guides', 'Residency', 'Business'],
  categoriesTr: ['Tümü', 'Pazar Raporları', 'Yatırım Rehberleri', 'Oturum İzni', 'İş Dünyası'],
  cta: {
    buttonTextEn: 'Read Article', buttonTextTr: 'Makaleyi Oku',
  },
};

/* ──────────────────────────────────────────────────────────────────────── */
/*  GUIDES (Yatırım Rehberi)                                               */
/* ──────────────────────────────────────────────────────────────────────── */

export interface GuidesPageContent {
  hero: {
    titleEn: string; titleTr: string;
    titleHighlightEn: string; titleHighlightTr: string;
    subtitleEn: string; subtitleTr: string;
  };
}

export const guidesDefaults: GuidesPageContent = {
  hero: {
    titleEn: 'Investment', titleTr: 'Yatırım',
    titleHighlightEn: 'Guides', titleHighlightTr: 'Rehberi',
    subtitleEn: 'Practical guides and step-by-step resources for international investors.',
    subtitleTr: 'Uluslararası yatırımcılar için pratik rehberler ve adım adım kaynaklar.',
  },
};

/* ──────────────────────────────────────────────────────────────────────── */
/*  CONTACT                                                                */
/* ──────────────────────────────────────────────────────────────────────── */

export interface ContactPageContent {
  hero: {
    taglineEn: string; taglineTr: string;
    titleEn: string; titleTr: string;
    titleHighlightEn: string; titleHighlightTr: string;
    subtitleEn: string; subtitleTr: string;
  };
  form: {
    sectionTitleEn: string; sectionTitleTr: string;
    sectionTitleHighlightEn: string; sectionTitleHighlightTr: string;
    sectionSubtitleEn: string; sectionSubtitleTr: string;
    nameEn: string; nameTr: string;
    emailEn: string; emailTr: string;
    phoneEn: string; phoneTr: string;
    locationEn: string; locationTr: string;
    budgetEn: string; budgetTr: string;
    budgetOptionsEn: string[]; budgetOptionsTr: string[];
    interestEn: string; interestTr: string;
    interestOptionsEn: string[]; interestOptionsTr: string[];
    messageEn: string; messageTr: string;
    submitEn: string; submitTr: string;
    noteEn: string; noteTr: string;
  };
  successMessage: {
    titleEn: string; titleTr: string;
    subtitleEn: string; subtitleTr: string;
  };
  directContact: {
    titleEn: string; titleTr: string;
    phones: string[];
    email: string;
    whatsappCTAEn: string; whatsappCTATr: string;
  };
}

export const contactDefaults: ContactPageContent = {
  hero: {
    taglineEn: 'Get in Touch', taglineTr: 'İletişim',
    titleEn: 'Start Your Investment', titleTr: 'Yatırım Yolculuğunuza',
    titleHighlightEn: 'Journey Today', titleHighlightTr: 'Bugün Başlayın',
    subtitleEn: 'Schedule a complimentary consultation with our expert advisors.',
    subtitleTr: 'Uzman danışmanlarımızla ücretsiz bir görüşme planlayın.',
  },
  form: {
    sectionTitleEn: 'Request a ', sectionTitleTr: 'Danışmanlık ',
    sectionTitleHighlightEn: 'Consultation', sectionTitleHighlightTr: 'Talep Edin',
    sectionSubtitleEn: 'Complete the form below and a member of our advisory team will be in touch shortly.',
    sectionSubtitleTr: 'Aşağıdaki formu doldurun, danışmanlık ekibimizden biri en kısa sürede sizinle iletişime geçecektir.',
    nameEn: 'Full Name', nameTr: 'Ad Soyad',
    emailEn: 'Email Address', emailTr: 'E-posta Adresi',
    phoneEn: 'Phone Number', phoneTr: 'Telefon Numarası',
    locationEn: 'Your Location', locationTr: 'Bulunduğunuz Konum',
    budgetEn: 'Investment Budget', budgetTr: 'Yatırım Bütçesi',
    budgetOptionsEn: ['Under £100,000', '£100,000 – £500,000', '£500,000 – £1,000,000', '£1,000,000 – £5,000,000', '£5,000,000+'],
    budgetOptionsTr: ['£100.000 altı', '£100.000 – £500.000', '£500.000 – £1.000.000', '£1.000.000 – £5.000.000', '£5.000.000+'],
    interestEn: 'Area of Interest', interestTr: 'İlgi Alanı',
    interestOptionsEn: ['Real Estate – London', 'Real Estate – Dubai', 'Residency by Investment', 'Business Expansion', 'Multiple Services'],
    interestOptionsTr: ['Gayrimenkul – Londra', 'Gayrimenkul – Dubai', 'Yatırım ile Oturum', 'Uluslararası İş Geliştirme', 'Birden Fazla Hizmet'],
    messageEn: 'Tell us about your investment goals', messageTr: 'Yatırım hedeflerinizi anlatın',
    submitEn: 'Request Consultation', submitTr: 'Danışmanlık Talep Et',
    noteEn: 'We typically respond within 24 hours. Your information is kept strictly confidential.',
    noteTr: 'Genellikle 24 saat içinde yanıt veriyoruz. Bilgileriniz kesinlikle gizli tutulur.',
  },
  successMessage: {
    titleEn: 'Thank You', titleTr: 'Teşekkürler',
    subtitleEn: "We've received your enquiry and will be in touch within 24 hours.",
    subtitleTr: 'Talebinizi aldık, 24 saat içinde sizinle iletişime geçeceğiz.',
  },
  directContact: {
    titleEn: 'Direct Contact', titleTr: 'Doğrudan İletişim',
    phones: ['+44 7491 510941', '+44 7769 212877'],
    email: 'info@innovest.uk',
    whatsappCTAEn: 'Send a message', whatsappCTATr: 'Mesaj gönderin',
  },
};

/* ──────────────────────────────────────────────────────────────────────── */
/*  FOOTER                                                                 */
/* ──────────────────────────────────────────────────────────────────────── */

export interface FooterContent {
  brand: {
    descriptionEn: string; descriptionTr: string;
    logo: string;
  };
  quickLinks: Array<{ labelEn: string; labelTr: string; href: string }>;
  serviceLinks: Array<{ labelEn: string; labelTr: string; href: string }>;
  contactInfo: {
    titleEn: string; titleTr: string;
    addressEn: string; addressTr: string;
    phones: string[];
    email: string;
  };
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    linkedin: string;
  };
  legal: {
    copyrightEn: string; copyrightTr: string;
    privacyEn: string; privacyTr: string;
    termsEn: string; termsTr: string;
    disclaimerEn: string; disclaimerTr: string;
  };
}

export const footerDefaults: FooterContent = {
  brand: {
    descriptionEn: 'International investment advisory specialising in real estate, residency and business expansion across global markets.',
    descriptionTr: 'Gayrimenkul, oturum ve uluslararası iş geliştirme alanlarında uzmanlaşan küresel yatırım danışmanlığı.',
    logo: '/logo16.png',
  },
  quickLinks: [
    { labelEn: 'Home', labelTr: 'Ana Sayfa', href: '/' },
    { labelEn: 'About Us', labelTr: 'Hakkımızda', href: '/about' },
    { labelEn: 'Services', labelTr: 'Hizmetler', href: '/services' },
    { labelEn: 'Insights', labelTr: 'İçgörüler', href: '/insights' },
    { labelEn: 'Contact', labelTr: 'İletişim', href: '/contact' },
  ],
  serviceLinks: [
    { labelEn: 'Real Estate Investment', labelTr: 'Gayrimenkul Yatırımı', href: '/real-estate' },
    { labelEn: 'London', labelTr: 'Londra', href: '/real-estate/london' },
    { labelEn: 'Dubai', labelTr: 'Dubai', href: '/real-estate/dubai' },
    { labelEn: 'Residency by Investment', labelTr: 'Yatırım ile Oturum', href: '/residency' },
    { labelEn: 'Business Expansion', labelTr: 'İş Geliştirme', href: '/business-expansion' },
  ],
  contactInfo: {
    titleEn: 'Contact Info', titleTr: 'İletişim Bilgileri',
    addressEn: 'Berkeley Square House, 2nd Floor, Berkeley Square, Mayfair, London W1J 6BE, UK',
    addressTr: 'Berkeley Square House, 2. Kat, Berkeley Square, Mayfair, Londra W1J 6BE, Birleşik Krallık',
    phones: ['+44 7491 510941', '+44 7769 212877', '+971 54 755 0101', '+90 531 420 0331'],
    email: 'info@innovest.uk',
  },
  social: {
    instagram: 'https://www.instagram.com/innovest_eng/',
    facebook: 'https://www.facebook.com/people/I-N-N-O-V-E-S-T/61552674123444/',
    youtube: 'https://www.youtube.com/@Innovestproperties/videos',
    linkedin: 'https://www.linkedin.com/company/innovest-capital/posts/?feedView=all',
  },
  legal: {
    copyrightEn: '© 2026 Innovest. All rights reserved.',
    copyrightTr: '© 2026 Innovest. Tüm hakları saklıdır.',
    privacyEn: 'Privacy Policy', privacyTr: 'Gizlilik Politikası',
    termsEn: 'Terms of Service', termsTr: 'Kullanım Koşulları',
    disclaimerEn: 'Disclaimer', disclaimerTr: 'Sorumluluk Reddi',
  },
};

/**
 * Map slug → defaults. Each editable page registers its default shape here so
 * the admin and public APIs can fall back when no override exists.
 */
export const pageDefaults: Record<PageSlug, unknown> = {
  home: homeDefaults,
  about: aboutDefaults,
  services: servicesDefaults,
  'real-estate': realEstateDefaults,
  residency: residencyDefaults,
  'business-expansion': businessDefaults,
  insights: insightsDefaults,
  guides: guidesDefaults,
  contact: contactDefaults,
  footer: footerDefaults,
};

export function getPageDefaults<T = unknown>(slug: PageSlug): T {
  return pageDefaults[slug] as T;
}
