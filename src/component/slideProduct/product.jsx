import { FaStar, FaHeart } from "react-icons/fa";
import { IoStarHalf } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlineAddShoppingCart, MdOutlineDone } from "react-icons/md";
import { FaShare } from "react-icons/fa6";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { add, selectCartItems } from "../../Redux/ReduxSlices/cardReducer";
import {
  addFavorite,
  removeFavorite,
} from "../../Redux/ReduxSlices/favoriteReducer";

function Product({ item, hideImage = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const favorites = useSelector((state) => state.favorites.items);

  const isInCart = cartItems.some((p) => p.id === item.id);
  const isFavorite = favorites.some((p) => p.id === item.id);

  /* ================= Helpers ================= */
  const image = item.images?.length > 0 ? item.images[0] : item.thumbnail;

  /* ================= Handlers ================= */
  const handleAddToCart = () => {
    if (isInCart) return;

    dispatch(add(item));

    toast.success(
      <div className="toast-wrapper">
        {!hideImage && <img src={image} alt={item.title} />}
        <div className="toast-content">
          <strong>{item.title}</strong>
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
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(addFavorite(item));
      toast.success("Added to favorites");
    }
  };

  /* ================= Render ================= */
  return (
    <div className={`product ${isInCart ? "in-card" : ""}`}>
      {isInCart && (
        <span className="savedInCard">
          <MdOutlineDone /> in cart
        </span>
      )}

      <Link to={`/product/${item.id}`}>
        <div className="image-product">
          <img src={image} alt={item.title} />
        </div>

        <p className="product-name">{item.title}</p>

        <div className="rating-product">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <IoStarHalf />
        </div>

        <p className="product-price">${item.price}</p>
      </Link>

      <div className="product-icon">
        <span className="x" onClick={handleAddToCart}>
          <MdOutlineAddShoppingCart />
        </span>

        <span onClick={handleToggleFavorite}>
          {isFavorite ? (
            <FaHeart className="favorite-icon" />
          ) : (
            <IoHeartOutline />
          )}
        </span>

        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
}

export default Product;
