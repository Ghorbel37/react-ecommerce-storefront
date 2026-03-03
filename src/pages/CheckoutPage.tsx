import { useState } from "react";
import { Link, useNavigation, useActionData, redirect, useFetcher } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import AddressForm from "../components/checkout/AddressForm";
import OrderReview from "../components/checkout/OrderReview";
import PaymentMethods from "../components/checkout/PaymentMethods";
import PlaceOrderButton from "../components/checkout/PlaceOrderButton";
import { actions } from "../store/cartSlice";
import store from "../store/store";

const BASE_URL = "http://localhost:3001";
const TAX_RATE = 0.2;

export async function action({ request }: ActionFunctionArgs) {
  const items = store.getState().cart.products;

  if (items.length === 0) {
    return { error: "Your cart is empty." };
  }

  const fd = await request.formData();
  // Constructing the order object
  function extractFormData(prefix: string) {
    return Object.fromEntries(
      Array.from(fd.entries())
        .filter(([key]) => key.startsWith(`${prefix}.`))
        .map(([key, value]) => [key.slice(prefix.length + 1), value])
    );
  }

  const billing = extractFormData("billing");
  const shipping = fd.has("shipping.firstName") ? extractFormData("shipping") : billing;
  const paymentMethod = fd.get("payment") as string;

  const subtotal = items.reduce((s: number, i: any) => {
    const effectivePrice = i.price * (1 - (i.discountRate ?? 0) / 100);
    return s + effectivePrice * i.quantity;
  }, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const order = {
    billingAddress: billing,
    shippingAddress: shipping,
    paymentMethod,
    items,
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    createdAt: new Date().toISOString(),
  };

  try {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order)
  });
  if (!response.ok) {
    throw new Error();
  }
  store.dispatch(actions.clearCart());
  return redirect("/browse");
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}

export default function CheckoutPage() {
  const fetcher = useFetcher();
  const navigation = useNavigation();
  const actionData = useActionData() as { error?: string } | undefined;
  const items = useSelector((state: any) => state.cart.products);

  const [shipToDifferent, setShipToDifferent] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/cart" className="text-stone-400 hover:text-stone-600 transition-colors">
          <ChevronLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-stone-800">Checkout</h1>
      </div>

      <fetcher.Form method="post">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* Left column */}
          <div className="flex flex-col gap-5">
            {/* Billing address */}
            <AddressForm title="Billing Address" prefix="billing" />

            {/* Ship to different toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={shipToDifferent}
                onChange={(e) => setShipToDifferent(e.target.checked)}
                className="accent-amber-500 h-4 w-4"
              />
              <span className="text-sm text-stone-700 font-medium">
                Ship to a different address
              </span>
            </label>

            {/* Shipping address (conditional) */}
            {shipToDifferent && (
              <AddressForm title="Shipping Address" prefix="shipping" />
            )}

            {/* Payment */}
            <PaymentMethods selected={paymentMethod} onChange={setPaymentMethod} />
          </div>

          {/* Right column — sticky */}
          <div className="flex flex-col gap-4 sticky top-24">
            <OrderReview />
            <PlaceOrderButton
              loading={isSubmitting}
              error={actionData?.error ?? null}
              disabled={items.length === 0}
            />
          </div>
        </div>
      </fetcher.Form>
    </div>
  );
}
