import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  // NOTE: avoid Firestore orderBy() — it silently EXCLUDES docs missing the order field,
  // which can hide newly-created docs whose name was set to undefined/null. Sort client-side.
  const snapshot = await adminDb.collection('properties').get();
  const properties = snapshot.docs
    .map(doc => ({ id: doc.id, ...(doc.data() as Record<string, unknown>) }))
    .sort((a, b) => String((a as { name?: string }).name ?? a.id).localeCompare(String((b as { name?: string }).name ?? b.id)));
  return Response.json(properties);
}

export async function POST(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  const data = await req.json();
  const docRef = await adminDb.collection('properties').add({
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return Response.json({ id: docRef.id }, { status: 201 });
}
