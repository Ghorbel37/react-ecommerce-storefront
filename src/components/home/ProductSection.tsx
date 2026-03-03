import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const BASE_URL = "http://localhost:3001";
const RECENTLY_VIEWED_KEY = "recentlyViewed";

export default function ProductSection({ isTopSeller, isNewProduct, isRecent }: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [viewAll, setViewAll] = useState(false);

  const title = isTopSeller
    ? "Best Sellers"
    : isNewProduct
      ? "New Arrivals"
      : isRecent
        ? "Recently Viewed"
        : "Featured Products";

  useEffect(() => {
    if (isRecent) {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (!stored) return;
      const ids: number[] = JSON.parse(stored);
      if (ids.length === 0) return;
      Promise.all(ids.slice(0, 10).map((id) => fetch(`${BASE_URL}/products/${id}`).then((r) => r.json())))
        .then((data) => setProducts(data.filter(Boolean)))
        .catch(() => setProducts([]));
      return;
    }

    const apiUrl = isTopSeller
      ? "/products?isTopSeller=true"
      : isNewProduct
        ? "/products?isNewProduct=true"
        : "/products";

    fetch(`${BASE_URL}${apiUrl}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, [isRecent, isTopSeller, isNewProduct]);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-stone-800 font-bold text-xl">{title}</h2>
        <button
          onClick={() => setViewAll((v) => !v)}
          className="text-sm text-amber-500 hover:text-amber-400 transition-colors"
        >
          {viewAll ? "View Less" : "View All"}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {/* Always visible first 2 products */}
        {products.slice(0, 2).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {/* Animated expanding section for remaining products */}
        {products.length > 2 && (
          <div
            className={`grid grid-cols-1 gap-4 overflow-hidden transition-all duration-500 ease-in-out ${viewAll ? "max-h-500 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            {products.slice(2, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
