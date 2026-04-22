"use client";

import { memo, useMemo, useRef, useCallback, useEffect } from "react";
import { m, Variants } from "framer-motion";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Category } from "@/services/api/productsApi";

// ─── Types ───────────────────────────────────────────────────────────────────

interface DesktopMegaMenuProps {
  categories: Category[];
  isRTL: boolean;
  onClose: () => void;
  featuredLinks: { label: string; href: string }[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ACCENT_COLORS = [
  { dot: "bg-violet-500", hover: "hover:bg-violet-50 dark:hover:bg-violet-950/30", text: "group-hover:text-violet-600 dark:group-hover:text-violet-400" },
  { dot: "bg-sky-500",    hover: "hover:bg-sky-50    dark:hover:bg-sky-950/30",    text: "group-hover:text-sky-600    dark:group-hover:text-sky-400"    },
  { dot: "bg-emerald-500",hover: "hover:bg-emerald-50 dark:hover:bg-emerald-950/30",text:"group-hover:text-emerald-600 dark:group-hover:text-emerald-400"},
  { dot: "bg-amber-500",  hover: "hover:bg-amber-50  dark:hover:bg-amber-950/30",  text: "group-hover:text-amber-600  dark:group-hover:text-amber-400"  },
  { dot: "bg-rose-500",   hover: "hover:bg-rose-50   dark:hover:bg-rose-950/30",   text: "group-hover:text-rose-600   dark:group-hover:text-rose-400"   },
  { dot: "bg-indigo-500", hover: "hover:bg-indigo-50 dark:hover:bg-indigo-950/30", text: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400" },
  { dot: "bg-teal-500",   hover: "hover:bg-teal-50   dark:hover:bg-teal-950/30",   text: "group-hover:text-teal-600   dark:group-hover:text-teal-400"   },
  { dot: "bg-orange-500", hover: "hover:bg-orange-50 dark:hover:bg-orange-950/30", text: "group-hover:text-orange-600 dark:group-hover:text-orange-400" },
] as const;

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden:  { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 28, staggerChildren: 0.025, delayChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

// ─── CategoryItem ─────────────────────────────────────────────────────────────

interface CategoryItemProps {
  category: Category;
  label: string;
  accentIndex: number;
  onClose: () => void;
  linkRef: (el: HTMLAnchorElement | null) => void;
  onFocus: () => void;
}

const CategoryItem = memo(function CategoryItem({
  category,
  label,
  accentIndex,
  onClose,
  linkRef,
  onFocus,
}: CategoryItemProps) {
  const accent = ACCENT_COLORS[accentIndex % ACCENT_COLORS.length];

  return (
    <m.div variants={itemVariants}>
      <Link
        ref={linkRef}
        href={`/category/${category.slug}`}
        onClick={onClose}
        onFocus={onFocus}
        className={[
          "group flex items-center gap-3 rounded-2xl px-3.5 py-2.5",
          "outline-none transition-all duration-200",
          "focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950",
          "hover:scale-[1.01] active:scale-[0.99]",
          accent.hover,
        ].join(" ")}
      >
        {/* Color dot */}
        <span
          aria-hidden
          className={`h-2 w-2 shrink-0 rounded-full transition-transform duration-200 group-hover:scale-125 ${accent.dot}`}
        />

        {/* Text */}
        <span
          className={[
            "truncate text-[14px] font-semibold text-slate-700 dark:text-slate-200",
            "transition-colors duration-200",
            accent.text,
          ].join(" ")}
        >
          {label}
        </span>

        {/* Arrow */}
        <span
          aria-hidden
          className="ms-auto shrink-0 translate-x-1 text-slate-300 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:text-slate-600"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </Link>
    </m.div>
  );
});

// ─── DesktopMegaMenu ──────────────────────────────────────────────────────────

export const DesktopMegaMenu = memo(function DesktopMegaMenu({
  categories,
  isRTL,
  onClose,
  featuredLinks,
}: DesktopMegaMenuProps) {
  const { t, tCategoryName } = useTranslation();

  const categoryItems = useMemo(
    () => categories.map((cat) => ({ category: cat, label: tCategoryName(cat.slug || cat.name) })),
    [categories, tCategoryName],
  );

  // ── Keyboard Navigation ──
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const focusedIndex = useRef(-1);

  const setLinkRef = useCallback(
    (index: number) => (el: HTMLAnchorElement | null) => { linkRefs.current[index] = el; },
    [],
  );

  useEffect(() => {
    const total = categories.length;
    if (!total) return;

    const COLS = 2;
    const dir = isRTL ? -1 : 1;

    const move = (next: number) => {
      focusedIndex.current = next;
      linkRefs.current[next]?.focus();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const i = focusedIndex.current;
      switch (e.key) {
        case "ArrowDown":  e.preventDefault(); move(Math.min(i + COLS, total - 1)); break;
        case "ArrowUp":    e.preventDefault(); move(Math.max(i - COLS, 0));         break;
        case "ArrowRight": e.preventDefault(); move((i + dir + total) % total);     break;
        case "ArrowLeft":  e.preventDefault(); move((i - dir + total) % total);     break;
        case "Home":       e.preventDefault(); move(0);                             break;
        case "End":        e.preventDefault(); move(total - 1);                     break;
        case "Escape":     onClose();                                                break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [categories.length, isRTL, onClose]);

  return (
    <m.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={[
        "absolute top-[calc(100%+10px)] z-50 w-[36rem]",
        "overflow-hidden rounded-3xl",
        "border border-slate-200/60 bg-white/95 backdrop-blur-xl",
        "shadow-xl shadow-slate-900/8",
        "dark:border-slate-800/50 dark:bg-slate-950/95 dark:shadow-slate-900/40",
        isRTL ? "right-0" : "left-0",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800/60">
        <span className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
          {t("common.categories")}
          <span className="ms-2 rounded-md bg-slate-100 px-1.5 py-0.5 font-bold tabular-nums text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {categories.length}
          </span>
        </span>

        {featuredLinks.length > 0 && (
          <nav aria-label="featured" className="flex items-center gap-1">
            {featuredLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="rounded-xl px-3.5 py-1.5 text-[12px] font-bold text-brand-600 transition-all hover:bg-brand-50 hover:scale-105 active:scale-95 dark:text-brand-400 dark:hover:bg-brand-950/50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-1 p-3 max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
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
    </m.div>
  );
});
