"use client";

import React from "react";
import { cn } from "@/shared/utils/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, disabled, children, ...props }, ref) => {
    const variants = {
      primary: "bg-button-primary-bg text-button-primary-fg hover:bg-interactive-hover hover:text-text-primary dark:hover:text-white active:bg-interactive-active",
      secondary: "bg-button-secondary-bg text-button-secondary-fg border border-button-secondary-border hover:bg-interactive-hover active:bg-interactive-active",
      ghost: "bg-transparent text-text-primary hover:bg-interactive-hover active:bg-interactive-active",
      outline: "bg-transparent text-text-primary border border-border hover:bg-interactive-hover active:bg-interactive-active",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none disabled:bg-interactive-disabled",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
