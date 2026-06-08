import { cn } from "../../utils/cn";

export function Badge({ className, variant = "default", children }) {
  const variants = {
    default: "bg-brand-gray-800 text-brand-gray-300",
    success: "bg-green-500/10 text-green-500 border border-green-500/20",
    processing: "bg-brand-orange/10 text-brand-orange border border-brand-orange/20 animate-pulse",
    failed: "bg-red-500/10 text-red-500 border border-red-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
