import { NextRequest } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      return Response.json({ error: 'Invalid file type. Allowed: JPEG, PNG, WebP, AVIF' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return Response.json({ error: 'File too large. Max 10MB' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const { url } = await uploadToCloudinary(buffer, folder, file.type);

    return Response.json({ url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed';
    console.error('[admin/upload] error:', message);
    return Response.json({ error: message }, { status: 500 });
  }
}
