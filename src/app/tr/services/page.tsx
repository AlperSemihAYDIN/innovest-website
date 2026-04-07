import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import ServicesContent from '@/components/pages/ServicesContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hizmetlerimiz',
  description: 'Küresel yatırımcılar için kapsamlı yatırım ve danışmanlık hizmetleri. Gayrimenkul, oturum, ticari genişleme ve daha fazlası.',
};

export default function ServicesPageTR() {
  const dict = getDictionary('tr');
  return (
    <>
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <ServicesContent dict={dict} locale="tr" />
      </main>
      <Footer dict={dict} locale="tr" />
      <AIChat dict={dict} />
    </>
  );
}
