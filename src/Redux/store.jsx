import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./ReduxSlices/productsReducer";
import cardReducer from "./ReduxSlices/cardReducer";
import favoriteReducer from "./ReduxSlices/favoriteReducer";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cardReducer: cardReducer,
    favorites: favoriteReducer,
  },
});
export default store;
