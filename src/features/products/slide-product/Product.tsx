"use client";
import { memo, useMemo } from "react";
import { Product as ProductType } from "@/services/api/productsApi";
import { getProductImage } from "@/shared/utils/product-helpers";
import { useProductActions } from "@/features/products/hooks/useProductActions";

import ProductCard from "./ProductCard";

function Product({ item, priority = false }: { item: ProductType; priority?: boolean }) {
  const image = useMemo(() => getProductImage(item), [item]);

  const actions = useProductActions(item);

  return (
    <ProductCard
      item={item}
      image={image}
      priority={priority}
      actions={actions}
    />
  );
}

export default memo(Product);