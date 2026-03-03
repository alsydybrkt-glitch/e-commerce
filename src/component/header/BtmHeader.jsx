import { Link, useLocation } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { MdArrowDropDown, MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import HeaderIcons from "./HeaderIcons";
import useHeaderLogic from "./useHeaderLogic";
import "./header-responsive.css";
import { useEffect } from "react";

// ⭐ Icons (JavaScript Import)
import {
  Home,
  ShoppingBag,
  BookText,
  Phone,
  Grid,
  ChevronDown,
} from "lucide-react";

const navLinks = [
  { name: "Home", path: "/", icon: <Home size={18} /> },
  { name: "Shop", path: "/shop", icon: <ShoppingBag size={18} /> },
  { name: "Blog", path: "/blog", icon: <BookText size={18} /> },
  { name: "Contact", path: "/contact", icon: <Phone size={18} /> },
];

function BottomHeader() {
  const location = useLocation();
  const categories = useSelector((state) => state.products?.categories || []);

  const {
    openDesktopCategories,
    setOpenDesktopCategories,
    openMobile,
    setOpenMobile,
    closeAll,
    openMobileCategories,
    setOpenMobileCategories,
  } = useHeaderLogic();

  // Close dropdown when clicking outside (Desktop Only)
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest(".categories")) {
        setOpenDesktopCategories(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [setOpenDesktopCategories]);

  return (
    <div className="btm-header">
      <div className="container">
        {/* ================= LEFT ================= */}
        <nav className="nav">
          {/* ===== Desktop Categories ===== */}
          <div
            className="categories"
            onClick={() => setOpenDesktopCategories(!openDesktopCategories)}
          >
            <button className="categories-btn">
              <TiThMenu />
              <span>Categories</span>
              <MdArrowDropDown />
            </button>

            {openDesktopCategories && (
              <div className="categories-list">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <Link
                      key={category.slug}
                      to={`/category/${category.slug}`}
                      className="category-item"
                      onClick={closeAll}
                    >
                      {category.name}
                    </Link>
                  ))
                ) : (
                  <div className="empty">Loading...</div>
                )}
              </div>
            )}
          </div>

          {/* ===== Desktop Nav Links ===== */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={location.pathname === link.path ? "active" : ""}
                onClick={closeAll}
              >
                {link.icon}
                <span style={{ marginLeft: "8px" }}>{link.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* ================= RIGHT ================= */}
        <div className="header-right">
          <HeaderIcons />
          <button
            className="mobile-toggle"
            onClick={() => setOpenMobile(!openMobile)}
            aria-label="Toggle menu"
          >
            {openMobile ? <MdClose /> : <TiThMenu />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        className={`mobile-overlay ${openMobile ? "active" : ""}`}
        onClick={closeAll}
      ></div>

      {/* ================= MOBILE MENU ================= */}
      <div className={`mobile-menu ${openMobile ? "active" : ""}`}>
        <div className="mobile-menu-content">
          {/* ===== Mobile Nav Links ===== */}
          <div className="mobile-nav-section">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${
                  location.pathname === link.path ? "active" : ""
                }`}
                onClick={closeAll}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* ===== Mobile Categories Dropdown ===== */}
          <button
            className="mobile-section-title"
            onClick={() => setOpenMobileCategories(!openMobileCategories)}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <Grid size={18} />
              Categories
            </span>
            <ChevronDown
              size={18}
              className={openMobileCategories ? "rotate" : ""}
            />
          </button>

          <div
            className={`mobile-categories-list ${
              openMobileCategories ? "show" : ""
            }`}
          >
            {categories.length > 0 ? (
              categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className="mobile-category-item"
                  onClick={closeAll}
                >
                  {cat.name}
                </Link>
              ))
            ) : (
              <div className="empty">Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomHeader;