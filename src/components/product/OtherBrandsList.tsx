import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/outline";

const BASE_URL = "http://localhost:3001";

export default function OtherBrandsList({ categoryName, currentProductId }: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryName) return;
    fetch(`${BASE_URL}/products?categoryName=${encodeURIComponent(categoryName)}&_limit=7`)
      .then((r) => r.json())
      .then((data: any[]) => setProducts(data.filter((p) => p.id !== currentProductId).slice(0, 6)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [categoryName, currentProductId]);

  if (!loading && products.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-stone-800 font-bold text-lg">More from {categoryName}</h2>
        <Link
          to={`/browse?categoryName=${encodeURIComponent(categoryName)}`}
          className="text-amber-500 hover:text-amber-400 text-sm font-medium transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-stone-200 animate-pulse rounded-xl h-36" />
            ))
          : products.map((product) => {
              const discounted = product.discountRate
                ? product.price * (1 - product.discountRate / 100)
                : null;
              return (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="h-24 bg-stone-100 flex items-center justify-center overflow-hidden">
                    {product.imageName ? (
                      <img
                        src={`http://localhost:5173/products-img/${product.categoryName}/${product.imageName}`}
                        alt={product.name}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <PhotoIcon className="h-8 w-8 text-stone-300" />
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-stone-700 text-xs font-medium line-clamp-2">{product.name}</p>
                    <p className="text-amber-500 font-bold text-xs mt-1">
                      ${(discounted ?? product.price).toFixed(2)}
                    </p>
                  </div>
                </Link>
              );
            })}
      </div>
    </section>
  );
}
