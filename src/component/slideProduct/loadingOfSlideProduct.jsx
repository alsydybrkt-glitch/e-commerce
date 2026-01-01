import "./slideProduct.css";

function SkeletonProduct() {
  return (
    <div>
      {/* <div className="skeleton-category">
        <div className="skeleton skeleton-cat-title"></div>
        <div className="skeleton skeleton-cat-desc"></div>
        <div className="skeleton skeleton-cat-line"></div>
      </div> */}
      <div className="skeleton-card">
        <div className="skeleton skeleton-img"></div>
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-rating"></div>
        <div className="skeleton skeleton-price"></div>
      </div>
    </div>
  );
}

export default SkeletonProduct;
