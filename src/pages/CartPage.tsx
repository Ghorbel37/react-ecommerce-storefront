import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import CartProductsTable from "../components/cart/CartProductsTable";
import CartTotalsTable from "../components/cart/CartTotalsTable";
import SimilarProducts from "../components/cart/SimilarProducts";

export default function CartPage() {
  const items = useSelector((state: any) => state.cart.products);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-800 mb-6">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-stone-400">
          <ShoppingBagIcon className="h-16 w-16" />
          <p className="text-xl font-semibold">Your cart is empty</p>
          <Link
            to="/browse"
            className="mt-2 bg-amber-500 hover:bg-amber-400 transition-colors text-white font-semibold rounded-full px-6 py-2 text-sm"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
          {/* Left: product table */}
          <CartProductsTable />

          {/* Right: totals (sticky) */}
          <CartTotalsTable />
        </div>
      )}

      {/* Similar products */}
      <SimilarProducts />
    </div>
  );
}
