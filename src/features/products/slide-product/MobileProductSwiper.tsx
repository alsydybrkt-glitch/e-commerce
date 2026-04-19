"use client";
import React, { useCallback, useRef } from "react";
import { Navigation, Pagination, A11y, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "./product";
import { Product as ProductType } from "@/services/api/productsApi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

interface MobileProductSwiperProps {
  items: ProductType[];
  canLoop: boolean;
  paginationClass: string;
  onSwiper: (swiper: any) => void;
}

export default function MobileProductSwiper({
  items,
  canLoop,
  paginationClass,
  onSwiper,
}: MobileProductSwiperProps) {
  const swiperRef = useRef<any>(null);

  const handleSwiper = useCallback(
    (swiper: any) => {
      swiperRef.current = swiper;
      onSwiper(swiper);
    },
    [onSwiper]
  );

  if (!items || items.length === 0) return null;

  return (
    <div className="mobile-product-swiper-wrapper relative w-full">
      <Swiper
        loop={canLoop}
        grabCursor
        speed={450}
        spaceBetween={16}
        watchSlidesProgress
        resistanceRatio={0.75}
        touchRatio={1}
        touchStartPreventDefault={false}
        cssMode={false}
        modules={[Navigation, Pagination, A11y, FreeMode]}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          el: `.${paginationClass}`,
        }}
        onSwiper={handleSwiper}
breakpoints={{
  0:   { slidesPerView: 1.1, spaceBetween: 10 },
  360: { slidesPerView: 1.15, spaceBetween: 12 },
  480: { slidesPerView: 1.3, spaceBetween: 14 },
  600: { slidesPerView: 2.8, spaceBetween: 14 },
  768: { slidesPerView: 3.2, spaceBetween: 16 },
  1024: { slidesPerView: 4,  spaceBetween: 20 },
  1280: { slidesPerView: 5,  spaceBetween: 20 },
}}
        className="slide-product-swiper !pb-1"
        a11y={{
          prevSlideMessage: "المنتج السابق",
          nextSlideMessage: "المنتج التالي",
        }}
      >
        {items.map((product, index) => (
          <SwiperSlide
            key={product.id}
            className="!h-auto self-stretch"
            aria-label={`منتج ${index + 1} من ${items.length}`}
          >
            <div className="h-full transition-transform duration-300 ease-out hover:scale-[1.02] will-change-transform">
              <Product item={product} priority={index < 4} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination dots – visible only below lg */}
      <div
        className={`${paginationClass} premium-pagination mt-5 flex justify-center lg:hidden`}
        role="tablist"
        aria-label="تصفح المنتجات"
      />

      {/* Edge fade masks for visual depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-white/60 to-transparent dark:from-neutral-900/60 sm:w-8"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-white/60 to-transparent dark:from-neutral-900/60 sm:w-8"
      />
    </div>
  );
}