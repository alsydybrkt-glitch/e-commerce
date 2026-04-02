import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import favoriteReducer from "./slices/favoriteSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    favorites: favoriteReducer,
  },
});
export default store;
