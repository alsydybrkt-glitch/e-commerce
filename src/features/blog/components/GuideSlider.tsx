"use client";
import React, { useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import GuideCard from "./GuideCard";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Product } from "@/services/api/productsApi";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

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

// Dynamically import Swiper component for mobile only
const MobileGuideSwiper = dynamic(() => import("./MobileGuideSwiper"), {
  loading: () => (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:hidden">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="h-[400px] animate-pulse rounded-[32px] bg-slate-100 dark:bg-slate-800/40" />
      ))}
    </div>
  ),
  ssr: false,
});

interface GuideSliderProps {
  guides: GuideData[];
}

export default function GuideSlider({ guides }: GuideSliderProps) {
  const { t, tCategoryName } = useTranslation();
  const isMobile = useIsMobile(1024);
  const [activeIndex, setActiveIndex] = useState(0);

  // Desktop Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(guides.length / itemsPerPage);

  const paginatedGuides = useMemo(() => {
    if (isMobile) return guides;
    return guides.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  }, [guides, currentPage, isMobile]);

  const canLoop = guides.length > 3;
  const isAtStart = isMobile ? (activeIndex === 0) : (currentPage === 0);
  const isAtEnd = isMobile ? (activeIndex >= guides.length - 1) : (currentPage >= totalPages - 1);

  return (
    <div className="relative">
      <div className="absolute -top-16 right-0 hidden items-center gap-3 md:flex">
        <button
          type="button"
          disabled={isAtStart}
          aria-label={t("home.sliderPrev")}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-brand-500 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
          onClick={() => {
             setCurrentPage(prev => Math.max(0, prev - 1));
          }}
        >
          <FiChevronLeft className="text-xl" />
        </button>
        <button
          type="button"
          disabled={isAtEnd}
          aria-label={t("home.sliderNext")}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-brand-500 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
          onClick={() => {
             setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
          }}
        >
          <FiChevronRight className="text-xl" />
        </button>
      </div>

      {isMobile ? (
        <MobileGuideSwiper 
          guides={guides}
          canLoop={canLoop}
          tCategoryName={tCategoryName}
          onSwiper={() => {}}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedGuides.map((guide, index) => (
            <div key={guide.categorySlug} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: `${index * 100}ms` }}>
              <GuideCard
                guide={guide}
                categoryName={tCategoryName(guide.categorySlug)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
