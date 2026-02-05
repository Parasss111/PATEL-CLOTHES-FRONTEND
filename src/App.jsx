import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import Navbar from "./Components/Navbar";
import Loader from "./Components/Loader";
import AdminUsers from "./admin/AdminUsers";
import AdminAddProduct from "./admin/AdminAddProduct";
import Footer from "./Components/Footer";
import Contact from "./Pages/Contact/Contact";

// Lazy pages
const Home = lazy(() => import("./Pages/Home/Home"));
const ProductsPage = lazy(() => import("./Pages/Products/ProductsPage"));
const ProductDetails = lazy(() => import("./Pages/Products/ProductDetails"));
const CartPage = lazy(() => import("./Pages/Cart/CartPage"));
const CheckoutPage = lazy(() => import("./Pages/CheckOut/CheckoutPage"));
const OrderSuccess = lazy(() => import("./Pages/CheckOut/OrderSuccess"));
const MyOrders = lazy(() => import("./Pages/Orders/MyOrder"));


// Admin lazy
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const AdminRoute = lazy(() => import("./admin/AdminRoute"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const AdminProducts = lazy(() => import("./admin/AdminProducts"));
const AdminOrders = lazy(() => import("./admin/AdminOrders"));
const OrderDetails = lazy(() => import("./admin/OrderDetails"));


function App() {
  return (
    <>
      <Navbar />

      <Suspense fallback={<Loader />}>
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-orders" element={<MyOrders />} />


          {/* ADMIN PANEL (ONLY ONCE) */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
             <Route path="add-product" element={<AdminAddProduct />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>

        </Routes>
      </Suspense>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default App;
