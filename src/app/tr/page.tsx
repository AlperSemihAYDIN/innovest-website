import { getDictionary } from '@/lib/dictionary';
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
import AIChat from '@/components/chat/AIChat';
import InvestmentMap from '@/components/home/InvestmentMap';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Innovest – Sınır Ötesi Yatırım Danışmanlığı',
  description: 'İngiltere, BAE ve küresel pazarlarda gayrimenkul yatırımı, oturum programları ve ticari genişleme danışmanlığı.',
};

export default function HomeTR() {
  const dict = getDictionary('tr');

  return (
    <>
      <Header dict={dict} locale="tr" />
      <main className="flex-1">
        <Hero dict={dict} locale="tr" />
        <Services dict={dict} locale="tr" />
        <Stats locale="tr" />
        <FeaturedInvestments dict={dict} locale="tr" />
        <InvestmentMap locale="tr" />
        <WhyInnovest dict={dict} />
        <Process dict={dict} />
        <Testimonials locale="tr" />
        <CallToAction dict={dict} locale="tr" />
      </main>
      <Footer dict={dict} locale="tr" />
      <AIChat dict={dict} locale="tr" />
    </>
  );
}
