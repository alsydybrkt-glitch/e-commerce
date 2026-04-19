// DesktopMegaMenu.tsx
"use client";

import { memo, useMemo, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Category } from "@/services/api/productsApi";

interface DesktopMegaMenuProps {
  categories: Category[];
  isRTL: boolean;
  onClose: () => void;
  featuredLinks: { label: string; href: string }[];
}

const ACCENT_COLORS = [
  { bg: "bg-violet-500", hover: "hover:bg-violet-50 dark:hover:bg-violet-950/30", text: "group-hover:text-violet-600 dark:group-hover:text-violet-400", shadow: "hover:shadow-violet-500/10" },
  { bg: "bg-sky-500",    hover: "hover:bg-sky-50    dark:hover:bg-sky-950/30",    text: "group-hover:text-sky-600    dark:group-hover:text-sky-400",    shadow: "hover:shadow-sky-500/10"    },
  { bg: "bg-emerald-500",hover: "hover:bg-emerald-50 dark:hover:bg-emerald-950/30",text:"group-hover:text-emerald-600 dark:group-hover:text-emerald-400",shadow: "hover:shadow-emerald-500/10"},
  { bg: "bg-amber-500",  hover: "hover:bg-amber-50  dark:hover:bg-amber-950/30",  text: "group-hover:text-amber-600  dark:group-hover:text-amber-400",  shadow: "hover:shadow-amber-500/10"  },
  { bg: "bg-rose-500",   hover: "hover:bg-rose-50   dark:hover:bg-rose-950/30",   text: "group-hover:text-rose-600   dark:group-hover:text-rose-400",   shadow: "hover:shadow-rose-500/10"   },
  { bg: "bg-indigo-500", hover: "hover:bg-indigo-50 dark:hover:bg-indigo-950/30", text: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400", shadow: "hover:shadow-indigo-500/10" },
  { bg: "bg-teal-500",   hover: "hover:bg-teal-50   dark:hover:bg-teal-950/30",   text: "group-hover:text-teal-600   dark:group-hover:text-teal-400",   shadow: "hover:shadow-teal-500/10"   },
  { bg: "bg-orange-500", hover: "hover:bg-orange-50 dark:hover:bg-orange-950/30", text: "group-hover:text-orange-600 dark:group-hover:text-orange-400", shadow: "hover:shadow-orange-500/10" },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const CategoryItem = memo(function CategoryItem({
  category,
  label,
  accentIndex,
  onClose,
  linkRef,
  onFocus,
}: {
  category: Category;
  label: string;
  accentIndex: number;
  onClose: () => void;
  linkRef: (el: HTMLAnchorElement | null) => void;
  onFocus: () => void;
}) {
  const accent = ACCENT_COLORS[accentIndex % ACCENT_COLORS.length];

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Link
        ref={linkRef}
        href={`/category/${category.slug}`}
        className={`
          group relative flex h-full items-center gap-3.5 rounded-[1.25rem] px-4 py-3
          outline-none transition-all duration-300
          focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2
          dark:focus-visible:ring-offset-slate-950
          ${accent.hover} ${accent.shadow} hover:scale-[1.02] active:scale-[0.98]
        `}
        onClick={onClose}
        onFocus={onFocus}
      >
        <div
          className={`
            relative flex h-10 w-10 shrink-0 items-center justify-center
            rounded-2xl text-[13px] font-black text-white
            shadow-xl shadow-current/10 transition-all duration-300
            group-hover:rotate-6 group-hover:scale-110
            ${accent.bg}
          `}
          aria-hidden="true"
        >
          <span className="relative z-10">{label.slice(0, 1).toUpperCase()}</span>
          <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <div className="flex flex-col overflow-hidden">
          <span
            className={`
              truncate text-[15px] font-bold tracking-tight
              text-slate-700 dark:text-slate-200
              transition-colors duration-300
              ${accent.text}
            `}
          >
            {label}
          </span>
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 opacity-80 group-hover:opacity-100 transition-opacity">
            {category.name.length > 20 ? category.name.slice(0, 20) + "..." : "Explore Collection"}
          </span>
        </div>

        <span
          className="ms-auto shrink-0 translate-x-2 text-slate-300 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 dark:text-slate-600"
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </Link>
    </motion.div>
  );
});

export const DesktopMegaMenu = memo(function DesktopMegaMenu({
  categories,
  isRTL,
  onClose,
  featuredLinks,
}: DesktopMegaMenuProps) {
  const { t, tCategoryName } = useTranslation();

  const categoryItems = useMemo(
    () =>
      categories.map((cat) => ({
        category: cat,
        label: tCategoryName(cat.slug || cat.name),
      })),
    [categories, tCategoryName]
  );

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const focusedIndex = useRef<number>(-1);

  const setLinkRef = useCallback(
    (index: number) => (el: HTMLAnchorElement | null) => {
      linkRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const total = categories.length;
    if (total === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const next = (focusedIndex.current + 2) % total;
          focusedIndex.current = next;
          linkRefs.current[next]?.focus();
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const prev = focusedIndex.current < 2 ? total - (total % 2 === 0 ? 2 : 1) + (focusedIndex.current % 2) : focusedIndex.current - 2;
          focusedIndex.current = prev;
          linkRefs.current[prev]?.focus();
          break;
        }
        case "ArrowRight": {
          e.preventDefault();
          const next = (focusedIndex.current + (isRTL ? -1 : 1) + total) % total;
          focusedIndex.current = next;
          linkRefs.current[next]?.focus();
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          const prev = (focusedIndex.current + (isRTL ? 1 : -1) + total) % total;
          focusedIndex.current = prev;
          linkRefs.current[prev]?.focus();
          break;
        }
        case "Home":
          e.preventDefault();
          focusedIndex.current = 0;
          linkRefs.current[0]?.focus();
          break;
        case "End":
          e.preventDefault();
          focusedIndex.current = total - 1;
          linkRefs.current[total - 1]?.focus();
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [categories, isRTL, onClose]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`
        absolute top-[calc(100%+12px)] z-50 w-[38rem] overflow-hidden
        rounded-[2.5rem] border border-slate-200/50
        bg-white/90 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.02)]
        backdrop-blur-xl
        dark:border-slate-800/50 dark:bg-slate-950/90
        dark:shadow-[0_32px_80px_-16px_rgba(0,0,0,0.4)]
        ${isRTL ? "right-0" : "left-0"}
        will-change-transform will-change-opacity
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100/80 px-7 py-5 dark:border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-1 bg-brand-500 rounded-full" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            {t("common.categories")}
            <span className="ms-2 rounded-lg bg-slate-100 px-2 py-0.5 font-bold tabular-nums text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {categories.length}
            </span>
          </span>
        </div>

        {featuredLinks.length > 0 && (
          <nav aria-label="featured" className="flex items-center gap-2">
            {featuredLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-1.5 text-[12px] font-bold text-brand-600 transition-all hover:bg-brand-50 hover:scale-105 active:scale-95 dark:text-brand-400 dark:hover:bg-brand-950/50"
                onClick={onClose}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-2 p-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
        {categoryItems.map(({ category, label }, index) => (
          <CategoryItem
            key={category.slug}
            category={category}
            label={label}
            accentIndex={index}
            onClose={onClose}
            onFocus={() => { focusedIndex.current = index; }}
            linkRef={setLinkRef(index)}
          />
        ))}
      </div>

      {/* Footer / Decorative element */}
      <div className="h-2 bg-gradient-to-r from-transparent via-slate-50 to-transparent dark:via-slate-900/50" />
    </motion.div>
  );
});