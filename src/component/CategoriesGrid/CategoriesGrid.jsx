// CategoriesGrid.jsx
import "./CategoriesGrid.css";
import CategoryCard from "./CategoryCard";

export default function CategoriesGrid({ categories }) {
  return (
    <section className="categories-grid">
      {/* Banner */}


      {/* Categories */}
      {categories.map((item, index) => (
        <CategoryCard
          key={index}
          subtitle={item.subtitle}
          title={item.title}
          buttonText={item.buttonText}
          img={item.img}
          className={item.className}
        />
      ))}
    </section>
  );
}
// End of CategoriesGrid.jsx
