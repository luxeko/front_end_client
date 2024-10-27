'use client';

import React, { useContext, useEffect, useState } from 'react';
import {
  ClientContext,
  IClientContentProps,
} from '@/context/client-context-provider';
import Logo from '@/components/ui/logo';
import Layout from '@/components/client/layout';
import { cn, queryStringToObject } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link, useRouter } from '@/navigation';
import { ShoppingCart } from 'lucide-react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { PATH } from '@/constant/path';
import { Category } from '@/types/categories';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { handleFetchDataCategories } from '@/actions/get-categories';
import handlePostLogout from '@/actions/post-logout';

const NavbarDesktop = () => {
  const {
    breakpoint,
    isScroll,
    openSearch,
    setOpenSearch,
    openCart,
    setOpenCart,
  }: IClientContentProps = useContext(ClientContext);
  const translationsLogin = useTranslations('Login');
  const translationsRegister = useTranslations('Register');
  const { data }: any = useSession();
  const [categories, setCategories] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const { cartProduct } = useContext(ClientContext);
  useEffect(() => {
    handleFetchDataCategories().then(res => {
      setCategories(res.response);
    });
  }, []);

  useEffect(() => {
    let count = 0;
    cartProduct.cart.forEach((item: { qty: number }) => {
      count += item.qty;
    });
    setCartCount(count);
  }, [cartProduct.cart, cartCount]);

  const router = useRouter();
  if (breakpoint === 4 || breakpoint === 5 || breakpoint === 6) {
    return (
      <nav className={'z-30'}>
        <Layout className={'relative my-8 flex items-center justify-between'}>
          <Logo
            className={'flex-auto flex-shrink-0 flex-grow-0 text-emerald-600'}
          />
          <div
            className={
              'absolute left-1/2 top-1/2 h-auto -translate-x-1/2 -translate-y-1/2'
            }>
            <NavigationMenuWrapper data={categories} />
          </div>
          <div
            className={cn(
              'flex flex-auto flex-shrink-0 flex-grow-0 items-center gap-3',
            )}>
            <Search
              className={'h-6 w-6 cursor-pointer text-emerald-600'}
              onClick={() => setOpenSearch(!openSearch)}
            />
            <div
              className={'relative cursor-pointer'}
              onClick={() => setOpenCart(!openCart)}>
              <ShoppingCart className={'h-6 w-6 text-emerald-600'} />
              <span
                className={
                  'absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-primary-foreground'
                }>
                {cartCount}
              </span>
            </div>
            {data ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className={'cursor-pointer'}>
                    <AvatarImage
                      src='https://github.com/shadcn.png'
                      alt='@shadcn'
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                  <DropdownMenuLabel>{data?.user?.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Hồ sơ
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Thanh toán
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Cài đặt
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      await handlePostLogout();
                      await signOut();
                    }}>
                    Đăng xuất
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div
                className={
                  'ml-2 flex items-center gap-x-1 rounded-lg border border-primary bg-white p-1'
                }>
                <div
                  className={
                    'cursor-pointer rounded-lg border-none bg-transparent p-1.5 text-sm font-medium text-black shadow-none hover:bg-secondary'
                  }
                  onClick={() => signIn()}>
                  {translationsLogin('title')}
                </div>
                <Button
                  className={
                    'm-0 rounded-lg bg-emerald-600 p-2 text-sm font-medium hover:bg-emerald-600/90'
                  }
                  onClick={() => {
                    router.push(PATH.register);
                  }}>
                  {translationsRegister('title')}
                </Button>
              </div>
            )}
            {/*<Button type={'button'} onClick={() => signOut()}>*/}
            {/*  Sign Out*/}
            {/*</Button>*/}
            {/*<User*/}
            {/*    className={*/}
            {/*        'h-6 w-6 text-emerald-600 cursor-pointer'*/}
            {/*    }*/}
            {/*/>*/}
          </div>
        </Layout>
      </nav>
    );
  }
  return <></>;
};

