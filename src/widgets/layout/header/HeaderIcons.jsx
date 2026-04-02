import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../../app/store/slices/cartSlice";
import { count } from "../../../app/store/slices/favoriteSlice";
import { useTranslation } from "../../../shared/i18n/useTranslation";

const iconBase =
  "relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg text-slate-700 transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-600";

function HeaderIcons() {
  const { t } = useTranslation();
  const cartCount = useSelector(selectCartCount);
  const favorites = useSelector(count);

  return (
    <div className="flex items-center gap-2">
      <Link
        to="/favorites"
        className={iconBase}
        aria-label={t("header.favoritesAria")}
      >
        <FaRegHeart />
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
          {favorites}
        </span>
      </Link>

      <Link to="/carts" className={iconBase} aria-label={t("header.cartAria")}>
        <MdOutlineShoppingCart />
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-bold text-white">
          {cartCount}
        </span>
      </Link>
    </div>
  );
}

export default HeaderIcons;
