import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Input } from "../ui/Input";
import { Search, Bell, Menu } from "lucide-react";
import { Button } from "../ui/Button";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-brand-black">
      <Sidebar />
      
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-brand-gray-800/50 bg-brand-black/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-4">
            <button className="lg:hidden text-brand-gray-400 hover:text-white">
              <Menu size={24} />
            </button>
            <div className="max-w-md w-full">
              <Input 
                icon={Search} 
                placeholder="Search leads, campaigns..." 
                className="bg-brand-gray-900/50 border-transparent focus:bg-brand-gray-900"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-brand-gray-400 hover:bg-brand-gray-800 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-orange"></span>
            </button>
            <Button size="sm" className="hidden sm:flex">
              Upgrade
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
