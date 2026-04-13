"use client";

import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { Interactive } from "@/shared/ui/Interactive";

interface HeroContentProps {
  eyebrow: string;
  title: string;
  copy: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  onSecondaryCtaClick: () => void;
}

export const HeroContent = ({
  eyebrow,
  title,
  copy,
  primaryCtaText,
  secondaryCtaText,
  onSecondaryCtaClick,
}: HeroContentProps) => {
  return (
    <div className="relative z-10 flex flex-col justify-center h-full max-w-3xl px-6 lg:px-0">
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="h-[2px] w-12 bg-white/40" />
          <span className="text-sm font-bold uppercase tracking-[0.4em] text-white/80">
            {eyebrow}
          </span>
        </div>

        <div className="space-y-6">
          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            {title}
          </h1>

          <p className="max-w-xl text-base sm:text-lg lg:text-xl leading-relaxed text-white/70 font-medium">
            {copy}
          </p>
        </div>

        <div className="flex flex-wrap gap-5 pt-4">
          <Interactive variant="scale">
            <Link
              href="/shop"
              className="group relative flex items-center justify-center gap-3 bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:bg-brand-500 hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              {primaryCtaText}
              <FiArrowRight className="text-xl transition-transform group-hover:translate-x-1" />
            </Link>
          </Interactive>

          <Interactive variant="scale">
            <button
              onClick={onSecondaryCtaClick}
              className="group flex items-center justify-center gap-3 border-2 border-white/20 bg-white/5 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:bg-white/10 hover:border-white/40"
            >
              {secondaryCtaText}
            </button>
          </Interactive>
        </div>
      </div>
    </div>
  );
};

