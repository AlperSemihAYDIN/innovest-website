import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import BusinessContent from '@/components/pages/BusinessContent';
import { getPageContent } from '@/lib/pageContent';
import { mergeBusinessIntoDict, mergeFooterIntoDict } from '@/lib/mergePageContent';
import type { BusinessPageContent, FooterContent } from '@/lib/pageDefaults';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Uluslararası İş Geliştirme ve Genişleme',
  description: 'İngiltere, BAE, AB ve ABD pazarlarına girmek isteyen şirketler için stratejik uluslararası iş geliştirme danışmanlığı.',
};

export default async function BusinessPageTR() {
  const baseDict = getDictionary('tr');
  const [bizContent, footerContent] = await Promise.all([
    getPageContent<BusinessPageContent>('business-expansion'),
    getPageContent<FooterContent>('footer'),
  ]);
  const dict = mergeFooterIntoDict(mergeBusinessIntoDict(baseDict, bizContent, 'tr'), footerContent, 'tr');
  return (
    <>
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <BusinessContent dict={dict} locale="tr" content={bizContent} />
      </main>
      <Footer dict={dict} locale="tr" content={footerContent} />
      <AIChat dict={dict} locale="tr" />
    </>
  );
}
