import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";
import AdminLayout from "./components/admin/AdminLayout";

import Categories from "./pages/Categories";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import TrackOrder from "./pages/TrackOrder";
import Preorder from "./pages/Preorder";

import Login from "./pages/admin/Login";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminCreateProduct from "./pages/admin/AdminCreateProduct";

import PrivateRoute from "./components/admin/PrivateRoute";
import AdminCatalog from "./pages/admin/AdminCatalog.tsx";
import AdminProduct from "./pages/admin/AdminProduct.tsx";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails.tsx";
import AdminOrders from "./pages/admin/AdminOrders.tsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>

          {/* ================= USER SIDE ================= */}
          <Route element={<Layout />}>
            <Route path="/" element={<Categories />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:categoryId" element={<Catalog />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/preorder" element={<Preorder />} />
          </Route>

          <Route path="/admin/login" element={<Login />} />

          <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              }
          >
            <Route index element={<Navigate to="categories" />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="catalog/:categoryId" element={<AdminCatalog />} />
            <Route path="product/:id" element={<AdminProduct />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
            <Route path="/admin/createProduct/:categoryId" element={<AdminCreateProduct />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
  );
}

export default App;