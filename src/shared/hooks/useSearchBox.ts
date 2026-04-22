// features/search/hooks/useSearchBox.ts
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProductsBySearch } from "@/features/products/store/productsSlice";

const SUGGESTION_LIMIT = 3;
const DEBOUNCE_MS = 350;
const MIN_QUERY_LENGTH = 2;

export function useSearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products.searchResults);

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();
  const expanded = focused && normalizedQuery.length >= MIN_QUERY_LENGTH;

  const suggestions = useMemo(
    () => products?.slice(0, SUGGESTION_LIMIT) ?? [],
    [products]
  );

  useEffect(() => {
    if (normalizedQuery.length < MIN_QUERY_LENGTH) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      dispatch(fetchProductsBySearch(normalizedQuery)).finally(() =>
        setLoading(false)
      );
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [normalizedQuery, dispatch]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  const close = useCallback(() => {
    setQuery("");
    setFocused(false);
    setActiveIndex(-1);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      close();
    },
    [query, router, close]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!suggestions.length) return;

      const actions: Record<string, () => void> = {
        ArrowDown: () =>
          setActiveIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev
          ),
        ArrowUp: () =>
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1)),
        Enter: () => {
          if (activeIndex >= 0) {
            const product = suggestions[activeIndex];
            const locale = pathname?.split("/")[1] || "en";
            router.push(`/${locale}/product/${product.id}`);
            close();
          }
        },
        Escape: close,
      };

      const action = actions[e.key];
      if (action) {
        e.preventDefault();
        action();
      }
    },
    [suggestions, activeIndex, pathname, router, close]
  );

  return {
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
  };
}