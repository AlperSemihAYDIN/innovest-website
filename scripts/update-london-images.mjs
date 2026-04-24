/**
 * Firestore'da Londra emlaklarının heroImage + images alanlarını
 * public/images/properties/london/<slug>/ klasörlerinden okuyarak günceller.
 * Kullanım: node scripts/update-london-images.mjs
 */
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync, readdirSync } from 'fs';
import path from 'path';

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

initializeApp({
  credential: cert({
    projectId: env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: env.FIREBASE_ADMIN_PRIVATE_KEY,
  }),
});
const db = getFirestore();

// slug -> hero filename hint (substring); diğerleri sıralı olarak eklenir
const TARGETS = [
  { slug: 'white-city-living', heroHint: 'westmont-and-landscape' },
  { slug: 'sterling-place', heroHint: 'view-02-hummingbird' },
  { slug: 'woolwich-central', heroHint: 'ground-level-hero-final' },
  { slug: 'ransomes-wharf', heroHint: 'dusk-hero' },
  { slug: 'westminster-tower', heroHint: 'view-01-hummingbird' },
];

const now = new Date().toISOString();
for (const { slug, heroHint } of TARGETS) {
  const dir = path.join('public', 'images', 'properties', 'london', slug);
  const files = readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();
  const hero = files.find((f) => f.toLowerCase().includes(heroHint)) || files[0];
  const ordered = [hero, ...files.filter((f) => f !== hero)];
  const images = ordered.map((f) => `/images/properties/london/${slug}/${f}`);
  await db.collection('properties').doc(slug).set(
    { heroImage: images[0], images, updatedAt: now },
    { merge: true },
  );
  console.log(`  ✓ ${slug} → ${images.length} görsel (hero: ${hero})`);
}
process.exit(0);
