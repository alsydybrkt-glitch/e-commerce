"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchQueryClientProps {
  initialQuery: string;
}

const RECENT_SEARCHES_KEY = "recentSearches";
const RECENT_SEARCHES_LIMIT = 5;

// ✅ Fix #7: Utility functions بدل تكرار window check
function getStoredSearches(): string[] {
  if (typeof window === "undefined") return [];
  return parseRecentSearches(window.localStorage.getItem(RECENT_SEARCHES_KEY));
}

function saveStoredSearches(searches: string[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
}

function parseRecentSearches(value: string | null): string[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, RECENT_SEARCHES_LIMIT);
  } catch {
    return [];
  }
}

export default function SearchQueryClient({ initialQuery }: SearchQueryClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentSearchParams = useSearchParams();

  // ✅ Fix #5: استخدام ref عشان نتجنب مسح ما يكتبه المستخدم أثناء navigation
  const isUserTypingRef = useRef(false);
  const [query, setQuery] = useState(initialQuery);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // ✅ Fix #5: بنحدث الـ query بس لو المستخدم مش بيكتب حالياً
  useEffect(() => {
    if (!isUserTypingRef.current) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  // تحميل الـ recent searches من localStorage مرة واحدة
  useEffect(() => {
    setRecentSearches(getStoredSearches());
  }, []);

  const persistRecentSearch = useCallback((value: string) => {
    const normalized = value.trim();
    if (!normalized) return;

    setRecentSearches((prev) => {
      const next = [
        normalized,
        ...prev.filter((item) => item !== normalized),
      ].slice(0, RECENT_SEARCHES_LIMIT);

      saveStoredSearches(next);
      return next;
    });
  }, []);

  // ✅ Fix #1: إزالة الـ useEffect اللي كان بيحفظ initialQuery تلقائياً
  // الحفظ بيحصل بس لما المستخدم يعمل submit فعلي

  const removeRecentSearch = useCallback((value: string) => {
    setRecentSearches((prev) => {
      const next = prev.filter((item) => item !== value);
      saveStoredSearches(next);
      return next;
    });
  }, []);

  const applyQuery = useCallback(
    (value: string) => {
      const normalized = value.trim();

      // ✅ Fix #2: بنقرأ الـ searchParams في وقت التنفيذ مش من الـ closure
      const next = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : ""
      );

      if (normalized) {
        next.set("query", normalized);
      } else {
        next.delete("query");
      }

      next.delete("page");

      const safePathname = pathname || "/";
      const url = next.toString() ? `${safePathname}?${next.toString()}` : safePathname;
      router.push(url);

      // ✅ Fix #1: الحفظ بيحصل بس لما المستخدم يطبق query فعلي
      if (normalized) {
        persistRecentSearch(normalized);
      }

      // بعد الـ navigation، المستخدم مش بيكتب
      isUserTypingRef.current = false;
    },
    [pathname, persistRecentSearch, router]
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applyQuery(query);
  };

  // ✅ Fix #3: بسيطة بدون useMemo
  const hasRecentSearches = recentSearches.length > 0;

  return (
    <div className="mb-8 space-y-4">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        {/* ✅ Fix #6: إضافة aria-label للـ input */}
        <input
          type="search"
          value={query}
          onChange={(event) => {
            isUserTypingRef.current = true;
            setQuery(event.target.value);
          }}
          onBlur={() => {
            isUserTypingRef.current = false;
          }}
          placeholder="Search products"
          aria-label="Search products"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        />

        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
        >
          Search
        </button>
      </form>

      {hasRecentSearches && (
        <div className="flex flex-wrap gap-2">
          {recentSearches.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-sm dark:border-slate-700"
            >
              <button
                type="button"
                onClick={() => applyQuery(item)}
                className="hover:underline"
              >
                {item}
              </button>

              {/* ✅ Fix #4: استخدام × بدل "x" لـ accessibility أحسن */}
              <button
                type="button"
                onClick={() => removeRecentSearch(item)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                aria-label={`Remove ${item}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
