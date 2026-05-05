import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import AboutContent from '@/components/pages/AboutContent';
import { getPageContent } from '@/lib/pageContent';
import { mergeAboutIntoDict, mergeFooterIntoDict } from '@/lib/mergePageContent';
import type { AboutPageContent, FooterContent } from '@/lib/pageDefaults';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Innovest - a leading cross-border investment advisory firm specialising in real estate, residency programmes and business expansion.',
};

export default async function AboutPage() {
  const baseDict = getDictionary('en');
  const [aboutContent, footerContent] = await Promise.all([
    getPageContent<AboutPageContent>('about'),
    getPageContent<FooterContent>('footer'),
  ]);
  const dict = mergeFooterIntoDict(mergeAboutIntoDict(baseDict, aboutContent, 'en'), footerContent, 'en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <AboutContent dict={dict} locale="en" content={aboutContent} />
      </main>
      <Footer dict={dict} locale="en" content={footerContent} />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
