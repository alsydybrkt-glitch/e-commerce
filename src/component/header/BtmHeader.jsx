import { Link, useLocation } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { MdArrowDropDown, MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import HeaderIcons from "./HeaderIcons";
import useHeaderLogic from "./useHeaderLogic";
import "./header-responsive.css";
import { useEffect } from "react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
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
  } = useHeaderLogic();
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
            onClick={() => {
              setOpenDesktopCategories(!openDesktopCategories);
            }}
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
                      className="mobile-category-item"
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
                {link.name}
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
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomHeader;
