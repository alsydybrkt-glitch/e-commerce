import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsBySearch } from "../../Redux/ReduxSlices/productsReducer";
import "./header.css";

function SearchBox() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const products = useSelector((state) => state.products.searchResults);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    navigate(`/search?query=${encodeURIComponent(inputValue.trim())}`);
    setInputValue("");
  };

  useEffect(() => {
    if (!inputValue.trim()) return;

    const delayDebounceFn = setTimeout(() => {
      dispatch(fetchProductsBySearch(inputValue.trim()));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, dispatch]);
  useEffect(() => {
    setInputValue("");
  }, [location]);
  return (
    <div className="search-container">
      <form className="search-box" onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          type="text"
          placeholder="Search for products..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>

      {inputValue && products && products.length > 0 && (
        <div className="search-suggestions">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="suggestion-item"
              onClick={() => {
                navigate(`/product/${product.id}`);
                setInputValue("");
              }}
            >
              <img src={product.images?.[0]} alt={product.title} />
              <span>{product.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
