import { CartItem } from "@/types";
import CartItemCard from "./CartItemCard";

interface CartItemsListProps {
  items: CartItem[];
  onDecreaseQuantity: (id: number, currentQty: number) => void;
  onIncreaseQuantity: (id: number) => void;
  onRemove: (id: number) => void;
}

function CartItemsList({
  items,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onRemove,
}: CartItemsListProps) {
  return (
    <div className="space-y-4" aria-label="Cart items">
      {items.map((item) => (
        <CartItemCard
          key={item.id}
          item={item}
          onDecreaseQuantity={onDecreaseQuantity}
          onIncreaseQuantity={onIncreaseQuantity}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default CartItemsList;
