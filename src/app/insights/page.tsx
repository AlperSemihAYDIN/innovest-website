import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import InsightsContent from '@/components/pages/InsightsContent';
import { getPageContent } from '@/lib/pageContent';
import { mergeInsightsIntoDict, mergeFooterIntoDict } from '@/lib/mergePageContent';
import type { InsightsPageContent, FooterContent } from '@/lib/pageDefaults';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insights & Research',
  description: 'Market insights, investment guides and expert analysis from Innovest advisory team.',
};

export default async function InsightsPage() {
  const baseDict = getDictionary('en');
  const [insContent, footerContent] = await Promise.all([
    getPageContent<InsightsPageContent>('insights'),
    getPageContent<FooterContent>('footer'),
  ]);
  const dict = mergeFooterIntoDict(mergeInsightsIntoDict(baseDict, insContent, 'en'), footerContent, 'en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <InsightsContent dict={dict} locale="en" />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
