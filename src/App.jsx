import TopHeader from "./component/header/topHeader";
import BtmHeader from "./component/header/btmHeader";
import Home from "./pages/home/home";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/products/productDetails";
import Cart from "./pages/Card/Cart";
import { Toaster } from "react-hot-toast";
import Scroll from "./component/scroll";
import { AnimatePresence } from "framer-motion";
import Category from "./pages/categories/category";
import SearchProducts from "./pages/Searching/searchProducts";
import Favorites from "./pages/Favorites/favorites";
import Contact from "./pages/contact/contact";
import Footer from "./component/Footer/footer";
import Blog from "./pages/blog/blog";
import Shop from "./pages/shop/shop";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllCategories } from "./Redux/ReduxSlices/productsReducer";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  return (
    <>
      <header>
        <TopHeader />
        <BtmHeader />
      </header>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#e9e9e9",
            borderRadius: "5px",
            padding: "8px",
          },
        }}
      />
      <Scroll />
      <AnimatePresence mode="sync">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/blog" element={<Blog />}></Route>

          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/search" element={<SearchProducts />}></Route>
          <Route path="/category/:category" element={<Category />}></Route>
          <Route path="/shop" element={<Shop />}></Route>

          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/carts" element={<Cart />}></Route>
        </Routes>
        <Footer />
      </AnimatePresence>
    </>
  );
}

export default App;
