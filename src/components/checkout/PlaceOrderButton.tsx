export default function PlaceOrderButton({ loading, error, disabled }: any) {
  return (
    <div className="flex flex-col gap-2">
      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={disabled}
        className="w-full bg-amber-500 hover:bg-amber-400 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white font-semibold rounded-lg py-3 text-sm"
      >
        {loading ? "Placing Order…" : "Place Order"}
      </button>
    </div>
  );
}
