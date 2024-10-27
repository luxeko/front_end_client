'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ShoppingCart } from 'lucide-react';
import Layout from '@/components/client/layout';

export interface Data {
  img: string;
  title: string;
  description: string;
}

export interface CurrentSlideData {
  data: Data;
  index: number;
}

const Banner = () => {
  const [data, setData] = useState<Data[]>(sliderData.slice(1));
  const [transitionData, setTransitionData] = useState<Data>(sliderData[0]);
  const [currentSlideData, setCurrentSlideData] = useState<CurrentSlideData>({
    data: initData,
    index: 0,
  });
  const translationsButton = useTranslations('Button');
  const handlePrev = () => {
    setData(prevState => [
      transitionData ? transitionData : initData,
      ...prevState.slice(0, prevState.length - 1),
    ]);
    setCurrentSlideData({
      data: transitionData ? transitionData : sliderData[0],
      index: sliderData.findIndex(e => e.img === data[data.length - 1].img),
    });
    setTransitionData(data[data.length - 1]);
  };
  const handleNext = () => {
    setData(prevState => prevState.slice(1));
    setCurrentSlideData({
      data: transitionData ? transitionData : initData,
      index: sliderData.findIndex(e => e.img === data[0].img),
    });
    setTransitionData(data[0]);
    setTimeout(() => {
      setData(newData => [
        ...newData,
        transitionData ? transitionData : initData,
      ]);
    }, 500);
  };

  const handleClickCard = (clickData: Data) => {
    const findIndex = sliderData.findIndex(item => item.img === clickData.img);
    const current = [
      ...sliderData.slice(findIndex + 1, sliderData.length),
      ...sliderData.slice(0, findIndex),
    ];
    setData(current);
    setTransitionData(clickData);
    setCurrentSlideData({
      data: current[current.length - 1],
      index: findIndex,
    });
  };

  return (
    <Layout>
      <div
        className={
          'relative h-[36rem] w-full select-none overflow-hidden rounded-md border antialiased'
        }>
        <AnimatePresence>
          <motion.img
            alt={'Current Image'}
            key={'transition' + currentSlideData.data.img}
            src={currentSlideData.data.img}
            className={
              'absolute left-0 top-0 h-full w-full object-cover object-center brightness-[0.4]'
            }
          />
          {transitionData && (
            <motion.img
              key={transitionData.img}
              layoutId={transitionData.img}
              alt={'Transition Image'}
              transition={{
                opacity: { ease: 'linear' },
                layout: { duration: 0.5 },
              }}
              className={
                'absolute left-0 top-0 h-full w-full object-cover object-center brightness-[0.4]'
              }
              src={transitionData.img}
            />
          )}
          <div className={'z-20 h-full w-full'}>
            <div className={'grid h-full w-full grid-cols-10 flex-col md:flex'}>
              <div
                className={
                  'col-span-4 mb-0 flex h-full flex-1 flex-col justify-center px-10 md:mb-3 md:justify-end md:px-5'
                }>
                <motion.span
                  layout
                  className={'mb-2 h-1 w-5 rounded-full bg-primary-foreground'}
                />
                <OtherInfo
                  data={transitionData ? transitionData : currentSlideData.data}
                />
                <motion.div
                  layout
                  className={'z-20 mt-5 flex items-center gap-3'}>
                  <Button
                    className={
                      'h-10 w-10 rounded-full p-0 text-xs transition duration-300 ease-in-out'
                    }>
                    <Bookmark className={'text-xl'} />
                  </Button>
                  <Button className={'flex items-center gap-x-2'}>
                    {translationsButton('buy_now')}
                    <ShoppingCart className={'h-5 w-5'} />
                  </Button>
                </motion.div>
              </div>
              <div
                className={
                  'col-span-6 flex h-full flex-1 flex-col justify-center p-10 md:justify-start md:p-4'
                }>
                <div className={'flex w-full gap-6'}>
                  {data.map((item: Data) => (
                    <motion.div
                      onClick={() => handleClickCard(item)}
                      key={item.img}
                      className={
                        'md-min-w-[250px] relative h-80 min-w-[250px] cursor-pointer rounded-md shadow-md'
                      }
                      layout
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        transition: {
                          duration: 0.5,
                        },
                      }}
                      exit={{
                        scale: 0.8,
                        opacity: 0,
                      }}
                      transition={{
                        type: 'spring',
                        damping: 20,
                        stiffness: 100,
                      }}>
                      <motion.img
                        layoutId={item.img}
                        src={item.img}
                        alt={'Transition Image'}
                        className={
                          'absolute h-full w-full rounded-md object-cover brightness-75'
                        }
                      />
                      <motion.div
                        className={'absolute z-10 flex h-full items-end p-4'}>
                        <motion.div>
                          <motion.div
                            layout
                            className={'mb-2 h-[2px] w-3 rounded-full bg-white'}
                          />
                          <motion.h1
                            layoutId={item.title}
                            className={'text-xl leading-6 text-white'}>
                            {item.title}
                          </motion.h1>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                <div
                  className={
                    'z-20 flex items-center gap-3 px-1 py-5 md:px-0 md:py-3'
                  }>
                  <SliderButton handleClick={handlePrev}>
                    <ChevronLeft />
                  </SliderButton>
                  <SliderButton handleClick={handleNext}>
                    <ChevronRight />
                  </SliderButton>
                  <Progress
                    curIndex={currentSlideData.index}
                    length={sliderData.length}
                  />
                </div>
              </div>
            </div>
          </div>
        </AnimatePresence>
      </div>
    </Layout>
  );
};

const OtherInfo = ({ data }: { data: Data }) => {
  return (
    <motion.div
      initial={'hidden'}
      animate={'visible'}
      className={'flex flex-col'}>
      <AnimatedText
        className={
          'relative my-3 text-6xl font-semibold text-white md:my-1 md:text-4xl md:leading-[100px]'
        }
        data={data?.title}
      />
      <AnimatedText
        className={'relative text-xs text-white'}
        data={data?.description}
      />
    </motion.div>
  );
};
const initialAnimatedText = {
  hidden: {
    y: '100%',
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
  },
  visible: {
    y: 0,
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
  },
};
const AnimatedText = ({
  className,
  data,
}: {
  className?: string;
  data?: string;
}) => {
  return (
    <span
      style={{
        overflow: 'hidden',
        display: 'inline-block',
      }}>
      <motion.p key={data} className={className} variants={initialAnimatedText}>
        {data}
      </motion.p>
    </span>
  );
};

const SliderButton = ({
  children,
  handleClick,
}: {
  children: React.ReactNode;
  handleClick: () => void;
}) => {
  return (
    <Button className={'h-10 w-10 rounded-full p-0'} onClick={handleClick}>
      {children}
    </Button>
  );
};

const Progress = ({
  curIndex,
  length,
}: {
  curIndex: number;
  length: number;
}) => {
  return (
    <>
      <div className={'flex h-1 flex-1 items-center rounded-full bg-white'}>
        <div
          style={{
            width: (((curIndex + 1) / length) * 100).toString() + '%',
          }}
          className={'h-2 rounded-full bg-emerald-600'}></div>
      </div>
      <span
        key={curIndex}
        style={{
          overflow: 'hidden',
          display: 'inline-block',
        }}>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          key={curIndex}
          className={'flex items-center text-4xl font-medium text-white'}>
          0{curIndex + 1}
        </motion.div>
      </span>
    </>
  );
};

const sliderData = [
  {
    img: '/images/banners/banner_login_1.png',
    title: 'Banner 1',
    description: 'Description for Banner 1',
  },
  {
    img: '/images/banners/banner_login_2.png',
    title: 'Banner 2',
    description: 'Description for Banner 2',
  },
  {
    img: '/images/banners/banner_login_3.png',
    title: 'Banner 3',
    description: 'Description for Banner 3',
  },
  {
    img: '/images/banners/banner_login_4.png',
    title: 'Banner 4',
    description: 'Description for Banner 4',
  },
  {
    img: '/images/banners/banner_login_5.png',
    title: 'Banner 5',
    description: 'Description for Banner 5',
  },
];

const initData = sliderData[0];
export default Banner;
