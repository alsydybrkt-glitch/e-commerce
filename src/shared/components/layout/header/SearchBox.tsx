// features/search/ui/SearchBox.tsx
"use client";

import { useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Product } from "@/services/api/productsApi";
import { useSearchBox } from "@/shared/hooks/useSearchBox";
import { SearchSuggestionItem } from "@/features/search/ui/SearchSuggestionItem";

export function SearchBox() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    query,
    setQuery,
    focused,
    setFocused,
    activeIndex,
    loading,
    expanded,
    suggestions,
    close,
    handleSubmit,
    handleKeyDown,
  } = useSearchBox();

  useEffect(() => {
    const handleClick = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("pointerdown", handleClick);
    return () => document.removeEventListener("pointerdown", handleClick);
  }, [close]);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <div
        role="combobox"
        aria-expanded={expanded}
        aria-haspopup="listbox"
        aria-controls={expanded ? "search-suggestions" : undefined}
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
            aria-label={t("header.searchPlaceholder")}
            aria-autocomplete="list"
            aria-controls={expanded ? "search-suggestions" : undefined}
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
            aria-label={t("common.search")}
          >
            <span className="hidden sm:inline">{t("common.search")}</span>
            <FaSearch className="text-xs sm:hidden" aria-hidden="true" />
          </button>
        </form>
      </div>

      {expanded && (
        <div className="surface-card absolute inset-x-0 top-[calc(100%+10px)] z-20 overflow-hidden rounded-2xl shadow-lg p-2">
          {loading && (
            <p className="p-4 text-sm text-slate-500 animate-pulse">
              {t("common.searching")}
            </p>
          )}

          {!loading && suggestions.length === 0 && (
            <p className="p-4 text-sm text-slate-500">
              {t("common.noProductsFound")}
            </p>
          )}

          {!loading && suggestions.length > 0 && (
            <ul id="search-suggestions" role="listbox">
              {suggestions.map((product: Product, index: number) => (
                <SearchSuggestionItem
                  key={product.id}
                  product={product}
                  index={index}
                  activeIndex={activeIndex}
                  query={query}
                  onSelect={close}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;