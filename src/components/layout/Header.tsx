'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe, Phone } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionary';

interface HeaderProps {
  dict: Dictionary;
  locale: 'en' | 'tr';
}

export default function Header({ dict, locale }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const prefix = locale === 'tr' ? '/tr' : '';
  const altLocale = locale === 'tr' ? 'en' : 'tr';
  const altPrefix = altLocale === 'tr' ? '/tr' : '';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: dict.nav.home, href: `${prefix}/` },
    { label: dict.nav.about, href: `${prefix}/about` },
    {
      label: dict.nav.realEstate,
      href: `${prefix}/real-estate`,
      children: [
        { label: dict.nav.london, href: `${prefix}/real-estate/london` },
        { label: dict.nav.dubai, href: `${prefix}/real-estate/dubai` },
      ],
    },
    { label: dict.nav.residency, href: `${prefix}/residency` },
    { label: dict.nav.businessExpansion, href: `${prefix}/business-expansion` },
    { label: dict.nav.services, href: `${prefix}/services` },
    { label: dict.nav.insights, href: `${prefix}/insights` },
    { label: dict.nav.contact, href: `${prefix}/contact` },
  ];

  return (
    <>
      {/* Top bar — dark premium strip */}
      <div className="hidden lg:block bg-[#0c0c10]">
        <div className="max-w-screen-xl mx-auto px-8 py-3 flex items-center justify-between text-[11px] tracking-[0.08em] text-white/60">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <Phone size={11} className="text-gold" />
              <a href="tel:+447491510941" className="hover:text-white transition-colors duration-300">+44 7491 510941</a>
            </span>
            <span className="w-px h-3 bg-white/15" />
            <a href="mailto:info@innovest.uk" className="hover:text-white transition-colors duration-300">info@innovest.uk</a>
          </div>
          <div className="flex items-center gap-8">
            <span>Berkeley Square, Mayfair, London</span>
            <span className="w-px h-3 bg-white/15" />
            {/* Bayraklı dil seçici */}
            <Link
              href={`${altPrefix}/`}
              className="flex items-center gap-1.5 hover:text-white transition-colors duration-300"
            >
              <span className="text-base leading-none">{altLocale === 'tr' ? '🇹🇷' : '🇬🇧'}</span>
              <span>{altLocale === 'tr' ? 'Türkçe' : 'English'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 bg-[rgba(9,9,11,0.95)] backdrop-blur-md border-b ${
          isScrolled
            ? 'border-border shadow-lg shadow-black/20'
            : 'border-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-8 flex items-center h-[72px]">

            {/* Logo — sol, sabit genişlik */}
            <Link href={`${prefix}/`} className="shrink-0 flex items-center gap-3 group">
              <Image
                src="/logo.jpg"
                alt="Innovest"
                width={44}
                height={44}
                className="rounded-sm"
                priority
              />
              <div className="flex flex-col">
                <span className="text-lg font-semibold tracking-[0.2em] text-foreground">
                  INNOVEST
                </span>
                <span className="text-[9px] tracking-[0.25em] text-muted uppercase">
                  {locale === 'tr' ? 'Yatırım Danışmanlığı' : 'Investment Advisory'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation — flex-1 ile tüm alanı kaplar, öğeler justify-evenly ile yayılır */}
            <nav className="hidden lg:flex flex-1 items-center justify-evenly mx-8">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 px-3 py-2 text-[12px] tracking-[0.08em] uppercase text-muted-light hover:text-gold transition-colors duration-300 whitespace-nowrap"
                  >
                    {item.label}
                    {item.children && <ChevronDown size={14} className="opacity-50" />}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-0 w-56 py-2 bg-background border border-border rounded-sm shadow-xl shadow-black/8"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-muted-light hover:text-gold hover:bg-surface-light transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA — sağ, sabit, navdan tamamen ayrı */}
            <div className="shrink-0 flex items-center gap-4">
              <Link
                href={`${prefix}/contact`}
                className="hidden lg:inline-flex items-center px-6 py-2.5 bg-gold text-white text-sm font-medium hover:bg-gold-light transition-colors duration-300 btn-shine whitespace-nowrap"
              >
                {dict.nav.getConsultation}
              </Link>

              {/* Language switcher mobile */}
              <Link
                href={`${altPrefix}/`}
                aria-label={`Switch to ${altLocale === 'tr' ? 'Turkish' : 'English'}`}
                className="lg:hidden flex items-center gap-1 text-lg hover:opacity-70 transition-opacity"
              >
                {altLocale === 'tr' ? '🇹🇷' : '🇬🇧'}
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-foreground hover:text-gold transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-[72px] h-[calc(100%-72px)] w-80 max-w-[85vw] bg-surface border-l border-border overflow-y-auto"
            >
              <div className="p-6">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 text-base text-muted-light hover:text-gold transition-colors border-b border-border/50"
                      >
                        {item.label}
                      </Link>
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2.5 pl-4 text-sm text-muted hover:text-gold transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </nav>

                <div className="mt-8 space-y-4">
                  <Link
                    href={`${prefix}/contact`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center py-3 bg-gold text-white font-medium hover:bg-gold-light transition-colors"
                  >
                    {dict.nav.getConsultation}
                  </Link>
                  <div className="text-center">
                    <Link
                      href={`${altPrefix}/`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm text-muted hover:text-gold transition-colors flex items-center gap-2 justify-center"
                    >
                      <span className="text-base">{altLocale === 'tr' ? '🇹🇷' : '🇬🇧'}</span>
                      {altLocale === 'tr' ? 'Türkçe' : 'English'}
                    </Link>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border text-sm text-muted space-y-2">
                  <a href="tel:+447491510941" className="block hover:text-gold transition-colors">
                    +44 7491 510941
                  </a>
                  <a href="mailto:info@innovest.uk" className="block hover:text-gold transition-colors">
                    info@innovest.uk
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
