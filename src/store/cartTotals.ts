export const TAX_RATE = 0.2;

type PricedItem = { price: number; discountRate?: number; quantity: number };

export function cartTotals(items: PricedItem[]) {
  let itemCount = 0;
  let originalSubtotal = 0;
  let subtotal = 0;
  for (const item of items) {
    itemCount += item.quantity;
    originalSubtotal += item.price * item.quantity;
    subtotal += item.price * (1 - (item.discountRate ?? 0) / 100) * item.quantity;
  }
  const tax = subtotal * TAX_RATE;
  return { itemCount, subtotal, discount: originalSubtotal - subtotal, tax, total: subtotal + tax };
}
