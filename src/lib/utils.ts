import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleFormatPriceToVnd = (price: number | undefined) => {
  if (!price) return '';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

export function queryStringToObject(
  queryString: string,
): Record<string, string> {
  // Remove the initial "?" or anything before the actual query string if present
  if (queryString.startsWith('?')) {
    queryString = queryString.substring(1);
  }

  // Split the query string into key-value pairs
  const pairs = queryString.split('&');

  // Create an object to hold the key-value pairs
  const result: Record<string, string> = {};

  // Loop over each pair and split into key and value
  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    // Decode URI components and store in the result object
    result[decodeURIComponent(key)] = decodeURIComponent(value || '');
  });

  return result;
}
