import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "gold"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-brand-cream transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-brand-red text-white hover:bg-brand-red-hover": variant === "default" || variant === "gold",
            "border border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-brand-cream": variant === "outline",
            "hover:bg-brand-cream-dark text-brand-brown": variant === "ghost",
            "text-brand-brown underline-offset-4 hover:underline": variant === "link",
            "h-10 px-6 py-2": size === "default",
            "h-9 px-4": size === "sm",
            "h-12 px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
