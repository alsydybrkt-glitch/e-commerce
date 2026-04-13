import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  clearStoredCartItems,
  loadStoredCartItems,
  persistCartItems,
} from "@/features/cart/lib/cartStorage";
import { RootState } from "@/store";
import { CartItem } from "@/shared/types";

function buildQuantityById(items: CartItem[] = []) {
  return items.reduce(
    (acc, item) => {
      acc[item.id] = item.quantity ?? 0;
      return acc;
    },
    {} as Record<string | number, number>
  );
}

export interface CartState {
  items: CartItem[];
  discount: number;
  quantityById: Record<string | number, number>;
}

const initialItems = loadStoredCartItems();

const initialState: CartState = {
  items: initialItems,
  discount: 0,
  quantityById: buildQuantityById(initialItems),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const quantityToAdd = Math.max(action.payload.quantity ?? 1, 1);
      const existingItem = state.items.find(
        (entry: CartItem) => entry.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
        state.quantityById[action.payload.id] = existingItem.quantity;
      } else {
        state.items.push({ ...action.payload, quantity: quantityToAdd });
        state.quantityById[action.payload.id] = quantityToAdd;
      }

      persistCartItems(state.items);
    },
    increaseQty: (state, action) => {
      const item = state.items.find((entry: CartItem) => entry.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.quantityById[action.payload] = item.quantity;
        persistCartItems(state.items);
      }
    },
    decreaseQty: (state, action) => {
      const item = state.items.find((entry: CartItem) => entry.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.quantityById[action.payload] = item.quantity;
        persistCartItems(state.items);
      }
    },
    applyDiscount: (state, action) => {
      state.discount = action.payload;
    },
    remove: (state, action) => {
      const item = state.items.find((entry: CartItem) => entry.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.quantityById[action.payload] = item.quantity;
      } else {
        state.items = state.items.filter((entry: CartItem) => entry.id !== action.payload);
        delete state.quantityById[action.payload];
      }

      persistCartItems(state.items);
    },
    resetCart: (state) => {
      state.items = [];
      state.discount = 0;
      state.quantityById = {};
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

const selectCartState = (state: RootState) => state.cart;
const selectCartQuantityById = createSelector(
  [selectCartState],
  (cart: CartState) => cart.quantityById
);

export const selectCartItems = createSelector(
  [selectCartState],
  (cart: CartState) => cart.items
);
export const selectCartDiscount = createSelector(
  [selectCartState],
  (cart: CartState) => cart.discount
);
export const selectCartItemQuantity = (state: RootState, productId: number) =>
  state.cart.quantityById?.[productId] ?? 0;
export const makeSelectCartItemQuantity = (productId: number) =>
  createSelector(
    [selectCartQuantityById],
    (quantityById: Record<string | number, number>) => quantityById?.[productId] ?? 0
  );
export const selectCartCount = createSelector([selectCartItems], (items: CartItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0)
);
export const selectCartSubtotal = createSelector([selectCartItems], (items: CartItem[]) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)
);
export const selectFinalTotal = createSelector(
  [selectCartSubtotal, selectCartDiscount],
  (subtotal, discount) => subtotal - (subtotal * discount) / 100
);
