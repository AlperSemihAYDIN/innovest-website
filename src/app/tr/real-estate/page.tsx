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
  title: 'Gayrimenkul Yatırım Danışmanlığı',
  description: 'Londra ve Dubai\'de premium gayrimenkul yatırım fırsatları. Uzman danışmanlıkla yüksek getirili projeler.',
};

export default async function RealEstatePageTR() {
  const baseDict = getDictionary('tr');
  const [reContent, footerContent] = await Promise.all([
    getPageContent<RealEstatePageContent>('real-estate'),
    getPageContent<FooterContent>('footer'),
  ]);
  const dict = mergeFooterIntoDict(mergeRealEstateIntoDict(baseDict, reContent, 'tr'), footerContent, 'tr');
  return (
    <>
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <RealEstateContent dict={dict} locale="tr" />
      </main>
      <Footer dict={dict} locale="tr" />
      <AIChat dict={dict} locale="tr" />
    </>
  );
}
