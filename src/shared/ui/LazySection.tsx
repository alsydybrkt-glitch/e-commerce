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
}: LazySectionProps) => {
  const isMobile = useIsMobile(1024);
  const finalMinHeight = isMobile 
    ? (minHeightMobile ?? minHeight ?? 600) 
    : (minHeightDesktop ?? minHeight ?? 800);

  return (
    <RenderWhenVisible
      className={className}
      minHeight={finalMinHeight}
      rootMargin={rootMargin}
      onVisible={onVisible}
    >
      <div id={id}>{children}</div>
    </RenderWhenVisible>
  );
};

export default LazySection;
