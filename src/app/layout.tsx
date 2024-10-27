import './globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import SessionProvider from '@/app/session-provider';

type Props = {
  children: ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    icons: [
      {
        url: '/icon-80-32-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/icon-80-192-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    generator: 'Next.js',
    applicationName: 'Next.js',
    referrer: 'origin-when-cross-origin',
    keywords: [
      'Next.js',
      'Tailwind CSS',
      'EcoGarden',
      'Plants Website',
      'E-commerce',
    ],
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default async function RootLayout({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
