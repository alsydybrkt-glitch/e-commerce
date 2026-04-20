// features/search/ui/SearchSuggestionItem.tsx
import Image from "next/image";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { Product } from "@/services/api/productsApi";
import { highlight } from "@/shared/utils/highlight";
import { getProductImage } from "@/shared/utils/product-helpers";
import { useTranslation } from "@/shared/hooks/useTranslation";

interface Props {
  product: Product;
  index: number;
  activeIndex: number;
  query: string;
  onSelect: () => void;
}

export function SearchSuggestionItem({
  product,
  index,
  activeIndex,
  query,
  onSelect,
}: Props) {
  const { tCategoryName } = useTranslation();
  const selected = activeIndex === index;

  return (
    <li
      id={`search-option-${index}`}
      role="option"
      aria-selected={selected}
      className={`rounded-2xl transition ${
        selected
          ? "bg-slate-100 dark:bg-slate-800 ring-1 ring-brand-500/20"
          : "hover:bg-slate-50 dark:hover:bg-slate-800/80"
      }`}
    >
      <Link
        href={`/product/${product.id}`}
        className="flex items-center gap-3 px-3 py-3"
        onClick={onSelect}
      >
        <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-700">
          <Image
            src={getProductImage(product)}
            alt={product.title}
            width={56}
            height={56}
            sizes="56px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
            {highlight(product.title, query)}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ${product.price} — {tCategoryName(product.category)}
          </p>
        </div>
      </Link>
    </li>
  );
}