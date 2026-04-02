import { useEffect, useRef, useState } from "react";

function RenderWhenVisible({
  children,
  className = "",
  minHeight = 320,
  rootMargin = "240px 0px",
  onVisible,
}) {
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

  return (
    <div ref={hostRef} className={className}>
      {isVisible ? (
        children
      ) : (
        <div
          aria-hidden="true"
          className="surface-card animate-pulse"
          style={{ minHeight }}
        />
      )}
    </div>
  );
}

export default RenderWhenVisible;
