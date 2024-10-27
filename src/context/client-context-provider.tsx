'use client';

import React, {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import { CART_INITIAL_STATE, cartReducer } from '@/reducer/cart';
import { useToast } from '@/components/ui/use-toast';

export interface IClientContentProps {
  isScroll: boolean;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  breakpoint: number;
  openSearch: boolean;
  setOpenSearch: (value: boolean) => void;
  openCart: boolean;
  setOpenCart: (value: boolean) => void;
  cartProduct: any;
  dispatchCart: any;
  handleAddProductToCart: any;
}

const noop = () => {};

export const ClientContext = createContext<IClientContentProps>({
  isScroll: false,
  breakpoint: -1,
  openSearch: false,
  setOpenSearch: noop,
  openCart: false,
  setOpenCart: noop,
  isLoading: true,
  setIsLoading: noop,
  cartProduct: [],
  dispatchCart: noop,
  handleAddProductToCart: noop,
});

const ClientContextProvider = ({ children }: { children: ReactNode }) => {
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const breakpoint = useResponsive([479, 639, 767, 1023, 1279, 1535]);
  const [cartProduct, dispatchCart] = useReducer(
    cartReducer,
    CART_INITIAL_STATE,
  );
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const toggleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > 120) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    window.addEventListener('scroll', toggleScroll);
    return () => window.removeEventListener('scroll', toggleScroll);
  }, [isScroll]);

  useEffect(() => {
    localStorage.setItem('carts', JSON.stringify(cartProduct.cart));
    localStorage.setItem('checkout', JSON.stringify(cartProduct.listCheckout));
  }, [cartProduct]);

  const handleAddProductToCart = (product: any) => {
    dispatchCart({ type: 'ADD', payload: { data: product } });
    toast({
      title: 'Thêm sản phẩm thành công',
      description: `Bạn đã thêm ${product.product_name} vào giỏ hàng`,
      duration: 3000,
    });
  };

  return (
    <ClientContext.Provider
      value={{
        isScroll,
        breakpoint,
        openSearch,
        setOpenSearch,
        openCart,
        setOpenCart,
        isLoading,
        setIsLoading,
        cartProduct,
        dispatchCart,
        handleAddProductToCart,
      }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientContextProvider;
