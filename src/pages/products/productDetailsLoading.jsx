import "./productDetails.css";
function ProductDetailsLoading() {
  return (
    <div className="productDetails-loading">
      <div className="loading-left">

        {/* الصورة الكبيرة */}
        <div className="loading-big-image skeleton"></div>

        {/* الصور الصغيرة */}
        <div className="loading-small-images">
          <div className="small skeleton"></div>
          <div className="small skeleton"></div>
          <div className="small skeleton"></div>
        </div>
      </div>

      {/* تفاصيل المنتج */}
      <div className="loading-right">
        <div className="line title skeleton"></div>
        <div className="line skeleton"></div>
        <div className="line skeleton"></div>
        <div className="line skeleton"></div>
        <div className="line skeleton"></div>

        <div className="loading-button skeleton"></div>
      </div>
    </div>
  );
}

export default ProductDetailsLoading;
