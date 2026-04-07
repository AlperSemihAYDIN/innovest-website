import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import AboutContent from '@/components/pages/AboutContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'Innovest hakkında bilgi edinin – gayrimenkul, oturum programları ve ticari genişleme konularında öncü sınır ötesi yatırım danışmanlık firması.',
};

export default function AboutPageTR() {
  const dict = getDictionary('tr');
  return (
    <>
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <AboutContent dict={dict} locale="tr" />
      </main>
      <Footer dict={dict} locale="tr" />
      <AIChat dict={dict} />
    </>
  );
}
