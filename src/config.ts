import { Pathnames, LocalePrefix } from 'next-intl/routing';

export const defaultLocale = 'vi' as const;
export const locales: string[] = ['en', 'vi'] as const;

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
};

export const localePrefix: LocalePrefix<typeof locales> =
  'as-needed' satisfies LocalePrefix;

export const timeZoneMap: Record<Locale, string> = {
  en: 'America/Los_Angeles',
  vi: 'Asia/Ho_Chi_Minh',
};

export const port = process.env.PORT || 4000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;

export type Locale = (typeof locales)[number];
