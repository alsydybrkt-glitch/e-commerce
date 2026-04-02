import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsBySearch } from "../../../app/store/slices/productsSlice";
import { useTranslation } from "../../../shared/i18n/useTranslation";

function SearchBox() {
  const { t, tCategoryName } = useTranslation();
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.searchResults);
  const deferredInput = useDeferredValue(inputValue);
  const normalizedInput = deferredInput.trim().toLowerCase();
  const suggestions = useMemo(() => products.slice(0, 4), [products]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      return;
    }

    navigate(`/search?query=${encodeURIComponent(inputValue.trim())}`);
    setInputValue("");
  };

  useEffect(() => {
    if (normalizedInput.length < 2) {
      return;
    }

    const timer = setTimeout(() => {
      dispatch(fetchProductsBySearch(normalizedInput));
    }, 350);

    return () => clearTimeout(timer);
  }, [dispatch, normalizedInput]);

  return (
    <div className="relative w-full max-w-2xl">
      <form
        className="surface-card flex items-center gap-3 rounded-full px-4 py-3"
        onSubmit={handleSubmit}
      >
        <FaSearch className="text-slate-400" />
        <input
          autoComplete="off"
          type="text"
          placeholder={t("header.searchPlaceholder")}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400"
        />
        <button type="submit" className="primary-btn !px-4 !py-2 text-xs">
          {t("common.search")}
        </button>
      </form>

      {normalizedInput.length >= 2 && suggestions.length > 0 && (
        <div className="surface-card absolute inset-x-0 top-[calc(100%+12px)] z-20 overflow-hidden p-2">
          {suggestions.map((product) => (
            <button
              key={product.id}
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-slate-50"
              onClick={() => {
                navigate(`/product/${product.id}`);
                setInputValue("");
              }}
            >
              <img
                src={product.images?.[0]}
                alt={product.title}
                loading="lazy"
                decoding="async"
                className="h-14 w-14 rounded-2xl bg-slate-100 object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {product.title}
                </p>
                <p className="text-xs text-slate-500">
                  ${product.price} · {tCategoryName(product.category)}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
