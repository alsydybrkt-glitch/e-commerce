function SkeletonProduct() {
  return (
    <div className="surface-card animate-pulse p-4">
      <div className="mb-4 h-6 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="mb-5 h-64 rounded-[24px] bg-slate-200 dark:bg-slate-700" />
      <div className="space-y-3">
        <div className="h-5 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-5 w-4/5 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-1/3 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-11 rounded-2xl bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}

export default SkeletonProduct;
