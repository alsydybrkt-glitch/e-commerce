"use client";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "./ProductCard";
import { Product as ProductType } from "@/services/api/productsApi";



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
  const [cssLoaded, setCssLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      import("swiper/css"),
      import("swiper/css/navigation"),
      import("swiper/css/pagination")
    ]).then(() => setCssLoaded(true));
  }, []);

  const handleSwiper = useCallback(
    (swiper: any) => {
      swiperRef.current = swiper;
      onSwiper(swiper);
    },
    [onSwiper]
  );

  if (!items || items.length === 0) return null;
  if (!cssLoaded) return <div className="h-[400px] w-full animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-800/50" />;

  return (
    <div className="mobile-product-swiper-wrapper relative w-full">
      <Swiper
        loop={false}
        cssMode={true}
        spaceBetween={16}
        modules={[Navigation, Pagination, A11y]}
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