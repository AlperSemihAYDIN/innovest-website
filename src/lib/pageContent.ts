import { adminDb } from '@/lib/firebaseAdmin';
import { getPageDefaults, type PageSlug, type HomePageContent } from './pageDefaults';

/**
 * Server-side helper to fetch a page's content with Firestore override + defaults
 * fallback. Safe to call from server components / `generateMetadata` etc.
 *
 * Returns the merged shape; never throws — falls back to defaults on any error.
 */
export async function getPageContent<T = unknown>(slug: PageSlug): Promise<T> {
  const defaults = getPageDefaults<T>(slug);
  try {
    const doc = await adminDb.collection('pages').doc(slug).get();
    if (!doc.exists) return defaults;
    const data = doc.data() ?? {};
    return { ...(defaults as object), ...data } as T;
  } catch {
    return defaults;
  }
}

export const getHomeContent = () => getPageContent<HomePageContent>('home');
