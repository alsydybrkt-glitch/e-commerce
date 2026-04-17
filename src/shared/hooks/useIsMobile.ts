"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the current viewport is mobile.
 * Uses 1024px (LG breakpoint) as the threshold for "Desktop".
 * @returns boolean - true if mobile/tablet, false if desktop.
 */
export function useIsMobile(breakpoint: number = 1024) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check if we are in the browser
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    
    // Initial check
    setIsMobile(mediaQuery.matches);

    // Event listener for changes
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}
