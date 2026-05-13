import { getDictionary } from '@/lib/dictionary';
import { getHomeContent } from '@/lib/pageContent';
import { mergeHomeIntoDict, localizedStats, localizedTestimonials } from '@/lib/mergeHomeContent';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import FeaturedInvestments from '@/components/home/FeaturedInvestments';
import WhyInnovest from '@/components/home/WhyInnovest';
import Stats from '@/components/home/Stats';
import Process from '@/components/home/Process';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';
import BuildersMarquee from '@/components/ui/BuildersMarquee';
import { ALL_BUILDERS } from '@/lib/builders';
import AIChat from '@/components/chat/AIChat';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Innovest – Sınır Ötesi Yatırım Danışmanlığı',
  description: 'İngiltere, BAE ve küresel pazarlarda gayrimenkul yatırımı, oturum programları ve ticari genişleme danışmanlığı.',
};

export default async function HomeTR() {
  const baseDict = getDictionary('tr');
  const content = await getHomeContent();
  const dict = mergeHomeIntoDict(baseDict, content, 'tr');
  const statsOverride = localizedStats(content, 'tr');
  const testimonialsOverride = localizedTestimonials(content);

  return (
    <>
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <Hero dict={dict} locale="tr" />
        <Services dict={dict} locale="tr" />
        <Stats locale="tr" stats={statsOverride} />
        <FeaturedInvestments dict={dict} locale="tr" />
        <WhyInnovest dict={dict} />
        <Process dict={dict} />
        <BuildersMarquee logos={ALL_BUILDERS} title="Güvendiğimiz Geliştirici Markalar" />
        {content.testimonials_visible && <Testimonials locale="tr" testimonials={testimonialsOverride} />}
        <CallToAction dict={dict} locale="tr" />
      </main>
      <Footer dict={dict} locale="tr" />
      <AIChat dict={dict} locale="tr" />
    </>
  );
}
