"use client";

import { useEffect, useState } from "react";

interface DeferredLoadingProps {
  children: React.ReactNode;
  delayMs?: number;
}

export default function DeferredLoading({
  children,
  delayMs = 250,
}: DeferredLoadingProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [delayMs]);

  if (!isVisible) {
    return null;
  }

  return <>{children}</>;
}
