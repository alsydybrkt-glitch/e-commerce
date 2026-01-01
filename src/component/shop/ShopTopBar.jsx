// components/shop/ShopTopBar.jsx
const ShopTopBar = ({ total }) => {
  return (
    <div className="shop-topbar">
      <p>Showing {total} products</p>

      <select>
        <option>Sort by</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
        <option>Newest</option>
      </select>
    </div>
  );
};

export default ShopTopBar;
