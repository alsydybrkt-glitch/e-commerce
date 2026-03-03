function ProductGallery({ images, mainImage, onChange }) {
  if (!images || images.length === 0) return null;

  const displayedImage = mainImage ?? images[0];

  return (
    <div className="images">
      <div className="big-images">
        <img src={displayedImage} alt="product" />
      </div>

      <div className="small-images">
        {images.slice(0, 3).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`thumb-${index}`}
            onClick={() => onChange(img)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
