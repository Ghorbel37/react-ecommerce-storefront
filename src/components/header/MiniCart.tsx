import { NavLink } from "react-router";

export default function MiniCart() {
  const itemCount = 0;

  return (
    <NavLink
      to="/cart"
      className="shrink-0 relative hover:text-stone-300 transition-colors"
      aria-label="Cart"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13L5.4 5M10 21a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm7 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"
        />
      </svg>
      <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
        {itemCount}
      </span>
    </NavLink>
  );
}
