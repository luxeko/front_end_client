'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';

const DrawerSearch = ({
  openSearch,
  setOpenSearch,
}: {
  openSearch: boolean;
  setOpenSearch: (values: boolean) => void;
}) => {
  return (
    <Drawer open={openSearch} onOpenChange={setOpenSearch}>
      <DrawerPortal>
        <DrawerContent>
          <div className='mx-auto w-full max-w-sm'>
            <DrawerHeader>
              <DrawerTitle>Tìm kiếm sản phẩm</DrawerTitle>
            </DrawerHeader>
            <div>
              <Input placeholder={'Nhập tên sản phẩm...'} />
            </div>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};
const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];
export default DrawerSearch;
