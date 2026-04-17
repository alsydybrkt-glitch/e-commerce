import { Skeleton } from "@/shared/ui/Skeleton";

export default function CategoryLoading() {
  return (
    <div className="space-y-10">
      {/* Header Skeleton */}
      <section className="shell py-6 sm:py-10">
        <div className="rounded-[32px] bg-slate-900 p-8 sm:p-12">
          <Skeleton className="h-6 w-32 rounded-full !bg-white/10" />
          <Skeleton className="mt-4 h-12 w-64 !bg-white/10 sm:h-16" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full max-w-xl !bg-white/10" />
            <Skeleton className="h-4 w-3/4 max-w-xl !bg-white/10" />
          </div>
          <div className="mt-8 flex gap-4">
             <Skeleton className="h-16 w-32 rounded-2xl !bg-white/10" />
             <Skeleton className="h-16 w-32 rounded-2xl !bg-white/10" />
          </div>
        </div>
      </section>

      {/* Grid Skeleton */}
      <section className="shell pb-20">
        <div className="mb-8 flex items-center justify-between">
           <Skeleton className="h-8 w-48" />
           <Skeleton className="h-10 w-40 rounded-xl" />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

