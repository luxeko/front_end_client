'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from '@/navigation';
import { Product, ProductListResponse } from '@/types/products';
import { Command, CommandInput, CommandList } from '@/components/ui/command';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import handleFetchDataProducts from '@/actions/get-products';
import {
  ClientContext,
  IClientContentProps,
} from '@/context/client-context-provider';
import ProductListLoading from '@/app/[locale]/(client)/products/components/preloader';
import { useDebounce } from '@uidotdev/usehooks';
import ProductCard from '@/components/client/product-card';

const ProductList = ({
  searchParams,
}: {
  searchParams: {
    page_size?: number | '';
    page_index?: number | '';
    search?: string | '';
    category_id?: string | '';
    price_from?: number | '';
    price_to?: number | '';
    sort?: string | '';
    in_stock?: boolean | '';
  };
}) => {
  const pageIndex = searchParams?.page_index || '1';
  const pageSize = searchParams?.page_size || '12';
  const sort = searchParams?.sort || '';
  const router = useRouter();
  const { isLoading, setIsLoading }: IClientContentProps =
    useContext(ClientContext);
  const [searchValue, setSearchValue] = useState<string>(
    searchParams.search ? searchParams.search : '',
  );
  const debouncedSearchTerm = useDebounce(setSearchValue, 300);
  const [productsResponse, setProductsResponse] = useState<
    ProductListResponse | undefined
  >(undefined);
  useEffect(() => {
    if (searchParams?.search) {
      setSearchValue(searchParams?.search);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    handleFetchDataProducts(searchParams)
      .then(res => {
        setProductsResponse(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    searchParams.page_size,
    searchParams.page_index,
    searchParams.search,
    searchParams.category_id,
    searchParams.price_from,
    searchParams.price_to,
    searchParams.sort,
    searchParams.in_stock,
  ]);
  const handleChangeValue = (value: string, key: string) => {
    let query: {
      page_size?: number | '';
      page_index?: number | '';
      search?: string | '';
      category_id?: string | '';
      price_from?: number | '';
      price_to?: number | '';
      sort?: string | '';
      in_stock?: boolean | '';
    } = {
      category_id: searchParams.category_id,
      price_from: searchParams.price_from,
      price_to: searchParams.price_from,
      in_stock: searchParams.in_stock,
    };
    if (key === 'sort') {
      query = {
        ...query,
        page_size: searchParams.page_size,
        page_index: searchParams.page_index,
        search: searchParams.search,
        sort: value,
      };
    }
    if (key === 'search') {
      query = {
        ...query,
        page_size: searchParams.page_size,
        page_index: searchParams.page_index,
        search: value,
        sort: searchParams.sort,
      };
    }
    if (key === 'page_size') {
      query = {
        ...query,
        page_size: +value,
        page_index: searchParams.page_index,
        search: searchParams.search,
        sort: searchParams.sort,
      };
    }
    if (key === 'page_index') {
      query = {
        ...query,
        page_size: searchParams.page_size,
        page_index: +value,
        search: searchParams.search,
        sort: searchParams.sort,
      };
    }
    router.push({
      pathname: '/products',
      query: query,
    });
  };

  const products = productsResponse && productsResponse.response;

  return (
    <div className={'flex h-full flex-col gap-y-8'}>
      <div className={'flex items-center justify-between'}>
        <div className={'w-[318px] shadow-lg'}>
          <Command className='h-9 rounded-md border border-primary font-medium'>
            <CommandInput
              value={searchValue}
              className={'h-9 font-medium'}
              onValueChange={value => {
                setSearchValue(value);
                handleChangeValue(value, 'search');
              }}
              placeholder='Tìm kiếm...'
            />
            <CommandList></CommandList>
          </Command>
        </div>
        <div className={'flex items-center gap-x-2'}>
          <span className={'text-sm font-medium text-black'}>Sắp xếp: </span>
          <Select
            defaultValue={sort ? sort.toString() : ''}
            onValueChange={value => {
              handleChangeValue(value, 'sort');
            }}>
            <SelectTrigger className='w-36 rounded-md border border-primary bg-white font-medium shadow-lg focus:ring-0'>
              <SelectValue placeholder='Chọn' />
            </SelectTrigger>
            <SelectContent className='min-w-[6rem]'>
              <SelectGroup>
                <SelectItem value='outstanding' className={'font-medium'}>
                  Nổi bật
                </SelectItem>
                <SelectItem value='name-from-a-to-z'>Tên từ A-Z</SelectItem>
                <SelectItem value='name-from-z-to-a'>Tên từ Z-A</SelectItem>
                <SelectItem value='price-desc'>Giá giảm dần</SelectItem>
                <SelectItem value='price'>Giá tăng dần</SelectItem>
                <SelectItem value='created_at-desc'>Mới nhất</SelectItem>
                <SelectItem value='created_at'>Cũ nhất</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className={'flex items-center gap-x-2'}>
          <span className={'text-sm font-medium text-black'}>Hiển thị: </span>
          <Select
            defaultValue={pageSize.toString()}
            onValueChange={value => {
              handleChangeValue(value, 'page_size');
            }}>
            <SelectTrigger className='w-20 rounded-md border border-primary bg-white font-medium shadow-lg focus:ring-0'>
              <SelectValue placeholder='Số lượng' />
            </SelectTrigger>
            <SelectContent className='min-w-[6rem]'>
              <SelectGroup>
                <SelectItem value='6'>6</SelectItem>
                <SelectItem value='12'>12</SelectItem>
                <SelectItem value='18'>18</SelectItem>
                <SelectItem value='24'>24</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div
            className={cn(
              'flex w-[140px] items-center justify-end text-sm font-normal text-black',
              {
                'gap-x-2': products && products.from && products.to,
              },
            )}>
            <span className={'font-medium'}>
              {products && products.from ? products.from : ''}
            </span>
            <span>
              {products && products.from && products.to && (
                <MoveRight className={'h-4 w-4 text-gray-600'} />
              )}
            </span>
            <span className={'font-medium'}>
              {products && products.to} ({products && products.total} kết quả)
            </span>
          </div>
        </div>
      </div>
      {isLoading ? (
        <ProductListLoading />
      ) : productsResponse?.response.data.length === 0 ||
        productsResponse?.code !== 200 ||
        productsResponse?.status === 'failed' ? (
        <div
          className={
            'mt-16 flex flex-col items-center justify-center gap-4 text-base font-medium uppercase text-gray-500'
          }>
          <Image
            src={'/icons/no-data.svg'}
            alt={'No data'}
            priority
            quality={100}
            width={280}
            height={150}
            className={cn(
              'h-auto w-[300px] object-contain transition-transform duration-300',
            )}
          />
          Không tìm thấy sản phẩm
        </div>
      ) : (
        <div className={'flex flex-col gap-y-12'}>
          <div className={'grid grid-cols-3 gap-4'}>
            {products &&
              products.data &&
              products.data.length > 0 &&
              products.data.map((product: Product, index: number) => {
                return <ProductCard key={index} product={product} />;
              })}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#' isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>9</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>11</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProductList;
