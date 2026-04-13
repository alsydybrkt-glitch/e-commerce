"use client";
import { StarRating } from "@/shared/ui/StarRating";
import { Product } from "@/features/products/services/productsApi";
import { useTranslation } from "@/shared/i18n/useTranslation";
import { PriceTag } from "@/shared/ui/PriceTag";
import { motion } from "framer-motion";

interface ProductInfoProps {
  product: Product;
}

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export function ProductInfo({ product }: ProductInfoProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <motion.div 
        variants={fadeIn} 
        initial="initial" 
        animate="animate" 
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl dark:text-slate-50">
          {product.title}
        </h1>
        <div className="mt-4 flex items-center gap-4">
          <StarRating rating={product.rating} />
          <span className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {product.brand || t("product.details.premium")}
          </span>
        </div>
      </motion.div>

      <motion.div 
        variants={fadeIn} 
        initial="initial" 
        animate="animate" 
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <PriceTag 
          price={product.price} 
          discountPercentage={product.discountPercentage} 
          size="lg"
        />
      </motion.div>

      <motion.div 
        variants={fadeIn} 
        initial="initial" 
        animate="animate" 
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-2"
      >
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {t("product.details.description")}
        </h2>
        <p className="text-base leading-7 text-slate-600 dark:text-slate-400">
          {product.description}
        </p>
      </motion.div>

      {/* Stock Status */}
      <motion.div 
        variants={fadeIn} 
        initial="initial" 
        animate="animate" 
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold
          ${product.stock < 10 
            ? "bg-amber-50 text-amber-900 ring-1 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:ring-amber-800" 
            : "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:ring-emerald-800"
          }
        `}
      >
        <span className={`h-2 w-2 rounded-full ${product.stock < 10 ? "bg-amber-500" : "bg-emerald-500"}`} />
        {product.stock < 10 
          ? t("product.details.hurry", { count: product.stock }) 
          : t("product.details.inStock")}
      </motion.div>
    </div>
  );
}
