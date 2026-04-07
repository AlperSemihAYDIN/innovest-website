import { getDictionary } from '@/lib/dictionary';

describe('getDictionary', () => {
  describe('EN locale', () => {
    const dict = getDictionary('en');

    it('returns nav labels in English', () => {
      expect(dict.nav.home).toBe('Home');
      expect(dict.nav.about).toBe('About Us');
      expect(dict.nav.contact).toBe('Contact');
      expect(dict.nav.getConsultation).toBe('Get Consultation');
    });

    it('returns hero content', () => {
      expect(dict.hero.tagline).toBeTruthy();
      expect(dict.hero.title).toBeTruthy();
      expect(dict.hero.titleHighlight).toBeTruthy();
      expect(dict.hero.cta).toBeTruthy();
    });

    it('returns services content', () => {
      expect(dict.services.realEstate.title).toBeTruthy();
      expect(dict.services.residency.title).toBeTruthy();
      expect(dict.services.business.title).toBeTruthy();
    });

    it('has all 3 hero stats', () => {
      expect(dict.hero.stat1Value).toMatch(/\d/);
      expect(dict.hero.stat2Value).toMatch(/\d/);
      expect(dict.hero.stat3Value).toMatch(/\d/);
    });

    it('contact form has all required fields', () => {
      const { form } = dict.contactPage;
      expect(form.name).toBeTruthy();
      expect(form.email).toBeTruthy();
      expect(form.phone).toBeTruthy();
      expect(form.submit).toBeTruthy();
      expect(form.budgetOptions.length).toBeGreaterThan(0);
      expect(form.interestOptions.length).toBeGreaterThan(0);
    });

    it('insights categories exist', () => {
      expect(dict.insightsPage.categories.length).toBeGreaterThan(0);
      expect(dict.insightsPage.categories[0]).toBe('All');
    });

    it('residency programmes have required fields', () => {
      dict.residencyPage.programmes.forEach((programme) => {
        expect(programme.country).toBeTruthy();
        expect(programme.title).toBeTruthy();
        expect(programme.investment).toBeTruthy();
        expect(programme.benefits.length).toBeGreaterThan(0);
        expect(programme.timeline).toBeTruthy();
      });
    });
  });

  describe('TR locale', () => {
    const dict = getDictionary('tr');

    it('returns nav labels in Turkish', () => {
      expect(dict.nav.home).toBe('Ana Sayfa');
      expect(dict.nav.contact).toBe('İletişim');
      expect(dict.nav.getConsultation).toBe('Danışmanlık Al');
    });

    it('has Turkish hero content', () => {
      expect(dict.hero.tagline).toBeTruthy();
      expect(dict.hero.cta).toBeTruthy();
    });

    it('contact form is translated', () => {
      expect(dict.contactPage.form.name).toBe('Ad Soyad');
      expect(dict.contactPage.form.submit).toBe('Danışmanlık Talep Et');
    });

    it('residency programmes are translated', () => {
      dict.residencyPage.programmes.forEach((programme) => {
        expect(programme.country).toBeTruthy();
        expect(programme.benefits.length).toBeGreaterThan(0);
      });
    });
  });

  describe('locale parity', () => {
    const en = getDictionary('en');
    const tr = getDictionary('tr');

    it('TR and EN have same number of residency programmes', () => {
      expect(tr.residencyPage.programmes.length).toBe(en.residencyPage.programmes.length);
    });

    it('TR and EN have same number of interest options', () => {
      expect(tr.contactPage.form.interestOptions.length).toBe(
        en.contactPage.form.interestOptions.length
      );
    });

    it('TR and EN have same number of budget options', () => {
      expect(tr.contactPage.form.budgetOptions.length).toBe(
        en.contactPage.form.budgetOptions.length
      );
    });

    it('TR and EN have same number of insights categories', () => {
      expect(tr.insightsPage.categories.length).toBe(en.insightsPage.categories.length);
    });
  });
});
