import HomeIcon from "./header/HomeIcon";
import SearchBar from "./header/SearchBar";
import MiniCart from "./header/MiniCart";
import Navbar from "./header/Navbar";

export default function Header() {
  return (
    <header className="bg-stone-800 text-white px-8">
      {/* Top row: home icon | search | minicart */}
      <div className="max-w-5xl mx-auto flex items-center justify-between py-4 gap-6">
        <HomeIcon />
        <SearchBar />
        <MiniCart />
      </div>

      {/* Navigation */}
      <Navbar />
    </header>
  );
}
