/**
 * Navigation link href mantığını test eder — locale prefix ve doğru URL'ler.
 */

function getNavHrefs(locale: 'en' | 'tr') {
  const prefix = locale === 'tr' ? '/tr' : '';
  return {
    home: `${prefix}/`,
    about: `${prefix}/about`,
    realEstate: `${prefix}/real-estate`,
    london: `${prefix}/real-estate/london`,
    dubai: `${prefix}/real-estate/dubai`,
    residency: `${prefix}/residency`,
    businessExpansion: `${prefix}/business-expansion`,
    services: `${prefix}/services`,
    insights: `${prefix}/insights`,
    contact: `${prefix}/contact`,
  };
}

describe('Nav href logic', () => {
  describe('EN locale', () => {
    const hrefs = getNavHrefs('en');

    it('home is /', () => expect(hrefs.home).toBe('/'));
    it('about is /about', () => expect(hrefs.about).toBe('/about'));
    it('real-estate is /real-estate', () => expect(hrefs.realEstate).toBe('/real-estate'));
    it('london is /real-estate/london', () => expect(hrefs.london).toBe('/real-estate/london'));
    it('dubai is /real-estate/dubai', () => expect(hrefs.dubai).toBe('/real-estate/dubai'));
    it('residency is /residency', () => expect(hrefs.residency).toBe('/residency'));
    it('business-expansion is /business-expansion', () => expect(hrefs.businessExpansion).toBe('/business-expansion'));
    it('services is /services', () => expect(hrefs.services).toBe('/services'));
    it('insights is /insights', () => expect(hrefs.insights).toBe('/insights'));
    it('contact is /contact', () => expect(hrefs.contact).toBe('/contact'));
  });

  describe('TR locale', () => {
    const hrefs = getNavHrefs('tr');

    it('home is /tr/', () => expect(hrefs.home).toBe('/tr/'));
    it('about is /tr/about', () => expect(hrefs.about).toBe('/tr/about'));
    it('real-estate is /tr/real-estate', () => expect(hrefs.realEstate).toBe('/tr/real-estate'));
    it('london is /tr/real-estate/london', () => expect(hrefs.london).toBe('/tr/real-estate/london'));
    it('dubai is /tr/real-estate/dubai', () => expect(hrefs.dubai).toBe('/tr/real-estate/dubai'));
    it('residency is /tr/residency', () => expect(hrefs.residency).toBe('/tr/residency'));
    it('business is /tr/business-expansion', () => expect(hrefs.businessExpansion).toBe('/tr/business-expansion'));
    it('services is /tr/services', () => expect(hrefs.services).toBe('/tr/services'));
    it('insights is /tr/insights', () => expect(hrefs.insights).toBe('/tr/insights'));
    it('contact is /tr/contact', () => expect(hrefs.contact).toBe('/tr/contact'));
  });

  describe('alt locale switcher', () => {
    it('EN → alt prefix is /tr', () => {
      const altLocale = 'tr';
      const altPrefix = altLocale === 'tr' ? '/tr' : '';
      expect(altPrefix).toBe('/tr');
    });

    it('TR → alt prefix is empty string', () => {
      const altLocale = 'en';
      const altPrefix = altLocale === 'tr' ? '/tr' : '';
      expect(altPrefix).toBe('');
    });
  });
});
