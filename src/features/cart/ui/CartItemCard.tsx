import { memo } from "react";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import { formatCurrency } from "../lib/formatCurrency";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { QuantitySelector } from "@/shared/ui/QuantitySelector";


interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartItemCardProps {
  item: CartItem;
  onDecreaseQuantity: (id: number, currentQty: number) => void;
  onIncreaseQuantity: (id: number) => void;
  onRemove: (id: number) => void;
}

function CartItemCardComponent({
  item,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onRemove,
}: CartItemCardProps) {
  const { t } = useTranslation();
  const itemTotal = item.price * item.quantity;

  return (
    <article className="surface-card flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <div className="relative h-32 w-32 shrink-0 rounded-[24px] bg-slate-100 overflow-hidden dark:bg-slate-800/70">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes="128px"
            className="object-contain p-4"
          />
        </div>

        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {item.title}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t("cart.unitPrice")}: {formatCurrency(item.price)}
          </p>

          <QuantitySelector
            quantity={item.quantity}
            onDecrement={() => onDecreaseQuantity(item.id, item.quantity)}
            onIncrement={() => onIncreaseQuantity(item.id)}
            className="mt-3 flex w-fit items-center gap-3 rounded-full bg-slate-100 px-4 py-2 dark:bg-slate-800/80"
            buttonClassName="rounded-full p-1 text-xs text-slate-500 transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:ring-slate-600"
            ariaLabel={t("cart.quantitySelector", { title: item.title })}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
          {formatCurrency(itemTotal)}
        </p>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-500 transition hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-950/60 dark:focus-visible:ring-rose-800"
          onClick={() => onRemove(item.id)}
          aria-label={t("cart.removeItem", { title: item.title })}
        >
          <FaTrashAlt aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

const CartItemCard = memo(CartItemCardComponent);

export default CartItemCard;
