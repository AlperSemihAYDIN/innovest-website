import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import KnowledgeHubContent from '@/components/pages/KnowledgeHubContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bilgi Merkezi — Innovest Capital',
  description: 'Londra ve Dubai gayrimenkul, yatırım ile oturum ve uluslararası iş geliştirme konularında kapsamlı yatırım rehberleri.',
};

export default function KnowledgeHubPage() {
  const dict = getDictionary('tr');
  return (
    <>
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <KnowledgeHubContent dict={dict} locale="tr" />
      </main>
      <Footer dict={dict} locale="tr" />
      <AIChat dict={dict} locale="tr" />
    </>
  );
}
