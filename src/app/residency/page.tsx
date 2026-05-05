import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import ResidencyContent from '@/components/pages/ResidencyContent';
import { getPageContent } from '@/lib/pageContent';
import { mergeResidencyIntoDict, mergeFooterIntoDict } from '@/lib/mergePageContent';
import type { ResidencyPageContent, FooterContent } from '@/lib/pageDefaults';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Residency by Investment',
  description: 'Secure residency or citizenship through strategic investments. Expert guidance on Golden Visa programmes worldwide.',
};

export default async function ResidencyPage() {
  const baseDict = getDictionary('en');
  const [resContent, footerContent] = await Promise.all([
    getPageContent<ResidencyPageContent>('residency'),
    getPageContent<FooterContent>('footer'),
  ]);
  const dict = mergeFooterIntoDict(mergeResidencyIntoDict(baseDict, resContent, 'en'), footerContent, 'en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <ResidencyContent dict={dict} locale="en" content={resContent} />
      </main>
      <Footer dict={dict} locale="en" content={footerContent} />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
