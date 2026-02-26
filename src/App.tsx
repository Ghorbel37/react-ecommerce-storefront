import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShopLayout from "./pages/ShopLayout";
import HomePage from "./pages/HomePage";
import { loader as carouselLoader } from "./components/home/Carousel";
import CheckoutPage from "./pages/CheckoutPage";
import BrowsePage from "./pages/BrowsePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";

const router = createBrowserRouter([
  {
    path: "/", element: <ShopLayout />, children: [
      { index: true, element: <HomePage />, loader: carouselLoader },
      { path: "products", element: <ProductDetailsPage /> },
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