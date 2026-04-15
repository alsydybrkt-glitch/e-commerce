"use client";
import React, { useEffect, useMemo, useCallback } from "react";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { TiThMenu } from "react-icons/ti";
import { MdArrowDropDown, MdClose } from "react-icons/md";
import {
  FiHome,
  FiShoppingBag,
  FiBookOpen,
  FiPhoneIncoming,
  FiCreditCard,
  FiTruck,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import useHeaderLogic from "./useHeaderLogic";
import { useTranslation } from "@/shared/i18n/useTranslation";

// ─── Lazy-loaded components ──────────────────────────────────────────────────
const DesktopMegaMenu = dynamic(() => 
  import("./DesktopMegaMenu").then(mod => mod.DesktopMegaMenu),
  { ssr: false }
);

const MobileDrawer = dynamic(() =>
  import("./MobileDrawer").then(mod => mod.MobileDrawer),
  { ssr: false }
);

const preloadMobileDrawer = () => import("./MobileDrawer");

function BottomHeader() {
  const { t, isRTL } = useTranslation();
  const pathname = usePathname();
  const categories = useSelector((state: any) => state.products?.categories || []);
  
  const featuredMenuLinks = useMemo(
    () => [
      { label: isRTL ? "اذهب إلى المتجر" : "Go to shop", href: "/shop" },
      { label: isRTL ? "استكشف المدونة" : "Explore blog", href: "/blog" },
    ],
    [isRTL],
  );

  const navLinks = useMemo(
    () => [
      { name: t("nav.home"), path: "/", icon: <FiHome size={16} /> },
      { name: t("nav.shop"), path: "/shop", icon: <FiShoppingBag size={16} /> },
      { name: t("nav.blog"), path: "/blog", icon: <FiBookOpen size={16} /> },
      { name: t("nav.contact"), path: "/contact", icon: <FiPhoneIncoming size={16} /> },
      { name: t("nav.checkout"), path: "/checkout", icon: <FiCreditCard size={16} /> },
      { name: t("nav.orderTracking"), path: "/order-tracking", icon: <FiTruck size={16} /> },
    ],
    [t],
  );

  const {
    openDesktopCategories,
    setOpenDesktopCategories,
    openMobile,
    setOpenMobile,
    closeAll,
  } = useHeaderLogic();

  const router = useRouter();

  const handleMobileSearch = useCallback((query: string) => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) return;

    const locale = window.location.pathname.split("/")[1] || "en";
    router.push(`/${locale}/search?query=${encodeURIComponent(normalizedQuery)}`);
    closeAll();
  }, [router, closeAll]);

  useEffect(() => {
    const preload = () => {
      void preloadMobileDrawer();
    };

    const globalScope = globalThis as any;

    if (typeof globalScope.requestIdleCallback === "function") {
      const idleId = globalScope.requestIdleCallback(preload, { timeout: 1500 });
      return () => {
        if (typeof globalScope.cancelIdleCallback === "function") {
          globalScope.cancelIdleCallback(idleId);
        }
      };
    }

    const timeoutId = globalScope.setTimeout(preload, 900);
    return () => globalScope.clearTimeout(timeoutId);
  }, []);

  const toggleMobileDrawer = useCallback(() => {
    if (!openMobile) {
      void preloadMobileDrawer();
    }
    setOpenMobile((prev) => !prev);
  }, [openMobile, setOpenMobile]);

  const handleDesktopCategoriesToggle = useCallback(() => {
    setOpenDesktopCategories((prev) => !prev);
  }, [setOpenDesktopCategories]);

  const handleDesktopOutsideClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target?.closest("[data-categories-menu]")) {
      setOpenDesktopCategories(false);
    }
  }, [setOpenDesktopCategories]);

  useEffect(() => {
    document.addEventListener("click", handleDesktopOutsideClick);
    return () => document.removeEventListener("click", handleDesktopOutsideClick);
  }, [handleDesktopOutsideClick]);

  useEffect(() => {
    if (!openMobile) return;

    const closeOnRouteChange = () => closeAll();
    window.addEventListener("popstate", closeOnRouteChange);
    return () => window.removeEventListener("popstate", closeOnRouteChange);
  }, [openMobile, closeAll]);

  const categoriesList = useMemo(() => {
    if (Array.isArray(categories)) return categories;
    return [];
  }, [categories]);

  const activePath = pathname || "/";

  const handleNavigateFromDrawer = useCallback(() => {
    closeAll();
  }, [closeAll]);

  const handleDrawerSearch = useCallback((query: string) => {
    if (!query) return;
    handleMobileSearch(query);
  }, [handleMobileSearch]);

  return (
    <div className="py-2">
      <div className="shell flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block" data-categories-menu>
            <button
              type="button"
              className="btn btn-secondary gap-2"
              onClick={handleDesktopCategoriesToggle}
            >
              <TiThMenu className="text-sm" />
              {t("common.categories")}
              <MdArrowDropDown
                className={`text-lg transition ${
                  openDesktopCategories ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDesktopCategories && (
              <DesktopMegaMenu 
                categories={categoriesList} 
                isRTL={isRTL} 
                onClose={closeAll} 
                featuredLinks={featuredMenuLinks} 
              />
            )}
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = activePath === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    active
                      ? "glass bg-brand-50/50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400 shadow-sm"
                      : "text-text-secondary hover:bg-slate-50 hover:text-text-primary dark:hover:bg-slate-800/40"
                  }`}
                  onClick={closeAll}
                >
                  <span
                    className={`text-base transition-colors duration-300 ${active ? "text-brand-600 dark:text-brand-400" : "text-text-muted"}`}
                  >
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 active:scale-95 ${
              openMobile 
                ? "bg-brand-50 border-brand-100 text-brand-600 dark:bg-brand-900/20 dark:border-brand-800 dark:text-brand-400" 
                : "border-border bg-surface-primary text-text-secondary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            }`}
            onClick={toggleMobileDrawer}
            aria-label="Toggle menu"
            type="button"
          >
            {openMobile ? <MdClose className="text-2xl" /> : <TiThMenu className="text-xl" />}
          </button>
        </div>
      </div>

      <MobileDrawer 
        isOpen={openMobile}
        onClose={handleNavigateFromDrawer}
        isRTL={isRTL}
        categories={categoriesList}
        navLinks={navLinks}
        pathname={activePath}
        onSearch={handleDrawerSearch}
      />
    </div>
  );
}

export default BottomHeader;
