import React from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import Checkout from '@/app/[locale]/(client)/checkout/components/checkout';

type Props = {
  params: {
    locale: string;
  };
  searchParams: any;
};

const CheckoutPage = async ({
  params: { locale },
  searchParams,
}: Readonly<Props>) => {
  unstable_setRequestLocale(locale);
  return <Checkout />;
};

export default CheckoutPage;
