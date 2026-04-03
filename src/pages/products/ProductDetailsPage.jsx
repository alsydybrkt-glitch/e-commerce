import { useContext, useEffect, useState } from "react";
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
import SlideProduct from "../../features/catalog/slide-product/SlideProduct";
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

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { categories } = useContext(CategoriesContext);
  const product = useSelector((state) => state.products.singleProduct);
  const categoryProducts = useSelector(
    (state) => state.products.singleCategory,
  );
  const isLoadingProduct = useSelector(
    (state) => state.products.loadingProduct,
  );
  const cartQuantity = useSelector((state) =>
    selectCartItemQuantity(state, product?.id),
  );
  const isFavorite = useSelector((state) =>
    selectIsFavorite(state, product?.id),
  );
  const [selectionState, setSelectionState] = useState({
    productId: null,
    image: "",
    quantity: 1,
  });

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!product?.id) return;
    saveRecentlyViewed(product);
  }, [product]);

  useEffect(() => {
    if (!product?.category) return;
    dispatch(fetchSingleCategory(product.category));
  }, [dispatch, product?.category]);

  if (isLoadingProduct || !product) {
    return <ProductDetailsLoading />;
  }

  const currentSelection =
    selectionState.productId === product.id
      ? selectionState
      : { productId: product.id, image: "", quantity: 1 };
  const productImages = getProductGallery(product, 3);
  const displayImage = currentSelection.image || getProductImage(product);
  const maxQuantity = getMaxProductQuantity(product.stock);
  const isInCart = cartQuantity > 0;
  const categoryDescription = categories.find(
    (category) => category.name === product.category,
  )?.description;

  const handleAddToCart = () => {
    dispatch(add({ ...product, quantity: currentSelection.quantity }));

    toast.success(
      <div className="flex items-center gap-3">
        <img
          src={getProductImage(product)}
          alt={product.title}
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
            onClick={() => navigate("/carts")}
          >
            {t("product.viewCart")}
          </button>
        </div>
      </div>,
      { duration: 3000 },
    );

    setSelectionState({
      productId: product.id,
      image: currentSelection.image,
      quantity: 1,
    });
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
      toast.success(t("product.details.removedFromFavorites"));
      return;
    }

    dispatch(addFavorite(product));
    toast.success(t("product.details.addedToFavorites"));
  };

  const handleShare = async () => {
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
  };

  return (
    <PageTransitions key={id}>
      <>
        <section className="product-page shell section-gap">
          <div className="surface-card grid gap-10 overflow-hidden p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-[32px] bg-slate-100 p-6 dark:bg-slate-800/50 dark:ring-1 dark:ring-slate-700/80">
                <img
                  src={displayImage}
                  alt={product.title}
                  loading="eager"
                  decoding="async"
                  className="h-[320px] w-full object-contain sm:h-[420px]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() =>
                      setSelectionState({
                        productId: product.id,
                        image,
                        quantity: currentSelection.quantity,
                      })
                    }
                    className={`overflow-hidden rounded-2xl border p-2 transition ${
                      displayImage === image
                        ? "border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-950/40"
                        : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800/80"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} preview ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="h-20 w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <span className="section-kicker w-fit capitalize">
                {product.category}
              </span>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-slate-900 dark:text-slate-50">
                {product.title}
              </h1>

              <div className="mt-4 flex items-center gap-2 text-amber-400 dark:text-amber-300">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <IoStarHalf />
                <span className="ms-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {product.rating || 4.8} {t("product.details.rating")}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-end gap-4">
                <h3 className="text-4xl font-bold text-slate-900 dark:text-slate-50">
                  ${product.price}
                </h3>
                {product.discountPercentage && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                    {t("product.details.save", {
                      percent: Math.round(product.discountPercentage),
                    })}
                  </span>
                )}
              </div>

              <div className="mt-6 grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-700/60">
                  {t("product.details.availability")}:{" "}
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {product.availabilityStatus || t("product.details.inStock")}
                  </span>
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-700/60">
                  {t("product.details.brand")}:{" "}
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {product.brand || t("product.details.premium")}
                  </span>
                </div>
              </div>

              <p className="mt-6 text-sm leading-8 text-slate-500 dark:text-slate-400">
                {product.description}
              </p>

              <div className="mt-6 rounded-[28px] bg-slate-950 px-5 py-4 text-white dark:bg-slate-800 dark:ring-1 dark:ring-slate-600">
                {t("product.details.hurry", { count: product.stock })}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-600 dark:bg-slate-800/80">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectionState({
                        productId: product.id,
                        image: currentSelection.image,
                        quantity: getSafeProductQuantity(
                          currentSelection.quantity - 1,
                          product.stock,
                        ),
                      })
                    }
                    className="text-sm text-slate-500 dark:text-slate-400"
                    aria-label={t("product.details.decreaseQuantity")}
                  >
                    <FaMinus />
                  </button>

                  <span className="min-w-8 text-center text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {currentSelection.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectionState({
                        productId: product.id,
                        image: currentSelection.image,
                        quantity: getSafeProductQuantity(
                          currentSelection.quantity + 1,
                          product.stock,
                        ),
                      })
                    }
                    className="text-sm text-slate-500 dark:text-slate-400"
                    aria-label={t("product.details.increaseQuantity")}
                  >
                    <FaPlus />
                  </button>
                </div>

                <button
                  type="button"
                  className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                    isInCart
                      ? "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-950/45 dark:text-brand-300 dark:hover:bg-brand-900/50"
                      : "bg-slate-900 text-white hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-500"
                  }`}
                  onClick={handleAddToCart}
                >
                  <MdOutlineAddShoppingCart className="text-lg" />
                  {isInCart
                    ? t("product.details.addMoreItems", {
                        count: currentSelection.quantity,
                      })
                    : t("product.addToCart")}
                </button>

                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  className="secondary-btn !rounded-2xl !px-4 !py-3"
                >
                  {isFavorite ? (
                    <FaHeart className="text-rose-500" />
                  ) : (
                    <IoMdHeartEmpty />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="secondary-btn !rounded-2xl !px-4 !py-3"
                >
                  <FaShare />
                </button>
              </div>

              {isInCart && (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  {t("product.details.alreadyInCart", {
                    count: cartQuantity,
                    plural: cartQuantity > 1 ? "s" : "",
                  })}
                </p>
              )}

              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {t("product.details.maxOrder", { count: maxQuantity })}
              </p>
            </div>
          </div>
        </section>

        <SlideProduct
          category={product.category}
          products={categoryProducts || []}
          description={categoryDescription}
        />
      </>
    </PageTransitions>
  );
}

export default ProductDetailsPage;
