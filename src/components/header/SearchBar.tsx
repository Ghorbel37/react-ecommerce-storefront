export default function SearchBar() {
  return (
    <div className="flex-1 max-w-xl">
      <div className="flex items-center bg-stone-700 rounded-full px-4 py-2 gap-2">
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent text-sm text-white placeholder-stone-400 outline-none w-full"
        />
      </div>
    </div>
  );
}
