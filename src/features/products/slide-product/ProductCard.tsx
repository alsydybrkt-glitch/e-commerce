"use client";

import React, { memo } from "react";
import { Product as ProductType } from "@/services/api/productsApi";
import { Interactive } from "@/shared/ui/Interactive";
import { useProductState } from "@/features/products/hooks/useProductState";

// Components
import ProductCardBadge from "./components/ProductCardBadge";
import ProductCardImage from "./components/ProductCardImage";
import ProductCardInfo from "./components/ProductCardInfo";
import ProductCardActions from "./components/ProductCardActions";

interface ProductCardProps {
  item: ProductType;
  image: string;
  priority?: boolean;
  actions?: {
    addToCart?: (e: React.MouseEvent) => void;
    toggleFavorite?: (isFav: boolean) => void;
    share?: (e: React.MouseEvent) => void;
  };
}

/**
 * ProductCard component - Refactored for modularity and reusability.
 * Uses sub-components to handle different parts of the card.
 */
function ProductCard({
  item,
  image,
  priority = false,
  actions,
}: ProductCardProps) {
  const { isInCart, quantity, isFavorite } = useProductState(item);

  // Fallback handlers if not provided by parent
  const onToggleFavorite = actions?.toggleFavorite ?? (() => {});
  const onShare = actions?.share ?? (() => {});
  const onAddToCart = actions?.addToCart ?? (() => {});

  return (
    <Interactive
      variant="scale"
      className="product-card group relative flex h-full flex-col rounded-lg border border-border bg-surface-primary p-3 sm:p-4 transition-all duration-500 hover:border-brand-500/30 hover:shadow-xl dark:hover:shadow-brand-500/10 hover:-translate-y-1.5"
    >
      {/* Top Header Section (Badge & Quick Actions) */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <ProductCardBadge 
            item={item} 
            quantity={quantity} 
            isInCart={isInCart} 
          />
        </div>

        {/* Favorite & Share Buttons (Moved logic to Actions if needed, but keeping layout consistent) */}
        <div className="flex gap-1.5 opacity-100 lg:opacity-0 transition-all duration-300 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 translate-x-1 lg:translate-x-4">
           {/* These are part of Actions but placed here for layout. 
               We could also keep them as separate sub-components for even more flexibility. */}
           <ProductCardActionsLayout 
             type="top-actions"
             isFavorite={isFavorite}
             onToggleFavorite={onToggleFavorite}
             onShare={onShare}
           />
        </div>
      </div>

      {/* Product Image Section */}
      <ProductCardImage 
        item={item} 
        image={image} 
        priority={priority} 
      />

      {/* Product Information Section */}
      <div className="mt-3 flex-1 flex flex-col justify-between">
        <ProductCardInfo item={item} />
        
        {/* Main Action (Add to Cart) */}
        <ProductCardActionsLayout 
          type="bottom-actions"
          isInCart={isInCart}
          onAddToCart={onAddToCart}
        />
      </div>
    </Interactive>
  );
}

// Internal helper for layout positioning of actions
const ProductCardActionsLayout = ({ 
  type, 
  isFavorite, 
  isInCart, 
  onToggleFavorite, 
  onShare, 
  onAddToCart 
}: any) => {
  if (type === "top-actions") {
    return (
       <ProductCardActions 
         variant="minimal" 
         isFavorite={isFavorite} 
         onToggleFavorite={onToggleFavorite} 
         onShare={onShare} 
       />
    );
  }
  
  return (
    <div className="mt-4">
      <ProductCardActions 
        variant="full" 
        isInCart={isInCart} 
        onAddToCart={onAddToCart} 
      />
    </div>
  );
};

export default memo(ProductCard);