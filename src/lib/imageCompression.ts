// Client-side image compression: shrinks oversized photos before upload.
// Keeps aspect ratio, max edge = MAX_EDGE px, re-encodes as JPEG.

const MAX_EDGE = 2560;
const JPEG_QUALITY = 0.85;
// Only compress when source is larger than this (avoid re-encoding small files).
const SKIP_IF_BELOW = 2 * 1024 * 1024; // 2MB

export async function compressImage(file: File): Promise<File> {
  // Skip non-raster types (svg, gif animations, etc.)
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file;
  if (file.size < SKIP_IF_BELOW) return file;

  const bitmap = await loadBitmap(file);
  const { width, height } = scaleDown(bitmap.width, bitmap.height, MAX_EDGE);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, width, height);

  const blob = await new Promise<Blob | null>(resolve =>
    canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY),
  );
  if (!blob) return file;

  // If compression somehow made it bigger, keep original
  if (blob.size >= file.size) return file;

  const newName = file.name.replace(/\.(png|webp|jpe?g)$/i, '') + '.jpg';
  return new File([blob], newName, { type: 'image/jpeg', lastModified: Date.now() });
}

async function loadBitmap(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file);
    } catch {
      // fall through to <img> fallback
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Image decode failed'));
      el.src = url;
    });
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function scaleDown(w: number, h: number, maxEdge: number) {
  const longest = Math.max(w, h);
  if (longest <= maxEdge) return { width: w, height: h };
  const ratio = maxEdge / longest;
  return { width: Math.round(w * ratio), height: Math.round(h * ratio) };
}
