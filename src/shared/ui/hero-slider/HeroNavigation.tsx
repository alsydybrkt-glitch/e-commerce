"use client";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface HeroNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  total: number;
  current: number;
  onSetIndex: (index: number) => void;
  t: (key: string) => string;
}

export const HeroNavigation = ({
  onPrev,
  onNext,
  total,
  current,
  onSetIndex,
  t,
}: HeroNavigationProps) => {
  return (
    <div className="absolute bottom-10 left-0 z-20 w-full lg:bottom-16">
      <div className="shell flex items-end justify-between">
        {/* Progress Indicators */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onSetIndex(i)}
                className="group relative flex flex-col gap-2 focus:outline-none"
                aria-label={`${t("common.favorite") || "Slide"} ${i + 1}`}
                aria-current={current === i ? "step" : undefined}
              >
                <div
                  className={`h-[3px] w-20 overflow-hidden rounded-full bg-white/10 transition-all duration-500 group-hover:bg-white/20`}
                >
                  <div
                    className={`h-full bg-white transition-all duration-700 ease-out ${
                      current === i ? "w-full" : "w-0"
                    }`}
                  />
                </div>
                <span 
                  className={`text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                    current === i ? "text-white opacity-100" : "text-white opacity-0 group-hover:opacity-40"
                  }`}
                >
                  0{i + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Directional Controls */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onPrev}
            className="group flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-white/10 bg-white/5 backdrop-blur-xl text-white transition-all hover:bg-white/10 hover:border-white/30 active:scale-95 focus:ring-2 focus:ring-white/40 focus:outline-none"
            aria-label={t("home.sliderPrev")}
          >
            <FiArrowLeft className="text-2xl transition-transform group-hover:-translate-x-1" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="group flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-white/10 bg-white/5 backdrop-blur-xl text-white transition-all hover:bg-white/10 hover:border-white/30 active:scale-95 focus:ring-2 focus:ring-white/40 focus:outline-none"
            aria-label={t("home.sliderNext")}
          >
            <FiArrowRight className="text-2xl transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

