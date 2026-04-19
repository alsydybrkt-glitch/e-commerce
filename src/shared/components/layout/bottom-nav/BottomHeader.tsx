"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { usePathname } from "next/navigation";
import { 
  FiHome, 
  FiShoppingBag, 
  FiHeart, 
  FiUser, 
  FiGrid 
} from "react-icons/fi";
import { cn } from "@/shared/utils/utils";
import { useUI } from "@/shared/context/UIContext";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  isAction?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", icon: FiHome },
  { label: "Categories", href: "#", icon: FiGrid, isAction: true },
  { label: "Cart", href: "/carts", icon: FiShoppingBag },
  { label: "Wishlist", href: "/favorites", icon: FiHeart },
  { label: "Account", href: "/profile", icon: FiUser },
];

export function BottomHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { toggleMobileMenu } = useUI();
  
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  /**
   * Smart Scroll Logic
   */
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 10) {
      setIsScrolled(false);
    } else {
      setIsScrolled(true);
    }

    const diff = latest - lastScrollY;
    const threshold = 40;

    if (latest < 40) {
      setIsVisible(true);
    } else if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(latest);
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLastScrollY(window.scrollY);
    }
  }, []);

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ 
          y: isVisible ? 0 : "120%", 
          transition: { 
            type: "spring", 
            stiffness: 260, 
            damping: 20, 
            mass: 0.8 
          } 
        }}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-[100] transition-colors duration-500 will-change-transform lg:hidden",
          "pb-[env(safe-area-inset-bottom,16px)] pt-2",
          isScrolled 
            ? "bg-white/90 backdrop-blur-xl dark:bg-slate-950/90 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.1)] border-t border-slate-100 dark:border-slate-800/50" 
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-lg items-center justify-around px-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            const content = (
              <>
                {/* Active Indicator Line */}
                <AnimatePresence>
                  {isActive && !item.isAction && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute -top-1 h-1 w-6 rounded-full bg-brand-500"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    />
                  )}
                </AnimatePresence>

                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-500",
                  isActive && !item.isAction
                    ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400" 
                    : "bg-transparent"
                )}>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
                  isActive && !item.isAction ? "opacity-100" : "opacity-0 scale-75"
                )}>
                  {item.label}
                </span>
              </>
            );

            if (item.isAction) {
              return (
                <button
                  key={item.label}
                  onClick={toggleMobileMenu}
                  className={cn(
                    "relative flex flex-col items-center gap-1 p-2 transition-all duration-300 active:scale-90 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                  )}
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-1 p-2 transition-all duration-300 active:scale-90",
                  isActive 
                    ? "text-brand-600 dark:text-brand-500" 
                    : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                )}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}
