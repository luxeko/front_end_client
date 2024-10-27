import React from 'react';
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
  return <Checkout />;
};

export default CheckoutPage;
