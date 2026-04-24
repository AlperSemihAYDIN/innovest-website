import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import PropertyDetail from '@/components/pages/PropertyDetail';
import { getPropertyBySlug, getPropertiesByCity } from '@/lib/propertyData';
import type { PropertyData } from '@/lib/propertyData';
import { adminDb } from '@/lib/firebaseAdmin';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPropertiesByCity('london').map((p) => ({ slug: p.slug }));
}

async function loadProperty(slug: string): Promise<PropertyData | null> {
  try {
    const snap = await adminDb
      .collection('properties')
      .where('slug', '==', slug)
      .where('city', '==', 'london')
      .limit(1)
      .get();
    if (!snap.empty) return snap.docs[0].data() as PropertyData;
  } catch { /* fall through to seed */ }
  return getPropertyBySlug(slug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await loadProperty(slug);
  if (!property) return {};
  return {
    title: `${property.name} — Londra Gayrimenkul Yatırımı`,
    description: property.description.tr.slice(0, 160),
  };
}

export default async function LondonPropertyPageTR({ params }: Props) {
  const { slug } = await params;
  const property = await loadProperty(slug);
  if (!property || property.city !== 'london') notFound();

  const dict = getDictionary('tr');
  return (
    <>
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <PropertyDetail property={property} locale="tr" />
      </main>
      <Footer dict={dict} locale="tr" />
      <AIChat dict={dict} locale="tr" />
    </>
  );
}
