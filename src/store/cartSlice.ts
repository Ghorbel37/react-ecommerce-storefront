import { createSlice } from "@reduxjs/toolkit";

// --- Types ---

export type Product = {
  id: number;
  name: string;
  imageName: string;
  price: number;
  discountRate?: number;
  review?: number;
  categoryId: string;
  categoryName: string;
  type: string;
  description: string;
  inStock: boolean;
  isTopSeller: boolean;
  isNewProduct: boolean;
};

export type CartItem = Product & { quantity: number };

// --- State ---

const initialState: { cartId: string | null; products: CartItem[] } = {
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
    addToCart(state, action: { payload: Product }) {
      const existing = state.products.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: { payload: number }) {
      state.products = state.products.filter((i) => i.id !== action.payload);
    },
    updateQuantity(state, action: { payload: { id: number; quantity: number } }) {
      const item = state.products.find((i) => i.id === action.payload.id);
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
