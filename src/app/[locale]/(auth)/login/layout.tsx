import React from 'react';
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
    title: t('Login.title'),
    description: t('description'),
    authors: [{ name: t('author') }],
    creator: t('creator'),
    publisher: t('publisher'),
  };
}

const LoginLayout: React.FC<Props> = ({
  children,
  params: { locale },
}: Readonly<Props>) => {
  return children;
};

export default LoginLayout;
