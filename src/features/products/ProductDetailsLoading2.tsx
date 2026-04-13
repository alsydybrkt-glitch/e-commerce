function ProductDetailsLoading() {
  return (
    <div className="shell section-gap">
      <div className="surface-card grid animate-pulse gap-8 p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
        <div className="space-y-4">
          <div className="h-[420px] rounded-[32px] bg-slate-200 dark:bg-slate-700" />
          <div className="grid grid-cols-3 gap-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-700" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-8 w-4/5 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="h-5 w-1/4 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="h-6 w-1/3 rounded-full bg-slate-200 dark:bg-slate-700" />
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-4 rounded-full bg-slate-200 dark:bg-slate-700" />
          ))}
          <div className="h-12 w-48 rounded-2xl bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsLoading;
