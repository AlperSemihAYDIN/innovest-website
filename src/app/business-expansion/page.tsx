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
  title: 'Business Expansion & Advisory',
  description: 'Strategic business expansion advisory for companies entering UK, UAE, EU and US markets.',
};

export default async function BusinessPage() {
  const baseDict = getDictionary('en');
  const [bizContent, footerContent] = await Promise.all([
    getPageContent<BusinessPageContent>('business-expansion'),
    getPageContent<FooterContent>('footer'),
  ]);
  const dict = mergeFooterIntoDict(mergeBusinessIntoDict(baseDict, bizContent, 'en'), footerContent, 'en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <BusinessContent dict={dict} locale="en" />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
