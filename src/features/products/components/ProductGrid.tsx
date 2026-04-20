"use client";

import React, { memo, useId } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Product from "@/features/products/slide-product/ProductCard";
import LoadingOfSlideProduct from "@/features/products/slide-product/ProductSkeleton";
import { Product as ProductType } from "@/services/api/productsApi";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

// Dynamically import Swiper component for mobile only to optimize bundle size
const MobileProductSwiper = dynamic(() => import("../slide-product/MobileProductSwiper"), {
  loading: () => (
    <div className="grid grid-cols-2 gap-4 md:hidden">
      {[...Array(4)].map((_, i) => (
        <LoadingOfSlideProduct key={i} />
      ))}
    </div>
  ),
  ssr: false,
});

interface ProductGridProps {
  products: ProductType[];
  isLoading?: boolean;
}

/**
 * ProductGrid: A high-performance, responsive grid for the catalog.
 * It shows 2 columns on mobile for better density and 4 on desktop.
 * UPDATED: Uses Swiper on mobile for better UX as requested.
 */
const ProductGrid = memo(function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  const isMobile = useIsMobile(1024); // Threshold for mobile/tablet
  const uniqueId = useId().replace(/:/g, "");
  const paginationClass = `pagination-grid-${uniqueId}`;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 md:gap-6">
        {[...Array(8)].map((_, i) => (
          <LoadingOfSlideProduct key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) return null;

  // Render Mobile Swiper
  if (isMobile) {
    return (
      <div className="animate-in fade-in duration-700">
        <MobileProductSwiper
          items={products}
          canLoop={products.length > 2}
          onSwiper={() => {}}
          paginationClass={paginationClass}
        />
      </div>
    );
  }

  // Render Desktop Grid
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 md:gap-6 animate-in fade-in duration-700">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ 
            duration: 0.5, 
            ease: [0.21, 0.45, 0.32, 0.9],
            delay: (index % 4) * 0.05 
          }}
          className="fill-mode-both"
        >
          <Product item={product} priority={index < 4} />
        </motion.div>
      ))}
    </div>
  );
});

export default ProductGrid;
