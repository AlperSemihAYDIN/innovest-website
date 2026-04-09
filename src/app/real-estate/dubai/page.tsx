import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import CityContent from '@/components/pages/CityContent';
import { getPropertiesByCity } from '@/lib/propertyData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dubai Real Estate Investment',
  description: "Premium property investment opportunities in Dubai. Tax-free returns in the world's fastest-growing luxury market.",
};

export default function DubaiPage() {
  const dict = getDictionary('en');
  const d = dict.realEstatePage.dubai;
  const properties = getPropertiesByCity('dubai').map((p) => ({
    name: p.name,
    developer: p.developer,
    location: p.location,
    price: p.price,
    yield: p.yield,
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
          city="Dubai"
          tagline={d.tagline}
          title={d.title}
          titleHighlight={d.titleHighlight}
          subtitle={d.subtitle}
          stats={d.stats}
          properties={properties}
          heroImage="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070"
        />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
