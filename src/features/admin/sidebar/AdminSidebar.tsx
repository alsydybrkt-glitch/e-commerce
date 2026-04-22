"use client";

import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  ChevronLeft,
  Store
} from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { useState } from "react";

const sidebarLinks = [
  { id: "overview", href: "/admin", icon: LayoutDashboard, labelKey: "admin.sidebar.overview" },
  { id: "products", href: "/admin/products", icon: Package, labelKey: "admin.sidebar.products" },
  { id: "orders", href: "/admin/orders", icon: ShoppingCart, labelKey: "admin.sidebar.orders" },
  { id: "customers", href: "/admin/customers", icon: Users, labelKey: "admin.sidebar.customers" },
  { id: "analytics", href: "/admin/analytics", icon: BarChart3, labelKey: "admin.sidebar.analytics" },
  { id: "settings", href: "/admin/settings", icon: Settings, labelKey: "admin.sidebar.settings" },
];

export function AdminSidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <m.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className={cn(
        "relative h-screen border-r bg-white/80 backdrop-blur-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/80",
        "flex flex-col z-50"
      )}
    >
      {/* Brand Section */}
      <div className="flex h-20 items-center justify-between px-6">
        {!isCollapsed && (
          <m.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 shadow-lg shadow-brand-500/20">
              <Store className="text-white" size={20} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t("admin.header.brand")}
            </span>
          </m.div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={t("admin.sidebar.toggle")}
          aria-label={t("admin.sidebar.toggle")}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <ChevronLeft className={cn("transition-transform duration-300", isCollapsed && "rotate-180")} size={18} />
        </button>

      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link key={link.id} href={link.href}>
              <div
                className={cn(
                  "group relative flex items-center h-12 rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/20" 
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                )}
              >
                <div className="flex w-16 items-center justify-center">
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                
                {!isCollapsed && (
                  <m.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 font-semibold"
                  >
                    {t(link.labelKey)}
                  </m.span>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-16 top-1/2 -translate-y-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all pointer-events-none">
                    <div className="bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap ml-2">
                      {t(link.labelKey)}
                    </div>
                  </div>
                )}

                {isActive && !isCollapsed && (
                  <m.div
                    layoutId="active-indicator"
                    className="absolute right-2 h-1.5 w-1.5 rounded-full bg-white"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer Branding */}
      {!isCollapsed && (
        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {t("admin.common.poweredBy")}
          </p>
        </div>
      )}

    </m.aside>
  );
}
