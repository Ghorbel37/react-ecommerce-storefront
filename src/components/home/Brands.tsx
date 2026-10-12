import { assetUrl } from "../../api/client";

const brands = [
  { id: 1, name: "Nokia", image: "/img/brand1.png" },
  { id: 2, name: "Canon", image: "/img/brand2.png" },
  { id: 3, name: "Samsung", image: "/img/brand3.png" },
  { id: 4, name: "Apple", image: "/img/brand4.png" },
  { id: 5, name: "HTC", image: "/img/brand5.png" },
  { id: 6, name: "LG", image: "/img/brand6.png" },
];

export default function Brands() {
  return (
    <section>
      <h2 className="text-stone-800 font-bold text-xl mb-4">Our Brands</h2>
      <div className="grid grid-cols-6 gap-4">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white border border-stone-200 rounded-xl flex items-center justify-center h-16 px-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <img
              src={assetUrl(brand.image)}
              alt={brand.name}
              className="max-h-10 max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}