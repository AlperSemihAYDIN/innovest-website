import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import GuideDetail from '@/components/pages/GuideDetail';
import { guides, getGuideBySlug, type Guide } from '@/lib/knowledgeHubData';
import { adminDb } from '@/lib/firebaseAdmin';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} — Innovest Capital Knowledge Hub`,
    description: guide.excerpt.slice(0, 160),
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  let guide: Guide | null = getGuideBySlug(slug) ?? null;

  if (!guide) {
    try {
      const snap = await adminDb.collection('guides').where('slug', '==', slug).limit(1).get();
      if (!snap.empty) guide = snap.docs[0].data() as Guide;
    } catch { /* use notFound */ }
  }

  if (!guide) notFound();

  const dict = getDictionary('en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <GuideDetail guide={guide} locale="en" />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
