import React from 'react';
import { Inter } from 'next/font/google';
import {
  getMessages,
  getNow,
  getTimeZone,
  getTranslations,
} from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/config';
import ClientContextProvider from '@/context/client-context-provider';
import Header from '@/components/client/header';
import Footer from '@/components/client/footer/footer';
import NavbarDesktop from '@/components/client/navbar-desktop';
import NavbarMobile from '@/components/client/navbar-mobile';
import { Metadata } from 'next';
import { API } from '@/constant/api';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

const montserrat = Inter({
  subsets: ['latin'],
  variable: '--font-mont',
  preload: false,
  display: 'swap',
});

export async function generateMetadata({
  params: { locale },
}: Omit<Props, 'children'>): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata',
  });
  return {
    title: t('Home.title'),
    description: t('description'),
    authors: [{ name: t('author') }],
    creator: t('creator'),
    publisher: t('publisher'),
  };
}

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

const LocaleLayout = async ({
  children,
  params: { locale },
}: Readonly<Props>) => {
  // Enable static rendering

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
            <main
              className={`${montserrat.variable} relative flex min-h-screen w-full flex-col font-mont`}>
              <div
                className={`absolute right-[11rem] top-[-6rem] -z-10 h-[31.25rem] w-[68.75rem] rounded-full bg-[#ecfdf5] blur-[10rem]`}></div>
              <div
                className={`absolute left-[-5rem] top-[-1rem] -z-10 h-[31.25rem] w-[68.75rem] rounded-full bg-[#ecfdf5] blur-[10rem]`}></div>
              <Header />
              <NavbarDesktop />
              {/*<NavbarMobile />*/}
              <div className={'flex-1'}>{children}</div>
              <Footer />
            </main>
          </ClientContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
