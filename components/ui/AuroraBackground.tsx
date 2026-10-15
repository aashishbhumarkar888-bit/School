"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  showCursorGlow?: boolean;
}

export function AuroraBackground({
  children,
  className = "",
  showCursorGlow = true,
}: AuroraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(300);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const cursorLight = useMotionTemplate`radial-gradient(550px circle at ${mouseX}px ${mouseY}px, var(--active-house-glow), transparent 75%)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("relative overflow-hidden bg-[#FCFBF9]", className)}
    >
      {/* 1. Architectural Subtle Dot Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

      {/* 2. Four-House Silky Luminous Pastel Aurora Spheres (Smooth Floating Figure-Eight Paths) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Teresa House Sapphire / Sky Blue Orb */}
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -left-20 h-[450px] w-[450px] rounded-full bg-sky-200/50 blur-[110px]"
        />

        {/* Amartya House Solar Gold / Yellow Orb */}
        <motion.div
          animate={{
            x: [0, -70, 50, 0],
            y: [0, 50, -50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/4 -right-20 h-[480px] w-[480px] rounded-full bg-amber-200/45 blur-[120px]"
        />

        {/* Tagore House Botanical Emerald / Jade Orb */}
        <motion.div
          animate={{
            x: [0, 60, -60, 0],
            y: [0, -40, 60, 0],
            scale: [1, 1.2, 0.95, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-24 left-1/4 h-[460px] w-[460px] rounded-full bg-emerald-200/40 blur-[110px]"
        />

        {/* Raman House Vermilion / Crimson Red Orb */}
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 60, -40, 0],
            scale: [1, 1.15, 0.92, 1],
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-10 -right-24 h-[420px] w-[420px] rounded-full bg-rose-200/45 blur-[110px]"
        />
      </div>

      {/* 3. Interactive Cursor Spotlight */}
      {showCursorGlow && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{ background: cursorLight }}
        />
      )}

      {/* 4. Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
