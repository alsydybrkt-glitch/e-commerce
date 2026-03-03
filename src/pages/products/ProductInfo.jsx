import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaHeart, FaShare, FaStar } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoStarHalf } from "react-icons/io5";

function ProductInfo({
  product,
  isInCart,
  isFavorite,
  onAddToCart,
  onToggleFavorite,
}) {
  return (
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

      <p>{product.description}</p>

      <button
        className={`btn ${isInCart ? "in_Cart" : ""}`}
        onClick={onAddToCart}
        disabled={isInCart}
      >
        {isInCart ? "Item in Cart" : "Add to Cart"}
        <MdOutlineAddShoppingCart />
      </button>

      <div className="product-icon">
        <span onClick={onToggleFavorite}>
          {isFavorite ? <FaHeart className="favorite-icon" /> : <IoMdHeartEmpty />}
        </span>
        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
}

export default ProductInfo;
