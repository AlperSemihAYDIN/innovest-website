import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import CityContent from '@/components/pages/CityContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'London Real Estate Investment',
  description: 'Premium property investment opportunities in London. High-yield developments in one of the world\'s most resilient markets.',
};

const londonProperties = [
  {
    name: 'Westminster Tower',
    developer: 'London Square',
    location: 'SE1 7SP',
    price: '£550,000',
    yield: '5.2%',
    completion: 'Q2 2026',
    beds: '1-3 Bed',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800',
  },
  {
    name: "Ransome's Wharf",
    developer: 'London Square',
    location: 'SW11',
    price: '£725,000',
    yield: '4.8%',
    completion: 'Q4 2026',
    beds: '1-3 Bed',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800',
  },
  {
    name: 'Woolwich Central',
    developer: 'London Square',
    location: 'SE18',
    price: '£380,000',
    yield: '5.5%',
    completion: 'Q1 2027',
    beds: '1-2 Bed',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800',
  },
  {
    name: 'Prince Of Wales Drive',
    developer: 'Berkeley Group',
    location: 'SW11 4FA',
    price: '£850,000',
    yield: '4.5%',
    completion: 'Ready',
    beds: '1-3 Bed',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800',
  },
  {
    name: 'Sterling Place',
    developer: 'Barratt London',
    location: 'SW17 0SR',
    price: '£420,000',
    yield: '5.0%',
    completion: 'Q3 2026',
    beds: 'Studio-2 Bed',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800',
  },
  {
    name: 'White City Living',
    developer: 'Berkeley Group',
    location: 'W12 7RQ',
    price: '£650,000',
    yield: '4.6%',
    completion: 'Ready',
    beds: '1-3 Bed',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800',
  },
];

export default function LondonPage() {
  const dict = getDictionary('en');
  const d = dict.realEstatePage.london;
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
          properties={londonProperties}
          heroImage="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070"
        />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
