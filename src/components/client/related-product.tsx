import React, { useRef } from 'react';
import { Product } from '@/types/products';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import ProductCard from '@/components/client/product-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RelatedProduct = ({ products }: { products: Product[] }) => {
  const sliderRef = useRef<any>(null);

  const handlePrev = () => {
    if (!sliderRef.current) return;
    sliderRef?.current?.swiper.slidePrev();
  };

  const handleNext = () => {
    if (!sliderRef.current) return;
    sliderRef?.current?.swiper.slideNext();
  };

  return (
    <div className={'relative'}>
      <Swiper
        ref={sliderRef}
        loop={true}
        rewind={true}
        spaceBetween={20}
        slidesPerView={4}
        navigation={{
          prevEl: 'related-button-prev',
          nextEl: 'related-button-next',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Navigation, Autoplay]}>
        {products &&
          products?.length > 0 &&
          products.map((product: Product, index) => (
            <SwiperSlide key={index}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className={'block'}>
        <Button
          onClick={handlePrev}
          className={
            'related-button-prev absolute left-[-50px] right-auto top-1/2 z-[3] flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full border-2 border-solid border-white bg-primary p-0 text-[20px] leading-[0] shadow-[-3.6px_2.4px_0px_0px_#23232B] transition-all duration-500 hover:shadow-none'
          }>
          <ChevronLeft className={'text-white'} />
        </Button>
        <Button
          onClick={handleNext}
          className={
            'related-button-next absolute left-auto right-[-50px] top-1/2 z-[3] flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full border-2 border-solid border-white bg-primary p-0 text-[20px] leading-[0] shadow-[3.6px_2.4px_0px_0px_#23232B] transition-all duration-500 hover:shadow-none'
          }>
          <ChevronRight className={'text-white'} />
        </Button>
      </div>
    </div>
  );
};

export default RelatedProduct;
