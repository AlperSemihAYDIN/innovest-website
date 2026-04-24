/**
 * Dubai emlaklarının heroImage + images alanlarını
 * public/images/properties/dubai/<slug>/ klasörlerinden okuyarak Firestore'a yazar.
 * Kullanım: node scripts/update-dubai-images.mjs
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

const SLUGS = [
  'binghatti-flare',
  'the-alba',
  'binghatti-aquarise',
  'mercedes-benz-places',
  'belgrove-residences',
  'solaya',
  'one-river-point',
  'cala-del-mar',
];

// Hero seçimi: dosya adında bu kelimelerden biri varsa öne çek (sıralı öncelik)
const HERO_OVERRIDE = {
  'the-alba': 'main.jpg',
  'solaya': 'picture-1.jpg',
  'mercedes-benz-places': '25006-aerialnight-shot-final-full.jpg',
};
const HERO_PREFER = ['hero', 'aerial', 'exterior', 'ext-1', 'view-01', 'street-view', 'facade', 'main'];

function pickHero(slug, files) {
  const ov = HERO_OVERRIDE[slug];
  if (ov && files.includes(ov)) return ov;
  for (const kw of HERO_PREFER) {
    const m = files.find((f) => f.toLowerCase().includes(kw));
    if (m) return m;
  }
  return files[0];
}

const now = new Date().toISOString();
for (const slug of SLUGS) {
  const dir = path.join('public', 'images', 'properties', 'dubai', slug);
  const files = readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();
  if (files.length === 0) {
    console.log(`  ! ${slug} → boş`);
    continue;
  }
  const hero = pickHero(slug, files);
  const ordered = [hero, ...files.filter((f) => f !== hero)];
  const images = ordered.map((f) => `/images/properties/dubai/${slug}/${f}`);
  await db.collection('properties').doc(slug).set(
    { heroImage: images[0], images, updatedAt: now },
    { merge: true },
  );
  console.log(`  ✓ ${slug} → ${images.length} görsel (hero: ${hero})`);
}
process.exit(0);
