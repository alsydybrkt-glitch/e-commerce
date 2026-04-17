import { m } from "framer-motion";
import dynamic from "next/dynamic";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { ChartData } from "@/services/api/adminApi";
import React from "react";

const ResponsiveContainer = dynamic(() => import("recharts").then(mod => mod.ResponsiveContainer), { ssr: false });
const AreaChart = dynamic(() => import("recharts").then(mod => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import("recharts").then(mod => mod.Area), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(mod => mod.Tooltip), { ssr: false });

interface SalesChartProps {
  data: ChartData[];
}

export const SalesChart = React.memo(({ data: apiData }: SalesChartProps) => {
  const { t } = useTranslation();

  const chartData = apiData.map(item => ({
    ...item,
    displayName: t(`admin.overview.charts.days.${item.name.toLowerCase()}`)
  }));

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="surface-card col-span-full h-[450px] p-8 lg:col-span-2 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {t("admin.overview.charts.salesTrend")}
          </h3>
          <p className="text-xs font-semibold text-slate-400">
            {t("admin.overview.charts.weeklyRevenue")}
          </p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            {t("admin.overview.charts.productSales")}
          </span>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#f1f5f9"
            />
            <XAxis 
              dataKey="displayName" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#ffffff'
              }}
              labelStyle={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}
              itemStyle={{ fontWeight: '600', color: '#10b981' }}
            />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSales)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </m.div>
  );
});

SalesChart.displayName = "SalesChart";


