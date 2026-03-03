import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShopLayout, { loader as categoriesLoader } from "./pages/ShopLayout";
import HomePage from "./pages/HomePage";
import { loader as carouselLoader } from "./components/home/Carousel";
import CheckoutPage from "./pages/CheckoutPage";
import BrowsePage from "./pages/BrowsePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  { path: "/", element: <ShopLayout />, loader: categoriesLoader, id: "shop-layout", errorElement: <ErrorPage />, children: [
      { index: true, element: <HomePage />, loader: carouselLoader },
      { path: "product/:id", element: <ProductDetailsPage /> },
      { path: "browse", element: <BrowsePage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "cart", element: <CartPage /> },
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App