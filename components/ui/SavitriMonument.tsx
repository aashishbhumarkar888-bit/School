"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SCHOOL_FACTS } from "@/lib/content/school-data";
import { Sparkles, BookOpen, Quote } from "lucide-react";

export function SavitriMonument() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-[#FCFBF9] via-amber-50/40 to-[#FCFBF9] overflow-hidden border-y border-amber-100/80">
      {/* Luminous Solar-Gold Background Glow Orbs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-amber-200/35 blur-[140px]" />
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-sky-200/35 blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-emerald-200/25 blur-[110px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sunlit Pearl & Solar-Gold Glass Monument Wrapper */}
        <div className="rounded-3xl bg-gradient-to-br from-amber-50/95 via-white to-sky-50/80 border border-amber-200/80 p-8 sm:p-12 lg:p-16 shadow-[0_24px_60px_-15px_rgba(245,158,11,0.15)] relative overflow-hidden">
          {/* Subtle Top 4-House Gradient Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-amber-400 via-emerald-400 to-rose-400" />

          {/* Section Header Badge */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs uppercase tracking-widest font-semibold mb-4 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              The Savitri Dawn Monument · Spiritual Foundation
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              "The Sun-Eyed Children of a Marvellous Dawn"
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-mono">
              The sacred vision inspiring every classroom at Sri Aurobindo School, Bhopal
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Authentic Archival Portrait of Sri Aurobindo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-4 flex flex-col items-center"
            >
              <div className="relative group">
                {/* Gold aura glow ring */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 opacity-30 blur-xl group-hover:opacity-50 transition-opacity" />

                <div className="relative rounded-3xl p-2 bg-gradient-to-b from-amber-200 via-yellow-100 to-amber-300 shadow-2xl border border-amber-300/80">
                  <div className="relative w-64 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden bg-amber-50">
                    <Image
                      src="/images/official/sri-aurobindo.jpg"
                      alt="Sri Aurobindo — Philosopher, Yogi, and Spiritual Visionary"
                      fill
                      className="object-cover object-top filter contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 256px, 288px"
                      priority
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 text-center">
                <h3 className="font-serif font-bold text-lg text-slate-900">Sri Aurobindo</h3>
                <p className="text-xs font-mono text-amber-800">1872 – 1950</p>
                <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                  Philosopher, Poet, and Master of Integral Yoga
                </p>
              </div>
            </motion.div>

            {/* Right: Sequential Scroll-Illuminated Savitri Poetry */}
            <div className="lg:col-span-8">
              <div className="relative p-6 sm:p-10 rounded-3xl bg-white/80 border border-amber-200/60 shadow-lg backdrop-blur-xl">
                <Quote className="w-10 h-10 text-amber-400/40 mb-3" />

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="space-y-3 font-serif"
                >
                  {SCHOOL_FACTS.savitriVerse.map((line, idx) => {
                    const isHighlight =
                      line.includes("sun-eyed children") ||
                      line.includes("architects of Immortality");
                    return (
                      <motion.div
                        key={idx}
                        variants={lineVariants}
                        className="group transition-transform hover:translate-x-1"
                      >
                        <p
                          className={`text-base sm:text-xl md:text-2xl leading-relaxed tracking-wide transition-colors ${
                            isHighlight
                              ? "text-gradient-gold font-bold drop-shadow-sm"
                              : "text-slate-800 group-hover:text-amber-800"
                          }`}
                        >
                          "{line}"
                        </p>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Citation & Attribution Lockup */}
                <div className="mt-8 pt-6 border-t border-amber-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-amber-900 text-xs sm:text-sm font-semibold">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span>{SCHOOL_FACTS.savitriCitation}</span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500">
                    Auro Mandir Parisar Archive
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
