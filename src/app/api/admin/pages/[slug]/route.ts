import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { adminDb } from '@/lib/firebaseAdmin';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';
import { getPageDefaults, type PageSlug } from '@/lib/pageDefaults';

const ALLOWED: PageSlug[] = [
  'home',
  'about',
  'services',
  'real-estate',
  'residency',
  'business-expansion',
  'insights',
  'guides',
  'contact',
  'footer',
];

function isValidSlug(s: string): s is PageSlug {
  return (ALLOWED as string[]).includes(s);
}

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(req: NextRequest, ctx: RouteContext) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  const { slug } = await ctx.params;
  if (!isValidSlug(slug)) {
    return Response.json({ error: 'Invalid slug' }, { status: 400 });
  }

  const doc = await adminDb.collection('pages').doc(slug).get();
  const defaults = getPageDefaults(slug);
  const data = doc.exists ? { ...(defaults as object), ...doc.data() } : defaults;
  return Response.json(data);
}

export async function PUT(req: NextRequest, ctx: RouteContext) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  const { slug } = await ctx.params;
  if (!isValidSlug(slug)) {
    return Response.json({ error: 'Invalid slug' }, { status: 400 });
  }

  const data = await req.json();
  await adminDb.collection('pages').doc(slug).set(
    {
      ...data,
      updatedAt: new Date().toISOString(),
    },
    { merge: false },
  );

  // Revalidate the matching public route(s) so the change shows up almost
  // immediately on the live site without a full redeploy.
  try {
    if (slug === 'home') {
      revalidatePath('/');
      revalidatePath('/tr');
    } else if (slug === 'footer') {
      // Footer renders on layout — invalidate both locales' layouts
      revalidatePath('/', 'layout');
      revalidatePath('/tr', 'layout');
    } else {
      revalidatePath(`/${slug}`);
      revalidatePath(`/tr/${slug}`);
    }
  } catch {
    // revalidate is best-effort; ignore failures so the save still succeeds
  }

  return Response.json({ success: true });
}
