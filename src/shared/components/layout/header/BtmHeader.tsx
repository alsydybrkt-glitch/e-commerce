"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { TiThMenu } from "react-icons/ti";
import { MdArrowDropDown } from "react-icons/md";
import { AnimatePresence, motion, type Variants } from "framer-motion";
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

const megaMenuVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
};

const DesktopMegaMenu = dynamic(
  () => import("./DesktopMegaMenu").then((mod) => mod.DesktopMegaMenu),
  { ssr: false },
);

function BottomHeader({
  headerLogic,
  navLinks,
  categories,
  isVisible = true,
}: BtmHeaderProps) {
  const { t, isRTL } = useTranslation();
  const { openDesktopCategories, setOpenDesktopCategories, closeAll } = headerLogic;

  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible && openDesktopCategories) {
      setOpenDesktopCategories(false);
    }
  }, [isVisible, openDesktopCategories, setOpenDesktopCategories]);

  const featuredMenuLinks = useMemo(
    () => [
      { label: t("header.goToShop"), href: "/shop" },
      { label: t("header.exploreBlog"), href: "/blog" },
    ],
    [t],
  );

  const categoriesList = Array.isArray(categories) ? categories : [];

  const handleToggle = useCallback(() => {
    setOpenDesktopCategories((previous) => !previous);
  }, [setOpenDesktopCategories]);

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        setOpenDesktopCategories(false);
      }
    },
    [setOpenDesktopCategories],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && openDesktopCategories) {
        setOpenDesktopCategories(false);
      }
    },
    [openDesktopCategories, setOpenDesktopCategories],
  );

  useEffect(() => {
    if (!isVisible || !openDesktopCategories) {
      return;
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, openDesktopCategories, handleOutsideClick, handleKeyDown]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="hidden pb-2 lg:block">
      <div className="shell flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3">
          <div ref={categoriesRef} className="relative hidden lg:block">
            <button
              type="button"
              className="btn btn-secondary gap-2"
              onClick={handleToggle}
              aria-expanded={openDesktopCategories}
              aria-haspopup="true"
              aria-controls="desktop-mega-menu"
              aria-label={t("common.categories")}
            >
              <TiThMenu className="text-sm" aria-hidden="true" />
              {t("common.categories")}
              <MdArrowDropDown
                className={`text-lg transition-transform duration-300 ${
                  openDesktopCategories ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {openDesktopCategories ? (
                <motion.div
                  id="desktop-mega-menu"
                  key="mega-menu"
                  role="region"
                  aria-label={t("common.categories")}
                  variants={megaMenuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <DesktopMegaMenu
                    categories={categoriesList}
                    isRTL={isRTL}
                    onClose={closeAll}
                    featuredLinks={featuredMenuLinks}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <nav
            aria-label={t("header.mainNavigation")}
            className="hidden items-center gap-1 lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 text-text-secondary hover:bg-slate-50 hover:text-text-primary dark:hover:bg-slate-800/40"
                onClick={closeAll}
              >
                {link.icon ? (
                  <span
                    className="text-base text-text-muted transition-colors duration-300"
                    aria-hidden="true"
                  >
                    {link.icon}
                  </span>
                ) : null}
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
