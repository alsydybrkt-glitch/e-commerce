"use client";
import React, { useRef, useState, memo, useCallback, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import Product from "./product";
import LoadingOfSlideProduct from "./loadingOfSlideProduct";
import { useTranslation } from "@/shared/i18n/useTranslation";
import { Product as ProductType } from "@/features/products/services/productsApi";

import { Navigation, Pagination, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SlideProductProps {
  category: string;
  description?: string;
  products: ProductType[];
  kicker?: string;
  useShell?: boolean;
  sectionPaddingClassName?: string;
  hideHeader?: boolean;
}

// Sub-component for indicator and controls to isolate re-renders
const SliderControls = memo(({ 
  swiper, 
  totalItems, 
  canLoop, 
  t 
}: { 
  swiper: any, 
  totalItems: number, 
  canLoop: boolean,
  t: any
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!swiper) return;
    
    const handleSlideChange = () => {
      setActiveIndex(swiper.realIndex);
    };

    swiper.on("slideChange", handleSlideChange);
    return () => {
      swiper.off("slideChange", handleSlideChange);
    };
  }, [swiper]);

  const isAtStart = !canLoop && (swiper?.isBeginning ?? true);
  const isAtEnd = !canLoop && (swiper?.isEnd ?? totalItems <= 4);

  return (
    <div className="hidden items-center gap-3 md:flex">
      <button
        type="button"
        disabled={isAtStart}
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface-primary text-text-secondary transition-all hover:bg-bg-secondary hover:text-text-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900"
        onClick={() => swiper?.slidePrev()}
        aria-label={t("home.sliderPrev")}
      >
        <FiChevronLeft className="text-lg" />
      </button>
      <button
        type="button"
        disabled={isAtEnd}
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface-primary text-text-secondary transition-all hover:bg-bg-secondary hover:text-text-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900"
        onClick={() => swiper?.slideNext()}
        aria-label={t("home.sliderNext")}
      >
        <FiChevronRight className="text-lg" />
      </button>
      <span className="min-w-16 text-center text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
        {String(activeIndex + 1).padStart(2, "0")} / {String(totalItems).padStart(2, "0")}
      </span>
    </div>
  );
});

SliderControls.displayName = "SliderControls";

function SlideProduct({
  category,
  description,
  products,
  kicker,
  useShell = true,
  sectionPaddingClassName,
  hideHeader = false,
}: SlideProductProps) {
  const { t } = useTranslation();
  const items = React.useMemo(() => (Array.isArray(products) ? products : []), [products]);
  const slidesPer = 4;
  const canLoop = items.length > slidesPer;
  const [swiper, setSwiper] = useState<any>(null);

  const finalPadding = sectionPaddingClassName ?? (hideHeader ? "py-4" : "py-20");

  const onSwiper = useCallback((instance: any) => {
    setSwiper(instance);
  }, []);

  const uniqueId = React.useId().replace(/:/g, ""); // Remove colons to make it CSS selector safe
  const paginationClass = `pagination-${uniqueId}`;

  return (
    <section className={`${useShell ? "shell " : ""}${finalPadding}`.trim()}>
      {!hideHeader && (
        <SectionHeader 
          kicker={kicker || t("home.featuredEdit")}
          title={category}
          description={description}
        >
          <SliderControls 
            swiper={swiper} 
            totalItems={items.length} 
            canLoop={canLoop} 
            t={t} 
          />
        </SectionHeader>
      )}

      {items.length === 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <LoadingOfSlideProduct key={index} />
          ))}
        </div>
      ) : (
        <div className="relative">
          {hideHeader && swiper && (
            <div className="absolute -top-12 right-0 hidden items-center gap-2 md:flex">
               <button
                 onClick={() => swiper.slidePrev()}
                 aria-label={t("home.sliderPrev")}
                 className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-primary transition-all hover:bg-bg-secondary disabled:opacity-30"
               >
                 <FiChevronLeft />
               </button>
               <button
                 onClick={() => swiper.slideNext()}
                 aria-label={t("home.sliderNext")}
                 className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-primary transition-all hover:bg-bg-secondary disabled:opacity-30"
               >
                 <FiChevronRight />
               </button>
            </div>
          )}

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
              1280: { slidesPerView: 4, spaceBetween: 22 },
            }}
            className="slide-product-swiper"
          >
            {items.map((product, index) => (
              <SwiperSlide key={product.id} className="!h-auto">
                <Product item={product} priority={index < 4} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom positioning container for pagination */}
          <div className={`${paginationClass} premium-pagination`}></div>
        </div>
      )}
    </section>
  );
}

export default memo(SlideProduct);
