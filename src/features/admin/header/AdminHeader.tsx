"use client";

import { Bell, Search, User, Menu } from "lucide-react";
import ThemeToggle from "@/shared/ui/ThemeToggle";
import LanguageSwitcher from "@/shared/ui/LanguageSwitcher";
import { useTranslation } from "@/shared/i18n/useTranslation";
import { cn } from "@/shared/utils/utils";

export function AdminHeader() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b bg-white/80 px-8 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-center gap-4">
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
          {t("admin.header.title")}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="hidden relative md:block min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder={t("admin.header.searchPlaceholder")}
            className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-10 py-2.5 text-sm focus:border-brand-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800/50 dark:text-white"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3 border-x px-6 dark:border-slate-800">
          <button 
            title={t("admin.header.notifications")}
            aria-label={t("admin.header.notifications")}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <Bell size={20} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white dark:ring-slate-900" />
          </button>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right md:block">
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {t("admin.header.adminUser")}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              {t("admin.header.masterLevel")}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
            <User size={20} className="text-slate-500" />
          </div>
        </div>

      </div>
    </header>
  );
}
