"use client";

import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down" | null;

interface UseScrollDirectionOptions {
  threshold?: number;
  topOffset?: number;
  scrolledOffset?: number;
  scrolledHysteresis?: number;
  autoHideOffset?: number;
  autoHideHysteresis?: number;
  idleDelay?: number;
  activityThreshold?: number;
}

/**
 * Tracks scroll direction with rAF + refs to avoid re-rendering on every scroll pixel.
 */
export function useScrollDirection({
  threshold = 12,
  topOffset = 16,
  scrolledOffset = 80,
  scrolledHysteresis = 24,
  autoHideOffset = 176,
  autoHideHysteresis = 40,
  idleDelay = 140,
  activityThreshold = 6,
}: UseScrollDirectionOptions = {}) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [canAutoHide, setCanAutoHide] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const isScrolledRef = useRef(false);
  const canAutoHideRef = useRef(false);
  const isScrollingRef = useRef(false);
  const lastActivityYRef = useRef(0);
  const latestScrollYRef = useRef(0);
  const scrollIdleTimerRef = useRef<NodeJS.Timeout | number | null>(null);

  useEffect(() => {
    const readAndCommit = () => {
      const currentY = Math.max(window.scrollY, 0);
      const delta = currentY - lastScrollYRef.current;

      const nextIsAtTop = currentY <= topOffset;
      const nextIsScrolled = isScrolledRef.current
        ? currentY > scrolledOffset - scrolledHysteresis
        : currentY > scrolledOffset;
      const nextCanAutoHide = canAutoHideRef.current
        ? currentY > autoHideOffset - autoHideHysteresis
        : currentY > autoHideOffset;

      setIsAtTop((previous) => (previous === nextIsAtTop ? previous : nextIsAtTop));
      if (isScrolledRef.current !== nextIsScrolled) {
        isScrolledRef.current = nextIsScrolled;
        setIsScrolled(nextIsScrolled);
      }
      if (canAutoHideRef.current !== nextCanAutoHide) {
        canAutoHideRef.current = nextCanAutoHide;
        setCanAutoHide(nextCanAutoHide);
      }

      if (nextIsAtTop) {
        setScrollDirection((previous) => (previous === null ? previous : null));
        if (canAutoHideRef.current) {
          canAutoHideRef.current = false;
          setCanAutoHide(false);
        }
        lastScrollYRef.current = currentY;
        tickingRef.current = false;
        return;
      }

      if (Math.abs(delta) >= threshold) {
        const nextDirection: ScrollDirection = delta > 0 ? "down" : "up";
        setScrollDirection((previous) => (previous === nextDirection ? previous : nextDirection));
        lastScrollYRef.current = currentY;
      }

      tickingRef.current = false;
    };

    const onScroll = () => {
      const currentY = Math.max(window.scrollY, 0);
      latestScrollYRef.current = currentY;
      const activityDelta = Math.abs(currentY - lastActivityYRef.current);

      // Ignore tiny scroll jitter (trackpads / touch noise) to prevent header flicker.
      if (activityDelta < activityThreshold) {
        return;
      }

      lastActivityYRef.current = currentY;

      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        setIsScrolling(true);
      }

      if (scrollIdleTimerRef.current) {
        clearTimeout(scrollIdleTimerRef.current);
      }

      scrollIdleTimerRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        setIsScrolling(false);
        setScrollDirection(null);
        lastScrollYRef.current = latestScrollYRef.current;
      }, idleDelay);

      if (tickingRef.current) {
        return;
      }

      tickingRef.current = true;
      window.requestAnimationFrame(readAndCommit);
    };

    lastScrollYRef.current = Math.max(window.scrollY, 0);
    latestScrollYRef.current = lastScrollYRef.current;
    lastActivityYRef.current = lastScrollYRef.current;
    isScrolledRef.current = lastScrollYRef.current > scrolledOffset;
    canAutoHideRef.current = lastScrollYRef.current > autoHideOffset;
    setIsScrolled(isScrolledRef.current);
    setCanAutoHide(canAutoHideRef.current);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (scrollIdleTimerRef.current) {
        clearTimeout(scrollIdleTimerRef.current);
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, [
    autoHideHysteresis,
    autoHideOffset,
    activityThreshold,
    idleDelay,
    scrolledHysteresis,
    scrolledOffset,
    threshold,
    topOffset,
  ]);

  return { scrollDirection, isAtTop, isScrolled, canAutoHide, isScrolling };
}
