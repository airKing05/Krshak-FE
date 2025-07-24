// routes/AdminRoutes.tsx
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../components/templates/AdminLayout";
import { isAdmin } from "../utils/auth";
import Categories from "../pages/admin/categories";
import Products from "../pages/admin/products";
import Prices from "../pages/admin/prices";
import Markets from "../pages/admin/markets";
import Link from "../pages/admin/Link";


export default function AdminRoutes() {
  if (!isAdmin()) return <Navigate to="/login" replace />;

  return (
    <AdminLayout>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/markets" element={<Markets />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/link" element={<Link />} />
      </Routes>
    </AdminLayout>
  );
}
