import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export function LandingLayout() {
  return (
    <div className="min-h-screen bg-brand-black selection:bg-brand-orange/30">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-brand-gray-800/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">SalesSage</span>
          </div>
          <p className="text-brand-gray-500 text-sm">
            © 2026 SalesSage Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-brand-gray-500 hover:text-brand-gray-300 transition-colors">Twitter</a>
            <a href="#" className="text-brand-gray-500 hover:text-brand-gray-300 transition-colors">LinkedIn</a>
            <a href="#" className="text-brand-gray-500 hover:text-brand-gray-300 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
