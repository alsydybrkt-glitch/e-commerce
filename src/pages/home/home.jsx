import HeroSlider from "../../component/HeroSlider";
import SlideProduct from "../../component/slideProduct/slideProduct";
import PageTransitions from "../../component/pageTransition";

import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/ReduxSlices/productsReducer";
import { CategoriesContext } from "../../context/slideDetails";

import "./home.css";
import TrustSection from "../../component/trustSection/TrustSection";
// Data for banner and categories

const bannerData = {
  subtitle: "Devices Sale",
  title: "Wireless Headphone",
  buttonText: "Shop Now",
  img: "https://pngimg.com/uploads/headphones/headphones_PNG7647.png",
};
const categoryInf = [
  {
    subtitle: "Enjoy",
    apiName: "smartphones",
    className: "earphone",
  },
  {
    subtitle: "Smart",
    apiName: "smartphones",
    className: "watch",
  },
  {
    subtitle: "Devices",
    apiName: "laptops",
    className: "laptop",
  },
  {
    subtitle: "Gaming",
    apiName: "mobile-accessories",
    className: "console",
  },
  {
    subtitle: "Game",
    apiName: "sunglasses",
    className: "vr",
  },
  {
    subtitle: "Amazon",
    apiName: "mobile-accessories",
    className: "speaker",
  },
];

//end Data for banner and categories

function Home() {
  const { categories } = useContext(CategoriesContext);
  const products = useSelector((state) => state.products.items);
  const Dispatch = useDispatch();
  useEffect(() => {
    if (!categories.length) return;

    categories.forEach((cat) => {
      Dispatch(fetchProducts(cat.name));
    });
  }, [Dispatch, categories]);

  return (
    <PageTransitions>
      <>
        <HeroSlider />
        {categories.map((category) => {
          return (
            <SlideProduct
              key={category.name}
              products={products[category.name]}
              category={category.name.replace("-", " ")}
              description={category.description}
            />
          );
        })}
      </>
    </PageTransitions>
  );
}
export default Home;
