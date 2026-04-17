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
import { useTranslation } from "@/shared/hooks/useTranslation";

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

interface BtmHeaderProps {
  headerLogic: any;
  navLinks: any[];
  categories: any[];
}

function BottomHeader({ headerLogic, navLinks, categories }: BtmHeaderProps) {
  const { t, isRTL } = useTranslation();
  
  const featuredMenuLinks = useMemo(
    () => [
      { label: isRTL ? "اذهب إلى المتجر" : "Go to shop", href: "/shop" },
      { label: isRTL ? "استكشف المدونة" : "Explore blog", href: "/blog" },
    ],
    [isRTL],
  );

  const {
    openDesktopCategories,
    setOpenDesktopCategories,
    closeAll,
  } = headerLogic;

  const handleDesktopCategoriesToggle = useCallback(() => {
    setOpenDesktopCategories((prev: any) => !prev);
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

  const categoriesList = useMemo(() => {
    if (Array.isArray(categories)) return categories;
    return [];
  }, [categories]);

  return (
    <div className="py-2 hidden lg:block">
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
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 text-text-secondary hover:bg-slate-50 hover:text-text-primary dark:hover:bg-slate-800/40"
                  onClick={closeAll}
                >
                  <span
                    className="text-base transition-colors duration-300 text-text-muted"
                  >
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default BottomHeader;
