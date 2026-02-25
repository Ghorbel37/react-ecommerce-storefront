import StoreInfo from "./footer/StoreInfo";
import FooterCategories from "./footer/FooterCategories";
import Newsletter from "./footer/Newsletter";

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-400 px-8 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-12">
        <StoreInfo />
        <FooterCategories />
        <Newsletter />
      </div>
    </footer>
  );
}
