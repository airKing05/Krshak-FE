// components/organisms/Sidebar.tsx
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/admin" },
  { label: "Markets", to: "/admin/markets" },
  { label: "Categories", to: "/admin/categories" },
  { label: "Products", to: "/admin/products" },
  { label: "Link", to: "/admin/link" },
  { label: "Prices", to: "/admin/prices" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-4 text-xl font-bold border-b">Admin Panel</div>
      <nav className="flex flex-col p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `px-3 py-2 rounded text-sm font-medium ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
