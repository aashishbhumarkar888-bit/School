"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { HOUSES } from "@/lib/content/school-data";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SpotlightCard } from "./SpotlightCard";

export interface TimelineItem {
  stage: string;
  grades?: string;
  ageRange?: string;
  title: string;
  desc: string;
  house?: string;
  pillar?: string;
  tagline?: string;
}

interface AnimatedTimelineProps {
  className?: string;
  showPedagogyPillars?: boolean;
  items?: TimelineItem[];
}

const DEFAULT_STAGES: TimelineItem[] = [
  {
    stage: "Foundation Stage",
    grades: "Nursery to KG-2",
    ageRange: "2½ to 4½ Years",
    title: "Early Childhood & 'Tiny Tots' Sensory Discovery",
    desc: "Balancing formal and informal discovery in a nurturing cocoon. Children develop phonics awareness, motor coordination, and emotional security.",
    house: "teresa",
    pillar: "The Flight Path",
    tagline: "Harmonious partnership among Management, Parents, Staff & Students",
  },
  {
    stage: "Preparatory Primary Stage",
    grades: "Classes I to V",
    ageRange: "5½ to 10 Years",
    title: "Foundational Literacy, Arithmetic & Curiosity",
    desc: "Activity-centered learning establishing rock-solid fundamentals in languages, mathematical arithmetic, and environmental consciousness.",
    house: "amartya",
    pillar: "Different Strokes",
    tagline: "Multiple intelligence stimuli tailored to each child's growth",
  },
  {
    stage: "Middle School Exploration",
    grades: "Classes VI to VIII",
    ageRange: "11 to 13 Years",
    title: "Scientific Method & Experimental Labs",
    desc: "Transition to formal laboratory experiments in Physics, Chemistry, and Biology, alongside inter-house parliamentary debates and strategic chess.",
    house: "tagore",
    pillar: "Different Strokes",
    tagline: "Diverse cognitive and tactile learning stimuli",
  },
  {
    stage: "Secondary & Senior Board Rigour",
    grades: "Classes IX to XII (MPBSE)",
    ageRange: "14 to 18 Years",
    title: "MPBSE State Board Excellence & Character",
    desc: "Rigorous preparation for Madhya Pradesh Board of Secondary Education examinations with hands-on lab viva-voce and leadership responsibilities.",
    house: "raman",
    pillar: "Joy of Flying",
    tagline: "Holistic realization of enlightened, confident creators of the dawn",
  },
];

export function AnimatedTimeline({
  className = "",
  showPedagogyPillars = true,
  items,
}: AnimatedTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  const timelineList = items || DEFAULT_STAGES;
  const houseKeys = ["teresa", "amartya", "tagore", "raman"] as const;

  return (
    <div ref={containerRef} className={cn("relative max-w-5xl mx-auto py-12 px-4", className)}>
      {/* Background Central Track Beam */}
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-slate-200 rounded-full" />

      {/* Dynamic Glowing Beam Drawn via useScroll + useSpring */}
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-sky-400 via-amber-400 via-emerald-400 to-rose-500 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.5)] z-10"
      />

      <div className="space-y-16 sm:space-y-24 relative z-20">
        {timelineList.map((st, index) => {
          const houseKey = (st.house && HOUSES[st.house as keyof typeof HOUSES])
            ? (st.house as keyof typeof HOUSES)
            : houseKeys[index % houseKeys.length];
          const house = HOUSES[houseKey];
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={st.stage + index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                "relative flex flex-col sm:flex-row items-start gap-8",
                isEven ? "sm:flex-row-reverse" : ""
              )}
            >
              {/* Center Beacon Marker Node */}
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center z-30 shadow-md">
                <div
                  className="w-3.5 h-3.5 rounded-full animate-ping opacity-75"
                  style={{ backgroundColor: house.accentHex }}
                />
                <div
                  className="absolute w-3 h-3 rounded-full"
                  style={{ backgroundColor: house.accentHex }}
                />
              </div>

              {/* Card Container wrapped with 3D SpotlightCard */}
              <div className="ml-10 sm:ml-0 sm:w-1/2 px-2 sm:px-6 w-full">
                <SpotlightCard
                  house={houseKey}
                  className="p-6 sm:p-8 bg-white/95 border border-slate-200/90 shadow-[0_12px_36px_rgba(15,23,42,0.06)] overflow-hidden"
                >
                  {/* Subtle Top House Color Strip */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: house.accentHex }}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${house.accentHex}18`,
                        color: house.accentHex,
                      }}
                    >
                      {st.grades || st.stage}
                    </span>
                    {st.ageRange && (
                      <span className="text-xs text-slate-500 font-mono">Age: {st.ageRange}</span>
                    )}
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-widest block mb-1" style={{ color: house.accentHex }}>
                    {st.stage}
                  </span>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 mb-2 leading-snug">
                    {st.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                    {st.desc}
                  </p>

                  {/* Optional Pedagogy Pillar Link */}
                  {showPedagogyPillars && st.pillar && (
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <Sparkles className="w-3.5 h-3.5" style={{ color: house.accentHex }} />
                        <span className="italic">{st.tagline || st.pillar}</span>
                      </div>
                    </div>
                  )}
                </SpotlightCard>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
