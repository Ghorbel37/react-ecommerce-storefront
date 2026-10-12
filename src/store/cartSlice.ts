import { createSlice } from "@reduxjs/toolkit";
import type { Dispatch } from "@reduxjs/toolkit";
import { apiFetch } from "../api/client";

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

type CartState = { cart: { cartId: string | null; products: CartItem[] } };

// --- Constants ---

const CART_ID_KEY = "cartId";

// --- API helpers ---

async function apiCreateCart(): Promise<{ id: string; products: CartItem[] }> {
  const res = await apiFetch(`/carts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ products: [] }),
  });
  return res.json();
}

async function apiFetchCart(id: string): Promise<{ id: string; products: CartItem[] }> {
  const res = await apiFetch(`/carts/${id}`);
  if (!res.ok) throw new Error("Cart not found");
  return res.json();
}

async function apiPutCart(id: string, products: CartItem[]): Promise<void> {
  await apiFetch(`/carts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, products }),
  });
}

async function apiDeleteCart(id: string): Promise<void> {
  await apiFetch(`/carts/${id}`, { method: "DELETE" });
}

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
    _setCartState(state, action: { payload: { id: string; products: CartItem[] } }) {
      state.cartId = action.payload.id;
      state.products = action.payload.products;
    },
    _addToCart(state, action: { payload: Product }) {
      const existing = state.products.find((i) => i.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.products.push({ ...action.payload, quantity: 1 });
    },
    _removeFromCart(state, action: { payload: number }) {
      state.products = state.products.filter((i) => i.id !== action.payload);
    },
    _updateQuantity(state, action: { payload: { id: number; quantity: number } }) {
      const item = state.products.find((i) => i.id === action.payload.id);
      if (item) item.quantity = Math.max(1, action.payload.quantity);
    },
    _clearCart(state) {
      state.cartId = null;
      state.products = [];
    },
  },
});

const { _setCartState, _addToCart, _removeFromCart, _updateQuantity, _clearCart } =
  cartSlice.actions;

// --- Thunk helpers ---

type GetState = () => CartState;

async function getOrCreateCartId(dispatch: Dispatch, getState: GetState): Promise<string> {
  const existing = getState().cart.cartId;
  if (existing) {
    return existing;
  }

  const stored = localStorage.getItem(CART_ID_KEY);
  if (stored) {
    try {
      const cart = await apiFetchCart(stored);
      dispatch(_setCartState(cart));
      return cart.id;
    } catch {
      localStorage.removeItem(CART_ID_KEY);
    }
  }

  const cart = await apiCreateCart();
  localStorage.setItem(CART_ID_KEY, cart.id);
  dispatch(_setCartState(cart));
  return cart.id;
}

// --- Thunks ---

export const initCart = () => async (dispatch: Dispatch) => {
  const stored = localStorage.getItem(CART_ID_KEY);
  if (!stored) return;
  try {
    const cart = await apiFetchCart(stored);
    dispatch(_setCartState(cart));
  } catch {
    localStorage.removeItem(CART_ID_KEY);
  }
};

export const addToCart = (product: Product) => async (dispatch: Dispatch, getState: GetState) => {
  const cartId = await getOrCreateCartId(dispatch, getState);
  dispatch(_addToCart(product));
  const products = getState().cart.products;
  await apiPutCart(cartId, products);
};

export const removeFromCart = (id: number) => async (dispatch: Dispatch, getState: GetState) => {
  const cartId = getState().cart.cartId!;
  dispatch(_removeFromCart(id));
  const products = getState().cart.products;
  await apiPutCart(cartId, products);
};

export const updateQuantity =
  (payload: { id: number; quantity: number }) =>
  async (dispatch: Dispatch, getState: GetState) => {
    const cartId = getState().cart.cartId!;
    dispatch(_updateQuantity(payload));
    const products = getState().cart.products;
    await apiPutCart(cartId, products);
  };

export const clearCart = () => async (dispatch: Dispatch, getState: GetState) => {
  const cartId = getState().cart.cartId;
  if (cartId) {
    await apiDeleteCart(cartId);
    localStorage.removeItem(CART_ID_KEY);
  }
  dispatch(_clearCart());
};

export const actions = { initCart, addToCart, removeFromCart, updateQuantity, clearCart };
export default cartSlice.reducer;
