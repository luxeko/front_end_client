import React from 'react';
import { locales } from '@/config';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import ClientContextProvider from '@/context/client-context-provider';
import {
  getMessages,
  getNow,
  getTimeZone,
  unstable_setRequestLocale,
} from 'next-intl/server';
import { Toaster } from '@/components/ui/toaster';

const montserrat = Inter({
  subsets: ['latin'],
  variable: '--font-mont',
  preload: false,
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale: string) => ({
    locale,
  }));
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    // userScalable: false,
  };
}

const AuthLayout: React.FC<Props> = async ({
  children,
  params: { locale },
}: Readonly<Props>) => {
  unstable_setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const now = await getNow();
  const timeZone = await getTimeZone();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider
          messages={messages}
          locale={locale}
          now={now}
          timeZone={timeZone}>
          <ClientContextProvider>
            <Toaster />
            <main
              className={`${montserrat.variable} relative flex min-h-screen w-full flex-col font-mont`}>
              <div
                className={`absolute right-[11rem] top-[-6rem] -z-10 h-[40.25rem] w-[68.75rem] rounded-full bg-[#ecfdf5] blur-[10rem]`}></div>
              <div
                className={`absolute left-[-5rem] top-[-1rem] -z-10 h-[40.25rem] w-[68.75rem] rounded-full bg-[#ecfdf5] blur-[10rem]`}></div>
              {children}
            </main>
          </ClientContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default AuthLayout;
