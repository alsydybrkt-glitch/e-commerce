export default function OrderTrackingLoading() {
  return (
    <div className="shell py-12">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <div className="mx-auto h-12 w-64 animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />
          <div className="mx-auto h-4 w-96 animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />
        </div>

        <div className="rounded-3xl border border-border-light bg-surface-primary p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />
              <div className="h-14 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800/40" />
            </div>
            <div className="h-14 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800/40" />
          </div>
        </div>

        {/* Benefits/Info Skeleton */}
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800/20" />
          ))}
        </div>
      </div>
    </div>
  );
}
