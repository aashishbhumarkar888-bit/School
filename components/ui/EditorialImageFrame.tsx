"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  Award,
  Building2,
  GraduationCap,
  Sparkles,
  Compass,
  Flame,
  Calendar,
  Users,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FloatingBadgeProps {
  title: string;
  subtitle?: string;
  iconName?:
    | "shield"
    | "shieldCheck"
    | "award"
    | "building"
    | "grad"
    | "sparkles"
    | "compass"
    | "flame"
    | "calendar"
    | "users"
    | "book";
  icon?: React.ElementType;
  className?: string;
}

function getBadgeIcon(badge?: FloatingBadgeProps) {
  if (!badge) return null;
  if (badge.iconName) {
    switch (badge.iconName) {
      case "shield":
        return Shield;
      case "shieldCheck":
        return ShieldCheck;
      case "award":
        return Award;
      case "building":
        return Building2;
      case "grad":
        return GraduationCap;
      case "sparkles":
        return Sparkles;
      case "compass":
        return Compass;
      case "flame":
        return Flame;
      case "calendar":
        return Calendar;
      case "users":
        return Users;
      case "book":
        return BookOpen;
      default:
        return null;
    }
  }
  if (badge.icon) return badge.icon;
  return null;
}

interface EditorialImageFrameProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  caption?: string;
  badgeTopLeft?: FloatingBadgeProps;
  badgeBottomRight?: FloatingBadgeProps;
  priority?: boolean;
  className?: string;
}

export function EditorialImageFrame({
  src,
  alt,
  aspectRatio = "aspect-[4/3]",
  caption,
  badgeTopLeft,
  badgeBottomRight,
  priority = false,
  className = "",
}: EditorialImageFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 220, damping: 24 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [6, -6]);
  const rotateY = useTransform(smoothX, [0, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const TopIcon = getBadgeIcon(badgeTopLeft);
  const BottomIcon = getBadgeIcon(badgeBottomRight);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative [perspective:1200px] select-none", className)}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-3xl p-3 bg-white border border-slate-200/90 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_32px_70px_-15px_rgba(15,23,42,0.14)]"
      >
        {/* Double-border frame container */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60">
          <div className={cn("relative w-full overflow-hidden", aspectRatio)}>
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Optional Caption Footer */}
          {caption && (
            <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium text-slate-800">{caption}</span>
              <span className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">
                Auro Mandir Parisar
              </span>
            </div>
          )}
        </div>

        {/* Floating Glassmorphic Top-Left Badge */}
        {badgeTopLeft && (
          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn(
              "absolute -top-4 -left-4 z-20 max-w-[260px] rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 p-3 shadow-lg shadow-slate-900/5 flex items-center gap-2.5",
              badgeTopLeft.className
            )}
          >
            {TopIcon && (
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-700 flex items-center justify-center shrink-0">
                <TopIcon className="w-4 h-4" />
              </div>
            )}
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {badgeTopLeft.title}
              </p>
              {badgeTopLeft.subtitle && (
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                  {badgeTopLeft.subtitle}
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* Floating Glassmorphic Bottom-Right Badge */}
        {badgeBottomRight && (
          <motion.div
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className={cn(
              "absolute -bottom-4 -right-4 z-20 max-w-[260px] rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 p-3 shadow-lg shadow-slate-900/5 flex items-center gap-2.5",
              badgeBottomRight.className
            )}
          >
            {BottomIcon && (
              <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center shrink-0">
                <BottomIcon className="w-4 h-4" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {badgeBottomRight.title}
                </p>
              </div>
              {badgeBottomRight.subtitle && (
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                  {badgeBottomRight.subtitle}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
