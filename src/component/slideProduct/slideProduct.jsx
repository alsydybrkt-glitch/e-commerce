import Product from "./product";
import "./slideProduct.css";
import LoadingOfSlideProduct from "./loadingOfSlideProduct";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

function SlideProduct({ category, description, products }) {
  // ضمان إن products مصفوفة
  const items = Array.isArray(products) ? products : [];

  const slidesPer = 4;
  const canLoop = items.length > slidesPer; // لازم يكون عدد المنتجات أكبر من عرض السلايدر

  return (
    <div className="slide-product slide">
      <div className="container">
        <div className="slide-header">
          <h3>{category}</h3>
          <p>{description}</p>
        </div>

        {/* لو المنتجات لسه م وصلت */}
        {items.length === 0 ? (
          <div style={{ display: "flex", gap: "20px" }}>
            <LoadingOfSlideProduct />
            <LoadingOfSlideProduct />
            <LoadingOfSlideProduct />
            <LoadingOfSlideProduct />
          </div>
        ) : (
          <Swiper
            loop={canLoop}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            pagination={true}
            slidesPerView={slidesPer}
            spaceBetween={30}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
          >
            {items.map((product, index) => (
              <SwiperSlide key={product.id ?? index}>
                <Product item={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
export default SlideProduct;
