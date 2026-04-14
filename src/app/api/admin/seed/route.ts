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

  if (collection === 'properties' || collection === 'all') {
    for (const prop of allProperties) {
      const ref = adminDb.collection('properties').doc(prop.slug);
      batch.set(ref, { ...prop, createdAt: now, updatedAt: now });
    }
  }

  if (collection === 'articles' || collection === 'all') {
    for (const article of articles) {
      const ref = adminDb.collection('articles').doc(article.slug);
      batch.set(ref, { ...article, createdAt: now, updatedAt: now });
    }
  }

  if (collection === 'guides' || collection === 'all') {
    for (const guide of guides) {
      const ref = adminDb.collection('guides').doc(guide.slug);
      batch.set(ref, { ...guide, createdAt: now, updatedAt: now });
    }
  }

  if (collection === 'settings') {
    const ref = adminDb.collection('settings').doc('general');
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
  }

  await batch.commit();
  return Response.json({ success: true, message: `Seeded: ${collection}` });
}
