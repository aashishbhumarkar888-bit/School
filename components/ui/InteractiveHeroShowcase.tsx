"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BorderBeam } from "./BorderBeam";
import { Award, Compass, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingBadge {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  content: React.ReactNode;
  duration?: number;
  delay?: number;
}

interface InteractiveHeroShowcaseProps {
  imageSrc: string;
  altText?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  aspectRatio?: string;
  badges?: FloatingBadge[];
  priority?: boolean;
}

export function InteractiveHeroShowcase({
  imageSrc,
  altText = "Sri Aurobindo School Official Showcase",
  title,
  subtitle,
  className = "",
  aspectRatio = "aspect-[4/3]",
  badges,
  priority = false,
}: InteractiveHeroShowcaseProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 240, damping: 22 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D Parallax Tilt: up to ±10 degrees
  const rotateX = useTransform(smoothMouseY, [0, 1], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-10, 10]);

  // Dynamic glare reflection
  const glareX = useTransform(smoothMouseX, [0, 1], [0, 100]);
  const glareY = useTransform(smoothMouseY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Default badges if none passed
  const defaultBadges: FloatingBadge[] = [
    {
      position: "top-left",
      duration: 3.5,
      delay: 0,
      content: (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_20px_rgba(15,23,42,0.1)] text-xs font-bold text-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Est. July 1989 · SAEC</span>
        </div>
      ),
    },
    {
      position: "top-right",
      duration: 4.2,
      delay: 0.5,
      content: (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-amber-200/80 shadow-[0_8px_20px_rgba(245,158,11,0.15)] text-xs font-bold text-amber-900">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>MPBSE K–12 Affiliated</span>
        </div>
      ),
    },
    {
      position: "bottom-left",
      duration: 5.0,
      delay: 1,
      content: (
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_20px_rgba(15,23,42,0.1)] text-xs font-semibold text-slate-700">
          <div className="flex items-center -space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 ring-2 ring-white" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-white" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
          </div>
          <span>4 Houses · Teresa · Amartya · Tagore · Raman</span>
        </div>
      ),
    },
  ];

  const activeBadges = badges || defaultBadges;

  const positionClasses = {
    "top-left": "-top-4 -left-4 sm:-left-6",
    "top-right": "-top-4 -right-4 sm:-right-6",
    "bottom-left": "-bottom-5 -left-3 sm:-left-5",
    "bottom-right": "-bottom-5 -right-3 sm:-right-5",
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative [perspective:1200px] select-none my-4", className)}
    >
      {/* Multi-Color Ambient Back-Glow */}
      <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-r from-sky-400/30 via-amber-300/30 via-emerald-400/30 to-rose-400/30 blur-2xl opacity-75 -z-10 animate-pulse-glow" />

      {/* 3D Tilting Card Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-[28px] p-2 sm:p-3 bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.12)] transition-shadow hover:shadow-[0_28px_70px_rgba(15,23,42,0.18)]"
      >
        {/* Continuous 4-House Conic Border Beam */}
        <BorderBeam borderWidth={2} duration={7} />

        {/* Photo Container */}
        <div
          className={cn(
            "relative w-full rounded-[20px] overflow-hidden bg-slate-100 shadow-inner",
            aspectRatio
          )}
          style={{ transform: "translateZ(20px)" }}
        >
          <Image
            src={imageSrc}
            alt={altText}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />

          {/* Glare Reflection Layer */}
          <motion.div
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35) 0%, transparent 60%)`,
            }}
            className="pointer-events-none absolute inset-0 z-10"
          />
        </div>

        {/* Optional Title/Subtitle bar */}
        {(title || subtitle) && (
          <div className="p-3 text-center" style={{ transform: "translateZ(30px)" }}>
            {title && (
              <p className="font-serif font-bold text-xs sm:text-sm text-slate-800 tracking-tight">
                {title}
              </p>
            )}
            {subtitle && (
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{subtitle}</p>
            )}
          </div>
        )}

        {/* Floating Orbiting Badges in 3D */}
        {activeBadges.map((badge, idx) => (
          <motion.div
            key={idx}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: badge.duration || 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: badge.delay || 0,
            }}
            style={{
              transform: "translateZ(44px)",
            }}
            className={cn("absolute z-20 pointer-events-auto", positionClasses[badge.position])}
          >
            {badge.content}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
