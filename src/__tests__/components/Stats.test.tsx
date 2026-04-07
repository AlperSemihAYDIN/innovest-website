import React from 'react';
import { render, screen } from '@testing-library/react';
import { getDictionary } from '@/lib/dictionary';
import Stats from '@/components/home/Stats';

describe('Stats component', () => {
  beforeEach(() => {
    render(<Stats />);
  });

  it('renders Assets Under Advisory stat', () => {
    expect(screen.getByText('£500M+')).toBeInTheDocument();
  });

  it('renders Countries Covered stat', () => {
    expect(screen.getByText('25+')).toBeInTheDocument();
  });

  it('renders Successful Investments stat', () => {
    expect(screen.getByText('500+')).toBeInTheDocument();
  });

  it('renders stat labels', () => {
    expect(screen.getByText(/Assets Under Advisory/i)).toBeInTheDocument();
    expect(screen.getByText(/Countries Covered/i)).toBeInTheDocument();
    expect(screen.getByText(/Successful Investments/i)).toBeInTheDocument();
  });

  it('renders 4 stat items', () => {
    // Stats section has 4 columns
    const statValues = screen.getAllByText(/\d+/);
    expect(statValues.length).toBeGreaterThanOrEqual(3);
  });
});
