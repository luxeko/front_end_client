import React from 'react';

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
  return <div></div>;
};

export default BillingPage;
