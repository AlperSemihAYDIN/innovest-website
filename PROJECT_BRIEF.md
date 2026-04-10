# Innovest Capital – Website Projesi Genel Yapısı

> Cross-border investment, residency and business expansion advisory  
> Strategic investment solutions across the UK, EU, USA, UAE and key global markets

---

## 1. Projenin Amacı

Innovest Capital websitesi standart bir emlak sitesi değil, **uluslararası yatırım danışmanlığı platformu** olarak konumlandırılmıştır. Site aşağıdaki üç temel soruya net cevap verir:

1. Dubai veya Londra'da nereye yatırım yapabilirim?
2. Yatırım yoluyla hangi ülkelerde oturum alabilirim?
3. Yeni bir ülkede iş kurmak, partner bulmak, ticari bağlantı geliştirmek için kim bana yol gösterebilir?

### Hedefler
- Innovest Capital'i uluslararası yatırım danışmanlık firması olarak konumlandırmak
- Yüksek bütçeli yatırımcılarda güven oluşturmak
- Nitelikli müşteri (lead) üretmek

### Faaliyet Alanları
- Gayrimenkul Yatırım Danışmanlığı
- Yatırım Yoluyla Oturum (Residency) Danışmanlığı
- Ticari Genişleme & Ticari Aracılık Hizmetleri

---

## 2. Teknik Altyapı

| Alan | Teknoloji |
|------|-----------|
| Framework | Next.js 15 (App Router) |
| Dil | TypeScript |
| Stil | Tailwind CSS |
| Animasyon | Framer Motion |
| Test | Jest + React Testing Library + Playwright (E2E) |
| Deploy | Vercel |
| Repo | GitHub (AlperSemihAYDIN/innovest-website) |

---

## 3. Website Sayfa Yapısı

```
/ (Ana Sayfa - EN)
├── /about
├── /real-estate
│   ├── /london
│   │   └── /[slug]   ← Mülk detay sayfası
│   └── /dubai
│       └── /[slug]   ← Mülk detay sayfası
├── /residency
├── /business-expansion
├── /services
├── /insights
└── /contact

/tr (Ana Sayfa - TR)
├── /tr/about
├── /tr/real-estate
│   ├── /tr/real-estate/london
│   │   └── /tr/real-estate/london/[slug]
│   └── /tr/real-estate/dubai
│       └── /tr/real-estate/dubai/[slug]
├── /tr/residency
├── /tr/business-expansion
├── /tr/services
├── /tr/insights
└── /tr/contact
```

---

## 4. Ana Sayfa Bölümleri (Sections)

1. **Hero** – Güçlü giriş, net değer önerisi
2. **Services** – 3 ana hizmet alanı (Gayrimenkul, Oturum, Ticari)
3. **FeaturedInvestments** – Öne çıkan yatırım fırsatları
4. **WhyInnovest** – Güven unsurları
5. **Stats** – Rakamlarla Innovest
6. **InvestmentMap** – Interaktif yatırım haritası (UK/UAE)
7. **Process** – Çalışma süreci
8. **Testimonials** – Müşteri referansları
9. **CallToAction** – Danışmanlık al (güçlü CTA)

---

## 5. Çok Dilli Yapı (i18n)

- **Ana dil:** İngilizce (/)
- **İkinci dil:** Türkçe (/tr)
- Dil bazlı içerik: `src/lib/dictionary.ts` üzerinden yönetilir
- Locale tespiti: `src/lib/i18n.ts`

---

## 6. Tasarım İlkeleri

### Marka Kimliği
- **Renk paleti:** Siyah / Beyaz / Gold (`#C1A45D`)
- **Tipografi:** Montserrat (sans-serif, başlıklar) + Libre Baskerville (serif, aksan)
- **Tema:** Koyu zemin, altın vurgular

### Layout İlkeleri
- Her section üst ve alttan eşit padding (minimum `py-20` / `py-24`)
- İçerikler yatayda ortalanmış (`mx-auto`, `text-center`)
- Responsive: mobil öncelikli tasarım
- Maksimum içerik genişliği: `max-w-7xl`

### Referans Stil
- Private bank siteleri
- Yatırım danışmanlık firmaları
- Lüks gayrimenkul markaları

---

