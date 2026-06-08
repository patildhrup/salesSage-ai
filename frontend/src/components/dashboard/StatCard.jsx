import { Card } from "../ui/Card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "../../utils/cn";

export function StatCard({ label, value, change, status }) {
  const isPositive = change.startsWith("+");

  return (
    <Card hover className="flex flex-col gap-2">
      <p className="text-sm text-brand-gray-500 font-medium">{label}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <div className={cn(
          "flex items-center text-xs font-semibold px-2 py-0.5 rounded-full",
          isPositive ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"
        )}>
          {isPositive ? <ArrowUpRight size={14} className="mr-0.5" /> : <ArrowDownRight size={14} className="mr-0.5" />}
          {change}
        </div>
      </div>
      <div className="mt-4 w-full h-1 bg-brand-gray-800 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-1000",
            status === "success" ? "bg-green-500 w-full" : "bg-brand-orange w-2/3 animate-pulse"
          )}
        />
      </div>
    </Card>
  );
}
