import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import ServicesContent from '@/components/pages/ServicesContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Comprehensive investment and advisory services for global investors. Real estate, residency, business expansion and more.',
};

export default function ServicesPage() {
  const dict = getDictionary('en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <ServicesContent dict={dict} locale="en" />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} />
    </>
  );
}
