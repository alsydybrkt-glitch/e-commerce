"use client";

import { m } from "framer-motion";
import { formatCurrency } from "@/features/cart/lib/formatCurrency";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { RecentOrder } from "@/services/api/adminApi";

const statusStyles = {
  completed: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400",
  processing: "bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400",
  shipped: "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400",
  cancelled: "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400",
};

interface RecentOrdersProps {
  data: RecentOrder[];
}

export function RecentOrders({ data: apiData }: RecentOrdersProps) {
  const { t } = useTranslation();

  return (
    <m.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="surface-card flex flex-col p-8 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {t("admin.overview.recentOrders")}
        </h3>
        <button className="text-xs font-bold uppercase tracking-widest text-brand-600 transition-colors hover:text-brand-500">
          {t("admin.overview.viewAll")}
        </button>
      </div>

      <div className="space-y-6">
        {apiData.map((order) => (
          <div key={order.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 font-bold text-slate-400 dark:bg-slate-800">
                {order.customer.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{order.customer}</p>
                <p className="text-xs font-semibold text-slate-400">{order.id} • {order.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {formatCurrency(order.amount)}
              </p>
              <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusStyles[order.status as keyof typeof statusStyles]}`}>
                {t(`admin.overview.statuses.${order.status}`)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </m.div>
  );
}
