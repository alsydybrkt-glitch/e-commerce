"use client";

import React from "react";
import { motion } from "framer-motion";

interface BlogHeaderProps {
  kicker: string;
  title: string;
}

export default function BlogHeader({ kicker, title }: BlogHeaderProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="relative mb-20 overflow-hidden py-16 lg:py-24">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -left-[10%] top-0 h-[500px] w-[500px] rounded-full bg-brand-500/5 blur-[120px] dark:bg-brand-600/10" />
        <div className="absolute -right-[10%] bottom-0 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px] dark:bg-blue-600/10" />
        
        {/* Subtle SVG Grid Pattern */}
        <svg
          className="absolute inset-0 h-full w-full stroke-slate-200/50 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-slate-800/50"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              x="50%"
              y="-1"
            >
              <path d="M.5 40V.5H40" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        <motion.div variants={itemVariants} className="flex justify-center">
          <span className="inline-flex items-center rounded-full border border-brand-100 bg-brand-50/50 px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-700 shadow-sm backdrop-blur-md dark:border-brand-500/20 dark:bg-brand-900/20 dark:text-brand-400">
            {kicker}
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mt-8 text-balance font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          {title.split(" | ").map((part, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="mx-4 text-slate-200 dark:text-slate-800 hidden sm:inline">|</span>}
              <span className={index % 2 !== 0 ? "bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent dark:from-brand-400 dark:to-brand-200" : ""}>
                {part}
              </span>
              <br className="sm:hidden" />
            </React.Fragment>
          ))}
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="mx-auto mt-8 h-1.5 w-24 rounded-full bg-gradient-to-r from-brand-500 to-blue-500"
        />
      </motion.div>
    </div>
  );
}
