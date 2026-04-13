import { Skeleton, SkeletonText } from "@/shared/ui/Skeleton";

export default function Loading() {
  return (
    <div className="shell section-gap">
      <div className="mb-12 space-y-4">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-12 w-2/3 rounded-xl" />
        <SkeletonText lines={2} className="max-w-2xl" />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col gap-6 rounded-[32px] border border-slate-100 p-6 dark:border-slate-800">
            <Skeleton className="aspect-video w-full rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="h-8 w-full rounded-lg" />
              <SkeletonText lines={3} />
            </div>
            <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-6 dark:border-slate-800">
               <Skeleton className="h-5 w-24 rounded-md" />
               <Skeleton className="h-4 w-16 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
