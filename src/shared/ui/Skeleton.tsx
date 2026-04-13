import { cn } from "@/shared/utils/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/40", className)}
      {...props}
    />
  );
}

export function SkeletonCircle({ size = "w-10 h-10", className, ...props }: SkeletonProps & { size?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-full bg-slate-200/60 dark:bg-slate-800/40", size, className)}
      {...props}
    />
  );
}

export function SkeletonText({ lines = 1, className, ...props }: SkeletonProps & { lines?: number }) {
  return (
    <div className="space-y-2 w-full">
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 animate-pulse rounded-full bg-slate-200/60 dark:bg-slate-800/40",
            i === lines - 1 && lines > 1 ? "w-2/3" : "w-full",
            className
          )}
          {...props}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="surface-card h-full min-h-[420px] overflow-hidden p-4 flex flex-col justify-between">
      <div className="mb-4 flex items-start justify-between gap-3">
        <Skeleton className="h-6 w-24 rounded-full" />
        <div className="flex gap-2">
          <SkeletonCircle size="h-9 w-9" />
          <SkeletonCircle size="h-9 w-9" />
        </div>
      </div>
      <Skeleton className="relative mb-4 aspect-square rounded-[24px]" />
      <div className="space-y-3">
        <SkeletonText lines={2} />
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <SkeletonCircle key={i} size="h-4 w-4" />
          ))}
        </div>
        <Skeleton className="h-7 w-1/4 rounded-lg" />
      </div>
      <Skeleton className="mt-4 h-12 w-full rounded-2xl" />
    </div>
  );
}
