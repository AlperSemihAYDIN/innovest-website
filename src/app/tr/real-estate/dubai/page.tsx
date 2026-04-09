import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import CityContent from '@/components/pages/CityContent';
import { getPropertiesByCity } from '@/lib/propertyData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dubai Gayrimenkul Yatırımı',
  description: "Dubai'de premium gayrimenkul yatırım fırsatları. Dünyanın en hızlı büyüyen lüks pazarında vergisiz getiriler.",
};

export default function DubaiPageTR() {
  const dict = getDictionary('tr');
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
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <CityContent
          dict={dict}
          locale="tr"
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
      <Footer dict={dict} locale="tr" />
      <AIChat dict={dict} locale="tr" />
    </>
  );
}
