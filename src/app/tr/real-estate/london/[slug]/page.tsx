import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import PropertyDetail from '@/components/pages/PropertyDetail';
import { getPropertyBySlug, getPropertiesByCity } from '@/lib/propertyData';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPropertiesByCity('london').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};
  return {
    title: `${property.name} — Londra Gayrimenkul Yatırımı`,
    description: property.description.tr.slice(0, 160),
  };
}

export default async function LondonPropertyPageTR({ params }: Props) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
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
