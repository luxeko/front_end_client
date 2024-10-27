'use client';

import React from 'react';
import { Category } from '@/types/categories';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Link, useRouter } from '@/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const CategoryFilter = ({
  searchParams,
  categories,
  categoryParent,
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
  categories: Category[];
  categoryParent: Category;
}) => {
  const router = useRouter();
  const handleResetCategory = () => {
    router.push({
      pathname: '/products',
      query: {
        page_size: searchParams.page_size,
        page_index: searchParams.page_index,
        search: searchParams.search,
        category_id: '',
        price_from: searchParams.price_from,
        price_to: searchParams.price_to,
        sort: searchParams.sort,
        in_stock: searchParams.in_stock,
      },
    });
  };
  return (
    <div>
      <Accordion
        key={searchParams.category_id}
        type='multiple'
        defaultValue={[
          categoryParent
            ? categoryParent.id
            : searchParams?.category_id
              ? searchParams.category_id
              : '',
        ]}
        className={`w-full`}>
        {categories &&
          categories.length > 0 &&
          categories.map((category: Category, index: number) => {
            return (
              <AccordionItem
                key={category.id}
                value={category.id}
                disabled={category.total_products_count === 0}>
                <AccordionTrigger
                  disabled={category.total_products_count === 0}
                  className={cn({
                    'hover:text-primary': category.total_products_count !== 0,
                  })}>
                  {' '}
                  <div
                    className={cn('flex cursor-pointer items-center gap-x-1', {
                      'opacity-50': category.total_products_count === 0,
                    })}>
                    {category.category_name}
                    <span>({category.total_products_count})</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <RadioGroup
                    className={'flex flex-col gap-y-4'}
                    defaultValue={
                      searchParams?.category_id &&
                      searchParams.category_id.toString()
                    }>
                    {category.children &&
                      category.children.length > 0 &&
                      category.children.map((child: Category) => {
                        return (
                          <Link
                            href={{
                              pathname: '/products',
                              query: {
                                page_size: searchParams.page_size,
                                page_index: searchParams.page_index,
                                search: searchParams.search,
                                category_id: child.id,
                                price_from: searchParams.price_from,
                                price_to: searchParams.price_to,
                                sort: searchParams.sort,
                                in_stock: searchParams.in_stock,
                              },
                            }}
                            key={child.id}
                            className={`mx-4 flex items-center gap-x-2`}>
                            <RadioGroupItem
                              value={child.id.toString()}
                              id={child.category_name}
                              className={cn({
                                'opacity-50': child.products_count === 0,
                              })}
                            />
                            <Label
                              htmlFor={child.category_name}
                              className={cn(
                                `flex cursor-pointer items-center gap-x-1 hover:text-primary`,
                                {
                                  'text-primary':
                                    searchParams?.category_id &&
                                    searchParams?.category_id.toString() ===
                                      child.id,
                                  'opacity-50': child.products_count === 0,
                                },
                              )}>
                              <span className={'line-clamp-1 py-1'}>
                                {child.category_name}
                              </span>
                              <span className={'py-1'}>
                                ({child.products_count})
                              </span>
                            </Label>
                          </Link>
                        );
                      })}
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            );
          })}
      </Accordion>
      <Button
        type={'button'}
        className={'mt-4 w-max'}
        variant={'destructive'}
        onClick={() => handleResetCategory()}>
        Bỏ chọn
      </Button>
    </div>
  );
};

export default CategoryFilter;
