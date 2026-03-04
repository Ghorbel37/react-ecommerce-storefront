export default function Newsletter() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-white font-bold text-lg">Newsletter</h3>
      <p className="text-sm">Subscribe to get exclusive deals and updates.</p>
      <form className="flex flex-col gap-2 mt-1" >
        <input
          type="email"
          placeholder="Type your email"
          className="bg-stone-700 text-white text-sm placeholder-stone-400 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          type="reset"
          className="bg-amber-500 hover:bg-amber-400 transition-colors text-white text-sm font-semibold rounded-md px-4 py-2"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
