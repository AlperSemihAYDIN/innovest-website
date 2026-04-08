import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import RealEstateContent from '@/components/pages/RealEstateContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gayrimenkul Yatırım Danışmanlığı',
  description: 'Londra ve Dubai\'de premium gayrimenkul yatırım fırsatları. Uzman danışmanlıkla yüksek getirili projeler.',
};

export default function RealEstatePageTR() {
  const dict = getDictionary('tr');
  return (
    <>
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <RealEstateContent dict={dict} locale="tr" />
      </main>
      <Footer dict={dict} locale="tr" />
      <AIChat dict={dict} locale="tr" />
    </>
  );
}
