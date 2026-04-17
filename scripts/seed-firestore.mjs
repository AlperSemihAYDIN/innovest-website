/**
 * Firestore seed script — runs locally using Firebase Admin SDK
 * Usage: node scripts/seed-firestore.mjs
 */
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

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

// Load TS data via tsx
const { allProperties } = require('../src/lib/propertyData.ts');
const { articles } = require('../src/lib/articleData.ts');
const { guides } = require('../src/lib/knowledgeHubData.ts');

const now = new Date().toISOString();
let total = 0;

async function seedCollection(name, items, getSlug) {
  console.log(`\nSeeding ${name} (${items.length} items)...`);
  const batch = db.batch();
  for (const item of items) {
    const slug = getSlug(item);
    const ref = db.collection(name).doc(slug);
    batch.set(ref, { ...item, createdAt: now, updatedAt: now }, { merge: true });
  }
  await batch.commit();
  total += items.length;
  console.log(`  ✓ ${items.length} ${name} seeded`);
}

await seedCollection('properties', allProperties, p => p.slug);
await seedCollection('articles', articles, a => a.slug);
await seedCollection('guides', guides, g => g.slug);

// Settings
const settingsRef = db.collection('settings').doc('general');
await settingsRef.set({
  companyName: 'Innovest Capital',
  email: 'info@innovest.uk',
  phoneLondon: '+44 7491 510941',
  phoneDubai: '+971 54 755 0101',
  phoneTurkey: '+90 531 420 0331',
  whatsapp: '+447491510941',
  addressLondon: 'Berkeley Square House, 2nd Floor, Berkeley Square, Mayfair, London W1J 6BE',
  socialLinkedin: 'https://www.linkedin.com/company/innovest-capital',
  socialInstagram: 'https://www.instagram.com/innovestcapital',
  socialTwitter: 'https://twitter.com/innovestcapital',
  updatedAt: now,
}, { merge: true });
console.log('\n  ✓ settings seeded');

