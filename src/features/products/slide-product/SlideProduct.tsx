"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import Product from "./product";
import LoadingOfSlideProduct from "./loadingOfSlideProduct";
import { useTranslation } from "@/shared/i18n/useTranslation";
import { Product as ProductType } from "@/features/products/services/productsApi";

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
  const items = Array.isArray(products) ? products : [];
  const slidesPer = 4;
  const canLoop = items.length > slidesPer;
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const [swiper, setSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isAtStart = !canLoop && (swiper?.isBeginning ?? true);
  const isAtEnd = !canLoop && (swiper?.isEnd ?? items.length <= 1);

  const finalPadding = sectionPaddingClassName ?? (hideHeader ? "py-4" : "py-20");

  return (
    <section className={`${useShell ? "shell " : ""}${finalPadding}`.trim()}>
      {!hideHeader && (
        <SectionHeader 
          kicker={kicker || t("home.featuredEdit")}
          title={category}
          description={description}
        >
          <div className="hidden items-center gap-3 md:flex">
            <button
              ref={prevBtnRef}
              type="button"
              disabled={isAtStart}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface-primary text-text-secondary transition-all hover:bg-bg-secondary hover:text-text-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900"
              onClick={() => swiper?.slidePrev()}
              aria-label={t("home.sliderPrev")}
            >
              <FiChevronLeft className="text-lg" />
            </button>
            <button
              ref={nextBtnRef}
              type="button"
              disabled={isAtEnd}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface-primary text-text-secondary transition-all hover:bg-bg-secondary hover:text-text-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900"
              onClick={() => swiper?.slideNext()}
              aria-label={t("home.sliderNext")}
            >
              <FiChevronRight className="text-lg" />
            </button>
            <span className="min-w-16 text-center text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>
        </SectionHeader>
      )}

      {/* Navigation for headless mode (if requested) - usually better to just use Swiper pagination on mobile 
          but if we want manual arrows in headless mode we'd need another UI solution here. 
          For now, we'll keep it simple and rely on swiper pagination/grab. */}

      {items.length === 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <LoadingOfSlideProduct key={index} />
          ))}
        </div>
      ) : (
        <div className="relative">
           {/* Add minimal navigation if header is hidden but we want arrow controls */}
            {hideHeader && (
              <div className="absolute -top-12 right-0 hidden items-center gap-2 md:flex">
                 <button
                   onClick={() => swiper?.slidePrev()}
                   disabled={isAtStart}
                   aria-label={t("home.sliderPrev")}
                   className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-primary transition-all hover:bg-bg-secondary disabled:opacity-30"
                 >
                   <FiChevronLeft />
                 </button>
                 <button
                   onClick={() => swiper?.slideNext()}
                   disabled={isAtEnd}
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
            speed={400} // Shorter speed for snappier feel
            spaceBetween={18}
            watchSlidesProgress={true}
            resistanceRatio={0.85}
            touchRatio={1.1}
            modules={[Navigation, Pagination, A11y]}
            pagination={{
              clickable: true,
              dynamicBullets: true, // Dynamic bullets are easier on the eyes for many slides
            }}
            onSwiper={(instance) => {
              setSwiper(instance);
              setActiveIndex(instance.realIndex || 0);
            }}
            onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
            breakpoints={{
              320: { slidesPerView: 1.15, spaceBetween: 14 },
              480: { slidesPerView: 1.4, spaceBetween: 16 },
              640: { slidesPerView: 2.1, spaceBetween: 18 },
              992: { slidesPerView: 3, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 22 },
            }}
            className="slide-product-swiper pb-12"
          >

            {items.map((product, index) => (
              <SwiperSlide key={product.id || index} className="!h-auto">
                <Product item={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
}


export default SlideProduct;
