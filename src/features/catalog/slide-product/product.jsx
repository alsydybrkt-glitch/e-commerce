import { memo } from "react";
import { FaHeart, FaShare, FaStar } from "react-icons/fa";
import { IoHeartOutline, IoStarHalf } from "react-icons/io5";
import { MdOutlineAddShoppingCart, MdOutlineDone } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  add,
  selectCartItemQuantity,
} from "../../../app/store/slices/cartSlice";
import {
  addFavorite,
  removeFavorite,
  selectIsFavorite,
} from "../../../app/store/slices/favoriteSlice";
import { shareProduct } from "../../../shared/lib/product-tools";
import {
  buildProductSharePayload,
  getProductImage,
} from "../../../shared/lib/product-helpers";
import { useTranslation } from "../../../shared/i18n/useTranslation";

function Product({ item, hideImage = false }) {
  const { t, tCategoryName } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartQuantity = useSelector((state) =>
    selectCartItemQuantity(state, item.id),
  );
  const isFavorite = useSelector((state) => selectIsFavorite(state, item.id));
  const isInCart = cartQuantity > 0;
  const image = getProductImage(item);

  const handleAddToCart = () => {
    dispatch(add({ ...item, quantity: 1 }));
    toast.success(
      <div className="flex items-center gap-3">
        {!hideImage && (
          <img
            src={image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-14 w-14 rounded-2xl object-cover"
          />
        )}
        <div>
          <p className="font-semibold text-slate-900">{item.title}</p>
          <p className="text-xs text-slate-500">
            {isInCart ? t("product.quantityUpdated") : t("product.addedToCart")}
          </p>
          <button
            className="mt-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white"
            onClick={() => navigate("/carts")}
          >
            {t("product.viewCart")}
          </button>
        </div>
      </div>,
      { duration: 3000 },
    );
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(item.id));
      return;
    }

    dispatch(addFavorite(item));
    toast.success(t("product.addedToFavorites"));
  };

  const handleShare = async () => {
    try {
      const result = await shareProduct(
        buildProductSharePayload(
          item,
          `${window.location.origin}/product/${item.id}`,
        ),
      );

      toast.success(
        result === "shared"
          ? t("product.sharedSuccess")
          : t("product.linkCopied"),
      );
    } catch {
      toast.error(t("product.shareError"));
    }
  };

  return (
    <div className="group surface-card h-full overflow-hidden p-4 transition duration-300 hover:-translate-y-1">
      <div className="mb-4 flex items-start justify-between gap-3">
        {isInCart ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <MdOutlineDone />
            {t("product.inCart", { count: cartQuantity })}
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:bg-slate-800/50 dark:text-slate-400">
            {tCategoryName(item.category)}
          </span>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleToggleFavorite}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:text-rose-500 dark:border-slate-700 dark:bg-slate-700/30 dark:text-slate-300 dark:hover:text-rose-400"
          >
            {isFavorite ? (
              <FaHeart className="text-rose-500" />
            ) : (
              <IoHeartOutline />
            )}
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:text-brand-600 dark:border-slate-700 dark:bg-slate-700/30 dark:text-slate-300 dark:hover:text-brand-400"
          >
            <FaShare />
          </button>
        </div>
      </div>

      <Link to={`/product/${item.id}`} className="block">
        <div className="mb-5 overflow-hidden rounded-[24px] bg-slate-100 p-6 dark:bg-slate-700/25">
          <img
            src={image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1280px) 18rem, (min-width: 768px) 24rem, 90vw"
            className="mx-auto h-52 w-full object-contain transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="space-y-3">
          <h3 className="line-clamp-2 min-h-[3.5rem] text-base font-semibold text-slate-900 dark:text-slate-100">
            {item.title}
          </h3>
          <div className="flex items-center gap-1 text-amber-400">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <IoStarHalf />
            <span className="ms-2 text-xs font-semibold text-slate-400 dark:text-slate-400">
              {item.rating || 4.8}
            </span>
          </div>
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                ${item.price}
              </p>
              {item.discountPercentage && (
                <p className="text-xs font-medium text-emerald-600">
                  {t("product.save", {
                    percent: Math.round(item.discountPercentage),
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={handleAddToCart}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
          isInCart
            ? "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-700/30 dark:text-brand-300 dark:hover:bg-brand-700/50"
            : "bg-slate-900 text-white hover:bg-brand-600 dark:bg-slate-700/50 dark:text-slate-100 dark:hover:bg-slate-700/70"
        }`}
      >
        <MdOutlineAddShoppingCart className="text-lg" />
        {isInCart ? t("product.addOneMore") : t("product.addToCart")}
      </button>
    </div>
  );
}

export default memo(Product);
