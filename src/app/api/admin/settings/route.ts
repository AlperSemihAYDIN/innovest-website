import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  const doc = await adminDb.collection('settings').doc('general').get();
  if (!doc.exists) {
    return Response.json({
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
    });
  }
  return Response.json(doc.data());
}

export async function PUT(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  const data = await req.json();
  await adminDb.collection('settings').doc('general').set({
    ...data,
    updatedAt: new Date().toISOString(),
  }, { merge: true });
  return Response.json({ success: true });
}
