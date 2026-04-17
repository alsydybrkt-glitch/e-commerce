"use client";

import React, { memo } from "react";
import Product from "../slide-product/product";
import { Product as ProductType } from "@/services/api/productsApi";

interface ProductGridProps {
  products: ProductType[];
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

const ProductGrid = ({ products, columns = { mobile: 1, tablet: 2, desktop: 4 } }: ProductGridProps) => {
  const items = Array.isArray(products) ? products : [];

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((product) => (
        <div key={product.id} className="h-full">
          <Product item={product} />
        </div>
      ))}
    </div>
  );
};

export default memo(ProductGrid);
