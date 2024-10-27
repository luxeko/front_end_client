'use client';

import useMounted from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const ProductListLoading = () => {
  const { isMounted } = useMounted();
  const skeletonSize = Array.from({ length: 6 }, (_, i) => i);
  if (!isMounted) return null;
  return (
    <div className='col-span-3 mt-0 h-full lg:mt-6'>
      <div className='space-y-4'>
        <div className={cn('grid grid-cols-3 gap-4')}>
          {skeletonSize.map(el => (
            <div
              key={`${el}+sk`}
              className={
                'flex h-full min-h-[1px] w-full flex-col gap-4 rounded-md p-4 shadow-lg'
              }>
              <Skeleton className='h-[320px] w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListLoading;
