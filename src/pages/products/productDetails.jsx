import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";

import {
  fetchSingleProduct,
  fetchSingleCategory,
} from "../../Redux/ReduxSlices/productsReducer";
import {
  addFavorite,
  removeFavorite,
} from "../../Redux/ReduxSlices/favoriteReducer";
import {
  add,
  selectCartItems,
} from "../../Redux/ReduxSlices/cardReducer";

import PageTransitions from "../../component/pageTransition";
import SlideProduct from "../../component/slideProduct/slideProduct";
import ProductDetailsLoading from "./productDetailsLoading";

import { CategoriesContext } from "../../context/slideDetails";

import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaHeart, FaShare, FaStar } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoStarHalf } from "react-icons/io5";

import "./productDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories } = useContext(CategoriesContext);

  const product = useSelector((state) => state.products.singleProduct);
  const categoryProducts = useSelector(
    (state) => state.products.singleCategory
  );
  const loading = useSelector(
    (state) => state.products.loadingSingleProduct
  );

  const cartItems = useSelector(selectCartItems);
  const favoriteItems = useSelector((state) => state.favorites.items);

  const isInCart = cartItems.some((item) => item.id === product?.id);
  const isFavorite = favoriteItems.some(
    (item) => item.id === product?.id
  );

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
          <button className="btn" onClick={() => navigate("/carts")}>
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

  /* ================= Loading ================= */
  if (loading || !product) {
    return <ProductDetailsLoading />;
  }

  return (
    <PageTransitions key={id}>
      <>
        <div className="items-details">
          <div className="container">
            {/* LEFT */}
            <div className="images">
              <div className="big-images">
                <img src={mainImage} alt={product.title} />
              </div>

              <div className="small-images">
                {product.images?.slice(0, 3).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`thumb-${index}`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="details">
              <h1>{product.title}</h1>

              <div className="rating-product">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <IoStarHalf />
              </div>

              <h3>${product.price}</h3>

              <h5>
                Availability: <span>{product.availabilityStatus}</span>
              </h5>

              <h5>
                Brand: <span>{product.brand}</span>
              </h5>

              <p>{product.description}</p>

              <h4>
                Hurry Up! Only {product.stock} product left in stock
              </h4>

              <button
                className={`btn ${isInCart ? "in_Cart" : ""}`}
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                {isInCart ? "Item in Cart" : "Add to Cart"}
                <MdOutlineAddShoppingCart />
              </button>

              <div className="product-icon">
                <span onClick={handleToggleFavorite}>
                  {isFavorite ? (
                    <FaHeart className="favorite-icon" />
                  ) : (
                    <IoMdHeartEmpty />
                  )}
                </span>

                <span>
                  <FaShare />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <SlideProduct
          category={product.category}
          products={categoryProducts || []}
          description={categoryDescription}
        />
      </>
    </PageTransitions>
  );
}

export default ProductDetails;
