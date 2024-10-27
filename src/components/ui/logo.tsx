import React from 'react';
import { cn } from '@/lib/utils';
import { PATH } from '@/constant/path';
import { motion } from 'framer-motion';
import { MotionLink } from '@/lib/framer';

const Logo = ({ className }: { className?: string }) => {
  return (
    <motion.div className={'flex items-center justify-center'}>
      <MotionLink
        href={PATH.home}
        className={cn('text-3xl font-semibold', className)}>
        EcoGarden.
      </MotionLink>
    </motion.div>
  );
};

export default Logo;
