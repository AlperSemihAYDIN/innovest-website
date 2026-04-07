/**
 * İletişim formu validasyon mantığını test eder.
 */

type FormData = {
  name: string;
  email: string;
  phone: string;
  budget: string;
  interest: string;
  location: string;
  message: string;
};

function validateForm(data: Partial<FormData>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name is required (min 2 chars)';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Valid email is required';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

describe('Contact form validation', () => {
  describe('email validation', () => {
    it('accepts valid email addresses', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true);
      expect(isValidEmail('investor@innovest.uk')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('notanemail')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('user @domain.com')).toBe(false);
    });
  });

  describe('form validation', () => {
    it('returns no errors for valid input', () => {
      const errors = validateForm({
        name: 'John Smith',
        email: 'john@example.com',
        message: 'I am interested in London properties.',
      });
      expect(Object.keys(errors)).toHaveLength(0);
    });

    it('requires name with min 2 characters', () => {
      const errors = validateForm({ name: 'J', email: 'j@ex.com', message: 'Valid message here' });
      expect(errors.name).toBeTruthy();
    });

    it('allows name with exactly 2 characters', () => {
      const errors = validateForm({ name: 'Jo', email: 'j@ex.com', message: 'Valid message here' });
      expect(errors.name).toBeUndefined();
    });

    it('requires valid email', () => {
      const errors = validateForm({
        name: 'John',
        email: 'invalid-email',
        message: 'Valid message here',
      });
      expect(errors.email).toBeTruthy();
    });

    it('requires message with min 10 chars', () => {
      const errors = validateForm({
        name: 'John',
        email: 'john@ex.com',
        message: 'Short',
      });
      expect(errors.message).toBeTruthy();
    });

    it('flags multiple errors at once', () => {
      const errors = validateForm({
        name: '',
        email: '',
        message: '',
      });
      expect(errors.name).toBeTruthy();
      expect(errors.email).toBeTruthy();
      expect(errors.message).toBeTruthy();
    });

    it('trims whitespace for name and message', () => {
      const errors = validateForm({
        name: '  ',
        email: 'a@b.com',
        message: '     ',
      });
      expect(errors.name).toBeTruthy();
      expect(errors.message).toBeTruthy();
    });
  });
});
