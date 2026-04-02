import { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("../../pages/home/HomePage"));
const ContactPage = lazy(() => import("../../pages/contact/ContactPage"));
const BlogPage = lazy(() => import("../../pages/blog/BlogPage"));
const ProductDetailsPage = lazy(
  () => import("../../pages/products/ProductDetailsPage"),
);
const SearchPage = lazy(() => import("../../pages/search/SearchPage"));
const CategoryPage = lazy(() => import("../../pages/categories/CategoryPage"));
const ShopPage = lazy(() => import("../../pages/shop/ShopPage"));
const FavoritesPage = lazy(() => import("../../pages/favorites/FavoritesPage"));
const CartPage = lazy(() => import("../../pages/cart/CartPage"));
const CheckoutPage = lazy(() => import("../../pages/checkout/CheckoutPage"));
const OrderTrackingPage = lazy(
  () => import("../../pages/order-tracking/OrderTrackingPage"),
);

function RouteFallback() {
  return (
    <div className="shell section-gap">
      <div className="surface-card animate-pulse p-8 sm:p-10">
        <div className="mb-4 h-7 w-48 rounded-full bg-slate-200" />
        <div className="mb-3 h-5 w-full rounded-full bg-slate-200" />
        <div className="mb-3 h-5 w-5/6 rounded-full bg-slate-200" />
        <div className="h-64 rounded-[28px] bg-slate-200" />
      </div>
    </div>
  );
}

function AppRouter() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <AnimatePresence mode="sync">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/carts" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-tracking" element={<OrderTrackingPage />} />
          <Route
            path="/order-tracking/:orderId"
            element={<OrderTrackingPage />}
          />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default AppRouter;
