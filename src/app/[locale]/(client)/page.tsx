import React from 'react';
import Banner from '@/components/client/banner';
import NewProducts from '@/components/client/new-products';
import BestSellingProducts from '@/components/client/best-selling-products';
import News from '@/components/client/news';
import Testimonials from '@/components/client/testimonials';
import { API } from '@/constant/api';

interface Props {
  params: { locale: string };
}

const serverUrl = process.env.SERVER_URL;

const HomePage = async ({ params: { locale } }: Props) => {

  const handleFetchDataNewProducts = async () => {
    'use server';
    try {
      const res = await fetch(
        API.client.products['new-products']({ page_size: 4 }),
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-cache',
        },
      );
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchDataBestSellingProducts = async () => {
    'use server';
    try {
      const res = await fetch(
        API.client.products['best-selling-products']({ page_size: 4 }),
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-cache',
        },
      );
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const [dataNewProducts, dataBestSellingProducts] = await Promise.all([
    handleFetchDataNewProducts(),
    handleFetchDataBestSellingProducts(),
  ]);

  return (
    <div className={'my-4'}>
      <Banner />
      <NewProducts dataNewProducts={dataNewProducts} />
      <BestSellingProducts dataBestSellingProducts={dataBestSellingProducts} />
      <News />
      <Testimonials />
    </div>
  );
};

export default HomePage;
