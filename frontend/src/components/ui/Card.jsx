import { cn } from "../../utils/cn";

export function Card({ className, children, glass = true, hover = false }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-brand-gray-800/50 bg-brand-gray-900/40 p-6",
        glass && "backdrop-blur-md",
        hover && "hover:border-brand-gray-700/50 transition-colors duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
