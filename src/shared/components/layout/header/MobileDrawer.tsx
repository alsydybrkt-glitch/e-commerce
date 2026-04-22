"use client";

import React, { memo, useEffect, useMemo } from "react";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { m, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { useTranslation } from "@/shared/hooks/useTranslation";

import { NavLink } from "@/types";
import {
  FiUser,
} from "react-icons/fi";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isRTL: boolean;
  navLinks: NavLink[];
  pathname: string;
}



const MenuSection = memo(function MenuSection({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
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
});



const PrimaryNavigation = memo(function PrimaryNavigation({
  navLinks,
  pathname,
  onClose,
}: {
  navLinks: NavLink[];
  pathname: string;
  onClose: () => void;
}) {
  return (
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
                <span
                  className={`text-xl ${active ? "text-white" : "text-slate-400 group-hover:text-brand-500"}`}
                >
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
  );
});




export const MobileDrawer = memo(function MobileDrawer({
  isOpen,
  onClose,
  isRTL,
  navLinks,
  pathname,
}: MobileDrawerProps) {
  const { t } = useTranslation();
  const initialFocusRef = React.useRef<HTMLButtonElement>(null);
  const lastFocusedElement = React.useRef<HTMLElement | null>(null);
  const containerRef = React.useRef<HTMLElement>(null);


  // Handle Body Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Focus Trap & Keyboard Events
  useEffect(() => {
    if (!isOpen) {
      // Restore focus when closing
      if (lastFocusedElement.current) {
        lastFocusedElement.current.focus();
      }
      return;
    }

    // Capture the element that had focus before opening the drawer
    lastFocusedElement.current = document.activeElement as HTMLElement;

    // Set initial focus to the close button for accessibility
    const focusTimeout = setTimeout(() => {
      initialFocusRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(focusTimeout);
    };
  }, [isOpen, onClose]);

  const drawerVariants = useMemo(
    () => ({
      hidden: { x: isRTL ? "100%" : "-100%" },
      visible: {
        x: 0,
        transition: { type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.28 },
      },
      exit: {
        x: isRTL ? "100%" : "-100%",
        transition: { type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.22 },
      },
    }),
    [isRTL]
  );

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-[2px]"
          />

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
            className="fixed top-0 bottom-0 z-[70] flex h-[100dvh] w-[85vw] max-w-[360px] flex-col overflow-hidden bg-white shadow-2xl dark:bg-slate-950"
          >
            <div className="flex items-center justify-between border-b border-slate-50 p-6 dark:border-slate-900">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
                  <FiUser size={18} aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  </span>
                  <span className="text-sm font-black leading-tight text-slate-900 dark:text-white">
                    Aura Guest
                  </span>
                </div>
              </div>
              <button
                ref={initialFocusRef}
                onClick={onClose}
                aria-label={t("common.close") || "Close"}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-transform active:scale-90 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-slate-900"
                type="button"
              >
                <MdClose size={22} aria-hidden="true" />
              </button>
            </div>

            <div className="custom-scrollbar flex-1 overflow-y-auto px-6 py-8 scroll-smooth">
              <PrimaryNavigation navLinks={navLinks} pathname={pathname} onClose={onClose} />
            </div>

            <div className="border-t border-slate-50 bg-slate-50/50 p-6 dark:border-slate-900 dark:bg-slate-950/50">
              <button
                className="w-full rounded-2xl py-4 text-xs font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-rose-500"
                type="button"
              >
                Sign Out Account
              </button>
            </div>
          </m.aside>
        </>
      )}
    </AnimatePresence>
  );
});

