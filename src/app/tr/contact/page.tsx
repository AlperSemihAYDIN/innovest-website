import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import ContactContent from '@/components/pages/ContactContent';
import { getPageContent } from '@/lib/pageContent';
import { mergeContactIntoDict, mergeFooterIntoDict } from '@/lib/mergePageContent';
import type { ContactPageContent, FooterContent } from '@/lib/pageDefaults';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Uzman yatırım danışmanlarımızla ücretsiz bir görüşme planlayın. Küresel yatırım hedefleriniz için kişiselleştirilmiş rehberlik alın.',
};

export default async function ContactPageTR() {
  const baseDict = getDictionary('tr');
  const [contactContent, footerContent] = await Promise.all([
    getPageContent<ContactPageContent>('contact'),
    getPageContent<FooterContent>('footer'),
  ]);
  const dict = mergeFooterIntoDict(mergeContactIntoDict(baseDict, contactContent, 'tr'), footerContent, 'tr');
  return (
    <>
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <ContactContent dict={dict} locale="tr" />
      </main>
      <Footer dict={dict} locale="tr" />
      <AIChat dict={dict} locale="tr" />
    </>
  );
}
