"use client";
import React, { useRef, useState, memo, useCallback, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import Product from "./ProductCard";
import LoadingOfSlideProduct from "./ProductSkeleton";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Product as ProductType } from "@/services/api/productsApi";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

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
 * Premium Pagination for the Grid view
 */
const GridPagination = memo(({ 
  currentPage, 
  totalPages, 
  onPageChange,
  t 
}: { 
  currentPage: number, 
  totalPages: number, 
  onPageChange: (page: number) => void,
  t: any
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        type="button"
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface-primary text-text-secondary transition-all hover:bg-bg-secondary hover:text-text-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-800 dark:bg-slate-900"
        aria-label={t("home.sliderPrev")}
      >
        <FiChevronLeft className="text-lg" />
      </button>

      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentPage === i 
                ? "w-8 bg-brand-500" 
                : "w-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"
            }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      <button
        type="button"
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface-primary text-text-secondary transition-all hover:bg-bg-secondary hover:text-text-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-800 dark:bg-slate-900"
        aria-label={t("home.sliderNext")}
      >
        <FiChevronRight className="text-lg" />
      </button>
    </div>
  );
});

GridPagination.displayName = "GridPagination";

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
  const items = React.useMemo(() => (Array.isArray(products) ? products : []), [products]);
  
  // Pagination State for Desktop Grid
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const paginatedItems = useMemo(() => {
    if (isMobile) return items;
    return items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  }, [items, currentPage, isMobile]);

  const canLoop = items.length > 4;

  const finalPadding = sectionPaddingClassName ?? (hideHeader ? "py-4" : "py-20");

  const uniqueId = React.useId().replace(/:/g, "");
  const paginationClass = `pagination-${uniqueId}`;

  // Reset page when products change
  useEffect(() => {
    setCurrentPage(0);
  }, [items.length, category]);

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
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface-primary text-text-secondary transition-all hover:bg-bg-secondary hover:text-text-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-800 dark:bg-slate-900"
                  aria-label={t("home.sliderPrev")}
                >
                  <FiChevronLeft className="text-lg" />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                  disabled={currentPage >= totalPages - 1}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface-primary text-text-secondary transition-all hover:bg-bg-secondary hover:text-text-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-800 dark:bg-slate-900"
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
          {/* Main Rendering Logic */}
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
                  <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: `${index * 50}ms` }}>
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


