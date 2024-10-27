import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const LayoutComponent = ({ children, className }: IProps) => {
  return (
    <div className={cn('container z-0 mx-auto my-4 bg-transparent', className)}>
      {children}
    </div>
  );
};

export default LayoutComponent;
