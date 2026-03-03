import { createContext, useState } from "react";

export const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
  const [categories] = useState([
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
  ]);

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
}
