export const HeroSkeleton = () => {
  return (
    <div className="home-hero shell-sm relative h-[600px] overflow-hidden rounded-[20px] bg-slate-100 sm:h-[650px] lg:h-[720px] lg:rounded-[32px] pt-4 lg:pt-8 dark:bg-slate-900">
      <div className="absolute inset-0 flex items-center px-12 lg:px-24">
        <div className="max-w-2xl space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-0.5 w-8 animate-pulse bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="space-y-4">
            <div className="h-16 w-full animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-16 w-3/4 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="h-6 w-1/2 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="flex gap-4 pt-4">
            <div className="h-14 w-44 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-14 w-44 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    </div>
  );
};
