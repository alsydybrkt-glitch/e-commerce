import { useAppSelector } from "@/store";
import { Product as ProductType } from "@/services/api/productsApi";

/**
 * Hook to manage the state of a product (cart quantity, favorite status, etc.)
 */
export function useProductState(item: ProductType) {
  const quantity = useAppSelector(
    (state) => state.cart.quantityById?.[item.id] ?? 0
  );

  const isFavorite = useAppSelector((state) =>
    Boolean(state.favorites.ids?.[item.id])
  );

  return {
    quantity,
    isInCart: quantity > 0,
    isFavorite,
  };
}
