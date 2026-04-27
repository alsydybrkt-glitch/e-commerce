import React, { memo } from "react";
import { FaHeart, FaShare } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import clsx from "clsx";
import { useTranslation } from "@/shared/hooks/useTranslation";

interface ProductCardActionsProps {
  isFavorite?: boolean;
  isInCart?: boolean;
  onToggleFavorite?: (isFav: boolean) => void;
  onShare?: (e: React.MouseEvent) => void;
  onAddToCart?: (e: React.MouseEvent) => void;
  variant: "minimal" | "full";
}

const ProductCardActions = ({
  isFavorite = false,
  isInCart = false,
  onToggleFavorite = () => {},
  onShare = () => {},
  onAddToCart = () => {},
  variant,
}: ProductCardActionsProps) => {
  const { t } = useTranslation();

  if (variant === "minimal") {
    return (
      <>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(isFavorite);
          }}
          aria-label={
            isFavorite
              ? t("product.removeFromFavorites")
              : t("product.addToFavorites")
          }
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-primary text-text-secondary shadow-sm transition-all duration-300 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 dark:hover:bg-rose-950/20 active:scale-90"
        >
          {isFavorite ? (
            <FaHeart className="text-rose-500" />
          ) : (
            <IoHeartOutline className="text-lg" />
          )}
        </button>

        <button
          type="button"
          onClick={onShare}
          aria-label={t("product.share")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-primary text-text-secondary shadow-sm transition-all duration-300 hover:bg-bg-secondary hover:text-text-primary active:scale-90"
        >
          <FaShare aria-hidden="true" className="text-[10px]" />
        </button>
      </>
    );
  }

  return (
    <button
      type="button"
      onClick={onAddToCart}
      className={clsx(
        "btn w-full h-11 rounded-lg transition-all active:scale-[0.96] flex items-center justify-center gap-2",
        isInCart ? "btn-secondary" : "btn-primary shadow-sm"
      )}
    >
      <MdOutlineAddShoppingCart className="text-lg" />
      {isInCart ? t("product.addOneMore") : t("product.addToCart")}
    </button>
  );
};

export default memo(ProductCardActions);
