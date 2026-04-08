'use client';

import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';

const testimonials = [
  {
    quote: "Working with Innovest was transformative for my portfolio. Their deep understanding of the London market and personalised approach helped me secure two premium properties that have exceeded yield expectations.",
    name: "James Richardson",
    role: "Private Investor, London",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
  },
  {
    quote: "Innovest made the Golden Visa process seamless. From initial consultation to receiving my residence permit, their team handled everything with exceptional professionalism and attention to detail.",
    name: "Ayşe Demir",
    role: "Entrepreneur, Istanbul",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
  },
  {
    quote: "Their business expansion advisory was invaluable for our UAE market entry. The local connections and strategic guidance they provided accelerated our timeline by at least six months.",
    name: "Michael Chen",
    role: "CEO, Tech Ventures",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
  },
];

export default function Testimonials() {
  return (
    <section className="py-44 md:py-64 bg-surface">
      <div className="px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <AnimatedSection>
          <div className="text-center mb-20">
            <span className="inline-block text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4">
              Client Testimonials
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-light"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Trusted by{' '}
              <span className="text-gradient-gold">Investors Worldwide</span>
            </h2>
            <div className="gold-line-center mt-6" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={index * 0.15}>
              <div className="bg-background border border-border p-10 h-full flex flex-col text-center">
                {/* Quote mark */}
                <span
                  className="text-5xl text-gold/20 leading-none mb-4"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  &ldquo;
                </span>
                <p className="text-sm text-muted-light leading-relaxed flex-1 mb-6">
                  {testimonial.quote}
                </p>
                <div className="flex items-center justify-center gap-3 pt-6 border-t border-border">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative">
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
