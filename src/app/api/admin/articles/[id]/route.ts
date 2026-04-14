import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  const { id } = await params;
  const doc = await adminDb.collection('articles').doc(id).get();
  if (!doc.exists) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json({ id: doc.id, ...doc.data() });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  const { id } = await params;
  const data = await req.json();
  await adminDb.collection('articles').doc(id).update({
    ...data,
    updatedAt: new Date().toISOString(),
  });
  return Response.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  const { id } = await params;
  await adminDb.collection('articles').doc(id).delete();
  return Response.json({ success: true });
}
