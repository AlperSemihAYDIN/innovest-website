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
  title: 'Contact Us',
  description: 'Schedule a complimentary consultation with our expert investment advisors. Get personalised guidance for your global investment goals.',
};

export default async function ContactPage() {
  const baseDict = getDictionary('en');
  const [contactContent, footerContent] = await Promise.all([
    getPageContent<ContactPageContent>('contact'),
    getPageContent<FooterContent>('footer'),
  ]);
  const dict = mergeFooterIntoDict(mergeContactIntoDict(baseDict, contactContent, 'en'), footerContent, 'en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <ContactContent dict={dict} locale="en" content={contactContent} />
      </main>
      <Footer dict={dict} locale="en" content={footerContent} />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
