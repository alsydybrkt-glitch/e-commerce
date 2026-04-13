"use client";

import { useState, useMemo } from "react";
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

  return (
    <div className="space-y-4">
      {/* Main Image Viewport */}
      <div className="relative aspect-square w-full sm:rounded-[32px] overflow-hidden">
        {/* Mobile Swiper (visible on small screens) */}
        <div className="h-full w-full sm:hidden">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
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
                    priority={index === 0}
                    sizes="100vw"
                    className="object-contain p-6"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Image View (visible on larger screens) */}
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
                priority
                sizes="(max-width: 1200px) 50vw, 33vw"
                className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </Interactive>
        </div>
      </div>

      {/* Thumbnails (hidden on mobile, replaced by Swiper dots) */}
      <div className="hidden sm:grid grid-cols-4 gap-3">
        {images.map((image: string, index: number) => (
          <Interactive key={index}>
            <button
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-square w-full overflow-hidden rounded-2xl border-2 transition-all p-1
                ${currentIndex === index 
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
