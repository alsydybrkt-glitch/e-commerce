"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
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
import HeaderIcons from "./HeaderIcons";
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

  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const router = useRouter();

  const handleMobileSearch = useCallback(() => {
    const query = mobileSearchQuery.trim();
    if (!query) return;
    const locale = window.location.pathname.split("/")[1] || "en";
    router.push(`/${locale}/search?query=${encodeURIComponent(query)}`);
    setMobileSearchQuery("");
    closeAll();
  }, [mobileSearchQuery, router, closeAll]);

  const handleMobileSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleMobileSearch();
      }
    },
    [handleMobileSearch],
  );

  useEffect(() => {
    const handler = (e: any) => {
      if (!e.target.closest("[data-categories-menu]")) {
        setOpenDesktopCategories(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [setOpenDesktopCategories]);

  useEffect(() => {
    if (openMobile) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [openMobile]);

  return (
    <div className="py-2">
      <div className="shell flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block" data-categories-menu>
            <button
              type="button"
              className="btn btn-secondary gap-2"
              onClick={() => setOpenDesktopCategories(!openDesktopCategories)}
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
                categories={categories} 
                isRTL={isRTL} 
                onClose={closeAll} 
                featuredLinks={featuredMenuLinks} 
              />
            )}
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.path;
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
            onClick={() => setOpenMobile(!openMobile)}
            aria-label="Toggle menu"
            type="button"
          >
            {openMobile ? <MdClose className="text-2xl" /> : <TiThMenu className="text-xl" />}
          </button>
        </div>
      </div>

      <MobileDrawer 
        isOpen={openMobile}
        onClose={closeAll}
        isRTL={isRTL}
        categories={categories}
        navLinks={navLinks}
        pathname={pathname}
        mobileSearchQuery={mobileSearchQuery}
        setMobileSearchQuery={setMobileSearchQuery}
        handleMobileSearch={handleMobileSearch}
        handleMobileSearchKeyDown={handleMobileSearchKeyDown}
      />
    </div>
  );
}

export default BottomHeader;
