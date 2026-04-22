"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
  { value: "featured", labelKey: "category.sortOptions.featured" },
  { value: "price-low", labelKey: "category.sortOptions.priceLow" },
  { value: "price-high", labelKey: "category.sortOptions.priceHigh" },
  { value: "rating", labelKey: "category.sortOptions.rating" },
];

export function SortDropdown() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSort = searchParams?.get("sort") || "featured";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (value === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    // Reset to first page when sorting
    params.delete("page");

    startTransition(() => {
      router.push(`${pathname || "/"}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-3">
        <span className="hidden text-xs font-bold uppercase tracking-widest text-slate-400 sm:inline-block">
          {t("category.sortBy")}:
        </span>
        <div className="group relative">
          <select
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            disabled={isPending}
            aria-label={t("category.sortBy")}
            className="appearance-none rounded-2xl border border-slate-100 bg-white/80 py-2.5 pl-5 pr-11 text-[13px] font-black tracking-tight text-slate-800 outline-none transition-all hover:bg-white hover:border-slate-200 focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 disabled:opacity-50 dark:border-white/10 dark:bg-slate-900/50 dark:text-white"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="dark:bg-slate-900">
                {t(option.labelKey)}
              </option>
            ))}
          </select>
          <ChevronDown 
            size={16} 
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-brand-500 transition-colors" 
          />
        </div>
      </div>
    </div>
  );
}
