export function ProductDetailsSkeleton() {
  return (
    <div className="shell animate-pulse py-12">
      {/* Breadcrumbs Skeleton */}
      <div className="mb-6 h-4 w-48 rounded bg-slate-200 dark:bg-slate-800" />

      <div className="surface-card grid gap-8 p-4 sm:p-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:p-10">
        {/* Left Column: Visuals */}
        <div className="space-y-4">
          <div className="aspect-square w-full rounded-[32px] bg-slate-100 dark:bg-slate-800" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-slate-100 dark:bg-slate-800" />
            ))}
          </div>
        </div>

        {/* Right Column: Interaction */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-10 w-3/4 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-6 w-1/2 rounded-lg bg-slate-100 dark:bg-slate-800" />
          </div>

          <div className="h-12 w-1/3 rounded-xl bg-slate-200 dark:bg-slate-800" />

          <div className="space-y-2 pt-4">
            <div className="h-4 w-full rounded bg-slate-100 dark:bg-slate-800" />
            <div className="h-4 w-full rounded bg-slate-100 dark:bg-slate-800" />
            <div className="h-4 w-2/3 rounded bg-slate-100 dark:bg-slate-800" />
          </div>

          <div className="h-14 w-full rounded-[24px] bg-slate-200 dark:bg-slate-800" />
          
          <div className="grid grid-cols-2 gap-4 pt-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 rounded-2xl bg-slate-100 dark:bg-slate-800" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
