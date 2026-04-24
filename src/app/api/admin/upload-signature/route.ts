import { NextRequest } from 'next/server';
import { createHash } from 'crypto';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

// Returns a signed payload so the client can upload DIRECTLY to Cloudinary,
// bypassing Vercel's 4.5MB serverless body limit.
export async function POST(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const API_KEY = process.env.CLOUDINARY_API_KEY;
  const API_SECRET = process.env.CLOUDINARY_API_SECRET;

  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    return Response.json({ error: 'Cloudinary not configured' }, { status: 500 });
  }

  let folder = 'uploads';
  try {
    const body = await req.json();
    if (typeof body?.folder === 'string' && body.folder) folder = body.folder;
  } catch {}

  const timestamp = Math.floor(Date.now() / 1000).toString();
  // Params to sign MUST be alphabetical and exactly match what client sends.
  const signatureStr = `folder=${folder}&timestamp=${timestamp}${API_SECRET}`;
  const signature = createHash('sha1').update(signatureStr).digest('hex');

  return Response.json({
    cloudName: CLOUD_NAME,
    apiKey: API_KEY,
    timestamp,
    folder,
    signature,
  });
}
