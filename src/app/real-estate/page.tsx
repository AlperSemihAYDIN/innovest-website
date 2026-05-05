import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import RealEstateContent from '@/components/pages/RealEstateContent';
import { getPageContent } from '@/lib/pageContent';
import { mergeRealEstateIntoDict, mergeFooterIntoDict } from '@/lib/mergePageContent';
import type { RealEstatePageContent, FooterContent } from '@/lib/pageDefaults';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Estate Investment Advisory',
  description: 'Premium property investment opportunities in London and Dubai. High-yield developments with expert advisory.',
};

export default async function RealEstatePage() {
  const baseDict = getDictionary('en');
  const [reContent, footerContent] = await Promise.all([
    getPageContent<RealEstatePageContent>('real-estate'),
    getPageContent<FooterContent>('footer'),
  ]);
  const dict = mergeFooterIntoDict(mergeRealEstateIntoDict(baseDict, reContent, 'en'), footerContent, 'en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <RealEstateContent dict={dict} locale="en" />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
