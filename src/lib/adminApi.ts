import { getFirebaseAuth } from '@/lib/firebase';

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

  // Settings
  getSettings: () => apiFetch('/api/admin/settings'),
  updateSettings: (data: Record<string, unknown>) => apiFetch('/api/admin/settings', { method: 'PUT', body: JSON.stringify(data) }),

  // Seed
  seed: (collection: string) => apiFetch('/api/admin/seed', { method: 'POST', body: JSON.stringify({ collection }) }),

  // Upload
  upload: async (file: File, folder: string) => {
    const token = await getToken();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) {
      let message = `Upload failed (${res.status})`;
      try {
        const data = await res.json();
        if (data?.error) message = data.error;
      } catch {}
      throw new Error(message);
    }
    return res.json();
  },
};
