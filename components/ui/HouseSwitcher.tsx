"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HOUSES } from "@/lib/content/school-data";
import { HouseId } from "@/lib/types";
import { useHouse } from "@/lib/context/HouseContext";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";

interface HouseSwitcherProps {
  currentHouse?: HouseId;
  onChange?: (house: HouseId) => void;
  className?: string;
  variant?: "compact" | "full" | "dots";
}

export function HouseSwitcher({
  currentHouse,
  onChange,
  className = "",
  variant = "compact",
}: HouseSwitcherProps) {
  const { activeHouse, setHouse } = useHouse();
  const selected = currentHouse || activeHouse;
  const [hoveredHouse, setHoveredHouse] = useState<HouseId | null>(null);

  const handleSelect = (id: HouseId) => {
    setHouse(id);
    onChange?.(id);
  };

  const houseKeys: HouseId[] = ["teresa", "amartya", "tagore", "raman"];

  // 1. Sleek Compact Capsule (4 Glowing Color Dots with Tooltip - Zero Horizontal Clutter)
  if (variant === "compact" || variant === "dots") {
    return (
      <div className={cn("relative inline-flex items-center gap-1.5 p-1 rounded-full bg-white/95 border border-slate-200/90 shadow-sm backdrop-blur-xl", className)}>
        <span className="hidden sm:inline-flex items-center gap-1 pl-2 pr-1 text-[11px] font-semibold text-slate-500 border-r border-slate-200/80 mr-0.5">
          <Shield className="w-3 h-3 text-sky-500" />
          <span>Aura:</span>
        </span>

        {houseKeys.map((id) => {
          const house = HOUSES[id];
          const isActive = selected === id;

          return (
            <div key={id} className="relative">
              <button
                onClick={() => handleSelect(id)}
                onMouseEnter={() => setHoveredHouse(id)}
                onMouseLeave={() => setHoveredHouse(null)}
                aria-label={`Switch to ${house.name}`}
                className={cn(
                  "relative w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer",
                  isActive ? "ring-2 ring-offset-1 ring-slate-400/60" : "opacity-80 hover:opacity-100"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDotRing"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: `${house.accentHex}30` }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <span
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: house.accentHex }}
                />
              </button>

              {/* Spring Tooltip on Hover */}
              <AnimatePresence>
                {hoveredHouse === id && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-semibold whitespace-nowrap shadow-xl pointer-events-none z-50 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: house.accentHex }} />
                    <span>{house.name}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  }

  // 2. Full Interactive Grid (for Homepage & School Life)
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {houseKeys.map((id) => {
        const house = HOUSES[id];
        const isActive = selected === id;

        return (
          <motion.div
            key={id}
            onClick={() => handleSelect(id)}
            whileHover={{ y: -4 }}
            className={cn(
              "relative cursor-pointer rounded-3xl p-6 sm:p-7 border transition-all duration-300 overflow-hidden",
              isActive
                ? "bg-white border-slate-300 shadow-[0_16px_40px_-10px_rgba(15,23,42,0.1)] ring-2"
                : "bg-white/80 border-slate-200/80 hover:border-slate-300 shadow-sm"
            )}
            style={{
              borderColor: isActive ? house.accentHex : undefined,
            }}
          >
            {/* Top accent glow line */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{ backgroundColor: house.accentHex }}
            />

            {isActive && (
              <motion.div
                layoutId="houseGlowIndicator"
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${house.accentHex}, transparent 70%)`,
                }}
              />
            )}

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span
                  className="px-2.5 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider"
                  style={{
                    backgroundColor: `${house.accentHex}18`,
                    color: house.accentHex,
                  }}
                >
                  {house.colorName}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Patron: {house.patron}</span>
              </div>

              <h4 className="text-xl font-bold font-serif text-slate-900 mb-1">{house.name}</h4>
              <p className="text-xs text-slate-600 italic mb-3">"{house.motto}"</p>

              <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                {house.patronStory}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {house.values.slice(0, 3).map((val) => (
                  <span
                    key={val}
                    className="text-[10px] px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200/60"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
