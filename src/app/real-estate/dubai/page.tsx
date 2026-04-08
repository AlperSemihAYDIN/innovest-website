import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import CityContent from '@/components/pages/CityContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dubai Real Estate Investment',
  description: 'Premium property investment opportunities in Dubai. Tax-free returns in the world\'s fastest-growing luxury market.',
};

const dubaiProperties = [
  {
    name: 'Binghatti Flare',
    developer: 'Binghatti',
    location: 'Business Bay',
    price: '$380,000',
    yield: '8.5%',
    completion: 'Q1 2027',
    beds: '1-3 Bed',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800',
  },
  {
    name: 'The Alba',
    developer: 'Omniyat',
    location: 'Palm Jumeirah',
    price: '$1,200,000',
    yield: '7.2%',
    completion: 'Q3 2026',
    beds: '2-4 Bed',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800',
  },
  {
    name: 'Binghatti Aquarise',
    developer: 'Binghatti',
    location: 'Al Jaddaf',
    price: '$290,000',
    yield: '9.0%',
    completion: 'Q2 2027',
    beds: 'Studio-2 Bed',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
  },
  {
    name: 'Mercedes-Benz Places',
    developer: 'Binghatti',
    location: 'Downtown Dubai',
    price: '$750,000',
    yield: '7.5%',
    completion: 'Q4 2027',
    beds: '1-3 Bed',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=800',
  },
  {
    name: 'Belgrove Residences',
    developer: 'Ellington',
    location: 'JVC',
    price: '$350,000',
    yield: '8.2%',
    completion: 'Q1 2027',
    beds: '1-2 Bed',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800',
  },
  {
    name: 'Solaya',
    developer: 'Meraas',
    location: 'Jumeirah',
    price: '$950,000',
    yield: '6.8%',
    completion: 'Q2 2027',
    beds: '2-4 Bed',
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=800',
  },
];

export default function DubaiPage() {
  const dict = getDictionary('en');
  const d = dict.realEstatePage.dubai;
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
          properties={dubaiProperties}
          heroImage="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070"
        />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
