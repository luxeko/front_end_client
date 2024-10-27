'use client';

import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useTranslations } from 'next-intl';
import { ClientContext } from '@/context/client-context-provider';
import { useSession } from 'next-auth/react';
import { handleFormatPriceToVnd } from '@/lib/utils';
import { CreditCard, Minus, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useRouter } from '@/navigation';
import { PATH } from '@/constant/path';

const SheetCart = ({
  openCart,
  setOpenCart,
}: {
  openCart: boolean;
  setOpenCart: (values: boolean) => void;
}) => {
  const { dispatchCart, cartProduct } = useContext(ClientContext);
  const translationsCart = useTranslations('Cart');
  const router = useRouter();
  const [listProduct, setListProduct] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let price = 0;
    cartProduct.cart.forEach((item: { qty: number; price: number }) => {
      price += item.price * item.qty;
    });
    setTotal(price);
    setListProduct(cartProduct.cart);
  }, [cartProduct, total]);

  const handleGoCartPage = () => {
    setOpenCart(false);
    router.push(PATH.cart);
    dispatchCart({
      type: 'CHECKOUT',
      payload: {
        data: listProduct,
      },
    });
  };
  const handleViewCheckout = () => {
    setOpenCart(false);

    router.push(PATH.checkout);
  };
  const handleViewProduct = (product: any) => {
    setOpenCart(false);
    router.push(PATH.product.details(product.id));
  };
  return (
    <Sheet open={openCart} onOpenChange={setOpenCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className={'text-2xl font-normal'}>
            {translationsCart('title')}
          </SheetTitle>
        </SheetHeader>
        <div className={'flex h-full flex-col bg-white py-6'}>
          <div className='relative h-full flex-1 overflow-y-auto'>
            <div className={`flex h-full flex-col items-start`}>
              <ul
                className={`w-full px-4 sm:px-6 ${listProduct.length !== 0 ? 'border-2 border-dashed border-gray-200' : ''} `}>
                {listProduct &&
                  listProduct.length > 0 &&
                  listProduct.map((item: any, index) => {
                    return (
                      <li
                        key={index}
                        className={`border-borderColor relative border-b-[1px] py-4 last:border-b-0`}>
                        <div className={`flex w-full items-center`}>
                          <div
                            onClick={() => handleViewProduct(item)}
                            className={`group/image mr-3 max-w-[80px] cursor-pointer`}>
                            <Image
                              alt={item.image_name}
                              src={item?.image_path}
                              width={300}
                              height={300}
                              priority={true}
                              quality={100}
                              className={`h-28 rounded-[10px] object-cover object-center`}
                            />
                          </div>
                          <div className={`w-full`}>
                            <h3
                              onClick={() => handleViewProduct(item)}
                              className={`line-clamp-2 w-full cursor-pointer text-xl duration-300 hover:text-primary`}>
                              {item?.product_name}
                            </h3>
                            <p className={`price flex items-center gap-2`}>
                              <span
                                className={`text-lg font-medium text-primary`}>
                                {handleFormatPriceToVnd(item.price)}
                              </span>
                              <X className={`h-4 w-4`} />
                              <span className={`text-lg`}>{item.qty}</span>
                            </p>
                          </div>
                          <Button
                            variant={'destructive'}
                            className={'p-2'}
                            onClick={() =>
                              dispatchCart({
                                type: 'REMOVE',
                                payload: { id: item.id },
                              })
                            }>
                            <Minus className={`h-5 w-5`} />
                          </Button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className={`relative mt-6`}>
            <div>
              <div
                className={`mb-4 flex items-center justify-between text-xl capitalize`}>
                <div>Tổng tiền:</div>
                <div>{handleFormatPriceToVnd(total)}</div>
              </div>
              <div
                className={`flex flex-col gap-2 text-center capitalize text-white`}>
                <div
                  onClick={handleGoCartPage}
                  className='flex cursor-pointer items-center justify-center gap-1.5 rounded bg-primary px-5 py-3 text-center text-lg text-primary-foreground transition hover:bg-primary/90'>
                  <ShoppingCart className={'h-5 w-5'} />
                  Xem giở hàng
                </div>
                <div
                  onClick={handleViewCheckout}
                  className='flex cursor-pointer items-center justify-center gap-1.5 rounded bg-gray-700 px-5 py-3 text-center text-lg text-gray-100 transition hover:bg-gray-600'>
                  <CreditCard className={'h-5 w-5'} />
                  Thanh toán
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetCart;
