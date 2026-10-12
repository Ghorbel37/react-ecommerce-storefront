import { useSelector } from "react-redux";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { productImageUrl } from "../../api/client";
import { cartTotals } from "../../store/cartTotals";

export default function OrderReview() {
  const items = useSelector((state: any) => state.cart.products);
  const { subtotal, discount: totalDiscount, tax, total } = cartTotals(items);

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-stone-100">
        <h2 className="text-base font-semibold text-stone-800">Order Review</h2>
      </div>

      <ul className="divide-y divide-stone-100">
        {items.map((item: any) => (
          <li key={item.id} className="flex items-center gap-3 px-6 py-3">
            {item.imageName && item.categoryName ? (
              <img
                src={productImageUrl(item.categoryName, item.imageName)}
                alt={item.name}
                className="h-12 w-12 object-cover rounded-lg border border-stone-200 shrink-0"
              />
            ) : (
              <div className="h-12 w-12 bg-stone-100 rounded-lg flex items-center justify-center shrink-0">
                <PhotoIcon className="h-6 w-6 text-stone-300" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-800 line-clamp-1">{item.name}</p>
              <p className="text-xs text-stone-400">x{item.quantity}</p>
            </div>
            <div className="text-right shrink-0">
              {(item.discountRate ?? 0) > 0 && (
                <p className="text-xs line-through text-stone-400">${(item.price * item.quantity).toFixed(2)}</p>
              )}
              <p className="text-sm font-semibold text-amber-500">
                ${(item.price * (1 - (item.discountRate ?? 0) / 100) * item.quantity).toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="px-6 py-4 border-t border-stone-100 flex flex-col gap-2">
        <div className="flex justify-between text-sm text-stone-500">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {totalDiscount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>-${totalDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm text-stone-500">
          <span>Tax (20%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-bold text-stone-800 pt-2 border-t border-stone-100">
          <span>Total</span>
          <span className="text-amber-500">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
