"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ImageLightbox } from "@/shared/ui/ImageLightbox";
import { getProductGallery } from "@/shared/utils/product-helpers";
import { Product } from "@/services/api/productsApi";
import { Interactive } from "@/shared/ui/Interactive";
import styles from "@/shared/ui/SwiperStyles.module.css";



interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = useMemo(() => getProductGallery(product, 4), [product]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [cssLoaded, setCssLoaded] = useState(false);

  const swiperRef = useRef<SwiperType | null>(null);

  // ✅ Fix: Wait for DOM to be ready before rendering Swiper
  // This prevents the white page crash caused by Swiper trying to
  // initialize pagination before the ref element exists in the DOM
  useEffect(() => {
    setIsMounted(true);
    Promise.all([
      import("swiper/css"),
      import("swiper/css/pagination")
    ]).then(() => setCssLoaded(true));
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setCurrentIndex(swiper.activeIndex);
  }, []);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleOpenLightbox = useCallback(() => {
    setIsLightboxOpen(true);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  return (
    <div className="w-full max-w-full min-w-0 space-y-3 sm:space-y-4">
      {/* Main Image Viewport */}
      <div className="relative w-full overflow-hidden bg-slate-50 min-h-[200px] max-h-[300px] aspect-[4/3] dark:bg-slate-800/20 sm:rounded-[32px] sm:aspect-square sm:min-h-0 sm:max-h-none">

        {/* ============================================================
            MOBILE VIEW (sm:hidden)
            ✅ Key Fix: render a simple <img> on server, swap to Swiper
            after mount — avoids Swiper crashing on SSR/hydration
        ============================================================ */}
        <div className="relative h-full w-full sm:hidden">
          {!isMounted || !cssLoaded ? (
            // ✅ SSR-safe static image: no Swiper, no crash, correct LCP
            <div className="relative h-full w-full bg-slate-50 dark:bg-slate-800/40">
              <Image
                src={images[0]}
                alt={product.title}
                fill
                priority
                sizes="100vw"
                className="object-contain p-4"
              />
            </div>
          ) : (
            // ✅ Client-only Swiper: safe to render after DOM is ready
            <Swiper
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".swiper-gallery-pagination",
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
              initialSlide={currentIndex}
              className="h-full w-full"
            >
              {images.map((image: string, index: number) => (
                <SwiperSlide key={image}>
                  <button
                    type="button"
                    aria-label={`View ${product.title} image ${index + 1} fullscreen`}
                    className="relative h-full w-full bg-slate-50 dark:bg-slate-800/40 cursor-zoom-in border-0 outline-none"
                    onClick={handleOpenLightbox}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      className="object-contain p-4"
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* ✅ Pagination + Counter — always in DOM so Swiper finds the el */}
          <div className="pointer-events-none absolute bottom-3 left-0 right-0 z-10 flex flex-col items-center gap-2">
            <div className="rounded-full bg-slate-900/60 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
              {currentIndex + 1} / {images.length}
            </div>
            <div className={`${styles.premiumPagination} ${styles.galleryPagination} swiper-gallery-pagination pointer-events-auto`} />

          </div>
        </div>

        {/* ============================================================
            DESKTOP VIEW (hidden on mobile)
            No changes needed here — desktop never had the white page issue
        ============================================================ */}
        <div className="hidden h-full w-full sm:block">
          <Interactive className="h-full w-full">
            <button
              type="button"
              aria-label={`View ${product.title} fullscreen`}
              className="group relative h-full w-full cursor-zoom-in rounded-[32px] bg-slate-50 p-6 dark:bg-slate-800/40 dark:ring-1 dark:ring-slate-700/50"
              onClick={handleOpenLightbox}
            >
              <Image
                src={images[currentIndex]}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 640px) 0px, (max-width: 1200px) 50vw, 33vw"
                className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </button>
          </Interactive>
        </div>
      </div>

      {/* Thumbnails — desktop only */}
      <div className="hidden min-w-0 sm:grid grid-cols-4 gap-3">
        {images.map((image: string, index: number) => (
          <Interactive key={image}>
            <button
              type="button"
              onClick={() => handleThumbnailClick(index)}
              className={`relative aspect-square w-full overflow-hidden rounded-2xl border-2 transition-all p-1
                ${
                  currentIndex === index
                    ? "border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-950/30"
                    : "border-transparent bg-slate-100/50 hover:border-slate-200 dark:bg-slate-800/40 dark:hover:border-slate-700"
                }
              `}
              aria-label={`View image ${index + 1}`}
              aria-pressed={currentIndex === index}
            >
              <div className="relative h-full w-full">
                <Image
                  src={image}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  fill
                  sizes="100px"
                  className="object-contain"
                />
              </div>
            </button>
          </Interactive>
        ))}
      </div>

      <ImageLightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
        onNavigate={setCurrentIndex}
      />
    </div>
  );
}
