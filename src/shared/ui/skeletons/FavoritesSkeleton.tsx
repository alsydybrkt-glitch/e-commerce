import { Skeleton, SkeletonCircle } from "../Skeleton";
import SkeletonProduct from "@/features/products/slide-product/loadingOfSlideProduct";

export default function FavoritesSkeleton() {
  return (
    <div className="shell py-10 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-10 w-64 rounded-xl" />
        </div>
        <Skeleton className="h-12 w-32 rounded-2xl" />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
        {[...Array(4)].map((_, i) => (
          <SkeletonProduct key={i} />
        ))}
      </div>
    </div>
  );
}
