"use client";
import React from "react";
import { m, HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/utils/utils";

type InteractiveVariant = "scale" | "press" | "none";

interface InteractiveProps<T extends React.ElementType = "div"> {
  as?: T;
  children: React.ReactNode;
  className?: string;
  variant?: InteractiveVariant;
}

/**
 * Interactive wrapper providing premium, instant visual feedback for touch and click actions.
 * Perfect for cards, buttons, and navigation elements.
 * 
 * Now Polymorphic: supports 'as' prop to render as div, button, section, etc.
 */
export const Interactive = <T extends React.ElementType = "div">({
  as,
  children,
  className,
  variant = "scale",
  ...props
}: InteractiveProps<T> & Omit<HTMLMotionProps<any>, keyof InteractiveProps<T>>) => {
  const Component = (as ? (m as any)[as as string] : m.div) || m.div;

  const variants = {
    scale: {
      whileHover: { scale: 1.01 },
      whileTap: { scale: 0.98 },
    },
    press: {
      whileHover: { y: -2 },
      whileTap: { scale: 0.97, y: 0 },
    },
    none: {},
  };

  return (
    <Component
      className={cn("cursor-pointer outline-none", className)}
      {...variants[variant]}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 25,
        mass: 1,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
