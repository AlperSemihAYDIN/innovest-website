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
    title: `${article.title} — Innovest Capital Insights`,
    description: article.excerpt.slice(0, 160),
  };
}

export default async function InsightsArticlePage({ params }: Props) {
  const { slug } = await params;
  let article: Article | null = getArticleBySlug(slug) ?? null;

  if (!article) {
    try {
      const snap = await adminDb.collection('articles').where('slug', '==', slug).limit(1).get();
      if (!snap.empty) article = snap.docs[0].data() as Article;
    } catch { /* use notFound */ }
  }

  if (!article) notFound();

  const dict = getDictionary('en');
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <ArticleDetail article={article} locale="en" />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
