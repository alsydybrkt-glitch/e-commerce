import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { MdArrowDropDown, MdClose } from "react-icons/md";
import {
  FiHome,
  FiShoppingBag,
  FiBookOpen,
  FiPhoneIncoming,
  FiCreditCard,
  FiTruck,
  FiStar,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import HeaderIcons from "./HeaderIcons";
import useHeaderLogic from "./useHeaderLogic";
import { useTranslation } from "../../../shared/i18n/useTranslation";

function BottomHeader() {
  const { t, tCategoryName, tCategoryDescription, isRTL } = useTranslation();
  const location = useLocation();
  const categories = useSelector((state) => state.products?.categories || []);
  const featuredMenuLinks = useMemo(
    () => [
      {
        label: isRTL ? "اذهب إلى المتجر" : "Go to shop",
        href: "/shop",
      },
      {
        label: isRTL ? "استكشف المدونة" : "Explore blog",
        href: "/blog",
      },
    ],
    [isRTL],
  );

  const navLinks = [
    { name: t("nav.home"), path: "/", icon: <FiHome size={16} /> },
    { name: t("nav.shop"), path: "/shop", icon: <FiShoppingBag size={16} /> },
    { name: t("nav.blog"), path: "/blog", icon: <FiBookOpen size={16} /> },
    {
      name: t("nav.contact"),
      path: "/contact",
      icon: <FiPhoneIncoming size={16} />,
    },
    {
      name: t("nav.checkout"),
      path: "/checkout",
      icon: <FiCreditCard size={16} />,
    },
    {
      name: t("nav.orderTracking"),
      path: "/order-tracking",
      icon: <FiTruck size={16} />,
    },
  ];

  const {
    openDesktopCategories,
    setOpenDesktopCategories,
    openMobile,
    setOpenMobile,
    closeAll,
  } = useHeaderLogic();

  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleMobileSearch = () => {
    const query = mobileSearchQuery.trim();
    if (!query) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
    setMobileSearchQuery("");
    closeAll();
  };

  const handleMobileSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleMobileSearch();
    }
  };

  const dealsOfDay = [
    { title: t("home.tabs.discount"), href: "/shop?tab=discount" },
    { title: t("home.tabs.best"), href: "/shop?tab=best" },
    { title: t("home.tabs.top"), href: "/shop?tab=top" },
  ];
  const topSellers = [
    { title: t("common.topSellers"), href: "/shop?filter=top" },
    { title: t("common.newArrivals"), href: "/shop?filter=new" },
  ];

  const drawerPosition = isRTL
    ? "inset-y-0 right-0 rounded-l-3xl"
    : "inset-y-0 left-0 rounded-r-3xl";

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest("[data-categories-menu]")) {
        setOpenDesktopCategories(false);
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [setOpenDesktopCategories]);

  useEffect(() => {
    if (openMobile) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [openMobile]);

  return (
    <div className="py-3">
      <div className="shell flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block" data-categories-menu>
            <button
              type="button"
              className="secondary-btn gap-2 !rounded-2xl !px-4 !py-3"
              onClick={() => setOpenDesktopCategories(!openDesktopCategories)}
            >
              <TiThMenu className="text-lg" />
              {t("common.categories")}
              <MdArrowDropDown
                className={`text-lg transition ${
                  openDesktopCategories ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDesktopCategories && (
              <div
                className={`absolute top-[calc(100%+12px)] z-20 w-[58rem] max-w-[calc(100vw-4rem)] overflow-hidden rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.18)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_24px_70px_rgba(0,0,0,0.45)] ${
                  isRTL ? "right-0" : "left-0"
                }`}
              >
                {categories.length > 0 ? (
                  <div>
                    <div
                      className={`mb-5 flex items-end justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-700 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <div>
                        <p className="text-xs font-semibold tracking-[0.22em] text-slate-400 dark:text-slate-500">
                          {t("common.categories")}
                        </p>
                        <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                          {isRTL
                            ? "تصفح الأقسام بسرعة"
                            : "Browse categories quickly"}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          {categories.length} {isRTL ? "أقسام" : "sections"}
                        </span>
                        {featuredMenuLinks.map((link) => (
                          <Link
                            key={link.href}
                            to={link.href}
                            className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-800"
                            onClick={closeAll}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                      {categories.map((category) => (
                        <Link
                          key={category.slug}
                          to={`/category/${category.slug}`}
                          className="group rounded-[22px] border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600 dark:hover:bg-slate-800"
                          onClick={closeAll}
                        >
                          <div
                            className={`flex items-start gap-3 ${
                              isRTL ? "text-right" : "text-left"
                            }`}
                          >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-sm font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                              {tCategoryName(category.slug || category.name)
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                {tCategoryName(category.slug || category.name)}
                              </p>
                              <p className="mt-1 line-clamp-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                {tCategoryDescription(
                                  category.slug || category.name,
                                ) || category.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {t("common.loading")}
                  </div>
                )}
              </div>
            )}
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                      : "text-slate-600 hover:bg-white hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-400"
                  }`}
                  onClick={closeAll}
                >
                  <span
                    className={`text-base ${active ? "text-slate-300 dark:text-slate-600" : "text-slate-400 dark:text-slate-500"}`}
                  >
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <HeaderIcons />
          <button
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-xl text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 lg:hidden"
            onClick={() => setOpenMobile(!openMobile)}
            aria-label="Toggle menu"
            type="button"
          >
            {openMobile ? <MdClose /> : <TiThMenu />}
          </button>
        </div>
      </div>

      {openMobile && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm"
            onClick={closeAll}
            aria-hidden="true"
          />
          <aside
            dir={isRTL ? "rtl" : "ltr"}
            className={`fixed ${drawerPosition} top-0 bottom-0 h-screen z-50 w-[88vw] max-w-xs overflow-y-auto bg-white p-4 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700 lg:hidden ${isRTL ? "text-right" : "text-left"}`}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {t("common.menu")}
              </h2>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
                onClick={closeAll}
                aria-label="Close menu"
              >
                <MdClose />
              </button>
            </div>

            <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center gap-2 rounded-lg bg-white px-2 py-2 shadow-sm dark:bg-slate-900">
                <span className="text-slate-400">🔍</span>
                <input
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  onKeyDown={handleMobileSearchKeyDown}
                  type="search"
                  placeholder={t("common.search")}
                  className="w-full border-none bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
                <button
                  onClick={handleMobileSearch}
                  type="button"
                  className="rounded-lg bg-brand-600 px-2 py-1 text-xs font-bold text-white"
                  title={t("common.search")}
                >
                  Go
                </button>
              </div>
            </div>

            <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-3 flex items-center justify-between rounded-lg border border-amber-300 bg-amber-50 p-3 dark:border-amber-500 dark:bg-amber-900/30">
                <div>
                  <p className="text-sm font-bold text-amber-600 dark:text-amber-300">
                    {t("common.primePlan")}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {t("common.primePlanTagline")}
                  </p>
                </div>
                <FiStar
                  className="text-amber-700 text-xl dark:text-amber-200"
                  title={t("common.primePlan")}
                />
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t("common.dealsOfDay")}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {dealsOfDay.map((item) => (
                  <Link
                    key={`deal-${item.href}`}
                    to={item.href}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-brand-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    onClick={closeAll}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              <p className="mt-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t("common.topSellers")}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {topSellers.map((item) => (
                  <Link
                    key={`topseller-${item.href}`}
                    to={item.href}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-brand-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    onClick={closeAll}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    location.pathname === link.path
                      ? "bg-brand-600 text-white"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                  }`}
                  onClick={closeAll}
                >
                  <span className="text-lg text-slate-500 dark:text-slate-300">
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {t("common.categories")}
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/category/${category.slug}`}
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                    onClick={closeAll}
                  >
                    {tCategoryName(category.slug || category.name)}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

export default BottomHeader;
