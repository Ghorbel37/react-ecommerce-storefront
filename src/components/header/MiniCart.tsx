import { NavLink } from "react-router";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function MiniCart() {
  const itemCount = 0;

  return (
    <NavLink
      to="/cart"
      className="shrink-0 relative hover:text-stone-300 transition-colors"
      aria-label="Cart"
    >
      <ShoppingCartIcon className="h-7 w-7" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </NavLink>
  );
}
