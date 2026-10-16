"use client";

import React, { useRef, useMemo } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  showCursorGlow?: boolean;
  showRibbonWave?: boolean;
}

export function AuroraBackground({
  children,
  className = "",
  showCursorGlow = true,
  showRibbonWave = true,
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

  // Strengthened interactive cursor spotlight: 600px with transparent 70%
  const cursorLight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, var(--active-house-glow), transparent 70%)`;

  // 16 floating, slow-rising House-colored bokeh particles distributed across the canvas
  const particles = useMemo(() => {
    const colors = [
      "bg-sky-400",
      "bg-amber-400",
      "bg-emerald-400",
      "bg-rose-400",
      "bg-blue-500",
      "bg-yellow-300",
      "bg-teal-400",
      "bg-red-400",
    ];
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: `${(i * 6.25 + 3) % 94}%`,
      top: `${(i * 7.5 + 10) % 85}%`,
      size: 4 + (i % 4) * 3, // 4px to 13px
      duration: 7 + (i % 5) * 1.8,
      delay: (i % 6) * 0.7,
    }));
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("relative overflow-hidden bg-[#FCFBF9]", className)}
    >
      {/* 1. Architectural Subtle Dot Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#94a3b8_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-40" />

      {/* 2. Supercharged Four-House Luminous Chromatic Aurora Orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Teresa House Orb (Top-Left) */}
        <motion.div
          animate={{
            x: [0, 70, -35, 0],
            y: [0, -50, 35, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-24 -left-20 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-sky-400/40 via-blue-500/25 to-indigo-400/20 blur-[90px]"
        />

        {/* Amartya House Orb (Top-Right) */}
        <motion.div
          animate={{
            x: [0, -60, 45, 0],
            y: [0, 45, -45, 0],
            scale: [1, 1.12, 0.92, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-0 -right-20 h-[540px] w-[540px] rounded-full bg-gradient-to-bl from-amber-300/45 via-yellow-400/30 to-orange-400/20 blur-[95px]"
        />

        {/* Tagore House Orb (Bottom-Left) */}
        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -35, 50, 0],
            scale: [1, 1.18, 0.94, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-20 left-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-emerald-400/35 via-teal-400/25 to-green-500/20 blur-[90px]"
        />

        {/* Raman House Orb (Bottom-Right) */}
        <motion.div
          animate={{
            x: [0, -45, 35, 0],
            y: [0, 50, -35, 0],
            scale: [1, 1.14, 0.9, 1],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute -bottom-16 -right-20 h-[480px] w-[480px] rounded-full bg-gradient-to-tl from-rose-400/35 via-red-400/25 to-pink-500/20 blur-[90px]"
        />
      </div>

      {/* 3. Animated SVG Aurora Ribbon Wave across the top */}
      {showRibbonWave && (
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-36 z-0 overflow-hidden opacity-75">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 180"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="aurora-ribbon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.8" />
                <stop offset="33%" stopColor="#F59E0B" stopOpacity="0.8" />
                <stop offset="66%" stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,60 C320,130 520,20 800,90 C1080,160 1240,40 1440,80"
              stroke="url(#aurora-ribbon-gradient)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="16 8"
              animate={{
                d: [
                  "M0,60 C320,130 520,20 800,90 C1080,160 1240,40 1440,80",
                  "M0,80 C360,20 560,140 840,40 C1120,120 1280,30 1440,60",
                  "M0,60 C320,130 520,20 800,90 C1080,160 1240,40 1440,80",
                ],
                strokeDashoffset: [0, -144],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </div>
      )}

      {/* 4. 16 Floating Slow-Rising House-Colored Bokeh Particles */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -120, 0],
              opacity: [0.15, 0.55, 0.15],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn("absolute rounded-full filter blur-[1px] shadow-sm", p.color)}
          />
        ))}
      </div>

      {/* 5. Strengthened Interactive Cursor Spotlight */}
      {showCursorGlow && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{ background: cursorLight }}
        />
      )}

      {/* 6. Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
