// Cloudinary upload helper (server-side only)
// Free tier: 25 credits/month ≈ 25GB storage + 25GB bandwidth

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string,
  contentType: string,
): Promise<{ url: string; publicId: string }> {
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    throw new Error('Cloudinary environment variables not configured');
  }

  const base64Data = buffer.toString('base64');
  const dataUri = `data:${contentType};base64,${base64Data}`;

  const formData = new FormData();
  formData.append('file', dataUri);
  formData.append('folder', folder);
  formData.append('upload_preset', 'ml_default');

  // Use signed upload for security
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const { createHash } = await import('crypto');
  const signatureStr = `folder=${folder}&timestamp=${timestamp}${API_SECRET}`;
  const signature = createHash('sha1').update(signatureStr).digest('hex');

  const signedForm = new FormData();
  signedForm.append('file', dataUri);
  signedForm.append('folder', folder);
  signedForm.append('timestamp', timestamp);
  signedForm.append('api_key', API_KEY);
  signedForm.append('signature', signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: signedForm },
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Cloudinary upload failed: ${err}`);
  }

  const data = await res.json();
  return { url: data.secure_url, publicId: data.public_id };
}
