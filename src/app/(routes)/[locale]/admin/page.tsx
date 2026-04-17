"use client";

import { useEffect, useState } from "react";
import { StatsCards } from "@/features/admin/overview/StatsCards";
import { SalesChart } from "@/features/admin/overview/SalesChart";
import { RecentOrders } from "@/features/admin/overview/RecentOrders";
import { DashboardSkeleton } from "@/features/admin/overview/DashboardSkeleton";
import { fetchAdminDashboardData, DashboardStats, ChartData, RecentOrder } from "@/services/api/adminApi";
import { useTranslation } from "@/shared/hooks/useTranslation";

export default function AdminPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    stats: DashboardStats;
    salesChart: ChartData[];
    recentOrders: RecentOrder[];
  } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchAdminDashboardData();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !data) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-10">
      {/* Statistics Section */}
      <section>
        <StatsCards data={data.stats} />
      </section>

      {/* Main Insights Section */}
      <div className="grid gap-8 lg:grid-cols-3">
        <SalesChart data={data.salesChart} />
        <RecentOrders data={data.recentOrders} />
      </div>
      
      {/* Bottom Row - More detailed lists or system health */}
      <div className="grid gap-8 md:grid-cols-2">
         <div className="surface-card p-8 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800 flex items-center justify-between transition-all hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
            <div>
               <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                 {t("admin.overview.systemStatus")}
               </h4>
               <p className="text-sm text-slate-500">
                 {t("admin.overview.servicesRunning")}
               </p>
            </div>
            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse shadow-glow" />
         </div>
         <div className="surface-card p-8 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800 flex items-center justify-between transition-all hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
            <div>
               <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                 {t("admin.overview.activeUsers")}
               </h4>
               <p className="text-sm text-slate-500">
                 {t("admin.overview.onlineSessions", { count: 124 })}
               </p>
            </div>
            <p className="text-2xl font-black text-brand-600 tracking-tighter">124</p>
         </div>
      </div>
    </div>
  );
}


