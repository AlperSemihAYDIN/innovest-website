import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import AboutContent from '@/components/pages/AboutContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Innovest - a leading cross-border investment advisory firm specialising in real estate, residency programmes and business expansion.',
};

export default function AboutPage() {
  const dict = getDictionary('en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <AboutContent dict={dict} locale="en" />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
