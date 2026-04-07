'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
      <div className="hidden lg:block bg-foreground">
        <div className="w-full px-10 lg:px-16 max-w-[1600px] mx-auto py-3 flex items-center justify-between text-[11px] tracking-[0.08em] text-white/60">
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
            <Link
              href={`${altPrefix}/`}
              className="flex items-center gap-2 hover:text-white transition-colors duration-300"
            >
              <Globe size={11} />
              {altLocale === 'tr' ? 'Türkçe' : 'English'}
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-md border-b ${
          isScrolled
            ? 'border-border shadow-lg shadow-black/5'
            : 'border-transparent'
        }`}
      >
        <div className="w-full px-10 lg:px-16 max-w-[1600px] mx-auto">
          <div className="flex items-center h-[72px]">
            {/* Logo — fixed left */}
            <Link href={`${prefix}/`} className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative">
                <div className="w-10 h-10 border border-gold flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                  <span className="text-gold font-bold text-lg font-[var(--font-display)]">I</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold tracking-[0.2em] text-foreground">
                  INNOVEST
                </span>
                <span className="text-[9px] tracking-[0.25em] text-muted uppercase">
                  Investment Advisory
                </span>
              </div>
            </Link>

            {/* Desktop Navigation — centered, takes all available space */}
            <nav className="hidden lg:flex flex-1 items-center justify-center gap-6">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 px-5 py-2 text-[12px] tracking-[0.08em] uppercase text-muted-light hover:text-gold transition-colors duration-300 whitespace-nowrap"
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

            {/* CTA + Mobile Toggle — fixed right */}
            <div className="flex items-center gap-4 flex-shrink-0 pr-2">
              <Link
                href={`${prefix}/contact`}
                className="hidden lg:inline-flex items-center px-6 py-2.5 bg-gold text-white text-sm font-medium hover:bg-gold-light transition-colors duration-300 btn-shine"
              >
                {dict.nav.getConsultation}
              </Link>

              {/* Language switcher mobile */}
              <Link
                href={`${altPrefix}/`}
                className="lg:hidden flex items-center gap-1 text-sm text-muted hover:text-gold transition-colors"
              >
                <Globe size={16} />
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
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-surface border-l border-border overflow-y-auto"
            >
              <div className="p-6 pt-20">
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
                      className="text-sm text-muted hover:text-gold transition-colors"
                    >
                      {altLocale === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}
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
