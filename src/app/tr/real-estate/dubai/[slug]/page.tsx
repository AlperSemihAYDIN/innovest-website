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

export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPropertiesByCity('dubai').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let property = getPropertyBySlug(slug);
  if (!property) {
    try {
      const snap = await adminDb.collection('properties').where('slug', '==', slug).limit(1).get();
      if (!snap.empty) property = snap.docs[0].data() as PropertyData;
    } catch { /* */ }
  }
  if (!property) return {};
  return {
    title: `${property.name} — Dubai Gayrimenkul Yatırımı`,
    description: property.description.tr.slice(0, 160),
  };
}

export default async function DubaiPropertyPageTR({ params }: Props) {
  const { slug } = await params;
  let property = getPropertyBySlug(slug);
  if (!property) {
    try {
      const snap = await adminDb.collection('properties').where('slug', '==', slug).where('city', '==', 'dubai').limit(1).get();
      if (!snap.empty) property = snap.docs[0].data() as PropertyData;
    } catch { /* */ }
  }
  if (!property || property.city !== 'dubai') notFound();

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
