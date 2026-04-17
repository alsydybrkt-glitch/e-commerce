"use client";

import { memo, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import { useTranslation } from "@/shared/hooks/useTranslation";

interface HeroSlideData {
  eyebrow: string;
  title: string;
  copy: string;
}

import { HeroSlide } from "./HeroSlide";
import { HeroContent } from "./HeroContent";
import { HeroNavigation } from "./HeroNavigation";
import { HeroSkeleton } from "./HeroSkeleton";

import "swiper/css";
import "swiper/css/effect-fade";

const slideImages = [
  "/images/banner_Hero1.jpg",
  "/images/banner_Hero2.jpg",
  "/images/banner_Hero3.jpg",
];

function HeroSlider() {
  const { t, locale, isRTL } = useTranslation();
  const slides = t("home.slides") as unknown as HeroSlideData[];
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSwiperReady, setIsSwiperReady] = useState(false);

  // Auto-initialize Swiper after hydration & handle keyboard navigation
  useEffect(() => {
    setIsSwiperReady(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (isRTL) handlePrev(); else handleNext();
      } else if (e.key === "ArrowLeft") {
        if (isRTL) handleNext(); else handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRTL]);

  const handleNext = () => swiperRef.current?.slideNext();
  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleSetIndex = (index: number) => swiperRef.current?.slideToLoop(index);

  return (
    <section 
      className="home-hero shell-sm relative h-[600px] overflow-hidden sm:h-[650px] lg:h-[720px] pt-4 lg:pt-8"
      aria-label="Featured Promotions"
    >
      {!isSwiperReady ? (
        // Static FIRST SLIDE for instant LCP (SSR/Server-Sent HTML)
        <div className="h-full w-full rounded-[20px] lg:rounded-[32px] overflow-hidden">
          <HeroSlide 
            imageSrc={slideImages[0]} 
            imageAlt={slides[0]?.title || "Hero Banner"}
            isActive={true}
            priority={true}
          >
            <HeroContent 
              eyebrow={slides[0]?.eyebrow}
              title={slides[0]?.title}
              copy={slides[0]?.copy}
              primaryCtaText={t("home.heroButtons.shopCollection")}
              secondaryCtaText={t("home.heroButtons.readStories")}
              onSecondaryCtaClick={() => router.push("/blog")}
            />
          </HeroSlide>
          
          <HeroNavigation 
            current={0}
            total={slides.length}
            onNext={() => {}} 
            onPrev={() => {}} 
            onSetIndex={() => {}} 
            t={t}
          />
        </div>
      ) : (
        // Active Swiper instance after client-side hydration
        <Swiper
          key={locale}
          dir={isRTL ? "rtl" : "ltr"}
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-full w-full rounded-[20px] lg:rounded-[32px] overflow-hidden"
        >
          {slides.map((slide: HeroSlideData, index: number) => {
            const imageSrc = slideImages[index % slideImages.length];

            return (
              <SwiperSlide key={`${imageSrc}-${index}`}>
                <HeroSlide 
                  imageSrc={imageSrc} 
                  imageAlt={slide.title}
                  isActive={activeIndex === index}
                  priority={index === 0}
                >
                  <HeroContent 
                    eyebrow={slide.eyebrow}
                    title={slide.title}
                    copy={slide.copy}
                    primaryCtaText={t("home.heroButtons.shopCollection")}
                    secondaryCtaText={t("home.heroButtons.readStories")}
                    onSecondaryCtaClick={() => router.push("/blog")}
                  />
                </HeroSlide>
              </SwiperSlide>
            );
          })}

          <HeroNavigation 
            current={activeIndex}
            total={slides.length}
            onNext={handleNext}
            onPrev={handlePrev}
            onSetIndex={handleSetIndex}
            t={t}
          />
        </Swiper>
      )}
    </section>
  );
}

export default memo(HeroSlider);

