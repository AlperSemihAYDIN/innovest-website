/**
 * Firestore'da ransomes-wharf ve sterling-place için heroImage + images alanlarını günceller.
 * Kullanım: node scripts/update-london-images.mjs
 */
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

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

const RANSOMES = [
  '/images/properties/london/ransomes-wharf/RSW_EXT_Dusk_Hero_FINAL_2K.jpg',
  '/images/properties/london/ransomes-wharf/RSW_EXT_Hero2_FINAL_2K.jpg',
  '/images/properties/london/ransomes-wharf/RSW_EXT_Hummingbird_FINAL_2K.jpg',
  '/images/properties/london/ransomes-wharf/RSW_EXT_Courtyard_Plaza_FINAL_2K.jpg',
  '/images/properties/london/ransomes-wharf/RSW_EXT_Dock_FINAL_2K.jpg',
  '/images/properties/london/ransomes-wharf/RSW_EXT_Dock_NO_TALENT_FINAL_2K.jpg',
  '/images/properties/london/ransomes-wharf/RSW_EXT_Terrace_FINAL_2K.jpg',
  '/images/properties/london/ransomes-wharf/RSW_EXT_CloseUp_FINAL_2K.jpg',
  '/images/properties/london/ransomes-wharf/RSW_EXT_CoWork_FINAL_2K.jpg',
  '/images/properties/london/ransomes-wharf/RSW_EXT_Deli_FINAL_2K.jpg',
  '/images/properties/london/ransomes-wharf/RSW_INT_Living_Dining_FINAL_2K.jpg',
  '/images/properties/london/ransomes-wharf/RSW_INT_08AKitchen_FINAL_2K.jpg',
  '/images/properties/london/ransomes-wharf/RSW_INT_14EKitchen_FINAL_2K.jpg',
  '/images/properties/london/ransomes-wharf/RSW_INT_18CBedroom_FINAL_2K.jpg',
  '/images/properties/london/ransomes-wharf/RSW_INT_21DBedroom_FINAL_2K.jpg',
  '/images/properties/london/ransomes-wharf/RSW_INT_Ensuite_FINAL_2K.jpg',
];
const STERLING = [
  '/images/properties/london/sterling-place/4129_VIEW_02_HUMMINGBIRD_DRAFT_002-DIFF_SKY.jpg',
  '/images/properties/london/sterling-place/4129_VIEW_01_PODIUM_DRAFT_002.jpg',
  '/images/properties/london/sterling-place/Cam9_Static_3000x0100.jpg',
  '/images/properties/london/sterling-place/Cam10_Static_3000x0100.jpg',
  '/images/properties/london/sterling-place/Cam11_Static_3000x0100.jpg',
  '/images/properties/london/sterling-place/Cam12_Static_3000x0100.jpg',
];

const TARGETS = [
  { slug: 'ransomes-wharf', images: RANSOMES },
  { slug: 'sterling-place', images: STERLING },
];

const now = new Date().toISOString();
for (const { slug, images } of TARGETS) {
  await db.collection('properties').doc(slug).set(
    { heroImage: images[0], images, updatedAt: now },
    { merge: true },
  );
  console.log(`  ✓ ${slug} → ${images.length} görsel güncellendi`);
}
process.exit(0);
