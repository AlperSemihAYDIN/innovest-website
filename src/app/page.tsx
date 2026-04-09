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

export default function Home() {
  const dict = getDictionary('en');

  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <Hero dict={dict} locale="en" />
        <Services dict={dict} locale="en" />
        <Stats locale="en" />
        <FeaturedInvestments dict={dict} locale="en" />
        <InvestmentMap locale="en" />
        <WhyInnovest dict={dict} />
        <Process dict={dict} />
        <Testimonials locale="en" />
        <CallToAction dict={dict} locale="en" />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
