import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import InsightsContent from '@/components/pages/InsightsContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İçgörüler & Araştırma',
  description: 'Innovest danışmanlık ekibinden pazar içgörüleri, yatırım rehberleri ve uzman analizleri.',
};

export default function InsightsPageTR() {
  const dict = getDictionary('tr');
  return (
    <>
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <InsightsContent dict={dict} locale="tr" />
      </main>
      <Footer dict={dict} locale="tr" />
      <AIChat dict={dict} />
    </>
  );
}
