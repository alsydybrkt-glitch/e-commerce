import SkeletonProduct from "@/features/products/slide-product/loadingOfSlideProduct";

export function PageSkeleton() {
  return (
    <main className="min-h-screen pb-20">
      <div className="shell pt-8 sm:pt-10">
        {/* Hero Slider Skeleton Area */}
        <div className="surface-card animate-pulse overflow-hidden bg-slate-50 dark:bg-slate-900/40">
          <div className="grid items-center gap-10 px-6 py-8 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:py-14">
            <div className="space-y-6">
              <div className="h-6 w-32 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-4">
                <div className="h-12 w-full rounded-2xl bg-slate-200 dark:bg-slate-800 lg:h-16" />
                <div className="h-4 w-4/5 rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="flex gap-3">
                <div className="h-12 w-40 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="h-12 w-40 rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
            <div className="aspect-square rounded-3xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Section Heading Skeleton Area */}
        <div className="mt-20 mb-10 space-y-4">
          <div className="h-6 w-32 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-10 w-64 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Product Grid Skeleton Area */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <SkeletonProduct key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
