import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/chat/AIChat';
import ArticleDetail from '@/components/pages/ArticleDetail';
import { articles, getArticleBySlug, type Article } from '@/lib/articleData';
import { adminDb } from '@/lib/firebaseAdmin';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.titleTr} — Innovest Capital İçgörüler`,
    description: article.excerptTr.slice(0, 160),
  };
}

export default async function InsightsArticlePageTr({ params }: Props) {
  const { slug } = await params;
  let article: Article | null = getArticleBySlug(slug) ?? null;

  if (!article) {
    try {
      const snap = await adminDb.collection('articles').where('slug', '==', slug).limit(1).get();
      if (!snap.empty) article = snap.docs[0].data() as Article;
    } catch { /* use notFound */ }
  }

  if (!article) notFound();

  const dict = getDictionary('tr');
  return (
    <>
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <ArticleDetail article={article} locale="tr" />
      </main>
      <Footer dict={dict} locale="tr" />
      <AIChat dict={dict} locale="tr" />
    </>
  );
}
