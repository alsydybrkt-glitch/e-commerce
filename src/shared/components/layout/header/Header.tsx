"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchAllCategories } from "@/features/products/store/productsSlice";
import dynamic from "next/dynamic";
import {
  FiHome,
  FiShoppingBag,
  FiBookOpen,
  FiPhoneIncoming,
  FiCreditCard,
  FiTruck,
} from "react-icons/fi";

import TopHeader from "./TopHeader";
import BottomHeader from "./BtmHeader";
import useHeaderLogic from "./useHeaderLogic";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { useScrollDirection } from "@/shared/hooks/useScrollDirection";
import styles from "./Header.module.css";

const MobileDrawer = dynamic(
  () => import("./MobileDrawer").then((mod) => mod.MobileDrawer),
  { ssr: false },
);

const BOTTOM_HEADER_SHOW_DELAY = 120;
const BOTTOM_HEADER_HIDE_DELAY = 120;
const BOTTOM_HEADER_TOGGLE_COOLDOWN = 260;

function Header() {
  const { t, isRTL } = useTranslation();
  const pathname = usePathname();
  const headerLogic = useHeaderLogic();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const categories = useAppSelector(
    (state) => state.products?.categories || [],
    shallowEqual,
  );

  const { isAtTop, isScrolled, scrollDirection, canAutoHide, isScrolling } =
    useScrollDirection({
      threshold: 14,
      scrolledOffset: 88,
      autoHideOffset: 220,
      idleDelay: 150,
    });

  const [isBottomVisible, setIsBottomVisible] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const lastHeaderOffsetRef = useRef<number | null>(null);
  const bottomVisibilityTimerRef = useRef<any>(null);
  const lastBottomVisibilityToggleAtRef = useRef(0);
  const pendingBottomVisibilityActionRef = useRef<"show" | "hide" | null>(null);

  const navLinks = useMemo(
    () => [
      { name: t("nav.home"), path: "/", icon: <FiHome size={16} /> },
      { name: t("nav.shop"), path: "/shop", icon: <FiShoppingBag size={16} /> },
      { name: t("nav.blog"), path: "/blog", icon: <FiBookOpen size={16} /> },
      {
        name: t("nav.contact"),
        path: "/contact",
        icon: <FiPhoneIncoming size={16} />,
      },
      {
        name: t("nav.checkout"),
        path: "/checkout",
        icon: <FiCreditCard size={16} />,
      },
      {
        name: t("nav.orderTracking"),
        path: "/order-tracking",
        icon: <FiTruck size={16} />,
      },
    ],
    [t],
  );

  const handleMouseEnter = useCallback(() => {
    setIsInteracting(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsInteracting(false);
  }, []);

  const handleFocusCapture = useCallback(() => {
    setIsInteracting(true);
  }, []);

  const handleBlurCapture = useCallback((event: React.FocusEvent<HTMLElement>) => {
    if (!headerRef.current?.contains(event.relatedTarget as Node | null)) {
      setIsInteracting(false);
    }
  }, []);

  const clearBottomVisibilityTimer = useCallback(() => {
    if (bottomVisibilityTimerRef.current !== null) {
      window.clearTimeout(bottomVisibilityTimerRef.current);
      bottomVisibilityTimerRef.current = null;
    }
    pendingBottomVisibilityActionRef.current = null;
  }, []);

  const scheduleBottomVisibility = useCallback(
    (nextVisible: boolean, delay: number) => {
      const nextAction = nextVisible ? "show" : "hide";
      if (pendingBottomVisibilityActionRef.current === nextAction) {
        return;
      }

      clearBottomVisibilityTimer();
      pendingBottomVisibilityActionRef.current = nextAction;

      bottomVisibilityTimerRef.current = window.setTimeout(() => {
        pendingBottomVisibilityActionRef.current = null;
        bottomVisibilityTimerRef.current = null;

        setIsBottomVisible((previous) => {
          if (previous === nextVisible) {
            return previous;
          }

          const now = Date.now();
          if (now - lastBottomVisibilityToggleAtRef.current < BOTTOM_HEADER_TOGGLE_COOLDOWN) {
            return previous;
          }

          lastBottomVisibilityToggleAtRef.current = now;
          return nextVisible;
        });
      }, delay);
    },
    [clearBottomVisibilityTimer],
  );

  useEffect(() => {
    if (
      isAtTop ||
      !canAutoHide ||
      isInteracting ||
      headerLogic.openDesktopCategories
    ) {
      clearBottomVisibilityTimer();
      setIsBottomVisible(true);
      return;
    }

    if (scrollDirection === "up") {
      scheduleBottomVisibility(true, BOTTOM_HEADER_SHOW_DELAY);
      return;
    }

    if (scrollDirection === "down" && isScrolling) {
      scheduleBottomVisibility(false, BOTTOM_HEADER_HIDE_DELAY);
      return;
    }

    clearBottomVisibilityTimer();
  }, [
    canAutoHide,
    clearBottomVisibilityTimer,
    headerLogic.openDesktopCategories,
    isAtTop,
    isInteracting,
    isScrolling,
    scheduleBottomVisibility,
    scrollDirection,
  ]);

  useEffect(() => {
    return () => {
      clearBottomVisibilityTimer();
    };
  }, [clearBottomVisibilityTimer]);


  useEffect(() => {
    const headerElement = headerRef.current;
    if (!headerElement || typeof document === "undefined") {
      return;
    }

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    let rafId: number | null = null;

    const updateHeaderOffset = (height: number) => {
      const safeOffset = Math.ceil(height) + 8;
      if (lastHeaderOffsetRef.current === safeOffset) {
        return;
      }
      lastHeaderOffsetRef.current = safeOffset;
      document.documentElement.style.setProperty(
        "--site-header-offset",
        `${safeOffset}px`,
      );
    };

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length) return;
      const entry = entries[0];
      const borderBoxSize = Array.isArray(entry.borderBoxSize)
        ? entry.borderBoxSize[0]
        : entry.borderBoxSize;
      const height = borderBoxSize?.blockSize ?? entry.contentRect.height;
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        updateHeaderOffset(height);
      });
    });
    resizeObserver.observe(headerElement);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
      className={`${styles.siteHeader} !sticky !top-0 !z-[1000] border-b-white/10 dark:border-b-slate-800/20 shadow-lg shadow-black/5 ${
        isAtTop ? styles.glass : styles.glassDarker
      } ${isScrolled ? styles.headerCondensed : "header-full"}`}
    >
      <TopHeader headerLogic={headerLogic} isScrolled={isScrolled && !isAtTop} />
      <BottomHeader
        headerLogic={headerLogic}
        navLinks={navLinks}
        categories={categories}
        isVisible={isBottomVisible || headerLogic.openDesktopCategories}
      />
      <MobileDrawer
        isOpen={headerLogic.openMobile}
        onClose={headerLogic.closeAll}
        isRTL={isRTL}
        navLinks={navLinks}
        pathname={pathname ?? "/"}
      />
    </header>
  );
}

export default Header;
