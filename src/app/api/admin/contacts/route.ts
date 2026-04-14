import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  const snapshot = await adminDb.collection('contacts').orderBy('createdAt', 'desc').get();
  const contacts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return Response.json(contacts);
}
