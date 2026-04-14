"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/utils/utils";

interface InteractiveProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  variant?: "scale" | "press" | "none";
}

/**
 * Interactive wrapper providing premium, instant visual feedback for touch and click actions.
 * Perfect for cards, buttons, and navigation elements.
 */
export const Interactive = ({
  children,
  className,
  variant = "scale",
  ...props
}: InteractiveProps) => {
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
    <motion.div
      className={cn("cursor-pointer", className)}
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
    </motion.div>
  );
};
