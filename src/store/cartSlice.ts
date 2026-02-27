import { createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3001";
const CART_ID_KEY = "cartId";

const storedCartId = localStorage.getItem(CART_ID_KEY);

const initialState = {
  cartId: storedCartId,
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state : any, action) {
      const existing = state.items.find((i : any) => i.productId === action.payload.productId);
      if (existing) {
        existing.quantity += action.payload.quantity ?? 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity ?? 1 });
      }   
    },
    checkoutWithCart(state) {
      state.cartId = null;
      state.items = [];
      localStorage.removeItem(CART_ID_KEY);
    }
  }
});

export default cartSlice.reducer;
