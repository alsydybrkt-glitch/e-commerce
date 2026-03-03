import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategories,
  fetchSingleCategory,
} from "../../Redux/ReduxSlices/productsReducer";

import "./shop.css";
import Product from "../../component/slideProduct/product";
import PageTransition from "../../component/pageTransition";

const VISIBLE_CATEGORIES = 5;

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, singleCategory, loadingCategory } = useSelector(
    (state) => state.products
  );

  const [selectedCategory, setSelectedCategory] = useState("");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const activeCategory =
    selectedCategory || (categories[0] && categories[0].slug) || "";

  useEffect(() => {
    if (activeCategory) {
      dispatch(fetchSingleCategory(activeCategory));
    }
  }, [activeCategory, dispatch]);

  const visible = categories.slice(0, VISIBLE_CATEGORIES);
  const hidden = categories.slice(VISIBLE_CATEGORIES);

  return (
    <PageTransition>
      <section className="shop-elegant">
        <div className="shop-box">
          <p className="subtitle">Our Shop</p>
          <h2>Our Products</h2>

          {/* ✅ Categories Pills */}
          <div className="categories-pills">
            {visible.map((cat) => (
              <button
                key={cat.slug}
                className={`pill ${
                  activeCategory === cat.slug ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setShowMore(false);
                }}
              >
                {cat.name}
              </button>
            ))}

            {/* More */}
            {hidden.length > 0 && (
              <div className="more-wrapper">
                <button
                  className="pill more"
                  onClick={() => setShowMore((prev) => !prev)}
                >
                  More ▾
                </button>

                {showMore && (
                  <div className="more-menu">
                    {hidden.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => {
                          setSelectedCategory(cat.slug);
                          setShowMore(false);
                        }}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Products */}
          {loadingCategory ? (
            <p className="loading">Loading...</p>
          ) : (
            <div className="products-grid">
              {singleCategory?.map((item) => (
                <Product item={item} key={item.id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default Shop;
