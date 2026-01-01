import { useSelector, useDispatch } from "react-redux";
// import FavoritesItem from "./favoriteItem";
import Product from "../../component/slideProduct/product";
import "./favorites.css";
import PageTransitions from "../../component/pageTransition";
import { clearFavorites } from "../../Redux/ReduxSlices/favoriteReducer";
function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No favorites yet ❤️</h2>
        <p>Add products to your favorites to see them here.</p>
      </div>
    );
  }

  return (
    <PageTransitions key={favorites}>
      <div className="favorites">
        <h1
          className="favorites-title"
          style={{ width: "90%", margin: "25px auto" }}
        >
          My Favorites
        </h1>

        <div className="favorites-grid">
          {favorites.map((product) => (
            <Product key={product.id} item={product} />
          ))}
        </div>
        <div className="resetItem">
          <button
            className="reset-btn"
            onClick={() => dispatch(clearFavorites())}
          >
            Reset Favorites
          </button>
        </div>
      </div>
    </PageTransitions>
  );
}

export default Favorites;
