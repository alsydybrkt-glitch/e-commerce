"use client";
import Image from "next/image";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsBySearch } from "@/features/products/store/productsSlice";
import { useTranslation } from "@/shared/i18n/useTranslation";
import { getProductImage } from "@/features/products/utils/product-helpers";
import { AppDispatch, RootState } from "@/store";
import { Product } from "@/features/products/services/productsApi";

function SearchBox() {
  const { t, tCategoryName } = useTranslation();
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const products = useSelector((state: RootState) => state.products.searchResults);
  const deferredInput = useDeferredValue(inputValue);
  const normalizedInput = deferredInput.trim().toLowerCase();
  const suggestions = useMemo(() => products.slice(0, 4), [products]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      return;
    }

    router.push(`/search?query=${encodeURIComponent(inputValue.trim())}`);
    setInputValue("");
  };

  useEffect(() => {
    if (normalizedInput.length < 2) {
      return;
    }

    const timer = setTimeout(() => {
      dispatch(fetchProductsBySearch(normalizedInput));
    }, 350);

    return () => clearTimeout(timer);
  }, [dispatch, normalizedInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > -1 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        e.preventDefault();
        router.push(`/product/${suggestions[activeIndex].id}`);
        setInputValue("");
        setIsFocused(false);
      }
    } else if (e.key === "Escape") {
      setIsFocused(false);
      setActiveIndex(-1);
    }
  };

  useEffect(() => {
    setActiveIndex(-1);
  }, [inputValue]);

  const isExpanded = isFocused && suggestions.length > 0;

  return (
    <div className="relative w-full max-w-2xl" ref={containerRef}>
      <form
        className="surface-card flex items-center gap-3 rounded-full px-4 py-3"
        onSubmit={handleSubmit}
        role="search"
      >
        <FaSearch className="shrink-0 text-slate-400 dark:text-slate-500" />
        <input
          autoComplete="off"
          type="text"
          role="combobox"
          aria-expanded={isExpanded ? "true" : "false"}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          placeholder={t("header.searchPlaceholder")}
          value={inputValue}

          onChange={(event) => setInputValue(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
        <button type="submit" className="primary-btn !px-4 !py-2 text-xs">
          {t("common.search")}
        </button>
      </form>

      {isFocused && normalizedInput.length >= 2 && suggestions.length > 0 && (
        <ul 
          id="search-suggestions"
          role="listbox"
          className="surface-card absolute inset-x-0 top-[calc(100%+12px)] z-20 overflow-hidden p-2"
        >
          {suggestions.map((product: Product, index: number) => {
            const isSelected = activeIndex === index;
            return (
              <li 
                key={product.id} 
                role="option" 
                aria-selected={isSelected ? "true" : "false"}
                className={`rounded-2xl transition ${
                  isSelected 
                    ? "bg-slate-100 dark:bg-slate-800 ring-1 ring-brand-500/20" 
                    : "hover:bg-slate-50 dark:hover:bg-slate-800/80"
                }`}
              >
                <Link
                  href={`/product/${product.id}`}
                  className="flex w-full items-center gap-3 px-3 py-3 text-start"
                  onClick={() => {
                    setInputValue("");
                    setIsFocused(false);
                  }}
                >
                  <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-700">
                    <Image
                      src={getProductImage(product)}
                      alt={product.title}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {product.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      ${product.price} - {tCategoryName(product.category)}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}

        </ul>
      )}


    </div>
  );
}


export default SearchBox;


