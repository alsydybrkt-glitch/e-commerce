import { createSlice } from "@reduxjs/toolkit";
const storedFavorites = localStorage.getItem("favorites");
const getFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    items: getFavorites,
  },
  reducers: {
    addFavorite: (state, action) => {
      const exist = state.items.find((item) => item.id === action.payload.id);
      if (!exist) {
        state.items.push(action.payload);
      }
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;

export const count = (state) => state.favorites.items.length;
