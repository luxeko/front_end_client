import React from 'react';
import Layout from '@/components/client/layout';
import CartList from '@/app/[locale]/(client)/cart/components/cart-list';

type Props = {
  params: {
    locale: string;
  };
  searchParams: any;
};

const CartPage = async ({
  params: { locale },
  searchParams,
}: Readonly<Props>) => {
  return <CartList />;
};

export default CartPage;
