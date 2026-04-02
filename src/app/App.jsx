import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Header from "../widgets/layout/header/Header";
import Footer from "../widgets/layout/footer/Footer";
import ScrollToTop from "../shared/ui/ScrollToTop";
import AppRouter from "./router/AppRouter";
import { fetchAllCategories } from "./store/slices/productsSlice";
import { useTheme } from "../shared/theme/useTheme";

function App() {
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const categoriesStatus = useSelector((state) => state.products.categoriesStatus);

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchAllCategories());
    }
  }, [categoriesStatus, dispatch]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-hero-grid opacity-80 blur-3xl" />
      <Header />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: "20px",
            padding: "12px 14px",
            background: isDark ? "#17212b" : "#ffffff",
            color: isDark ? "#e5e7eb" : "#0f172a",
            boxShadow: isDark
              ? "0 18px 45px rgba(2, 6, 23, 0.35)"
              : "0 18px 45px rgba(15, 23, 42, 0.08)",
          },
        }}
      />
      <ScrollToTop />
      <main className="pb-10">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
