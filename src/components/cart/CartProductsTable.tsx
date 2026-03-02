import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/cartSlice";
import CartProductRow from "./CartProductRow";

export default function CartProductsTable() {
  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.cart.products);

  function handleQtyChange(id: number, quantity: number) {
    if (quantity < 1) return;
    dispatch(actions.updateQuantity({ id, quantity }));
  }

  function handleRemove(id: number) {
    dispatch(actions.removeFromCart(id));
  }

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-stone-100">
        <h2 className="text-lg font-semibold text-stone-800">
          Your Items <span className="text-stone-400 font-normal text-sm ml-1">({items.length})</span>
        </h2>
      </div>

      {/* Table header */}
      <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 bg-stone-50 text-xs font-semibold text-stone-500 uppercase tracking-wide">
        <span>Product</span>
        <span className="text-right">Unit Price</span>
        <span className="text-center">Quantity</span>
        <span className="text-right">Total</span>
        <span />
      </div>

      {/* Rows */}
      <ul className="divide-y divide-stone-100">
        {items.map((item: any) => (
          <CartProductRow
            key={item.id}
            item={item}
            onQtyChange={handleQtyChange}
            onRemove={handleRemove}
          />
        ))}
      </ul>
    </div>
  );
}
