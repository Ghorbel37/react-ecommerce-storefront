import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BrowseProductCard from "../components/browse/BrowseProductCard";
import Pagination from "../components/browse/Pagination";

const PAGE_SIZE = 12;
const BASE_URL = "http://localhost:3001";

export default function BrowsePage() {
  const searchParams = useSearchParams()[0];
  const category = searchParams.get("categoryId") ?? "";
  const q = searchParams.get("q") ?? "";

  const [products, setProducts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [category, q]);

  useEffect(() => {
    setLoading(true);
    // Build query params
    const params = new URLSearchParams();
    if (category) params.set("categoryId", category);
    if (q) params.set("q", q);
    params.set("_page", String(page));
    params.set("_limit", String(PAGE_SIZE));

    // Fetch products with pagination
    fetch(`${BASE_URL}/products?${params.toString()}`)
      .then((res) => {
        const total = res.headers.get("X-Total-Count");
        setTotalCount(total ? parseInt(total) : 0);
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category, q, page]);


  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  function handlePageChange(newPage: number) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-800">
          {category ? `Category: ${category}` : q ? `Results for "${q}"` : "All Products"}
        </h1>
        {!loading && (
          <p className="text-stone-500 text-sm mt-1">{totalCount} product{totalCount !== 1 ? "s" : ""} found</p>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="bg-stone-200 animate-pulse rounded-xl h-64" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-stone-400 gap-2">
          <p className="text-xl font-semibold">No products found</p>
          <p className="text-sm">Try a different search</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <BrowseProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}