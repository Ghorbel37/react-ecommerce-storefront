import { StarIcon } from "@heroicons/react/24/solid";

export default function ProductCard({ product }: { product: any }) {
  const discountedPrice = product.discountRate
    ? product.price * (1 - product.discountRate / 100)
    : null;

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex gap-3 p-3">
      {/* Image */}
      <div className="w-20 h-20 shrink-0 bg-stone-100 rounded-lg flex items-center justify-center overflow-hidden">
        <img
          src={`http://localhost:5173/produts-img/${product.categoryName}/${product.imageName}`}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <p className="text-stone-800 text-sm font-medium leading-snug line-clamp-2">
          {product.name}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-0.5 mt-1">
          {Array.from({ length: 5 }).map((_, i) =>
            i < product.review! ? (
              <StarIcon key={i} className="h-3.5 w-3.5 text-amber-400" />
            ) : (
              <StarIcon key={i} className="h-3.5 w-3.5 text-stone-300" />
            )
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          {discountedPrice !== null ? (
            <>
              <span className="text-amber-500 font-bold text-sm">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-stone-400 line-through text-xs">
                ${product.price.toFixed(2)}
              </span>
              <span className="bg-amber-100 text-amber-600 text-xs font-semibold px-1.5 py-0.5 rounded">
                -{product.discountRate}%
              </span>
            </>
          ) : (
            <span className="text-amber-500 font-bold text-sm">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
