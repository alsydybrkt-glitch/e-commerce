"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { ImageLightbox } from "@/shared/ui/ImageLightbox";
import { getProductGallery } from "@/features/products/utils/product-helpers";
import { Product } from "@/features/products/services/productsApi";
import { Interactive } from "@/shared/ui/Interactive";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = useMemo(() => getProductGallery(product, 4), [product]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-4">
      {/* Main Image Viewport */}
      <div className="relative aspect-square w-full sm:rounded-[32px] overflow-hidden bg-slate-50 dark:bg-slate-800/20 min-h-[350px] sm:min-h-0">

        {/* ============================================================
            MOBILE SWIPER (sm:hidden)
            ✅ Fix: إزلنا الـ SSR placeholder تماماً وخلينا الـ Swiper
            يشتغل من أول لحظة بدون preload مكرر.
            الـ priority بقت على أول صورة في الـ Swiper بس.
        ============================================================ */}
        <div className="h-[400px] w-full sm:hidden relative">
          {mounted ? (
            <Swiper
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".gallery-pagination",
              }}
              onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
              className="h-full w-full"
            >
              {images.map((image: string, index: number) => (
                <SwiperSlide key={index}>
                  <div
                    className="relative h-full w-full bg-slate-50 dark:bg-slate-800/40"
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      // ✅ Fix: priority على أول صورة بس في الـ Swiper
                      // مفيش placeholder منفصل يعمل preload مكرر
                      priority={index === 0}
                      sizes="100vw"
                      className="object-contain p-6"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            // ✅ Fix: الـ placeholder دلوقتي بدون priority ولا preload
            // عشان منعملش preload لصورة هتتعمل preload تاني في الـ Swiper
            <div className="absolute inset-0">
              <Image
                src={images[0]}
                alt={product.title}
                fill
                // ❌ مش priority — ده اللي كان بيسبب الـ warning
                priority={false}
                sizes="100vw"
                className="object-contain p-6"
              />
            </div>
          )}

          {/* Mobile pagination dots */}
          <div className="premium-pagination gallery-pagination sm:hidden" />
        </div>

        {/* ============================================================
            DESKTOP IMAGE VIEW (hidden on mobile)
            ✅ Fix: priority بس لو مش على موبايل (sm breakpoint)
            استخدمنا sizes أدق عشان الـ preload يكون صح
        ============================================================ */}
        <div className="hidden h-full w-full sm:block">
          <Interactive className="h-full w-full">
            <div
              className="group relative h-full w-full cursor-zoom-in rounded-[32px] bg-slate-50 p-6 dark:bg-slate-800/40 dark:ring-1 dark:ring-slate-700/50"
              onClick={() => setIsLightboxOpen(true)}
            >
              <Image
                src={images[currentIndex]}
                alt={product.title}
                fill
                // ✅ Fix: priority تفضل على الـ desktop
                // لكن الـ sizes بقت أدق بدل ما تكون عامة
                priority
                sizes="(max-width: 640px) 0px, (max-width: 1200px) 50vw, 33vw"
                //       ↑ 0px على موبايل = مش هيعمل preload للموبايل
                className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </Interactive>
        </div>
      </div>

      {/* Thumbnails (desktop only) */}
      <div className="hidden sm:grid grid-cols-4 gap-3">
        {images.map((image: string, index: number) => (
          <Interactive key={index}>
            <button
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-square w-full overflow-hidden rounded-2xl border-2 transition-all p-1
                ${
                  currentIndex === index
                    ? "border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-950/30"
                    : "border-transparent bg-slate-100/50 hover:border-slate-200 dark:bg-slate-800/40 dark:hover:border-slate-700"
                }
              `}
              aria-label={`View image ${index + 1}`}
              aria-current={currentIndex === index}
            >
              <div className="relative h-full w-full">
                <Image
                  src={image}
                  alt={`${product.title} thumb ${index + 1}`}
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
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={setCurrentIndex}
      />
    </div>
  );
}