import Sidebar from "../organisms/Sidebar";
import { Outlet } from 'react-router-dom';
import { useState } from "react";
import CancelIcon from '../../assets/icons/cancel.svg';
import MenuBarIcon from '../../assets/icons/menuBar.svg'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 relative overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:h-[94%] lg:block w-64 bg-white shadow-lg z-10">
        <Sidebar/>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          {/* Sidebar (80%) */}
          <div className="w-[80%] bg-white h-full shadow-lg relative z-50 slide-in-left">
            <div className="absolute top-4 right-4 z-50">
              <button onClick={() => setSidebarOpen(false)}>
                <img src={CancelIcon} alt="cancel" className="w-6 h-6"/>
              </button>
            </div>
            <Sidebar  onClose={() =>setSidebarOpen(false)}/>
          </div>

          {/* Overlay (20%) - closes sidebar on click */}
          <div
            className="w-[20%] h-full bg-opacity-30 backdrop-blur-sm z-10"
            onClick={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-auto relative z-0">
        {/* Mobile Header with toggle button */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow">
          <button onClick={() => setSidebarOpen(true)}>
            <img src={MenuBarIcon} alt="menu" className="w-10 h-10"/> 
          </button>
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </div>

        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
