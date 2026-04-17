export default function CheckoutSkeleton() {
  return (
    <div className="shell animate-pulse py-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
      {/* Checkout Form Skeleton */}
      <div className="space-y-10">
        <div className="space-y-3">
          <div className="h-10 w-48 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-64 rounded-full bg-slate-100 dark:bg-slate-800" />
        </div>

        <div className="space-y-6">
          <div className="h-8 w-40 border-b border-slate-100 pb-2 bg-slate-100 rounded dark:bg-slate-800" />
          <div className="grid gap-4 sm:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`h-12 w-full rounded-2xl bg-slate-100 dark:bg-slate-800 ${i === 2 ? "sm:col-span-2" : ""}`} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="h-8 w-40 border-b border-slate-100 pb-2 bg-slate-100 rounded dark:bg-slate-800" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-12 w-full rounded-2xl bg-slate-100 dark:bg-slate-800 sm:col-span-2" />
            <div className="h-12 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
            <div className="h-12 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
          </div>
        </div>
      </div>

      {/* Summary Sidebar Skeleton */}
      <aside className="surface-card h-fit p-6 sm:p-8 space-y-6">
        <div className="h-8 w-48 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="h-4 w-24 rounded bg-slate-100 dark:bg-slate-800" />
            <div className="h-4 w-16 rounded bg-slate-100 dark:bg-slate-800" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-24 rounded bg-slate-100 dark:bg-slate-800" />
            <div className="h-4 w-12 rounded bg-slate-100 dark:bg-slate-800" />
          </div>
        </div>
        <div className="border-t border-slate-100 pt-6 flex justify-between">
          <div className="h-6 w-16 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-6 w-24 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="h-14 w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </aside>
    </div>
  );
}
