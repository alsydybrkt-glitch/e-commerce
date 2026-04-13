import { Skeleton, SkeletonText, SkeletonCircle } from "../Skeleton";
import { useTranslation } from "@/shared/i18n/useTranslation";

export default function CartSkeleton() {
  const { t } = useTranslation();
  
  return (
    <div className="cart-page shell section-gap">
      <div className="mb-8 space-y-3">
        <Skeleton className="h-4 w-32 rounded-full" />
        <Skeleton className="h-10 w-64 rounded-xl" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="surface-card flex flex-col items-center gap-6 p-6 sm:flex-row"
            >
              <Skeleton className="aspect-square w-24 rounded-2xl sm:w-32" />
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-6 w-3/4 rounded-lg" />
                    <Skeleton className="h-4 w-1/2 rounded-md opacity-60" />
                  </div>
                  <SkeletonCircle size="h-10 w-10" />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <Skeleton className="h-8 w-24 rounded-xl" />
                  <Skeleton className="h-7 w-20 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <aside className="surface-card h-fit p-6 sm:p-8">
          <Skeleton className="h-8 w-48 rounded-xl mb-6" />
          <div className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-12 rounded-md" />
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-24 rounded-md" />
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <Skeleton className="h-12 w-full rounded-2xl" />
            <Skeleton className="h-12 w-full rounded-2xl" />
            <Skeleton className="h-12 w-full rounded-2xl bg-brand-500/10 dark:bg-brand-500/5" />
          </div>
        </aside>
      </div>
    </div>
  );
}
