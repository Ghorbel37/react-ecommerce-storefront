import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShopLayout from "./pages/ShopLayout";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import BrowsePage from "./pages/BrowsePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";

const router = createBrowserRouter([
  {
    path: "/", element: <ShopLayout />, children: [
      { index: true, element: <HomePage /> },
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