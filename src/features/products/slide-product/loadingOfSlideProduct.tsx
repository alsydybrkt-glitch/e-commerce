import { memo } from "react";

function SkeletonProduct() {
  return (
    <div className="product-card group relative flex h-full flex-col rounded-[32px] border border-border-light bg-surface-primary p-4 animate-pulse dark:bg-slate-900/40 dark:border-slate-800/50">
      {/* Top Header Placeholder */}
      <div className="mb-4 flex items-center justify-between">
        <div className="h-4 w-20 rounded-md bg-slate-200 dark:bg-slate-800" />
        <div className="flex gap-1.5">
          <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800" />
          <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800" />
        </div>
      </div>

      {/* Image Placeholder */}
      <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-[24px] bg-slate-100 dark:bg-slate-800/50 shadow-inner" />

      {/* Content Spaceholders */}
      <div className="flex-1 space-y-4">
        {/* Title Placeholder */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-2/3 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Rating & Price Placeholder */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-amber-100 dark:bg-amber-900/20" />
            <div className="h-3 w-8 rounded-full bg-slate-100 dark:bg-slate-800" />
          </div>
          <div className="h-6 w-16 rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* Button Placeholder */}
      <div className="mt-6 h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}

export default memo(SkeletonProduct);
