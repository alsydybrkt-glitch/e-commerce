import { memo } from "react";

function SkeletonProduct() {
  return (
    <div className="group surface-card h-full min-h-[420px] animate-pulse overflow-hidden p-4 flex flex-col justify-between">
      {/* Top Header Placeholder */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="h-6 w-24 rounded-full bg-slate-200 dark:bg-slate-700/50" />
        <div className="flex gap-2">
          <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700/50" />
          <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700/50" />
        </div>
      </div>

      {/* Image Placeholder */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-[24px] bg-slate-200/60 dark:bg-slate-700/30" />

      {/* Content Placeholders */}
      <div className="space-y-3">
        {/* Title Lines */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded-full bg-slate-200 dark:bg-slate-700/50" />
          <div className="h-4 w-4/5 rounded-full bg-slate-200 dark:bg-slate-700/50" />
        </div>

        {/* Stars Placeholder */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-700/50" />
          ))}
        </div>

        {/* Price Placeholder */}
        <div className="h-7 w-1/4 rounded-lg bg-slate-200 dark:bg-slate-700/50" />
      </div>

      {/* Button Placeholder */}
      <div className="mt-4 h-12 w-full rounded-2xl bg-slate-200 dark:bg-slate-700/50" />
    </div>
  );
}

export default memo(SkeletonProduct);
