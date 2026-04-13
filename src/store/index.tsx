import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import productsReducer from "@/features/products/store/productsSlice";
import cartReducer from "@/features/cart/store/cartSlice";
import favoriteReducer from "@/features/favorites/store/favoriteSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    favorites: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
