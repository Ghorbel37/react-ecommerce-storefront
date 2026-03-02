import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon, PhotoIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../../store/cartSlice";

export default function BrowseProductCard({ product }: any) {
  const dispatch = useDispatch();

  const discountedPrice = product.discountRate
    ? product.price * (1 - product.discountRate / 100)
    : null;

  function handleAddToCart() {
    dispatch(actions.addToCart(product));
  }

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <Link to={`/product/${product.id}`} className="flex flex-col flex-1">
      {/* Image */}
      <div className="relative h-48 bg-stone-100 flex items-center justify-center overflow-hidden">
        {product.imageName ? (
          <img
            src={`http://localhost:5173/products-img/${product.categoryName}/${product.imageName}`}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <PhotoIcon className="h-16 w-16 text-stone-300" />
        )}
        {product.discountRate && (
          <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            -{product.discountRate}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-stone-800 text-sm font-medium leading-snug line-clamp-2">
          {product.name}
        </p>

        {/* Stars */}
        {product.review !== undefined && (
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) =>
              i < product.review! ? (
                <StarIcon key={i} className="h-3.5 w-3.5 text-amber-400" />
              ) : (
                <StarOutlineIcon key={i} className="h-3.5 w-3.5 text-stone-300" />
              )
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto">
          {discountedPrice !== null ? (
            <>
              <span className="text-amber-500 font-bold">${discountedPrice.toFixed(2)}</span>
              <span className="text-stone-400 line-through text-xs">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-amber-500 font-bold">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
      </Link>

        {/* Add to cart */}
        <div className="px-4 pb-4">
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-stone-500 hover:bg-amber-500 active:scale-95 transition-all text-white text-sm font-semibold rounded-lg py-2"
          >
            <ShoppingCartIcon className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
    </div>
  );
}
