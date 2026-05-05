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
    { label: dict.nav.about, href: `${prefix}/about` },
    {
      label: locale === 'tr' ? 'Gayrimenkul' : 'Real Estate',
      href: `${prefix}/real-estate`,
      children: [
        { label: dict.nav.london, href: `${prefix}/real-estate/london` },
        { label: dict.nav.dubai, href: `${prefix}/real-estate/dubai` },
      ],
    },
    {
      label: locale === 'tr' ? 'Hizmetler' : 'Services',
      href: `${prefix}/services`,
      children: [
        { label: dict.nav.residency, href: `${prefix}/residency` },
        { label: dict.nav.businessExpansion, href: `${prefix}/business-expansion` },
        { label: locale === 'tr' ? 'Tüm Hizmetler' : 'All Services', href: `${prefix}/services` },
      ],
    },
    { label: dict.nav.insights, href: `${prefix}/insights` },
    { label: dict.nav.knowledgeHub, href: `${prefix}/knowledge-hub` },
    { label: dict.nav.contact, href: `${prefix}/contact` },
  ];

  return (
    <>
      {/* Top bar — dark premium strip */}
      <div className="hidden lg:block bg-[#051221]">
        <div className="site-container py-3 flex items-center justify-between text-[11px] tracking-[0.08em] text-white/60">
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
        className={`sticky top-0 z-50 transition-all duration-500 bg-[rgba(9,27,42,0.95)] backdrop-blur-md border-b ${
          isScrolled
            ? 'border-border shadow-lg shadow-black/20'
            : 'border-transparent'
        }`}
      >
        <div className="site-container flex items-center h-[72px]">

            {/* Logo — sol, sabit genişlik */}
            <Link href={`${prefix}/`} className="shrink-0 flex items-center group">
              <Image
                src="/logo-nav-transparent.png"
                alt="Innovest Capital"
                width={130}
                height={40}
                className="object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-1 items-center justify-center gap-10 mx-8">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 py-2 text-[12px] tracking-[0.08em] uppercase text-muted-light hover:text-gold transition-colors duration-300 whitespace-nowrap"
                  >
                    {locale === 'tr' ? item.label.toLocaleUpperCase('tr-TR') : item.label}
                    {item.children && <ChevronDown size={14} className="opacity-50" />}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-2 min-w-[200px]"
                        style={{
                          borderRadius: '12px',
                          border: '1px solid rgba(255,255,255,0.08)',
                          background: 'rgba(8,18,38,0.97)',
                          backdropFilter: 'blur(20px)',
                          boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
                          padding: '8px',
                        }}
                      >
                        {item.children.map((child, idx) => {
                          const isAllServices = child.href === item.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block transition-colors duration-150"
                              style={{
                                padding: '12px 20px',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: 400,
                                letterSpacing: '0.02em',
                                color: isAllServices ? '#C9A84C' : 'rgba(255,255,255,0.75)',
                                ...(idx > 0 && { marginTop: '2px' }),
                                ...(isAllServices && {
                                  borderTop: '1px solid rgba(255,255,255,0.08)',
                                  marginTop: '4px',
                                  paddingTop: '16px',
                                }),
                              }}
                              onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                                (e.currentTarget as HTMLElement).style.color = isAllServices ? '#E0CFAB' : 'white';
                              }}
                              onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.background = 'transparent';
                                (e.currentTarget as HTMLElement).style.color = isAllServices ? '#C9A84C' : 'rgba(255,255,255,0.75)';
                              }}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA area removed — İletişim already in nav */}
            <div className="shrink-0 flex items-center gap-4">
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
              <div style={{ padding: '32px 24px' }}>
                <nav>
                  {navItems.map((item) => (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{ fontSize: '16px', fontWeight: '500', color: 'white', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'block' }}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <div style={{ marginTop: '4px', marginBottom: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              style={{ fontSize: '13px', fontWeight: '300', color: 'rgba(255,255,255,0.55)', padding: '10px 0 10px 20px', display: 'block' }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                <div style={{ marginTop: '24px' }}>
                  <Link
                    href={`${altPrefix}/`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 hover:text-gold transition-colors"
                    style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}
                  >
                    <span className="text-base">{altLocale === 'tr' ? '🇹🇷' : '🇬🇧'}</span>
                    {altLocale === 'tr' ? 'Türkçe' : 'English'}
                  </Link>
                </div>

                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                  <a href="tel:+447491510941" className="block hover:text-gold transition-colors" style={{ marginBottom: '8px' }}>
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
