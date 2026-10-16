"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealVariant = "fade-up" | "scale-up" | "tilt-in" | "slide-left" | "slide-right";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const variantMap: Record<RevealVariant, { initial: any; animate: any }> = {
  "fade-up": {
    initial: { opacity: 0, y: 36, scale: 0.96, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  },
  "scale-up": {
    initial: { opacity: 0, scale: 0.88, filter: "blur(10px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  "tilt-in": {
    initial: { opacity: 0, y: 40, rotateX: 25, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" },
  },
  "slide-left": {
    initial: { opacity: 0, x: -48, filter: "blur(6px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  "slide-right": {
    initial: { opacity: 0, x: 48, filter: "blur(6px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
};

export function ScrollReveal({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  duration = 0.7,
  once = false,
}: ScrollRevealProps) {
  const selected = variantMap[variant] || variantMap["fade-up"];

  return (
    <motion.div
      initial={selected.initial}
      whileInView={selected.animate}
      viewport={{ once, amount: 0.2 }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 24,
        delay,
        duration,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface KineticTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  delay?: number;
}

export function KineticText({
  text,
  className = "",
  highlightWords = [],
  highlightClassName = "bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-amber-500 via-emerald-600 to-rose-600 bg-[length:200%_auto] animate-gradient-x font-bold",
  delay = 0,
}: KineticTextProps) {
  const words = text.split(" ");
  const normalizedHighlights = highlightWords.map((w) => w.toLowerCase());

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 24,
      rotateX: -40,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn("inline-block [perspective:1000px]", className)}
    >
      {words.map((word, idx) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9–-]/g, "").toLowerCase();
        const isHighlight = normalizedHighlights.some((hw) => {
          const hwWords = hw.split(" ");
          return hwWords.includes(cleanWord) || hw === cleanWord;
        });

        return (
          <motion.span
            key={idx}
            variants={wordVariants}
            className={cn(
              "inline-block mr-[0.28em] last:mr-0 [transform-style:preserve-3d]",
              isHighlight && highlightClassName
            )}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
