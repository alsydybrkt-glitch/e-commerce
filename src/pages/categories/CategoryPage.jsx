import { useEffect, useMemo } from "react";
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
import { useRef, useState } from "react";

function CategoryPage() {
  const { t, tCategoryName, tCategoryDescription, isRTL } = useTranslation();
  const dispatch = useDispatch();
  const { category } = useParams();
  const products = useSelector((state) => state.products.singleCategory);
  const loadingProduct = useSelector((state) => state.products.loadingProduct);
  const loadingCategory = useSelector(
    (state) => state.products.loadingCategory,
  );
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const [swiper, setSwiper] = useState(null);
  const categoryTitle = tCategoryName(category);
  const categoryDescription =
    tCategoryDescription(category) || t("category.copy");
  const stats = useMemo(
    () => [
      { value: products?.length ?? 0, label: isRTL ? "منتج" : "Products" },
      { value: categoryTitle, label: isRTL ? "القسم" : "Category" },
    ],
    [categoryTitle, isRTL, products?.length],
  );

  useEffect(() => {
    if (category) {
      dispatch(fetchSingleCategory(category));
    }
  }, [category, dispatch]);

  if (loadingProduct || loadingCategory) {
    return (
      <div className="shell section-gap grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <LoadingOfSlideProduct key={index} />
        ))}
      </div>
    );
  }

  return (
    <PageTransitions key={category}>
      <section className="category-page shell section-gap">
        <div className="surface-card overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="mb-10 overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.24em] text-slate-200">
                  {t("category.kicker")}
                </span>
                <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
                  {categoryTitle}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  {categoryDescription}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden lg:flex justify-end gap-2 mb-4">
            <button
              ref={prevBtnRef}
              className="secondary-btn px-3 py-2 text-xs font-semibold"
            >
              Prev
            </button>

            <button
              ref={nextBtnRef}
              className="secondary-btn px-3 py-2 text-xs font-semibold"
            >
              Next
            </button>
          </div>
          {products?.length ? (
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
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
                320: { slidesPerView: 1.2 },
                640: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <Product item={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center dark:border-slate-600 dark:bg-slate-800/40">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {isRTL
                  ? "لا توجد منتجات في هذا القسم"
                  : "No products in this category"}
              </h2>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {categoryDescription}
              </p>
            </div>
          )}
        </div>
      </section>
    </PageTransitions>
  );
}

export default CategoryPage;
