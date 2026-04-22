// BottomHeader.tsx
"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { TiThMenu } from "react-icons/ti";
import { MdArrowDropDown } from "react-icons/md";
import { AnimatePresence, m, type Variants } from "framer-motion";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { useTranslation } from "@/shared/hooks/useTranslation";
import type { Category } from "@/services/api/productsApi";

interface NavLink {
  path: string;
  name: string;
  icon?: React.ReactNode;
}

interface HeaderLogic {
  openDesktopCategories: boolean;
  setOpenDesktopCategories: React.Dispatch<React.SetStateAction<boolean>>;
  closeAll: () => void;
}

interface BtmHeaderProps {
  headerLogic: HeaderLogic;
  navLinks: NavLink[];
  categories: Category[];
  isVisible?: boolean;
}

// ── Animation Variants ────────────────────────────────────────────────────────

const megaMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.97,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    filter: "blur(2px)",
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

// ── Lazy Load ─────────────────────────────────────────────────────────────────

const DesktopMegaMenu = dynamic(
  () => import("./DesktopMegaMenu").then((mod) => mod.DesktopMegaMenu),
  { ssr: false }
);

// ── Component ─────────────────────────────────────────────────────────────────

function BottomHeader({
  headerLogic,
  navLinks,
  categories,
  isVisible = true,
}: BtmHeaderProps) {
  const { t, isRTL } = useTranslation();
  const { openDesktopCategories, setOpenDesktopCategories, closeAll } = headerLogic;

  const categoriesRef = useRef<HTMLDivElement>(null);

  // Close when header hides
  useEffect(() => {
    if (!isVisible && openDesktopCategories) {
      setOpenDesktopCategories(false);
    }
  }, [isVisible, openDesktopCategories, setOpenDesktopCategories]);

  const featuredMenuLinks = useMemo(
    () => [
      { label: t("common.goToShop"), href: "/shop" },
      { label: t("common.exploreBlog"), href: "/blog" },
    ],
    [t]
  );

  const categoriesList = Array.isArray(categories) ? categories : [];

  const handleToggle = useCallback(() => {
    setOpenDesktopCategories((prev) => !prev);
  }, [setOpenDesktopCategories]);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
        setOpenDesktopCategories(false);
      }
    },
    [setOpenDesktopCategories]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && openDesktopCategories) {
        setOpenDesktopCategories(false);
      }
    },
    [openDesktopCategories, setOpenDesktopCategories]
  );

  useEffect(() => {
    if (!isVisible || !openDesktopCategories) return;

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, openDesktopCategories, handleOutsideClick, handleKeyDown]);

  if (!isVisible) return null;

  return (
    <div className="hidden pb-2 lg:block">
      <div className="shell flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3">

          {/* ── Categories Trigger ──────────────────────────────────── */}
          <div ref={categoriesRef} className="relative hidden lg:block">
            <button
              type="button"
              className={`
                flex items-center gap-2.5 rounded-2xl px-5 py-2.5 text-sm font-bold
                transition-all duration-300 active:scale-95
                ${
                  openDesktopCategories
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-500/25"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                }
              `}
              onClick={handleToggle}
              aria-expanded={openDesktopCategories}
              aria-haspopup="dialog"
              aria-controls="desktop-mega-menu"
              aria-label={t("common.categories")}
            >
              <TiThMenu className={`text-sm transition-transform duration-300 ${openDesktopCategories ? "rotate-90" : ""}`} aria-hidden="true" />
              {t("common.categories")}
              <MdArrowDropDown
                className={`text-xl transition-transform duration-500 ${
                  openDesktopCategories ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {/* ── Animated Wrapper ── */}
            <AnimatePresence>
              {openDesktopCategories && (
                <m.div
                  id="desktop-mega-menu"
                  key="mega-menu"
                  variants={megaMenuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{
                    originY: 0,
                    originX: isRTL ? 1 : 0,
                  }}
                  className="absolute z-50 transition-all duration-300"
                >
                  <DesktopMegaMenu
                    categories={categoriesList}
                    isRTL={isRTL}
                    onClose={closeAll}
                    featuredLinks={featuredMenuLinks}
                  />
                </m.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Nav Links ───────────────────────────────────────────── */}
          <nav
            aria-label={t("nav.mainNavigation")}
            className="hidden items-center gap-1 lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-text-secondary transition-all duration-300 hover:bg-slate-50 hover:text-text-primary dark:hover:bg-slate-800/40"
                onClick={closeAll}
              >
                {link.icon && (
                  <span className="text-base text-text-muted transition-colors duration-300" aria-hidden="true">
                    {link.icon}
                  </span>
                )}
                {link.name}
              </Link>
            ))}
          </nav>

        </div>
      </div>
    </div>
  );
}

export default BottomHeader;