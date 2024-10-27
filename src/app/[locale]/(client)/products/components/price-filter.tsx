'use client';

import React, { useState } from 'react';
import { ProductPriceMinMax } from '@/types/products';
import { Slider } from '@/components/ui/slider';
import { handleFormatPriceToVnd } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/navigation';

const PriceFilter = ({
  searchParams,
  priceMinMax,
}: {
  searchParams: {
    page_size?: number;
    page_index?: number;
    search?: string;
    category_id?: string;
    price_from?: number;
    price_to?: number;
    sort?: string;
    in_stock?: boolean;
  };
  priceMinMax: ProductPriceMinMax;
}) => {
  const router = useRouter();
  const { min, max } = priceMinMax;
  const [priceFrom, setPriceFrom] = useState<number>(+min);
  const [priceTo, setPriceTo] = useState<number>(+max);
  const [seed, setSeed] = useState(1);
  const handleChangePriceSlider = (value: [number, number]) => {
    setPriceFrom(value[0]);
    setPriceTo(value[1]);
  };
  const handleCommitPriceSlider = (value: [number, number]) => {
    setPriceFrom(value[0]);
    setPriceTo(value[1]);
  };
  const handleResetPriceSlider = () => {
    router.push({
      pathname: '/products',
      query: {
        page_size: searchParams.page_size,
        page_index: searchParams.page_index,
        search: searchParams.search,
        category_id: searchParams.category_id,
        price_from: '',
        price_to: '',
        sort: searchParams.sort,
        in_stock: searchParams.in_stock,
      },
    });
    setSeed(Math.random());
    setPriceFrom(min);
    setPriceTo(max);
  };
  const handleFilterPrice = () => {
    router.push({
      pathname: '/products',
      query: {
        page_size: searchParams.page_size,
        page_index: searchParams.page_index,
        search: searchParams.search,
        category_id: searchParams.category_id,
        price_from: +priceFrom,
        price_to: +priceTo,
        sort: searchParams.sort,
        in_stock: searchParams.in_stock,
      },
    });
  };
  return (
    <div className={'flex w-full flex-col gap-y-4'}>
      <Slider
        key={seed}
        onValueChange={handleChangePriceSlider}
        onValueCommit={handleCommitPriceSlider}
        defaultValue={[priceFrom, priceTo]}
        max={+max}
        min={+min}
        step={1}
        minStepsBetweenThumbs={1}
        className={'py-4'}
      />
      <div className={'flex w-full items-center justify-between'}>
        <div
          className={
            'flex h-9 w-2/5 items-center justify-center rounded border'
          }>
          <span>{handleFormatPriceToVnd(priceFrom)}</span>
        </div>
        <div className={'h-[1px] w-1/5 bg-gray-300'}></div>
        <div
          className={
            'flex h-9 w-2/5 items-center justify-center rounded border'
          }>
          <span>{handleFormatPriceToVnd(priceTo)}</span>
        </div>
      </div>
      <div className={'flex items-center gap-x-2'}>
        <Button
          type={'button'}
          variant={'destructive'}
          onClick={() => handleResetPriceSlider()}>
          Bỏ chọn
        </Button>
        <Button type={'button'} onClick={() => handleFilterPrice()}>
          Lọc kết quả
        </Button>
      </div>
    </div>
  );
};

export default PriceFilter;
