'use client';

import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';

const defaultTestimonials = [
  {
    quoteEn: "Working with Innovest was transformative for my portfolio. Their deep understanding of the London market and personalised approach helped me secure two premium properties that have exceeded yield expectations.",
    quoteTr: "Innovest ile çalışmak portföyüm için dönüştürücü oldu. Londra pazarını derin anlayışları ve kişiselleştirilmiş yaklaşımları, getiri beklentilerimi aşan iki premium mülk edinmemi sağladı.",
    name: "James Richardson",
    role: "Private Investor, London",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
  },
  {
    quoteEn: "Innovest made the Golden Visa process seamless. From initial consultation to receiving my residence permit, their team handled everything with exceptional professionalism and attention to detail.",
    quoteTr: "Innovest, Altın Vize sürecini sorunsuz hale getirdi. İlk danışmanlıktan oturma iznime kadar ekip her şeyi olağanüstü profesyonellik ve dikkatle yönetti.",
    name: "Ayşe Demir",
    role: "Girişimci, İstanbul",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
  },
  {
    quoteEn: "Their business expansion advisory was invaluable for our UAE market entry. The local connections and strategic guidance they provided accelerated our timeline by at least six months.",
    quoteTr: "İş genişleme danışmanlıkları BAE pazarına girişimiz için paha biçilmezdi. Sağladıkları yerel bağlantılar ve stratejik rehberlik sürecimizi en az altı ay hızlandırdı.",
    name: "Michael Chen",
    role: "CEO, Tech Ventures",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
  },
];

interface TestimonialsProps {
  locale?: 'en' | 'tr';
  testimonials?: Array<{
    quoteEn: string;
    quoteTr: string;
    name: string;
    role: string;
    image: string;
  }> | null;
}

export default function Testimonials({ locale = 'en', testimonials: override }: TestimonialsProps) {
  const tr = locale === 'tr';
  const testimonials = override && override.length > 0 ? override : defaultTestimonials;
  return (
    <section className="py-36 md:py-44 bg-surface min-h-[60vh] flex flex-col justify-center">
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
              <div
                className="h-full flex flex-col transition-colors duration-500"
                style={{
                  padding: '36px 32px',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                {/* Quote mark */}
                <span
                  className="text-7xl text-gold/25 leading-none mb-2 block"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  &ldquo;
                </span>
                <p className="text-base text-white/80 leading-[1.85] flex-1">
                  {tr ? testimonial.quoteTr : testimonial.quoteEn}
                </p>
                <div
                  className="flex items-center gap-4"
                  style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.10)' }}
                >
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
                    <p className="text-base font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-white/55 mt-0.5">{testimonial.role}</p>
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
