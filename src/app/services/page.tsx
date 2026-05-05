import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import ServicesContent from '@/components/pages/ServicesContent';
import { getPageContent } from '@/lib/pageContent';
import { mergeServicesIntoDict, mergeFooterIntoDict } from '@/lib/mergePageContent';
import type { ServicesPageContent, FooterContent } from '@/lib/pageDefaults';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Comprehensive investment and advisory services for global investors. Real estate, residency, business expansion and more.',
};

export default async function ServicesPage() {
  const baseDict = getDictionary('en');
  const [servicesContent, footerContent] = await Promise.all([
    getPageContent<ServicesPageContent>('services'),
    getPageContent<FooterContent>('footer'),
  ]);
  const dict = mergeFooterIntoDict(mergeServicesIntoDict(baseDict, servicesContent, 'en'), footerContent, 'en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <ServicesContent dict={dict} locale="en" content={servicesContent} />
      </main>
      <Footer dict={dict} locale="en" content={footerContent} />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
