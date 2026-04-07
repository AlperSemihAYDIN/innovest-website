import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Services from '@/components/home/Services';
import CallToAction from '@/components/home/CallToAction';
import WhyInnovest from '@/components/home/WhyInnovest';
import ContactContent from '@/components/pages/ContactContent';

expect.extend(toHaveNoViolations);

// axe testleri biraz yavaş — timeout artır
jest.setTimeout(30000);

describe('Accessibility (a11y) — axe-core', () => {
  const enDict = getDictionary('en');
  const trDict = getDictionary('tr');

  it('Header (EN) has no accessibility violations', async () => {
    const { container } = render(<Header dict={enDict} locale="en" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Header (TR) has no accessibility violations', async () => {
    const { container } = render(<Header dict={trDict} locale="tr" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Footer (EN) has no accessibility violations', async () => {
    const { container } = render(<Footer dict={enDict} locale="en" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Stats has no accessibility violations', async () => {
    const { container } = render(<Stats />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Hero (EN) has no accessibility violations', async () => {
    const { container } = render(<Hero dict={enDict} locale="en" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Services (EN) has no accessibility violations', async () => {
    const { container } = render(<Services dict={enDict} locale="en" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('WhyInnovest (EN) has no accessibility violations', async () => {
    const { container } = render(<WhyInnovest dict={enDict} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('CallToAction (EN) has no accessibility violations', async () => {
    const { container } = render(<CallToAction dict={enDict} locale="en" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('ContactContent (EN) has no accessibility violations', async () => {
    const { container } = render(<ContactContent dict={enDict} locale="en" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('ContactContent (TR) has no accessibility violations', async () => {
    const { container } = render(<ContactContent dict={trDict} locale="tr" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
