"use client";

import Image from "next/image";
import { motion, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LocalizedLink } from "@/shared/ui/LocalizedLink";
import type { HeroSlide } from "./types";

interface HeroSlideItemProps {
  slide: HeroSlide;
  index: number;
  totalSlides: number;
  imageShouldLoad: boolean;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}

export function HeroSlideItem({
  slide,
  index,
  totalSlides,
  imageShouldLoad,
  parallaxX,
  parallaxY,
}: HeroSlideItemProps) {
  return (
    <article
      className="relative"
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${totalSlides}`}
    >
      <div className="grid items-center gap-8 md:gap-12 md:grid-cols-2 px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="order-1 flex flex-col gap-5 md:gap-6 max-w-xl">
          {slide.eyebrow ? (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-xs sm:text-sm uppercase tracking-[0.18em] font-semibold text-slate-500"
            >
              {slide.eyebrow}
            </motion.p>
          ) : null}

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
            className="text-3xl sm:text-4xl xl:text-5xl font-semibold leading-tight text-slate-900"
          >
            {slide.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
            className="text-sm sm:text-base xl:text-lg text-slate-600 leading-relaxed"
          >
            {slide.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <LocalizedLink
              href={slide.primaryAction.href}
              aria-label={slide.primaryAction.ariaLabel ?? slide.primaryAction.label}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900"
            >
              <span>{slide.primaryAction.label}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LocalizedLink>

            {slide.secondaryAction ? (
              <LocalizedLink
                href={slide.secondaryAction.href}
                aria-label={slide.secondaryAction.ariaLabel ?? slide.secondaryAction.label}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors duration-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900"
              >
                {slide.secondaryAction.label}
              </LocalizedLink>
            ) : null}
          </motion.div>
        </div>

        <div className="order-2">
          <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-slate-100 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)]">
            <div className="relative aspect-[4/3] w-full">
              {imageShouldLoad ? (
                <motion.div
                  style={{ x: parallaxX, y: parallaxY }}
                  className="absolute inset-0 will-change-transform transform-gpu"
                >
                  <Image
                    src={slide.image.src}
                    alt={slide.image.alt}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    priority={index === 0}
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 620px"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              ) : (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 to-slate-100" />
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/10 via-transparent to-slate-900/35" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_52%)]" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
