"use client";

import { useCallback, useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import { Category } from "@/services/api/productsApi";
import { ShopSortKey, SHOP_SORT_KEYS } from "@/constants/shop";
import { Interactive } from "@/shared/ui/Interactive";
import { useTranslation } from "@/shared/hooks/useTranslation";

import "swiper/css";
import "swiper/css/free-mode";

interface ShopFiltersClientProps {
  categories: Category[];
  activeCategory: string;
  searchTerm: string;
  sortBy: ShopSortKey;
  inStockOnly: boolean;
}

export default function ShopFiltersClient({
  categories,
  activeCategory,
  sortBy,
  inStockOnly,
}: ShopFiltersClientProps) {
  const { t } = useTranslation();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  /* -----------------------------
     Active Filters Counter
  ------------------------------ */

  const activeFiltersCount = useMemo(() => {
    let count = 0;

    if (sortBy !== "featured") count++;
    if (inStockOnly) count++;

    return count;
  }, [sortBy, inStockOnly]);

  /* -----------------------------
     Update Filters
  ------------------------------ */

  const updateFilters = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (!value || value.trim() === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      startTransition(() => {
        router.replace(url, { scroll: false });
      });
    },
    [pathname, router, searchParams]
  );

  /* -----------------------------
     Handlers
  ------------------------------ */

  const handleCategoryChange = useCallback(
    (slug: string) => {
      updateFilters({
        category: slug,
        page: null,
      });
    },
    [updateFilters]
  );

  const handleSortChange = useCallback(
    (value: ShopSortKey) => {
      updateFilters({
        sort: value === "featured" ? null : value,
        page: null,
      });
    },
    [updateFilters]
  );

  const handleStockChange = useCallback(
    (checked: boolean) => {
      updateFilters({
        stock: checked ? "1" : null,
        page: null,
      });
    },
    [updateFilters]
  );

  const handleReset = useCallback(() => {
    updateFilters({
      query: null,
      sort: null,
      stock: null,
      page: null,
    });
  }, [updateFilters]);

  /* -----------------------------
     Category Button Style
  ------------------------------ */

  const categoryClass = (isActive: boolean) =>
    `whitespace-nowrap rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-300
    ${
      isActive
        ? "bg-slate-900 text-white shadow-lg dark:bg-brand-600"
        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
    }`;

  /* -----------------------------
     Memoized Categories
  ------------------------------ */

  const categoryItems = useMemo(() => {
    return categories.map((category) => {
      const isActive = category.slug === activeCategory;
      const label = category.name || category.slug.replace(/-/g, " ");

      return (
        <Interactive key={category.slug}>
          <button
            type="button"
            onClick={() => handleCategoryChange(category.slug)}
            className={categoryClass(isActive)}
          >
            {label}
          </button>
        </Interactive>
      );
    });
  }, [categories, activeCategory, handleCategoryChange]);

  /* -----------------------------
     Render
  ------------------------------ */

  return (
    <section className="mb-10 space-y-6">

      {/* -----------------------------
         Categories
      ------------------------------ */}

      <div className="relative">

        {/* Desktop */}

        <div className="hidden lg:flex flex-wrap gap-3">
          {categoryItems}
        </div>

        {/* Mobile */}

        <div className="lg:hidden">
          <Swiper
            modules={[FreeMode]}
            freeMode
            slidesPerView="auto"
            spaceBetween={10}
            watchSlidesProgress
            className="!py-2"
          >
            {categories.map((category) => {
              const isActive = category.slug === activeCategory;
              const label =
                category.name || category.slug.replace(/-/g, " ");

              return (
                <SwiperSlide key={category.slug} className="!w-auto">
                  <Interactive>
                    <button
                      type="button"
                      onClick={() =>
                        handleCategoryChange(category.slug)
                      }
                      className={categoryClass(isActive)}
                    >
                      {label}
                    </button>
                  </Interactive>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* -----------------------------
         Filters Panel
      ------------------------------ */}

      <div className="glass-darker grid gap-4 rounded-3xl p-5 sm:p-6 md:grid-cols-3">

        {/* Sort */}

        <label className="block">
          <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {t("category.sortBy") || "Sort"}
          </span>

          <select
            value={sortBy}
            onChange={(e) =>
              handleSortChange(e.target.value as ShopSortKey)
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-brand-500 dark:border-slate-800 dark:bg-slate-950"
          >
            {SHOP_SORT_KEYS.map((option) => (
              <option key={option} value={option}>
                {t("shop.sortOptions." + option)}
              </option>
            ))}
          </select>
        </label>

        {/* Stock */}

        <div className="flex flex-col">
          <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {t("shop.inStockOnly")}
          </span>

          <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold dark:border-slate-800 dark:bg-slate-950">
            <span>{t("shop.inStockOnly")}</span>

            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) =>
                handleStockChange(e.target.checked)
              }
              className="h-5 w-5 accent-brand-600"
            />
          </label>
        </div>

        {/* Reset */}

        <div className="flex flex-col">
          <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {t("shop.clearFilters")}
          </span>

          <button
            type="button"
            onClick={handleReset}
            disabled={activeFiltersCount === 0 || isPending}
            className="flex items-center justify-center rounded-2xl bg-rose-50 px-4 py-3 text-sm font-black uppercase tracking-widest text-rose-500 transition hover:bg-rose-100 disabled:opacity-30"
          >
            {isPending ? "..." : t("common.clear") || "Clear"}
          </button>
        </div>
      </div>
    </section>
  );
}