"use client";

import { memo, useEffect, useRef, useMemo, useCallback } from "react";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { m, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { NavLink } from "@/types";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isRTL: boolean;
  navLinks: NavLink[];
  pathname: string;
}

export const MobileDrawer = memo(function MobileDrawer({
  isOpen,
  onClose,
  isRTL,
  navLinks,
  pathname,
}: MobileDrawerProps) {
  const { t } = useTranslation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Focus trap + keyboard handling
  useEffect(() => {
    if (!isOpen) {
      lastFocusRef.current?.focus();
      return;
    }

    lastFocusRef.current = document.activeElement as HTMLElement;
    const timer = setTimeout(() => closeButtonRef.current?.focus(), 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !containerRef.current) return;

      const focusable = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  const drawerVariants = useMemo(() => ({
    hidden:  { x: isRTL ? "100%" : "-100%" },
    visible: { x: 0, transition: { type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.28 } },
    exit:    { x: isRTL ? "100%" : "-100%", transition: { type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.22 } },
  }), [isRTL]);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px]"
          />

          {/* Drawer */}
          <m.aside
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            dir={isRTL ? "rtl" : "ltr"}
            style={{ willChange: "transform" }}
            className="fixed inset-y-0 start-0 z-[70] flex h-[100dvh] w-[85vw] max-w-[340px] flex-col bg-white dark:bg-slate-950 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                  <FiUser size={16} aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Aura Guest
                </span>
              </div>

              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label={t("common.close") || "Close"}
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              >
                <MdClose size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Nav */}
            <nav
              className="flex-1 overflow-y-auto px-4 py-5 space-y-1"
              aria-label="Main navigation"
            >
              <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                Explore
              </p>

              {navLinks.map((link) => {
                const active = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={onClose}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                      active
                        ? "bg-slate-900 text-white dark:bg-brand-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100"
                    }`}
                  >
                    <span
                      className={`text-base ${
                        active
                          ? "text-white"
                          : "text-slate-400 group-hover:text-brand-500"
                      }`}
                    >
                      {link.icon}
                    </span>
                    {link.name}
                    {active && (
                      <span className="ms-auto h-1.5 w-1.5 rounded-full bg-white/70" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="border-t border-slate-100 dark:border-slate-800/60 px-4 py-4">
              <button
                type="button"
                className="w-full rounded-xl py-3 text-xs font-semibold uppercase tracking-widest text-slate-400 transition-colors hover:text-rose-500 dark:hover:text-rose-400"
              >
                Sign out
              </button>
            </div>
          </m.aside>
        </>
      )}
    </AnimatePresence>
  );
});
