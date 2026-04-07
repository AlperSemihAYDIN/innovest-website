import React from 'react';
import { render, screen } from '@testing-library/react';
import { getDictionary } from '@/lib/dictionary';
import Hero from '@/components/home/Hero';

describe('Hero component', () => {
  const enDict = getDictionary('en');
  const trDict = getDictionary('tr');

  describe('EN locale', () => {
    beforeEach(() => {
      render(<Hero dict={enDict} locale="en" />);
    });

    it('renders hero tagline badge', () => {
      expect(screen.getByText(enDict.hero.tagline)).toBeInTheDocument();
    });

    it('renders hero title parts', () => {
      expect(screen.getByText(enDict.hero.title)).toBeInTheDocument();
      expect(screen.getByText(enDict.hero.titleHighlight)).toBeInTheDocument();
    });

    it('renders hero subtitle', () => {
      expect(screen.getByText(enDict.hero.subtitle)).toBeInTheDocument();
    });

    it('renders primary CTA button', () => {
      const ctaEl = screen.getByText(enDict.hero.cta);
      expect(ctaEl).toBeInTheDocument();
    });

    it('primary CTA links to /contact', () => {
      const ctaLink = screen.getByText(enDict.hero.cta).closest('a');
      expect(ctaLink).toHaveAttribute('href', '/contact');
    });

    it('renders secondary CTA', () => {
      expect(screen.getByText(enDict.hero.ctaSecondary)).toBeInTheDocument();
    });

    it('secondary CTA links to /services', () => {
      const link = screen.getByText(enDict.hero.ctaSecondary).closest('a');
      expect(link).toHaveAttribute('href', '/services');
    });

    it('renders hero stat values', () => {
      expect(screen.getByText(enDict.hero.stat1Value)).toBeInTheDocument();
      expect(screen.getByText(enDict.hero.stat2Value)).toBeInTheDocument();
      expect(screen.getByText(enDict.hero.stat3Value)).toBeInTheDocument();
    });

    it('renders hero stat labels', () => {
      expect(screen.getByText(enDict.hero.stat1Label)).toBeInTheDocument();
      expect(screen.getByText(enDict.hero.stat2Label)).toBeInTheDocument();
      expect(screen.getByText(enDict.hero.stat3Label)).toBeInTheDocument();
    });
  });

  describe('TR locale', () => {
    beforeEach(() => {
      render(<Hero dict={trDict} locale="tr" />);
    });

    it('renders Turkish CTA', () => {
      expect(screen.getByText(trDict.hero.cta)).toBeInTheDocument();
    });

    it('TR primary CTA links to /tr/contact', () => {
      const ctaLink = screen.getByText(trDict.hero.cta).closest('a');
      expect(ctaLink).toHaveAttribute('href', '/tr/contact');
    });

    it('TR secondary CTA links to /tr/services', () => {
      const link = screen.getByText(trDict.hero.ctaSecondary).closest('a');
      expect(link).toHaveAttribute('href', '/tr/services');
    });
  });
});
