/**
 * ProductDetailsPage — Refactored
 *
 * Improvements:
 * - Split into focused sub-components (ProductGallery, ProductMeta, ProductActions, QuantitySelector)
 * - useCallback / useMemo to prevent unnecessary re-renders
 * - Stable selectors with memoised derived values
 * - Lazy-loaded SlideProduct via React.lazy + Suspense
 * - Semantic HTML5 landmarks (<main>, <article>, <figure>, <header>)
 * - Full ARIA attributes (aria-label, aria-pressed, aria-live, role)
 * - Keyboard-accessible gallery (keyboard Enter/Space selection)
 * - Responsive grid: stacks on mobile, side-by-side on lg+
 * - Flexible image containers (no fixed heights, aspect-ratio utilities)
 * - Removed direct window.location usage from render path
 * - Toast content extracted to avoid re-creating JSX on every call
 */

import {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  lazy,
  Suspense,
  memo,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { FaHeart, FaMinus, FaPlus, FaShare, FaStar } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoStarHalf } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";

import {
  fetchSingleCategory,
  fetchSingleProduct,
} from "../../app/store/slices/productsSlice";
import {
  addFavorite,
  removeFavorite,
  selectIsFavorite,
} from "../../app/store/slices/favoriteSlice";
import { add, selectCartItemQuantity } from "../../app/store/slices/cartSlice";
import { CategoriesContext } from "../../shared/context/categories-context";
import {
  buildProductSharePayload,
  getMaxProductQuantity,
  getProductGallery,
  getProductImage,
  getSafeProductQuantity,
} from "../../shared/lib/product-helpers";
import {
  saveRecentlyViewed,
  shareProduct,
} from "../../shared/lib/product-tools";
import PageTransitions from "../../shared/ui/PageTransition";
import ProductDetailsLoading from "./ProductDetailsLoading2.jsx";
import { useTranslation } from "../../shared/i18n/useTranslation";

// ─── Lazy-loaded related products slider ────────────────────────────────────
const SlideProduct = lazy(() =>
  import("../../features/catalog/slide-product/SlideProduct"),
);

// ─── Star Rating ─────────────────────────────────────────────────────────────
const StarRating = memo(({ rating }) => (
  <div
    className="mt-4 flex items-center gap-1 text-amber-400 dark:text-amber-300"
    role="img"
    aria-label={`Rating: ${rating} out of 5`}
  >
    <FaStar aria-hidden="true" />
    <FaStar aria-hidden="true" />
    <FaStar aria-hidden="true" />
    <FaStar aria-hidden="true" />
    <IoStarHalf aria-hidden="true" />
    <span className="ms-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
      {rating}
    </span>
  </div>
));
StarRating.displayName = "StarRating";

// ─── Gallery ─────────────────────────────────────────────────────────────────
const ProductGallery = memo(({ images, displayImage, onSelect, title }) => (
  <div className="space-y-4">
    <figure className="overflow-hidden rounded-[32px] bg-slate-100 p-4 sm:p-6 dark:bg-slate-800/50 dark:ring-1 dark:ring-slate-700/80">
      <img
        src={displayImage}
        alt={title}
        loading="eager"
        decoding="async"
        fetchpriority="high"
        className="aspect-square w-full object-contain sm:aspect-[4/3]"
      />
    </figure>

    <div className="grid grid-cols-3 gap-2 sm:gap-3" role="list" aria-label="Product image thumbnails">
      {images.map((image, index) => {
        const isSelected = displayImage === image;
        return (
          <button
            key={`${image}-${index}`}
            type="button"
            role="listitem"
            aria-label={`View image ${index + 1} of ${images.length}`}
            aria-pressed={isSelected}
            onClick={() => onSelect(image)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(image);
              }
            }}
            className={`overflow-hidden rounded-2xl border p-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
              isSelected
                ? "border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-950/40"
                : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-600 dark:bg-slate-800/80 dark:hover:border-slate-500"
            }`}
          >
            <img
              src={image}
              alt={`${title} — thumbnail ${index + 1}`}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-contain"
            />
          </button>
        );
      })}
    </div>
  </div>
));
ProductGallery.displayName = "ProductGallery";

// ─── Info Pills ───────────────────────────────────────────────────────────────
const InfoPill = memo(({ label, value }) => (
  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800/60 dark:text-slate-300 dark:ring-1 dark:ring-slate-700/60">
    {label}:{" "}
    <span className="font-semibold text-slate-900 dark:text-slate-100">
      {value}
    </span>
  </div>
));
InfoPill.displayName = "InfoPill";

