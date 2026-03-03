import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsBySearch } from "../../Redux/ReduxSlices/productsReducer";
import Product from "../../component/slideProduct/product";
import PageTransitions from "../../component/pageTransition";
function SearchProducts() {
  const queryParams = new URLSearchParams(window.location.search);
  const query = queryParams.get("query");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.searchResults);
  useEffect(() => {
    if (query) {
      dispatch(fetchProductsBySearch(query));
    }
  }, [dispatch, query]);
  return (
    <PageTransitions key={query}>
      <div>
        <h1 style={{ width: "90%", margin: "25px auto" }}>
          Search Results for: {query}
        </h1>
        {products && products.length > 0 ? (
          <div className="products-grid">
            {products.map((product) => (
              <Product key={product.id} item={product} />
            ))}
          </div>
        ) : (
          <p style={{ width: "90%", margin: "25px auto" }}>
            No products found.
          </p>
        )}
      </div>
    </PageTransitions>
  );
}

export default SearchProducts;
