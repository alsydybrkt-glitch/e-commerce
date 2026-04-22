"use client";

import { m } from "framer-motion";
import { ReactNode } from "react";

interface PageAnimationWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageAnimationWrapper({ children, className = "overflow-x-hidden" }: PageAnimationWrapperProps) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </m.div>
  );
}
