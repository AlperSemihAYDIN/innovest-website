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
  updatedAt: now,
}, { merge: true });
console.log('\n  ✓ settings seeded');

console.log(`\n✅ Done! Total: ${total} documents seeded to Firestore.`);
process.exit(0);
