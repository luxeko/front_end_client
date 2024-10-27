import React from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: {
    locale: string;
  };
  searchParams: any;
};

const BillingPage = async ({
  params: { locale },
  searchParams,
}: Readonly<Props>) => {
  unstable_setRequestLocale(locale);
  return <div></div>;
};

export default BillingPage;
