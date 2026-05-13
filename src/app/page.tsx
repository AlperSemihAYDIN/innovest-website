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

export default async function Home() {
  const baseDict = getDictionary('en');
  const content = await getHomeContent();
  const dict = mergeHomeIntoDict(baseDict, content, 'en');
  const statsOverride = localizedStats(content, 'en');
  const testimonialsOverride = localizedTestimonials(content);

  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="flex-1">
        <Hero dict={dict} locale="en" />
        <Services dict={dict} locale="en" />
        <Stats locale="en" stats={statsOverride} />
        <FeaturedInvestments dict={dict} locale="en" />
        <WhyInnovest dict={dict} />
        <Process dict={dict} />
        <BuildersMarquee logos={ALL_BUILDERS} title="Our Trusted Developer Partners" />
        {content.testimonials_visible && <Testimonials locale="en" testimonials={testimonialsOverride} />}
        <CallToAction dict={dict} locale="en" />
      </main>
      <Footer dict={dict} locale="en" />
      <AIChat dict={dict} locale="en" />
    </>
  );
}
