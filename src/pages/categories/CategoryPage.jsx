import { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleCategory } from "../../app/store/slices/productsSlice";
import Product from "../../features/catalog/slide-product/product";
import LoadingOfSlideProduct from "../../features/catalog/slide-product/loadingOfSlideProduct";
import PageTransitions from "../../shared/ui/PageTransition";
import { useTranslation } from "../../shared/i18n/useTranslation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function CategoryPage() {
  const { t, tCategoryName, tCategoryDescription, isRTL } = useTranslation();
  const dispatch = useDispatch();
  const { category } = useParams();

  const products = useSelector((state) => state.products.singleCategory ?? []);
  const loadingProduct = useSelector((state) => state.products.loadingProduct);
  const loadingCategory = useSelector(
    (state) => state.products.loadingCategory
  );

  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const swiperRef = useRef(null);

  const categoryTitle = tCategoryName(category);
  const categoryDescription =
    tCategoryDescription(category) || t("category.copy");

  const stats = useMemo(
    () => [
      { value: products.length, label: isRTL ? "منتج" : "Products" },
      { value: categoryTitle, label: isRTL ? "القسم" : "Category" },
    ],
    [categoryTitle, isRTL, products.length]
  );

  useEffect(() => {
    if (category) {
      dispatch(fetchSingleCategory(category));
    }
  }, [category, dispatch]);

  /* Swipe Hint Animation (مرة واحدة) */
  useEffect(() => {
    const seen = sessionStorage.getItem("swiperHintSeen");

    if (!seen && swiperRef.current) {
      setTimeout(() => {
        swiperRef.current.slideNext(300);
        setTimeout(() => {
          swiperRef.current.slidePrev(300);
        }, 400);
      }, 1200);

      sessionStorage.setItem("swiperHintSeen", "true");
    }
  }, [products]);

  if (loadingProduct || loadingCategory) {
    return (
      <div className="shell py-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <LoadingOfSlideProduct key={index} />
        ))}
      </div>
    );
  }

  return (
    <PageTransitions key={category}>
      {/* HERO */}
      <section className="shell py-6 sm:py-10">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white">

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">

            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-slate-200">
                {t("category.kicker")}
              </span>

              <h1 className="mt-3 text-2xl sm:text-4xl font-bold">
                {categoryTitle}
              </h1>

              <p className="mt-3 max-w-xl text-sm text-slate-300">
                {categoryDescription}
              </p>
            </div>

            <div className="grid gap-3 grid-cols-2 lg:grid-cols-1">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur"
                >
                  <p className="text-[11px] uppercase tracking-wider text-slate-400">
                    {item.label}
                  </p>

                  <p className="mt-1 text-base font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="shell pb-10">

        {/* navigation desktop */}
        <div className="hidden lg:flex justify-end gap-3 mb-4">
          <button
            ref={prevBtnRef}
            className="secondary-btn px-4 py-2 text-sm rounded-lg"
          >
            Prev
          </button>

          <button
            ref={nextBtnRef}
            className="secondary-btn px-4 py-2 text-sm rounded-lg"
          >
            Next
          </button>
        </div>

        {products.length ? (
          <div className="relative">

            {/* gradient hint */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16  z-10 lg:hidden" />

            <div className="relative">
        <Swiper
          modules={[Navigation]}
          grabCursor
          spaceBetween={20}
          navigation={{
            prevEl: prevBtnRef.current,
            nextEl: nextBtnRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevBtnRef.current;
            swiper.params.navigation.nextEl = nextBtnRef.current;
          }}
          breakpoints={{
            0: { slidesPerView: 1.15 },
            480: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Product item={product} />
            </SwiperSlide>
          ))}
        </Swiper>
</div>

          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
            <h2 className="text-lg sm:text-xl font-bold">
              {isRTL
                ? "لا توجد منتجات في هذا القسم"
                : "No products in this category"}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {categoryDescription}
            </p>
          </div>
        )}

      </section>
    </PageTransitions>
  );
}

export default CategoryPage;