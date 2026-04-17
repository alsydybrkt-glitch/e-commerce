"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchQueryClientProps {
  initialQuery: string;
}

const RECENT_SEARCHES_KEY = "recentSearches";
const RECENT_SEARCHES_LIMIT = 5;

function parseRecentSearches(value: string | null): string[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [];
    }

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
  const [query, setQuery] = useState(initialQuery);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const stored = parseRecentSearches(
      typeof window === "undefined"
        ? null
        : window.localStorage.getItem(RECENT_SEARCHES_KEY)
    );
    setRecentSearches(stored);
  }, []);

  const persistRecentSearch = useCallback((value: string) => {
    const normalized = value.trim();
    if (!normalized || typeof window === "undefined") {
      return;
    }

    setRecentSearches((prev) => {
      const next = [normalized, ...prev.filter((item) => item !== normalized)].slice(
        0,
        RECENT_SEARCHES_LIMIT
      );

      window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  useEffect(() => {
    if (initialQuery.trim()) {
      persistRecentSearch(initialQuery);
    }
  }, [initialQuery, persistRecentSearch]);

  const removeRecentSearch = useCallback((value: string) => {
    if (typeof window === "undefined") {
      return;
    }

    setRecentSearches((prev) => {
      const next = prev.filter((item) => item !== value);
      window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const applyQuery = useCallback(
    (value: string) => {
      const normalized = value.trim();
      const next = new URLSearchParams(currentSearchParams.toString());

      if (normalized) {
        next.set("query", normalized);
      } else {
        next.delete("query");
      }

      next.delete("page");

      const url = next.toString() ? `${pathname}?${next.toString()}` : pathname;
      router.push(url);

      if (normalized) {
        persistRecentSearch(normalized);
      }
    },
    [currentSearchParams, pathname, persistRecentSearch, router]
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applyQuery(query);
  };

  const hasRecentSearches = useMemo(
    () => recentSearches.length > 0,
    [recentSearches.length]
  );

  return (
    <div className="mb-8 space-y-4">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products"
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

              <button
                type="button"
                onClick={() => removeRecentSearch(item)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                aria-label={`Remove ${item}`}
              >
                x
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
