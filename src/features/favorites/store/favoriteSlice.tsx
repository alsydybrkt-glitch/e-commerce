import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { FavoriteItem } from "@/shared/types";
import { Product } from "@/features/products/services/productsApi";

const getFavorites = () => {
  if (typeof window !== "undefined") {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }
  return [];
};

function buildFavoritesById(items: FavoriteItem[] = []) {
  return items.reduce((acc: Record<string | number, boolean>, item: FavoriteItem) => {
    acc[item.id] = true;
    return acc;
  }, {});
}

export interface FavoriteState {
  items: FavoriteItem[];
  ids: Record<string | number, boolean>;
}

const initialItems = getFavorites();

const initialState: FavoriteState = {
  items: initialItems,
  ids: buildFavoritesById(initialItems),
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Product>) => {
      const exist = state.items.find((item: FavoriteItem) => item.id === action.payload.id);
      if (!exist) {
        state.items.push(action.payload as FavoriteItem);
        state.ids[action.payload.id] = true;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(state.items));
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item: FavoriteItem) => item.id !== action.payload);
      delete state.ids[action.payload];
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(state.items));
      }
    },
    clearFavorites: (state) => {
      state.items = [];
      state.ids = {};
      if (typeof window !== "undefined") {
        localStorage.removeItem("favorites");
      }
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;

const selectFavoritesState = (state: RootState) => state.favorites;
const selectFavoriteIds = createSelector(
  [selectFavoritesState],
  (favorites: FavoriteState) => favorites.ids
);

export const count = (state: RootState) => state.favorites.items.length;
export const selectIsFavorite = (state: RootState, productId: number) =>
  Boolean(state.favorites.ids?.[productId]);
export const makeSelectIsFavorite = (productId: number) =>
  createSelector([selectFavoriteIds], (ids: Record<string | number, boolean>) => Boolean(ids?.[productId]));
