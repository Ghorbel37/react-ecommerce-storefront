import Carousel from "../components/home/Carousel";
import Promo from "../components/home/Promo";
import Brands from "../components/home/Brands";
import ProductSection from "../components/home/ProductSection";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <Carousel />
      <Promo />
      <Brands />

      {/* Product sections in 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ProductSection />
        <ProductSection isTopSeller />
        <ProductSection isNewProduct />
      </div>
    </div>
  );
}