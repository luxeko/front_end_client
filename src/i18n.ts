import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { Locale, locales, timeZoneMap } from './config';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as string)) notFound();

  // Sử dụng UTC hoặc giá trị mặc định nếu không tìm thấy
  const timeZone = timeZoneMap[locale as Locale] || 'UTC';

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone,
    now: new Date(),
  };
});
