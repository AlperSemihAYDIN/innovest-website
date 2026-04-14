import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import KnowledgeHubContent from '@/components/pages/KnowledgeHubContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Knowledge Hub — Innovest Capital',
  description: 'In-depth investment guides covering London and Dubai real estate, residency by investment and international business expansion.',
};

export default function KnowledgeHubPage() {
  const dict = getDictionary('en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <KnowledgeHubContent dict={dict} locale="en" />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
