import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import InsightsContent from '@/components/pages/InsightsContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insights & Research',
  description: 'Market insights, investment guides and expert analysis from Innovest advisory team.',
};

export default function InsightsPage() {
  const dict = getDictionary('en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <InsightsContent dict={dict} locale="en" />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} />
    </>
  );
}
