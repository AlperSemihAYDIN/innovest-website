import { getFirebaseAuth } from '@/lib/firebase';
import { compressImage } from '@/lib/imageCompression';

async function getToken(): Promise<string> {
  const auth = getFirebaseAuth();
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  return user.getIdToken();
}

async function apiFetch(url: string, options: RequestInit = {}) {
  const token = await getToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }
  return res.json();
}

export const adminApi = {
  // Properties
  getProperties: () => apiFetch('/api/admin/properties'),
  getProperty: (id: string) => apiFetch(`/api/admin/properties/${id}`),
  createProperty: (data: Record<string, unknown>) => apiFetch('/api/admin/properties', { method: 'POST', body: JSON.stringify(data) }),
  updateProperty: (id: string, data: Record<string, unknown>) => apiFetch(`/api/admin/properties/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProperty: (id: string) => apiFetch(`/api/admin/properties/${id}`, { method: 'DELETE' }),

  // Articles
  getArticles: () => apiFetch('/api/admin/articles'),
  getArticle: (id: string) => apiFetch(`/api/admin/articles/${id}`),
  createArticle: (data: Record<string, unknown>) => apiFetch('/api/admin/articles', { method: 'POST', body: JSON.stringify(data) }),
  updateArticle: (id: string, data: Record<string, unknown>) => apiFetch(`/api/admin/articles/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteArticle: (id: string) => apiFetch(`/api/admin/articles/${id}`, { method: 'DELETE' }),

  // Guides
  getGuides: () => apiFetch('/api/admin/guides'),
  getGuide: (id: string) => apiFetch(`/api/admin/guides/${id}`),
  createGuide: (data: Record<string, unknown>) => apiFetch('/api/admin/guides', { method: 'POST', body: JSON.stringify(data) }),
  updateGuide: (id: string, data: Record<string, unknown>) => apiFetch(`/api/admin/guides/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteGuide: (id: string) => apiFetch(`/api/admin/guides/${id}`, { method: 'DELETE' }),

  // Contacts
  getContacts: () => apiFetch('/api/admin/contacts'),
  markContactRead: (id: string) => apiFetch(`/api/admin/contacts/${id}`, { method: 'PUT', body: JSON.stringify({ read: true }) }),
  deleteContact: (id: string) => apiFetch(`/api/admin/contacts/${id}`, { method: 'DELETE' }),

  // AI Conversations
  getAiConversations: (params?: { date?: string; session_id?: string; q?: string }) => {
    const qs = new URLSearchParams(Object.fromEntries(Object.entries(params || {}).filter(([, v]) => v))).toString();
    return apiFetch(`/api/admin/ai-conversations${qs ? '?' + qs : ''}`);
  },

  // Settings
  getSettings: () => apiFetch('/api/admin/settings'),
  updateSettings: (data: Record<string, unknown>) => apiFetch('/api/admin/settings', { method: 'PUT', body: JSON.stringify(data) }),

  // Pages (editable site content)
  getPage: (slug: string) => apiFetch(`/api/admin/pages/${slug}`),
  updatePage: (slug: string, data: Record<string, unknown>) =>
    apiFetch(`/api/admin/pages/${slug}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Seed
  seed: (collection: string) => apiFetch('/api/admin/seed', { method: 'POST', body: JSON.stringify({ collection }) }),

  // Upload — direct-to-Cloudinary (bypasses Vercel's 4.5MB serverless body limit)
  upload: async (rawFile: File, folder: string) => {
    // Reject formats browsers can't decode/compress (TIFF, HEIC, RAW, BMP)
    const SUPPORTED = /^image\/(jpeg|png|webp|gif|svg\+xml|avif)$/;
    if (!SUPPORTED.test(rawFile.type)) {
      throw new Error(
        `Desteklenmeyen dosya formatı (${rawFile.type || rawFile.name.split('.').pop()}). ` +
          `Lütfen JPG, PNG veya WebP formatında bir görsel yükleyin. ` +
          `TIFF/HEIC/RAW dosyalarını önce JPG'ye dönüştürün.`,
      );
    }

    // Auto-compress oversized photos client-side before upload (max 2560px, JPEG q=0.85)
    let file: File;
    try {
      file = await compressImage(rawFile);
    } catch {
      file = rawFile;
    }

    // Hard cap (Cloudinary free tier ≈ 10MB). After compression this is rarely hit.
    const MAX_BYTES = 10 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      throw new Error(
        `Sıkıştırma sonrası dosya hâlâ çok büyük (${(file.size / 1024 / 1024).toFixed(1)}MB). ` +
          `Lütfen daha küçük bir görsel deneyin.`,
      );
    }

    // 1) Get signed payload from our server (auth required)
    const token = await getToken();
    const sigRes = await fetch('/api/admin/upload-signature', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ folder }),
    });
    if (!sigRes.ok) {
      let message = `Signature failed (${sigRes.status})`;
      try {
        const data = await sigRes.json();
        if (data?.error) message = data.error;
      } catch {}
      throw new Error(message);
    }
    const { cloudName, apiKey, timestamp, signature, folder: signedFolder } = await sigRes.json();

    // 2) Upload directly to Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('folder', signedFolder);
    formData.append('signature', signature);

    const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!cloudRes.ok) {
      let message = `Cloudinary upload failed (${cloudRes.status})`;
      try {
        const data = await cloudRes.json();
        if (data?.error?.message) message = data.error.message;
      } catch {}
      throw new Error(message);
    }
    const data = await cloudRes.json();
    return { url: data.secure_url as string, publicId: data.public_id as string };
  },
};
