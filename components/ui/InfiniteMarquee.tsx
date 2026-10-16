"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Trophy, BookOpen, Compass, Award, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarqueeItem {
  text: string;
  badge?: string;
  color?: string;
}

interface InfiniteMarqueeProps {
  items?: MarqueeItem[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
}

const DEFAULT_MARQUEE_ITEMS: MarqueeItem[] = [
  { text: "Teresa House · Blue · Compassion & Service", badge: "House Pillar", color: "#0EA5E9" },
  { text: "Amartya House · Yellow · Wisdom & Economics", badge: "House Pillar", color: "#F59E0B" },
  { text: "Tagore House · Green · Creativity & Literature", badge: "House Pillar", color: "#10B981" },
  { text: "Raman House · Red · Scientific Discovery & Logic", badge: "House Pillar", color: "#EF4444" },
  { text: "Sri Aurobindo Education Centre (SAEC) · Founded July 1989", badge: "Heritage", color: "#0284C7" },
  { text: "MPBSE Board Affiliated Nursery to Class XII", badge: "Affiliation", color: "#D97706" },
  { text: "Equipped Physics, Chemistry & Biology Laboratories", badge: "Facilities", color: "#059669" },
  { text: "Daily Guided Library Reading & Meditation Hour", badge: "Ethos", color: "#7C3AED" },
  { text: "Volleyball, Basketball, Badminton & Inter-House Chess", badge: "Sports", color: "#DC2626" },
];

export function InfiniteMarquee({
  items = DEFAULT_MARQUEE_ITEMS,
  direction = "left",
  speed = 28,
  className = "",
  pauseOnHover = true,
}: InfiniteMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items 4 times to ensure seamless infinite looping without gaps
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      className={cn(
        "relative w-full overflow-hidden py-3 bg-white/70 backdrop-blur-md border-y border-slate-200/80 shadow-xs select-none",
        className
      )}
    >
      {/* Edge Blur Gradients */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FCFBF9] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FCFBF9] to-transparent z-10" />

      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
        className="flex items-center gap-6 whitespace-nowrap will-change-transform"
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-800 transition-transform hover:scale-105"
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color || "#0EA5E9" }}
            />
            {item.badge && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200/60">
                {item.badge}
              </span>
            )}
            <span className="tracking-tight text-slate-700">{item.text}</span>
            <span className="text-slate-300 font-light">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
