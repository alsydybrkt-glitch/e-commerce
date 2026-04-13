"use client";
import React, { memo } from "react";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { useTranslation } from "@/shared/i18n/useTranslation";
import { Category, Product } from "@/features/products/services/productsApi";
import { NavLink } from "@/shared/types";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isRTL: boolean;
  categories: Category[];
  navLinks: NavLink[];
  pathname: string;
  mobileSearchQuery: string;
  setMobileSearchQuery: (val: string) => void;
  handleMobileSearch: () => void;
  handleMobileSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  dealsOfDay: Product[];
  topSellers: Product[];
}

export const MobileDrawer = memo(({
  isOpen,
  onClose,
  isRTL,
  categories,
  navLinks,
  pathname,
  mobileSearchQuery,
  setMobileSearchQuery,
  handleMobileSearch,
  handleMobileSearchKeyDown,
  dealsOfDay,
  topSellers,
}: MobileDrawerProps) => {
  const { t, tCategoryName } = useTranslation();

  const drawerVariants = {
    hidden: { x: isRTL ? "100%" : "-100%" },
    visible: { 
      x: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 200,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { 
      x: isRTL ? "100%" : "-100%",
      transition: { type: "tween", duration: 0.3, ease: "easeInOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isRTL ? 20 : -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Animated Drawer */}
          <motion.aside
            dir={isRTL ? "rtl" : "ltr"}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed ${
              isRTL ? "right-0 rounded-l-[32px]" : "left-0 rounded-r-[32px]"
            } top-0 bottom-0 h-screen z-[70] w-[88vw] max-w-xs overflow-y-auto bg-white p-6 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700 lg:hidden`}
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                {t("common.menu")}
              </h2>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-transform active:scale-95 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
                onClick={onClose}
                aria-label="Close menu"
              >
                <MdClose size={24} />
              </button>
            </div>

            {/* Premium Search Section */}
            <motion.div variants={itemVariants} className="mb-8 overflow-hidden rounded-2xl bg-slate-50 p-1 dark:bg-slate-800/50">
              <div className="flex items-center gap-2 rounded-[14px] bg-white px-3 py-2.5 shadow-sm dark:bg-slate-900">
                <span className="text-lg opacity-60">🔍</span>
                <input
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  onKeyDown={handleMobileSearchKeyDown}
                  type="search"
                  placeholder={t("common.search")}
                  className="w-full border-none bg-transparent text-sm font-bold text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
                <button
                  onClick={handleMobileSearch}
                  type="button"
                  className="rounded-[10px] bg-brand-600 px-4 py-1.5 text-xs font-black uppercase text-white shadow-lg shadow-brand-600/20 active:scale-95 transition-transform"
                >
                  {t("common.search")}
                </button>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <motion.div key={link.path} variants={itemVariants}>
                  <Link
                    href={link.path}
                    className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-bold transition-all duration-300 ${
                      pathname === link.path
                        ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/50"
                    }`}
                    onClick={onClose}
                  >
                    <span className={`text-xl ${pathname === link.path ? "text-white" : "text-brand-500"}`}>
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Categories Section */}
            <motion.div variants={itemVariants} className="mt-10">
              <p className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <span className="h-px w-4 bg-slate-200 dark:bg-slate-700" />
                {t("common.categories")}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="flex items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 px-3 py-3 text-[11px] font-bold text-slate-600 transition-all hover:border-brand-500 hover:bg-white dark:border-slate-800 dark:bg-slate-800/30 dark:text-slate-300 dark:hover:bg-slate-800"
                    onClick={onClose}
                  >
                    {tCategoryName(category.slug || category.name)}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
});

MobileDrawer.displayName = "MobileDrawer";

