import { useDispatch } from "react-redux";
import { fetchSingleCategory } from "../../Redux/ReduxSlices/productsReducer";

const ShopFilters = ({ categories }) => {
  const dispatch = useDispatch();

  return (
    <div className="filters">
      <h3>Categories</h3>

      {categories.map((cat) => (
        <button
          key={cat.slug}                 // ✅ key unique
          className="category-btn"
          onClick={() => dispatch(fetchSingleCategory(cat.slug))}
        >
          {cat.name}                     {/* ✅ render string */}
        </button>
      ))}
    </div>
  );
};

export default ShopFilters;
