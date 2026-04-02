import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  clearStoredCartItems,
  loadStoredCartItems,
  persistCartItems,
} from "../../../features/cart/lib/cartStorage";

const initialState = {
  items: loadStoredCartItems(),
  discount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const quantityToAdd = Math.max(action.payload.quantity ?? 1, 1);
      const existingItem = state.items.find(
        (entry) => entry.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
      } else {
        state.items.push({ ...action.payload, quantity: quantityToAdd });
      }

      persistCartItems(state.items);
    },
    increaseQty: (state, action) => {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item) {
        item.quantity += 1;
        persistCartItems(state.items);
      }
    },
    decreaseQty: (state, action) => {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        persistCartItems(state.items);
      }
    },
    applyDiscount: (state, action) => {
      state.discount = action.payload;
    },
    remove: (state, action) => {
      const item = state.items.find((entry) => entry.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((entry) => entry.id !== action.payload);
      }

      persistCartItems(state.items);
    },
    resetCart: (state) => {
      state.items = [];
      state.discount = 0;
      clearStoredCartItems();
    },
  },
});

export const {
  add,
  remove,
  increaseQty,
  decreaseQty,
  applyDiscount,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;

const selectCartState = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart.items
);
export const selectCartDiscount = createSelector(
  [selectCartState],
  (cart) => cart.discount
);
export const selectCartItemQuantity = (state, productId) =>
  state.cart.items.find((item) => item.id === productId)?.quantity ?? 0;
export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);
export const selectCartSubtotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)
);
export const selectFinalTotal = createSelector(
  [selectCartSubtotal, selectCartDiscount],
  (subtotal, discount) => subtotal - (subtotal * discount) / 100
);
