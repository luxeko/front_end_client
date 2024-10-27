'use client';

import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Link, useRouter } from '@/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const StockFilter = ({
  searchParams,
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
}) => {
  const router = useRouter();
  const [seed, setSeed] = useState(1);
  const handleResetStock = () => {
    router.push({
      pathname: '/products',
      query: {
        page_size: searchParams.page_size,
        page_index: searchParams.page_index,
        search: searchParams.search,
        category_id: searchParams.category_id,
        price_from: searchParams.price_from,
        price_to: searchParams.price_to,
        sort: searchParams.sort,
        in_stock: '',
      },
    });
    setSeed(Math.random());
  };
  return (
    <RadioGroup key={seed} className={'flex flex-col gap-y-3 pt-4'}>
      <Link
        href={{
          pathname: '/products',
          query: {
            page_size: searchParams.page_size,
            page_index: searchParams.page_index,
            search: searchParams.search,
            category_id: searchParams.category_id,
            price_from: searchParams.price_from,
            price_to: searchParams.price_to,
            sort: searchParams.sort,
            in_stock: 1,
          },
        }}
        className={`flex items-center gap-x-2`}>
        <RadioGroupItem value={'1'} id='in_stock-true' />
        <Label
          htmlFor={'in_stock-true'}
          className={cn(
            `flex cursor-pointer items-center gap-x-1 hover:text-primary`,
            {
              'text-primary':
                searchParams?.in_stock && searchParams?.in_stock === true,
            },
          )}>
          <span className={'line-clamp-1 py-1'}>Còn hàng</span>
        </Label>
      </Link>
      <Link
        href={{
          pathname: '/products',
          query: {
            page_size: searchParams.page_size,
            page_index: searchParams.page_index,
            search: searchParams.search,
            category_id: searchParams.category_id,
            price_from: searchParams.price_from,
            price_to: searchParams.price_to,
            sort: searchParams.sort,
            in_stock: 0,
          },
        }}
        className={`flex items-center gap-x-2`}>
        <RadioGroupItem value='0' id='in_stock-false' />
        <Label
          htmlFor={'in_stock-false'}
          className={cn(
            `flex cursor-pointer items-center gap-x-1 hover:text-primary`,
            {
              'text-primary':
                searchParams?.in_stock && searchParams?.in_stock === true,
            },
          )}>
          <span className={'line-clamp-1 py-1'}>Hết hàng</span>
        </Label>
      </Link>
      <Button
        type={'button'}
        className={'mt-1 w-max'}
        variant={'destructive'}
        onClick={() => handleResetStock()}>
        Bỏ chọn
      </Button>
    </RadioGroup>
  );
};

export default StockFilter;
