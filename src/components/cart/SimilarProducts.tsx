import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BrowseProductCard from "../browse/BrowseProductCard";

const BASE_URL = "http://localhost:3001";

export default function SimilarProducts() {
  const items = useSelector((state: any) => state.cart.products);
  const [similar, setSimilar] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      setSimilar([]);
      return;
    }

    // Collect unique categoryNames from cart items
    const categoryNames: string[] = Array.from(new Set<string>(items.map((i: any) => i.categoryName).filter(Boolean)));
    const cartProductIds = new Set(items.map((i: any) => i.id));

    setLoading(true);

    // Fetch products for each category and merge
    Promise.all(
      categoryNames.map((name) =>
        fetch(`${BASE_URL}/products?categoryName=${encodeURIComponent(name)}&_limit=10`)
          .then((r) => r.json())
      )
    )
      .then((results) => {
        const all: any[] = results.flat();
        // Deduplicate and exclude items already in cart
        const seen = new Set<number>();
        const filtered = all.filter((p) => {
          if (cartProductIds.has(p.id) || seen.has(p.id)) return false;
          seen.add(p.id);
          return true;
        });
        setSimilar(filtered.slice(0, 4));
      })
      .catch(() => setSimilar([]))
      .finally(() => setLoading(false));
  }, [items]);

  if (items.length === 0 || (similar.length === 0 && !loading)) return null;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-stone-800 mb-4">You Might Also Like</h2>

      {loading ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="min-w-50 h-64 bg-stone-200 animate-pulse rounded-xl shrink-0" />
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
          {similar.map((product) => (
            <div key={product.id} className="min-w-50 shrink-0 snap-start">
              <BrowseProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
