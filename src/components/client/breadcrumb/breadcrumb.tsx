import React from 'react';
import { Link } from '@/navigation';
import { ChevronRight } from 'lucide-react';
import { Variants } from 'framer-motion';
import Image from 'next/image';
import { motion } from 'framer-motion';
import './style.scss';

interface IProps {
  pageTitle?: string;
  breadcrumbs?: {
    label?: string;
    path?: string;
  }[];
}
const introPictureVariants2: Variants = {
  hide: {
    opacity: 0,
    x: -50,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      ease: 'easeInOut',
      duration: 1,
    },
  },
};
const introPictureVariants3: Variants = {
  hide: {
    opacity: 0,
    x: 0,
    y: 50,
    z: 0,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    z: 0,
    transition: {
      ease: 'easeInOut',
      duration: 1,
    },
  },
};
const introPictureVariants4: Variants = {
  hide: {
    opacity: 0,
    x: 50,
    y: -50,
    z: 0,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    z: 0,
    transition: {
      ease: 'easeInOut',
      duration: 1,
    },
  },
};
const introPictureVariants5: Variants = {
  hide: {
    opacity: 0,
    x: 50,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      ease: 'easeInOut',
      duration: 1,
    },
  },
};
const Breadcrumb = React.memo(({ pageTitle, breadcrumbs }: IProps) => {
  return (
    <section>
      <div className={'container'}>
        <div className={'-mx-4 mt-0 flex flex-wrap'}>
          <div
            className={'mt-0 w-full max-w-full flex-[0_0_auto] shrink-0 px-4'}>
            <div className={'block'}>
              <h3
                className={
                  'mb-2.5 text-[40px] font-semibold capitalize leading-[1.2]'
                }>
                {pageTitle}
              </h3>
              <nav
                className={
                  'mb-0 flex list-none flex-wrap items-center gap-2.5 p-0'
                }>
                {breadcrumbs &&
                  breadcrumbs.map(
                    (
                      item: {
                        label?: string;
                        path?: string;
                      },
                      index: number,
                    ) => {
                      if (index === breadcrumbs?.length - 1) {
                        return (
                          <span
                            key={index}
                            className={'text-[16px] capitalize text-primary'}>
                            {item.label}
                          </span>
                        );
                      } else {
                        return (
                          <React.Fragment key={index}>
                            <span
                              className={'text-[16px] capitalize text-primary'}>
                              <Link
                                href={item?.path ?? ''}
                                className={'duration-500 hover:text-primary'}>
                                {item?.label}
                              </Link>
                            </span>
                            <span
                              className={
                                'mt-0.5 font-bold leading-none text-gray-500 opacity-50'
                              }>
                              <ChevronRight className={'h-4 w-4'} />
                            </span>
                          </React.Fragment>
                        );
                      }
                    },
                  )}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className={'block'}>
        <Image
          src={'/icons/breadcrumb_shape01.svg'}
          alt={'breadcrumb-shape-01'}
          className={'breadcrumbShape01'}
          width={68}
          height={35}
          quality={100}
          priority={true}
        />
        <motion.div
          className={'breadcrumbShape02'}
          initial='hide'
          whileInView='show'
          exit='hide'
          variants={introPictureVariants2}>
          <Image
            src={'/icons/breadcrumb_shape02.svg'}
            alt={'breadcrumb-shape-02'}
            width={65}
            height={48}
            quality={100}
            priority={true}
          />
        </motion.div>
        <motion.div
          className={'breadcrumbShape03'}
          initial='hide'
          whileInView='show'
          exit='hide'
          variants={introPictureVariants3}>
          <Image
            src={'/icons/breadcrumb_shape03.svg'}
            alt={'breadcrumb-shape-03'}
            width={58}
            height={62}
            quality={100}
            priority={true}
          />
        </motion.div>
        <motion.div
          className={'breadcrumbShape04'}
          initial='hide'
          whileInView='show'
          exit='hide'
          variants={introPictureVariants4}>
          <Image
            src={'/icons/breadcrumb_shape04.svg'}
            alt={'breadcrumb-shape-04'}
            width={46}
            height={46}
            quality={100}
            priority={true}
          />
        </motion.div>
        <motion.div
          className={'breadcrumbShape05'}
          initial='hide'
          whileInView='show'
          exit='hide'
          variants={introPictureVariants5}>
          <Image
            src={'/icons/breadcrumb_shape05.svg'}
            alt={'breadcrumb-shape-05'}
            width={514}
            height={300}
            quality={100}
            priority={true}
          />
        </motion.div>
      </div>
    </section>
  );
});
Breadcrumb.displayName = 'Breadcrumb';
export default Breadcrumb;
