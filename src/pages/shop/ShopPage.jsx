import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiFilter, FiRotateCcw, FiSearch } from "react-icons/fi";
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

const ShopPage = () => {
  const dispatch = useDispatch();
  const { t, tCategoryName } = useTranslation();

  const { categories, singleCategory, loadingCategory, categoriesStatus } =
    useSelector((state) => state.products);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  const deferredSearchTerm = useDeferredValue(searchTerm);

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchAllCategories());
    }
  }, [categoriesStatus, dispatch]);

  const activeCategory = useMemo(
    () => selectedCategory || categories[0]?.slug || "",
    [selectedCategory, categories]
  );

  useEffect(() => {
    if (activeCategory) {
      dispatch(fetchSingleCategory(activeCategory));
    }
  }, [activeCategory, dispatch]);

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts(singleCategory, {
        searchTerm: deferredSearchTerm,
        inStockOnly,
        sortBy,
      }),
    [deferredSearchTerm, inStockOnly, singleCategory, sortBy]
  );

  const sortOptions = [
    { value: "featured", label: t("Featured") },
    { value: "price-low", label: t("Price: Low to High") },
    { value: "price-high", label: t("Price: High to Low") },
    { value: "rating", label: t("Rating") },
  ];

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

  return (
    <PageTransition>
      <section className="shell section-gap">

        {/* Categories */}
        <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition
                ${
                  activeCategory === cat.slug
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              {tCategoryName(cat.slug)}
            </button>
          ))}
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowFilters(true)}
          className="lg:hidden mb-4 flex items-center gap-2 rounded-xl border px-4 py-2 text-sm"
        >
          <FiFilter />
          {t("Filters")}

          {activeFiltersCount > 0 && (
            <span className="bg-slate-900 text-white text-xs px-2 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

          {/* Sidebar */}
          <aside className="hidden lg:block sticky top-24 h-fit">
            <div className="rounded-2xl border p-6 bg-white dark:bg-slate-800 space-y-6">

              <h3 className="font-semibold text-lg">Filters</h3>

              {/* Search */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-3 text-slate-400" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t("Search")}
                  className="w-full rounded-xl border border-slate-200 px-9 py-2.5 text-sm
                  focus:ring-2 focus:ring-slate-900 outline-none"
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setOpenSort(!openSort)}
                  className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-medium"
                >
                  {sortOptions.find((o) => o.value === sortBy)?.label}
                  <span className="text-slate-400">▼</span>
                </button>

                {openSort && (
                  <div className="absolute mt-2 w-full rounded-xl border border-slate-200 bg-white dark:bg-slate-800 shadow-lg overflow-hidden z-50">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setOpenSort(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${
                          sortBy === option.value
                            ? "bg-slate-100 dark:bg-slate-700 font-semibold"
                            : ""
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Stock */}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                {t("In Stock Only")}
              </label>

              {/* Reset */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 text-sm text-brand-600"
                >
                  <FiRotateCcw />
                  {t("Clear Filters")}
                </button>
              )}
            </div>
          </aside>

          {/* Products */}
          <div>

            {/* products count */}
            <div className="mb-4 text-sm text-slate-500">
              {filteredProducts.length} Products
            </div>

            {loadingCategory ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="rounded-xl border p-3 animate-pulse">
                    <div className="h-40 bg-slate-200 rounded-md mb-3" />
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                {t("No products found")}
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
                {filteredProducts.map((item) => (
                  <Product key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filters Drawer */}
        <div
          className={`fixed inset-0 z-50 lg:hidden ${
            showFilters ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >

          <div
            onClick={() => setShowFilters(false)}
            className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
              showFilters ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute right-0 top-0 h-full w-[85%] max-w-[320px]
            bg-white dark:bg-slate-900 p-6 shadow-xl
            transition-transform duration-500 ease-out
            ${showFilters ? "translate-x-0" : "translate-x-full"}`}
          >

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>

              <button
                aria-label="Close filters"
                onClick={() => setShowFilters(false)}
                className="text-xl"
              >
                ✕
              </button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <p className="text-xs text-slate-500 mb-1">Search</p>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border px-4 py-2 text-sm"
              />
            </div>

            {/* Sort */}
            <div className="mb-4">
              <p className="text-xs text-slate-500 mb-2">Sort</p>

              <div className="relative">
                <button
                  onClick={() => setOpenSort(!openSort)}
                  className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-medium"
                >
                  {sortOptions.find((o) => o.value === sortBy)?.label}
                  <span className="text-slate-400">▼</span>
                </button>

                {openSort && (
                  <div className="absolute mt-2 w-full rounded-xl border border-slate-200 bg-white dark:bg-slate-800 shadow-lg overflow-hidden z-50">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setOpenSort(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${
                          sortBy === option.value
                            ? "bg-slate-100 dark:bg-slate-700 font-semibold"
                            : ""
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Stock */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              In Stock Only
            </label>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="mt-6 flex items-center gap-2 text-sm text-brand-600"
              >
                <FiRotateCcw />
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ShopPage;
