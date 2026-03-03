import { Link, useLocation } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { MdArrowDropDown, MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import HeaderIcons from "./HeaderIcons";
import useHeaderLogic from "./useHeaderLogic";
import "./header-responsive.css";
import { useEffect } from "react";

<<<<<<< HEAD
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

=======
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];
>>>>>>> 6936e6050fb1b2fab8f38947fbada9d016b81957
function BottomHeader() {
  const location = useLocation();
  const categories = useSelector((state) => state.products?.categories || []);

  const {
    openDesktopCategories,
    setOpenDesktopCategories,
    openMobile,
    setOpenMobile,
    closeAll,
<<<<<<< HEAD
    openMobileCategories,
    setOpenMobileCategories,
  } = useHeaderLogic();

  // Close dropdown when clicking outside (Desktop Only)
=======
  } = useHeaderLogic();
>>>>>>> 6936e6050fb1b2fab8f38947fbada9d016b81957
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest(".categories")) {
        setOpenDesktopCategories(false);
      }
    };
<<<<<<< HEAD
=======

>>>>>>> 6936e6050fb1b2fab8f38947fbada9d016b81957
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
<<<<<<< HEAD
            onClick={() => setOpenDesktopCategories(!openDesktopCategories)}
=======
            onClick={() => {
              setOpenDesktopCategories(!openDesktopCategories);
            }}
>>>>>>> 6936e6050fb1b2fab8f38947fbada9d016b81957
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
<<<<<<< HEAD
                      className="category-item"
=======
                      className="mobile-category-item"
>>>>>>> 6936e6050fb1b2fab8f38947fbada9d016b81957
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
<<<<<<< HEAD
                {link.icon}
                <span style={{ marginLeft: "8px" }}>{link.name}</span>
=======
                {link.name}
>>>>>>> 6936e6050fb1b2fab8f38947fbada9d016b81957
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

<<<<<<< HEAD
      {/* ================= MOBILE OVERLAY ================= */}
      <div
        className={`mobile-overlay ${openMobile ? "active" : ""}`}
        onClick={closeAll}
      ></div>

=======
>>>>>>> 6936e6050fb1b2fab8f38947fbada9d016b81957
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
<<<<<<< HEAD
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
=======
                {link.name}
              </Link>
            ))}
          </div>
>>>>>>> 6936e6050fb1b2fab8f38947fbada9d016b81957
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default BottomHeader;
=======
export default BottomHeader;
>>>>>>> 6936e6050fb1b2fab8f38947fbada9d016b81957
