"use client";

import { m } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Activity } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { useTranslation } from "@/shared/hooks/useTranslation";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
  index: number;
}

function StatCard({ title, value, change, isPositive, icon: Icon, index }: StatCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="surface-card p-6 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
            {title}
          </p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </h3>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          <Icon size={24} />
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-2">
        <div className={cn(
          "flex items-center gap-1 text-sm font-bold",
          isPositive ? "text-emerald-500" : "text-rose-500"
        )}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {change}
        </div>
        <span className="text-xs font-semibold text-slate-400">vs last month</span>
      </div>
    </m.div>
  );
}

import { DashboardStats } from "@/services/api/adminApi";
import { formatCurrency } from "@/features/cart/lib/formatCurrency";

interface StatsCardsProps {
  data: DashboardStats;
}

export function StatsCards({ data }: StatsCardsProps) {
  const { t } = useTranslation();

  const stats = [
    { 
      title: t("admin.overview.stats.totalSales"), 
      value: formatCurrency(data.totalSales), 
      change: data.salesChange, 
      isPositive: data.salesChange.startsWith("+"), 
      icon: DollarSign 
    },
    { 
      title: t("admin.overview.stats.totalOrders"), 
      value: data.totalOrders.toLocaleString(), 
      change: data.ordersChange, 
      isPositive: data.ordersChange.startsWith("+"), 
      icon: Package 
    },
    { 
      title: t("admin.overview.stats.newCustomers"), 
      value: `+${data.newCustomers}`, 
      change: data.customersChange, 
      isPositive: data.customersChange.startsWith("+"), 
      icon: Users 
    },
    { 
      title: t("admin.overview.stats.conversionRate"), 
      value: `${data.conversionRate}%`, 
      change: data.conversionChange, 
      isPositive: data.conversionChange.startsWith("+"), 
      icon: Activity 
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <StatCard key={stat.title} {...stat} index={i} />
      ))}
    </div>
  );
}

