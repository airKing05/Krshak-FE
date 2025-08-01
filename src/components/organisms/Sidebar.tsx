import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/admin", emoji: "🏠" },
  { label: "Markets", to: "/admin/markets", emoji: "🌍" },
  { label: "Categories", to: "/admin/categories", emoji: "🗂️" },
  { label: "Products", to: "/admin/products", emoji: "📦" },
  { label: "Link", to: "/admin/link", emoji: "🔗" },
  { label: "Prices", to: "/admin/prices", emoji: "💰" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col shadow-md">
      <div className="px-6 py-5 text-2xl font-bold text-blue-600 border-b">
        Admin Panel
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map(({ label, to, emoji }) => {
         const isDashboard = to === "/admin"; 
        return(
          <NavLink
            key={to}
            to={to}
            end={isDashboard} 
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`
            }
          >
            <span className="text-lg">{emoji}</span>
            <span>{label}</span>
          </NavLink>
        )}
        )}
      </nav>
      <div className="p-4 border-t text-xs text-gray-400">
        © {new Date().getFullYear()} Admin UI
      </div>
    </aside>
  );
}
