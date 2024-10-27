'use client';

import React, { useCallback, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Star, StarHalf, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const testimonials = [
  {
    index: 1,
    vote: 5,
    imagePath: '/public/images/testimonials/testimonial01.png',
    imageName: 'testimonial01',
    studentName: 'Jenny Nguyễn',
    testimonial:
      'Nội dung và bài tập xuất sắc. Gần đây tôi đã có được việc làm mới bằng cách sử dụng XSL và XML và không thể làm được điều đó nếu không có các khóa học XML và XSL chuyên nghiệp. Cảm ơn!',
  },
  {
    index: 2,
    vote: 4.5,
    imagePath: '/images/testimonials/testimonial02.png',
    imageName: 'testimonial02',
    studentName: 'Nguyễn Mai Trang',
    testimonial:
      'Nội dung và bài tập xuất sắc. Gần đây tôi đã có được việc làm mới bằng cách sử dụng XSL và XML và không thể làm được điều đó nếu không có các khóa học XML và XSL chuyên nghiệp. Cảm ơn!',
  },
  {
    index: 3,
    vote: 5,
    imagePath: '/images/testimonials/testimonial03.png',
    imageName: 'testimonial03',
    studentName: 'Bùi Diệp Chi',
    testimonial:
      'Nội dung và bài tập xuất sắc. Gần đây tôi đã có được việc làm mới bằng cách sử dụng XSL và XML và không thể làm được điều đó nếu không có các khóa học XML và XSL chuyên nghiệp. Cảm ơn!',
  },
  {
    index: 4,
    vote: 5,
    imagePath: '/images/testimonials/testimonial04.png',
    imageName: 'testimonial04',
    studentName: 'Lê Ngọc Huyền',
    testimonial:
      'Nội dung và bài tập xuất sắc. Gần đây tôi đã có được việc làm mới bằng cách sử dụng XSL và XML và không thể làm được điều đó nếu không có các khóa học XML và XSL chuyên nghiệp. Cảm ơn!',
  },
  {
    index: 5,
    vote: 5,
    imagePath: '/images/testimonials/testimonial05.png',
    imageName: 'testimonial05',
    studentName: 'Đặng Quỳnh Trang',
    testimonial:
      'Nội dung và bài tập xuất sắc. Gần đây tôi đã có được việc làm mới bằng cách sử dụng XSL và XML và không thể làm được điều đó nếu không có các khóa học XML và XSL chuyên nghiệp. Cảm ơn!',
  },
];

const Testimonials = () => {
  const sliderRef = useRef<any>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef?.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef?.current?.swiper.slideNext();
  }, []);

  return (
    <div className={'px-0 py-[120px]'}>
      <div className={'container'}>
        <div className={'-mx-4 mt-0 flex flex-wrap justify-center'}>
          <div
            className={
              'mt-0 w-5/12 flex-[0_0_auto] shrink-0 px-4 lg:w-full lg:max-w-full'
            }>
            <div className={'mb-[50px] text-center'}>
              <span
                className={
                  'mb-3.5 inline-block rounded-[30px] bg-primary-foreground px-4 py-1 font-medium capitalize leading-relaxed text-primary'
                }>
                Những lời nhận xét
              </span>
              <h2
                className={
                  'm-0 block text-4xl font-semibold capitalize leading-snug -tracking-[0.75px]'
                }>
                Thành viên nghĩ gì về Zomato
              </h2>
            </div>
          </div>
        </div>
        <div className={'-mx-4 mt-0 flex flex-wrap'}>
          <div
            className={'mt-0 w-full max-w-full flex-[0_0_auto] shrink-0 px-4'}>
            <div className={'relative'}>
              <Swiper
                ref={sliderRef}
                loop={true}
                rewind={true}
                spaceBetween={10}
                slidesPerView={3}
                navigation={{
                  prevEl: 'testimonial-button-prev',
                  nextEl: 'testimonial-button-next',
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                modules={[Navigation, Autoplay]}>
                {testimonials.map((item: any) => (
                  <SwiperSlide key={item.index}>
                    <div
                      className={
                        'relative z-[1] rounded-md bg-[#F6F5FE] px-10 py-10'
                      }>
                      <div
                        className={
                          'mb-5 flex items-center justify-between gap-4'
                        }>
                        <div className={'flex items-center gap-5'}>
                          <div className={'block'}>
                            <Image
                              src={item.imagePath}
                              alt={item.imageName}
                              className={
                                'aspect-square h-auto w-20 rounded-full border-[3px] border-solid border-white object-cover object-top shadow-[0px_4px_10px_0px_rgba(0,0,0,0.2)]'
                              }
                              width={1280}
                              height={843}
                              quality={1}
                              priority={true}
                            />
                          </div>
                          <div className={'block'}>
                            <div className={'mb-2.5'}>
                              <Stars rating={item.vote} />
                            </div>
                            <h2
                              className={
                                'mb-0 text-lg font-semibold leading-snug'
                              }>
                              {item.studentName}
                            </h2>
                          </div>
                        </div>
                        <div>
                          <Quote className={'h-10 w-10 text-[#D9D6F5]'} />
                        </div>
                      </div>
                      <div className={'block'}>
                        <p>{item.testimonial}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className={'block'}>
                <Button
                  onClick={handlePrev}
                  className={
                    'testimonial-button-prev absolute left-[-50px] right-auto top-1/2 z-[3] flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full border-2 border-solid border-white bg-primary p-0 text-[20px] leading-[0] shadow-[-3.6px_2.4px_0px_0px_#23232B] transition-all duration-500 hover:shadow-none'
                  }>
                  <ChevronLeft className={'text-white'} />
                </Button>
                <Button
                  onClick={handleNext}
                  className={
                    'testimonial-button-next absolute left-auto right-[-50px] top-1/2 z-[3] flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full border-2 border-solid border-white bg-primary p-0 text-[20px] leading-[0] shadow-[3.6px_2.4px_0px_0px_#23232B] transition-all duration-500 hover:shadow-none'
                  }>
                  <ChevronRight className={'text-white'} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Stars = React.memo(({ rating }: { rating: number }) => {
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];

    for (let i = 1; i <= fullStars; i++) {
      stars.push(<Star key={i} className={'h-4 w-4 text-amber-500'} />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key='half' className={'h-4 w-4 text-amber-500'} />);
    }

    return stars;
  };
  return (
    <div className='flex items-center gap-x-1 whitespace-nowrap text-secondary'>
      {renderStars()}
    </div>
  );
});
Stars.displayName = 'Stars';

export default Testimonials;
