import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  const { id } = await params;
  const data = await req.json();
  await adminDb.collection('contacts').doc(id).update(data);
  return Response.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  const { id } = await params;
  await adminDb.collection('contacts').doc(id).delete();
  return Response.json({ success: true });
}
