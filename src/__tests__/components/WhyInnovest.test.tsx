import React from 'react';
import { render, screen } from '@testing-library/react';
import { getDictionary } from '@/lib/dictionary';
import WhyInnovest from '@/components/home/WhyInnovest';

describe('WhyInnovest component', () => {
  const enDict = getDictionary('en');
  const trDict = getDictionary('tr');

  describe('EN locale', () => {
    beforeEach(() => {
      render(<WhyInnovest dict={enDict} />);
    });

    it('renders section tagline', () => {
      expect(screen.getByText(enDict.whyUs.tagline)).toBeInTheDocument();
    });

    it('renders all differentiator titles', () => {
      enDict.whyUs.items.forEach((item) => {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      });
    });

    it('renders all differentiator descriptions', () => {
      enDict.whyUs.items.forEach((item) => {
        expect(screen.getByText(item.desc)).toBeInTheDocument();
      });
    });

    it('renders at least 3 items', () => {
      const descriptions = enDict.whyUs.items.map((i) => i.desc);
      descriptions.forEach((d) => {
        expect(screen.getByText(d)).toBeInTheDocument();
      });
      expect(descriptions.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('TR locale', () => {
    beforeEach(() => {
      render(<WhyInnovest dict={trDict} />);
    });

    it('renders Turkish section tagline', () => {
      expect(screen.getByText(trDict.whyUs.tagline)).toBeInTheDocument();
    });

    it('renders Turkish differentiator titles', () => {
      trDict.whyUs.items.forEach((item) => {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      });
    });
  });
});
