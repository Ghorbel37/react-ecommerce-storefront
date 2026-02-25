export default function StoreInfo() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-white font-bold text-lg">MyStore</h3>
      <p className="text-sm leading-relaxed">
        Your one-stop destination for quality products at great prices.
        We are committed to delivering the best shopping experience.
      </p>
      <p className="text-xs mt-2">
        &copy; {new Date().getFullYear()} MyStore. All rights reserved.
      </p>
    </div>
  );
}
