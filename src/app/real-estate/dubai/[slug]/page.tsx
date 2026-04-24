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
  return getPropertiesByCity('dubai').map((p) => ({ slug: p.slug }));
}

async function loadProperty(slug: string): Promise<PropertyData | null> {
  try {
    const snap = await adminDb
      .collection('properties')
      .where('slug', '==', slug)
      .where('city', '==', 'dubai')
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
    title: `${property.name} — Dubai Real Estate Investment`,
    description: property.description.en.slice(0, 160),
  };
}

export default async function DubaiPropertyPage({ params }: Props) {
  const { slug } = await params;
  const property = await loadProperty(slug);
  if (!property || property.city !== 'dubai') notFound();

  const dict = getDictionary('en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <PropertyDetail property={property} locale="en" />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
