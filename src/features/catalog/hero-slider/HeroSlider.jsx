import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { useTranslation } from "../../../shared/i18n/useTranslation";

import "swiper/css";
import "swiper/css/pagination";

const slideImages = [
  "/images/img/hero-banner-1.jpg",
  "/images/img/hero-banner-2.jpg",
  "/images/img/hero-banner-3.jpg",
];

function HeroSlider() {
  const { t, locale, isRTL } = useTranslation();
  const slides = t("home.slides");
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const contentVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <section className="home-hero shell pt-8 sm:pt-10">
      <Swiper
        key={locale}
        dir={isRTL ? "rtl" : "ltr"}
        modules={[Autoplay, Pagination]}
        autoplay={
          reduceMotion ? false : { delay: 5200, disableOnInteraction: false }
        }
        pagination={{ clickable: true }}
        className="
        [&_.swiper-pagination-bullet]:!bg-slate-300
        [&_.swiper-pagination-bullet-active]:!bg-brand-600
        "
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slideImages[index]}>
            <div
              className="
              surface-card overflow-hidden
              bg-gradient-to-br
              from-surface
              via-brand-50/30
              to-background
              "
            >
              <div className="grid items-center gap-10 px-6 py-8 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:py-14">
                {/* LEFT SIDE */}

                <motion.div
                  className="space-y-6"
                  initial={reduceMotion ? false : "hidden"}
                  whileInView={reduceMotion ? undefined : "visible"}
                  viewport={{ once: true, amount: 0.3 }}
                  variants={contentVariants}
                >
                  <motion.span
                    className="section-kicker"
                    variants={itemVariants}
                  >
                    {slide.eyebrow}
                  </motion.span>

                  <motion.div className="space-y-4" variants={itemVariants}>
                    <h1 className="font-display text-4xl font-bold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>

                    <p className="max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
                      {slide.copy}
                    </p>
                  </motion.div>

                  <motion.div
                    className="flex flex-wrap gap-3"
                    variants={itemVariants}
                  >
                    <Link to="/shop" className="primary-btn gap-2">
                      {t("home.heroButtons.shopCollection")}
                      <FiArrowUpRight />
                    </Link>

                    <button
                      type="button"
                      onClick={() => navigate("/blog")}
                      className="secondary-btn"
                    >
                      {t("home.heroButtons.readStories")}
                    </button>
                  </motion.div>

                  {/* METRICS */}

                  <motion.div
                    className="grid max-w-xl grid-cols-3 gap-3 pt-2"
                    variants={itemVariants}
                  >
                    {[
                      ["24h", t("home.heroMetrics.quickDelivery")],
                      ["50+", t("home.heroMetrics.categories")],
                      ["4.9", t("home.heroMetrics.rating")],
                    ].map(([value, label]) => (
                      <div
                        key={label}
                        className="
                        rounded-3xl
                        border border-border
                        bg-surface
                        p-4
                        "
                      >
                        <p className="text-2xl font-bold text-text-primary">
                          {value}
                        </p>

                        <p className="text-xs uppercase tracking-[0.22em] text-text-secondary">
                          {label}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* RIGHT SIDE IMAGE */}

                <motion.div
                  className="relative"
                  initial={
                    reduceMotion ? false : { opacity: 0, scale: 0.96, y: 18 }
                  }
                  whileInView={
                    reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }
                  }
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {/* glow */}

                <div
                  className="
                  absolute inset-0
                  rounded-[32px]
                  bg-gradient-to-br
                  from-brand-200/40
                  via-surface
                  to-accent-400/20
                  blur-2xl
                  "
                />

                  {/* image container */}

                    <motion.div
                      className="relative group"
                      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >

                      <motion.div
                        whileHover={reduceMotion ? undefined : { y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="
                        relative overflow-hidden
                        rounded-3xl
                        h-[320px]
                        sm:h-[380px]
                        lg:h-[440px]
                        shadow-xl
                        "
                      >

                        {/* image */}

                        <motion.div
                          className="
                          absolute inset-0
                          bg-cover
                          bg-center
                          bg-no-repeat
                          transition-transform duration-700
                          group-hover:scale-110
                          "
                          style={{ backgroundImage: `url(${slideImages[index]})` }}
                        />

                        {/* overlay خفيف جداً */}

                        <div
                          className="
                          absolute inset-0
                          bg-gradient-to-t
                          from-black/30
                          via-transparent
                          to-transparent
                          "
                        />

                        {/* top badge */}

                        <div
                          className="
                          absolute left-6 top-6
                          rounded-full
                          bg-white
                          px-4 py-2
                          text-xs font-semibold
                          tracking-wide
                          text-slate-700
                          shadow-md
                          "
                        >
                          {t("home.heroBadges.premiumDrop")}
                        </div>

                        {/* bottom badge */}

                        <div
                          className="
                          absolute bottom-6 right-6
                          rounded-xl
                          bg-white
                          px-5 py-3
                          shadow-lg
                          "
                        >
                          <p className="text-xs uppercase tracking-widest text-slate-400">
                            {t("home.heroBadges.weeklyPicks")}
                          </p>

                          <p className="text-2xl font-bold text-brand-600">
                            {t("home.heroBadges.upTo")}
                          </p>
                        </div>

                      </motion.div>

                    </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default memo(HeroSlider);
