import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  // Sort client-side to avoid Firestore orderBy() silently excluding docs missing the field.
  const snapshot = await adminDb.collection('articles').get();
  const articles = snapshot.docs
    .map(doc => ({ id: doc.id, ...(doc.data() as Record<string, unknown>) }))
    .sort((a, b) => {
      const da = String((a as { date?: string }).date ?? '');
      const db = String((b as { date?: string }).date ?? '');
      return db.localeCompare(da);
    });
  return Response.json(articles);
}

export async function POST(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  const data = await req.json();
  const docRef = await adminDb.collection('articles').add({
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return Response.json({ id: docRef.id }, { status: 201 });
}
