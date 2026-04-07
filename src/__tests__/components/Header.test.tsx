import React from 'react';
import { render, screen } from '@testing-library/react';
import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';

// next/link ve next/image jest-environment'ta otomatik mock'lanır
// framer-motion moduleNameMapper ile mock'landı

describe('Header component', () => {
  const enDict = getDictionary('en');
  const trDict = getDictionary('tr');

  describe('EN locale', () => {
    beforeEach(() => {
      render(<Header dict={enDict} locale="en" />);
    });

    it('renders INNOVEST brand name', () => {
      expect(screen.getAllByText('INNOVEST').length).toBeGreaterThan(0);
    });

    it('renders Investment Advisory tagline', () => {
      expect(screen.getAllByText(/Investment Advisory/i).length).toBeGreaterThan(0);
    });

    it('renders all nav items', () => {
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About Us')).toBeInTheDocument();
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Insights')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('renders Get Consultation CTA', () => {
      expect(screen.getByText('Get Consultation')).toBeInTheDocument();
    });

    it('renders phone number in topbar', () => {
      expect(screen.getByText(/\+44 7491 510941/)).toBeInTheDocument();
    });

    it('renders email in topbar', () => {
      expect(screen.getByText('info@innovest.uk')).toBeInTheDocument();
    });

    it('renders Mayfair address', () => {
      expect(screen.getByText(/Mayfair/i)).toBeInTheDocument();
    });

    it('CTA button links to /contact', () => {
      const ctaLink = screen.getByText('Get Consultation').closest('a');
      expect(ctaLink).toHaveAttribute('href', '/contact');
    });

    it('language switcher shows Türkçe for switch to TR', () => {
      expect(screen.getByText('Türkçe')).toBeInTheDocument();
    });
  });

  describe('TR locale', () => {
    beforeEach(() => {
      render(<Header dict={trDict} locale="tr" />);
    });

    it('renders Turkish nav items', () => {
      expect(screen.getByText('Ana Sayfa')).toBeInTheDocument();
      expect(screen.getByText('İletişim')).toBeInTheDocument();
    });

    it('renders Danışmanlık Al CTA', () => {
      expect(screen.getByText('Danışmanlık Al')).toBeInTheDocument();
    });

    it('CTA button links to /tr/contact', () => {
      const ctaLink = screen.getByText('Danışmanlık Al').closest('a');
      expect(ctaLink).toHaveAttribute('href', '/tr/contact');
    });

    it('language switcher shows English for switch to EN', () => {
      expect(screen.getByText('English')).toBeInTheDocument();
    });
  });
});
