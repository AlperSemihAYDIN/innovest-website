import { adminDb } from '@/lib/firebaseAdmin';
import { getPageDefaults, type PageSlug } from '@/lib/pageDefaults';

const ALLOWED: PageSlug[] = ['home', 'about', 'services', 'contact', 'footer'];

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, ctx: RouteContext) {
  const { slug } = await ctx.params;
  if (!(ALLOWED as string[]).includes(slug)) {
    return Response.json({ error: 'Invalid slug' }, { status: 400 });
  }

  try {
    const doc = await adminDb.collection('pages').doc(slug).get();
    const defaults = getPageDefaults(slug as PageSlug);
    const data = doc.exists ? { ...(defaults as object), ...doc.data() } : defaults;
    return Response.json(data);
  } catch {
    return Response.json(getPageDefaults(slug as PageSlug));
  }
}
