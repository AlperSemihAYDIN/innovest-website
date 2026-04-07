import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import ResidencyContent from '@/components/pages/ResidencyContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yatırım ile Oturum',
  description: 'Stratejik yatırımlarla oturum veya vatandaşlık hakkı edinin. Dünya genelinde Altın Vize programlarında uzman rehberlik.',
};

export default function ResidencyPageTR() {
  const dict = getDictionary('tr');
  return (
    <>
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <ResidencyContent dict={dict} locale="tr" />
      </main>
      <Footer dict={dict} locale="tr" />
      <AIChat dict={dict} />
    </>
  );
}
