import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState, useContext } from "react";

import {
  fetchSingleProduct,
  fetchSingleCategory,
} from "../../Redux/ReduxSlices/productsReducer";
import {
  addFavorite,
  removeFavorite,
} from "../../Redux/ReduxSlices/favoriteReducer";
import { add, selectCartItems } from "../../Redux/ReduxSlices/cardReducer";

import { CategoriesContext } from "../../context/slideDetails";
export const useProductCard = (id) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories } = useContext(CategoriesContext);

  const product = useSelector((state) => state.products.singleProduct);
  const categoryProducts = useSelector(
    (state) => state.products.singleCategory
  );
  const loading = useSelector((state) => state.products.loadingSingleProduct);

  const cartItems = useSelector(selectCartItems);
  const favoriteItems = useSelector((state) => state.favorites.items);

  const isInCart = cartItems.some((item) => item.id === product?.id);
  const isFavorite = favoriteItems.some((item) => item.id === product?.id);

  const [mainImage, setMainImage] = useState("");

  /* ================= Fetch Product ================= */
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id, dispatch]);

  /* ================= Fetch Category ================= */
  useEffect(() => {
    if (product?.category) {
      dispatch(fetchSingleCategory(product.category));
    }
  }, [product?.category, dispatch]);

  /* ================= Set Main Image ================= */
  useEffect(() => {
    if (product?.images?.length) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  /* ================= Category Description ================= */
  const categoryDescription = categories.find(
    (cat) => cat.name === product?.category
  )?.description;

  /* ================= Handlers ================= */
  const handleAddToCart = () => {
    if (isInCart) return;

    dispatch(add(product));

    toast.success(
      <div className="toast-wrapper">
        <img src={product.images[0]} alt={product.title} />
        <div className="toast-content">
          <strong>{product.title}</strong>
          <span>added to cart</span>
          <button className="btn" onClick={() => navigate("/Cards")}>
            View Cart
          </button>
        </div>
      </div>,
      { duration: 3000 }
    );
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
      toast.success("Added to favorites");
    }
  };

  return {
    product,
    categoryProducts,
    loading,
    mainImage,
    categoryDescription,
    isInCart,
    isFavorite,
    setMainImage,
    handleAddToCart,
    handleToggleFavorite,
  };
};
