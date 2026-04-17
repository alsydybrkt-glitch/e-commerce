"use client";
import React from "react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "./product";
import { Product as ProductType } from "@/services/api/productsApi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  return (
    <>
      <Swiper
        loop={canLoop}
        grabCursor
        speed={400}
        spaceBetween={18}
        watchSlidesProgress={true}
        resistanceRatio={0.85}
        touchRatio={1.1}
        modules={[Navigation, Pagination, A11y]}
        pagination={{
          clickable: true,
          dynamicBullets: false,
          el: `.${paginationClass}`,
        }}
        onSwiper={onSwiper}
        breakpoints={{
          320: { slidesPerView: 1.15, spaceBetween: 14 },
          480: { slidesPerView: 1.4, spaceBetween: 16 },
          640: { slidesPerView: 2.1, spaceBetween: 18 },
          992: { slidesPerView: 3, spaceBetween: 20 },
        }}
        className="slide-product-swiper"
      >
        {items.map((product, index) => (
          <SwiperSlide key={product.id} className="!h-auto">
            <Product item={product} priority={index < 2} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`${paginationClass} premium-pagination mt-6 lg:hidden`}></div>
    </>
  );
}
