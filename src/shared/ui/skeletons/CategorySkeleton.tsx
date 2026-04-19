import { memo } from "react";
import SkeletonProduct from "@/features/products/slide-product/ProductSkeleton";

function CategorySkeleton() {
  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950/20">
      {/* Premium Hero Skeleton */}
      <section className="shell overflow-x-hidden pt-6 sm:pt-10">
        <div className="relative animate-pulse overflow-hidden rounded-[1rem] bg-slate-100 p-8 sm:p-14 dark:bg-slate-900/60 shadow-inner">
          {/* Animated Gradient Glow Effect */}
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand-500/10 blur-[120px] dark:opacity-20" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-emerald-500/5 blur-[120px] dark:opacity-10" />

          <div className="relative z-10">
            {/* Kicker Pill */}
            <div className="h-8 w-32 rounded-full bg-slate-200 dark:bg-slate-800/50" />

            {/* Title */}
            <div className="mt-8 h-16 w-3/4 rounded-2xl bg-slate-200 dark:bg-slate-800/50 sm:h-24 sm:w-1/2" />

            {/* Description Lines */}
            <div className="mt-8 space-y-3">
              <div className="h-4 w-full max-w-2xl rounded-full bg-slate-200 dark:bg-slate-800/50" />
              <div className="h-4 w-4/5 max-w-xl rounded-full bg-slate-200 dark:bg-slate-800/50" />
            </div>

            {/* Footer Row (Stats & Sort) */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-8">
              {/* Stat Card */}
              <div className="h-24 w-32 rounded-3xl bg-white/50 border border-slate-50 dark:bg-white/5 dark:border-white/5 shadow-sm" />

              {/* Sort pill */}
              <div className="h-12 w-40 rounded-3xl bg-white/50 border border-slate-50 dark:bg-white/5 dark:border-white/5 shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="shell section-gap pb-32">
        {/* Section Title Placeholder */}
        <div className="mb-10 h-10 w-48 rounded-xl bg-slate-100 dark:bg-slate-800/40" />

        {/* Dense Grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6">
          {[...Array(10)].map((_, i) => (
            <SkeletonProduct key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default memo(CategorySkeleton);