const NavigationMenuWrapper = ({ data }: { data: Category[] }) => {
  const searchParams = useSearchParams();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {data &&
          data.map((category: Category, index: number) => {
            return (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    '!bg-transparent text-base capitalize',
                  )}>
                  <Link
                    href={{
                      pathname: '/products',
                      query: {
                        page_size: 12,
                        page_index: 1,
                        search: '',
                        category_id: category.id,
                        price_from: '',
                        price_to: '',
                        sort: '',
                        in_stock: '',
                      },
                    }}
                    className={'relative'}>
                    {category.category_name}
                    {searchParams.get('category_id') &&
                      searchParams.get('category_id') === category.id && (
                        <div
                          className={
                            'absolute -bottom-3 h-[2px] w-full bg-primary'
                          }></div>
                      )}
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    className={cn(
                      `grid w-[900px] grid-cols-3 gap-2 p-4 lg:w-[800px] md:w-[700px]`,
                    )}>
                    {category.image_path && (
                      <li
                        className={cn('col-span-1 row-span-8', {
                          'row-span-1':
                            Math.ceil(category.children.length / 2) === 1,
                          'row-span-2':
                            Math.ceil(category.children.length / 2) === 2,
                          'row-span-3':
                            Math.ceil(category.children.length / 2) === 3,
                          'row-span-4':
                            Math.ceil(category.children.length / 2) === 4,
                          'row-span-5':
                            Math.ceil(category.children.length / 2) === 5,
                          'row-span-6':
                            Math.ceil(category.children.length / 2) === 6,
                          'row-span-7':
                            Math.ceil(category.children.length / 2) === 7,
                          'row-span-8':
                            Math.ceil(category.children.length / 2) === 8,
                          'row-span-9':
                            Math.ceil(category.children.length / 2) === 9,
                          'row-span-10':
                            Math.ceil(category.children.length / 2) === 10,
                          'row-span-11':
                            Math.ceil(category.children.length / 2) === 11,
                          'row-span-12':
                            Math.ceil(category.children.length / 2) === 12,
                        })}>
                        <NavigationMenuLink asChild>
                          <Link
                            className='relative flex h-full w-full select-none flex-col rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md'
                            href={{
                              pathname: '/products',
                              query: {
                                page_size: 12,
                                page_index: 1,
                                search: '',
                                category_id: category.id,
                                price_from: '',
                                price_to: '',
                                sort: '',
                                in_stock: '',
                              },
                            }}>
                            <Image
                              src={category?.image_path}
                              alt={category?.image_name ?? ''}
                              width={1280}
                              height={843}
                              quality={100}
                              priority={true}
                              className={
                                'h-full w-auto rounded object-cover object-center brightness-[0.4]'
                              }
                            />
                            <div className={'absolute bottom-0 left-0 p-4'}>
                              <div className='relative mb-2 mt-4 text-2xl font-semibold text-white'>
                                {category.category_name}
                                <span
                                  className={
                                    'absolute -bottom-1 left-0 h-[2px] w-2/5 bg-white'
                                  }></span>
                              </div>
                              <p className='line-clamp-4 text-sm font-medium text-white'>
                                {category.description}
                              </p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    )}
                    {category.children &&
                      category.children.map((child, indexChild) => {
                        return (
                          <ListItem
                            key={indexChild}
                            href={PATH.product.list({
                              page_size: 12,
                              page_index: 1,
                              search: '',
                              category_id: child.id,
                              price_from: '',
                              price_to: '',
                              sort: '',
                              in_stock: '',
                            })}
                            className={
                              searchParams.get('category_id') &&
                              searchParams.get('category_id') === child.id
                                ? 'text-primary'
                                : ''
                            }
                            title={child?.category_name}>
                            {child?.description}
                          </ListItem>
                        );
                      })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

interface ILinkProps {
  query: any;
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentProps<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          href={{
            pathname: '/products',
            query: props.href ? queryStringToObject(props.href) : {},
          }}
          {...props}>
          <div className='text-sm font-semibold capitalize leading-none'>
            {title}
          </div>
          <p className='line-clamp-2 text-sm leading-snug'>{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default NavbarDesktop;
