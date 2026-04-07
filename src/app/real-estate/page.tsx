import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import RealEstateContent from '@/components/pages/RealEstateContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Estate Investment Advisory',
  description: 'Premium property investment opportunities in London and Dubai. High-yield developments with expert advisory.',
};

export default function RealEstatePage() {
  const dict = getDictionary('en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <RealEstateContent dict={dict} locale="en" />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} />
    </>
  );
}
