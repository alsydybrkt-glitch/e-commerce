import { Skeleton, SkeletonText, SkeletonCircle } from "../Skeleton";

export default function ProductSkeleton() {
  return (
    <div className="shell section-gap">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Image Gallery Skeleton */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-[32px]" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-2xl" />
            ))}
          </div>
        </div>

        {/* Right Column: Content Skeleton */}
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-12 w-full max-w-md rounded-xl" />
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                   <SkeletonCircle key={i} size="h-4 w-4" />
                ))}
              </div>
              <Skeleton className="h-4 w-24 rounded-full" />
            </div>
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>

          <div className="space-y-3 py-6 border-y border-border-light dark:border-slate-800">
            <Skeleton className="h-4 w-24 rounded-full" />
            <SkeletonText lines={4} />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <Skeleton className="h-12 w-32 rounded-2xl" />
               <Skeleton className="h-12 flex-grow rounded-2xl" />
            </div>
            <div className="flex gap-4">
               <Skeleton className="h-14 w-full rounded-2xl" />
               <SkeletonCircle size="h-14 w-14" className="rounded-2xl" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
             {[...Array(2)].map((_, i) => (
               <div key={i} className="p-4 rounded-2xl border border-border-light dark:border-slate-800">
                  <Skeleton className="h-6 w-6 rounded-lg mb-2" />
                  <Skeleton className="h-4 w-24 rounded-full mb-1" />
                  <Skeleton className="h-3 w-32 rounded-full opacity-60" />
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
