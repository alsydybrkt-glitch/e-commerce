import { Skeleton, SkeletonCard, SkeletonText } from "@/shared/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Hero Skeleton - Full width placeholder */}
      <div className="shell-sm pt-4 lg:pt-8">
        <div className="relative overflow-hidden rounded-[20px] lg:rounded-[32px] bg-slate-200/60 dark:bg-slate-800/40 h-[600px] sm:h-[650px] lg:h-[720px] flex items-center px-8 sm:px-16 overflow-hidden">
          {/* Internal Hero Content Skeleton */}
          <div className="max-w-xl space-y-6">
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-16 w-full rounded-2xl" />
            <SkeletonText lines={2} className="h-5" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-12 w-40 rounded-2xl" />
              <Skeleton className="h-12 w-32 rounded-2xl" />
            </div>
          </div>
          {/* Subtle shimmer for the hero background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Trust Bar Skeleton */}
      <div className="shell flex flex-wrap items-center justify-between gap-6 py-10 border-y border-border-light dark:border-slate-800">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="h-3 w-32 rounded-full opacity-60" />
            </div>
          </div>
        ))}
      </div>

      {/* Categories Grid Skeleton */}
      <section className="shell">
        <div className="mb-8 flex items-end justify-between">
          <div className="space-y-3">
            <Skeleton className="h-5 w-48 rounded-full" />
            <Skeleton className="h-10 w-72 rounded-xl" />
          </div>
          <Skeleton className="hidden h-10 w-32 rounded-xl md:block" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="relative h-[280px] overflow-hidden rounded-[32px] bg-slate-200/60 dark:bg-slate-800/40 p-8">
              <Skeleton className="h-5 w-24 rounded-full mb-4" />
              <Skeleton className="h-8 w-40 rounded-lg" />
              <div className="absolute bottom-8 right-8">
                 <Skeleton className="h-12 w-12 rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Skeleton */}
      <section className="shell">
        <div className="mb-10 space-y-3">
          <Skeleton className="h-5 w-40 rounded-full" />
          <Skeleton className="h-10 w-80 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
