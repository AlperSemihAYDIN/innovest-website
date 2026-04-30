import { adminDb } from '@/lib/firebaseAdmin';

export async function GET() {
  try {
    const doc = await adminDb.collection('settings').doc('general').get();
    const data = doc.exists ? doc.data() : {};
    return Response.json({
      instagram: (data?.socialInstagram as string) || 'https://www.instagram.com/innovestcapital',
      linkedin: (data?.socialLinkedin as string) || 'https://www.linkedin.com/company/innovest-capital/posts/?feedView=all',
    });
  } catch {
    return Response.json({
      instagram: 'https://www.instagram.com/innovestcapital',
      linkedin: 'https://www.linkedin.com/company/innovest-capital/posts/?feedView=all',
    });
  }
}
