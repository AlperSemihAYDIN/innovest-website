'use client';

import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';

const testimonials = [
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
}

export default function Testimonials({ locale = 'en' }: TestimonialsProps) {
  const tr = locale === 'tr';
  const [featured, ...rest] = testimonials;

  return (
    <section className="min-h-screen flex flex-col lg:flex-row bg-surface overflow-hidden">
      {/* Left: full-height image with featured quote overlay */}
      <div className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex flex-col justify-end">
        <Image
          src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1200"
          alt="Client Testimonial"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

        {/* Featured testimonial overlaid at bottom */}
        <div className="relative p-8 md:p-12 lg:p-16 pb-12 lg:pb-16">
          <span
            className="text-7xl text-gold/30 leading-none block mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            &ldquo;
          </span>
          <p className="text-white/90 text-lg lg:text-xl font-light leading-relaxed mb-8 max-w-md">
            {tr ? featured.quoteTr : featured.quoteEn}
          </p>
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold/40 shrink-0">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div>
              <p className="text-white text-sm font-medium">{featured.name}</p>
              <p className="text-white/60 text-xs">{featured.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: heading + remaining testimonials */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-12 lg:px-16 py-24 lg:py-0 bg-surface">
        <AnimatedSection>
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold/50" />
              <span className="inline-block text-gold text-xs md:text-sm tracking-[0.35em] uppercase font-semibold">
                {tr ? 'Müşteri Görüşleri' : 'Client Testimonials'}
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {tr ? 'Dünya Genelinde ' : 'Trusted by '}
              <span className="text-gradient-gold">
                {tr ? 'Yatırımcıların Güveni' : 'Investors Worldwide'}
              </span>
            </h2>
            <div className="w-16 h-px bg-gold/60" />
          </div>
        </AnimatedSection>

        <div className="space-y-6">
          {rest.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={index * 0.15}>
              <div className="bg-background border border-border p-8 hover:border-gold/30 transition-all duration-500">
                <span
                  className="text-4xl text-gold/20 leading-none block mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  &ldquo;
                </span>
                <p className="text-sm text-muted-light leading-relaxed mb-6">
                  {tr ? testimonial.quoteTr : testimonial.quoteEn}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted">{testimonial.role}</p>
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
