import { Skeleton, SkeletonCard, SkeletonText } from "@/shared/ui/Skeleton";

export default function ShopLoading() {
  return (
    <section className="shell section-gap">
      <header className="mb-8">
        <Skeleton className="h-10 w-48 rounded-xl mb-4" />
        <Skeleton className="h-5 w-full max-w-lg rounded-full" />
      </header>

      {/* Filters Skeleton */}
      <div className="mb-10 flex flex-wrap gap-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-32 rounded-xl" />
        ))}
      </div>

      <div className="mb-6">
        <Skeleton className="h-4 w-40 rounded-full" />
      </div>

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-12 flex justify-center gap-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-10 rounded-lg" />
        ))}
      </div>
    </section>
  );
}
