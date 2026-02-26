import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductSection({ isTopSeller, isNewProduct }: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [viewAll, setViewAll] = useState(false);

  const apiUrl = isTopSeller
    ? "/products?isTopSeller=true"
    : isNewProduct
      ? "/products?isNewProduct=true"
      : "/products";

  const title = isTopSeller
    ? "Best Sellers"
    : isNewProduct
      ? "New Arrivals"
      : "Featured Products";

  useEffect(() => {
    const BASE_URL = "http://localhost:3001";
    fetch(`${BASE_URL}${apiUrl}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

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
