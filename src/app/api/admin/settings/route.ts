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
      socialLinkedin: 'https://www.linkedin.com/company/innovest-capital/posts/?feedView=all',
      socialInstagram: 'https://www.instagram.com/innovestcapital',
      socialTwitter: '',
    });
  }
  return Response.json(doc.data());
}

export async function PUT(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  const data = await req.json();
  const updatedAt = new Date().toISOString();

  await adminDb.collection('settings').doc('general').set({
    ...data,
    updatedAt,
  }, { merge: true });

  // Sync phone numbers & email to public page docs (footer + contact)
  const phones = [data.phoneLondon, data.phoneDubai, data.phoneTurkey].filter(Boolean) as string[];
  const email = (data.email as string) || 'info@innovest.uk';
  const whatsapp = (data.whatsapp as string) || '';

  await Promise.all([
    adminDb.collection('pages').doc('footer').set(
      { contactInfo: { phones, email }, updatedAt },
      { merge: true }
    ),
    adminDb.collection('pages').doc('contact').set(
      { directContact: { phones, email, whatsapp }, updatedAt },
      { merge: true }
    ),
  ]);

  return Response.json({ success: true });
}
