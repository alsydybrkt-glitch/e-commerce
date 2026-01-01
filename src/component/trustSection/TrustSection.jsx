import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./TrustSection.css";
import Product from "../../component/slideProduct/product";

/* Offer-based Tabs */
const tabs = [
  { key: "all", label: "All Deals" },
  { key: "best", label: "Best Sellers" },
  { key: "discount", label: "Big Discounts" },
  { key: "top", label: "Top Rated" },
  { key: "new", label: "New Arrivals" },
];

function BestSellers() {
  const navigate = useNavigate();
  const { items = {}, status } = useSelector((state) => state.products);
  const [activeTab, setActiveTab] = useState("all");
  const bestSellers = useMemo(() => {
    if (!items || typeof items !== "object") return [];

    const allProducts = Object.values(items).filter(Array.isArray).flat();

    let filtered = [];

    switch (activeTab) {
      case "best":
        filtered = allProducts.filter((p) => p.rating >= 4.7);
        break;

      case "discount":
        filtered = allProducts.filter((p) => p.discountPercentage >= 15);
        break;

      case "top":
        filtered = [...allProducts].sort((a, b) => b.rating - a.rating);
        break;

      case "new":
        filtered = [...allProducts].slice(-10);
        break;

      default:
        filtered = allProducts;
    }

    return filtered.slice(0, 6);
  }, [items, activeTab]);

  if (status === "loading") {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <section className="best-sellers">
      {/* Header */}
      <div className="header">
        <div>
          <span className="subtitle">Our Products</span>
          <h2>Our Best Sellers Products</h2>
        </div>
        <button className="view-btn" onClick={() => navigate("/shop")}>
          View All Products
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? "active" : ""}
            onClick={() => setActiveTab(tab.key)} // ✅ FIX
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="products">
        {bestSellers.map((product) => (
          <motion.div
            key={product.id}
          
            whileHover={{ y: -6 }}
          >
            <div className="img-box"></div>

            {/* باقي الـ Product UI */}
            <Product item={product} hideImage />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default BestSellers;
