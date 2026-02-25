import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ShopLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-200">
      <Header />
      <main className="flex-1 flex justify-center py-8 px-8">
        <div className="w-full max-w-5xl">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}