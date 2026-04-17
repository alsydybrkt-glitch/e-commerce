import { getTranslations } from "@/config/i18n/get-translations";
import { Product } from "@/services/api/productsApi";
import { ProductGallery } from "./components/ProductGallery";
import { ProductInfo } from "./components/ProductInfo";
import { ProductPurchasePanel } from "./components/ProductPurchasePanel";
import { ProductBreadcrumbs } from "./components/ProductBreadcrumbs";
import { ProductTrustSignals } from "./components/ProductTrustSignals";
import { RelatedProducts } from "./components/RelatedProducts";
import { ProductReviews } from "./ProductReviews";
import { Suspense } from "react";
import { ProductDetailsSkeleton } from "./ProductDetailsSkeleton";

interface ProductDetailsPageProps {
  product: Product;
  categoryProductsPromise: Promise<Product[]>;
  locale: string;
}

export default function ProductDetailsPage({ product, categoryProductsPromise, locale }: ProductDetailsPageProps) {
  const { t } = getTranslations(locale);

  return (
    <>
      <div className="product-page shell section-gap overflow-x-hidden !pt-6 sm:!pt-10">
        <ProductBreadcrumbs 
          category={product.category} 
          productTitle={product.title} 
        />

        <Suspense fallback={<ProductDetailsSkeleton />}>
          <article className="surface-card grid gap-6 p-3 sm:gap-8 sm:p-8 md:gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:p-12">
            {/* Left Column: Visuals */}
            <section aria-label={t("common.media") || "Product Media"}>
              <ProductGallery product={product} />
            </section>
            
            {/* Right Column: Interaction */}
            <section className="flex flex-col" aria-label={t("common.actions") || "Product Actions"}>
              <ProductInfo product={product} />
              <ProductPurchasePanel product={product} />
              <ProductTrustSignals />
            </section>
          </article>
        </Suspense>

        {/* Reviews Section */}
        <div className="mt-12 sm:mt-16">
          <ProductReviews productId={product.id} />
        </div>
      </div>

      {/* Related Products Section — Outside the main shell to match HomePage layout */}
      <Suspense fallback={<div className="shell py-20"><div className="h-[540px] w-full animate-pulse rounded-[28px] bg-slate-100 dark:bg-slate-800/40" /></div>}>
        <RelatedProducts 
          category={product.category} 
          productsPromise={categoryProductsPromise} 
        />
      </Suspense>
    </>
  );
}
