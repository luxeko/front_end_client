'use client';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Link, useRouter } from '@/navigation';
import { Textarea } from '@/components/ui/textarea';
import { DollarSignIcon, WalletCardsIcon } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSession } from 'next-auth/react';
import { handleFormatPriceToVnd } from '@/lib/utils';
import { ClientContext } from '@/context/client-context-provider';
import { useToast } from '@/components/ui/use-toast';
import { handlePostCreateOrder } from '@/actions/post-order';
import dayjs from 'dayjs';
import { handlePostCreatePayment } from '@/actions/post-checkout';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { PATH } from '@/constant/path';

dayjs.locale('vi');

const Checkout = () => {
  const { data }: any = useSession();
  const accessToken: string = data ? data?.accessToken : '';
  const day = dayjs();
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState({
    email: '',
    phone_number: '',
    full_name: '',
    address: '',
    note: '',
  });
  const [listIdProduct, setListIdProduct] = useState<string[]>([]);
  const [listQtyProduct, setListQtyProduct] = useState<number[]>([]);
  const { dispatchCart, cartProduct } = useContext(ClientContext);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (data && data.user) {
      setUser(data.user);
    }
  }, [data]);

  useEffect(() => {
    let price = 0;
    cartProduct.cart.forEach((item: { qty: number; price: number }) => {
      price += item.price * item.qty;
    });
    const array1 = cartProduct.cart
      .filter((item: { id: string }) =>
        cartProduct.listCheckout.includes(item.id),
      )
      .map((item: { id: string }) => item.id);
    setListIdProduct(array1);
    const array2 = cartProduct.cart
      .filter((item: { id: string }) =>
        cartProduct.listCheckout.includes(item.id),
      )
      .map((item: { qty: number }) => item.qty);
    setListQtyProduct(array2);
    setTotal(price);
  }, [cartProduct, total]);

  const handleOnChange = (e: any) => {
    const name = e.target.name;
    setUser({ ...user, [name]: e.target.value });
  };

  const handlePayment = useCallback(async () => {
    if (accessToken) {
      setIsLoading(true);
      try {
        const res = await handlePostCreateOrder(accessToken, {
          product_id: listIdProduct,
          quantity: listQtyProduct,
          payment_method: 'momo',
          note: user.note,
          status: 'waiting_for_payment',
          estimated_delivery: day.add(3, 'day'),
        });
        if (res.code === 200) {
          await handlePostCreatePayment(accessToken, {
            order_id: res.response.id,
            note: user.note,
          })
            .then(async (res: any) => {
              const text = await res.text();
              try {
                const [json1, json2] = text.split(/(?<=})\s*(?={)/);
                const data1 = JSON.parse(json1);
                const data2 = JSON.parse(json2);
                const payUrl = data2.response?.pay_url;
                if (data2.code === 200) {
                  window.open(data2.response.pay_url, '_blank');
                }
              } catch (error) {
                console.error('Error parsing JSON:', error, text); // Log the error and raw text
              }
            })
            .finally(() => {
              setIsLoading(false);
              cartProduct.listCheckout.map((id: string) => {
                dispatchCart({
                  type: 'REMOVE',
                  payload: {
                    id,
                  },
                });
              });
              toast({
                title: 'Thông báo',
                description: 'Đặt hàng thành công. Vui lòng thanh toán',
                duration: 3000,
              });
              router.push(PATH.home);
            })
            .catch(error => {
              setIsLoading(false);
              toast({
                title: 'Something went wrong.',
                description: error.toString(),
                variant: 'destructive',
                duration: 3000,
              });
            });
        } else {
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        toast({
          title: 'Something went wrong.',
          description: error.toString(),
          variant: 'destructive',
          duration: 3000,
        });
        console.log('Error:', error);
      }
    }
  }, [accessToken, cartProduct]);

  return (
    <React.Fragment>
      <main className='container mx-auto my-4 grid grid-cols-3 gap-12 md:grid-cols-1 md:gap-8'>
        {isLoading && (
          <div
            className={
              'col-span-3 flex h-96 w-full items-center justify-center'
            }>
            <LoadingSpinner className={'h-20 w-20 text-primary'} />
          </div>
        )}
        {!isLoading && (
          <>
            <section className='col-span-2 space-y-8'>
              <div>
                <h2 className='text-lg font-semibold'>Chi tiết vận chuyển</h2>
                <form className='mt-4 space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        onChange={handleOnChange}
                        value={user && user.email}
                        placeholder='example@mail.com'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='full_name'>Họ tên</Label>
                      <Input
                        onChange={handleOnChange}
                        value={user && user.full_name}
                        id='full_name'
                        placeholder='Nguyễn Văn A'
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='address'>Địa chỉ</Label>
                    <Textarea
                      id='address'
                      onChange={handleOnChange}
                      value={user && user.address}
                      className={'resize-none'}
                      placeholder='123 Main St'
                      rows={3}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='note'>Ghi chú</Label>
                    <Textarea
                      id='note'
                      onChange={handleOnChange}
                      value={user && user.note}
                      className={'resize-none'}
                      placeholder='Lời nhắc nhở'
                      rows={3}
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='zip'>Mã bưu điện</Label>
                      <Input id='zip' placeholder='10001' />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='phone_number'>Số điện thoại</Label>
                      <Input
                        id='phone_number'
                        onChange={handleOnChange}
                        value={user && user.phone_number}
                        placeholder='+1 (555) 555-5555'
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div>
                <h2 className='text-lg font-semibold'>
                  Phương thức thanh toán
                </h2>
                <div className='mt-4 space-y-4'>
                  <RadioGroup
                    defaultValue='momo'
                    className='grid grid-cols-3 gap-4'>
                    <div>
                      <RadioGroupItem
                        value='momo'
                        id='momo'
                        className='peer sr-only'
                      />
                      <Label
                        htmlFor='momo'
                        className='flex flex-col items-center justify-between rounded-md border-2 border-gray-100 bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-destructive dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:peer-data-[state=checked]:border-gray-50 [&:has([data-state=checked])]:border-destructive dark:[&:has([data-state=checked])]:border-gray-50'>
                        <WalletCardsIcon className='mb-3 h-6 w-6 text-destructive' />
                        <span className={'text-destructive'}>Momo</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value='bank_transfer'
                        id='bank_transfer'
                        disabled={true}
                        className='peer sr-only'
                      />
                      <Label
                        htmlFor='bank_transfer'
                        className='flex flex-col items-center justify-between rounded-md border-2 border-gray-100 bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:peer-data-[state=checked]:border-gray-50 [&:has([data-state=checked])]:border-primary dark:[&:has([data-state=checked])]:border-gray-50'>
                        <DollarSignIcon className='mb-3 h-6 w-6 text-primary' />
                        <span className={'text-primary'}>Chuyển khoản</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </section>
            <section className='space-y-8'>
              <div>
                <h2 className='text-lg font-semibold'>Tóm tắt đơn hàng</h2>
                <div className='mt-4 space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span>Tổng phụ</span>
                    <span>{handleFormatPriceToVnd(total)}</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Chi phí vận chuyển</span>
                    <span>{handleFormatPriceToVnd(0)}</span>
                  </div>
                  <Separator />
                  <div className='flex items-center justify-between font-semibold'>
                    <span>Tổng</span>
                    <span>{handleFormatPriceToVnd(total)}</span>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='coupon'>Mã giảm giá</Label>
                    <div className='flex'>
                      <Input id='coupon' placeholder='Enter promo code' />
                      <Button className='ml-2'>Xác nhận</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='space-y-4'>
                <Button
                  type={'button'}
                  onClick={handlePayment}
                  size='lg'
                  className='w-full'>
                  Đặt hàng
                </Button>
              </div>
            </section>
          </>
        )}
      </main>
    </React.Fragment>
  );
};

export default Checkout;
