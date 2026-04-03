import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiFilter, FiRotateCcw, FiSearch, FiSliders } from "react-icons/fi";
import {
  fetchAllCategories,
  fetchSingleCategory,
} from "../../app/store/slices/productsSlice";
import Product from "../../features/catalog/slide-product/product";
import { useTranslation } from "../../shared/i18n/useTranslation";
import PageTransition from "../../shared/ui/PageTransition";
import {
  countActiveProductFilters,
  filterAndSortProducts,
} from "../../shared/lib/product-helpers";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";

const VISIBLE_CATEGORIES = 6;

const ShopPage = () => {
  const dispatch = useDispatch();
  const { t, tCategoryDescription, tCategoryName, isRTL } = useTranslation();
  const { categories, singleCategory, loadingCategory, categoriesStatus } =
    useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const deferredSearchTerm = useDeferredValue(searchTerm);

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchAllCategories());
    }
  }, [categoriesStatus, dispatch]);

  const activeCategory = selectedCategory || categories[0]?.slug || "";

  useEffect(() => {
    if (activeCategory) {
      dispatch(fetchSingleCategory(activeCategory));
    }
  }, [activeCategory, dispatch]);

  const visible = categories.slice(0, VISIBLE_CATEGORIES);
  const hidden = categories.slice(VISIBLE_CATEGORIES);
  const activeCategoryData = useMemo(
    () => categories.find((category) => category.slug === activeCategory),
    [activeCategory, categories],
  );

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts(singleCategory, {
        searchTerm: deferredSearchTerm,
        inStockOnly,
        sortBy,
      }),
    [deferredSearchTerm, inStockOnly, singleCategory, sortBy],
  );

  const featuredMetrics = useMemo(
    () => [
      {
        label: t("shop.metricActiveCategory"),
        value: activeCategoryData
          ? tCategoryName(activeCategoryData.slug)
          : t("shop.loadingCategory"),
      },
      {
        label: t("shop.metricProductsFound"),
        value: loadingCategory
          ? t("shop.loadingValue")
          : filteredProducts.length,
      },
      {
        label: t("shop.metricBestFor"),
        value:
          (activeCategoryData &&
            (tCategoryDescription(activeCategoryData.slug) ||
              activeCategoryData.description)) ??
          t("shop.metricFallback"),
      },
    ],
    [
      activeCategoryData,
      filteredProducts.length,
      loadingCategory,
      t,
      tCategoryDescription,
      tCategoryName,
    ],
  );

  const sortOptions = useMemo(
    () => [
      { value: "featured", label: t("shop.sortOptions.featured") },
      { value: "price-low", label: t("shop.sortOptions.price-low") },
      { value: "price-high", label: t("shop.sortOptions.price-high") },
      { value: "rating", label: t("shop.sortOptions.rating") },
      { value: "discount", label: t("shop.sortOptions.discount") },
    ],
    [t],
  );

  const selectedSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label ?? sortBy;

  const activeFiltersCount = countActiveProductFilters({
    searchTerm,
    inStockOnly,
    sortBy,
  });

  const resetFilters = () => {
    setSearchTerm("");
    setSortBy("featured");
    setInStockOnly(false);
  };

  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const [swiper, setSwiper] = useState(null);

  return (
    <PageTransition>
      <section className="shop-page shell section-gap">
        <div className="surface-card overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="mb-10 overflow-hidden rounded-[32px] border border-brand-100 bg-gradient-to-br from-white via-brand-50/40 to-stone-50 p-6 text-slate-900 shadow-sm dark:border-slate-700/80 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/40 dark:text-slate-100 dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-700 shadow-sm dark:border-brand-800/60 dark:bg-slate-800/80 dark:text-brand-300">
                  <FiSliders />
                  {t("shop.badge")}
                </span>
                <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
                  {t("shop.title")}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                  {t("shop.copy")}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {featuredMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[24px] border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-600 dark:bg-slate-800/70"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold capitalize text-slate-900 dark:text-slate-100">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-800/40">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {t("shop.browseTitle")}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {t("shop.browseCopy")}
                  </p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-600">
                  {t("shop.totalCategories", { count: categories.length })}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {visible.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeCategory === cat.slug
                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                        : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-600 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600 dark:hover:bg-slate-700 dark:hover:text-brand-400"
                    }`}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setShowMore(false);
                    }}
                  >
                    {tCategoryName(cat.slug)}
                  </button>
                ))}

                {hidden.length > 0 && (
                  <div className="relative">
                    <button
                      type="button"
                      className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:text-brand-600 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600 dark:hover:text-brand-400"
                      onClick={() => setShowMore((prev) => !prev)}
                    >
                      {t("shop.moreCategories")}
                    </button>

                    {showMore && (
                      <div className="surface-card absolute left-0 top-[calc(100%+10px)] z-10 grid w-64 gap-2 p-3">
                        {hidden.map((cat) => (
                          <button
                            key={cat.slug}
                            type="button"
                            className={`rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-brand-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-brand-400 ${
                              isRTL ? "text-right" : "text-left"
                            }`}
                            onClick={() => {
                              setSelectedCategory(cat.slug);
                              setShowMore(false);
                            }}
                          >
                            {tCategoryName(cat.slug)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/40">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-stone-50 text-brand-700 shadow-sm dark:border-brand-800/50 dark:from-brand-950/50 dark:to-slate-900 dark:text-brand-300">
                  <FiFilter className="text-lg" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {t("shop.refineTitle")}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {t("shop.refineCopy")}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 lg:grid-cols-[1fr_220px_180px]">
                <label className="relative block">
                  <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t("shop.searchPlaceholder")}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 py-3 text-sm text-slate-700 placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500"
                  />
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-100"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <label className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 dark:border-slate-500"
                  />
                  {t("shop.inStockOnly")}
                </label>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {activeFiltersCount > 0 ? (
                  <>
                    {searchTerm.trim() && (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        {t("shop.searchLabel", { value: searchTerm.trim() })}
                      </span>
                    )}
                    {sortBy !== "featured" && (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        {t("shop.sortLabel", { value: selectedSortLabel })}
                      </span>
                    )}
                    {inStockOnly && (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        {t("shop.inStockOnly")}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
                    >
                      <FiRotateCcw />
                      {t("shop.clearFilters")}
                    </button>
                  </>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t("shop.noActiveFilters")}
                  </p>
                )}
              </div>
            </div>
          </div>

          {!loadingCategory && activeCategoryData && (
            <div className="mb-6 flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-slate-50/80 px-5 py-4 dark:border-slate-700 dark:bg-slate-800/40 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {t("shop.showingProducts", {
                    count: filteredProducts.length,
                    category: tCategoryName(activeCategoryData.slug),
                  })}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {tCategoryDescription(activeCategoryData.slug) ||
                    activeCategoryData.description ||
                    t("shop.fallbackDescription")}
                </p>
              </div>
              <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-600">
                {t("shop.activeFilters", { count: activeFiltersCount })}
              </div>
            </div>
          )}

          {loadingCategory ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="surface-card animate-pulse p-4">
                  <div className="h-64 rounded-[24px] bg-slate-200 dark:bg-slate-700" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center dark:border-slate-600 dark:bg-slate-800/40">
              <h3 className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100">
                {t("shop.emptyTitle")}
              </h3>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {t("shop.emptyCopy")}
              </p>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="primary-btn mt-6"
                >
                  {t("shop.resetFilters")}
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="hidden lg:flex justify-end gap-2 mb-4">
                <button
                  ref={prevBtnRef}
                  className="secondary-btn px-3 py-2 text-xs font-semibold"
                >
                  Prev
                </button>

                <button
                  ref={nextBtnRef}
                  className="secondary-btn px-3 py-2 text-xs font-semibold"
                >
                  Next
                </button>
              </div>
              <Swiper
                modules={[Navigation]}
                spaceBetween={24}
                navigation={{
                  prevEl: prevBtnRef.current,
                  nextEl: nextBtnRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevBtnRef.current;
                  swiper.params.navigation.nextEl = nextBtnRef.current;
                }}
                breakpoints={{
                  320: { slidesPerView: 1.2 },
                  640: { slidesPerView: 2 },
                  992: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
              >
                {filteredProducts.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Product item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default ShopPage;
