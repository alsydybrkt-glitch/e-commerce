"use client";

import React from "react";
import { cn } from "@/shared/utils/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-text-secondary">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-lg border border-border bg-surface-primary px-4 py-2 text-sm text-text-primary transition-all duration-200",
            "placeholder:text-text-tertiary focus:outline-none focus:border-focus-ring focus:ring-1 focus:ring-focus-ring",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-interactive-disabled",
            error ? "border-error focus:border-error focus:ring-error" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-xs font-medium text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
