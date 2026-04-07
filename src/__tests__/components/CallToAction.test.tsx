import React from 'react';
import { render, screen } from '@testing-library/react';
import { getDictionary } from '@/lib/dictionary';
import CallToAction from '@/components/home/CallToAction';

describe('CallToAction component', () => {
  const enDict = getDictionary('en');
  const trDict = getDictionary('tr');

  describe('EN locale', () => {
    beforeEach(() => {
      render(<CallToAction dict={enDict} locale="en" />);
    });

    it('renders CTA title', () => {
      expect(screen.getByText(enDict.cta.title)).toBeInTheDocument();
    });

    it('renders CTA title highlight', () => {
      expect(screen.getByText(enDict.cta.titleHighlight)).toBeInTheDocument();
    });

    it('renders CTA subtitle', () => {
      expect(screen.getByText(enDict.cta.subtitle)).toBeInTheDocument();
    });

    it('renders CTA button', () => {
      expect(screen.getByText(enDict.cta.button)).toBeInTheDocument();
    });

    it('CTA button links to /contact', () => {
      const link = screen.getByText(enDict.cta.button).closest('a');
      expect(link).toHaveAttribute('href', '/contact');
    });

    it('renders CTA note text', () => {
      expect(screen.getByText(enDict.cta.note)).toBeInTheDocument();
    });
  });

  describe('TR locale', () => {
    beforeEach(() => {
      render(<CallToAction dict={trDict} locale="tr" />);
    });

    it('renders Turkish CTA button', () => {
      expect(screen.getByText(trDict.cta.button)).toBeInTheDocument();
    });

    it('TR CTA button links to /tr/contact', () => {
      const link = screen.getByText(trDict.cta.button).closest('a');
      expect(link).toHaveAttribute('href', '/tr/contact');
    });
  });
});
