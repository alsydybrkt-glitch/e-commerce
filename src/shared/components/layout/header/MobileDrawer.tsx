"use client";

import Image from "next/image";
import React, { memo, useEffect, useMemo, useRef, useCallback } from "react";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdArrowForward } from "react-icons/md";
import { useTranslation } from "@/shared/i18n/useTranslation";
import { Category, Product } from "@/features/products/services/productsApi";
import { NavLink } from "@/shared/types";
import { FiHome, FiShoppingBag, FiHeart, FiUser, FiPackage, FiSearch, FiExternalLink } from "react-icons/fi";

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
  dealsOfDay?: Product[];
}

function MenuSection({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`mb-8 last:mb-0 ${className}`}>
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            {title}
          </span>
          <div className="h-px flex-1 ms-4 bg-slate-100 dark:bg-slate-800/50" />
        </div>
      )}
      {children}
    </section>
  );
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
  dealsOfDay = []
}: MobileDrawerProps) => {
  const { t, tCategoryName } = useTranslation();
  const drawerRef = useRef<HTMLDivElement>(null);

  /* prevent body scroll */
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* ESC close */
  const escHandler = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [isOpen, escHandler]);

  const drawerVariants = {
    hidden: { x: isRTL ? "100%" : "-100%" },
    visible: { 
      x: 0,
      transition: { type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.35 }
    },
    exit: { 
      x: isRTL ? "100%" : "-100%",
      transition: { type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.3 }
    }
  };

  const deals = useMemo(() => dealsOfDay.slice(0, 4), [dealsOfDay]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-[2px]"
          />

          {/* Drawer Wrapper */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            dir={isRTL ? "rtl" : "ltr"}
            style={{ willChange: "transform" }}
            className="fixed top-0 bottom-0 z-[70] h-[100dvh] w-[85vw] max-w-[360px] flex flex-col overflow-hidden bg-white dark:bg-slate-950 shadow-2xl"
          >
            {/* Header: Minimalist & Clean */}
            <div className="flex items-center justify-between p-6 border-b border-slate-50 dark:border-slate-900">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white font-bold text-sm">
                  <FiUser size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t("header.profile.welcome")}</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white leading-tight">Aura Guest</span>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label={t("common.close") || "Close"}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-900 text-slate-500 active:scale-90 transition-transform focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <MdClose size={22} />
              </button>
            </div>

            <div ref={drawerRef} className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar scroll-smooth">
              
              {/* Search: Sleek & Borderless focus */}
              <MenuSection>
                <div className="group flex items-center gap-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-1.5 border border-transparent focus-within:border-brand-500/20 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all">
                  <div className="flex h-11 w-11 items-center justify-center text-slate-400">
                    <FiSearch size={20} />
                  </div>
                  <input
                    value={mobileSearchQuery}
                    onChange={(e) => setMobileSearchQuery(e.target.value)}
                    onKeyDown={handleMobileSearchKeyDown}
                    placeholder={t("common.search")}
                    className="flex-1 bg-transparent text-sm font-bold outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                  <button
                    onClick={handleMobileSearch}
                    aria-label={t("common.search") || "Search"}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 dark:bg-brand-600 text-white active:scale-95 focus:ring-2 focus:ring-brand-500/50 focus:outline-none"
                  >
                    <MdArrowForward size={20} className={isRTL ? "rotate-180" : ""} />
                  </button>
                </div>
              </MenuSection>

              {/* Quick Access Row */}
              <MenuSection title="Shortcuts">
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { icon: <FiShoppingBag />, label: "Cart", href: "/carts" },
                    { icon: <FiHeart />, label: "Wishlist", href: "/favorites" },
                    { icon: <FiPackage />, label: "Orders", href: "/orders" },
                    { icon: <FiExternalLink />, label: "Share", href: "#"},
                  ].map((item, idx) => (
                    <Link 
                      key={idx} 
                      href={item.href} 
                      onClick={onClose}
                      className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-slate-50 dark:bg-slate-900/50 aspect-square text-[10px] font-bold text-slate-600 dark:text-slate-400 active:scale-95 transition-all text-center"
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </MenuSection>

              {/* Primary Navigation */}
              <MenuSection title="Explore">
                <nav className="space-y-1">
                  {navLinks.map((link) => {
                    const active = pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        href={link.path}
                        onClick={onClose}
                        className={`group flex items-center justify-between rounded-2xl px-5 py-4 transition-all ${
                          active
                            ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 dark:bg-brand-600 dark:shadow-brand-500/10"
                            : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`text-xl ${active ? "text-white" : "text-slate-400 group-hover:text-brand-500"}`}>
                            {link.icon}
                          </span>
                          <span className="text-sm font-bold tracking-tight">{link.name}</span>
                        </div>
                        {active && <div className="h-1.5 w-1.5 rounded-full bg-white transition-all" />}
                      </Link>
                    );
                  })}
                </nav>
              </MenuSection>

              {/* Categories */}
              <MenuSection title={t("common.categories")}>
                <div className="grid grid-cols-1 gap-2">
                  {categories.slice(0, 8).map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-2xl border border-slate-50 dark:border-slate-800/50 p-4 text-sm font-bold text-slate-700 dark:text-slate-300 active:bg-slate-50 dark:active:bg-slate-900"
                    >
                      <div className="flex items-center gap-3">
                        <span className="opacity-50">#</span>
                        {tCategoryName(category.slug || category.name)}
                      </div>
                      <MdArrowForward className={`opacity-20 ${isRTL ? "rotate-180" : ""}`} />
                    </Link>
                  ))}
                </div>
              </MenuSection>

              {/* Deals Slider */}
              {deals.length > 0 && (
                <MenuSection title="Special Offers">
                  <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {deals.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={onClose}
                        className="min-w-[140px] flex-shrink-0 group overflow-hidden"
                      >
                        <div className="relative aspect-square rounded-2xl bg-slate-50 dark:bg-slate-950 p-2 overflow-hidden border border-slate-100 dark:border-slate-900">
                          <Image
                            src={product.thumbnail}
                            alt={product.title}
                            fill
                            className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <p className="mt-2 text-[11px] font-bold text-slate-800 dark:text-slate-200 line-clamp-1 italic">
                          {product.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </MenuSection>
              )}
            </div>

            {/* Footer Sign Out / Help */}
            <div className="p-6 border-t border-slate-50 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/50">
              <button className="w-full rounded-2xl py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors">
                Sign Out Account
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
});

MobileDrawer.displayName = "MobileDrawer";