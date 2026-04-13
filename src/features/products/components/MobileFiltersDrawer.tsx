"use client";
import { FiRotateCcw, FiSearch, FiX } from "react-icons/fi";

import { Interactive } from "@/shared/ui/Interactive";

interface SortOption {
  value: string;
  label: string;
}

interface MobileFiltersDrawerProps {
  open: boolean;
  onClose: () => void;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  sortBy: string;
  sortOptions: SortOption[];
  openSort: boolean;
  onToggleSort: () => void;
  onSelectSort: (value: string) => void;
  inStockOnly: boolean;
  onInStockOnlyChange: (checked: boolean) => void;
  activeFiltersCount: number;
  onResetFilters: () => void;
  t: (key: string, params?: any) => any;
}

export default function MobileFiltersDrawer({
  open,
  onClose,
  searchTerm,
  onSearchTermChange,
  sortBy,
  sortOptions,
  openSort,
  onToggleSort,
  onSelectSort,
  inStockOnly,
  onInStockOnlyChange,
  activeFiltersCount,
  onResetFilters,
  t,
}: MobileFiltersDrawerProps) {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute right-0 top-0 h-full w-[85%] max-w-[320px]
          bg-white p-6 shadow-xl transition-transform duration-500 ease-out
          dark:bg-slate-900 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{t("shop.refineTitle")}</h3>

          <Interactive variant="scale">
            <button aria-label="Close filters" onClick={onClose} className="text-xl">
              <FiX />
            </button>
          </Interactive>
        </div>

        <div className="mb-4">
          <p className="mb-1 text-xs text-slate-500">{t("common.search")}</p>
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              placeholder={t("shop.searchPlaceholder")}
              aria-label={t("common.search")}
              className="w-full rounded-xl border border-slate-200 px-9 py-2.5 text-sm"
            />
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-2 text-xs text-slate-500">{t("shop.sortLabel", { value: "" })}</p>

          <div className="relative">
            <Interactive variant="none">
              <button
                onClick={onToggleSort}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium dark:bg-slate-800"
              >
                {sortOptions.find((o) => o.value === sortBy)?.label}
                <span className="text-slate-400">v</span>
              </button>
            </Interactive>

            {openSort && (
              <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:bg-slate-800">
                {sortOptions.map((option) => (
                  <Interactive key={option.value} variant="scale">
                    <button
                      onClick={() => onSelectSort(option.value)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${
                        sortBy === option.value ? "bg-slate-100 font-semibold dark:bg-slate-700" : ""
                      }`}
                    >
                      {option.label}
                    </button>
                  </Interactive>
                ))}
              </div>
            )}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockOnlyChange(e.target.checked)}
          />
          {t("shop.inStockOnly")}
        </label>

        {activeFiltersCount > 0 && (
          <button
            onClick={onResetFilters}
            className="mt-6 flex items-center gap-2 text-sm text-brand-600"
          >
            <FiRotateCcw />
            {t("shop.clearFilters")}
          </button>
        )}
      </div>
    </div>
  );
}
