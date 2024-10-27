'use client';

import React, { useContext } from 'react';
import { cn, handleFormatPriceToVnd } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Package, ShoppingCart, Truck } from 'lucide-react';
import { Product } from '@/types/products';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { useRouter } from '@/navigation';
import { ClientContext } from '@/context/client-context-provider';

dayjs.locale('vi');

const ProductCard = ({ product }: { product: Product }) => {
  const now = dayjs();
  const router = useRouter();
  const { handleAddProductToCart } = useContext(ClientContext);
  const handleClickProduct = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div
      className={cn(
        'group relative flex h-full min-h-[1px] w-full cursor-pointer flex-col justify-between rounded-md border border-primary shadow-lg',
        {
          'cursor-not-allowed': product.stock === 0,
          'shadow-md': product.stock === 0,
        },
      )}>
      <div
        onClick={() => handleClickProduct()}
        className={
          'relative h-[320px] w-auto overflow-hidden rounded-md rounded-b-none bg-gray-100'
        }>
        {product.stock === 0 && (
          <div
            className={
              'absolute left-8 top-8 z-[1] flex h-6 w-32 -translate-x-1/2 -translate-y-1/2 -rotate-45 items-center justify-center bg-amber-500 text-sm font-medium text-black'
            }>
            Hết hàng
          </div>
        )}
        {product.stock > 0 && now.diff(product.created_at, 'day') <= 7 ? (
          <div
            className={
              'absolute left-8 top-8 z-[1] flex h-6 w-32 -translate-x-1/2 -translate-y-1/2 -rotate-45 items-center justify-center bg-primary text-sm font-medium text-white'
            }>
            Hàng mới
          </div>
        ) : (
          <></>
        )}
        {/*{product.stock > 0 && (*/}
        {/*  <div*/}
        {/*    className={*/}
        {/*      'absolute left-5 top-5 z-[1] flex h-6 w-32 -translate-x-1/2 -translate-y-1/2 -rotate-45 items-center justify-center bg-destructive text-sm font-medium text-white'*/}
        {/*    }>*/}
        {/*    -10%*/}
        {/*  </div>*/}
        {/*)}*/}
        <Image
          src={product.image_path ?? '/images/image_not_found.jpg'}
          alt={product.image_name ?? 'image not found'}
          priority
          quality={100}
          width={280}
          height={150}
          className={cn(
            'h-full w-full object-cover object-center transition-transform duration-300',
            {
              'opacity-50': product.stock === 0,
              'group-hover:scale-105': product.stock > 0,
            },
          )}
        />
      </div>
      <div
        className={cn(
          'flex h-max w-full flex-col items-start justify-center p-4',
          {
            'opacity-50': product.stock === 0,
          },
        )}>
        {/*<div className={'mb-2 flex items-center'}>*/}
        {/*  <Star className={'h-4 w-4 text-amber-500'} />*/}
        {/*  <Star className={'h-4 w-4 text-amber-500'} />*/}
        {/*  <Star className={'h-4 w-4 text-amber-500'} />*/}
        {/*  <Star className={'h-4 w-4 text-amber-500'} />*/}
        {/*  <StarHalf className={'h-4 w-4 text-amber-500'} />*/}
        {/*</div>*/}
        <div className={'mb-2 flex items-center gap-4 text-base'}>
          <div className={'flex items-center gap-1 font-medium'}>
            <Package className={'h-5 w-5 text-primary'} /> {product.stock}
          </div>
          <div className={'flex items-center gap-1 font-medium'}>
            <Truck className={'h-5 w-5 text-destructive'} /> {product.sold}
          </div>
        </div>
        <h3
          onClick={() => handleClickProduct()}
          className={cn('mb-2 text-lg font-medium capitalize')}>
          {product.product_name}
        </h3>
        <div className={'flex w-full items-center justify-between'}>
          <h2 className={'font-base text-2xl text-primary'}>
            {handleFormatPriceToVnd(product.price)}
          </h2>
          <Button
            onClick={() => handleAddProductToCart(product)}
            disabled={product.stock === 0}
            className={cn('flex items-center gap-x-2 p-3')}>
            <ShoppingCart className={'h-5 w-5'} /> Thêm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
