import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';
import { allProperties } from '@/lib/propertyData';
import { articles } from '@/lib/articleData';
import { guides } from '@/lib/knowledgeHubData';

export async function POST(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  const { collection } = await req.json();
  const batch = adminDb.batch();
  const now = new Date().toISOString();
  let added = 0;
  let skipped = 0;

  // Helper: only write if doc does NOT already exist (preserves admin edits).
  async function addIfMissing(collectionName: string, docId: string, data: object) {
    const ref = adminDb.collection(collectionName).doc(docId);
    const snap = await ref.get();
    if (snap.exists) {
      skipped++;
      return;
    }
    batch.set(ref, { ...data, createdAt: now, updatedAt: now });
    added++;
  }

  if (collection === 'properties' || collection === 'all') {
    for (const prop of allProperties) {
      await addIfMissing('properties', prop.slug, prop);
    }
  }

  if (collection === 'articles' || collection === 'all') {
    for (const article of articles) {
      await addIfMissing('articles', article.slug, article);
    }
  }

  if (collection === 'guides' || collection === 'all') {
    for (const guide of guides) {
      await addIfMissing('guides', guide.slug, guide);
    }
  }

  if (collection === 'settings') {
    const ref = adminDb.collection('settings').doc('general');
    const snap = await ref.get();
    if (!snap.exists) {
      batch.set(ref, {
        companyName: 'Innovest Capital',
        email: 'info@innovest.uk',
        phoneLondon: '+44 7491 510941',
        phoneDubai: '+971 54 755 0101',
        phoneTurkey: '+90 531 420 0331',
        whatsapp: '+447491510941',
        addressLondon: 'Berkeley Square House, 2nd Floor, Berkeley Square, Mayfair, London W1J 6BE',
        socialLinkedin: '',
        socialInstagram: '',
        socialTwitter: '',
        updatedAt: now,
      });
      added++;
    } else {
      skipped++;
    }
  }

  try {
    await batch.commit();
    return Response.json({
      success: true,
      message: `Seeded: ${collection} (eklenen: ${added}, atlanan: ${skipped})`,
      added,
      skipped,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[seed] batch.commit error:', message);
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
