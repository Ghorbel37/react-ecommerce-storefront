import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecentlyViewedList, { addToRecentlyViewed } from "../components/product/RecentlyViewedList";
import ImageGallery from "../components/product/ImageGallery";
import ProductInfo from "../components/product/ProductInfo";
import OtherBrandsList from "../components/product/OtherBrandsList";
import { apiFetch } from "../api/client";


export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(false);
    apiFetch(`/products/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setProduct(data);
        addToRecentlyViewed(data.id);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="py-16 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-16 text-center text-stone-500">
        <p className="text-xl font-bold">Product not found</p>
        <p className="text-sm mt-2">The product you are looking for does not exist.</p>
      </div>
    );
  }

  const images = product.images && product.images.length > 0
    ? product.images
    : product.imageName
    ? [product.imageName]
    : [];

  return (
    <div className="py-8 flex flex-col gap-10">
      {/* Recently Viewed */}
      <RecentlyViewedList currentProductId={product.id} />

      {/* Main content: gallery + info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <ImageGallery
          images={images}
          productName={product.name}
          categoryName={product.categoryName}
        />
        <ProductInfo product={product} />
      </div>

      {/* Other products from same category */}
      <OtherBrandsList categoryName={product.categoryName} currentProductId={product.id} />
    </div>
  );
}