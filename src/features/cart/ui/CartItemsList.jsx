import CartItemCard from "./CartItemCard";

function CartItemsList({
  items,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onRemove,
}) {
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
