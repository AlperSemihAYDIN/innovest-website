/**
 * Server-side merge helpers that fold Firestore-stored page documents into
 * the static `Dictionary` so existing client components keep working without
 * any prop changes. For every field, if the override value is missing or an
 * empty string we fall back to the dictionary default.
 *
 * Mirrors the shape of `mergeHomeContent.ts` for the remaining 7 pages plus
 * the footer.
 */
import type { Dictionary } from './dictionary';
import type {
  AboutPageContent,
  ServicesPageContent,
  RealEstatePageContent,
  ResidencyPageContent,
  BusinessPageContent,
  InsightsPageContent,
  ContactPageContent,
  FooterContent,
} from './pageDefaults';

function pick<T>(value: T | undefined | null, fallback: T): T {
  if (value === undefined || value === null) return fallback;
  if (typeof value === 'string' && value.trim() === '') return fallback;
  return value;
}

function pickArr<T>(value: T[] | undefined | null, fallback: T[]): T[] {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  return value;
}

type Locale = 'en' | 'tr';

/* ──────────────────────────────────────────────────────────────────────── */
/*  ABOUT                                                                  */
/* ──────────────────────────────────────────────────────────────────────── */
export function mergeAboutIntoDict(
  dict: Dictionary,
  content: AboutPageContent | null | undefined,
  locale: Locale,
): Dictionary {
  if (!content) return dict;
  const tr = locale === 'tr';
  const { hero, mission, vision, values } = content;

  const mergedValues = (values?.items ?? []).map((item, i) => ({
    title: pick(tr ? item.titleTr : item.titleEn, dict.about.values[i]?.title ?? ''),
    desc: pick(tr ? item.descTr : item.descEn, dict.about.values[i]?.desc ?? ''),
  }));

  return {
    ...dict,
    about: {
      ...dict.about,
      title: pick(tr ? hero?.titleTr : hero?.titleEn, dict.about.title),
      titleHighlight: pick(tr ? hero?.titleHighlightTr : hero?.titleHighlightEn, dict.about.titleHighlight),
      subtitle: pick(tr ? hero?.subtitleTr : hero?.subtitleEn, dict.about.subtitle),
      mission: {
        title: pick(tr ? mission?.titleTr : mission?.titleEn, dict.about.mission.title),
        desc: pick(tr ? mission?.descTr : mission?.descEn, dict.about.mission.desc),
      },
      vision: {
        title: pick(tr ? vision?.titleTr : vision?.titleEn, dict.about.vision.title),
        desc: pick(tr ? vision?.descTr : vision?.descEn, dict.about.vision.desc),
      },
      values: pickArr(mergedValues, dict.about.values),
    },
  };
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  SERVICES                                                               */
/* ──────────────────────────────────────────────────────────────────────── */
export function mergeServicesIntoDict(
  dict: Dictionary,
  content: ServicesPageContent | null | undefined,
  locale: Locale,
): Dictionary {
  if (!content) return dict;
  const tr = locale === 'tr';
  const { hero } = content;
  return {
    ...dict,
    servicesPage: {
      ...dict.servicesPage,
      title: pick(tr ? hero?.titleTr : hero?.titleEn, dict.servicesPage.title),
      titleHighlight: pick(tr ? hero?.titleHighlightTr : hero?.titleHighlightEn, dict.servicesPage.titleHighlight),
      subtitle: pick(tr ? hero?.subtitleTr : hero?.subtitleEn, dict.servicesPage.subtitle),
    },
  };
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  REAL ESTATE                                                            */
/* ──────────────────────────────────────────────────────────────────────── */
export function mergeRealEstateIntoDict(
  dict: Dictionary,
  content: RealEstatePageContent | null | undefined,
  locale: Locale,
): Dictionary {
  if (!content) return dict;
  const tr = locale === 'tr';
  const { hero, markets } = content;

  const londonStats = markets?.[0]?.stats?.map((s) => ({
    value: s.value,
    label: tr ? s.labelTr : s.labelEn,
  }));
  const dubaiStats = markets?.[1]?.stats?.map((s) => ({
    value: s.value,
    label: tr ? s.labelTr : s.labelEn,
  }));

  return {
    ...dict,
    realEstatePage: {
      ...dict.realEstatePage,
      title: pick(tr ? hero?.titleTr : hero?.titleEn, dict.realEstatePage.title),
      titleHighlight: pick(tr ? hero?.titleHighlightTr : hero?.titleHighlightEn, dict.realEstatePage.titleHighlight),
      subtitle: pick(tr ? hero?.subtitleTr : hero?.subtitleEn, dict.realEstatePage.subtitle),
      london: {
        ...dict.realEstatePage.london,
        stats: pickArr(londonStats ?? [], dict.realEstatePage.london.stats),
      },
      dubai: {
        ...dict.realEstatePage.dubai,
        stats: pickArr(dubaiStats ?? [], dict.realEstatePage.dubai.stats),
      },
    },
  };
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  RESIDENCY                                                              */
/* ──────────────────────────────────────────────────────────────────────── */
export function mergeResidencyIntoDict(
  dict: Dictionary,
  content: ResidencyPageContent | null | undefined,
  locale: Locale,
): Dictionary {
  if (!content) return dict;
  const tr = locale === 'tr';
  const { hero, programmes } = content;

  const mergedProgrammes = (programmes ?? []).map((p, i) => {
    const fallback = dict.residencyPage.programmes[i];
    return {
      country: pick(p.country, fallback?.country ?? ''),
      title: pick(tr ? p.titleTr : p.titleEn, fallback?.title ?? ''),
      investment: pick(tr ? p.investmentTr : p.investmentEn, fallback?.investment ?? ''),
      timeline: pick(tr ? p.timelineTr : p.timelineEn, fallback?.timeline ?? ''),
      benefits: pickArr(tr ? p.benefitsTr : p.benefitsEn, fallback?.benefits ?? []),
    };
  });

  return {
    ...dict,
    residencyPage: {
      ...dict.residencyPage,
      title: pick(tr ? hero?.titleTr : hero?.titleEn, dict.residencyPage.title),
      titleHighlight: pick(tr ? hero?.titleHighlightTr : hero?.titleHighlightEn, dict.residencyPage.titleHighlight),
      subtitle: pick(tr ? hero?.subtitleTr : hero?.subtitleEn, dict.residencyPage.subtitle),
      programmes: pickArr(mergedProgrammes, dict.residencyPage.programmes),
    },
  };
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  BUSINESS                                                               */
/* ──────────────────────────────────────────────────────────────────────── */
export function mergeBusinessIntoDict(
  dict: Dictionary,
  content: BusinessPageContent | null | undefined,
  locale: Locale,
): Dictionary {
  if (!content) return dict;
  const tr = locale === 'tr';
  const { hero, services } = content;

  const mergedServices = (services ?? []).map((s, i) => ({
    title: pick(tr ? s.titleTr : s.titleEn, dict.businessPage.services[i]?.title ?? ''),
    desc: pick(tr ? s.descTr : s.descEn, dict.businessPage.services[i]?.desc ?? ''),
  }));

  return {
    ...dict,
    businessPage: {
      ...dict.businessPage,
      title: pick(tr ? hero?.titleTr : hero?.titleEn, dict.businessPage.title),
      titleHighlight: pick(tr ? hero?.titleHighlightTr : hero?.titleHighlightEn, dict.businessPage.titleHighlight),
      subtitle: pick(tr ? hero?.subtitleTr : hero?.subtitleEn, dict.businessPage.subtitle),
      services: pickArr(mergedServices, dict.businessPage.services),
    },
  };
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  INSIGHTS                                                               */
/* ──────────────────────────────────────────────────────────────────────── */
export function mergeInsightsIntoDict(
  dict: Dictionary,
  content: InsightsPageContent | null | undefined,
  locale: Locale,
): Dictionary {
  if (!content) return dict;
  const tr = locale === 'tr';
  const { hero, categoriesEn, categoriesTr, cta } = content;
  const categories = tr ? categoriesTr : categoriesEn;

  return {
    ...dict,
    insightsPage: {
      ...dict.insightsPage,
      title: pick(tr ? hero?.titleTr : hero?.titleEn, dict.insightsPage.title),
      titleHighlight: pick(tr ? hero?.titleHighlightTr : hero?.titleHighlightEn, dict.insightsPage.titleHighlight),
      subtitle: pick(tr ? hero?.subtitleTr : hero?.subtitleEn, dict.insightsPage.subtitle),
      readMore: pick(tr ? cta?.buttonTextTr : cta?.buttonTextEn, dict.insightsPage.readMore),
      categories: pickArr(categories, dict.insightsPage.categories),
    },
  };
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  CONTACT                                                                */
/* ──────────────────────────────────────────────────────────────────────── */
export function mergeContactIntoDict(
  dict: Dictionary,
  content: ContactPageContent | null | undefined,
  locale: Locale,
): Dictionary {
  if (!content) return dict;
  const tr = locale === 'tr';
  const { hero, form } = content;

  return {
    ...dict,
    contactPage: {
      ...dict.contactPage,
      tagline: pick(tr ? hero?.taglineTr : hero?.taglineEn, dict.contactPage.tagline),
      title: pick(tr ? hero?.titleTr : hero?.titleEn, dict.contactPage.title),
      titleHighlight: pick(tr ? hero?.titleHighlightTr : hero?.titleHighlightEn, dict.contactPage.titleHighlight),
      subtitle: pick(tr ? hero?.subtitleTr : hero?.subtitleEn, dict.contactPage.subtitle),
      form: {
        ...dict.contactPage.form,
        name: pick(tr ? form?.nameTr : form?.nameEn, dict.contactPage.form.name),
        email: pick(tr ? form?.emailTr : form?.emailEn, dict.contactPage.form.email),
        phone: pick(tr ? form?.phoneTr : form?.phoneEn, dict.contactPage.form.phone),
        budget: pick(tr ? form?.budgetTr : form?.budgetEn, dict.contactPage.form.budget),
        budgetOptions: pickArr(
          tr ? form?.budgetOptionsTr : form?.budgetOptionsEn,
          dict.contactPage.form.budgetOptions,
        ),
        interest: pick(tr ? form?.interestTr : form?.interestEn, dict.contactPage.form.interest),
        interestOptions: pickArr(
          tr ? form?.interestOptionsTr : form?.interestOptionsEn,
          dict.contactPage.form.interestOptions,
        ),
        location: pick(tr ? form?.locationTr : form?.locationEn, dict.contactPage.form.location),
        message: pick(tr ? form?.messageTr : form?.messageEn, dict.contactPage.form.message),
        submit: pick(tr ? form?.submitTr : form?.submitEn, dict.contactPage.form.submit),
        note: pick(tr ? form?.noteTr : form?.noteEn, dict.contactPage.form.note),
      },
    },
  };
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  FOOTER                                                                 */
/* ──────────────────────────────────────────────────────────────────────── */
export function mergeFooterIntoDict(
  dict: Dictionary,
  content: FooterContent | null | undefined,
  locale: Locale,
): Dictionary {
  if (!content) return dict;
  const tr = locale === 'tr';
  const { brand, contactInfo, legal } = content;

  return {
    ...dict,
    footer: {
      ...dict.footer,
      description: pick(tr ? brand?.descriptionTr : brand?.descriptionEn, dict.footer.description),
      address: pick(tr ? contactInfo?.addressTr : contactInfo?.addressEn, dict.footer.address),
      contactInfo: pick(tr ? contactInfo?.titleTr : contactInfo?.titleEn, dict.footer.contactInfo),
      rights: pick(tr ? legal?.copyrightTr : legal?.copyrightEn, dict.footer.rights),
      privacy: pick(tr ? legal?.privacyTr : legal?.privacyEn, dict.footer.privacy),
      terms: pick(tr ? legal?.termsTr : legal?.termsEn, dict.footer.terms),
    },
  };
}
