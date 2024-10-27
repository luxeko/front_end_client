'use client';

import React, { useContext, useEffect, useState } from 'react';
import Layout from '@/components/client/layout';
import { useSession } from 'next-auth/react';
import { ClientContext } from '@/context/client-context-provider';
import { Link, useRouter } from '@/navigation';
import { PATH } from '@/constant/path';
import Image from 'next/image';
import { CreditCard, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handleFormatPriceToVnd } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

const CartList = () => {
  const router = useRouter();
  const { dispatchCart, cartProduct } = useContext(ClientContext);
  const [listProduct, setListProduct] = useState([]);
  const [listCheckout, setListCheckout] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let price = 0;
    cartProduct.cart.forEach((item: { qty: number; price: number }) => {
      price += item.price * item.qty;
    });
    setListCheckout(cartProduct.listCheckout);
    setTotal(price);
    setListProduct(cartProduct.cart);
  }, [cartProduct, total]);

  const handleViewProduct = (product: any) => {
    router.push(PATH.product.details(product.id));
  };
  const handleViewCheckout = () => {
    router.push(PATH.checkout);
  };
  const handleCheckBox = (id: string) => {
    if (listCheckout.includes(id)) {
      setListCheckout(prev => prev.filter(item => item !== id));
    } else {
      setListCheckout([...listCheckout, id]);
    }
    dispatchCart({
      type: 'UPLOAD_CHECKOUT',
      payload: {
        id,
      },
    });
  };
  return (
    <section>
      <Layout className=''>
        <div className='mx-auto max-w-5xl'>
          <header className='text-center'>
            <h1 className='text-xl font-bold text-gray-900 sm:text-3xl'>
              Giỏ hàng của bạn
            </h1>
          </header>

          <div className='mt-8'>
            <ul className='space-y-4'>
              {listProduct.map(
                (
                  item: {
                    id: string;
                    image_path: string;
                    image_name: string;
                    product_name: string;
                    qty: number;
                    price: number;
                    product_code: string;
                  },
                  index,
                ) => {
                  return (
                    <li key={index} className='flex items-center gap-4'>
                      <Checkbox
                        onClick={() => handleCheckBox(item.id)}
                        value={item.id}
                        checked={listCheckout.includes(item.id)}
                      />
                      <Image
                        src={item.image_path}
                        alt={item.image_name}
                        width={500}
                        height={500}
                        priority={true}
                        quality={100}
                        className='size-16 rounded object-cover'
                      />

                      <div>
                        <h3 className='text-sm text-gray-900'>
                          {item.product_name}
                        </h3>

                        <dl className='mt-0.5 space-y-px text-xs text-gray-600'>
                          <div>
                            <dt className='mr-2 inline'>Mã sản phẩm:</dt>
                            <dd className='inline'>{item.product_code}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className='flex flex-1 items-center justify-end gap-3'>
                        <div className={'flex items-center gap-2'}>
                          <span>{handleFormatPriceToVnd(item.price)}</span>
                          <X className={`h-4 w-4`} />
                          <label htmlFor='Line1Qty' className='sr-only'>
                            {' '}
                            Quantity{' '}
                          </label>
                          <div
                            className={
                              'flex h-9 w-9 items-center justify-center rounded bg-primary-foreground p-0 text-center text-sm'
                            }>
                            {item.qty}
                          </div>
                        </div>

                        <Button
                          variant={'secondary'}
                          className={'p-2'}
                          onClick={() =>
                            dispatchCart({
                              type: 'REMOVE',
                              payload: { id: item.id },
                            })
                          }>
                          <span className='sr-only'>Remove item</span>

                          <Trash2 className={'h-5 w-5'} />
                        </Button>
                      </div>
                    </li>
                  );
                },
              )}
            </ul>

            <div className='mt-8 flex justify-end border-t border-gray-100 pt-8'>
              <div className='w-screen max-w-lg space-y-4'>
                <dl className='space-y-0.5 text-sm text-gray-700'>
                  <div className='flex justify-between'>
                    <dt>Tổng phụ</dt>
                    <dd>{handleFormatPriceToVnd(total)}</dd>
                  </div>

                  <div className='flex justify-between'>
                    <dt>VAT</dt>
                    <dd>{handleFormatPriceToVnd(0)}</dd>
                  </div>

                  <div className='flex justify-between'>
                    <dt>Giảm giá</dt>
                    <dd>-{handleFormatPriceToVnd(0)}</dd>
                  </div>

                  <div className='flex justify-between !text-base font-medium'>
                    <dt>Tổng</dt>
                    <dd>{handleFormatPriceToVnd(total)}</dd>
                  </div>
                </dl>
                <div className='flex justify-end'>
                  <Link
                    href={PATH.checkout}
                    className='flex items-center gap-1.5 rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600'>
                    <CreditCard className={'h-4 w-4'} />
                    Thanh toán
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </section>
  );
};

export default CartList;
