import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import BusinessContent from '@/components/pages/BusinessContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ticari Genişleme & Danışmanlık',
  description: 'İngiltere, BAE, AB ve ABD pazarlarına girmek isteyen şirketler için stratejik ticari genişleme danışmanlığı.',
};

export default function BusinessPageTR() {
  const dict = getDictionary('tr');
  return (
    <>
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <BusinessContent dict={dict} locale="tr" />
      </main>
      <Footer dict={dict} locale="tr" />
      <AIChat dict={dict} locale="tr" />
    </>
  );
}
