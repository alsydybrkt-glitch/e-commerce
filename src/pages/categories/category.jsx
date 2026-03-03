import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleCategory } from "../../Redux/ReduxSlices/productsReducer";
import { useDispatch, useSelector } from "react-redux";
import "./Category.css";
import Product from "../../component/slideProduct/product";
import LoadingOfSlideProduct from "../../component/slideProduct/loadingOfSlideProduct";
import PageTransitions from "../../component/pageTransition";

function Category() {
  const dispatch = useDispatch();
  const { category } = useParams();

  const products = useSelector((state) => state.products.singleCategory);
  const loadingProduct = useSelector((state) => state.products.loadingProduct);
  const loadingCategory = useSelector(
    (state) => state.products.loadingCategory
  );
  useEffect(() => {
    if (category) {
      dispatch(fetchSingleCategory(category));
    }
  }, [category, dispatch]);

  // 🚀 Show loading page if any of them is loading
  if (loadingProduct || loadingCategory) {
    return (
      <div style={{ display: "flex", gap: "20px" }}>
        <LoadingOfSlideProduct />
        <LoadingOfSlideProduct />
        <LoadingOfSlideProduct />
        <LoadingOfSlideProduct />
      </div>
    );
  }

  return (
    <PageTransitions key={category}>
      <div className="category-page">
        <h1 className="category-title">{category}</h1>

        <div className="products-grid">
          {products?.map((product) => (
            <Product item={product} />
          ))}
        </div>
      </div>
    </PageTransitions>
  );
}

export default Category;
