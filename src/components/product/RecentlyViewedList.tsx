import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { apiFetch, productImageUrl } from "../../api/client";

const RECENTLY_VIEWED_KEY = "recentlyViewed";
const MAX_DISPLAY = 6;


export function addToRecentlyViewed(productId: number) {
  const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
  const ids: number[] = stored ? JSON.parse(stored) : [];
  const filtered = ids.filter((id) => id !== productId);
  filtered.unshift(productId);
  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(filtered.slice(0, MAX_DISPLAY)));
}

export default function RecentlyViewedList({ currentProductId }: { currentProductId: number }) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (!stored) return;
    const ids: number[] = JSON.parse(stored).filter((id: number) => id !== currentProductId);
    if (ids.length === 0) return;

    Promise.all(ids.slice(0, MAX_DISPLAY).map((id) => apiFetch(`/products/${id}`).then((r) => r.json())))
      .then((data) => setProducts(data.filter(Boolean)))
      .catch(() => {});
  }, [currentProductId]);

  if (products.length === 0) return null;

  return (
    <section>
      <h2 className="text-stone-800 font-bold text-lg mb-3">Recently Viewed</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {products.map((product) => {
          const discounted = product.discountRate
            ? product.price * (1 - product.discountRate / 100)
            : null;
          return (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="shrink-0 w-36 bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="h-28 bg-stone-100 flex items-center justify-center overflow-hidden">
                {product.imageName ? (
                  <img
                    src={productImageUrl(product.categoryName, product.imageName)}
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
