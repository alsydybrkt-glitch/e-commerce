import { CategoriesContext } from "../../../shared/context/categories-context";
import { useTranslation } from "../../../shared/i18n/useTranslation";

const SHOP_CATEGORIES = [
  {
    name: "smartphones",
    description: "Modern phones with advanced cameras and fast performance.",
  },
  {
    name: "laptops",
    description: "Portable computers for work, study, and gaming.",
  },
  {
    name: "mobile-accessories",
    description: "Phone add-ons like chargers, cases, and headphones.",
  },
  {
    name: "tablets",
    description: "Touch-screen devices ideal for media, reading, and apps.",
  },
  {
    name: "sunglasses",
    description: "Stylish eyewear for fashion and sun protection.",
  },
];

export function CategoriesProvider({ children }) {
  const { tCategoryDescription } = useTranslation();
  const categories = SHOP_CATEGORIES.map((category) => ({
    ...category,
    description: tCategoryDescription(category.name) || category.description,
  }));

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
}
