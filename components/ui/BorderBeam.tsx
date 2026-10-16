"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className = "",
  size = 200,
  duration = 6,
  borderWidth = 2,
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden",
        className
      )}
      style={{
        maskImage: `linear-gradient(transparent, transparent), linear-gradient(white, white)`,
        maskClip: "padding-box, border-box",
        maskComposite: "intersect",
        WebkitMaskComposite: "destination-out",
        padding: `${borderWidth}px`,
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
        className="absolute -inset-[150%] w-[400%] h-[400%] origin-center"
        style={{
          background:
            "conic-gradient(from 0deg, #0EA5E9 0deg, #F59E0B 90deg, #10B981 180deg, #EF4444 270deg, #0EA5E9 360deg)",
        }}
      />
    </div>
  );
}
