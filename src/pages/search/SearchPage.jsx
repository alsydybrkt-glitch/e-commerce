import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsBySearch } from "../../app/store/slices/productsSlice";
import Product from "../../features/catalog/slide-product/product";
import PageTransitions from "../../shared/ui/PageTransition";
import { useTranslation } from "../../shared/i18n/useTranslation";

/* ─────────────────────────────────────────────
   Hooks
───────────────────────────────────────────── */

function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

function useRecentSearches() {
  const STORAGE_KEY = "recentSearches";
  const MAX = 5;

  const load = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  };

  const [recent, setRecent] = useState(load);

  const save = useCallback((q) => {
    if (!q?.trim()) return;
    setRecent((prev) => {
      const next = [q, ...prev.filter((x) => x !== q)].slice(0, MAX);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const remove = useCallback((q) => {
    setRecent((prev) => {
      const next = prev.filter((x) => x !== q);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { recent, save, remove };
}

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

function SearchHero({ query, resultCount, isRTL, t }) {
  return (
    <header className="relative overflow-hidden rounded-2xl mb-8
      bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900
      dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950
      shadow-xl shadow-zinc-900/30 dark:shadow-black/50
      border border-white/5"
    >
      {/* Decorative blur orbs */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 h-48 w-48
          rounded-full bg-amber-500/20 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40
          rounded-full bg-sky-500/10 blur-3xl"
      />

      <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400/90">
          {t("search.kicker")}
        </p>

        <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-white leading-snug">
          {t("search.title", { query })}
        </h1>

        <p className="mt-2 max-w-xl text-sm text-zinc-400">
          {t("search.copy")}
        </p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full
          bg-white/10 border border-white/10 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-white">
            {isRTL
              ? `${resultCount} نتيجة`
              : `${resultCount} result${resultCount !== 1 ? "s" : ""} found`}
          </span>
        </div>
      </div>
    </header>
  );
}

function RecentSearchChip({ label, onSelect, onRemove }) {
  return (
    <span className="group relative inline-flex items-center gap-1.5 rounded-full
      border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700
      hover:border-zinc-400 hover:bg-zinc-50 cursor-pointer
      dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300
      dark:hover:border-zinc-500 dark:hover:bg-zinc-800
      transition-all duration-150 select-none"
    >
      <button
        type="button"
        className="focus:outline-none"
        onClick={() => onSelect(label)}
        aria-label={`Search for ${label}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-3 h-3 text-zinc-400"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
        {label}
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onRemove(label); }}
        aria-label={`Remove ${label} from recent searches`}
        className="ml-0.5 rounded-full p-0.5 text-zinc-400
          hover:text-zinc-700 dark:hover:text-white
          opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3" aria-hidden="true">
          <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
        </svg>
      </button>
    </span>
  );
}

function RecentSearches({ recent, onSelect, onRemove, isRTL }) {
  if (!recent.length) return null;

  return (
    <section aria-label="Recent searches" className="mb-8">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider
        text-zinc-500 dark:text-zinc-400"
      >
        {isRTL ? "عمليات البحث الأخيرة" : "Recent searches"}
      </h2>
      <div className="flex flex-wrap gap-2">
        {recent.map((item) => (
          <RecentSearchChip
            key={item}
            label={item}
            onSelect={onSelect}
            onRemove={onRemove}
          />
        ))}
      </div>
    </section>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-4
      dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="aspect-square rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-3/4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-3 w-1/2 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-3 w-1/4 rounded-full bg-zinc-300 dark:bg-zinc-700" />
      </div>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div
      className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4"
      aria-label="Loading products"
      aria-busy="true"
    >
      {Array.from({ length: 8 }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

function ProductsGrid({ products }) {
  return (
    <section
      className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4"
      aria-label="Search results"
    >
      {products.map((product) => (
        <Product key={product.id} item={product} />
      ))}
    </section>
  );
}

function EmptyState({ t }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-4 py-20
        rounded-2xl border-2 border-dashed
        border-zinc-200 bg-zinc-50
        dark:border-zinc-700 dark:bg-zinc-900/50"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl
        bg-zinc-100 dark:bg-zinc-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-zinc-400"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </span>

      <div className="text-center max-w-xs px-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
          {t("search.emptyTitle")}
        </h2>
        <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          {t("search.emptyCopy")}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */

function SearchPage() {
  const { t, isRTL } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.searchResults);
  const loading = useSelector((state) => state.products.loadingProduct);

  const query = useMemo(
    () => new URLSearchParams(location.search).get("query") ?? "",
    [location.search]
  );

  const debouncedQuery = useDebounce(query, 400);
  const { recent, save, remove } = useRecentSearches();

  useEffect(() => {
    if (debouncedQuery.trim()) {
      dispatch(fetchProductsBySearch(debouncedQuery));
      save(debouncedQuery);
    }
  }, [dispatch, debouncedQuery, save]);

  const resultCount = products?.length ?? 0;

  const handleRecentSelect = useCallback(
    (q) => navigate(`?query=${encodeURIComponent(q)}`),
    [navigate]
  );

  const showSkeleton = loading;
  const showProducts = !loading && resultCount > 0;
  const showEmpty = !loading && resultCount === 0 && debouncedQuery.trim() !== "";

  return (
    <PageTransitions key={query}>
      <div className="shell py-8">

        <SearchHero
          query={query}
          resultCount={resultCount}
          isRTL={isRTL}
          t={t}
        />

        <RecentSearches
          recent={recent}
          onSelect={handleRecentSelect}
          onRemove={remove}
          isRTL={isRTL}
        />

        <main>
          {showSkeleton && <SkeletonGrid />}
          {showProducts && <ProductsGrid products={products} />}
          {showEmpty && <EmptyState t={t} />}
        </main>

      </div>
    </PageTransitions>
  );
}

export default SearchPage;