import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../Redux/ReduxSlices/cardReducer";
import { count } from "../../Redux/ReduxSlices/favoriteReducer";

function HeaderIcons() {
  const cartCount = useSelector(selectCartCount);
  const favorites = useSelector(count);
  return (
    <div className="header-icons">
      <Link to="/favorites" className="icon fav">
        <FaRegHeart />
        <span className="icon-text">{favorites}</span>
      </Link>

      <Link to="/carts" className="icon cart">
        <MdOutlineShoppingCart />
        <span className="icon-text">{cartCount}</span>
      </Link>

      <div className="icon notify">
        <IoMdNotificationsOutline />
        <span className="icon-text">3</span>
      </div>
    </div>
  );
}

export default HeaderIcons;
