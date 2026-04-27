import React, { memo } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface GridPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  t: any;
}

/**
 * Premium Pagination for the Grid view
 */
const GridPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  t,
}: GridPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        type="button"
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-primary text-text-secondary transition-all hover:bg-bg-secondary hover:text-text-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-800 dark:bg-slate-900"
        aria-label={t("home.sliderPrev")}
      >
        <FiChevronLeft className="text-lg" />
      </button>

      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentPage === i
                ? "w-8 bg-brand-500"
                : "w-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"
            }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      <button
        type="button"
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-primary text-text-secondary transition-all hover:bg-bg-secondary hover:text-text-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-800 dark:bg-slate-900"
        aria-label={t("home.sliderNext")}
      >
        <FiChevronRight className="text-lg" />
      </button>
    </div>
  );
};

export default memo(GridPagination);
