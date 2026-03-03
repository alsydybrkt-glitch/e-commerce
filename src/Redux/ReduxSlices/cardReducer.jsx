import { createSlice } from "@reduxjs/toolkit";
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

export const cardSlice = createSlice({
  name: "cardReducer",

  initialState: {
    cards: savedCart,
    discount: 0, 
  },

  reducers: {

    add: (state, action) => {
      const product = action.payload;
      state.cards.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(state.cards));
    },
    increaseQty(state, action) {
      const id = action.payload;
      const item = state.cards.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQty(state, action) {
      const id = action.payload;
      const item = state.cards.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    applyDiscount(state, action) {
      state.discount = action.payload;
    },

    remove: (state, action) => {
      const id = action.payload;

      const exist = state.cards.find((item) => item.id === id);

      if (exist && exist.quantity > 1) {
        exist.quantity -= 1;
      } else {
        state.cards = state.cards.filter((item) => item.id !== id);
      }

      localStorage.setItem("cart", JSON.stringify(state.cards));
    },
    resetCart: (state) => {
      state.cards = [];
      localStorage.removeItem("cart");
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
} = cardSlice.actions;


export default cardSlice.reducer;

export const selectCartTotal = (state) => {
  state.cardReducer.cards.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};
export const selectFinalTotal = (state) => {
  const total = state.cardReducer.cards.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = state.cardReducer.discount;
  return total - (total * discount) / 100;
};
export const selectCartItems = (state) => state.cardReducer.cards;

export const selectCartCount = (state) =>
  state.cardReducer.cards.reduce((total, item) => total + item.quantity, 0);
