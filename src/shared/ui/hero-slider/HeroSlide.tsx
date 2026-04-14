import Image from "next/image";
import type { ReactNode } from "react";

interface HeroSlideProps {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
  isActive: boolean;
  priority?: boolean;
}

export const HeroSlide = ({
  imageSrc,
  imageAlt,
  children,
  isActive,
  priority = false,
}: HeroSlideProps) => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-950">
      <div
        className={`absolute inset-0 z-0 transition-transform duration-[8000ms] ease-linear ${
          isActive ? "scale-110" : "scale-100"
        }`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          quality={90}
          decoding="async"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 1200px, 1600px"
          className="object-cover opacity-80 transition-opacity duration-1000"
        />

        {/* Sophisticated Layered Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent z-[1]" />
        <div className="absolute inset-0 bg-black/10 z-[1]" />
      </div>

      <div className="shell relative z-[2] flex h-full items-center">
        <div
          className={`h-full w-full flex items-center transition-all duration-1000 delay-300 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
