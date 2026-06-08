import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { 
  LayoutDashboard, 
  Send, 
  Users, 
  BarChart3, 
  Settings,
  Zap,
  HelpCircle
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Send, label: "Campaigns", path: "/dashboard/campaigns" },
  { icon: Users, label: "Leads", path: "/dashboard/leads" },
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-brand-gray-800/50 bg-brand-black px-4 py-6 flex flex-col">
      <div className="flex items-center gap-2 px-2 mb-10">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-gradient orange-glow">
          <Zap className="text-white" size={18} fill="currentColor" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">SalesSage</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-brand-orange/10 text-brand-orange" 
                  : "text-brand-gray-400 hover:bg-brand-gray-800/50 hover:text-brand-gray-100"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 space-y-1">
        <Link
          to="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
            location.pathname === "/dashboard/settings"
              ? "bg-brand-orange/10 text-brand-orange"
              : "text-brand-gray-400 hover:bg-brand-gray-800/50 hover:text-brand-gray-100"
          )}
        >
          <Settings size={20} />
          Settings
        </Link>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-brand-gray-400 transition-all duration-200 hover:bg-brand-gray-800/50 hover:text-brand-gray-100">
          <HelpCircle size={20} />
          Support
        </button>
      </div>

      <div className="mt-6 border-t border-brand-gray-800/50 pt-6">
        <div className="flex items-center gap-3 px-2">
          <div className="h-8 w-8 rounded-full bg-brand-gray-800 border border-brand-gray-700 flex items-center justify-center text-xs font-bold text-brand-orange">
            JS
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-white">John Smith</p>
            <p className="truncate text-xs text-brand-gray-500">Free Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
