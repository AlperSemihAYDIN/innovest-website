import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import CityContent from '@/components/pages/CityContent';
import { allProperties } from '@/lib/propertyData';
import type { PropertyData } from '@/lib/propertyData';
import { adminDb } from '@/lib/firebaseAdmin';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'London Real Estate Investment',
  description: "Premium property investment opportunities in London. High-yield developments in one of the world's most resilient markets.",
};

export default async function LondonPage() {
  const dict = getDictionary('en');
  const d = dict.realEstatePage.london;

  let rawProperties: PropertyData[] = allProperties.filter((p) => p.city === 'london');
  try {
    const snap = await adminDb.collection('properties').where('city', '==', 'london').get();
    if (!snap.empty) {
      rawProperties = snap.docs.map((doc) => doc.data() as PropertyData);
    }
  } catch { /* use static fallback */ }

  const properties = rawProperties.map((p) => ({
    name: p.name,
    developer: p.developer,
    location: p.location,
    price: p.price,
    completion: p.completion,
    beds: p.beds,
    image: p.heroImage,
    slug: p.slug,
  }));

  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <CityContent
          dict={dict}
          locale="en"
          city="London"
          tagline={d.tagline}
          title={d.title}
          titleHighlight={d.titleHighlight}
          subtitle={d.subtitle}
          stats={d.stats}
          properties={properties}
          heroImage="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070"
          mapRegion="UK"
        />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
