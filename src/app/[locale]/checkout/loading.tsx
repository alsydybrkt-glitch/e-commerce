export default function CheckoutLoading() {
  return (
    <div className="shell py-12">
      <div className="mb-12 h-10 w-64 animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />

      <div className="flex flex-col gap-12 lg:flex-row">
        {/* Checkout Form Skeleton */}
        <div className="flex-1 space-y-8">
          <div className="rounded-2xl border border-border-light p-6 dark:border-slate-800">
            <div className="mb-6 h-8 w-48 animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />
            <div className="grid gap-6 md:grid-cols-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />
                  <div className="h-12 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800/40" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border-light p-6 dark:border-slate-800">
            <div className="mb-6 h-8 w-48 animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex h-16 w-full animate-pulse items-center rounded-xl bg-slate-100 dark:bg-slate-800/40 px-4" />
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Skeleton */}
        <div className="w-full lg:w-[400px]">
          <div className="rounded-2xl border border-border-light bg-surface-primary p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 h-8 w-40 animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-16 w-16 animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />
                    <div className="h-4 w-1/4 animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-4">
              <div className="h-px bg-border-light dark:bg-slate-800" />
              <div className="flex justify-between">
                <div className="h-6 w-24 animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />
                <div className="h-6 w-24 animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />
              </div>
            </div>
            <div className="mt-8 h-14 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
