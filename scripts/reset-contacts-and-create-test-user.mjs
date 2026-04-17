/**
 * 1) Contacts koleksiyonunu temizler, 1 deneme kaydı bırakır
 * 2) Test admin kullanıcısı oluşturur (zaten varsa atlar)
 */
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
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

const app = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert({
        projectId: env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: env.FIREBASE_ADMIN_PRIVATE_KEY,
      }),
    });

const db = getFirestore(app);
const auth = getAuth(app);

// ─── 1. Contacts temizle ──────────────────────────────────────────────────────
console.log('\n🗑  Contacts koleksiyonu temizleniyor...');
const snap = await db.collection('contacts').get();
const deleteBatch = db.batch();
snap.docs.forEach((doc) => deleteBatch.delete(doc.ref));
await deleteBatch.commit();
console.log(`  ✓ ${snap.size} kayıt silindi`);

// ─── 2. 1 deneme kaydı ekle ───────────────────────────────────────────────────
await db.collection('contacts').doc('deneme-mesaj').set({
  firstname: 'Deneme Kullanıcı',
  email: 'deneme@test.com',
  phone: '+90 000 000 0000',
  city: 'Test Şehir',
  budget: 'Test Bütçe',
  interest: 'Bu bir deneme mesajıdır',
  message: 'Bu mesaj, iletişim formunun çalışıp çalışmadığını test etmek için eklenmiştir. Gerçek bir başvuru değildir.',
  read: false,
  source: 'test',
  createdAt: new Date().toISOString(),
});
console.log('  ✓ Deneme mesajı eklendi');

// ─── 3. Test admin kullanıcısı oluştur ────────────────────────────────────────
const TEST_EMAIL = 'test@innovest.uk';
const TEST_PASSWORD = 'Innovest2026!';

console.log('\n👤 Test admin kullanıcısı kontrol ediliyor...');
try {
  await auth.getUserByEmail(TEST_EMAIL);
  console.log(`  ℹ️  Kullanıcı zaten mevcut: ${TEST_EMAIL}`);
} catch {
  await auth.createUser({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
    displayName: 'Test Kullanıcı',
  });
  console.log(`  ✓ Test kullanıcısı oluşturuldu`);
}

console.log('\n✅ Tamamlandı!');
console.log(`\n   📧 E-posta : ${TEST_EMAIL}`);
console.log(`   🔑 Şifre   : ${TEST_PASSWORD}`);
console.log(`   🔗 Giriş   : https://innovest-website.vercel.app/admin/login`);
process.exit(0);
