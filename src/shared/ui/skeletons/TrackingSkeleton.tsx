export default function TrackingSkeleton() {
  return (
    <div className="shell animate-pulse py-10 max-w-3xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <div className="h-10 w-64 mx-auto rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-96 mx-auto rounded-full bg-slate-100 dark:bg-slate-800" />
      </div>

      {/* Form Skeleton */}
      <div className="surface-card p-6 sm:p-8 space-y-6">
        <div className="h-6 w-32 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="h-12 flex-1 rounded-2xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-12 w-full sm:w-40 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* Timeline Skeleton placeholder */}
      <div className="space-y-8 pt-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-6">
            <div className="h-10 w-10 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-32 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
