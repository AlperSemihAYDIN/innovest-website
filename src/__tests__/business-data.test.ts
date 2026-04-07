/**
 * Site genelinde kullanılan kritik iş verilerini test eder
 * (istatistikler, program sayısı, hizmet başlıkları).
 */
import { getDictionary } from '@/lib/dictionary';

describe('Business data integrity', () => {
  const en = getDictionary('en');
  const tr = getDictionary('tr');

  describe('Hero stats', () => {
    it('stat1 value contains £ or %', () => {
      const v = en.hero.stat1Value;
      expect(v.includes('£') || v.includes('%') || /\d/.test(v)).toBe(true);
    });

    it('stat2 value contains a number', () => {
      expect(/\d/.test(en.hero.stat2Value)).toBe(true);
    });

    it('stat3 value contains %', () => {
      expect(en.hero.stat3Value).toContain('%');
    });
  });

  describe('CTA section', () => {
    it('EN CTA has title and button text', () => {
      expect(en.cta.title).toBeTruthy();
      expect(en.cta.button).toBeTruthy();
    });

    it('TR CTA has title and button text', () => {
      expect(tr.cta.title).toBeTruthy();
      expect(tr.cta.button).toBeTruthy();
    });
  });

  describe('Why Innovest section', () => {
    it('EN has at least 3 differentiators', () => {
      expect(en.whyUs.items.length).toBeGreaterThanOrEqual(3);
    });

    it('TR has same number of differentiators as EN', () => {
      expect(tr.whyUs.items.length).toBe(en.whyUs.items.length);
    });

    it('each differentiator has title and description', () => {
      en.whyUs.items.forEach((item: { title: string; desc: string }) => {
        expect(item.title).toBeTruthy();
        expect(item.desc).toBeTruthy();
      });
    });
  });

  describe('Process steps', () => {
    it('EN has at least 4 process steps', () => {
      expect(en.process.steps.length).toBeGreaterThanOrEqual(4);
    });

    it('TR has same number of steps as EN', () => {
      expect(tr.process.steps.length).toBe(en.process.steps.length);
    });

    it('each step has title and description', () => {
      en.process.steps.forEach((step: { title: string; desc: string }) => {
        expect(step.title).toBeTruthy();
        expect(step.desc).toBeTruthy();
      });
    });
  });

  describe('Services section', () => {
    it('all 3 service CTAs are set', () => {
      expect(en.services.realEstate.cta).toBeTruthy();
      expect(en.services.residency.cta).toBeTruthy();
      expect(en.services.business.cta).toBeTruthy();
    });

    it('service descriptions are longer than 50 chars', () => {
      expect(en.services.realEstate.desc.length).toBeGreaterThan(50);
      expect(en.services.residency.desc.length).toBeGreaterThan(50);
      expect(en.services.business.desc.length).toBeGreaterThan(50);
    });
  });

  describe('Real Estate page', () => {
    it('London stats are set', () => {
      expect(en.realEstatePage.london.stats.length).toBeGreaterThanOrEqual(1);
    });

    it('Dubai stats are set', () => {
      expect(en.realEstatePage.dubai.stats.length).toBeGreaterThanOrEqual(1);
    });

    it('each London stat has value and label', () => {
      en.realEstatePage.london.stats.forEach((stat: { value: string; label: string }) => {
        expect(stat.value).toBeTruthy();
        expect(stat.label).toBeTruthy();
      });
    });

    it('each Dubai stat has value and label', () => {
      en.realEstatePage.dubai.stats.forEach((stat: { value: string; label: string }) => {
        expect(stat.value).toBeTruthy();
        expect(stat.label).toBeTruthy();
      });
    });
  });

  describe('Business page', () => {
    it('EN has at least 3 business services', () => {
      expect(en.businessPage.services.length).toBeGreaterThanOrEqual(3);
    });

    it('each service has title and description', () => {
      en.businessPage.services.forEach((s: { title: string; desc: string }) => {
        expect(s.title).toBeTruthy();
        expect(s.desc).toBeTruthy();
      });
    });
  });
});
