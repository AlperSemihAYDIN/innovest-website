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
  title: 'Hizmetlerimiz',
  description: 'Küresel yatırımcılar için kapsamlı yatırım ve danışmanlık hizmetleri. Gayrimenkul, oturum, ticari genişleme ve daha fazlası.',
};

export default async function ServicesPageTR() {
  const baseDict = getDictionary('tr');
  const [servicesContent, footerContent] = await Promise.all([
    getPageContent<ServicesPageContent>('services'),
    getPageContent<FooterContent>('footer'),
  ]);
  const dict = mergeFooterIntoDict(mergeServicesIntoDict(baseDict, servicesContent, 'tr'), footerContent, 'tr');
  return (
    <>
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <ServicesContent dict={dict} locale="tr" />
      </main>
      <Footer dict={dict} locale="tr" />
      <AIChat dict={dict} locale="tr" />
    </>
  );
}
