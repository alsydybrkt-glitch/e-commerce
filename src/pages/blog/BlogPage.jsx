import { useEffect, useMemo } from "react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../app/store/slices/productsSlice";
import Product from "../../features/catalog/slide-product/product";
import { usePageSeo } from "../../shared/hooks/usePageSeo";
import { getProductImage } from "../../shared/lib/product-helpers";
import PageTransitions from "../../shared/ui/PageTransition";
import { useTranslation } from "../../shared/i18n/useTranslation";

const blogGuideSlugs = ["smartphones", "laptops", "fragrances"];

function BlogHero({ featuredGuide, t, tCategoryName }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
      <article className="overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-2xl">
        <div className="overflow-hidden bg-slate-800">
          <img
            src={featuredGuide.image}
            alt={featuredGuide.title}
            className="h-72 w-full object-cover opacity-70 mix-blend-screen sm:h-80"
          />
        </div>

        <div className="relative p-6 sm:p-8">
          <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.24em] text-slate-300">
            <span>{featuredGuide.eyebrow}</span>
            <span>{featuredGuide.readTime}</span>
            <span>{tCategoryName(featuredGuide.categorySlug)}</span>
          </div>

          <h1 className="relative mt-4 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl">
            {featuredGuide.title}
          </h1>

          <p className="relative mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
            {featuredGuide.description}
          </p>

          <div className="relative mt-8 flex flex-wrap gap-3">
            <Link
              to={`/category/${featuredGuide.categorySlug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              {t("common.exploreCategory")}
              <FiArrowUpRight aria-hidden="true" />
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {t("common.visitShop")}
            </Link>
          </div>
        </div>
      </article>

      <aside className="surface-card flex flex-col justify-between p-6 sm:p-8">
        <div>
          <span className="section-kicker">{t("blog.topicsKicker")}</span>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {t("blog.topicsTitle")}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-500">
            {t("blog.topicsCopy")}
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {featuredGuide.searchTerms.map((term) => (
            <div
              key={term}
              className="flex items-center justify-between rounded-[22px] bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700"
            >
              <span>{term}</span>
              <FiArrowRight className="text-slate-400" aria-hidden="true" />
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}

function GuideCard({ guide, t, tCategoryName }) {
  return (
    <article className="group surface-card overflow-hidden transition duration-300 hover:-translate-y-1">
      <div className="overflow-hidden bg-slate-100">
        <img
          src={guide.image}
          alt={guide.title}
          loading="lazy"
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          <span>{guide.eyebrow}</span>
          <span>{guide.readTime}</span>
        </div>

        <h2 className="mt-4 text-2xl font-bold leading-tight text-slate-900">
          {guide.title}
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-500">{guide.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {guide.searchTerms.map((term) => (
            <span
              key={term}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
            >
              {term}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={`/category/${guide.categorySlug}`}
            className="secondary-btn inline-flex gap-2"
          >
            {t("blog.readThroughProducts")}
            <FiArrowUpRight aria-hidden="true" />
          </Link>
          <Link
            to={`/category/${guide.categorySlug}`}
            className="text-sm font-semibold text-brand-600"
          >
            {t("blog.browseCategory", {
              category: tCategoryName(guide.categorySlug),
            })}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const { t, tCategoryName } = useTranslation();
  const dispatch = useDispatch();
  const productsByCategory = useSelector((state) => state.products.items);

  usePageSeo({
    title:
      t("nav.blog") +
      " | " +
      (t("blog.title") || "Product guides and shopping inspiration"),
    description: t("blog.topicsCopy"),
  });

  useEffect(() => {
    blogGuideSlugs.forEach((slug) => {
      if (!productsByCategory[slug]) {
        dispatch(fetchProducts(slug));
      }
    });
  }, [dispatch, productsByCategory]);

  const guidesWithProducts = useMemo(
    () =>
      blogGuideSlugs.map((slug) => {
        const products = productsByCategory[slug] ?? [];
        const featuredProduct = products[0];
        const guideContent = t(`blog.guides.${slug}`);

        return {
          categorySlug: slug,
          eyebrow: guideContent.eyebrow,
          title: guideContent.title,
          description: guideContent.description,
          searchTerms: guideContent.searchTerms,
          readTime: guideContent.readTime,
          image: getProductImage(featuredProduct),
          products,
        };
      }),
    [productsByCategory, t]
  );

  const featuredGuide = guidesWithProducts[0];
  const recommendedProducts = useMemo(
    () =>
      guidesWithProducts
        .flatMap((guide) => guide.products.slice(0, 1))
        .filter(Boolean),
    [guidesWithProducts]
  );

  return (
    <PageTransitions>
      <section className="blog-page shell section-gap">
        <div className="mb-10">
          <span className="section-kicker">{t("blog.kicker")}</span>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {t("blog.title")}
          </h1>
        </div>

        {featuredGuide ? (
          <BlogHero
            featuredGuide={featuredGuide}
            t={t}
            tCategoryName={tCategoryName}
          />
        ) : null}

        <section className="mt-14">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="section-kicker">{t("blog.guidesKicker")}</span>
              <h2 className="section-title">{t("blog.guidesTitle")}</h2>
            </div>
            <Link to="/shop" className="secondary-btn w-fit">
              {t("common.viewAllProducts")}
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {guidesWithProducts.map((guide) => (
              <GuideCard
                key={guide.categorySlug}
                guide={guide}
                t={t}
                tCategoryName={tCategoryName}
              />
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="section-kicker">{t("blog.linkedProductsKicker")}</span>
              <h2 className="section-title">{t("blog.linkedProductsTitle")}</h2>
            </div>
            <Link to="/shop" className="text-sm font-semibold text-brand-600">
              {t("blog.moreProducts")}
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recommendedProducts.map((product) => (
              <Product key={product.id} item={product} />
            ))}
          </div>
        </section>
      </section>
    </PageTransitions>
  );
}
