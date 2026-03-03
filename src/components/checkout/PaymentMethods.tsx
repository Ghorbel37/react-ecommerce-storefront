const methods: { id: string; label: string; description: string }[] = [
  {
    id: "bank",
    label: "Bank Transfer",
    description:
      "Make your payment via direct bank transfer. Your order will ship once the funds clear.",
  },
  {
    id: "cheque",
    label: "Cheque Payment",
    description:
      "Send your cheque to our store address. Orders ship upon receipt.",
  },
  {
    id: "paypal",
    label: "PayPal",
    description:
      "Pay securely via your PayPal account or credit card through PayPal.",
  },
];

export default function PaymentMethods({ selected, onChange }: any) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-6">
      <h2 className="text-base font-semibold text-stone-800 mb-4">Payment Method</h2>

      <div className="flex flex-col gap-3">
        {methods.map((m) => (
          <label
            key={m.id}
            className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
              selected === m.id
                ? "border-amber-400 bg-amber-50"
                : "border-stone-200 hover:border-stone-300"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={m.id}
              checked={selected === m.id}
              onChange={() => onChange(m.id)}
              className="mt-0.5 accent-amber-500"
            />
            <div>
              <p className="text-sm font-semibold text-stone-800">{m.label}</p>
              {selected === m.id && (
                <p className="text-xs text-stone-500 mt-1">{m.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
