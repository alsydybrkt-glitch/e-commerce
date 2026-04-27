import { memo } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { getSafeProductQuantity } from "@/shared/utils/product-helpers";
import { Button } from "@/shared/ui/Button";

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
  buttonClassName = "h-8 w-8 p-0 text-text-secondary",
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
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className={buttonClassName}
        aria-label="Decrease quantity"
      >
        <FaMinus aria-hidden="true" />
      </Button>

      <output
        aria-live="polite"
        aria-atomic="true"
        className="min-w-8 text-center text-sm font-semibold text-text-primary"
      >
        {quantity}
      </output>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleIncrement}
        className={buttonClassName}
        aria-label="Increase quantity"
      >
        <FaPlus aria-hidden="true" />
      </Button>
    </div>
  );
}

export const QuantitySelector = memo(QuantitySelectorComponent);
