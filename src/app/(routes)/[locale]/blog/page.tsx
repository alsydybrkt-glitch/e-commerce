import { Metadata } from "next";
import { cookies } from "next/headers";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { fetchCategoryProducts } from "@/services/api/productsApi";
import { getTranslations, Locale } from "@/config/i18n/get-translations";
import { getProductImage } from "@/shared/utils/product-helpers";

import BlogHero from "@/features/blog/components/BlogHero";
import BlogHeader from "@/features/blog/components/BlogHeader";
import GuideSlider from "@/features/blog/components/GuideSlider";
import { Newsletter } from "@/shared/ui/Newsletter";
import SlideProduct from "@/features/products/slide-product/SlideProduct";
import { GuideData } from "@/features/blog/components/GuideSlider";

const blogGuideSlugs = ["smartphones", "laptops", "fragrances"];

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = cookies();
  const locale = (cookieStore.get("locale")?.value as Locale) || "en";
  const { t } = getTranslations(locale);

  const title = t("blog.kicker");
  const description = t("blog.title");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function Page() {
  const cookieStore = cookies();
  const locale = (cookieStore.get("locale")?.value as Locale) || "en";
  const { t, tCategoryName } = getTranslations(locale);

  // Fetch product data for all featured categories in parallel
  const categoryDataPromises = blogGuideSlugs.map(async (slug) => {
    try {
      const products = await fetchCategoryProducts(slug);
      const guideContent = t(`blog.guides.${slug}`) as any;

      return {
        categorySlug: slug,
        eyebrow: guideContent.eyebrow,
        title: guideContent.title,
        description: guideContent.description,
        searchTerms: guideContent.searchTerms || [],
        readTime: guideContent.readTime,
        image: getProductImage(products[0]),
        products,
      };
    } catch (error) {
      console.error(`Failed to fetch products for blog category ${slug}:`, error);
      return null;
    }
  });

  const guidesWithProducts = (await Promise.all(categoryDataPromises)).filter(
    (guide): guide is GuideData => guide !== null
  );

  if (guidesWithProducts.length === 0) {
    // Fallback if API fails completely
    return (
      <div className="shell py-20 text-center">
        <h1 className="text-2xl font-bold">{t("common.error")}</h1>
        <p className="mt-4">{t("blog.noProducts")}</p>
        <Link href="/" className="mt-6 inline-block text-brand-600 underline">
          {t("nav.home")}
        </Link>
      </div>
    );
  }

  const featuredGuide = guidesWithProducts[0];
  const recommendedProducts = guidesWithProducts
    .flatMap((guide) => guide!.products.slice(0, 2))
    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i); // Deduplicate

  return (
    <main className="blog-page shell section-gap overflow-x-hidden">
      <BlogHeader
        kicker={t("blog.kicker")}
        title={t("blog.title")}
      />

      <section>
        {featuredGuide && (
          <BlogHero
            featuredGuide={featuredGuide}
            categoryName={tCategoryName(featuredGuide.categorySlug)}
          />
        )}
      </section>

      <section className="mt-24">
        <div 
          className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both"
        >
          <div>
            <span className="section-kicker">{t("blog.guidesKicker")}</span>
            <h2 className="section-title text-4xl sm:text-5xl">{t("blog.guidesTitle")}</h2>
          </div>
          <Link href="/shop" className="secondary-btn h-12 w-fit px-8 rounded-xl font-bold">
            {t("common.viewAllProducts")}
          </Link>
        </div>

        <div className="mt-4">
           {/* Guides are now also in a slider for consistency across the site */}
           <GuideSlider
             guides={guidesWithProducts}
           />
        </div>
      </section>

      {recommendedProducts.length > 0 && (
        <section className="mt-24">
           <SlideProduct
             category={t("blog.linkedProductsTitle")}
             products={recommendedProducts}
             hideHeader={true}
             useShell={false}
           />
        </section>
      )}

      {/* Newsletter Section */}
      <section className="mt-12 -mx-4 sm:-mx-6 lg:-mx-8">
        <Newsletter />
      </section>
    </main>
  );
}
