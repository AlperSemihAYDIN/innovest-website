export type Locale = 'en' | 'tr';

export const defaultLocale: Locale = 'en';

export const locales: Locale[] = ['en', 'tr'];

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/tr')) return 'tr';
  return 'en';
}
