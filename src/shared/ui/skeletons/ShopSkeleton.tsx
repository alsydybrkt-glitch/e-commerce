import SkeletonProduct from "@/features/products/slide-product/ProductSkeleton";

export default function ShopSkeleton() {
  return (
    <div className="shell animate-pulse py-10">
      {/* Category Pills Skeleton */}
      <div className="mb-6 flex gap-3 overflow-hidden pb-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-10 w-24 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800" />
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar Skeleton */}
        <aside className="hidden lg:block space-y-6">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40 space-y-6">
            <div className="h-6 w-32 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-12 w-full rounded-xl bg-slate-100 dark:bg-slate-800" />
            <div className="h-12 w-full rounded-xl bg-slate-100 dark:bg-slate-800" />
            <div className="h-6 w-3/4 rounded bg-slate-100 dark:bg-slate-800" />
          </div>
        </aside>

        {/* Product Grid Skeleton */}
        <div>
          <div className="mb-4 h-4 w-32 rounded bg-slate-100 dark:bg-slate-800" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <SkeletonProduct key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
