export interface Article {
  id: number;
  slug: string;
  title: string;
  titleTr: string;
  excerpt: string;
  excerptTr: string;
  bodyEn: string[];
  bodyTr: string[];
  category: string;
  date: string;
  dateTr: string;
  readTime: string;
  readTimeTr: string;
  image: string;
  featured: boolean;
}

export const articles: Article[] = [
  {
    id: 1,
    slug: 'london-property-market-2026',
    title: 'London Property Market Outlook 2026: What Investors Need to Know',
    titleTr: 'Londra Gayrimenkul Piyasası 2026: Yatırımcıların Bilmesi Gerekenler',
    excerpt:
      'An in-depth analysis of the London property market, including emerging hotspots, price forecasts and the best investment strategies for the year ahead.',
    excerptTr:
      'Londra gayrimenkul piyasasının derinlemesine analizi: yükselen bölgeler, fiyat tahminleri ve önümüzdeki yıl için en iyi yatırım stratejileri.',
    bodyEn: [
      'London continues to stand as one of the most resilient and sought-after real estate markets in the world. Despite macroeconomic headwinds and interest rate cycles, the city\'s fundamental drivers — scarcity of land, global demand and institutional capital flows — remain firmly in place as we enter 2026.',
      'Prime Central London, encompassing neighbourhoods such as Mayfair, Knightsbridge and Chelsea, has demonstrated notable price stability. Overseas buyers benefit from a more competitive sterling exchange rate, while domestic demand in commuter zones like Stratford, Battersea and London Bridge is being propelled by ongoing infrastructure investment and regeneration schemes.',
      'Zone 2 and Zone 3 boroughs are increasingly capturing attention from build-to-rent developers and mid-market investors. Areas such as Hackney, Peckham and Walthamstow offer gross rental yields between 4.5% and 6.2%, outpacing the traditionally dominant prime postcodes on a yield basis. Population growth projections for Greater London — estimated at 9.6 million by 2030 — underpin this demand.',
      'For investors considering entry in 2026, our analysis suggests a focus on mixed-use development opportunities and newly completed builds in regeneration corridors. Off-plan acquisitions in Queen Elizabeth Olympic Park and the Silvertown Quays development continue to offer 5–7% projected capital appreciation over a five-year hold. Currency hedging strategies should also be considered for non-GBP investors to protect returns against sterling volatility.',
    ],
    bodyTr: [
      'Londra, dünyanın en dayanıklı ve en çok aranan gayrimenkul piyasalarından biri olmayı sürdürmektedir. Makroekonomik olumsuzluklara ve faiz oranı döngülerine karşın, şehrin temel dinamikleri — arazi kıtlığı, küresel talep ve kurumsal sermaye akışları — 2026\'ya girerken güçlü biçimde yerli yerinde durmaktadır.',
      'Mayfair, Knightsbridge ve Chelsea gibi mahalleleri kapsayan Prime Central Londra bölgesi, kayda değer fiyat istikrarı sergilemiştir. Yurt dışından gelen alıcılar daha rekabetçi sterlin kur avantajından yararlanırken, Stratford, Battersea ve London Bridge gibi banliyö bölgelerindeki yerel talep, devam eden altyapı yatırımları ve kentsel dönüşüm projeleri tarafından desteklenmektedir.',
      '2. ve 3. Bölge ilçeleri, kiralık konut geliştiricileri ile orta piyasa yatırımcılarının giderek daha fazla ilgisini çekmektedir. Hackney, Peckham ve Walthamstow gibi bölgeler %4,5 ile %6,2 arasında brüt kira getirisi sunarak geleneksel prime posta kodlarını ya getiri bazında geçmektedir. Büyük Londra için öngörülen nüfus artışının 2030 yılına kadar 9,6 milyona ulaşacağı tahminleri bu talebi desteklemektedir.',
      '2026\'da piyasaya girmeyi düşünen yatırımcılar için analizimiz; kentsel dönüşüm koridorlarındaki karma kullanımlı geliştirme fırsatlarına ve yeni tamamlanan yapılara odaklanılmasını önermektedir. Queen Elizabeth Olympic Park ve Silvertown Quays geliştirmesindeki plan öncesi alımlar, beş yıllık bir elde tutma sürecinde %5-7 öngörülen sermaye değer artışı sunmaya devam etmektedir. GBP dışındaki para birimlerindeki yatırımcıların, sterlin oynaklığına karşı getirilerini korumak amacıyla kur riskinden korunma stratejilerini de değerlendirmeleri önerilmektedir.',
    ],
    category: 'Market Reports',
    date: '15 March 2026',
    dateTr: '15 Mart 2026',
    readTime: '8 min read',
    readTimeTr: '8 dk okuma',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1600',
    featured: true,
  },
  {
    id: 2,
    slug: 'portugal-golden-visa-2026',
    title: 'Complete Guide to Portugal Golden Visa 2026',
    titleTr: 'Portekiz Altın Vize 2026: Kapsamlı Rehber',
    excerpt:
      'Everything you need to know about the Portugal Golden Visa programme, including the latest regulatory changes and investment options.',
    excerptTr:
      'Portekiz Altın Vize programı hakkında bilmeniz gereken her şey: son mevzuat değişiklikleri ve yatırım seçenekleri dahil.',
    bodyEn: [
      'Portugal\'s Golden Visa programme has undergone significant reform since 2024, shifting focus from direct real estate purchases to venture capital fund investments, scientific research and cultural heritage projects. As of 2026, the minimum qualifying investment through approved venture capital funds stands at €500,000, while job creation routes remain available from €500,000.',
      'The five-year pathway to permanent residency and Portuguese citizenship remains one of the most attractive visa-by-investment options in the European Union. Holders enjoy the right to live, work and study across all 27 EU member states, alongside access to Portugal\'s comparatively low cost of living, excellent healthcare and internationally regarded school system.',
      'Investors choosing the fund route should conduct rigorous due diligence on fund track records, underlying portfolio assets and exit timelines. Approved funds typically invest in Portuguese tourism infrastructure, renewable energy and technology sectors — all areas experiencing substantial growth. Annual reporting requirements and CMVM oversight provide a layer of regulatory protection.',
      'Processing timelines currently average 18–24 months from complete application submission to visa issuance. Applicants must spend a minimum of seven days in Portugal during the first year and fourteen days in subsequent two-year periods. Our team advises structuring the application alongside a tax residency analysis to determine whether Non-Habitual Resident (NHR) status or the new IFICI regime offers greater advantage to your specific financial profile.',
    ],
    bodyTr: [
      'Portekiz Altın Vize programı, 2024\'ten bu yana köklü bir reforma tabi tutularak doğrudan gayrimenkul alımlarından girişim sermayesi fonu yatırımlarına, bilimsel araştırmaya ve kültürel miras projelerine doğru bir eksen kayması yaşamıştır. 2026 itibarıyla onaylı girişim sermayesi fonları aracılığıyla gerçekleştirilen minimum uygun yatırım tutarı 500.000 €\'dur; istihdam yaratma güzergahları ise 500.000 €\'dan itibaren geçerliliğini korumaktadır.',
      'Kalıcı oturuma ve Portekiz vatandaşlığına giden beş yıllık süreç, Avrupa Birliği\'ndeki en cazip yatırım yoluyla vize seçeneklerinden biri olmayı sürdürmektedir. Vize sahipleri, AB\'nin 27 üye devletinde yaşama, çalışma ve öğrenim görme hakkının yanı sıra Portekiz\'in görece düşük yaşam maliyeti, mükemmel sağlık hizmetleri ve uluslararası alanda tanınan eğitim sisteminden yararlanmaktadır.',
      'Fon güzergahını tercih eden yatırımcılar, fonların geçmiş performansı, portföyündeki varlıklar ve çıkış zaman çizelgeleri konusunda titiz bir durum tespiti (due diligence) süreci yürütmelidir. Onaylı fonlar genellikle Portekiz\'in turizm altyapısı, yenilenebilir enerji ve teknoloji sektörlerine yatırım yapmaktadır; bu sektörlerin tamamı kayda değer bir büyüme yaşamaktadır. Yıllık raporlama gereklilikleri ve CMVM denetimi ek bir düzenleyici koruma katmanı sağlamaktadır.',
      'Mevcut işlem süreleri, eksiksiz başvuru sunumundan vize verilmesine kadar ortalama 18–24 ay olarak gerçekleşmektedir. Başvuru sahipleri, ilk yıl Portekiz\'de en az yedi gün, sonraki iki yıllık dönemlerde ise on dört gün geçirmelidir. Ekibimiz, başvurunun Alışılmadık Yerleşik (NHR) statüsünün mi yoksa yeni IFICI rejiminin mi sizin özel finansal profilinize daha fazla avantaj sağladığını belirlemek amacıyla bir vergi mukimliği analizi eşliğinde yapılandırılmasını tavsiye etmektedir.',
    ],
    category: 'Residency',
    date: '10 March 2026',
    dateTr: '10 Mart 2026',
    readTime: '12 min read',
    readTimeTr: '12 dk okuma',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1600',
    featured: false,
  },
  {
    id: 3,
    slug: 'dubai-vs-london-2026',
    title: 'Dubai vs London: Where Should You Invest in 2026?',
    titleTr: "Dubai vs Londra: 2026'da Nereye Yatırım Yapmalısınız?",
    excerpt:
      "A comparative analysis of two of the world's most popular investment destinations, examining yields, capital growth and lifestyle factors.",
    excerptTr:
      'Dünyanın en popüler iki yatırım destinasyonunun karşılaştırmalı analizi: getiri, sermaye büyümesi ve yaşam tarzı faktörleri.',
    bodyEn: [
      'Dubai and London represent fundamentally different investment propositions, each with a compelling set of benefits for global investors. Choosing between them — or allocating to both — depends on your risk appetite, tax domicile, hold horizon and personal lifestyle priorities.',
      'Dubai continues to attract high-net-worth buyers with its zero income tax environment, strong rental yields in districts like Business Bay, Downtown and Dubai Marina (averaging 6–8%), and rapid population growth driven by business migration and tourism. Off-plan projects from Emaar, DAMAC and Sobha offer developer payment plans that reduce capital requirement at acquisition, while Expo City and the Dubai 2040 Urban Master Plan signal sustained long-term urban development.',
      'London, by contrast, offers institutional depth, legal certainty and an established secondary market that Dubai is still maturing. Price growth in prime London has historically tracked 4–6% per annum over a ten-year horizon. The city\'s status as a global financial centre, combined with sterling-denominated assets, appeals to investors seeking a defensive, liquid position within their international portfolio.',
      'Our recommendation for 2026: investors targeting cash flow and short-to-medium-term capital appreciation should weight towards Dubai; those seeking stability, heritage value and long-term wealth preservation should consider London prime. A blended portfolio — 60% London, 40% Dubai — has historically offered an optimised risk-adjusted return profile. Currency diversification between GBP and AED also provides a natural hedge for investors based in emerging market economies.',
    ],
    bodyTr: [
      'Dubai ve Londra, küresel yatırımcılar için her biri cazip avantajlar barındıran, temelden farklı yatırım teklifleri sunmaktadır. İkisi arasında seçim yapmak — ya da her ikisine birden yatırım yapmak — risk iştahınıza, vergi ikametinize, elde tutma sürenize ve kişisel yaşam tarzı önceliklerinize bağlıdır.',
      'Dubai; sıfır gelir vergisi ortamı, Business Bay, Downtown ve Dubai Marina gibi bölgelerdeki güçlü kira getirileri (ortalama %6–8) ve iş göçü ile turizm kaynaklı hızlı nüfus artışıyla yüksek servet sahibi alıcıları çekmeyi sürdürmektedir. Emaar, DAMAC ve Sobha\'nın plan öncesi projeleri, edinme aşamasında sermaye gereksinimini azaltan ödeme planları sunarken, Expo City ve Dubai 2040 Kentsel Master Planı uzun vadeli kentsel gelişimi müjdelemektedir.',
      'Londra ise buna karşın kurumsal derinlik, hukuki kesinlik ve Dubai\'nin henüz olgunlaşmakta olduğu köklü bir ikincil piyasa sunmaktadır. Prime Londra\'daki fiyat artışı, on yıllık bir ufukta tarihsel olarak yıllık %4–6 seyretmiştir. Şehrin küresel finans merkezi statüsü, sterlin cinsinden varlıklarla birleşince, uluslararası portföyleri içinde savunmacı ve likit bir pozisyon arayan yatırımcılara hitap etmektedir.',
      '2026 için tavsiyemiz: nakit akışı ve kısa-orta vadeli sermaye değer artışı hedefleyen yatırımcılar Dubai\'ye ağırlık vermelidir; istikrar, miras değeri ve uzun vadeli servet koruma arayanlar ise Londra prime\'ı değerlendirmelidir. Karma bir portföy — %60 Londra, %40 Dubai — tarihsel olarak optimize edilmiş bir riske göre düzeltilmiş getiri profili sunmuştur. GBP ile AED arasındaki kur çeşitlendirmesi aynı zamanda gelişmekte olan piyasa ekonomilerindeki yatırımcılar için doğal bir koruma araçı işlevi görmektedir.',
    ],
    category: 'Investment Guides',
    date: '5 March 2026',
    dateTr: '5 Mart 2026',
    readTime: '10 min read',
    readTimeTr: '10 dk okuma',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600',
    featured: false,
  },
  {
    id: 4,
    slug: 'setting-up-business-uae',
    title: 'Setting Up a Business in the UAE: A Comprehensive Guide',
    titleTr: "BAE'de İş Kurmak: Kapsamlı Rehber",
    excerpt:
      "From free zones to mainland companies, we break down everything you need to know about establishing your business presence in the UAE.",
    excerptTr:
      "Serbest bölgelerden ana kara şirketlerine kadar, BAE'de iş varlığınızı oluşturmak hakkında bilmeniz gereken her şey.",
    bodyEn: [
      'The UAE has positioned itself as the preferred business hub for entrepreneurs and multinational corporations seeking a gateway to Middle East, African and South Asian markets. With over 45 free zones offering 100% foreign ownership, zero corporate tax on qualifying income, and streamlined registration processes, the country consistently ranks among the top global destinations for business formation.',
      'Free zone incorporation suits businesses focused on international trade, digital services and professional consultancy. Each major free zone — DIFC, ADGM, Dubai Multi Commodities Centre, Jebel Ali Free Zone — carries its own regulatory framework and sector-specific licensing. DIFC and ADGM, in particular, operate under English common law and have their own independent courts, making them ideal for financial services, asset management and legal entities with international counterparties.',
      'Mainland business licences, issued through the Department of Economy and Tourism (DET) or respective emirate authorities, are required for businesses serving the local UAE market directly. Since the 2021 Companies Law reform, foreign nationals may now own 100% of mainland companies across most sectors, removing the historic need for a local sponsor in many industries. Specific sectors including media, oil and gas and certain professional services retain restrictions.',
      'Practical considerations include selecting a bank for corporate accounts — a process that can take 4–8 weeks and requires robust KYC documentation — and obtaining the appropriate visa quota for employees. Business activity classification, trade name registration and municipality approvals add further layers to the setup process. Innovest Capital works alongside licensed UAE business consultants and legal advisors to guide clients from entity selection through to first invoice.',
    ],
    bodyTr: [
      "BAE, Orta Doğu, Afrika ve Güney Asya pazarlarına açılan bir kapı arayan girişimciler ve çok uluslu şirketler için tercih edilen iş merkezi konumuna gelmiştir. %100 yabancı mülkiyetine izin veren 45'ten fazla serbest bölgesi, uygun gelirler üzerinden sıfır kurumlar vergisi ve kolaylaştırılmış kayıt süreçleriyle ülke, iş kurma açısından sürekli olarak küresel en iyi destinasyonlar arasında yer almaktadır.",
      "Serbest bölge kuruluşu, uluslararası ticaret, dijital hizmetler ve profesyonel danışmanlık odaklı işletmeler için uygundur. DIFC, ADGM, Dubai Emtia Çok Ticaret Merkezi, Jebel Ali Serbest Bölgesi gibi başlıca serbest bölgelerin her biri kendine özgü düzenleyici çerçeve ve sektöre özel lisanslama düzenlemelerine sahiptir. Özellikle DIFC ve ADGM, İngiliz ortak hukuku çerçevesinde faaliyet göstermekte ve bağımsız mahkemelere sahip bulunmakta; bu durum onları uluslararası karşı tarafları bulunan finansal hizmetler, varlık yönetimi ve hukuki kuruluşlar için ideal kılmaktadır.",
      "Ekonomi ve Turizm Departmanı (DEB) veya ilgili emirlik makamları tarafından verilen ana kara ticaret lisansları, yerel BAE pazarına doğrudan hizmet eden işletmeler için zorunludur. 2021 Şirketler Kanunu reformundan bu yana yabancı uyruklu kişiler, pek çok sektörde ana kara şirketlerinin %100'üne sahip olabilmekte; böylece birçok sektörde yerli sponsor zorunluluğu tarihten silinmiş olmaktadır. Medya, petrol ve gaz ile belirli profesyonel hizmetler de dahil olmak üzere bazı sektörlerde kısıtlamalar sürmektedir.",
      "Pratik hususlar arasında şirket hesabı için banka seçimi yer almaktadır; bu süreç 4–8 hafta sürebilmekte ve kapsamlı KYC (müşteri kimlik doğrulama) belgesi gerektirmektedir. Çalışanlar için uygun vize kotasının alınması da bu sürecin bir parçasıdır. İş faaliyet sınıflandırması, ticaret adı tescili ve belediye onayları kurulum sürecine ek aşamalar katmaktadır. Innovest Capital, lisanslı BAE iş danışmanları ve hukuk müşavirleriyle iş birliği yaparak müşterilerine tüzel kişilik seçiminden ilk faturaya kadar her aşamada rehberlik etmektedir.",
    ],
    category: 'Business',
    date: '28 February 2026',
    dateTr: '28 Şubat 2026',
    readTime: '15 min read',
    readTimeTr: '15 dk okuma',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600',
    featured: false,
  },
  {
    id: 5,
    slug: 'understanding-rental-yields',
    title: "Understanding Rental Yields: A Beginner's Guide",
    titleTr: 'Kira Getirilerini Anlamak: Başlangıç Rehberi',
    excerpt:
      'Learn how to calculate, compare and maximise rental yields on your property investments across different markets.',
    excerptTr:
      'Farklı pazarlardaki gayrimenkul yatırımlarınızda kira getirilerini hesaplamayı, karşılaştırmayı ve maksimize etmeyi öğrenin.',
    bodyEn: [
      'Rental yield is one of the most fundamental metrics in property investment analysis, yet it is frequently misapplied. Understanding the distinction between gross yield and net yield — and knowing which one to reference in a given context — is essential before committing capital to any real estate market.',
      'Gross rental yield is calculated by dividing annual rental income by the property\'s purchase price and expressing the result as a percentage. For example, a property purchased for £400,000 generating £20,000 per year in rent delivers a gross yield of 5%. While useful as a quick comparison tool, gross yield ignores the true costs of ownership: service charges, management fees, maintenance reserves, void periods and financing costs.',
      'Net yield accounts for these deductions and provides a more accurate picture of investment performance. Applying a typical cost burden of 20–25% to the gross figure, a 5% gross yield often translates to a net yield of 3.7–4%. For leveraged investors, the net yield after mortgage payments — the cash-on-cash return — is the most relevant metric for day-to-day cashflow analysis.',
      'Markets worth monitoring in 2026 for strong net yields include Dubai (5–7% net in mid-market districts), Birmingham and Manchester in the UK (4–5.5% net), and Lisbon\'s suburban zone (4–5% net). Investors should model at least a 5% vacancy allowance and benchmark property management costs locally before finalising projections. Rising rental demand globally supports yield maintenance even in softening capital value environments.',
    ],
    bodyTr: [
      "Kira getirisi, gayrimenkul yatırımı analizinin en temel ölçütlerinden biridir; buna karşın çoğunlukla yanlış uygulanmaktadır. Brüt getiri ile net getiri arasındaki farkı anlamak — ve belirli bir bağlamda hangisine başvurulacağını bilmek — herhangi bir gayrimenkul piyasasına sermaye taahhüt etmeden önce son derece önemlidir.",
      "Brüt kira getirisi, yıllık kira gelirinin mülkün satın alma fiyatına bölünmesi ve sonucun yüzde olarak ifade edilmesiyle hesaplanmaktadır. Örneğin, 400.000 £'a satın alınan ve yılda 20.000 £ kira geliri sağlayan bir mülk, %5 brüt getiri sunmaktadır. Hızlı bir karşılaştırma aracı olarak faydalı olsa da brüt getiri, mülkiyetin gerçek maliyetlerini göz ardı eder: aidat, yönetim ücreti, bakım rezervleri, boşluk dönemleri ve finansman maliyetleri.",
      "Net getiri bu kesintileri dikkate alarak yatırım performansının daha doğru bir görüntüsünü sunar. Brüt rakama tipik olarak %20–25'lik bir maliyet yükü uygulandığında, %5'lik brüt getiri çoğunlukla %3,7–4'lük bir net getiriye dönüşmektedir. Kaldıraçlı yatırımcılar için mortgage ödemelerinden sonraki net getiri — yani nakit-nakit üzeri getiri — günlük nakit akışı analizi açısından en ilgili ölçüttür.",
      "2026 yılında güçlü net getiri için takip edilmeye değer piyasalar arasında Dubai (%5–7 net, orta piyasa bölgeleri), İngiltere'de Birmingham ve Manchester (%4–5,5 net) ve Lizbon'un banliyöler bölgesi (%4–5 net) yer almaktadır. Yatırımcılar, projeksiyonları kesinleştirmeden önce en az %5'lik boşluk payı modellemeli ve gayrimenkul yönetim maliyetlerini yerel rayice göre kıyaslamalıdır. Küresel ölçekte artan kira talebi, değer yumuşaması yaşanan piyasalarda bile getiri sürdürülebilirliğini desteklemektedir.",
    ],
    category: 'Investment Guides',
    date: '20 February 2026',
    dateTr: '20 Şubat 2026',
    readTime: '7 min read',
    readTimeTr: '7 dk okuma',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600',
    featured: false,
  },
  {
    id: 6,
    slug: 'global-residency-programmes',
    title: 'Global Residency Programmes Compared: Which Is Right For You?',
    titleTr: 'Küresel Oturum Programları Karşılaştırması: Hangisi Size Uygun?',
    excerpt:
      'We compare the leading residency-by-investment programmes across Portugal, Greece, UAE and the UK to help you make the right choice.',
    excerptTr:
      "Portekiz, Yunanistan, BAE ve İngiltere'deki önde gelen yatırım yoluyla oturum programlarını karşılaştırarak doğru seçimi yapmanıza yardımcı oluyoruz.",
    bodyEn: [
      'The global landscape for residency-by-investment has shifted considerably over the past three years. Some programmes that offered real estate routes have closed or significantly restricted property acquisition pathways, while new frameworks have emerged — most notably the UAE\'s long-term visa system and updates to existing European golden visa tiers.',
      'Portugal\'s Golden Visa now primarily routes through fund investments and scientific contributions rather than real estate, yet it retains strong appeal: EU membership benefits, a favourable tax regime under NHR/IFICI, and English-friendly services. Greece, where the minimum investment for real estate in prime areas rose to €800,000 in 2024, remains competitive for property-backed residency with a clear five-year pathway to citizenship.',
      'The UAE Investor Visa (10-year) and the Golden Visa (10-year) provide long-term residency without a citizenship pathway, but offer unmatched tax advantages, zero personal income tax and full repatriation of capital. For investors whose primary goal is tax optimisation rather than passport access, the UAE route is often the most financially efficient outcome.',
      'The UK Innovator Founder Visa and Global Talent Visa offer routes for entrepreneurs and high-value professionals but do not directly map to passive investment. For family reunification, lifestyle access to Europe and EU passport acquisition, Portugal and Greece remain the most streamlined solutions. Selection ultimately depends on whether your priority is EU citizenship, tax optimisation, business access, or residency stability — and Innovest Capital advisors conduct a personalised programme audit for each client.',
    ],
    bodyTr: [
      "Yatırım yoluyla oturma izni için küresel tablo son üç yılda önemli ölçüde değişmiştir. Gayrimenkul güzergahları sunan bazı programlar kapanmış ya da mülk edinim yollarını önemli ölçüde kısıtlamıştır; öte yandan BAE'nin uzun vadeli vize sistemi ve mevcut Avrupa altın vize kademelerine yapılan güncellemeler başta olmak üzere yeni çerçeveler ortaya çıkmıştır.",
      "Portekiz Altın Vizesi artık ağırlıklı olarak fon yatırımları ve bilimsel katkılar aracılığıyla sunulmaktadır; bununla birlikte cazibesini korumaktadır: AB üyeliği avantajları, NHR/IFICI kapsamında elverişli vergi rejimi ve İngilizce hizmetler. 2024'te prime bölgelerdeki gayrimenkul için asgari yatırımın 800.000 €'ya yükseltildiği Yunanistan, beş yıllık vatandaşlık güzergahıyla mülk destekli oturma izni konusunda rekabetini sürdürmektedir.",
      "BAE Yatırımcı Vizesi (10 yıl) ve Altın Vize (10 yıl), vatandaşlık yolu sunmadan uzun vadeli oturma izni sağlamakla birlikte eşsiz vergi avantajları, sıfır gelir vergisi ve sermayenin tam transferine olanak tanımaktadır. Birincil amacı pasaport edinmek değil vergi optimizasyonu olan yatırımcılar için BAE güzergahı çoğunlukla en mali açıdan verimli sonucu vermektedir.",
      "İngiltere Innovator Kurucu Vizesi ve Küresel Yetenek Vizesi, girişimciler ve yüksek değerli profesyoneller için güzergahlar sunmakla birlikte pasif yatırımla doğrudan örtüşmemektedir. Aile birleşimi, Avrupa'ya yaşam tarzı erişimi ve AB pasaportu edinimi açısından Portekiz ve Yunanistan en kolay çözümler olmayı sürdürmektedir. Seçim, önceliğinizin AB vatandaşlığı mı, vergi optimizasyonu mu, ticari erişim mi yoksa oturma istikrarı mı olduğuna bağlıdır; Innovest Capital danışmanları her müşteri için kişiselleştirilmiş bir program denetimi gerçekleştirmektedir.",
    ],
    category: 'Residency',
    date: '15 February 2026',
    dateTr: '15 Şubat 2026',
    readTime: '11 min read',
    readTimeTr: '11 dk okuma',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600',
    featured: false,
  },
  {
    id: 7,
    slug: 'uk-leasehold-vs-freehold',
    title: 'UK Leasehold vs Freehold: What Every Investor Needs to Know',
    titleTr: "İngiltere'de Leasehold ve Freehold: Yatırımcıların Bilmesi Gerekenler",
    excerpt:
      'Understand the fundamental differences between leasehold and freehold ownership in the UK property market, and what it means for your investment.',
    excerptTr:
      "İngiltere gayrimenkul piyasasında leasehold ve freehold mülkiyet arasındaki temel farkları ve yatırımınız için ne anlama geldiğini anlayın.",
    bodyEn: [
      'Understanding the distinction between leasehold and freehold is foundational to property investment in the United Kingdom. Unlike most other countries, England and Wales operate under a dual-title system where purchasing a flat typically confers leasehold rights rather than outright ownership of the land.',
      'A freehold title gives the owner absolute ownership of both the property and the land it sits on, in perpetuity. This is the norm for houses, detached and semi-detached properties. A leasehold title grants the right to occupy and use a property for a fixed period — typically 99, 125 or 999 years — after which ownership legally reverts to the freeholder, unless the lease is extended.',
      'Lease length critically affects both property value and mortgageability. Most lenders will not advance funds on leases with fewer than 70 years remaining, and lease lengths below 80 years trigger the "marriage value" calculation under existing legislation, making extension costs substantially higher. Investors should always verify remaining lease length as part of due diligence, and budget for lease extension costs where lengths approach 85 years.',
      'The Leasehold Reform (Ground Rent) Act 2022 prohibited new residential leases from charging ground rent above a "peppercorn" (effectively zero) and the Leasehold and Freehold Reform Act 2024 has extended protections significantly. International investors should note that service charges in premium London buildings can range from £5,000 to £25,000+ per year, a factor that significantly impacts net yield calculations and must be disclosed in any prospectus.',
    ],
    bodyTr: [
      "Leasehold ve freehold arasındaki ayrımı kavramak, Birleşik Krallık'ta gayrimenkul yatırımının temel bir gerekliliğidir. Diğer pek çok ülkeden farklı olarak İngiltere ve Galler, çift başlıklı bir mülkiyet sistemi üzerine inşa edilmiştir: bu sistemde daire satın almak genellikle arazinin doğrudan mülkiyeti yerine leasehold hakları sağlamaktadır.",
      "Freehold tapu, hem mülkün hem de üzerinde durduğu arazinin sonsuz süreyle mutlak mülkiyetini sahibe tanır. Bu durum, müstakil ve yarı-müstakil mülkler olan evler için geçerli olan standarttır. Leasehold tapu ise belirli bir süre — genellikle 99, 125 veya 999 yıl — boyunca bir mülkü işgal etme ve kullanma hakkını dönüm hakkı sahiplerine devretmeyi öngörür; bu süre dolduğunda mülkiyet, kira sözleşmesi uzatılmadığı takdirde hukuki olarak freeholder'a geri döner.",
      "Kira sözleşmesi süresi, hem mülk değerini hem de mortgage alınabilirliği kritik ölçüde etkiler. Çoğu borç veren, kalan süresi 70 yılın altında olan kiralık mülkler üzerinden kredi açmayı reddeder; mevcut mevzuat uyarınca 80 yılın altına düşen süreler 'evlilik değeri' hesaplamasını tetikleyerek uzatma maliyetlerini önemli ölçüde artırır. Yatırımcılar, durum tespiti kapsamında kalan kira süresini her zaman kontrol etmeli ve sürelerin 85 yıla yaklaştığı durumlarda kira uzatma maliyetleri için bütçe ayırmalıdır.",
      "2022 tarihli Leasehold Reform (Ground Rent) Kanunu, yeni konut sözleşmelerinde toprağa ilişkin kira bedelini 'biber tanesi' değerinin (fiilen sıfır) üzerinde belirlemeyi yasaklamış; 2024 tarihli Leasehold ve Freehold Reform Kanunu ise koruyucu düzenlemeleri önemli ölçüde genişletmiştir. Uluslararası yatırımcılar, Londra'nın premium binalarında yıllık hizmet bedellerinin 5.000 ile 25.000 £'ı aşabileceğini göz önünde bulundurmalıdır; bu unsur net getiri hesaplamalarını ciddi biçimde etkiler ve herhangi bir prospektüste açıklanması zorunludur.",
    ],
    category: 'Investment Guides',
    date: '8 February 2026',
    dateTr: '8 Şubat 2026',
    readTime: '9 min read',
    readTimeTr: '9 dk okuma',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1600',
    featured: false,
  },
  {
    id: 8,
    slug: 'uk-mortgage-guide-international',
    title: 'UK Mortgage Guide for International Buyers',
    titleTr: 'Uluslararası Alıcılar İçin İngiltere Mortgage Rehberi',
    excerpt:
      "A step-by-step guide to securing a mortgage in the UK as an overseas buyer, from eligibility criteria to the application process.",
    excerptTr:
      "Yabancı alıcı olarak İngiltere'de mortgage almanın adım adım rehberi: uygunluk kriterlerinden başvuru sürecine kadar.",
    bodyEn: [
      'Securing a mortgage in the United Kingdom as a non-resident buyer is entirely possible, though the process involves additional documentation requirements and typically results in a lower loan-to-value (LTV) ratio compared with domestic borrowers. With the right advisory support, international buyers regularly access UK property financing at competitive rates.',
      'Most UK lenders offering non-resident mortgages will advance up to 65–75% LTV, compared with 85–95% available to UK residents. This means an international buyer acquiring a £500,000 property may need to evidence liquid assets of at least £125,000 to £175,000 for the deposit, plus additional reserves for SDLT (Stamp Duty Land Tax, including the 2% surcharge for non-UK residents), legal fees and survey costs.',
      'Income verification and credit history pose the most common hurdles. Lenders require at least two years of certified income documentation, typically from an accountant, in a format they can assess. Self-employed applicants and those with income from multiple jurisdictions often require specialist non-resident mortgage brokers who maintain relationships with private banks — HSBC Premier, Barclays International, and Coutts among them — that are equipped to assess complex income profiles.',
      'Interest rates for non-resident mortgages currently sit at a premium of 0.5–1.2% above standard UK residential rates. Fixed-rate products over two to five years provide payment certainty, while tracker products suit investors comfortable with base rate exposure. It is essential to seek independent legal advice from a UK-qualified solicitor experienced in international transactions, given the interplay between UK property law, the buyer\'s domestic legal system and any cross-border tax reporting obligations.',
    ],
    bodyTr: [
      "Yurt dışında ikamet eden bir alıcı olarak Birleşik Krallık'ta mortgage almak tamamen mümkündür; ancak süreç ek belge gereksinimleri içermekte ve yurt içi kredi alanlara kıyasla genellikle daha düşük kredi-değer oranıyla (LTV) sonuçlanmaktadır. Doğru danışmanlık desteğiyle uluslararası alıcılar İngiltere gayrimenkul finansmanına rekabetçi faiz oranlarıyla düzenli olarak erişmektedir.",
      "İngiltere ikamet etmeyenlere mortgage sunan çoğu borç veren, yerleşik Birleşik Krallık vatandaşlarına sağlanan %85–95'in aksine en fazla %65–75 LTV oranında kredi açmaktadır. Bu durum; 500.000 £'luk bir mülk edinen uluslararası bir alıcının peşinat için en az 125.000 ile 175.000 £ likit varlık belgesi sunması ve buna ek olarak SDLT (Damga Vergisi; Birleşik Krallık dışında mukim olan alıcılar için %2 ek vergiyi içermektedir), hukuki ücretler ve ekspertiz maliyetleri için yeterli rezerve sahip olması gerektiği anlamına gelmektedir.",
      "Gelir doğrulaması ve kredi geçmişi en yaygın engelleri oluşturmaktadır. Borç verenler, değerlendirebildikleri bir biçimde — genellikle muhasebeci tarafından onaylanmış olarak — en az iki yıllık sertifikalı gelir belgesi talep etmektedir. Serbest meslek sahibi başvuru sahipleri ve birden fazla ülkeden geliri bulunanlar, HSBC Premier, Barclays International ve Coutts gibi karmaşık gelir profillerini değerlendirmeye donanımlı özel bankalarla ilişkisi bulunan uzman yurt dışı mukim mortgage brokerlarına başvurmayı gerektirmektedir.",
      "Yurt dışında mukim olanlara yönelik mortgage faiz oranları şu anda standart İngiltere konut oranlarının %0,5 ile %1,2 üzerinde seyretmektedir. İki ila beş yıllık sabit faizli ürünler ödeme güvencesi sağlarken, izleyici (tracker) ürünler baz faiz dalgalanmasına tahammül eden yatırımcılara uygundur. İngiltere mülkiyet hukuku, alıcının kendi ülkesinin hukuk sistemi ve sınır ötesi vergi raporlama yükümlülükleri arasındaki karmaşık etkileşim göz önünde bulundurulduğunda, uluslararası işlemlerde deneyimli bir İngiltere hukuku avukatından bağımsız hukuki danışmanlık alınması büyük önem taşımaktadır.",
    ],
    category: 'Investment Guides',
    date: '1 February 2026',
    dateTr: '1 Şubat 2026',
    readTime: '13 min read',
    readTimeTr: '13 dk okuma',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600',
    featured: false,
  },
  {
    id: 9,
    slug: 'burj-khalifa-vs-burj-al-arab',
    title: "Burj Khalifa vs Burj Al Arab: The Iconic Symbols of Dubai",
    titleTr: "Burj Khalifa vs Burj Al Arab: Dubai'nin İkonik Sembolleri",
    excerpt:
      "Exploring the architectural marvels and investment appeal of Dubai's two most iconic landmarks and their surrounding property markets.",
    excerptTr:
      "Dubai'nin en ikonik iki simgesinin mimari hayranlığını ve çevresindeki gayrimenkul pazarlarının yatırım çekiciliğini keşfedin.",
    bodyEn: [
      'Few skylines in the world carry the symbolic weight of Dubai\'s, and fewer landmarks within it carry the global recognition of Burj Khalifa and Burj Al Arab. Both structures represent landmark moments in the city\'s evolution — but their roles in the investment ecosystem are quite distinct.',
      'The Burj Khalifa, completed in 2010, stands as the world\'s tallest building at 828 metres and anchors the Downtown Dubai district — which has become the city\'s premier address for luxury residential, retail and hospitality assets. Properties within the Burj Khalifa itself remain among the most expensive per square foot in the Middle East, with residences in the upper floors regularly transacting at AED 5,000–9,000 per square foot. The surrounding Emaar-developed masterplan — including Dubai Mall, Souk Al Bahar and the Dubai Fountain — drives foot traffic and premium rental premiums year-round.',
      'Burj Al Arab, opened in 1999 on its own man-made island in the Jumeirah coastal zone, is foremost a hospitality statement rather than a residential asset. Its presence anchors the Jumeirah Beach Road corridor, where villa and apartment values have risen sharply — between 30–45% — over the three years to 2026. The Madinat Jumeirah resort complex nearby creates a micro-market for short-term rental investors seeking premium Airbnb yields from international tourist traffic.',
      'For portfolio construction purposes, Downtown Dubai properties near Burj Khalifa offer a blend of capital preservation, rental liquidity and brand recognition that appeals to institutional and family office buyers. Jumeirah corridor assets represent a higher-risk, higher-yield play on Dubai\'s ultra-luxury leisure economy. Both zones benefit from Dubai\'s absence of capital gains tax, making them compelling propositions relative to comparable luxury markets in London, Paris or New York.',
    ],
    bodyTr: [
      "Dünyanın pek az silueti Dubai'ninkinin taşıdığı sembolik ağırlığa sahipken, bu siluet içinde de pek az yapı Burj Khalifa ve Burj Al Arab'ın küresel tanınırlığına erişebilmektedir. Her iki yapı şehrin gelişiminde önemli dönüm noktalarını temsil etmektedir; ancak yatırım ekosistemindeki rolleri birbirinden oldukça farklıdır.",
      "2010 yılında tamamlanan Burj Khalifa, 828 metreyle dünyanın en yüksek binası unvanını taşımakta ve lüks konut, perakende ve konaklama varlıkları için şehrin önde gelen adresi haline gelen Downtown Dubai bölgesinin odak noktasını oluşturmaktadır. Burj Khalifa içindeki konutlar, Orta Doğu'nun metrekare başına en pahalı mülkleri arasında olmayı sürdürmekte; üst katlardaki daireler düzenli olarak metrekare başına 5.000–9.000 BAE Dirhemi fiyatıyla el değiştirmektedir. Dubai Mall, Souk Al Bahar ve Dubai Çeşmesi'ni kapsayan Emaar tarafından geliştirilen çevresindeki ana plan, yıl boyunca trafik çekmeye ve premium kira primlerine katkıda bulunmaktadır.",
      "1999 yılında Jumeirah kıyı bölgesindeki yapay adasında kapılarını açan Burj Al Arab, konuttan ziyade bir konaklama simgesidir. Varlığı Jumeirah Beach Road koridoruna değer katmaktadır; bu bölgedeki villa ve daire değerleri 2026'ya uzanan üç yılda %30–45 arasında keskin bir artış sergilemiştir. Yakınındaki Madinat Jumeirah tatil köyü kompleksi, uluslararası turist trafiğinden premium Airbnb getirileri hedefleyen kısa dönemli kiralama yatırımcıları için bir mikro piyasa oluşturmaktadır.",
      "Portföy oluşturma açısından, Burj Khalifa'nın yakınındaki Downtown Dubai mülkleri kurumsal ve aile ofisi alıcılarına hitap eden bir sermaye koruma, kira likiditesi ve marka değeri karışımı sunmaktadır. Jumeirah koridoru varlıkları ise Dubai'nin ultra-lüks eğlence ekonomisine odaklanan daha yüksek riskli, daha yüksek getirili bir oyunu temsil etmektedir. Her iki bölge de Dubai'nin sermaye kazancı vergisi yokluğundan faydalanmakta; bu da onları Londra, Paris veya New York'taki karşılaştırılabilir lüks piyasalara göre cazip konuma getirmektedir.",
    ],
    category: 'Market Reports',
    date: '25 January 2026',
    dateTr: '25 Ocak 2026',
    readTime: '6 min read',
    readTimeTr: '6 dk okuma',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1600',
    featured: false,
  },
  {
    id: 10,
    slug: 'uk-economic-outlook-2026',
    title: 'UK Economic Outlook 2026: What It Means for Property Investors',
    titleTr: '2026 İngiltere Ekonomik Görünümü: Gayrimenkul Yatırımcıları İçin Ne Anlam İfade Ediyor?',
    excerpt:
      'Navigating the UK economy in 2026: inflation trends, interest rate forecasts and their direct impact on property investment returns.',
    excerptTr:
      "2026'da İngiltere ekonomisinde gezinmek: enflasyon eğilimleri, faiz oranı tahminleri ve gayrimenkul yatırım getirileri üzerindeki doğrudan etkileri.",
    bodyEn: [
      'The UK economy enters 2026 in a phase of measured recovery, with headline CPI inflation having returned to the Bank of England\'s 2% target range following two years of above-target persistence. GDP growth is projected at 1.4% for the full year — modest but resilient — while unemployment has stabilised below 4.5%, broadly supportive of sustained rental demand.',
      'The Bank of England base rate is expected to continue its gradual descent from the post-2022 cyclical peak, with consensus market forecasts pointing to a rate of 3.75–4.25% by Q4 2026. For fixed-rate mortgage holders, this repricing presents a refinancing opportunity; for cash buyers, a softening rate environment tends to expand the buyer pool and support capital values in the mid-to-upper price brackets.',
      'Commercial real estate continues to reprice across office and retail segments, while industrial and logistics assets remain strongly bid. For residential investors, the more relevant dynamic is the interaction between mortgage affordability and rental demand. With owner-occupier affordability still stretched in London and the South East, the private rental sector continues to absorb demand displaced from the purchase market, maintaining structural support for rents.',
      'Planning reform measures introduced in the 2025 budget — specifically the relaxation of restrictions on backland development and reintroduction of housing delivery targets — are expected to gradually increase supply, though the structural housing deficit of approximately 300,000 units per year remains a medium-term feature of the market. Investors with a 5–10 year horizon continue to benefit from this supply-demand imbalance, particularly in high-demand urban postcodes where planning constraints are most acute.',
    ],
    bodyTr: [
      "İngiltere ekonomisi, iki yıllık hedef üstü seyrin ardından tüketici fiyat enflasyonunun İngiltere Merkez Bankası'nın %2 hedef aralığına dönmesiyle birlikte 2026'ya ölçülü bir toparlanma sürecinde girmektedir. Yıllık GSYİH büyümesi için %1,4'lük bir projeksiyon yapılmıştır; bu büyüme mütevazı fakat dayanıklıdır. İşsizlik ise %4,5'in altında istikrar kazanmış durumdadır ve bu durum kiralama talebini genel olarak desteklemektedir.",
      "İngiltere Merkez Bankası faiz oranının 2022 sonrası döngüsel zirvesinden kademeli inişini sürdürmesi beklenmektedir; piyasa konsensüsü tahminleri, 2026 yılı 4. çeyreğine ilişkin oran için %3,75–4,25 aralığına işaret etmektedir. Sabit faizli mortgage sahipleri için bu yeniden fiyatlama bir refinansman fırsatı sunmaktadır; nakit alıcılar içinse faiz oranlarının yumuşadığı bir ortam alıcı havuzunu genişletme ve orta-üst fiyat segmentlerindeki sermaye değerlerini destekleme eğilimi taşımaktadır.",
      "Ticari gayrimenkul, ofis ve perakende segmentlerinde yeniden fiyatlandırma sürecini yaşamayı sürdürürken endüstriyel ve lojistik varlıklara yönelik talep güçlü biçimde devam etmektedir. Konut yatırımcıları için daha fazla önem taşıyan dinamik, mortgage karşılanabilirliği ile kira talebi arasındaki etkileşimdir. Ev sahibi-kullanıcı karşılanabilirliği Londra ve Güney Doğu'da hâlâ zorlanmışken, özel kiralama sektörü satın alma piyasasından yönlendirilen talebi absorbe etmeye devam etmekte ve kira gelirlerine yapısal destek sağlamaktadır.",
      "2025 bütçesinde tanıtılan ve özellikle arka arazi geliştirme kısıtlamalarının gevşetilmesini ile konut teslim hedeflerinin yeniden hayata geçirilmesini kapsayan imar reform tedbirlerinin arzı kademeli olarak artırması beklenmektedir; ancak yaklaşık yılda 300.000 birime ulaşan yapısal konut açığı, piyasanın orta vadeli bir özelliği olmayı sürdürmektedir. On yıla kadar uzanan bir yatırım ufkuna sahip yatırımcılar, bu arz-talep dengesizliğinden yararlanmayı sürdürmektedir; bu durum, imar kısıtlamalarının en belirgin olduğu yüksek talep gören kentsel posta kodlarında özellikle belirginleşmektedir.",
    ],
    category: 'Market Reports',
    date: '18 January 2026',
    dateTr: '18 Ocak 2026',
    readTime: '10 min read',
    readTimeTr: '10 dk okuma',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1600',
    featured: false,
  },
  {
    id: 11,
    slug: 'historic-properties-england',
    title: 'Historic Properties in England: Investment Potential and Preservation',
    titleTr: "İngiltere'de Tarihi Mülkler: Yatırım Potansiyeli ve Koruma",
    excerpt:
      'Discover the unique investment opportunities in listed and heritage properties across England, and how preservation adds long-term value.',
    excerptTr:
      "İngiltere genelinde tescilli ve tarihi mülklerdeki benzersiz yatırım fırsatlarını ve korumanın uzun vadeli değer nasıl kattığını keşfedin.",
    bodyEn: [
      'Listed buildings and heritage properties occupy a unique position in the English property market: they are scarce by definition, restricted in supply, and carry an emotional and cultural premium that mainstream new-build developments simply cannot replicate. For sophisticated investors, they represent an alternative real estate allocation with strong capital preservation credentials.',
      'England\'s listed building system, administered by Historic England under the Planning (Listed Buildings and Conservation Areas) Act 1990, categorises properties into Grade I (2% of all listings, exceptional interest), Grade II* (5.5%, particularly important) and Grade II (92%, nationally important). Grade I and Grade II* buildings carry the highest purchase price premiums but also the strongest long-term value trajectories due to their absolute scarcity.',
      'Ownership of a listed building comes with statutory obligations to maintain the property\'s character, and alterations require Listed Building Consent from the local planning authority. This regulatory layer can deter uninformed buyers and creates an informational inefficiency that savvy investors exploit: below-market acquisitions of unloved listed properties are available to buyers who understand the consent process, can source sympathetic contractors and have capital headroom for restoration works.',
      'Tax incentives further enhance the economics. VAT is zero-rated on approved alterations to listed buildings in many circumstances. Repairs to habitable listed buildings may also attract reduced VAT rates. The Heritage Enterprise Scheme and Historic England grant programmes provide partial funding for restoration of buildings at risk. Combined with the scarcity premium, rental above-market pricing for period character, and the reputational cachet of a heritage address, historic properties in prime English market towns, university cities and rural estates represent a compelling long-term investment thesis.',
    ],
    bodyTr: [
      "Tescilli ve tarihi mülkler, İngiliz gayrimenkul piyasasında benzersiz bir konuma sahiptir: tanımı gereği kıt, arzı kısıtlı olan ve ana akım yeni yapı geliştirmelerinin bir türlü yakalayamadığı duygusal ile kültürel bir prime barındıran bu yapılar, güçlü sermaye koruma özelliğiyle ileri düzey yatırımcılar için alternatif bir gayrimenkul tahsisi sunmaktadır.",
      "Historic England tarafından 1990 tarihli Planlama (Tescilli Binalar ve Koruma Alanları) Kanunu kapsamında yönetilen İngiltere tescilli bina sistemi, mülkleri Derece I (tescilli binaların %2'si, olağanüstü öneme sahip), Derece II* (%5,5, özellikle önemli) ve Derece II (%92, ulusal öneme sahip) olmak üzere üç kategoriye ayırmaktadır. Derece I ve Derece II* binalar satın alım fiyatında en yüksek prime tutarına sahip olmakla birlikte mutlak kıtlıkları sayesinde uzun vadede en güçlü değer artış eğrilerini de sunmaktadır.",
      "Tescilli bina sahipliği, mülkün karakterini korumaya yönelik yasal yükümlülükler içermekte ve değişiklikler yerel planlama otoritesinden Tescilli Bina İzni alınmasını gerektirmektedir. Bu düzenleyici katman, bilgisiz alıcıları caydırabilmekte ve deneyimli yatırımcıların avantajına dönüştürdüğü bir bilgi verimsizliği yaratmaktadır: izin sürecini anlayan, orijinal yapıya saygılı yükleniciler bulabilen ve restorasyon çalışmaları için sermaye marjı olan alıcılar, ihmal edilmiş tescilli mülkleri piyasa altı fiyatlarla edinme fırsatı bulmaktadır.",
      "Vergi teşvikleri ekonomiyi daha da cazip kılmaktadır. Tescilli binalarda onaylı değişiklikler için KDV pek çok durumda sıfırlanmaktadır. Yaşanabilir tescilli binaların onarımları da indirgenmiş KDV oranlarından yararlanabilir. Miras Girişim Planı ve tarihi İngiltere hibe programları, risk altındaki binaların restorasyonu için kısmi finansman sağlamaktadır. Kıtlık priminin yanı sıra dönem karakterinin sunduğu piyasa üstü kira fiyatlaması ve tarihi bir adresin sağladığı prestijle birleşince, önde gelen İngiliz kasabalarındaki, üniversite şehirlerindeki ve kırsal alanlardaki tarihi mülkler, uzun vadeli yatırım açısından güçlü bir tez ortaya koymaktadır.",
    ],
    category: 'Investment Guides',
    date: '10 January 2026',
    dateTr: '10 Ocak 2026',
    readTime: '8 min read',
    readTimeTr: '8 dk okuma',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1600',
    featured: false,
  },
  {
    id: 12,
    slug: 'greece-golden-visa-2026',
    title: 'Greece Golden Visa: Updated Requirements and Benefits for 2026',
    titleTr: 'Yunanistan Altın Vize: 2026 İçin Güncellenmiş Gereksinimler ve Avantajlar',
    excerpt:
      'The latest changes to the Greek Golden Visa programme, new minimum investment thresholds, and why it remains a top choice for EU residency.',
    excerptTr:
      'Yunanistan Altın Vize programındaki son değişiklikler, yeni minimum yatırım eşikleri ve AB oturumu için neden en iyi seçenek olmaya devam ettiği.',
    bodyEn: [
      'Greece\'s Golden Visa has undergone significant structural reform since 2024, with the Greek Government raising investment thresholds in response to housing affordability pressures in prime urban and island markets. Despite these changes, the programme retains compelling advantages for non-EU investors seeking a foothold in the European Union.',
      'As of 2026, the minimum qualifying real estate investment in the Attica region (Athens), Thessaloniki, Mykonos, Santorini and all island municipalities with populations above 3,100 stands at €800,000. Outside these high-demand zones, the threshold remains at €400,000. Investors purchasing properties exceeding 120 square metres qualify at a flat €400,000 minimum nationwide, providing an alternative for those targeting larger residential assets.',
      'The five-year renewable residency permit includes the applicant, spouse, dependent children up to age 21, and parents of both spouses. After seven years of continuous legal residence and meeting language and integration criteria, holders may apply for Greek citizenship — and with it, an EU passport granting freedom of movement across all Schengen Zone member states.',
      'Attica-based investment offers the strongest secondary market liquidity, with tourism-driven rental demand in central Athens neighbourhoods such as Koukaki, Exarcheia and Kolonaki generating short-term rental yields of 5–8% annually. The Greek property market has outperformed expectations over consecutive years, with prime residential values in Athens rising over 20% cumulatively since 2022. Innovest Capital maintains active sourcing relationships with licensed Greek developers and brokers to identify qualifying properties across the spectrum from luxury residential to mixed-use commercial.',
    ],
    bodyTr: [
      "Yunanistan'ın Altın Vizesi, Yunan Hükümeti'nin prime kentsel ve ada pazarlarındaki konut karşılanabilirliği baskılarına yanıt olarak yatırım eşiklerini yükseltmesiyle 2024'ten bu yana köklü bir yapısal reforma tabi tutulmuştur; tüm bu değişikliklere karşın program, Avrupa Birliği'nde bir dayanak noktası arayan AB dışından yatırımcılar için cazip avantajlarını korumaya devam etmektedir.",
      "2026 itibarıyla Attica bölgesi (Atina), Selanik, Mykonos, Santorini ve nüfusu 3.100'ü aşan tüm ada belediyelerinde minimum uygun gayrimenkul yatırımı 800.000 € olarak belirlenmiştir. Bu yüksek talep gören bölgelerin dışında eşik 400.000 € olarak kalmaktadır. 120 metrekarenin üzerinde mülk satın alan yatırımcılar, daha büyük konut varlıklarını hedefleyenler için bir alternatif sunarak ülke genelinde sabit 400.000 €'luk minimum tutarla uygun sayılmaktadır.",
      "Beş yıllık yenilenebilir oturma izni, başvuru sahibini, eşini, 21 yaşına kadar olan bağımlı çocukları ve her iki eşin ebeveynlerini kapsamaktadır. Yedi yıllık kesintisiz yasal ikamet ve dil ile uyum kriterlerinin karşılanmasının ardından, kart sahipleri Yunan vatandaşlığı için başvurabilmekte; bu da tüm Schengen Bölgesi üye devletlerinde serbest dolaşım hakkı tanıyan bir AB pasaportu anlamına gelmektedir.",
      "Attica merkezli yatırımlar, Koukaki, Exarcheia ve Kolonaki gibi Atina'nın merkezi semtlerindeki turizm kaynaklı kira talebiyle en güçlü ikincil piyasa likiditesini sunmakta ve yıllık %5–8 kısa dönemli kira getirisi sağlamaktadır. Yunan gayrimenkul piyasası, Atina'daki prime konut değerlerinin 2022'den bu yana kümülatif olarak %20'nin üzerinde artmasıyla art arda yıllarda beklentileri aşmıştır. Innovest Capital, lüks konuttan karma kullanımlı ticarete uzanan geniş bir yelpazede uygun mülkleri tespit etmek amacıyla lisanslı Yunan geliştirici ve brokerlarla aktif kaynak ilişkileri sürdürmektedir.",
    ],
    category: 'Residency',
    date: '3 January 2026',
    dateTr: '3 Ocak 2026',
    readTime: '10 min read',
    readTimeTr: '10 dk okuma',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600',
    featured: false,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
