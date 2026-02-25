import { NavLink } from "react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/browse", label: "Browse" },
  { to: "/cart", label: "Cart" },
  { to: "/checkout", label: "Checkout" },
];

export default function Navbar() {
  return (
    <nav className="max-w-5xl mx-auto flex gap-6 text-sm font-medium pb-3 border-t border-stone-700 pt-3">
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive ? "text-amber-400" : "hover:text-stone-300 transition-colors"
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
