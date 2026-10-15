"use client";

import React, { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  variant?: "primary" | "secondary" | "glass" | "outline";
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.25,
  variant = "primary",
  ...props
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-bold shadow-[0_4px_16px_rgba(37,99,235,0.25)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.35)] hover:brightness-105",
    secondary:
      "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-900 font-bold shadow-[0_4px_16px_rgba(245,158,11,0.25)] hover:shadow-[0_8px_24px_rgba(245,158,11,0.35)] hover:brightness-105",
    glass:
      "bg-white/85 hover:bg-white text-slate-800 border border-slate-200/90 backdrop-blur-xl shadow-xs hover:shadow-md",
    outline:
      "bg-white text-slate-700 border border-slate-300 hover:border-slate-500 hover:text-slate-950",
  };

  return (
    <motion.button
      ref={btnRef}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm transition-all duration-200 cursor-pointer",
        variantStyles[variant],
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
