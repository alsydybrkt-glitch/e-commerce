import React, { memo } from "react";
import { MdOutlineDone } from "react-icons/md";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Product as ProductType } from "@/services/api/productsApi";

interface ProductCardBadgeProps {
  item: ProductType;
  quantity: number;
  isInCart: boolean;
}

const ProductCardBadge = ({
  item,
  quantity,
  isInCart,
}: ProductCardBadgeProps) => {
  const { t, tCategoryName } = useTranslation();

  if (isInCart) {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-brand-50 px-2 py-1 text-[10px] font-bold text-brand-700 dark:bg-brand-900/20 dark:text-brand-400">
        <MdOutlineDone className="text-xs" />
        {t("product.inCart", { count: quantity })}
      </span>
    );
  }

  return (
    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
      {tCategoryName(item.category)}
    </span>
  );
};

export default memo(ProductCardBadge);
