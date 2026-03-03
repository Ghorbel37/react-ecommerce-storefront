import { NavLink, useRouteLoaderData, useSearchParams } from "react-router";

const staticLinks = [
  { to: "/", label: "Home" },
  { to: "/browse", label: "All Products" }
];

export default function Navbar() {
  const categories: any[] = useRouteLoaderData("shop-layout") ?? [];
  const searchParams = useSearchParams()[0];
  const activeCategoryId = searchParams.get("categoryId");

  const activeClass = "text-amber-400";
  const inactiveClass = "hover:text-stone-300 transition-colors";

  return (
    <nav className="max-w-5xl mx-auto flex items-center gap-6 text-sm font-medium pb-3 border-t border-stone-700 pt-3 flex-wrap">
      {/* Static links */}
      {staticLinks.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          // For /browse, only highlight when there's no categoryId filter active
          className={({ isActive }) => isActive && !activeCategoryId ? activeClass : inactiveClass}
        >
          {label}
        </NavLink>
      ))}

      {/* Divider */}
      {categories?.length > 0 && (
        <span className="text-stone-600 select-none">|</span>
      )}

      {/* Category links */}
      {categories?.map((cat) => (
        <NavLink
          key={cat.id}
          to={`/browse?categoryId=${cat.id}`}
          className={String(cat.id) === activeCategoryId ? activeClass : inactiveClass}
        >
          {cat.name}
        </NavLink>
      ))}
    </nav>
  );
}

