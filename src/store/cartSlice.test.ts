import { beforeEach, describe, expect, it } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { actions } from "./cartSlice";
import type { Product } from "./cartSlice";
import { apiFetch } from "../api/client";

const phone: Product = {
  id: 1,
  name: "Test phone",
  imageName: "phone.jpg",
  price: 100,
  discountRate: 10,
  categoryId: "100",
  categoryName: "Apple",
  type: "phone",
  description: "",
  inStock: true,
  isTopSeller: false,
  isNewProduct: false,
};
const tablet: Product = { ...phone, id: 2, name: "Test tablet", price: 300, discountRate: 0 };

function makeStore() {
  return configureStore({ reducer: { cart: cartReducer } });
}

async function savedCart(store: ReturnType<typeof makeStore>) {
  const res = await apiFetch(`/carts/${store.getState().cart.cartId}`);
  return res.json();
}

describe("cart", () => {
  beforeEach(() => localStorage.clear());

  it("creates a cart on the first add and remembers its id", async () => {
    const store = makeStore();
    await store.dispatch(actions.addToCart(phone));

    const { cartId, products } = store.getState().cart;
    expect(cartId).toBeTruthy();
    expect(localStorage.getItem("cartId")).toBe(cartId);
    expect(products).toEqual([{ ...phone, quantity: 1 }]);
  });

  it("increments the quantity when the same product is added again", async () => {
    const store = makeStore();
    await store.dispatch(actions.addToCart(phone));
    await store.dispatch(actions.addToCart(phone));
    await store.dispatch(actions.addToCart(tablet));

    const quantities = store.getState().cart.products.map((p) => [p.id, p.quantity]);
    expect(quantities).toEqual([[1, 2], [2, 1]]);
  });

  it("updates quantities but never below 1", async () => {
    const store = makeStore();
    await store.dispatch(actions.addToCart(phone));
    await store.dispatch(actions.updateQuantity({ id: 1, quantity: 5 }));
    expect(store.getState().cart.products[0].quantity).toBe(5);

    await store.dispatch(actions.updateQuantity({ id: 1, quantity: 0 }));
    expect(store.getState().cart.products[0].quantity).toBe(1);
  });

  it("removes a product", async () => {
    const store = makeStore();
    await store.dispatch(actions.addToCart(phone));
    await store.dispatch(actions.addToCart(tablet));
    await store.dispatch(actions.removeFromCart(1));

    expect(store.getState().cart.products.map((p) => p.id)).toEqual([2]);
  });

  it("saves every change to the API", async () => {
    const store = makeStore();
    await store.dispatch(actions.addToCart(phone));
    await store.dispatch(actions.updateQuantity({ id: 1, quantity: 3 }));

    const cart = await savedCart(store);
    expect(cart.products).toEqual([{ ...phone, quantity: 3 }]);
  });

  it("restores the saved cart on a new visit", async () => {
    const first = makeStore();
    await first.dispatch(actions.addToCart(tablet));

    const second = makeStore();
    await second.dispatch(actions.initCart());
    expect(second.getState().cart.products).toEqual([{ ...tablet, quantity: 1 }]);
  });

  it("forgets a stored cart id that no longer exists", async () => {
    localStorage.setItem("cartId", "missing");
    const store = makeStore();
    await store.dispatch(actions.initCart());

    expect(localStorage.getItem("cartId")).toBeNull();
    expect(store.getState().cart.products).toEqual([]);
  });

  it("clears the cart and deletes it from the API", async () => {
    const store = makeStore();
    await store.dispatch(actions.addToCart(phone));
    const id = store.getState().cart.cartId;
    await store.dispatch(actions.clearCart());

    expect(store.getState().cart).toEqual({ cartId: null, products: [] });
    expect(localStorage.getItem("cartId")).toBeNull();
    expect((await apiFetch(`/carts/${id}`)).status).toBe(404);
  });
});
