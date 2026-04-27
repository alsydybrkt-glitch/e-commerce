import { m, AnimatePresence } from "framer-motion";
import Product from "@/features/products/slide-product/Product";
import { Product as ProductType } from "@/services/api/productsApi";
import { useTranslation } from "@/shared/hooks/useTranslation";
import dynamic from "next/dynamic";

const MobileProductSwiper = dynamic(() => import("@/features/products/slide-product/MobileProductSwiper").then(mod => mod.default), {
  loading: () => (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:hidden">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="h-[400px] rounded-xl bg-surface-interactive animate-pulse" />
      ))}
    </div>
  ),
  ssr: false,
});

interface BestSellersContentProps {
  products: ProductType[];
  isLoading: boolean;
  isMobile: boolean;
  activeTab: string;
}

export function BestSellersContent({
  products,
  isLoading,
  isMobile,
  activeTab
}: BestSellersContentProps) {
  const { t } = useTranslation();

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <m.div 
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-80 rounded-xl bg-surface-interactive animate-pulse" />
          ))}
        </m.div>
      ) : products && products.length > 0 ? (
        isMobile ? (
          <MobileProductSwiper 
            items={products.slice(0, 8)}
            canLoop={products.length > 3}
            paginationClass="pagination-best-sellers"
            onSwiper={() => {}}
          />
        ) : (
          <m.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4"
          >
            {products.slice(0, 8).map((product) => (
              <div key={product.id} className="group">
                <Product item={product} />
              </div>
            ))}
          </m.div>
        )
      ) : (
        <m.div 
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="h-20 w-20 rounded-full bg-surface-secondary flex items-center justify-center text-3xl mb-4">
            🔍
          </div>
          <h3 className="text-xl font-bold mb-2 text-text-primary">{t("home.noProducts")}</h3>
          <p className="text-text-secondary max-w-sm">{t("shop.emptyCopy")}</p>
        </m.div>
      )}
    </AnimatePresence>
  );
}
