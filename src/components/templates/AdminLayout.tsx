// components/templates/AdminLayout.tsx
import Sidebar from "../organisms/Sidebar";
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        {/* this will work similar as children {children} */}
        <Outlet />
        </main>
    </div>
  );
}
