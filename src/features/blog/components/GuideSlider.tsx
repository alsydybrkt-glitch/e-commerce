"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import GuideCard from "./GuideCard";
import { useTranslation } from "@/shared/i18n/useTranslation";
import { Swiper as SwiperType } from "swiper";
import { Product } from "@/features/products/services/productsApi";

export interface GuideData {
  categorySlug: string;
  eyebrow: string;
  title: string;
  description: string;
  searchTerms: string[];
  readTime: string;
  image: string;
  products: Product[];
}

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface GuideSliderProps {
  guides: GuideData[];
}

export default function GuideSlider({ guides }: GuideSliderProps) {
  const { t, tCategoryName } = useTranslation();
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const canLoop = guides.length > 3;
  const isAtStart = !canLoop && (swiper?.isBeginning ?? true);
  const isAtEnd = !canLoop && (swiper?.isEnd ?? guides.length <= 1);

  return (
    <div className="relative">
      <div className="absolute -top-16 right-0 hidden items-center gap-3 md:flex">
        <button
          ref={prevBtnRef}
          type="button"
          disabled={isAtStart}
          aria-label={t("home.sliderPrev")}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-brand-500 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
          onClick={() => swiper?.slidePrev()}
        >
          <FiChevronLeft className="text-xl" />
        </button>
        <button
          ref={nextBtnRef}
          type="button"
          disabled={isAtEnd}
          aria-label={t("home.sliderNext")}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-brand-500 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
          onClick={() => swiper?.slideNext()}
        >
          <FiChevronRight className="text-xl" />
        </button>
      </div>

      <Swiper
        loop={canLoop}
        grabCursor
        speed={500}
        spaceBetween={24}
        modules={[Navigation, Pagination, A11y]}
        pagination={{
          clickable: true,
          el: ".guide-slider-pagination",
        }}
        onSwiper={(instance) => {
          setSwiper(instance);
          setActiveIndex(instance.realIndex || 0);
        }}
        onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
        breakpoints={{
          320: { slidesPerView: 1.1, spaceBetween: 16 },
          640: { slidesPerView: 2.1, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        className="!overflow-visible pb-12"
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
      
      <div className="guide-slider-pagination mt-4 flex justify-center gap-2" />
    </div>
  );
}

