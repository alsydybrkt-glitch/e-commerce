// components/shop/ProductCard.jsx
const ProductCard = ({ item }) => {
  return (
    <div className="product-card">
      <div className="img-box">
        <img src={item.thumbnail} alt={item.title} />
        <span className="badge">Sale</span>
      </div>

      <h3>{item.title}</h3>
      <p className="price">${item.price}</p>

      <div className="actions">
        <button>Add to Cart</button>
        <button className="wishlist">♡</button>
      </div>
    </div>
  );
};

export default ProductCard;
