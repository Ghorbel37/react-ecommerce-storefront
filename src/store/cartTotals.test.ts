import { describe, expect, it } from "vitest";
import { cartTotals } from "./cartTotals";

describe("cartTotals", () => {
  it("is all zero for an empty cart", () => {
    expect(cartTotals([])).toEqual({ itemCount: 0, subtotal: 0, discount: 0, tax: 0, total: 0 });
  });

  it("applies discounts per item and 20% tax on the discounted subtotal", () => {
    const totals = cartTotals([
      { price: 100, discountRate: 10, quantity: 2 }, // 180 after discount
      { price: 50, quantity: 1 }, // no discount
    ]);
    expect(totals.itemCount).toBe(3);
    expect(totals.subtotal).toBeCloseTo(230);
    expect(totals.discount).toBeCloseTo(20);
    expect(totals.tax).toBeCloseTo(46);
    expect(totals.total).toBeCloseTo(276);
  });
});
