import React, { Suspense } from 'react';
import { PATH } from '@/constant/path';
import Breadcrumb from '@/components/client/breadcrumb/breadcrumb';
import { API } from '@/constant/api';
import ProductList from '@/app/[locale]/(client)/products/components/product-list';
import { redirect } from '@/navigation';
import CategoryFilter from '@/app/[locale]/(client)/products/components/category-filter';
import PriceFilter from '@/app/[locale]/(client)/products/components/price-filter';
import StockFilter from '@/app/[locale]/(client)/products/components/stock-filter';
import ProductListLoading from '@/app/[locale]/(client)/products/components/preloader';

type Props = {
  params: {
    locale: string;
  };
  searchParams: any;
};

const ProductListPage = async ({
  params: { locale },
  searchParams,
}: Readonly<Props>) => {
  const {
    page_size,
    page_index,
    search,
    category_id,
    price_from,
    price_to,
    sort,
    in_stock,
  } = searchParams;
  const keyNames = Object.keys(searchParams);
  if (
    !keyNames.includes('page_size') ||
    !keyNames.includes('page_index') ||
    !page_size ||
    !page_index
  ) {
    redirect(
      `/products?page_size=12&page_index=1&search=${search}&category_id=${category_id}&price_from=${price_from}&price_to=${price_to}&sort=${sort}&in_stock=${in_stock}`,
    );
  }
  const breadcrumbs = [
    {
      label: 'Trang chủ',
      path: PATH.home,
    },
    {
      label: 'Danh mục',
      path: '',
    },
  ];

  const handleFetchDataCategories = async () => {
    'use server';
    try {
      const res = await fetch(API.client.categories['list-category'], {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-cache',
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchDataCategoryByChildrenId = async () => {
    'use server';
    try {
      if (category_id) {
        const res = await fetch(
          API.client.categories['get-category-by-children-id'](category_id),
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-cache',
          },
        );
        return res.json();
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchDataProductPriceMinMax = async () => {
    'use server';
    try {
      const res = await fetch(API.client.products['price-min-max'], {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-cache',
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const [categoriesResponse, categoryParentResponse, priceMinMaxResponse] =
    await Promise.all([
      handleFetchDataCategories(),
      handleFetchDataCategoryByChildrenId(),
      handleFetchDataProductPriceMinMax(),
    ]);
  return (
    <div className={'block py-12'}>
      {/*<Breadcrumb breadcrumbs={breadcrumbs} pageTitle={''} />*/}
      <div className={'container'}>
        <div className={'-mx-4 mt-0 flex flex-wrap'}>
          <div
            className={
              'w-1/4 max-w-full flex-[0_0_auto] shrink-0 px-4 md:w-full'
            }>
            <div className={'flex w-full flex-col gap-8 bg-white'}>
              <div className={'rounded-md border border-primary p-4 shadow-lg'}>
                <h3 className={'text-xl font-semibold'}>Danh mục</h3>
                <CategoryFilter
                  searchParams={searchParams}
                  categories={
                    categoriesResponse.response
                      ? categoriesResponse.response
                      : []
                  }
                  categoryParent={
                    categoryParentResponse
                      ? categoryParentResponse.response
                      : null
                  }
                />
              </div>
              <div className={'rounded-md border border-primary p-4 shadow-lg'}>
                <h3 className={'text-xl font-semibold'}>Giá</h3>
                <PriceFilter
                  searchParams={searchParams}
                  priceMinMax={priceMinMaxResponse.response}
                />
              </div>
              <div className={'rounded-md border border-primary p-4 shadow-lg'}>
                <h3 className={'text-xl font-semibold'}>Trạng thái</h3>
                <StockFilter searchParams={searchParams} />
              </div>
            </div>
          </div>
          <div
            className={
              'mt-0 w-3/4 max-w-full flex-[0_0_auto] shrink-0 px-4 md:w-full'
            }>
            <Suspense fallback={<ProductListLoading />}>
              <ProductList searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
