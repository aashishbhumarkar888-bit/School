"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Shield, Sparkles, Trophy, BookOpen } from "lucide-react";
import { BorderBeam } from "./BorderBeam";
import { cn } from "@/lib/utils";

interface CounterItemProps {
  numericTarget: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
  houseColor: "sky" | "amber" | "emerald" | "rose";
  icon: React.ElementType;
}

function SpringCounter({
  numericTarget,
  prefix = "",
  suffix = "",
}: {
  numericTarget: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const spring = useSpring(0, {
    stiffness: 75,
    damping: 18,
    restDelta: 0.001,
  });

  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    if (isInView) {
      spring.set(numericTarget);
    }
  }, [isInView, numericTarget, spring]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export function AnimatedCounterStrip({ className = "" }: { className?: string }) {
  const counters: CounterItemProps[] = [
    {
      numericTarget: 1989,
      label: "Founded July 1989",
      sublabel: "Registered Society · SAEC Constitution",
      houseColor: "sky",
      icon: Shield,
    },
    {
      numericTarget: 37,
      suffix: "+",
      label: "Years of Heritage",
      sublabel: "Integral Education Legacy in Bhopal",
      houseColor: "amber",
      icon: Sparkles,
    },
    {
      numericTarget: 4,
      label: "Official Houses",
      sublabel: "Teresa · Amartya · Tagore · Raman",
      houseColor: "emerald",
      icon: Trophy,
    },
    {
      numericTarget: 12,
      prefix: "K–",
      label: "Educational Continuum",
      sublabel: "Pre-Primary to Class XII MPBSE",
      houseColor: "rose",
      icon: BookOpen,
    },
  ];

  const houseStyles = {
    sky: {
      borderTop: "border-sky-500",
      glow: "hover:border-sky-300",
      accent: "text-sky-600",
      badge: "bg-sky-50 text-sky-700 border-sky-200",
    },
    amber: {
      borderTop: "border-amber-500",
      glow: "hover:border-amber-300",
      accent: "text-amber-600",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
    },
    emerald: {
      borderTop: "border-emerald-500",
      glow: "hover:border-emerald-300",
      accent: "text-emerald-600",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    rose: {
      borderTop: "border-rose-500",
      glow: "hover:border-rose-300",
      accent: "text-rose-600",
      badge: "bg-rose-50 text-rose-700 border-rose-200",
    },
  };

  return (
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {counters.map((item, idx) => {
          const style = houseStyles[item.houseColor];
          const Icon = item.icon;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 24,
                delay: idx * 0.1,
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={cn(
                "relative rounded-3xl p-6 bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.05)] overflow-hidden transition-all duration-300",
                "border-t-4",
                style.borderTop,
                style.glow
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={cn(
                    "w-9 h-9 rounded-2xl flex items-center justify-center border shadow-2xs",
                    style.badge
                  )}
                >
                  <Icon className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  0{idx + 1}
                </span>
              </div>

              <div className="font-serif text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                <SpringCounter
                  numericTarget={item.numericTarget}
                  prefix={item.prefix}
                  suffix={item.suffix}
                />
              </div>

              <h3 className="font-serif font-bold text-slate-800 text-sm mt-2">{item.label}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.sublabel}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
