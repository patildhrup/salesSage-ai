import { cn } from "../../utils/cn";

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-brand-gray-800", className)}
      {...props}
    />
  );
}
