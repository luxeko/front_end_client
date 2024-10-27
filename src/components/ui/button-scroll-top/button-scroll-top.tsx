import React from 'react';
import {
  ClientContext,
  IClientContentProps,
} from '@/context/client-context-provider';
import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';
import './style.scss';
const ButtonScrollTop = () => {
  const { isScroll }: IClientContentProps = React.useContext(ClientContext);
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type='button'
      aria-label='Scroll to top'
      data-testid='scroll-to-top-button'
      data-cy='scroll-to-top-button'
      title='Scroll to top'
      onClick={handleScrollToTop}
      className={cn(
        isScroll ? 'active' : 'disable',
        'btn__scroll-top group h-auto w-max rounded-lg p-0 hover:border-primary hover:bg-white',
      )}>
      <ChevronUp
        className={'h-5 w-5 text-white duration-0 group-hover:text-primary'}
      />
    </button>
  );
};

export default ButtonScrollTop;
