'use client';

import React, { useContext, useEffect, useState } from 'react';
import { ProductData, ProductListResponse } from '@/types/products';
import Breadcrumb from '@/components/client/breadcrumb/breadcrumb';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Thumbs } from 'swiper/modules';
import parse from 'html-react-parser';
import {
  Truck,
  TicketPercent,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Undo2,
  Star,
  StarHalf,
  CircleCheckBig,
  CircleOff,
  PackagePlus,
  ShieldCheck,
  SendHorizontal,
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import Layout from '@/components/client/layout';
import { cn, handleFormatPriceToVnd } from '@/lib/utils';
import { Category } from '@/types/categories';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Comment } from '@/types/comments';
import CommentComponent from '@/components/client/comment-component';
import { Badge } from '@/components/ui/badge';
import RelatedProduct from '@/components/client/related-product';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bold, Italic, Underline } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import './style.scss';
import { ClientContext } from '@/context/client-context-provider';

interface IProps {
  dataProduct: ProductData;
  listProductOutStanding: ProductListResponse;
}

const ProductDetails = ({ dataProduct, listProductOutStanding }: IProps) => {
  const productDetails =
    dataProduct && dataProduct.code === 200 ? dataProduct.response : null;
  const listProductOutStandingData =
    listProductOutStanding && listProductOutStanding.code === 200
      ? listProductOutStanding.response.data
      : null;
  const productName = productDetails ? productDetails.product_name : '';
  const [totalPrice, setTotalPrice] = useState<number>(
    productDetails ? +productDetails?.price : 0,
  );
  const [imagesNavSlider, setImagesNavSlider] = useState<any>(null);
  const [count, setCount] = useState(1);
  const [initialCommentOpen, setInitialCommentOpen] = useState<string[]>(['']);
  const { toast } = useToast();
  const { dispatchCart, cartProduct } = useContext(ClientContext);
  const [thumbnails, setThumbnails] = useState<
    {
      image_path: string;
      image_name: string;
    }[]
  >([]);
  const breadcrumbs = [
    {
      name: '',
      path: `/`,
    },
    {
      name: 'Tất cả sản phẩm',
      path: '/products',
    },
    {
      name: productName,
      path: '',
    },
  ];

  useEffect(() => {
    if (productDetails && productDetails?.thumbnails) {
      setThumbnails([
        {
          image_path: productDetails.image_path,
          image_name: productDetails.image_name,
        },
        ...productDetails?.thumbnails,
      ]);
    }
  }, [productDetails]);

  const handleOnChangeQuantity = (e: any) => {
    if (typeof e === 'object') {
      setCount(+e.target.value);
      setTotalPrice(prevState =>
        productDetails?.price ? +productDetails?.price * +e.target.value : 0,
      );
    } else if (isNaN(e)) {
      setCount(1);
      setTotalPrice(productDetails?.price ? +productDetails?.price : 0);
    } else {
      setCount(e);
      setTotalPrice(prevState =>
        productDetails?.price ? +productDetails?.price * +e : 0,
      );
    }
  };
  const handleMinusCount = (e: any) => {
    e.preventDefault();
    let minus = count - 1;
    handleOnChangeQuantity(minus);
    if (minus < 1) {
      minus = 1;
      handleOnChangeQuantity(minus);
      toast({
        title: 'Lưu ý',
        description: 'Cần ít nhất 1 sản phẩm',
        variant: 'destructive',
        duration: 3000,
      });
    }
  };
  const handlePlusCount = (e: any) => {
    e.preventDefault();
    let plus = count + 1;
    handleOnChangeQuantity(plus);
    if (plus > 10) {
      plus = 10;
      handleOnChangeQuantity(plus);
      toast({
        title: 'Lưu ý',
        description: 'Tối đa 10 sản phẩm',
        variant: 'destructive',
        duration: 3000,
      });
    }
  };
  const handleOnKeyUp = (e: any) => {
    const number = parseInt(e.target.value);
    if (number > 10) {
      toast({
        title: 'Lưu ý',
        description: 'Tối đa 10 sản phẩm',
        variant: 'destructive',
        duration: 3000,
      });
      setCount(10);
    } else if (number < 1) {
      toast({
        title: 'Lưu ý',
        description: 'Cần ít nhất 1 sản phẩm',
        variant: 'destructive',
        duration: 3000,
      });
      setCount(1);
    } else {
      setCount(number);
    }
  };

  const handleAddProductToCart = (product: any, count: number) => {
    for (let i = 0; i < count; i++) {
      dispatchCart({ type: 'ADD', payload: { data: product } });
    }
  };

  const handleToggleComment = (id: string) => {
    setInitialCommentOpen((prevState: string[]) => {
      if (prevState.includes(id)) {
        return prevState.filter(item => item !== id);
      } else {
        return [...prevState, id];
      }
    });
  };

  return (
    <>
      {/*<Breadcrumb breadcrumbs={breadcrumbs} pageTitle={''} />*/}
      <Layout className={'my-20'}>
        <div className={`info w-full p-0`}>
          <div className={`mx-auto w-full`}>
            <div className={`m-0 flex w-full gap-x-10`}>
              <div
                className={`float-left w-[30%] max-w-full shrink-0 grow-0 md:w-full`}>
                <div className={`sticky top-6`}>
                  <Swiper
                    loop={false}
                    thumbs={{ swiper: imagesNavSlider }}
                    modules={[Thumbs, Autoplay]}
                    slidesPerView={1}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    className='swiper-container2 mb-2.5'>
                    {thumbnails &&
                      thumbnails?.length > 0 &&
                      thumbnails.map((thumbnail, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div
                              className={`relative z-0 h-[450px] w-auto rounded-md border bg-white`}>
                              <Image
                                width={500}
                                height={500}
                                quality={100}
                                priority={true}
                                src={thumbnail.image_path}
                                alt={thumbnail.image_name}
                                className={`h-full w-full object-cover object-center`}
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                  <Swiper
                    onSwiper={setImagesNavSlider}
                    loop={false}
                    spaceBetween={10}
                    slidesPerView={4}
                    watchSlidesProgress={true}
                    modules={[Thumbs, Autoplay]}
                    className='swiper-container1'
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}>
                    {thumbnails &&
                      thumbnails?.length > 0 &&
                      thumbnails.map((thumbnail, index) => (
                        <SwiperSlide key={index} className={`relative`}>
                          <div
                            className={`aspect-square w-full cursor-pointer rounded-md bg-white`}>
                            <Image
                              width={200}
                              height={200}
                              quality={100}
                              priority={true}
                              src={thumbnail.image_path}
                              alt={thumbnail.image_name}
                              className={`h-full w-full object-cover object-center`}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </div>
              <div className={`w-2/5 max-w-full md:w-full`}>
                <div
                  className={`z-10 float-left w-full md:relative md:top-0 md:float-none`}>
                  <h1
                    className={`font-base float-left mb-2 flex w-full items-center break-words text-4xl capitalize`}>
                    {productDetails?.product_name}
                  </h1>
                  <div className={'mb-8 flex w-full items-center'}>
                    <Star className={'h-5 w-5 text-amber-500'} />
                    <Star className={'h-5 w-5 text-amber-500'} />
                    <Star className={'h-5 w-5 text-amber-500'} />
                    <Star className={'h-5 w-5 text-amber-500'} />
                    <StarHalf className={'h-5 w-5 text-amber-500'} />
                    <span className={'text-base font-medium'}>
                      (4.9) {productDetails?.sold} đã bán
                    </span>
                  </div>
                  <div className={'mb-6 text-4xl font-medium text-primary'}>
                    {handleFormatPriceToVnd(productDetails?.price)}
                  </div>
                  <div className={`float-left mb-2 flex w-full items-start`}>
                    <span
                      className={`inline-block min-w-[130px] text-sm font-medium normal-case`}>
                      Danh mục
                    </span>
                    <span className={'w-full'}>
                      {productDetails?.categories &&
                        productDetails?.categories?.length > 0 &&
                        productDetails?.categories.map(
                          (item: Category, index: number) => {
                            return (
                              <span key={index} className={'text-sm'}>
                                {item.category_name}{' '}
                                {productDetails?.categories &&
                                  index !==
                                    productDetails?.categories?.length - 1 &&
                                  ' - '}
                              </span>
                            );
                          },
                        )}
                    </span>
                  </div>
                  <div className={`float-left mb-2 w-full`}>
                    <span
                      className={`inline-block min-w-[130px] text-sm font-medium normal-case`}>
                      Mã sản phẩm
                    </span>
                    <span className={'text-sm'}>
                      {productDetails?.product_code}
                    </span>
                  </div>
                  <div className={`float-left mb-2 flex w-full items-start`}>
                    <span
                      className={`inline-block min-w-[130px] text-sm font-medium normal-case`}>
                      Mô tả
                    </span>
                    <span className={'text-sm'}>{productDetails?.summary}</span>
                  </div>
                  <div className={`float-left mb-2 flex w-full items-center`}>
                    <span
                      className={`inline-block min-w-[130px] text-sm font-medium normal-case`}>
                      Tình trạng
                    </span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 text-sm font-medium',
                        {
                          'text-destructive':
                            productDetails?.stock &&
                            productDetails?.stock === 0,
                          'text-primary':
                            productDetails?.stock &&
                            productDetails?.stock !== 0,
                        },
                      )}>
                      {productDetails?.stock && productDetails?.stock === 0 ? (
                        <CircleOff className={'h-5 w-4'} />
                      ) : (
                        <CircleCheckBig className={'h-5 w-4'} />
                      )}
                      {productDetails?.stock && productDetails?.stock === 0
                        ? 'Hết hàng'
                        : `Còn hàng`}
                    </span>
                  </div>
                  <div className={`float-left mb-2 w-full`}>
                    <span
                      className={`inline-block min-w-[130px] text-sm font-medium normal-case`}>
                      Số lượng
                    </span>
                    <span className={'text-sm font-medium text-primary'}>
                      {productDetails?.stock && productDetails?.stock === 0
                        ? 0
                        : `${productDetails?.stock} cây`}
                    </span>
                  </div>
                  <div
                    className={`border-b-borderColor float-left my-4 w-full border-b-[1px]`}></div>
                  <div className={`float-left w-full`}>
                    <Accordion
                      defaultValue={[]}
                      type='multiple'
                      className='w-full'>
                      {policyList.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <AccordionItem value={item.id.toString()} key={index}>
                            <AccordionTrigger>
                              <div
                                className={'flex items-center gap-x-4 text-sm'}>
                                <Icon className={`h-7 w-7`} />
                                {item.title}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className={'text-sm'}>
                              {parse(item.content)}
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </div>
                </div>
              </div>
              <div className={`w-[30%]`}>
                <div
                  className={
                    'sticky top-6 h-max w-full max-w-full rounded-md border border-primary bg-white shadow-md'
                  }>
                  <div className={'border-b border-primary p-4'}>
                    <h3 className={'text-xl font-medium'}>Chi tiết đặt hàng</h3>
                  </div>
                  <div
                    className={`flex w-full flex-row flex-wrap items-center justify-between px-4 pb-0 pt-4`}>
                    <label
                      htmlFor={`custom-input-number`}
                      className={`text-lg font-medium`}>
                      Số lượng
                    </label>
                    <div className='relative inline-flex items-center justify-center overflow-hidden rounded-md border bg-secondary p-1'>
                      <Button
                        onClick={handleMinusCount}
                        data-action='decrement'
                        variant={'outline'}
                        className='flex h-9 w-9 items-center justify-center border-none p-0 hover:bg-border'>
                        <Minus className={`h-5 w-5`} />
                      </Button>
                      <Input
                        id={`custom-input-number`}
                        className='h-8 w-12 flex-1 border-0 bg-secondary p-0 text-center text-base font-medium text-black shadow-none outline-0'
                        value={count}
                        onChange={handleOnChangeQuantity}
                        onKeyUp={handleOnKeyUp}
                        type='text'
                      />
                      <Button
                        onClick={handlePlusCount}
                        data-action='increment'
                        variant={'outline'}
                        className='flex h-9 w-9 items-center justify-center border-none p-0 hover:bg-border'>
                        <span className='m-auto text-xl font-thin'>
                          <Plus className={`h-5 w-5`} />
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div
                    className={
                      'flex w-full flex-row flex-wrap items-center justify-between px-4 pb-0 pt-2'
                    }>
                    <span className={`text-sm font-medium`}>Giá</span>
                    <span className={'text-base'}>
                      {handleFormatPriceToVnd(totalPrice)}
                    </span>
                  </div>
                  <div
                    className={
                      'flex w-full flex-row flex-wrap items-center justify-between px-4 pb-0 pt-2'
                    }>
                    <span className={`text-sm font-medium`}>Giảm giá</span>
                    <span className={'text-base'}>
                      {handleFormatPriceToVnd(0)}
                    </span>
                  </div>
                  <div
                    className={'flex w-full flex-row flex-wrap px-4 pb-0 pt-8'}>
                    <Label htmlFor='note' className={`text-lg font-medium`}>
                      Ghi chú
                    </Label>
                    <Textarea
                      id={'note'}
                      placeholder='Thêm ghi chú...'
                      className={'mt-2 h-28 resize-none bg-white'}
                    />
                  </div>
                  <div
                    className={'flex w-full flex-row flex-wrap px-4 pb-0 pt-4'}>
                    <div className={'relative w-full'}>
                      <Input
                        id={'coupon'}
                        placeholder='Nhập mã giảm giá...'
                        className={
                          'border-amber-500 bg-white pr-14 text-amber-600 placeholder:text-amber-500 focus-visible:ring-0'
                        }
                      />
                      <TicketPercent
                        className={
                          'absolute right-4 top-1/2 -translate-y-1/2 text-amber-500'
                        }
                      />
                    </div>
                  </div>
                  <div className={'mt-8 w-full border-b border-t p-4'}>
                    <div
                      className={
                        'flex w-full flex-row flex-wrap items-center justify-between'
                      }>
                      <span className={`text-lg font-medium`}>Tổng tiền</span>
                      <span className={'text-lg'}>
                        {handleFormatPriceToVnd(totalPrice)}
                      </span>
                    </div>
                  </div>
                  <div className={'flex flex-col gap-4 p-4'}>
                    <Button
                      className={'w-full gap-2 rounded-lg py-5 text-lg'}
                      onClick={() =>
                        handleAddProductToCart(productDetails, count)
                      }>
                      <ShoppingCart className={'h-5 w-5'} /> Thêm giỏ hàng
                    </Button>
                    {/*<Button*/}
                    {/*  variant={'default'}*/}
                    {/*  className={'w-full gap-2 rounded-lg py-5 text-lg'}>*/}
                    {/*  <PackagePlus className={'h-5 w-5'} /> Mua ngay*/}
                    {/*</Button>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`mx-auto flex w-full gap-x-2.5 py-[50px]`}>
          <div className={'flex w-3/4 max-w-full flex-col gap-2.5'}>
            <div className={'h-max rounded-md border p-8 shadow-md'}>
              <h3
                className={
                  'relative mb-8 pb-4 text-xl font-medium capitalize before:absolute before:bottom-1 before:left-0 before:h-[2px] before:w-20 before:rounded before:bg-black before:content-[""]'
                }>
                Chi tiết sản phẩm
              </h3>
              <p className={'text-sm'}>{productDetails?.content}</p>
            </div>
            <div className={'h-max rounded-md border p-8 shadow-md'}>
              <h3
                className={
                  'relative mb-8 pb-4 text-xl font-medium capitalize before:absolute before:bottom-1 before:left-0 before:h-[2px] before:w-20 before:rounded before:bg-black before:content-[""]'
                }>
                Đánh giá ({productDetails?.comment_count})
              </h3>
              <div
                className={
                  'mb-8 flex min-h-1 w-full items-stretch justify-start gap-3'
                }>
                <div className={'flex min-h-1 flex-col'}>
                  <Avatar className={'cursor-pointer'}>
                    <AvatarImage
                      src='https://github.com/shadcn.png'
                      alt='@shadcn'
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div
                  className={
                    'relative flex h-40 w-full flex-col rounded-md border'
                  }>
                  <Textarea
                    id={'comment'}
                    placeholder='Viết đánh giá...'
                    className={
                      'h-full resize-none border-none bg-white shadow-none focus-visible:ring-0'
                    }
                  />
                  <div
                    className={'flex w-full items-center justify-between p-2'}>
                    <ToggleGroup type='multiple'>
                      <ToggleGroupItem
                        value='bold'
                        aria-label='Toggle bold'
                        className={'border'}>
                        <Bold className='h-4 w-4' />
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value='italic'
                        aria-label='Toggle italic'
                        className={'border'}>
                        <Italic className='h-4 w-4' />
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value='underline'
                        aria-label='Toggle underline'
                        className={'border'}>
                        <Underline className='h-4 w-4' />
                      </ToggleGroupItem>
                    </ToggleGroup>
                    <Button type={'button'} className={'gap-x-2 px-3'}>
                      <SendHorizontal className={'h-4 w-4'} /> Bình luận
                    </Button>
                  </div>
                </div>
              </div>
              <div className={'flex flex-col gap-3'}>
                {productDetails?.comments &&
                  productDetails?.comments.length > 0 &&
                  productDetails?.comments.map(
                    (comment_1: Comment, index_1: number) => {
                      return (
                        <div key={index_1}>
                          <CommentComponent comment={comment_1} />
                          <div className={'relative ml-12 mt-2'}>
                            {!initialCommentOpen.includes(comment_1.id) &&
                              comment_1.replies.length > 0 && (
                                <div
                                  onClick={() =>
                                    handleToggleComment(comment_1.id)
                                  }
                                  className={
                                    'cursor-pointer text-sm font-medium'
                                  }>
                                  Xem tất cả phản hồi
                                </div>
                              )}
                            {initialCommentOpen.includes(comment_1.id) &&
                              comment_1?.replies &&
                              comment_1.replies.length > 0 &&
                              comment_1.replies.map((comment_2, index_2) => {
                                return (
                                  <div
                                    key={index_2}
                                    className={'relative mt-2'}>
                                    <CommentComponent comment={comment_2} />
                                    <div className={'relative ml-12 mt-2'}>
                                      {!initialCommentOpen.includes(
                                        comment_2.id,
                                      ) &&
                                        comment_2.replies.length > 0 && (
                                          <>
                                            <div
                                              onClick={() =>
                                                handleToggleComment(
                                                  comment_2.id,
                                                )
                                              }
                                              className={
                                                'mb-3 cursor-pointer text-sm font-medium'
                                              }>
                                              Xem tất cả phản hồi
                                            </div>
                                            <div
                                              className={cn(
                                                'absolute -left-[34px] top-0 h-8 w-[26px] -translate-y-1/2 rounded-bl-2xl border-b-[2px] border-l-[2px] border-gray-300',
                                                {
                                                  '-top-[5px]':
                                                    !initialCommentOpen.includes(
                                                      comment_2.id,
                                                    ),
                                                },
                                              )}></div>
                                          </>
                                        )}
                                      {initialCommentOpen.includes(
                                        comment_2.id,
                                      ) &&
                                        comment_2?.replies &&
                                        comment_2.replies.length > 0 &&
                                        comment_2.replies.map(
                                          (comment_3, index_3) => {
                                            return (
                                              <div
                                                key={index_3}
                                                className={'relative mt-2'}>
                                                <CommentComponent
                                                  comment={comment_3}
                                                />
                                                <div
                                                  className={
                                                    'absolute -left-[34px] top-0 h-8 w-[26px] -translate-y-1/2 rounded-bl-2xl border-b-[2px] border-l-[2px] border-gray-300'
                                                  }></div>
                                                {index_3 !==
                                                  comment_2.replies.length -
                                                    1 &&
                                                  comment_2.replies.length >
                                                    0 && (
                                                    <div
                                                      className={
                                                        'absolute -left-[34px] top-0 h-full w-[2px] bg-gray-300'
                                                      }></div>
                                                  )}
                                              </div>
                                            );
                                          },
                                        )}
                                    </div>
                                    <div
                                      className={
                                        'absolute -left-[34px] top-0 h-8 w-[26px] -translate-y-1/2 rounded-bl-2xl border-b-[2px] border-l-[2px] border-gray-300'
                                      }></div>
                                    {index_2 !== comment_1.replies.length - 1 &&
                                      comment_1.replies.length > 0 && (
                                        <div
                                          className={
                                            'absolute -left-[34px] top-0 h-full w-[2px] bg-gray-300'
                                          }></div>
                                      )}
                                  </div>
                                );
                              })}
                            <div
                              className={cn(
                                'absolute -left-[34px] top-0 h-8 w-[26px] -translate-y-1/2 rounded-bl-2xl border-b-[2px] border-l-[2px] border-gray-300',
                                {
                                  '-top-[5px]': !initialCommentOpen.includes(
                                    comment_1.id,
                                  ),
                                },
                              )}></div>
                          </div>
                        </div>
                      );
                    },
                  )}
              </div>
            </div>
          </div>
          <div className={'w-1/4 max-w-full'}>
            <div
              className={'sticky top-6 h-max rounded-md border p-8 shadow-md'}>
              <h3
                className={
                  'relative mb-8 pb-4 text-xl font-medium capitalize before:absolute before:bottom-1 before:left-0 before:h-[2px] before:w-8 before:rounded before:bg-black before:content-[""]'
                }>
                Tags
              </h3>
              <div className={'flex flex-wrap gap-2'}>
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className={'px-2 py-1 text-sm font-normal uppercase'}>
                    #{tag.title}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={`mx-auto h-max w-full py-[50px]`}>
          <div className={'flex items-center justify-center'}>
            <h3
              className={
                'relative mb-8 pb-4 text-xl font-medium capitalize before:absolute before:bottom-1 before:left-0 before:h-[2px] before:w-20 before:rounded before:bg-black before:content-[""]'
              }>
              Sản phẩm nổi bật
            </h3>
          </div>
          <RelatedProduct
            products={
              listProductOutStandingData ? listProductOutStandingData : []
            }
          />
        </div>
      </Layout>
    </>
  );
};

const policyList = [
  {
    id: 1,
    icon: Truck,
    title: 'Vận chuyển và trả hàng',
    content: `<p>Miễn phí vận chuyển và trả lại cho tất cả các đơn đặt hàng!<br>Chúng tôi vận chuyển tất cả các đơn đặt hàng nội địa trong vòng <strong class="whitespace-nowrap">5-10 ngày làm việc!</strong></p>`,
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: 'Bảo hành',
    content: `<p>Bảo Hành <strong class="whitespace-nowrap">14 Ngày</strong> – Tư vấn chăm sóc trọn đời.</p>`,
  },
  {
    id: 3,
    icon: TicketPercent,
    title: 'Giá và ưu đãi',
    content: `<p>Bây giờ hãy tận hưởng những lợi ích của ưu đãi độc quyền.<br>Đăng ký <a href="/register" class="whitespace-nowrap font-bold">ecogarden.com</a> để luôn cập nhật những ưu đãi mới nhất.</p>`,
  },
  {
    id: 4,
    icon: Heart,
    title: 'Hướng dẫn chăm sóc',
    content: `<p>Chọn khu vực trong nhà nhận được ánh nắng thích hợp.<br>Chúng ta nên chú ý tưới nước cho cây thường xuyên, định kỳ hợp lý.</p>`,
  },
  {
    id: 5,
    icon: Undo2,
    title: 'Trả hàng',
    content: `<p>Hỗ trợ đổi trả sản phẩm trong vòng <strong class="whitespace-nowrap">3 ngày</strong> sau khi mua.</p>`,
  },
];

const tags = [
  {
    id: 1,
    title: 'Bán hoa tươi - hoa khô',
  },
  {
    id: 2,
    title: 'Cây cảnh',
  },
  {
    id: 3,
    title: 'Phong thủy',
  },
  {
    id: 4,
    title: 'Chăm sóc cây',
  },
  {
    id: 5,
    title: 'Chậu gốm',
  },
  {
    id: 6,
    title: 'Trang trí nội thất',
  },
  {
    id: 7,
    title: 'Cây Bonsai',
  },
  {
    id: 8,
    title: 'Phân bón',
  },
  {
    id: 9,
    title: 'Dụng cụ',
  },
];

export default ProductDetails;
