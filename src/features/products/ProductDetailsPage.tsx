
import { Product } from "@/features/products/services/productsApi";
import { ProductGallery } from "./components/ProductGallery";
import { ProductInfo } from "./components/ProductInfo";
import { ProductPurchasePanel } from "./components/ProductPurchasePanel";
import { ProductBreadcrumbs } from "./components/ProductBreadcrumbs";
import { ProductTrustSignals } from "./components/ProductTrustSignals";
import { RelatedProducts } from "./components/RelatedProducts";
import { ProductReviews } from "./ProductReviews";
import { Suspense } from "react";
import { PageAnimationWrapper } from "@/shared/ui/PageAnimationWrapper";

interface ProductDetailsPageProps {
  product: Product;
  categoryProductsPromise: Promise<Product[]>;
  locale: string;
}

export default function ProductDetailsPage({ product, categoryProductsPromise, locale }: ProductDetailsPageProps) {
  return (
    <PageAnimationWrapper className="overflow-x-hidden">
      <main className="product-page shell section-gap overflow-x-hidden">
        <ProductBreadcrumbs 
          category={product.category} 
          productTitle={product.title} 
        />

        <article className="surface-card grid gap-8 overflow-hidden p-4 sm:p-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:p-10">
          {/* Left Column: Visuals */}
          <section aria-label="Product Media">
            <ProductGallery product={product} />
          </section>
          
          {/* Right Column: Interaction */}
          <section className="flex flex-col" aria-label="Product Actions">
            <ProductInfo product={product} />
            <ProductPurchasePanel product={product} />
            <ProductTrustSignals />
          </section>
        </article>

        {/* Reviews Section */}
        <div className="mt-16">
          <ProductReviews productId={product.id} />
        </div>

      </main>

      {/* Related Products Section — Outside the main shell to match HomePage layout */}
      <Suspense fallback={<div className="shell py-20"><div className="h-[540px] w-full animate-pulse rounded-[28px] bg-slate-100 dark:bg-slate-800/40" /></div>}>
        <RelatedProducts 
          category={product.category} 
          productsPromise={categoryProductsPromise} 
        />
      </Suspense>
    </PageAnimationWrapper>
  );
}

