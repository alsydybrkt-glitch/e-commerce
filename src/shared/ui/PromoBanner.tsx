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
    <section className={`shell py-12 ${className || ""}`}>
      <div className="relative h-[480px] w-full overflow-hidden rounded-[32px] lg:h-[540px]">
        {/* Background Image with optimized loading */}
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-1000 hover:scale-105"
          loading="lazy"
          fetchPriority="low"
        />
        
        {/* Refined Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent dark:from-slate-900/90 dark:via-slate-900/50" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-center px-8 sm:px-12 lg:px-24">
          <div className="max-w-xl">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-400">
              Limited Edition / Exclusive
            </span>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-slate-300">
              {subtitle}
            </p>
            <Link 
              href="/shop" 
              className="group btn btn-primary w-fit min-w-[200px] gap-2 h-14"
            >
              {ctaText}
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
