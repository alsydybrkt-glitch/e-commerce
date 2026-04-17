"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import GuideCard from "./GuideCard";
import { GuideData } from "./GuideSlider";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface MobileGuideSwiperProps {
  guides: GuideData[];
  canLoop: boolean;
  tCategoryName: (slug: string) => string;
  onSwiper: (swiper: any) => void;
  onSlideChange: (swiper: any) => void;
}

export default function MobileGuideSwiper({
  guides,
  canLoop,
  tCategoryName,
  onSwiper,
  onSlideChange,
}: MobileGuideSwiperProps) {
  return (
    <>
      <Swiper
        loop={canLoop}
        grabCursor
        speed={600}
        spaceBetween={24}
        modules={[Navigation, Pagination, A11y]}
        pagination={{
          clickable: true,
          el: ".guide-premium-pagination",
        }}
        onSwiper={onSwiper}
        onSlideChange={onSlideChange}
        breakpoints={{
          320: { slidesPerView: 1.1, spaceBetween: 16 },
          640: { slidesPerView: 2.1, spaceBetween: 20 },
        }}
        className="!overflow-visible"
      >
        {guides.map((guide) => (
          <SwiperSlide key={guide.categorySlug} className="!h-auto">
            <GuideCard
              guide={guide}
              categoryName={tCategoryName(guide.categorySlug)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="guide-premium-pagination premium-pagination mt-6 lg:hidden" />
    </>
  );
}
