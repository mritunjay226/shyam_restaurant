import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.ComponentProps<"div"> {
  variant?: "default" | "secondary" | "outline" | "gold"
  className?: string
  children?: React.ReactNode
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-4 py-1.5 text-[10px] uppercase tracking-widest font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-brown focus:ring-offset-2",
        {
          "border-transparent bg-brand-brown text-brand-cream hover:bg-brand-brown/80": variant === "default",
          "border-transparent bg-brand-cream-dark text-brand-brown hover:bg-brand-cream-dark/80": variant === "secondary",
          "border-transparent bg-brand-red text-white hover:bg-brand-red-hover": variant === "gold",
          "border-brand-brown/20 text-brand-brown": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
