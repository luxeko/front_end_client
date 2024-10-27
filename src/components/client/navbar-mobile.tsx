'use client';

import React, { useContext } from 'react';
import {
  ClientContext,
  IClientContentProps,
} from '@/context/client-context-provider';

const NavbarMobile = () => {
  const { breakpoint }: IClientContentProps = useContext(ClientContext);
  if (
    breakpoint === 0 ||
    breakpoint === 1 ||
    breakpoint === 2 ||
    breakpoint === 3
  ) {
    return <nav>Mobile</nav>;
  }
  return <></>;
};

export default NavbarMobile;
