"use client";

import Image from "next/image";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // ✅ Fix #3: استخدام usePathname بدل window.location
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsBySearch } from "@/features/products/store/productsSlice";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { getProductImage } from "@/shared/utils/product-helpers";
import { AppDispatch, RootState } from "@/store";
import { Product } from "@/services/api/productsApi";

function highlight(text: string, query: string) {
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="text-brand-600 font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
}

function SearchBox() {
  const { t, tCategoryName } = useTranslation();
  const router = useRouter();
  const pathname = usePathname(); // ✅ Fix #3: usePathname بدل window.location
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(
    (state: RootState) => state.products.searchResults
  );

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true); // ✅ Fix #7: تتبع حالة الـ mount لمنع memory leak

  // ✅ Fix #7: cleanup عند unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const suggestions = useMemo(() => {
    return products?.slice(0, 3) || [];
  }, [products]);

  // ✅ Fix #2 & #8: reset loading لو query أقل من 2 + Fix #7: منع memory leak
  useEffect(() => {
    if (normalizedQuery.length < 2) {
      setLoading(false); // ✅ Fix #8: reset loading state لو query قصير
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      dispatch(fetchProductsBySearch(normalizedQuery)).finally(() => {
        if (mountedRef.current) { // ✅ Fix #7: بس لو component لسه موجود
          setLoading(false);
        }
      });
    }, 350);

    return () => clearTimeout(timer);
  }, [normalizedQuery, dispatch]);

  // click outside
  useEffect(() => {
    const handleClick = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("pointerdown", handleClick);

    return () => document.removeEventListener("pointerdown", handleClick);
  }, []);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query.trim())}`);

    setQuery("");
    setFocused(false); // ✅ Fix #4: الـ dropdown بيتقفل عند submit (كان موجود بس متأكدين منه)
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    }

    if (e.key === "Enter") {
      if (activeIndex >= 0) {
        e.preventDefault();

        const product = suggestions[activeIndex];
        // ✅ Fix #3: استخدام pathname من usePathname بدل window.location
        const locale = pathname.split("/")[1] || "en";

        router.push(`/${locale}/product/${product.id}`);

        setQuery("");
        setFocused(false);
      }
    }

    if (e.key === "Escape") {
      setFocused(false);
      setActiveIndex(-1);
    }
  };

  const expanded = focused && normalizedQuery.length >= 2;

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      {/* ✅ Fix #5: aria-expanded كـ boolean مش string */}
      <div
        role="combobox"
        aria-expanded={expanded ? "true" : "false"}
        aria-haspopup="listbox"
        aria-controls="search-suggestions"
      >
        <form
          role="search"
          onSubmit={handleSubmit}
          className="surface-card flex items-center gap-3 rounded-full px-4 py-3"
        >
          <FaSearch className="shrink-0 text-slate-400 dark:text-slate-500" />

          <input
            type="text"
            autoComplete="off"
            value={query}
            placeholder={t("header.searchPlaceholder")}
            aria-autocomplete="list"
            aria-controls="search-suggestions"
            aria-activedescendant={
              activeIndex >= 0 ? `search-option-${activeIndex}` : undefined
            }
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500"
          />

          <button
            type="submit"
            className="primary-btn !px-3 !py-2 sm:!px-4"
          >
            <span className="hidden sm:inline">{t("common.search")}</span>
            <FaSearch className="text-xs sm:hidden" />
          </button>
        </form>
      </div>

      {expanded && (
        // ✅ Fix #1: إضافة rounded-2xl و shadow-lg للـ dropdown ليكون consistent
        <div className="surface-card absolute inset-x-0 top-[calc(100%+10px)] z-20 overflow-hidden rounded-2xl shadow-lg p-2">
          {loading && (
            <div className="p-4 text-sm text-slate-500 animate-pulse">
              {t("common.searching")}
            </div>
          )}

          {!loading && suggestions.length === 0 && (
            <div className="p-4 text-sm text-slate-500">
              {t("common.noProductsFound")}
            </div>
          )}

          {!loading && suggestions.length > 0 && (
            <ul id="search-suggestions" role="listbox">
              {suggestions.map((product: Product, index: number) => {
                const selected = activeIndex === index;

                return (
                  <li
                    key={product.id}
                    id={`search-option-${index}`}
                    role="option"
                    aria-selected={selected ? "true" : "false"} // ✅ Fix #5: string "true"/"false" conform to valid values
                    className={`rounded-2xl transition ${
                      selected
                        ? "bg-slate-100 dark:bg-slate-800 ring-1 ring-brand-500/20"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/80"
                    }`}
                  >
                    <Link
                      href={`/product/${product.id}`}
                      className="flex items-center gap-3 px-3 py-3"
                      onClick={() => {
                        setQuery("");
                        setFocused(false);
                      }}
                    >
                      <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-700">
                        <Image
                          src={getProductImage(product)}
                          alt={product.title}
                          width={56}
                          height={56}
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {highlight(product.title, query)}
                        </p>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          ${product.price} — {tCategoryName(product.category)}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
