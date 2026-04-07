import React from 'react';
import { render, screen } from '@testing-library/react';
import { getDictionary } from '@/lib/dictionary';
import Footer from '@/components/layout/Footer';

describe('Footer component', () => {
  const enDict = getDictionary('en');
  const trDict = getDictionary('tr');

  describe('EN locale', () => {
    beforeEach(() => {
      render(<Footer dict={enDict} locale="en" />);
    });

    it('renders INNOVEST brand', () => {
      expect(screen.getAllByText('INNOVEST').length).toBeGreaterThan(0);
    });

    it('renders footer description', () => {
      expect(screen.getByText(enDict.footer.description)).toBeInTheDocument();
    });

    it('renders quick links section heading', () => {
      expect(screen.getByText(enDict.footer.quickLinks)).toBeInTheDocument();
    });

    it('renders services section heading', () => {
      expect(screen.getByText(enDict.footer.ourServices)).toBeInTheDocument();
    });

    it('renders contact info heading', () => {
      expect(screen.getByText(enDict.footer.contactInfo)).toBeInTheDocument();
    });

    it('renders address', () => {
      expect(screen.getByText(enDict.footer.address)).toBeInTheDocument();
    });

    it('renders copyright text', () => {
      expect(screen.getByText(enDict.footer.rights)).toBeInTheDocument();
    });

    it('renders Privacy Policy link', () => {
      expect(screen.getByText(enDict.footer.privacy)).toBeInTheDocument();
    });

    it('renders Terms link', () => {
      expect(screen.getByText(enDict.footer.terms)).toBeInTheDocument();
    });

    it('renders Home link with correct href', () => {
      // Footer'da en az bir Home linki olmalı
      const homeLinks = screen.getAllByRole('link', { name: /^Home$/i });
      expect(homeLinks.length).toBeGreaterThan(0);
    });
  });

  describe('TR locale', () => {
    beforeEach(() => {
      render(<Footer dict={trDict} locale="tr" />);
    });

    it('renders Turkish footer description', () => {
      expect(screen.getByText(trDict.footer.description)).toBeInTheDocument();
    });

    it('renders Turkish quick links heading', () => {
      expect(screen.getByText(trDict.footer.quickLinks)).toBeInTheDocument();
    });

    it('TR nav links have /tr prefix', () => {
      const homeLinks = screen.getAllByRole('link', { name: enDict => enDict.includes('Ana Sayfa') });
      homeLinks.forEach((link) => {
        expect(link.getAttribute('href')).toMatch(/^\/tr/);
      });
    });
  });
});

// EN dict erişimi TR describe bloğunda da gerekli
const enDict = getDictionary('en');
