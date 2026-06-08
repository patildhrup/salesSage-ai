import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { Zap } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-brand-gray-800/50 bg-brand-black/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-gradient orange-glow">
              <Zap className="text-white" size={18} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">SalesSage</span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center gap-8">
              <a href="#features" className="nav-link">Features</a>
              <a href="#workflow" className="nav-link">Workflow</a>
              <a href="#pricing" className="nav-link">Pricing</a>
              <a href="#docs" className="nav-link">Docs</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm">Start Automation</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
