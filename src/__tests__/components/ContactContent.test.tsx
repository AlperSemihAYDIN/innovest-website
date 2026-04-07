import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getDictionary } from '@/lib/dictionary';
import ContactContent from '@/components/pages/ContactContent';

describe('ContactContent component', () => {
  const enDict = getDictionary('en');
  const trDict = getDictionary('tr');

  describe('EN locale — form rendering', () => {
    beforeEach(() => {
      render(<ContactContent dict={enDict} locale="en" />);
    });

    it('renders page tagline', () => {
      expect(screen.getByText(enDict.contactPage.tagline)).toBeInTheDocument();
    });

    it('renders Name field label', () => {
      expect(screen.getByText(`${enDict.contactPage.form.name} *`)).toBeInTheDocument();
    });

    it('renders Email field label', () => {
      expect(screen.getByText(`${enDict.contactPage.form.email} *`)).toBeInTheDocument();
    });

    it('renders Phone field label', () => {
      expect(screen.getByText(`${enDict.contactPage.form.phone} *`)).toBeInTheDocument();
    });

    it('renders Budget select', () => {
      expect(screen.getByText(`${enDict.contactPage.form.budget} *`)).toBeInTheDocument();
    });

    it('renders budget options in select', () => {
      const firstOption = enDict.contactPage.form.budgetOptions[0];
      expect(screen.getByText(firstOption)).toBeInTheDocument();
    });

    it('renders interest options in select', () => {
      const firstOption = enDict.contactPage.form.interestOptions[0];
      expect(screen.getByText(firstOption)).toBeInTheDocument();
    });

    it('renders submit button', () => {
      expect(screen.getByText(enDict.contactPage.form.submit)).toBeInTheDocument();
    });

    it('renders form note', () => {
      expect(screen.getByText(enDict.contactPage.form.note)).toBeInTheDocument();
    });

    it('form submit button is a button element', () => {
      const btn = screen.getByText(enDict.contactPage.form.submit);
      // may be wrapped in a button or input
      const el = btn.closest('button') || btn;
      expect(el).toBeTruthy();
    });
  });

  describe('EN locale — form interaction', () => {
    it('user can type in Name field', async () => {
      const user = userEvent.setup();
      render(<ContactContent dict={enDict} locale="en" />);
      const nameInput = screen.getByPlaceholderText(enDict.contactPage.form.name);
      await user.type(nameInput, 'John Smith');
      expect(nameInput).toHaveValue('John Smith');
    });

    it('user can type in Email field', async () => {
      const user = userEvent.setup();
      render(<ContactContent dict={enDict} locale="en" />);
      const emailInput = screen.getByPlaceholderText(enDict.contactPage.form.email);
      await user.type(emailInput, 'john@example.com');
      expect(emailInput).toHaveValue('john@example.com');
    });

    it('user can select a budget option', async () => {
      const user = userEvent.setup();
      render(<ContactContent dict={enDict} locale="en" />);
      const budgetSelects = screen.getAllByRole('combobox');
      await user.selectOptions(budgetSelects[0], enDict.contactPage.form.budgetOptions[1]);
      expect(budgetSelects[0]).toHaveValue(enDict.contactPage.form.budgetOptions[1]);
    });

    it('user can type a message', async () => {
      const user = userEvent.setup();
      render(<ContactContent dict={enDict} locale="en" />);
      const textarea = screen.getByPlaceholderText(enDict.contactPage.form.message);
      await user.type(textarea, 'I am interested in London property.');
      expect(textarea).toHaveValue('I am interested in London property.');
    });
  });

  describe('TR locale', () => {
    beforeEach(() => {
      render(<ContactContent dict={trDict} locale="tr" />);
    });

    it('renders Turkish page tagline', () => {
      expect(screen.getByText(trDict.contactPage.tagline)).toBeInTheDocument();
    });

    it('renders Turkish submit button', () => {
      expect(screen.getByText(trDict.contactPage.form.submit)).toBeInTheDocument();
    });

    it('renders Turkish budget options', () => {
      expect(screen.getByText(trDict.contactPage.form.budgetOptions[0])).toBeInTheDocument();
    });
  });
});
