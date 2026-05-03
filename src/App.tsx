import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Categories from "./pages/Categories";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import TrackOrder from "./pages/TrackOrder";
import Preorder from "./pages/Preorder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Categories />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:categoryId" element={<Catalog />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/track" element={<TrackOrder />} />
		  <Route path="/preorder" element={<Preorder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;