"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { HouseId } from "@/lib/types";
import { HOUSES } from "@/lib/content/school-data";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  house?: HouseId | string;
  enableTilt?: boolean;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor,
  house,
  enableTilt = true,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse relative coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D rotation springs
  const rotateXSpring = useSpring(0, { stiffness: 280, damping: 25 });
  const rotateYSpring = useSpring(0, { stiffness: 280, damping: 25 });

  const validHouse = house && HOUSES[house as HouseId] ? (house as HouseId) : null;

  const activeSpotlightColor =
    spotlightColor ||
    (validHouse ? `${HOUSES[validHouse].accentHex}20` : "rgba(14, 165, 233, 0.12)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateXVal = ((y - centerY) / centerY) * -5;
      const rotateYVal = ((x - centerX) / centerX) * 5;
      rotateXSpring.set(rotateXVal);
      rotateYSpring.set(rotateYVal);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateXSpring.set(0);
    rotateYSpring.set(0);
  };

  const backgroundGlow = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, ${activeSpotlightColor}, transparent 75%)`;
  const borderGlow = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, ${
    validHouse ? HOUSES[validHouse].accentHex : "var(--active-house-accent)"
  }, transparent 70%)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
      }}
      className={cn(
        "relative rounded-3xl p-[1.5px] transition-all duration-300 group overflow-hidden",
        "bg-gradient-to-b from-slate-200/90 via-slate-100/60 to-slate-200/80 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.07)] hover:shadow-[0_24px_60px_-12px_rgba(15,23,42,0.13)]",
        className
      )}
      {...(props as any)}
    >
      {/* Dynamic Cursor Glowing Border */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: borderGlow,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Inner Frosted Daylight Card Body */}
      <div className="relative z-20 h-full w-full rounded-3xl bg-white/90 backdrop-blur-2xl p-6 sm:p-8 transition-colors duration-300">
        {/* Dynamic Inner Radial Light Field */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: backgroundGlow }}
        />

        <div className="relative z-10 h-full">{children}</div>
      </div>
    </motion.div>
  );
}
