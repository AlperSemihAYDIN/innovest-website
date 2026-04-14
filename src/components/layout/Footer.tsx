'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionary';

interface FooterProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

export default function Footer({ dict, locale }: FooterProps) {
  const prefix = locale === 'tr' ? '/tr' : '';

  const quickLinks = [
    { label: dict.nav.home, href: `${prefix}/` },
    { label: dict.nav.about, href: `${prefix}/about` },
    { label: dict.nav.services, href: `${prefix}/services` },
    { label: dict.nav.insights, href: `${prefix}/insights` },
    { label: dict.nav.contact, href: `${prefix}/contact` },
  ];

  const serviceLinks = [
    { label: dict.nav.realEstate, href: `${prefix}/real-estate` },
    { label: dict.nav.london, href: `${prefix}/real-estate/london` },
    { label: dict.nav.dubai, href: `${prefix}/real-estate/dubai` },
    { label: dict.nav.residency, href: `${prefix}/residency` },
    { label: dict.nav.businessExpansion, href: `${prefix}/business-expansion` },
  ];

  return (
    <footer className="footer-dark bg-background">
      {/* Breathing room + gold separator */}
      <div className="pt-20">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      {/* Main Footer */}
      <div className="site-container pt-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`${prefix}/`} className="flex items-center gap-3 mb-6">
              <Image
                src="/logo-horizontal-transparent.png"
                alt="Innovest Capital"
                width={140}
                height={70}
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-6">
              {dict.footer.description}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/innovestuk/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-colors"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/people/I-N-N-O-V-E-S-T/61552674123444/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-colors"
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@InnovestUK"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-colors"
                aria-label="YouTube"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/innovest"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-6 text-foreground">
              {dict.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-gold transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-6 text-foreground">
              {dict.footer.ourServices}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-gold transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-6 text-foreground">
              {dict.footer.contactInfo}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted leading-relaxed">
                  {dict.footer.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold flex-shrink-0" />
                <div className="text-sm text-muted space-y-1">
                  <a href="tel:+447491510941" className="block hover:text-gold transition-colors">
                    +44 7491 510941
                  </a>
                  <a href="tel:+971547550101" className="block hover:text-gold transition-colors">
                    +971 54 755 0101
                  </a>
                  <a href="tel:+905314200331" className="block hover:text-gold transition-colors">
                    +90 531 420 0331
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold flex-shrink-0" />
                <a
                  href="mailto:info@innovest.uk"
                  className="text-sm text-muted hover:text-gold transition-colors"
                >
                  info@innovest.uk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/40">
        <div className="site-container py-7">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted">{dict.footer.rights}</p>
            <div className="flex items-center gap-6 text-xs text-muted">
              <Link href={`${prefix}/`} className="hover:text-gold transition-colors">
                {dict.footer.privacy}
              </Link>
              <Link href={`${prefix}/`} className="hover:text-gold transition-colors">
                {dict.footer.terms}
              </Link>
              <Link href={`${prefix}/disclaimer`} className="hover:text-gold transition-colors">
                {locale === 'en' ? 'Disclaimer' : 'Sorumluluk Reddi'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
