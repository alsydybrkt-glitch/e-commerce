import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroSlider from "../../features/catalog/hero-slider/HeroSlider";
import SlideProduct from "../../features/catalog/slide-product/SlideProduct";
import PageTransitions from "../../shared/ui/PageTransition";
import CategoriesGrid from "../../features/catalog/categories-grid/CategoriesGrid";
import TrustSection from "../../features/catalog/trust-section/TrustSection";
import { fetchProducts } from "../../app/store/slices/productsSlice";
import { CategoriesContext } from "../../shared/context/categories-context";
import Product from "../../features/catalog/slide-product/product";
import { getRecentlyViewed } from "../../shared/lib/product-tools";
import { getProductImage } from "../../shared/lib/product-helpers";
import RenderWhenVisible from "../../shared/ui/RenderWhenVisible";
import { useTranslation } from "../../shared/i18n/useTranslation";

const categoryInf = [
  { subtitleKey: "categories.smartphones.name", apiName: "smartphones" },
  { subtitleKey: "categories.laptops.name", apiName: "laptops" },
  {
    subtitleKey: "categories.mobile-accessories.name",
    apiName: "mobile-accessories",
  },
  { subtitleKey: "categories.mens-watches.name", apiName: "mens-watches" },
  { subtitleKey: "categories.sunglasses.name", apiName: "sunglasses" },
  { subtitleKey: "categories.tablets.name", apiName: "tablets" },
];

function ProductGridSection({ kicker, title, copy, products, children }) {
  return (
    <section className="shell section-gap">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="section-kicker">{kicker}</span>
          <h2 className="section-title">{title}</h2>
          {copy && <p className="max-w-2xl section-copy">{copy}</p>}
        </div>
        <div>{children}</div>
      </div>

      {products.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          لا توجد منتجات متاحة
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((item) => (
            <Product key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

function HomePage() {
  const { categories } = useContext(CategoriesContext);
  const { t, tCategoryName } = useTranslation();
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();
  const [recentlyViewed] = useState(() => getRecentlyViewed());
  const [visibleCategories, setVisibleCategories] = useState([]);

  const eagerCategoryNames = useMemo(
    () => categories.slice(0, 2).map((category) => category.name),
    [categories],
  );
  const featuredCategoryNames = useMemo(
    () => categoryInf.map((category) => category.apiName),
    [],
  );
  const requestedCategories = useMemo(
    () =>
      Array.from(
        new Set([
          ...featuredCategoryNames,
          ...eagerCategoryNames,
          ...visibleCategories,
        ]),
      ),
    [eagerCategoryNames, featuredCategoryNames, visibleCategories],
  );

  useEffect(() => {
    requestedCategories.forEach((categoryName) => {
      if (!products[categoryName]) {
        dispatch(fetchProducts(categoryName));
      }
    });
  }, [dispatch, products, requestedCategories]);

  const categoriesData = useMemo(
    () =>
      categoryInf.map((categoryItem) => {
        const product = products?.[categoryItem.apiName]?.[0];

        return {
          subtitle: t(categoryItem.subtitleKey),
          title: tCategoryName(categoryItem.apiName),
          slug: categoryItem.apiName,
          img: getProductImage(product),
        };
      }),
    [products, t, tCategoryName],
  );

  return (
    <PageTransitions>
      <>
        <HeroSlider />
        <CategoriesGrid categories={categoriesData} />

        {recentlyViewed.length > 0 && (
          <RenderWhenVisible className="deferred-section" minHeight={540}>
            <ProductGridSection
              kicker={t("home.recentlyViewedKicker")}
              title={t("home.recentlyViewedTitle")}
              copy={t("home.recentlyViewedCopy")}
              products={recentlyViewed}
            />
          </RenderWhenVisible>
        )}

        {categories.map((category) => (
          <RenderWhenVisible
            key={category.name}
            className="deferred-section"
            minHeight={620}
            onVisible={() =>
              setVisibleCategories((prev) =>
                prev.includes(category.name) ? prev : [...prev, category.name],
              )
            }
          >
            <SlideProduct
              products={products[category.name]}
              category={tCategoryName(category.name)}
              description={category.description}
            />
          </RenderWhenVisible>
        ))}

        <RenderWhenVisible className="deferred-section" minHeight={780}>
          <TrustSection />
        </RenderWhenVisible>
      </>
    </PageTransitions>
  );
}

export default HomePage;
