import { TrashIcon, PhotoIcon } from "@heroicons/react/24/outline";
import type { CartItem } from "../../store/cartSlice";

type Props = {
  item: CartItem;
  onQtyChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
};

export default function CartProductRow({ item, onQtyChange, onRemove }: Props) {
  const lineTotal = (item.price * item.quantity).toFixed(2);

  return (
    <li className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-4">
      {/* Product */}
      <div className="flex items-center gap-3 min-w-0">
        {item.imageName && item.categoryName ? (
          <img
            src={`http://localhost:5173/products-img/${item.categoryName}/${item.imageName}`}
            alt={item.name}
            className="h-16 w-16 object-cover rounded-lg border border-stone-200 shrink-0"
          />
        ) : (
          <div className="h-16 w-16 bg-stone-100 rounded-lg flex items-center justify-center shrink-0">
            <PhotoIcon className="h-8 w-8 text-stone-300" />
          </div>
        )}
        <p className="text-sm font-medium text-stone-800 line-clamp-2">{item.name}</p>
      </div>

      {/* Unit Price */}
      <p className="text-sm text-stone-600 md:text-right">
        <span className="md:hidden text-xs text-stone-400 mr-1">Unit:</span>
        ${item.price.toFixed(2)}
      </p>

      {/* Qty stepper */}
      <div className="flex items-center md:justify-center gap-1">
        <button
          onClick={() => onQtyChange(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="h-7 w-7 flex items-center justify-center rounded-md border border-stone-300 text-stone-600 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          −
        </button>
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) => onQtyChange(item.id, parseInt(e.target.value) || 1)}
          className="w-12 text-center border border-stone-300 rounded-md text-sm py-0.5 focus:outline-none focus:ring-1 focus:ring-amber-400"
        />
        <button
          onClick={() => onQtyChange(item.id, item.quantity + 1)}
          className="h-7 w-7 flex items-center justify-center rounded-md border border-stone-300 text-stone-600 hover:bg-stone-100 transition"
        >
          +
        </button>
      </div>

      {/* Line total */}
      <p className="text-sm font-semibold text-amber-500 md:text-right">
        <span className="md:hidden text-xs text-stone-400 mr-1 font-normal">Total:</span>
        ${lineTotal}
      </p>

      {/* Remove */}
      <button
        onClick={() => onRemove(item.id)}
        className="text-stone-400 hover:text-red-500 transition-colors self-center"
        aria-label="Remove item"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </li>
  );
}
