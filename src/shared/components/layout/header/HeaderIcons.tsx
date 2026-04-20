import { useState, useEffect, memo } from "react";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useAppSelector } from "@/store";
import { selectCartCount } from "@/features/cart/store/cartSlice";
import { count as selectFavoritesCount } from "@/features/favorites/store/favoriteSlice";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Interactive } from "@/shared/ui/Interactive";

const iconBase =
  "relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-base sm:text-lg text-slate-700 transition hover:border-brand-200 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300";

function HeaderIcons() {
  return (
    <div className="flex items-center gap-2">
      <FavoriteBadge />
      <CartBadge />
    </div>
  );
}

const FavoriteBadge = memo(() => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const favoritesCount = useAppSelector(selectFavoritesCount);

  return (
    <Interactive variant="scale">
      <Link
        href="/favorites"
        className={iconBase}
        aria-label={t("header.favoritesAria")}
      >
        <FaRegHeart />
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
          {mounted ? favoritesCount : 0}
        </span>
      </Link>
    </Interactive>
  );
});
FavoriteBadge.displayName = "FavoriteBadge";

const CartBadge = memo(() => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const cartCount = useAppSelector(selectCartCount);

  return (
    <Interactive variant="scale">
      <Link href="/carts" className={iconBase} aria-label={t("header.cartAria")}>
        <MdOutlineShoppingCart />
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-bold text-white dark:bg-brand-500">
          {mounted ? cartCount : 0}
        </span>
      </Link>
    </Interactive>
  );
});
CartBadge.displayName = "CartBadge";

export default HeaderIcons;
