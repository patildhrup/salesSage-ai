import { cn } from "../../utils/cn";

export function Input({ className, icon: Icon, ...props }) {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-500">
          <Icon size={18} />
        </div>
      )}
      <input
        className={cn(
          "input-field w-full",
          Icon && "pl-10",
          className
        )}
        {...props}
      />
    </div>
  );
}
