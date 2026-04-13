import { Skeleton, SkeletonCard, SkeletonText } from "@/shared/ui/Skeleton";

export default function FavoritesLoading() {
  return (
    <div className="shell section-gap">
      <header className="mb-10 text-center max-w-2xl mx-auto">
        <Skeleton className="h-12 w-64 mx-auto rounded-xl mb-4" />
        <SkeletonText lines={2} className="h-4 max-w-md mx-auto" />
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
