import { createSlice } from "@reduxjs/toolkit";

// --- State ---

const initialState: { cartId: string | null; products: any[] } = {
  cartId: null,
  products: [],
};

// --- Slice ---

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart (state, action) {
      state.cartId = action.payload;
    },
    addToCart(state, action) {
      const existing = state.products.find((i: any) => i.productId === action.payload.productId);
      if (existing) {
        existing.quantity += action.payload.quantity ?? 1;
      } else {
        state.products.push({ ...action.payload, quantity: action.payload.quantity ?? 1 });
      }
    },
    removeFromCart(state, action) {
      state.products = state.products.filter((i: any) => i.productId !== action.payload);
    },
    updateQuantity(state, action: { payload: { productId: any; quantity: number } }) {
      const item = state.products.find((i: any) => i.productId === action.payload.productId);
      if (item)
        item.quantity = Math.max(1, action.payload.quantity);
    },
    clearCart(state) {
      state.cartId = null;
      state.products = [];
    },
  },
});


export const actions = cartSlice.actions;
export default cartSlice.reducer;
