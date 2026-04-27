import Image from "next/image";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { FiArrowRight } from "react-icons/fi";

interface PromoBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  imageSrc: string;
  className?: string;
}

export function PromoBanner({
  title,
  subtitle,
  ctaText,
  imageSrc,
  className,
}: PromoBannerProps) {
  return (
    <div className={`relative h-[320px] sm:h-[350px] lg:h-[380px] w-full overflow-hidden rounded-2xl border border-border-light shadow-lg group ${className || ""}`}>
      {/* Background Image with optimized loading */}
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      
      {/* Refined Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent dark:from-slate-900/90 dark:via-slate-900/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-8 sm:px-12">
        <div className="max-w-md">
          <span className="mb-2 inline-block text-[10px] font-black uppercase tracking-[0.3em] text-brand-400">
            Exclusive Offer
          </span>
          <h2 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-white">
            {title}
          </h2>
          <p className="mb-6 text-sm sm:text-base leading-relaxed text-slate-300 line-clamp-2">
            {subtitle}
          </p>
          <Link 
            href="/shop" 
            className="group flex w-fit items-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-brand-500 hover:text-white"
          >
            {ctaText}
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
