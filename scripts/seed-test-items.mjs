import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// Load .env.local
const envContent = readFileSync('.env.local', 'utf-8');
const env = {};
for (const line of envContent.split('\n')) {
  const idx = line.indexOf('=');
  if (idx < 0 || line.startsWith('#')) continue;
  const key = line.slice(0, idx).trim();
  let val = line.slice(idx + 1).trim();
  if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
  val = val.replace(/\\n/g, '\n');
  env[key] = val;
}

const app = initializeApp({
  credential: cert({
    projectId: env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: env.FIREBASE_ADMIN_PRIVATE_KEY,
  }),
});

const db = getFirestore(app);
const now = new Date().toISOString();

// ─── 1. Deneme Mülk ───────────────────────────────────────────────────────────
await db.collection('properties').doc('deneme-proje').set({
  slug: 'deneme-proje',
  name: 'Deneme Proje',
  developer: 'Test Developer',
  location: 'N1 9GU, Londra',
  fullAddress: '1 Test Street, Islington, London N1 9GU, UK',
  region: 'UK',
  city: 'london',
  price: '£350,000',
  priceNote: { en: 'Starting from', tr: 'Başlangıç fiyatı' },
  yield: '5.8%',
  completion: 'Q4 2026',
  beds: '1–2 Bed',
  floors: '10',
  totalUnits: '50',
  lat: 51.5362,
  lng: -0.1033,
  heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600',
  images: [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=900',
  ],
  description: {
    en: 'This is a test property listing created for demonstration purposes. It shows how a new property added via the admin panel appears on the site.',
    tr: 'Bu, yönetici paneli üzerinden eklenen yeni bir mülkün sitede nasıl göründüğünü göstermek amacıyla oluşturulmuş deneme mülk kaydıdır.',
  },
  highlights: {
    en: ['Test highlight 1', 'Test highlight 2', 'Close to test station'],
    tr: ['Deneme özellik 1', 'Deneme özellik 2', 'Test istasyonuna yakın'],
  },
  amenities: ['Gym', 'Concierge', 'Rooftop Terrace'],
  createdAt: now,
  updatedAt: now,
});
console.log('✓ Deneme mülk eklendi: deneme-proje');

// ─── 2. Deneme Makale ─────────────────────────────────────────────────────────
await db.collection('articles').doc('deneme-makale').set({
  slug: 'deneme-makale',
  title: 'Deneme Makale',
  titleTr: 'Deneme Makale',
  excerpt: 'This is a test article created to verify that new articles added through the admin panel appear correctly on the site.',
  excerptTr: 'Bu, admin panelinden eklenen makalelerin sitede doğru görünüp görünmediğini kontrol etmek için oluşturulmuş deneme makalesidir.',
  bodyEn: [
    'This is the first paragraph of the test article. It has been added directly to Firestore to verify the content pipeline works correctly.',
    'This is the second paragraph. Articles added via the admin panel should appear on the Insights page and be accessible via their slug URL.',
  ],
  bodyTr: [
    'Bu, deneme makalenin birinci paragrafıdır. İçerik akışının doğru çalışıp çalışmadığını doğrulamak için Firestore\'a doğrudan eklenmiştir.',
    'Bu ikinci paragraftır. Admin panelinden eklenen makaleler Insights sayfasında görünmeli ve slug URL\'si üzerinden erişilebilir olmalıdır.',
  ],
  category: 'Market Reports',
  date: '17 April 2026',
  dateTr: '17 Nisan 2026',
  readTime: '2 min read',
  readTimeTr: '2 dk okuma',
  image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600',
  featured: false,
  createdAt: now,
  updatedAt: now,
});
console.log('✓ Deneme makale eklendi: deneme-makale');

// ─── 3. Deneme Rehber ─────────────────────────────────────────────────────────
await db.collection('guides').doc('deneme-rehber').set({
  slug: 'deneme-rehber',
  title: 'Deneme Rehber',
  titleTr: 'Deneme Rehber',
  excerpt: 'This is a test guide to verify new guides added via the admin panel appear on the Knowledge Hub page.',
  excerptTr: 'Bu, admin panelinden eklenen rehberlerin Knowledge Hub sayfasında görünüp görünmediğini kontrol etmek için oluşturulmuş deneme rehberidir.',
  bodyEn: [
    'This is the first paragraph of the test guide. Guides are shown on the Knowledge Hub page grouped by category.',
    'Once this guide appears on the site, it confirms the Firestore → API → frontend pipeline is working end-to-end.',
  ],
  bodyTr: [
    'Bu, deneme rehberin birinci paragrafıdır. Rehberler, Knowledge Hub sayfasında kategorilere göre gruplanmış şekilde gösterilir.',
    'Bu rehber sitede göründüğünde, Firestore → API → frontend akışının uçtan uca çalıştığı doğrulanmış olur.',
  ],
  keyPoints: ['Test point 1', 'Test point 2', 'Everything is working'],
  keyPointsTr: ['Deneme madde 1', 'Deneme madde 2', 'Her şey çalışıyor'],
  category: 'London Real Estate',
  categoryTr: 'Londra Gayrimenkul',
  ctaType: 'soft',
  ctaText: 'Contact us',
  ctaTextTr: 'Bize ulaşın',
  image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600',
  createdAt: now,
  updatedAt: now,
});
console.log('✓ Deneme rehber eklendi: deneme-rehber');

console.log('\n✅ Tüm deneme içerikler eklendi!');
process.exit(0);
