'use client';

import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';

const testimonials = [
  {
    quoteEn: "Working with Innovest was transformative for my portfolio. Their deep understanding of the London market and personalised approach helped me secure two premium properties that have exceeded yield expectations.",
    quoteTr: "Innovest ile çalışmak portföyüm için dönüştürücü oldu. Londra pazarını derin anlayışları ve kişiselleştirilmiş yaklaşımları, getiri beklentilerimi aşan iki premium mülk edinmemi sağladı.",
    name: "James Richardson",
    role: "Private Investor, London",
    image: "/stocks/charlesdeluvio.jpg",
  },
  {
    quoteEn: "Innovest made the Golden Visa process seamless. From initial consultation to receiving my residence permit, their team handled everything with exceptional professionalism and attention to detail.",
    quoteTr: "Innovest, Altın Vize sürecini sorunsuz hale getirdi. İlk danışmanlıktan oturma iznime kadar ekip her şeyi olağanüstü profesyonellik ve dikkatle yönetti.",
    name: "Ayşe Demir",
    role: "Girişimci, İstanbul",
    image: "/stocks/sasun-bughdaryan.jpg",
  },
  {
    quoteEn: "Their business expansion advisory was invaluable for our UAE market entry. The local connections and strategic guidance they provided accelerated our timeline by at least six months.",
    quoteTr: "İş genişleme danışmanlıkları BAE pazarına girişimiz için paha biçilmezdi. Sağladıkları yerel bağlantılar ve stratejik rehberlik sürecimizi en az altı ay hızlandırdı.",
    name: "Michael Chen",
    role: "CEO, Tech Ventures",
    image: "/stocks/obi.jpg",
  },
];

interface TestimonialsProps {
  locale?: 'en' | 'tr';
}

export default function Testimonials({ locale = 'en' }: TestimonialsProps) {
  const tr = locale === 'tr';
  return (
    <section className="py-32 md:py-40 bg-surface min-h-[60vh] flex flex-col justify-center">
      <div className="site-container flex flex-col items-center">
        {/* Heading — centered */}
        <AnimatedSection className="w-full flex justify-center">
          <div className="text-center mb-24 max-w-3xl w-full">
            <div className="flex items-center gap-4 justify-center mb-6">
              <div className="w-12 h-px bg-gold/50" />
              <span className="inline-block text-gold text-xs md:text-sm tracking-[0.35em] uppercase font-semibold">
                {tr ? 'Müşteri Görüşleri' : 'Client Testimonials'}
              </span>
              <div className="w-12 h-px bg-gold/50" />
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {tr ? 'Dünya Genelinde ' : 'Trusted by '}
              <span className="text-gradient-gold">{tr ? 'Yatırımcıların Güveni' : 'Investors Worldwide'}</span>
            </h2>
            <div className="gold-line-center mt-8" />
          </div>
        </AnimatedSection>

        {/* Cards — slightly bigger */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={index * 0.15}>
              <div className="bg-background/60 hover:bg-background transition-colors duration-500 px-10 py-14 h-full flex flex-col rounded-2xl">
                {/* Quote mark */}
                <span
                  className="text-7xl text-gold/25 leading-none mb-8 block"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  &ldquo;
                </span>
                <p className="text-base text-muted-light leading-[1.85] flex-1 mb-10">
                  {tr ? testimonial.quoteTr : testimonial.quoteEn}
                </p>
                <div className="flex items-center gap-4 pt-8 border-t border-border/40">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted mt-0.5">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
