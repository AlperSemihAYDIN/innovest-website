import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import BusinessContent from '@/components/pages/BusinessContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Expansion & Advisory',
  description: 'Strategic business expansion advisory for companies entering UK, UAE, EU and US markets.',
};

export default function BusinessPage() {
  const dict = getDictionary('en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <BusinessContent dict={dict} locale="en" />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
