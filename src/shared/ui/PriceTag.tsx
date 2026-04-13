import { useTranslation } from "@/shared/i18n/useTranslation";

interface PriceTagProps {
  price: number;
  discountPercentage?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PriceTag({ price, discountPercentage, className = "", size = "md" }: PriceTagProps) {
  const { t } = useTranslation();
  
  const originalPrice = discountPercentage 
    ? (price / (1 - discountPercentage / 100)).toFixed(2) 
    : null;

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl sm:text-3xl",
    lg: "text-3xl sm:text-4xl",
  };

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <span className={`font-bold text-slate-900 dark:text-slate-50 ${sizeClasses[size]}`}>
        ${price.toFixed(2)}
      </span>
      
      {originalPrice && (
        <>
          <span className="text-slate-400 line-through decoration-slate-300 dark:text-slate-500 dark:decoration-slate-600">
            ${originalPrice}
          </span>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
            {t("product.details.save", { percent: Math.round(discountPercentage ?? 0) })}
          </span>
        </>
      )}
    </div>
  );
}
