/**
 * Merges Firestore-stored home page content into the static dictionary so
 * existing components keep working without prop changes. Only fields that have
 * a non-empty override are applied — everything else falls through to the
 * dictionary defaults.
 */
import type { Dictionary } from './dictionary';
import type { HomePageContent } from './pageDefaults';

function pick<T>(value: T | undefined | null, fallback: T): T {
  if (value === undefined || value === null) return fallback;
  if (typeof value === 'string' && value.trim() === '') return fallback;
  return value;
}

export function mergeHomeIntoDict(
  dict: Dictionary,
  content: HomePageContent | null | undefined,
  locale: 'en' | 'tr',
): Dictionary {
  if (!content) return dict;
  const tr = locale === 'tr';

  const hero = content.hero;
  const services = content.services;
  const cta = content.cta;
  const stats = content.stats ?? [];

  return {
    ...dict,
    hero: {
      ...dict.hero,
      title: pick(tr ? hero?.titleTr : hero?.titleEn, dict.hero.title),
      titleHighlight: pick(tr ? hero?.titleHighlightTr : hero?.titleHighlightEn, dict.hero.titleHighlight),
      subtitle: pick(tr ? hero?.subtitleTr : hero?.subtitleEn, dict.hero.subtitle),
      cta: pick(tr ? hero?.ctaTr : hero?.ctaEn, dict.hero.cta),
      ctaSecondary: pick(tr ? hero?.ctaSecondaryTr : hero?.ctaSecondaryEn, dict.hero.ctaSecondary),
      stat1Value: pick(stats[0]?.value, dict.hero.stat1Value),
      stat1Label: pick(tr ? stats[0]?.labelTr : stats[0]?.labelEn, dict.hero.stat1Label),
      stat2Value: pick(stats[1]?.value, dict.hero.stat2Value),
      stat2Label: pick(tr ? stats[1]?.labelTr : stats[1]?.labelEn, dict.hero.stat2Label),
      stat3Value: pick(stats[2]?.value, dict.hero.stat3Value),
      stat3Label: pick(tr ? stats[2]?.labelTr : stats[2]?.labelEn, dict.hero.stat3Label),
    },
    services: {
      ...dict.services,
      tagline: pick(tr ? services?.taglineTr : services?.taglineEn, dict.services.tagline),
      title: pick(tr ? services?.titleTr : services?.titleEn, dict.services.title),
      titleHighlight: pick(tr ? services?.titleHighlightTr : services?.titleHighlightEn, dict.services.titleHighlight),
      subtitle: pick(tr ? services?.subtitleTr : services?.subtitleEn, dict.services.subtitle),
      realEstate: {
        ...dict.services.realEstate,
        title: pick(tr ? services?.items?.[0]?.titleTr : services?.items?.[0]?.titleEn, dict.services.realEstate.title),
        desc: pick(tr ? services?.items?.[0]?.descTr : services?.items?.[0]?.descEn, dict.services.realEstate.desc),
        cta: pick(tr ? services?.items?.[0]?.ctaTr : services?.items?.[0]?.ctaEn, dict.services.realEstate.cta),
      },
      residency: {
        ...dict.services.residency,
        title: pick(tr ? services?.items?.[1]?.titleTr : services?.items?.[1]?.titleEn, dict.services.residency.title),
        desc: pick(tr ? services?.items?.[1]?.descTr : services?.items?.[1]?.descEn, dict.services.residency.desc),
        cta: pick(tr ? services?.items?.[1]?.ctaTr : services?.items?.[1]?.ctaEn, dict.services.residency.cta),
      },
      business: {
        ...dict.services.business,
        title: pick(tr ? services?.items?.[2]?.titleTr : services?.items?.[2]?.titleEn, dict.services.business.title),
        desc: pick(tr ? services?.items?.[2]?.descTr : services?.items?.[2]?.descEn, dict.services.business.desc),
        cta: pick(tr ? services?.items?.[2]?.ctaTr : services?.items?.[2]?.ctaEn, dict.services.business.cta),
      },
    },
    cta: {
      ...dict.cta,
      title: pick(tr ? cta?.titleTr : cta?.titleEn, dict.cta.title),
      titleHighlight: pick(tr ? cta?.titleHighlightTr : cta?.titleHighlightEn, dict.cta.titleHighlight),
      subtitle: pick(tr ? cta?.subtitleTr : cta?.subtitleEn, dict.cta.subtitle),
      button: pick(tr ? cta?.buttonTr : cta?.buttonEn, dict.cta.button),
      note: pick(tr ? cta?.noteTr : cta?.noteEn, dict.cta.note),
    },
  };
}

/**
 * Localised testimonials list for direct consumption by `<Testimonials/>`.
 * Returns null if no overrides are configured so the component can keep its
 * own defaults.
 */
export function localizedTestimonials(
  content: HomePageContent | null | undefined,
): HomePageContent['testimonials'] | null {
  if (!content?.testimonials || content.testimonials.length === 0) return null;
  return content.testimonials;
}

/**
 * Localised stats list for `<Stats/>`. Returns null when no overrides are
 * configured.
 */
export function localizedStats(
  content: HomePageContent | null | undefined,
  locale: 'en' | 'tr',
): Array<{ value: string; label: string }> | null {
  const arr = content?.stats;
  if (!arr || arr.length === 0) return null;
  const tr = locale === 'tr';
  return arr.map((s) => ({ value: s.value, label: tr ? s.labelTr : s.labelEn }));
}
