import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

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
    title: t('Register.title'),
    description: t('description'),
    authors: [{ name: t('author') }],
    creator: t('creator'),
    publisher: t('publisher'),
  };
}

const RegisterLayout: React.FC<Props> = ({
  children,
  params: { locale },
}: Readonly<Props>) => {
  return children;
};

export default RegisterLayout;
