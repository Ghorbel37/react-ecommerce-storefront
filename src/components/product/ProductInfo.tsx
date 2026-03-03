import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { actions } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";

export default function ProductInfo({ product }: any) {
  const dispatch = useDispatch<AppDispatch>();

  const discountedPrice = product.discountRate
    ? product.price * (1 - product.discountRate / 100)
    : null;

  function handleAddToCart() {
    dispatch(actions.addToCart(product));
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Title */}
      <h1 className="text-2xl font-bold text-stone-800 leading-snug">{product.name}</h1>

      {/* Stars */}
      {product.review !== undefined && (
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) =>
            i < product.review! ? (
              <StarIcon key={i} className="h-5 w-5 text-amber-400" />
            ) : (
              <StarOutlineIcon key={i} className="h-5 w-5 text-stone-300" />
            )
          )}
          <span className="text-stone-500 text-sm ml-1">({product.review}/5)</span>
        </div>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-3">
        {discountedPrice !== null ? (
          <>
            <span className="text-3xl font-bold text-amber-500">${discountedPrice.toFixed(2)}</span>
            <span className="text-stone-400 line-through text-lg">${product.price.toFixed(2)}</span>
            <span className="bg-amber-100 text-amber-600 text-sm font-bold px-2 py-0.5 rounded">
              -{product.discountRate}%
            </span>
          </>
        ) : (
          <span className="text-3xl font-bold text-amber-500">${product.price.toFixed(2)}</span>
        )}
      </div>

      {/* Description */}
      {product.description && (
        <p className="text-stone-600 text-sm leading-relaxed">{product.description}</p>
      )}

      <hr className="border-stone-200" />

      {/* Add to cart */}
      <button
        onClick={handleAddToCart}
        className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-95 transition-all text-white font-semibold rounded-xl py-3 px-6 text-base"
      >
        <ShoppingCartIcon className="h-5 w-5" />
        Add to Cart
      </button>
    </div>
  );
}
