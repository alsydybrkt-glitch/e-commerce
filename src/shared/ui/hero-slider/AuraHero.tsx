"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { HeroSlideItem } from "./HeroSlideItem";
import type { HeroSlide } from "./types";

// ─── Constants ───────────────────────────────────────────────────────────────
const AUTO_PLAY_INTERVAL = 5000;
const SWIPE_THRESHOLD = 56;

type SlideDirection = -1 | 1;

// ─── Slide config (outside component — no re-creation on each render) ─────────
const SLIDE_CONFIGS: Omit<HeroSlide, "eyebrow" | "title" | "description">[] = [
  {
    id: "hero-gaming",
    image: {
      src: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1600&q=80",
      alt: "Gaming setup with keyboard, console, and headset",
    },
    primaryAction: { label: "", href: "/shop", ariaLabel: "" },
    secondaryAction: { label: "", href: "/shop", ariaLabel: "" },
  },
  {
    id: "hero-workspace",
    image: {
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
      alt: "Premium tech products arranged on a modern desk",
    },
    primaryAction: { label: "", href: "/shop", ariaLabel: "" },
    secondaryAction: { label: "", href: "/blog", ariaLabel: "" },
  },
  {
    id: "hero-audio",
    image: {
      src: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=80",
      alt: "Wireless audio products and accessories",
    },
    primaryAction: { label: "", href: "/shop", ariaLabel: "" },
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const slideVariants = {
  enter: (direction: SlideDirection) => ({
    opacity: 0,
    x: direction > 0 ? 64 : -64,
    scale: 0.985,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (direction: SlideDirection) => ({
    opacity: 0,
    x: direction > 0 ? -64 : 64,
    scale: 0.985,
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] as const },
  }),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function normalizeIndex(index: number, length: number) {
  return (index + length) % length;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AuraHero() {
  const { t, isRTL } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const sliderRef = useRef<HTMLElement>(null);

  // FIX 2: isMounted ref to prevent setState after unmount
  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<SlideDirection>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<number[]>([0]);

  // FIX 6: Touch values as refs — they don't drive UI, so no need for state
  const touchStartXRef = useRef<number | null>(null);
  const touchCurrentXRef = useRef<number | null>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useSpring(pointerX, { stiffness: 140, damping: 24, mass: 0.35 });
  const parallaxY = useSpring(pointerY, { stiffness: 140, damping: 24, mass: 0.35 });

  // FIX 1 & 3: Slides built from stable config + t() called per key only
  const slides = useMemo<HeroSlide[]>(() => {
    const read = (key: string, fallback: string): string => {
      const value = t(key);
      return typeof value === "string" && value !== key ? value : fallback;
    };

    return SLIDE_CONFIGS.map((config, i) => ({
      ...config,
      eyebrow: read(`home.slides.${i}.eyebrow`, config.image.alt),
      title: read(`home.slides.${i}.title`, ""),
      description: read(`home.slides.${i}.copy`, ""),
      primaryAction: {
        ...config.primaryAction,
        label: read("home.heroButtons.shopCollection", "Shop Now"),
        ariaLabel: read("home.heroButtons.shopCollection", "Shop now"),
      },
      ...(config.secondaryAction && {
        secondaryAction: {
          ...config.secondaryAction,
          label: read("common.browseNow", "View Collection"),
          ariaLabel: read("common.browseNow", "View collection"),
        },
      }),
    }));
  }, [t]);

  // ─── Slide loading ──────────────────────────────────────────────────────────
  const markSlideAsLoaded = useCallback((index: number) => {
    setLoadedSlides((prev) => (prev.includes(index) ? prev : [...prev, index]));
  }, []);

  useEffect(() => {
    markSlideAsLoaded(activeIndex);
    markSlideAsLoaded(normalizeIndex(activeIndex + 1, slides.length));
  }, [activeIndex, markSlideAsLoaded, slides.length]);

  // ─── Navigation ─────────────────────────────────────────────────────────────
  const goToSlide = useCallback(
    (targetIndex: number, nextDirection: SlideDirection) => {
      const normalized = normalizeIndex(targetIndex, slides.length);
      markSlideAsLoaded(normalized);
      markSlideAsLoaded(normalizeIndex(normalized + 1, slides.length));
      setDirection(nextDirection);
      setActiveIndex(normalized);
    },
    [markSlideAsLoaded, slides.length],
  );

  const goForward = useCallback(() => {
    const d: SlideDirection = isRTL ? -1 : 1;
    goToSlide(activeIndex + 1, d);
  }, [activeIndex, goToSlide, isRTL]);

  const goBackward = useCallback(() => {
    const d: SlideDirection = isRTL ? 1 : -1;
    goToSlide(activeIndex - 1, d);
  }, [activeIndex, goToSlide, isRTL]);

  // FIX 4: Use a ref for goForward so the interval effect doesn't re-register
  // every time activeIndex changes — avoids accidental reset of the timer.
  const goForwardRef = useRef(goForward);
  useEffect(() => {
    goForwardRef.current = goForward;
  }, [goForward]);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || slides.length < 2) return;

    const id = window.setInterval(() => {
      goForwardRef.current();
    }, AUTO_PLAY_INTERVAL);

    return () => window.clearInterval(id);
  }, [isPaused, prefersReducedMotion, slides.length]);

  // ─── Parallax ───────────────────────────────────────────────────────────────
  const resetParallax = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  const handlePointerMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion || !sliderRef.current) return;
      const bounds = sliderRef.current.getBoundingClientRect();
      pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 14);
      pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 10);
    },
    [pointerX, pointerY, prefersReducedMotion],
  );

  // ─── Keyboard ───────────────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          if (isRTL) {
            goBackward();
          } else {
            goForward();
          }
          break;
        case "ArrowLeft":
          event.preventDefault();
          if (isRTL) {
            goForward();
          } else {
            goBackward();
          }
          break;
        case "Home":
          event.preventDefault();
          goToSlide(0, isRTL ? 1 : -1);
          break;
        case "End":
          event.preventDefault();
          goToSlide(slides.length - 1, isRTL ? -1 : 1);
          break;
      }
    },
    [goBackward, goForward, goToSlide, isRTL, slides.length],
  );

  // FIX 5: Touch handlers wrapped in useCallback for consistency
  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
    touchCurrentXRef.current = event.touches[0]?.clientX ?? null;
    if (isMountedRef.current) setIsPaused(true);
  }, []);

  const handleTouchMove = useCallback((event: React.TouchEvent<HTMLElement>) => {
    touchCurrentXRef.current = event.touches[0]?.clientX ?? null;
  }, []);

  // FIX 2: Guard setState with isMountedRef
  const handleTouchEnd = useCallback(() => {
    const start = touchStartXRef.current;
    const current = touchCurrentXRef.current;

    if (start !== null && current !== null) {
      const deltaX = start - current;
      if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
        if (deltaX > 0) {
          if (isRTL) {
            goBackward();
          } else {
            goForward();
          }
        } else if (isRTL) {
          goForward();
        } else {
          goBackward();
        }
      }
    }

    touchStartXRef.current = null;
    touchCurrentXRef.current = null;
    if (isMountedRef.current) setIsPaused(false);
  }, [goBackward, goForward, isRTL]);

  const handleFocus = useCallback(() => setIsPaused(true), []);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsPaused(false);
    }
  }, []);

  const currentSlide = slides[activeIndex];

  return (
    <section
      ref={sliderRef}
      tabIndex={0}
      onMouseMove={handlePointerMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        resetParallax();
      }}
      onKeyDown={handleKeyDown}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative isolate overflow-hidden px-3 py-8 sm:px-4 lg:px-6"
      aria-label="Hero promotions"
      aria-roledescription="carousel"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-slate-100" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-100/70 blur-3xl" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="relative overflow-hidden rounded-[0.5rem] border border-slate-200/80 bg-white/90 shadow-[0_28px_90px_-40px_rgba(15,23,42,0.5)] backdrop-blur-sm">

          {/* Slides */}
          <div className="relative" aria-live="polite">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={currentSlide.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="transform-gpu will-change-transform"
              >
                <HeroSlideItem
                  slide={currentSlide}
                  index={activeIndex}
                  totalSlides={slides.length}
                  imageShouldLoad={loadedSlides.includes(activeIndex)}
                  parallaxX={parallaxX}
                  parallaxY={parallaxY}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 px-4 pb-4 sm:px-6 sm:pb-6">

            {/* Dot indicators */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
              {slides.map((slide, index) => {
                const isCurrent = index === activeIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    onClick={() => {
                      if (index === activeIndex) return;
                      const d: SlideDirection =
                        index > activeIndex ? (isRTL ? -1 : 1) : isRTL ? 1 : -1;
                      goToSlide(index, d);
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                    // FIX 1: aria-current must be a string or undefined, not boolean
                    aria-current={isCurrent ? "true" : undefined}
                    aria-selected={isCurrent}
                    className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 ${
                      isCurrent
                        ? "w-8 bg-slate-900"
                        : "w-2.5 bg-slate-400/70 hover:bg-slate-500"
                    }`}
                  />
                );
              })}
            </div>

            {/* Prev / Next */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goBackward}
                aria-label={t("home.sliderPrev")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-slate-800 shadow-sm transition-colors duration-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={goForward}
                aria-label={t("home.sliderNext")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-slate-800 shadow-sm transition-colors duration-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
