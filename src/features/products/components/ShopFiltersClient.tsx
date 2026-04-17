"use client";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Category } from "@/services/api/productsApi";
import { 
  ShopSortKey, 
  SHOP_SORT_KEYS, 
} from "@/constants/shop";
import { Interactive } from "@/shared/ui/Interactive";
import { useTranslation } from "@/shared/hooks/useTranslation";

// Swiper styles
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
  searchTerm,
  sortBy,
  inStockOnly,
}: ShopFiltersClientProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const currentSearchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(searchTerm);

  useEffect(() => {
    setSearchInput(searchTerm);
  }, [searchTerm]);

  const activeFiltersCount = useMemo(
    () =>
      (searchTerm.trim() ? 1 : 0) +
      (sortBy !== "featured" ? 1 : 0) +
      (inStockOnly ? 1 : 0),
    [inStockOnly, searchTerm, sortBy]
  );

  const updateFilters = useCallback(
    (updates: Record<string, string | null>) => {
      const next = new URLSearchParams(currentSearchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value.trim() === "") {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      });

      const query = next.toString();
      const target = query ? `${pathname}?${query}` : pathname;

      startTransition(() => {
        router.replace(target, { scroll: false });
      });
    },
    [currentSearchParams, pathname, router]
  );

  useEffect(() => {
    const nextQuery = searchInput.trim();
    const currentQuery = searchTerm.trim();

    if (nextQuery === currentQuery) {
      return undefined;
    }

    const timer = setTimeout(() => {
      updateFilters({
        query: nextQuery || null,
        page: null,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, searchTerm, updateFilters]);

  const handleCategoryChange = (slug: string) => {
    updateFilters({
      category: slug,
      page: null,
    });
  };

  const handleSortChange = (value: ShopSortKey) => {
    updateFilters({
      sort: value === "featured" ? null : value,
      page: null,
    });
  };

  const handleStockChange = (checked: boolean) => {
    updateFilters({
      stock: checked ? "1" : null,
      page: null,
    });
  };

  const handleReset = () => {
    updateFilters({
      query: null,
      sort: null,
      stock: null,
      page: null,
    });
  };

  return (
    <section className="mb-8 space-y-4">
      {/* Premium Category Swiper */}
      <div className="relative">
        {/* Edge masks for premium fade effect */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-white dark:from-slate-950/0 hidden sm:block"></div>
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-white dark:from-slate-950/0 hidden sm:block"></div>

        <Swiper
          modules={[FreeMode]}
          freeMode={true}
          slidesPerView="auto"
          spaceBetween={10}
          className="category-swiper !py-1"
          watchSlidesProgress={true}
        >
          {categories.map((category) => {
            const isActive = category.slug === activeCategory;
            const label = category.name || category.slug.replace(/-/g, " ");

            return (
              <SwiperSlide key={category.slug} className="!w-auto">
                <Interactive>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300
                      ${isActive
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-200 dark:bg-brand-600 dark:shadow-none"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    {label}
                  </button>
                </Interactive>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-2 xl:grid-cols-4 dark:border-slate-800 dark:bg-slate-900/50">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            {t("shop.refineTitle") || "Search"}
          </span>
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder={t("shop.searchPlaceholder")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            {t("category.sortBy") || "Sort"}
          </span>
          <select
            value={sortBy}
            onChange={(event) => handleSortChange(event.target.value as ShopSortKey)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          >
            {SHOP_SORT_KEYS.map((option) => (
              <option key={option} value={option}>
                {t("shop.sortOptions." + option)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(event) => handleStockChange(event.target.checked)}
          />
          {t("shop.inStockOnly")}
        </label>

        <button
          type="button"
          onClick={handleReset}
          disabled={activeFiltersCount === 0}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700"
        >
          {t("shop.clearFilters")} ({activeFiltersCount})
        </button>
      </div>
    </section>
  );
}
