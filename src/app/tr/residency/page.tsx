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
  title: 'Yatırım ile Oturum',
  description: 'Stratejik yatırımlarla oturum veya vatandaşlık hakkı edinin. Dünya genelinde Altın Vize programlarında uzman rehberlik.',
};

export default async function ResidencyPageTR() {
  const baseDict = getDictionary('tr');
  const [resContent, footerContent] = await Promise.all([
    getPageContent<ResidencyPageContent>('residency'),
    getPageContent<FooterContent>('footer'),
  ]);
  const dict = mergeFooterIntoDict(mergeResidencyIntoDict(baseDict, resContent, 'tr'), footerContent, 'tr');
  return (
    <>
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <ResidencyContent dict={dict} locale="tr" content={resContent} />
      </main>
      <Footer dict={dict} locale="tr" content={footerContent} />
      <AIChat dict={dict} locale="tr" />
    </>
  );
}
