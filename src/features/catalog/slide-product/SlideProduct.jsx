import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Product from "./product";
import LoadingOfSlideProduct from "./loadingOfSlideProduct";
import { useTranslation } from "../../../shared/i18n/useTranslation";

function SlideProduct({ category, description, products }) {
  const { t } = useTranslation();
  const items = Array.isArray(products) ? products : [];
  const slidesPer = 4;
  const canLoop = items.length > slidesPer;
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const [swiper, setSwiper] = useState(null);

  return (
    <section className="shell section-gap deferred-section">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="section-kicker">{t("home.featuredEdit")}</span>
          <h3 className="section-title capitalize">{category}</h3>
        </div>
        <p className="max-w-2xl section-copy">{description}</p>
      </div>

      {items.length === 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <LoadingOfSlideProduct key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="hidden mb-4 lg:flex justify-end gap-2">
            <button
              ref={prevBtnRef}
              type="button"
              className="secondary-btn px-3 py-2 text-xs font-semibold"
              onClick={() => swiper?.slidePrev()}
            >
              {t("home.sliderPrev")}
            </button>
            <button
              ref={nextBtnRef}
              type="button"
              className="secondary-btn px-3 py-2 text-xs font-semibold"
              onClick={() => swiper?.slideNext()}
            >
              {t("home.sliderNext")}
            </button>
          </div>

          <Swiper
            loop={canLoop}
            watchSlidesProgress
            spaceBetween={24}
            modules={[Navigation]}
            navigation={{
              prevEl: prevBtnRef.current,
              nextEl: nextBtnRef.current,
            }}
            onBeforeInit={(swiperInstance) => {
              swiperInstance.params.navigation.prevEl = prevBtnRef.current;
              swiperInstance.params.navigation.nextEl = nextBtnRef.current;
            }}
            onSwiper={setSwiper}
            breakpoints={{
              320: { slidesPerView: 1.15 },
              640: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {items.map((product, index) => (
              <SwiperSlide key={product.id ?? index} className="pb-2">
                <Product item={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </section>
  );
}

export default SlideProduct;
