import React, { memo } from "react";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Product as ProductType } from "@/services/api/productsApi";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";

interface ProductCardInfoProps {
  item: ProductType;
}

const ProductCardInfo = ({ item }: ProductCardInfoProps) => {
  const { t } = useTranslation();

  return (
    <Link href={`/product/${item.id}`} className="space-y-2 block">
      <h3 className="line-clamp-2 text-sm font-semibold tracking-tight leading-snug text-text-primary min-h-[2.5rem]">
        {item.title}
      </h3>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 text-[10px] text-amber-500">
            <FaStar aria-hidden="true" />
            <span className="ms-1 font-bold text-text-primary">
              {item.rating || 4.8}
            </span>
          </div>

          <span className="h-1 w-1 rounded-full bg-border-medium" />

          <span className="text-[10px] font-medium text-text-muted">
            120 {t("product.details.rating")}
          </span>
        </div>

        <p className="text-lg font-bold text-text-primary">
          ${item.price}
        </p>
      </div>
    </Link>
  );
};

export default memo(ProductCardInfo);
