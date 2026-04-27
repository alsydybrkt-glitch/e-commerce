"use client";

import React, { useState, memo, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import Product from "./Product";
import LoadingOfSlideProduct from "./ProductSkeleton";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Product as ProductType } from "@/services/api/productsApi";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { useProductPagination } from "@/features/products/hooks/useProductPagination";
import GridPagination from "./components/GridPagination";

// Dynamically import Swiper component for mobile only to optimize bundle size
const MobileProductSwiper = dynamic(() => import("./MobileProductSwiper"), {
  loading: () => (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:hidden">
      {[...Array(2)].map((_, index) => (
        <LoadingOfSlideProduct key={index} />
      ))}
    </div>
  ),
  ssr: false, // Swiper is client-only
});

interface SlideProductProps {
  category: string;
  description?: string;
  products: ProductType[];
  kicker?: string;
  useShell?: boolean;
  sectionPaddingClassName?: string;
  hideHeader?: boolean;
}

/**
 * SlideProduct component - Refactored for better structure and logic separation.
 */
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
  const isMobile = useIsMobile(1024);
  
  const {
    currentPage,
    totalPages,
    paginatedItems,
    items,
    canLoop,
    setCurrentPage,
    goToNextPage,
    goToPrevPage,
  } = useProductPagination(products, 4, isMobile);

  const finalPadding = sectionPaddingClassName ?? (hideHeader ? "py-4" : "py-20");
  const uniqueId = React.useId().replace(/:/g, "");
  const paginationClass = `pagination-${uniqueId}`;

  return (
    <section className={`${useShell ? "shell " : ""}${finalPadding}`.trim()}>
      {!hideHeader && (
        <SectionHeader 
          kicker={kicker || t("home.featuredEdit")}
          title={category}
          description={description}
        >
          {isMobile ? null : (
            <div className="hidden items-center gap-3 md:flex">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-primary text-text-secondary transition-all hover:bg-bg-secondary hover:text-text-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-800 dark:bg-slate-900"
                aria-label={t("home.sliderPrev")}
              >
                <FiChevronLeft className="text-lg" />
              </button>
              <button
                onClick={goToNextPage}
                disabled={currentPage >= totalPages - 1}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-primary text-text-secondary transition-all hover:bg-bg-secondary hover:text-text-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-800 dark:bg-slate-900"
                aria-label={t("home.sliderNext")}
              >
                <FiChevronRight className="text-lg" />
              </button>
              <span className="min-w-16 text-center text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                {String(currentPage + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
              </span>
            </div>
          )}
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
          {isMobile ? (
            <MobileProductSwiper 
              items={items}
              canLoop={canLoop}
              paginationClass={paginationClass}
              onSwiper={() => {}} 
            />
          ) : (
            <div className="relative">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {paginatedItems.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" 
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Product item={product} priority={currentPage === 0 && index < 4} />
                  </div>
                ))}
              </div>
              
              {!hideHeader && (
                <GridPagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={setCurrentPage} 
                  t={t} 
                />
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default memo(SlideProduct);
