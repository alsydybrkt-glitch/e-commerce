import { memo } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { getSafeProductQuantity } from "@/shared/utils/product-helpers";

type QuantitySelectorProps = {
  quantity: number;
  stock?: number;
  onChange?: (q: number) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  className?: string;
  buttonClassName?: string;
  ariaLabel?: string;
};

function QuantitySelectorComponent({
  quantity,
  stock,
  onChange,
  onIncrement,
  onDecrement,
  className = "flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-600 dark:bg-slate-800/80",
  buttonClassName = "text-sm text-slate-500 transition hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:text-slate-200",
  ariaLabel = "Quantity selector",
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (onDecrement) onDecrement();
    else if (onChange) onChange(getSafeProductQuantity(quantity - 1, stock));
  };
  const handleIncrement = () => {
    if (onIncrement) onIncrement();
    else if (onChange) onChange(getSafeProductQuantity(quantity + 1, stock));
  };

  return (
    <div className={className} role="group" aria-label={ariaLabel}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className={buttonClassName}
        aria-label="Decrease quantity"
      >
        <FaMinus aria-hidden="true" />
      </button>

      <output
        aria-live="polite"
        aria-atomic="true"
        className="min-w-8 text-center text-sm font-semibold text-slate-900 dark:text-slate-100"
      >
        {quantity}
      </output>

      <button
        type="button"
        onClick={handleIncrement}
        className={buttonClassName}
        aria-label="Increase quantity"
      >
        <FaPlus aria-hidden="true" />
      </button>
    </div>
  );
}

export const QuantitySelector = memo(QuantitySelectorComponent);