// Contacts — realistic fake inquiries
const contacts = [
  {
    id: 'contact-001',
    firstname: 'Mehmet Yılmaz',
    email: 'mehmet.yilmaz@gmail.com',
    phone: '+90 532 881 4422',
    city: 'İstanbul',
    budget: '£500,000 – £750,000',
    interest: 'Londra\'da konut yatırımı',
    message: 'Merhaba, Londra\'da Zone 1-2 bandında kiralık getirisi yüksek bir daire almayı düşünüyorum. Türk pasaportumla mortgage alıp alamayacağımı ve vergi durumunu anlamak istiyorum. Westminster Tower hakkında bilgi alabilir miyim?',
    read: true,
    source: 'property-page',
    createdAt: '2026-04-01T09:14:22.000Z',
  },
  {
    id: 'contact-002',
    firstname: 'Ayşe Kara',
    email: 'ayse.kara@hotmail.com',
    phone: '+90 555 202 3311',
    city: 'Ankara',
    budget: '£300,000 – £500,000',
    interest: 'Portekiz Altın Vize',
    message: 'Portekiz Altın Vize programına başvuruda bulunmak istiyorum. Çocuklarımın üniversite için AB ülkelerinde çalışma ve oturma hakkına sahip olmasını istiyorum. En hızlı ve en az riskli yol hangisi?',
    read: false,
    source: 'contact-page',
    createdAt: '2026-04-03T14:30:05.000Z',
  },
  {
    id: 'contact-003',
    firstname: 'James Harrison',
    email: 'j.harrison@harrisoncapital.co.uk',
    phone: '+44 7700 900142',
    city: 'London',
    budget: '£1,000,000+',
    interest: 'Portfolio diversification – Dubai',
    message: 'We are looking to diversify into Dubai real estate as part of a broader GCC strategy. Interested in off-plan opportunities in Business Bay and Downtown with 2–3 year exit. Can you share available inventory?',
    read: true,
    source: 'insights-page',
    createdAt: '2026-04-04T11:05:50.000Z',
  },
  {
    id: 'contact-004',
    firstname: 'Fatih Demir',
    email: 'fdemir@demirholding.com',
    phone: '+90 212 555 0044',
    city: 'İstanbul',
    budget: '£750,000 – £1,000,000',
    interest: 'İngiltere şirket kurulumu ve mülk alımı',
    message: 'Hem İngiltere\'de bir Ltd. şirket kurmak hem de şirket adına birkaç konut yatırımı yapmak istiyorum. Kira gelirlerinin vergilendirilmesi ve SPV yapısının avantajları hakkında bilgi alabilir miyim?',
    read: false,
    source: 'knowledge-hub',
    createdAt: '2026-04-05T08:47:33.000Z',
  },
  {
    id: 'contact-005',
    firstname: 'Sarah Al-Rashid',
    email: 'sarah.rashid@outlook.ae',
    phone: '+971 50 388 1122',
    city: 'Dubai',
    budget: 'AED 2,000,000 – 4,000,000',
    interest: 'Dubai off-plan investment',
    message: 'I am based in Dubai and looking at the Emaar Beachfront and Dubai Creek Harbour projects. I want to understand payment plan structures and projected handover dates. Do you have access to developer launch prices?',
    read: true,
    source: 'property-page',
    createdAt: '2026-04-06T15:22:10.000Z',
  },
  {
    id: 'contact-006',
    firstname: 'Burak Öztürk',
    email: 'burak.ozturk@gmail.com',
    phone: '+90 543 771 9900',
    city: 'İzmir',
    budget: '£400,000 – £600,000',
    interest: 'Londra Battersea bölgesi',
    message: 'Battersea Power Station çevresinde daire bakıyorum. Yatırım amaçlı, 5 yıl tutup satmayı planlıyorum. Bölgedeki kapital büyüme potansiyeli ve kira getirisi hakkında bir analiz alabilir miyim?',
    read: false,
    source: 'contact-page',
    createdAt: '2026-04-07T10:11:44.000Z',
  },
  {
    id: 'contact-007',
    firstname: 'Elena Petrov',
    email: 'elena.petrov@bgproperties.eu',
    phone: '+359 88 812 3344',
    city: 'Sofia',
    budget: '€500,000 – €750,000',
    interest: 'EU Residency & UK investment',
    message: 'I am a Bulgarian national looking for both London property investment and exploring residency options for my family. We are interested in either Portugal or Malta routes. Can you provide a comparison?',
    read: true,
    source: 'insights-page',
    createdAt: '2026-04-08T13:55:01.000Z',
  },
  {
    id: 'contact-008',
    firstname: 'Hasan Çelik',
    email: 'hcelik@celikgroup.com.tr',
    phone: '+90 212 444 9988',
    city: 'İstanbul',
    budget: '£1,000,000+',
    interest: 'UK Innovator Founder Vize',
    message: 'Yazılım alanında bir startup\'ım var. İngiltere\'de şirket kurup Innovator Founder vizesi almayı planlıyorum. Hangi kuluçka merkeziyle çalışmanızı tavsiye edersiniz? Vize başvurusu öncesi gereklilikler neler?',
    read: false,
    source: 'knowledge-hub',
    createdAt: '2026-04-09T09:30:28.000Z',
  },
  {
    id: 'contact-009',
    firstname: 'Michael Chen',
    email: 'mchen@horizonhk.com',
    phone: '+852 9123 4455',
    city: 'Hong Kong',
    budget: '£800,000 – £1,200,000',
    interest: 'Prime Central London',
    message: 'Looking for prime London properties in Kensington or Mayfair. We represent a family office and are comparing yields with Hong Kong and Singapore assets. Please send current available listings and projected 10-year IRR.',
    read: true,
    source: 'property-page',
    createdAt: '2026-04-10T06:40:55.000Z',
  },
  {
    id: 'contact-010',
    firstname: 'Zeynep Arslan',
    email: 'zeynep.arslan@arslanlaw.com',
    phone: '+90 312 467 8899',
    city: 'Ankara',
    budget: '£250,000 – £400,000',
    interest: 'İlk yurt dışı yatırımı',
    message: 'Yurt dışında ilk gayrimenkul yatırımımı yapmak istiyorum. Londra veya Dubai arasında karar vermekte zorlanıyorum. Her ikisinin avantaj ve dezavantajlarını bir uzmanla görüşmek istiyorum. Ne zaman müsaitsiniz?',
    read: false,
    source: 'contact-page',
    createdAt: '2026-04-11T16:05:12.000Z',
  },
  {
    id: 'contact-011',
    firstname: 'Omar Abdullah',
    email: 'o.abdullah@abdullahgroup.ae',
    phone: '+971 55 644 2200',
    city: 'Abu Dhabi',
    budget: 'AED 5,000,000+',
    interest: 'Dubai ultra-prime & UK Gateway',
    message: 'We are a sovereign family office based in Abu Dhabi. Interested in Palm Jumeirah villas and also exploring London as a secondary market. Looking for exclusive, off-market assets and a dedicated relationship manager.',
    read: true,
    source: 'direct',
    createdAt: '2026-04-12T11:22:30.000Z',
  },
  {
    id: 'contact-012',
    firstname: 'Deniz Koç',
    email: 'denizk@techstartup.io',
    phone: '+90 530 991 0055',
    city: 'İstanbul',
    budget: '£200,000 – £350,000',
    interest: 'Londra kiralık gelir yatırımı',
    message: 'Genç bir girişimci olarak birikimlerimi Londra\'da değerlendirmek istiyorum. Küçük bütçeyle hangi bölgeleri tavsiye edersiniz? Yönetim ve kiracı bulma konularında da destek alabilir miyim?',
    read: false,
    source: 'insights-page',
    createdAt: '2026-04-14T14:18:47.000Z',
  },
];

console.log(`\nSeeding contacts (${contacts.length} items)...`);
const contactBatch = db.batch();
for (const c of contacts) {
  const { id, ...rest } = c;
  const ref = db.collection('contacts').doc(id);
  contactBatch.set(ref, rest);
}
await contactBatch.commit();
total += contacts.length;
console.log(`  ✓ ${contacts.length} contacts seeded`);

console.log(`\n✅ Done! Total: ${total} documents seeded to Firestore.`);
process.exit(0);
