"use client";
import React from "react";
import RenderWhenVisible from "./RenderWhenVisible";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  minHeightDesktop?: number;
  minHeightMobile?: number;
  minHeight?: number; // fallback/unified
  rootMargin?: string;
  onVisible?: () => void;
  id?: string;
}

const LazySection = ({
  children,
  className = "",
  minHeightDesktop,
  minHeightMobile,
  minHeight,
  rootMargin = "400px",
  onVisible,
  id,
  eager = false,
}: LazySectionProps & { eager?: boolean }) => {
  const isMobile = useIsMobile(1024);
  const finalMinHeight = isMobile
    ? (minHeightMobile ?? minHeight ?? 600)
    : (minHeightDesktop ?? minHeight ?? 800);

  if (eager) {
    return (
      <section
        className={className}
        style={{ minHeight: `${finalMinHeight}px` }}
      >
        <div id={id}>{children}</div>
      </section>
    );
  }

  return (
    <RenderWhenVisible
      className={className}
      minHeight={finalMinHeight}
      rootMargin={rootMargin}
      onVisible={onVisible}
    >
      <section id={id}>{children}</section>
    </RenderWhenVisible>
  );
};

export default LazySection;
