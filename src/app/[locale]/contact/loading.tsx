export default function ContactLoading() {
  return (
    <div className="shell py-12">
      <div className="mb-12 text-center space-y-4">
        <div className="mx-auto h-12 w-64 animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />
        <div className="mx-auto h-4 w-96 animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />
      </div>

      <div className="flex flex-col gap-12 lg:flex-row">
        {/* Contact Info Skeleton */}
        <div className="w-full space-y-8 lg:w-1/3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex h-24 w-full animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800/40" />
          ))}
        </div>

        {/* Contact Form Skeleton */}
        <div className="flex-1 rounded-3xl border border-border-light bg-surface-primary p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />
                  <div className="h-12 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800/40" />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />
              <div className="h-12 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800/40" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-slate-100 dark:bg-slate-800/40" />
              <div className="h-40 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800/40" />
            </div>
            <div className="h-12 w-40 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
