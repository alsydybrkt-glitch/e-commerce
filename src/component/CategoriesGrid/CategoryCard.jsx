// CategoryCard.jsx
import "./CategoriesGrid.css";

function CategoryCard({ subtitle, title, buttonText, img, className }) {
  return (
    <div className={`card ${className}`}>
      <div className="card-content">
        <small>{subtitle}</small>
        <h2>{title}</h2>
        <button>{buttonText}</button>
      </div>

      {img && <img src={img} alt={title} />}
    </div>
  );
}

export default CategoryCard;
// End of CategoryCard.jsx
