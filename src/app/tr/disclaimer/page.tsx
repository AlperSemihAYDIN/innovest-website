import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import DisclaimerContent from '@/components/pages/DisclaimerContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sorumluluk Reddi — Innovest Capital',
  description: 'Innovest Capital danışmanlık hizmetleri, sorumluluk ve geçerli yasalar hakkında önemli sorumluluk reddi.',
};

export default function DisclaimerPage() {
  const dict = getDictionary('tr');
  return (
    <>
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <DisclaimerContent locale="tr" />
      </main>
      <Footer dict={dict} locale="tr" />
      <AIChat dict={dict} locale="tr" />
    </>
  );
}
