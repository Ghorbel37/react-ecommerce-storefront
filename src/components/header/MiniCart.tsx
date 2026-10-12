import { NavLink } from "react-router";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { cartTotals } from "../../store/cartTotals";

export default function MiniCart() {
  const items = useSelector((state: any) => state.cart.products);
  const { itemCount, total: totalWithTax } = cartTotals(items);

  return (
    <>
      <style>{`
        @keyframes minicart-pop {
          0%   { opacity: 0; transform: scale(0.6) translateY(-4px); }
          70%  { transform: scale(1.15) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .minicart-pop {
          animation: minicart-pop 0.25s ease-out both;
        }
      `}</style>
      <NavLink
        to="/cart"
        className="shrink-0 relative flex items-center gap-2 hover:text-stone-300 transition-colors"
        aria-label="Cart"
      >
        <div className="relative">
          <ShoppingCartIcon className="h-7 w-7" />
          {itemCount > 0 && (
            <span
              key={itemCount}
              className="minicart-pop absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center"
            >
              {itemCount}
            </span>
          )}
        </div>
        <span
          key={totalWithTax.toFixed(2)}
          className="minicart-pop text-sm font-semibold text-white"
        >
          {itemCount > 0 ? `$${totalWithTax.toFixed(2)}` : "$0.00"}
        </span>
      </NavLink>
    </>
  );
}
