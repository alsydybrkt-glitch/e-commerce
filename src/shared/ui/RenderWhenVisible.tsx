"use client";
import { useEffect, useRef, useState } from "react";

interface RenderWhenVisibleProps {
  children: React.ReactNode;
  className?: string;
  minHeight?: number;
  rootMargin?: string;
  onVisible?: () => void;
}

function RenderWhenVisible({
  children,
  className = "",
  minHeight = 320,
  rootMargin = "240px 0px",
  onVisible,
}: RenderWhenVisibleProps) {
  const hostRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = hostRef.current;

    if (!node || isVisible) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsVisible(true);
        onVisible?.();
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible, onVisible, rootMargin]);

  const heightClasses: Record<number, string> = {
    320: "min-h-[320px]",
    540: "min-h-[540px]",
    620: "min-h-[620px]",
  };

  const minHeightClass = heightClasses[minHeight] || "min-h-[320px]";

  return (
    <div ref={hostRef} className={className}>
      {isVisible ? (
        children
      ) : (
        <div
          aria-hidden="true"
          className={`surface-card animate-pulse ${minHeightClass}`}
        />
      )}
    </div>
  );
}

export default RenderWhenVisible;
