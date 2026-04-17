"use client";

import { Skeleton } from "@/shared/ui/Skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-10">
      {/* Stats Cards Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="surface-card p-6 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
             <div className="flex items-start justify-between">
                <div className="space-y-3">
                   <Skeleton className="h-4 w-24" />
                   <Skeleton className="h-8 w-32" />
                </div>
                <Skeleton className="h-12 w-12 rounded-2xl" />
             </div>
             <div className="mt-8 flex gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-20" />
             </div>
          </div>
        ))}
      </div>

      {/* Charts & Orders Skeleton */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="surface-card col-span-full h-[450px] p-8 lg:col-span-2 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
           <div className="mb-8 flex items-center justify-between">
              <div className="space-y-2">
                 <Skeleton className="h-6 w-48" />
                 <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-4 w-32" />
           </div>
           <Skeleton className="h-full w-full rounded-xl" />
        </div>
        
        <div className="surface-card flex flex-col p-8 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
           <div className="mb-6 flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-16" />
           </div>
           <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-xl" />
                      <div className="space-y-2">
                         <Skeleton className="h-4 w-24" />
                         <Skeleton className="h-3 w-32" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-3 w-12 rounded-full" />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
