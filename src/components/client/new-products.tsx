import React from 'react';
import { useTranslations } from 'next-intl';
import Layout from '@/components/client/layout';
import { Flower } from 'lucide-react';
import { ProductListResponse } from '@/types/products';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import ProductCard from '@/components/client/product-card';

dayjs.locale('vi');

const NewProducts = ({
  dataNewProducts,
}: {
  dataNewProducts: ProductListResponse;
}) => {
  const translationsHome = useTranslations('Home');
  const now = dayjs();
  return (
    <Layout className={'my-20'}>
      <div className={'flex w-full items-center justify-center'}>
        <h2 className={'relative w-max text-center text-4xl font-medium'}>
          {translationsHome('new_products')}
          <div
            className={
              'absolute -bottom-6 left-1/2 flex w-full -translate-x-1/2 items-center justify-center'
            }>
            <span className={'inline-block h-[2px] w-[40%] bg-primary'}></span>
            <Flower className={'w-[20%] text-primary'} />
            <span className={'inline-block h-[2px] w-[40%] bg-primary'}></span>
          </div>
        </h2>
      </div>
      <div className={'mt-20 grid grid-cols-4 gap-6'}>
        {dataNewProducts?.response?.data &&
          dataNewProducts?.response?.data.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
      </div>
    </Layout>
  );
};

export default NewProducts;
