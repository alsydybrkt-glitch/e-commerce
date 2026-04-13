import { memo } from "react";

function InfoPillComponent({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800/60 dark:text-slate-300 dark:ring-1 dark:ring-slate-700/60">
      {label}:{" "}
      <span className="font-semibold text-slate-900 dark:text-slate-100">
        {value}
      </span>
    </div>
  );
}

export const InfoPill = memo(InfoPillComponent);
