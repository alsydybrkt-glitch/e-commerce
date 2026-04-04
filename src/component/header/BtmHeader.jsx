import { Link, useLocation } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { MdArrowDropDown, MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import HeaderIcons from "./HeaderIcons";
import useHeaderLogic from "./useHeaderLogic";
import { useEffect } from "react";

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
        {/* LEFT */}
        <nav className="nav">
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
                  categories.map((category, index) => (
                    <Link
                      key={`${category.slug}-${index}`}
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

          {/* Desktop Nav */}
          <div className="nav-links">
            {navLinks.map((link, index) => (
              <Link
                key={`${link.path}-${index}`}
                to={link.path}
                className={location.pathname === link.path ? "active" : ""}
                onClick={closeAll}
              >
                {link.icon}
                <span className="link-text">{link.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* RIGHT */}
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

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300
  ${openMobile ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeAll}
      ></div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-y-0 right-0 w-[300px] bg-white shadow-xl z-50
  transition-transform duration-300 ease-in-out
  ${openMobile ? "translate-x-0" : "translate-x-[100%]"}`}
      >
        {/* menu header */}
        <div className="mobile-menu-header">
          <span className="mobile-title">Menu</span>
          <button className="mobile-close" onClick={closeAll}>
            <MdClose size={22} />
          </button>
        </div>

        <div className="mobile-menu-content">
          {/* links */}
          <div className="mobile-nav-section">
            {navLinks.map((link, index) => (
              <Link
                key={`${link.path}-${index}`}
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

          {/* categories */}
          <button
            className="mobile-section-title"
            onClick={() => setOpenMobileCategories(!openMobileCategories)}
          >
            <span className="cat-title">
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
              categories.map((cat, index) => (
                <Link
                  key={`${cat.slug}-${index}`}
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
