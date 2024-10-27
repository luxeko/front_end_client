import React from 'react';
import { locales } from '@/config';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Omit<Props, 'children'>): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata',
  });
  return {
    title: t('Product.title'),
    description: '',
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

const ProductListLayout = async ({
  children,
  params: { locale },
}: Readonly<Props>) => {
  return <>{children}</>;
};

export default ProductListLayout;
