import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TAX_RATE = 0.2;

export default function CartTotalsTable() {
  const items = useSelector((state: any) => state.cart.products);

  const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden sticky top-24">
      <div className="px-6 py-4 border-b border-stone-100">
        <h2 className="text-lg font-semibold text-stone-800">Order Summary</h2>
      </div>

      <div className="px-6 py-4 flex flex-col gap-3">
        <div className="flex justify-between text-sm text-stone-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-stone-600">
          <span>Tax (20%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-stone-100 pt-3 flex justify-between text-base font-semibold text-stone-800">
          <span>Total</span>
          <span className="text-amber-500">${total.toFixed(2)}</span>
        </div>

        <Link
          to="/checkout"
          className={`mt-2 w-full flex items-center justify-center bg-amber-500 hover:bg-amber-400 active:scale-95 transition-all text-white font-semibold rounded-lg py-3 text-sm ${
            items.length === 0 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Proceed to Checkout
        </Link>

        <Link
          to="/browse"
          className="text-center text-sm text-stone-400 hover:text-stone-600 transition-colors"
        >
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}
