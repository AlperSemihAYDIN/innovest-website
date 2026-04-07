import React from 'react';
import { render, screen } from '@testing-library/react';
import { getDictionary } from '@/lib/dictionary';
import Services from '@/components/home/Services';

describe('Services component', () => {
  const enDict = getDictionary('en');
  const trDict = getDictionary('tr');

  describe('EN locale', () => {
    beforeEach(() => {
      render(<Services dict={enDict} locale="en" />);
    });

    it('renders section tagline', () => {
      expect(screen.getByText(enDict.services.tagline)).toBeInTheDocument();
    });

    it('renders section title parts', () => {
      expect(screen.getByText(enDict.services.title)).toBeInTheDocument();
      expect(screen.getByText(enDict.services.titleHighlight)).toBeInTheDocument();
    });

    it('renders Real Estate service title', () => {
      expect(screen.getByText(enDict.services.realEstate.title)).toBeInTheDocument();
    });

    it('renders Residency service title', () => {
      expect(screen.getByText(enDict.services.residency.title)).toBeInTheDocument();
    });

    it('renders Business service title', () => {
      expect(screen.getByText(enDict.services.business.title)).toBeInTheDocument();
    });

    it('renders all 3 service CTA links', () => {
      expect(screen.getByText(enDict.services.realEstate.cta)).toBeInTheDocument();
      expect(screen.getByText(enDict.services.residency.cta)).toBeInTheDocument();
      expect(screen.getByText(enDict.services.business.cta)).toBeInTheDocument();
    });

    it('Real Estate CTA links to /real-estate', () => {
      const link = screen.getByText(enDict.services.realEstate.cta).closest('a');
      expect(link).toHaveAttribute('href', '/real-estate');
    });

    it('Residency CTA links to /residency', () => {
      const link = screen.getByText(enDict.services.residency.cta).closest('a');
      expect(link).toHaveAttribute('href', '/residency');
    });

    it('Business CTA links to /business-expansion', () => {
      const link = screen.getByText(enDict.services.business.cta).closest('a');
      expect(link).toHaveAttribute('href', '/business-expansion');
    });
  });

  describe('TR locale', () => {
    beforeEach(() => {
      render(<Services dict={trDict} locale="tr" />);
    });

    it('renders Turkish service titles', () => {
      expect(screen.getByText(trDict.services.realEstate.title)).toBeInTheDocument();
      expect(screen.getByText(trDict.services.residency.title)).toBeInTheDocument();
      expect(screen.getByText(trDict.services.business.title)).toBeInTheDocument();
    });

    it('TR Real Estate CTA links to /tr/real-estate', () => {
      const link = screen.getByText(trDict.services.realEstate.cta).closest('a');
      expect(link).toHaveAttribute('href', '/tr/real-estate');
    });
  });
});
