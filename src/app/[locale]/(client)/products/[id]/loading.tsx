import React from 'react';
import { cn } from '@/lib/utils';

const Loading = ({ className }: { className?: string }) => {
  return (
    <div
      className={
        'flex h-[calc(100vh-300px)] w-full items-center justify-center'
      }>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='200'
        height='200'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={cn('animate-spin text-primary', className)}>
        <path d='M21 12a9 9 0 1 1-6.219-8.56' />
      </svg>
    </div>
  );
};

export default Loading;