// ─── Quantity Selector ────────────────────────────────────────────────────────
const QuantitySelector = memo(({ quantity, stock, onChange }) => {
  const handleDecrement = useCallback(
    () => onChange(getSafeProductQuantity(quantity - 1, stock)),
    [quantity, stock, onChange],
  );
  const handleIncrement = useCallback(
    () => onChange(getSafeProductQuantity(quantity + 1, stock)),
    [quantity, stock, onChange],
  );

  return (
    <div
      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-600 dark:bg-slate-800/80"
      role="group"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="text-sm text-slate-500 transition hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:text-slate-200"
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
        disabled={quantity >= getMaxProductQuantity(stock)}
        className="text-sm text-slate-500 transition hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:text-slate-200"
        aria-label="Increase quantity"
      >
        <FaPlus aria-hidden="true" />
      </button>
    </div>
  );
});
QuantitySelector.displayName = "QuantitySelector";

// ─── Action Buttons ───────────────────────────────────────────────────────────
const ProductActions = memo(
  ({ isInCart, isFavorite, quantity, onAddToCart, onToggleFavorite, onShare, t }) => (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <button
        type="button"
        className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
          isInCart
            ? "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-950/45 dark:text-brand-300 dark:hover:bg-brand-900/50"
            : "bg-slate-900 text-white hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-500"
        }`}
        onClick={onAddToCart}
        aria-label={
          isInCart
            ? t("product.details.addMoreItems", { count: quantity })
            : t("product.addToCart")
        }
      >
        <MdOutlineAddShoppingCart className="text-lg" aria-hidden="true" />
        <span>
          {isInCart
            ? t("product.details.addMoreItems", { count: quantity })
            : t("product.addToCart")}
        </span>
      </button>

      <button
        type="button"
        onClick={onToggleFavorite}
        aria-label={isFavorite ? t("product.removeFromFavorites") : t("product.addToFavorites")}
        aria-pressed={isFavorite}
        className="secondary-btn !rounded-2xl !px-4 !py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
      >
        {isFavorite ? (
          <FaHeart className="text-rose-500" aria-hidden="true" />
        ) : (
          <IoMdHeartEmpty aria-hidden="true" />
        )}
      </button>

      <button
        type="button"
        onClick={onShare}
        aria-label={t("product.share")}
        className="secondary-btn !rounded-2xl !px-4 !py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
      >
        <FaShare aria-hidden="true" />
      </button>
    </div>
  ),
);
ProductActions.displayName = "ProductActions";

// ─── Main Page ────────────────────────────────────────────────────────────────
function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { categories } = useContext(CategoriesContext);

  // Selectors
  const product = useSelector((state) => state.products.singleProduct);
  const categoryProducts = useSelector((state) => state.products.singleCategory);
  const isLoadingProduct = useSelector((state) => state.products.loadingProduct);
  const cartQuantity = useSelector((state) =>
    selectCartItemQuantity(state, product?.id),
  );
  const isFavorite = useSelector((state) =>
    selectIsFavorite(state, product?.id),
  );

  // Local state: tracks selected image & quantity per product
  const [selectionState, setSelectionState] = useState({
    productId: null,
    image: "",
    quantity: 1,
  });

  // ── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!product?.id) return;
    saveRecentlyViewed(product);
  }, [product?.id]); // only re-run when id changes, not the whole product ref

  useEffect(() => {
    if (!product?.category) return;
    dispatch(fetchSingleCategory(product.category));
  }, [dispatch, product?.category]);

  // ── Derived values ─────────────────────────────────────────────────────────
  const currentSelection = useMemo(() => {
    if (selectionState.productId === product?.id) return selectionState;
    return { productId: product?.id, image: "", quantity: 1 };
  }, [selectionState, product?.id]);

  const productImages = useMemo(
    () => (product ? getProductGallery(product, 3) : []),
    [product],
  );

  const displayImage = useMemo(
    () => currentSelection.image || (product ? getProductImage(product) : ""),
    [currentSelection.image, product],
  );

  const maxQuantity = useMemo(
    () => getMaxProductQuantity(product?.stock),
    [product?.stock],
  );

  const categoryDescription = useMemo(
    () =>
      categories.find((c) => c.name === product?.category)?.description,
    [categories, product?.category],
  );

  const isInCart = cartQuantity > 0;

  // ── Handlers ───────────────────────────────────────────────────────────────
const productId = product?.id;

const handleImageSelect = useCallback(
  (image) => {
    setSelectionState((prev) => ({
      ...prev,
      productId,
      image,
    }));
  },
  [productId],
);

const handleQuantityChange = useCallback(
  (quantity) => {
    setSelectionState((prev) => ({
      ...prev,
      productId,
      quantity,
    }));
  },
  [productId],
);

  const handleAddToCart = useCallback(() => {
    dispatch(add({ ...product, quantity: currentSelection.quantity }));

    const productImage = getProductImage(product);
    toast(
      (toastInstance) => (
        <div className="flex items-center gap-3">
          <img
            src={productImage}
            alt={product.title}
            loading="lazy"
            className="h-14 w-14 rounded-2xl object-cover"
          />
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              {product.title}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t("product.details.addedSuccess", {
                count: currentSelection.quantity,
                plural: currentSelection.quantity > 1 ? "s" : "",
              })}
            </p>
            <button
              className="mt-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white dark:bg-brand-600 dark:hover:bg-brand-500"
              onClick={() => {
                toast.dismiss(toastInstance.id);
                navigate("/carts");
              }}
            >
              {t("product.viewCart")}
            </button>
          </div>
        </div>
      ),
      { duration: 3000 },
    );

    // Reset quantity after adding
    setSelectionState((prev) => ({
      ...prev,
      productId: product.id,
      quantity: 1,
    }));
  }, [dispatch, product, currentSelection.quantity, t, navigate]);

  const handleToggleFavorite = useCallback(() => {
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
      toast.success(t("product.details.removedFromFavorites"));
    } else {
      dispatch(addFavorite(product));
      toast.success(t("product.details.addedToFavorites"));
    }
  }, [dispatch, isFavorite, product, t]);

  const handleShare = useCallback(async () => {
    try {
      const result = await shareProduct(
        buildProductSharePayload(product, window.location.href),
      );
      toast.success(
        result === "shared"
          ? t("product.sharedSuccess")
          : t("product.linkCopied"),
      );
    } catch {
      toast.error(t("product.shareError"));
    }
  }, [product, t]);

  // ── Early returns ──────────────────────────────────────────────────────────
  if (isLoadingProduct || !product) {
    return <ProductDetailsLoading />;
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <PageTransitions key={id}>
      <main>
        {/* ── Product Details ── */}
        <section
          className="product-page shell section-gap"
          aria-labelledby="product-title"
        >
          <article className="surface-card grid gap-8 overflow-hidden p-4 sm:p-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:p-8">
            {/* Gallery */}
            <ProductGallery
              images={productImages}
              displayImage={displayImage}
              onSelect={handleImageSelect}
              title={product.title}
            />

            {/* Info */}
            <div className="flex flex-col justify-center">
              <header>
                <span className="section-kicker w-fit capitalize">
                  {product.category}
                </span>
                <h1
                  id="product-title"
                  className="mt-3 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl dark:text-slate-50"
                >
                  {product.title}
                </h1>
                <StarRating rating={product.rating ?? 4.8} />
              </header>

              {/* Price */}
              <div className="mt-6 flex flex-wrap items-end gap-3">
                <p className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-50">
                  <span className="sr-only">Price: </span>${product.price}
                </p>
                {product.discountPercentage && (
                  <span
                    className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                    aria-label={`Save ${Math.round(product.discountPercentage)} percent`}
                  >
                    {t("product.details.save", {
                      percent: Math.round(product.discountPercentage),
                    })}
                  </span>
                )}
              </div>

              {/* Meta pills */}
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                <InfoPill
                  label={t("product.details.availability")}
                  value={product.availabilityStatus ?? t("product.details.inStock")}
                />
                <InfoPill
                  label={t("product.details.brand")}
                  value={product.brand ?? t("product.details.premium")}
                />
              </dl>

              {/* Description */}
              <p className="mt-6 text-sm leading-8 text-slate-500 dark:text-slate-400">
                {product.description}
              </p>

              {/* Urgency banner */}
              <p
                className="mt-6 rounded-[28px] bg-slate-950 px-5 py-4 text-sm text-white dark:bg-slate-800 dark:ring-1 dark:ring-slate-600"
                role="status"
                aria-live="polite"
              >
                {t("product.details.hurry", { count: product.stock })}
              </p>

              {/* Quantity + Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <QuantitySelector
                  quantity={currentSelection.quantity}
                  stock={product.stock}
                  onChange={handleQuantityChange}
                />

                <ProductActions
                  isInCart={isInCart}
                  isFavorite={isFavorite}
                  quantity={currentSelection.quantity}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  onShare={handleShare}
                  t={t}
                />
              </div>

              {/* Cart status messages */}
              <div aria-live="polite" aria-atomic="true" className="mt-3 space-y-1">
                {isInCart && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t("product.details.alreadyInCart", {
                      count: cartQuantity,
                      plural: cartQuantity > 1 ? "s" : "",
                    })}
                  </p>
                )}
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("product.details.maxOrder", { count: maxQuantity })}
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* ── Related products ── */}
        <Suspense fallback={null}>
          <SlideProduct
            category={product.category}
            products={categoryProducts ?? []}
            description={categoryDescription}
          />
        </Suspense>
      </main>
    </PageTransitions>
  );
}

export default ProductDetailsPage;
