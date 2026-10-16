"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedSchoolCrestProps {
  className?: string;
  size?: number;
}

export function AnimatedSchoolCrest({ className = "", size = 44 }: AnimatedSchoolCrestProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className={`relative w-11 h-11 rounded-2xl p-[2px] overflow-hidden flex-shrink-0 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      {/* 4-House Animated Rotating Conic Gradient Border */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-[50%] w-[200%] h-[200%] origin-center"
        style={{
          background:
            "conic-gradient(from 0deg, #0EA5E9 0deg, #F59E0B 90deg, #10B981 180deg, #EF4444 270deg, #0EA5E9 360deg)",
        }}
      />

      {/* Inner White Emblem Chamber */}
      <div className="relative w-full h-full rounded-[14px] bg-white flex items-center justify-center p-1.5 shadow-inner z-10 overflow-hidden">
        {/* Subtle radial inner glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,243,199,0.5)_0%,transparent_70%)]" />

        {/* Sri Aurobindo Lotus & Rising Sun Emblem */}
        <motion.svg
          whileHover={{ rotate: 15, scale: 1.12 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-[0_1px_2px_rgba(217,119,6,0.3)]"
        >
          {/* Radiant Rising Sun Rays */}
          <g stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" opacity="0.9">
            <line x1="24" y1="5" x2="24" y2="8" />
            <line x1="12" y1="10" x2="14.5" y2="12.5" />
            <line x1="36" y1="10" x2="33.5" y2="12.5" />
            <line x1="7" y1="21" x2="10" y2="21" />
            <line x1="41" y1="21" x2="38" y2="21" />
          </g>

          {/* Golden Rising Sun Core */}
          <circle cx="24" cy="20" r="7" fill="url(#sun-gradient)" />

          {/* Integral Lotus Petals (Sri Aurobindo 4-Petal & 12-Petal Hierarchy Symbolism) */}
          {/* Center Petal */}
          <path
            d="M24 16 C22 22 21 28 24 35 C27 28 26 22 24 16 Z"
            fill="url(#lotus-gold)"
            stroke="#D97706"
            strokeWidth="0.8"
          />

          {/* Left Inner Petal */}
          <path
            d="M24 23 C18 24 15 28 17 34 C21 33 23 29 24 23 Z"
            fill="url(#lotus-sky)"
            stroke="#0284C7"
            strokeWidth="0.8"
          />

          {/* Right Inner Petal */}
          <path
            d="M24 23 C30 24 33 28 31 34 C27 33 25 29 24 23 Z"
            fill="url(#lotus-rose)"
            stroke="#E11D48"
            strokeWidth="0.8"
          />

          {/* Left Outer Petal */}
          <path
            d="M22 27 C15 28 10 33 13 38 C17 37 20 33 22 27 Z"
            fill="url(#lotus-emerald)"
            stroke="#059669"
            strokeWidth="0.8"
          />

          {/* Right Outer Petal */}
          <path
            d="M26 27 C33 28 38 33 35 38 C31 37 28 33 26 27 Z"
            fill="url(#lotus-amber)"
            stroke="#D97706"
            strokeWidth="0.8"
          />

          {/* Base Calyx Foundation / Water ripples */}
          <path
            d="M14 39 C19 42 29 42 34 39 C31 43 17 43 14 39 Z"
            fill="#0284C7"
            opacity="0.85"
          />

          {/* Definitions */}
          <defs>
            <linearGradient id="sun-gradient" x1="24" y1="13" x2="24" y2="27" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="60%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="lotus-gold" x1="24" y1="16" x2="24" y2="35" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="lotus-sky" x1="17" y1="23" x2="24" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>
            <linearGradient id="lotus-rose" x1="31" y1="23" x2="24" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFE4E6" />
              <stop offset="100%" stopColor="#FB7185" />
            </linearGradient>
            <linearGradient id="lotus-emerald" x1="13" y1="27" x2="22" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D1FAE5" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="lotus-amber" x1="35" y1="27" x2="26" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF9C3" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </motion.div>
  );
}
