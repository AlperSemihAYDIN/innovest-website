import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import DisclaimerContent from '@/components/pages/DisclaimerContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer — Innovest Capital',
  description: 'Important disclaimer regarding Innovest Capital advisory services, liability and governing law.',
};

export default function DisclaimerPage() {
  const dict = getDictionary('en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <DisclaimerContent locale="en" />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