## 7. Bileşen Yapısı

```
src/
├── app/                    ← Next.js App Router sayfaları
│   ├── layout.tsx          ← Global layout (font, metadata)
│   ├── page.tsx            ← Ana sayfa (EN)
│   ├── sitemap.ts          ← SEO sitemap
│   └── tr/                 ← Türkçe sayfalar
├── components/
│   ├── home/               ← Ana sayfa section bileşenleri
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── FeaturedInvestments.tsx
│   │   ├── WhyInnovest.tsx
│   │   ├── Stats.tsx
│   │   ├── InvestmentMap.tsx
│   │   ├── Process.tsx
│   │   ├── Testimonials.tsx
│   │   └── CallToAction.tsx
│   ├── layout/             ← Header ve Footer
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/              ← İç sayfa içerik bileşenleri
│   │   ├── AboutContent.tsx
│   │   ├── BusinessContent.tsx
│   │   ├── CityContent.tsx
│   │   ├── ContactContent.tsx
│   │   ├── InsightsContent.tsx
│   │   ├── PropertyDetail.tsx
│   │   ├── RealEstateContent.tsx
│   │   ├── ResidencyContent.tsx
│   │   └── ServicesContent.tsx
│   ├── chat/               ← AI asistan entegrasyonu
│   │   ├── AIChat.tsx
│   │   └── WhatsAppButton.tsx
│   └── ui/
│       └── AnimatedSection.tsx
├── lib/
│   ├── dictionary.ts       ← TR/EN içerik sözlüğü
│   ├── i18n.ts             ← Dil tespiti ve yönlendirme
│   ├── mapProperties.ts    ← Harita mülk verileri
│   └── propertyData.ts     ← Mülk katalog verileri
└── __tests__/              ← Test dosyaları
```

---

## 8. Entegrasyonlar

| Entegrasyon | Amaç |
|-------------|------|
| Google Analytics + Tag Manager | Ziyaretçi analitik |
| Meta Pixel | Reklam dönüşüm takibi |
| WhatsApp Button | Anlık iletişim |
| AI Chat (AIChat.tsx) | Ziyaretçi yönlendirme asistanı |
| CRM (HubSpot/Zoho) | Lead yönetimi (entegrasyon planlandı) |

---

## 9. Lead Toplama Sistemi

- Danışmanlık talep formu (iletişim sayfası)
- Kullanıcı filtreleme: Bütçe, İlgi Alanı, Lokasyon
- Her sayfada güçlü CTA blokları
- WhatsApp entegrasyonu (doğrudan iletişim)

---

## 10. SEO Altyapısı

- Temiz URL yapısı
- Her sayfa için meta tag'ler (title, description, OG tags)
- `sitemap.ts` ile otomatik sitemap üretimi
- Blog / Insights sistemi (SEO içerik üretimi)
- Core Web Vitals uyumlu performans

---

## 11. Test Yapısı

```
src/__tests__/
├── accessibility.test.tsx  ← Erişilebilirlik testleri
├── business-data.test.ts   ← İş verisi testleri
├── contact-form.test.ts    ← Form testleri
├── dictionary.test.ts      ← i18n sözlük testleri
├── nav-hrefs.test.ts       ← Navigasyon linkleri
├── pages.test.ts           ← Sayfa render testleri
├── seo.test.ts             ← SEO meta testleri
└── components/             ← Bileşen bazlı testler

e2e/
├── contact.spec.ts         ← İletişim formu E2E
├── navigation.spec.ts      ← Navigasyon E2E
└── pages.spec.ts           ← Sayfa yükleme E2E
```

---

## 12. Deployment

- **Platform:** Vercel (otomatik deploy)
- **Branch:** `master` → Production
- **URL:** https://innovest-website.vercel.app
- **TR URL:** https://innovest-website.vercel.app/tr

---

## 13. Marka Dosyaları

`müşteri dosyaları/extracted/` içinde bulunan logo varyantları:
- `image1.png` – Yatay wordmark (Altın, beyaz zemin)
- `image3.png` – Monogram IV (Altın, beyaz zemin)
- `image4.png` – Kombinasyon logo (IV + INNOVEST CAPITAL)
- `image6.png` – Dikey wordmark (INNOVEST / CAPITAL)
