import { Route, Routes } from "react-router-dom";
import AdminLayout from "../components/templates/AdminLayout";
import Link from "../pages/admin/Link";
import Dashboard from "../pages/admin/Dashboard";
import Markets from "../pages/admin/Markets";
import Categories from "../pages/admin/Categories";
import Products from "../pages/admin/Products";
import Prices from "../pages/admin/Prices";


export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="markets" element={<Markets />} />
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<Products />} />
        <Route path="prices" element={<Prices />} />
        <Route path="link" element={<Link />} />
      </Route>
    </Routes>
  );
}
