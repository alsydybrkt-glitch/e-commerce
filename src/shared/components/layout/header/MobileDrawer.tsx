"use client";

import Image from "next/image";
import React, { memo, useEffect, useMemo, useRef, useCallback } from "react";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdArrowForward } from "react-icons/md";
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
  dealsOfDay?: Product[];
}

/* Section Divider */

function MenuSection({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">

      {title && (
        <div className="mb-4 flex items-center gap-3">

          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            {title}
          </span>

          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />

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

    const original = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };

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

  /* animation */

  const drawerVariants = useMemo(() => ({
    hidden: { x: isRTL ? "100%" : "-100%" },
    visible: { x: 0 },
    exit: { x: isRTL ? "100%" : "-100%" }
  }), [isRTL]);

  const deals = useMemo(() => dealsOfDay.slice(0, 4), [dealsOfDay]);

  return (

    <AnimatePresence>

      {isOpen && (

        <>

          {/* backdrop */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* drawer */}

          <motion.aside
            role="dialog"
            aria-modal="true"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            dir={isRTL ? "rtl" : "ltr"}
            className={`fixed top-0 bottom-0 z-[70] h-[100dvh] w-[85vw] max-w-[380px] flex flex-col overflow-hidden bg-white/95 dark:bg-slate-900/95 shadow-xl`}
          >

            <div
              ref={drawerRef}
              className="flex flex-col h-full overflow-y-auto px-6 py-8 custom-scrollbar"
            >

              {/* Header */}

              <div className="flex items-center justify-between mb-2">

                <h2 className="text-lg font-bold">
                  Menu
                </h2>

                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800"
                >
                  <MdClose size={20}/>
                </button>

              </div>

              {/* User */}

              <MenuSection>

                <div className="flex items-center gap-3 rounded-2xl bg-slate-100 p-3 dark:bg-slate-800">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white font-bold">
                    U
                  </div>

                  <div className="flex flex-col">

                    <span className="text-sm font-bold">
                      Welcome back
                    </span>

                    <span className="text-xs text-slate-500">
                      Sign in to your account
                    </span>

                  </div>

                </div>

              </MenuSection>

              {/* Search */}

              <MenuSection title="Search">

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-800">

                  🔍

                  <input
                    value={mobileSearchQuery}
                    onChange={(e)=>setMobileSearchQuery(e.target.value)}
                    onKeyDown={handleMobileSearchKeyDown}
                    placeholder={t("common.search")}
                    className="w-full bg-transparent text-sm font-semibold outline-none"
                  />

                  <button
                    onClick={handleMobileSearch}
                    aria-label="search"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white"
                  >
                    <MdArrowForward className={isRTL ? "rotate-180" : ""}/>
                  </button>

                </div>

              </MenuSection>

              {/* Quick actions */}

              <MenuSection title="Quick Actions">

                <div className="grid grid-cols-4 gap-3">

                  <Link onClick={onClose} href="/carts" className="flex flex-col items-center gap-1 rounded-xl bg-slate-100 p-3 text-xs font-semibold dark:bg-slate-800">
                    🛒
                    Cart
                  </Link>

                  <Link onClick={onClose} href="/favorites" className="flex flex-col items-center gap-1 rounded-xl bg-slate-100 p-3 text-xs font-semibold dark:bg-slate-800">
                    ❤️
                    Wishlist
                  </Link>

                  <button className="flex flex-col items-center gap-1 rounded-xl bg-slate-100 p-3 text-xs font-semibold dark:bg-slate-800">
                    📦
                    Orders
                  </button>

                  <button className="flex flex-col items-center gap-1 rounded-xl bg-slate-100 p-3 text-xs font-semibold dark:bg-slate-800">
                    🎁
                    Deals
                  </button>

                </div>

              </MenuSection>

              {/* Navigation */}

              <MenuSection title="Navigation">

                <nav className="space-y-2">

                  {navLinks.map((link)=>(
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={onClose}
                      className={`flex items-center gap-4 rounded-2xl px-5 py-3 font-bold transition ${
                        pathname === link.path
                        ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                      }`}
                    >

                      <span className="text-xl">
                        {link.icon}
                      </span>

                      {link.name}

                    </Link>
                  ))}

                </nav>

              </MenuSection>

              {/* Deals */}

              {deals.length > 0 && (

                <MenuSection title="Deals">

                  <div className="flex gap-3 overflow-x-auto pb-2">

                    {deals.map((product)=>(
                      <div
                        key={product.id}
                        className="min-w-[110px] rounded-xl border border-slate-200 p-2 text-xs dark:border-slate-700"
                      >

                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          width={110}
                          height={64}
                          className="rounded-lg object-cover"
                        />

                        <p className="mt-1 line-clamp-1 font-semibold">
                          {product.title}
                        </p>

                      </div>
                    ))}

                  </div>

                </MenuSection>

              )}

              {/* Categories */}

              <MenuSection title={t("common.categories")}>

                <div className="grid grid-cols-2 gap-2">

                  {categories.map((category)=>(
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 p-3 text-xs font-semibold hover:border-brand-500 dark:border-slate-700"
                    >

                      📦 {tCategoryName(category.slug || category.name)}

                    </Link>
                  ))}

                </div>

              </MenuSection>

            </div>

          </motion.aside>

        </>

      )}

    </AnimatePresence>

  );

});

MobileDrawer.displayName = "MobileDrawer";