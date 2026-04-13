import { Skeleton, SkeletonCard } from "@/shared/ui/Skeleton";

export default function SearchLoading() {
  return (
    <div className="shell section-gap">
      <header className="mb-8">
        <Skeleton className="h-6 w-48 rounded-full mb-4" />
        <Skeleton className="h-12 w-full max-w-2xl rounded-2xl" />
      </header>

      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-light dark:border-slate-800">
        <Skeleton className="h-4 w-40 rounded-full" />
        <Skeleton className="h-4 w-32 rounded-full" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
