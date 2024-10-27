import React, { Suspense } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import { API } from '@/constant/api';
import ProductDetails from '@/app/[locale]/(client)/products/[id]/components/product-details';
import Loading from '@/app/[locale]/(client)/products/[id]/loading';

type Props = {
  params: { locale: string; id: string };
};

const ProductDetailsPage = async ({
  params: { locale, id },
}: Readonly<Props>) => {
  unstable_setRequestLocale(locale);

  const handleFetchDataProductById = async () => {
    'use server';
    try {
      const res = await fetch(API.client.products['product-details'](id), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-cache',
      });
      return res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleFetchDataOutstandingProduct = async () => {
    try {
      const res = await fetch(
        API.client.products['out-standing-products']({ page_size: 8 }),
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-cache',
        },
      );
      return res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const [dataProduct, listProductOutStanding] = await Promise.all([
    handleFetchDataProductById(),
    handleFetchDataOutstandingProduct(),
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <ProductDetails
        dataProduct={dataProduct}
        listProductOutStanding={listProductOutStanding}
      />
    </Suspense>
  );
};

export default ProductDetailsPage;
