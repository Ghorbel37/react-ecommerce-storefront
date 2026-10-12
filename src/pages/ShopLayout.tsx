import { useEffect } from "react";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { actions } from "../store/cartSlice";
import type { AppDispatch } from "../store/store";
import { apiFetch } from "../api/client";

export default function ShopLayout() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(actions.initCart());
  }, [dispatch]);

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

export async function loader() {
  const response = await apiFetch("/categories");
  if (!response.ok) {
    throw new Error("Failed to load categories");
  }
  return response;
}