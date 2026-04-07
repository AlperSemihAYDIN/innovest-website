import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import ResidencyContent from '@/components/pages/ResidencyContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Residency by Investment',
  description: 'Secure residency or citizenship through strategic investments. Expert guidance on Golden Visa programmes worldwide.',
};

export default function ResidencyPage() {
  const dict = getDictionary('en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <ResidencyContent dict={dict} locale="en" />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} />
    </>
  );
}
