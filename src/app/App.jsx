import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Header from "../widgets/layout/header/Header";
import Footer from "../widgets/layout/footer/Footer";
import ScrollToTop from "../shared/ui/ScrollToTop";
import AppRouter from "./router/AppRouter";
import { fetchAllCategories } from "./store/slices/productsSlice";
import { useTheme } from "../shared/theme/useTheme";
import { useTranslation } from "../shared/i18n/useTranslation";

function App() {
  const { isDark } = useTheme();
  const { isRTL } = useTranslation();
  const dispatch = useDispatch();
  const categoriesStatus = useSelector((state) => state.products.categoriesStatus);

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchAllCategories());
    }
  }, [categoriesStatus, dispatch]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        className={`absolute inset-x-0 top-0 -z-10 h-[28rem] blur-3xl ${
          isDark ? "bg-hero-grid-dark opacity-[0.55]" : "bg-hero-grid opacity-80"
        }`}
      />
      <Header />
      <Toaster
        position={isRTL ? "bottom-left" : "bottom-right"}
        toastOptions={{
          style: {
            borderRadius: "20px",
            padding: "12px 14px",
            background: isDark ? "#1a222c" : "#ffffff",
            color: isDark ? "#f1f5f9" : "#0f172a",
            border: isDark ? "1px solid #334155" : "1px solid #e2e8e0",
            boxShadow: isDark
              ? "0 16px 40px rgba(0, 0, 0, 0.42)"
              : "0 14px 40px rgba(15, 23, 42, 0.08)",
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
