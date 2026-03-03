import { Link, useRouteLoaderData } from "react-router-dom";

export default function FooterCategories() {
  const categories : any[] = useRouteLoaderData("shop-layout") ?? [];
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-white font-bold text-lg">Categories</h3>
      <ul className="flex flex-col gap-2 text-sm">
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link to={`/browse/?categoryId=${cat.id}`} className="hover:text-white transition-colors">
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
