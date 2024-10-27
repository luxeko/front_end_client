'use client';

import React, { useContext } from 'react';
import DrawerSearch from '@/components/client/drawer-search';
import {
  ClientContext,
  IClientContentProps,
} from '@/context/client-context-provider';
import SheetCart from '@/components/client/sheet-cart';
import ButtonScrollTop from '@/components/ui/button-scroll-top/button-scroll-top';
import { Toaster } from '@/components/ui/toaster';

const Template = ({ children }: { children: React.ReactNode }) => {
  const {
    openSearch,
    setOpenSearch,
    openCart,
    setOpenCart,
  }: IClientContentProps = useContext(ClientContext);
  return (
    <>
      <ButtonScrollTop />
      {children}
      <DrawerSearch openSearch={openSearch} setOpenSearch={setOpenSearch} />
      <SheetCart openCart={openCart} setOpenCart={setOpenCart} />
      <Toaster />
    </>
  );
};

export default Template;
