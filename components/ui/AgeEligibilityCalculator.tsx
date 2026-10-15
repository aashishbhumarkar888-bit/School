"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AGE_ELIGIBILITY_TABLE } from "@/lib/content/school-data";
import { Sparkles, Calendar, ArrowRight, CheckCircle2, Award, Clock } from "lucide-react";
import confetti from "canvas-confetti";
import Link from "next/link";

export function AgeEligibilityCalculator() {
  const [selectedAge, setSelectedAge] = useState<number>(3);
  const [celebrated, setCelebrated] = useState(false);

  // Determine eligible standard
  const getEligibility = (age: number) => {
    if (age >= 2.5 && age <= 3.2) {
      return {
        grade: "Nursery",
        range: "2½ – 3 Years",
        color: "#0EA5E9",
        bgTint: "bg-sky-50 border-sky-200 text-sky-800",
        house: "Teresa House (Blue)",
        desc: "Playful introductory setting nurturing motor skills, phonics foundations, and emotional warmth.",
        routeParam: "Nursery",
      };
    } else if (age > 3.2 && age <= 4.2) {
      return {
        grade: "KG-1 (LKG)",
        range: "3½ – 4 Years",
        color: "#F59E0B",
        bgTint: "bg-amber-50 border-amber-200 text-amber-800",
        house: "Amartya House (Yellow)",
        desc: "Storytelling, early phonetic blending, number concepts, and sensorial discovery.",
        routeParam: "KG-1",
      };
    } else if (age > 4.2 && age <= 5.2) {
      return {
        grade: "KG-2 (UKG)",
        range: "4½ Years",
        color: "#10B981",
        bgTint: "bg-emerald-50 border-emerald-200 text-emerald-800",
        house: "Tagore House (Green)",
        desc: "Preparatory reading, creative drawing, cognitive tasks, and structured activity sessions.",
        routeParam: "KG-2",
      };
    } else if (age > 5.2 && age <= 6.5) {
      return {
        grade: "Class I (1st Standard)",
        range: "5½ Years",
        color: "#EF4444",
        bgTint: "bg-rose-50 border-rose-200 text-rose-800",
        house: "Raman House (Red)",
        desc: "Inception of formal schooling under MPBSE guidelines: languages, arithmetic, and EVS.",
        routeParam: "Class I",
      };
    } else {
      const classNum = Math.min(12, Math.max(2, Math.round(age - 5)));
      return {
        grade: `Class ${classNum} (Middle / High School)`,
        range: `${age} Years Old`,
        color: "#0EA5E9",
        bgTint: "bg-sky-50 border-sky-200 text-sky-800",
        house: "House System & Labs",
        desc: "Admissions granted against available vacancies with prior school transfer certificate & mark sheet.",
        routeParam: `Class ${classNum}`,
      };
    }
  };

  const currentMatch = getEligibility(selectedAge);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSelectedAge(val);

    // Trigger subtle confetti burst when crossing key thresholds
    if (!celebrated && (val === 2.5 || val === 3.5 || val === 4.5 || val === 5.5)) {
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.8 },
      });
      setCelebrated(true);
      setTimeout(() => setCelebrated(false), 2000);
    }
  };

  return (
    <div className="relative rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.08)] overflow-hidden">
      {/* Top rainbow accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-amber-400 via-emerald-400 to-rose-400" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left 7 Columns: Input & Interactive Slider */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Official MPBSE Age Matcher</span>
            </span>
            <span className="text-xs text-slate-500 font-medium">June Session Cutoff</span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 tracking-tight">
              Interactive Admission Concierge
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Select your child's age (as on June session start) to instantly discover their official
              entry grade at Sri Aurobindo School, Bhopal.
            </p>
          </div>

          {/* Age Slider in daylight container */}
          <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600 font-medium">Child's Approximate Age:</span>
              <span className="text-lg font-bold text-slate-900 px-3 py-1 rounded-xl bg-white border border-slate-200 shadow-2xs">
                {selectedAge} Years
              </span>
            </div>

            <input
              type="range"
              min="2.5"
              max="16"
              step="0.5"
              value={selectedAge}
              onChange={handleSliderChange}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />

            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>2.5 Yrs (Nursery)</span>
              <span>4.5 Yrs (KG-2)</span>
              <span>5.5 Yrs (Class 1)</span>
              <span>12+ Yrs (Senior)</span>
            </div>
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Quick Select:</span>
            {[
              { label: "Nursery (3 Yrs)", val: 3 },
              { label: "KG-1 (4 Yrs)", val: 4 },
              { label: "KG-2 (4.5 Yrs)", val: 4.5 },
              { label: "Class I (5.5 Yrs)", val: 5.5 },
              { label: "Class VI (11 Yrs)", val: 11 },
              { label: "Class X (15 Yrs)", val: 15 },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => setSelectedAge(preset.val)}
                className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer font-medium ${
                  selectedAge === preset.val
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right 5 Columns: Real-time Eligibility Result Card with official photo thumb */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMatch.grade}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.25 }}
              className="relative rounded-3xl p-6 sm:p-7 border border-slate-200 bg-white shadow-lg overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: currentMatch.color }}
              />

              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${currentMatch.color}18`,
                    color: currentMatch.color,
                  }}
                >
                  Eligible For
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> June Session
                </span>
              </div>

              <h4 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 mb-1">
                {currentMatch.grade}
              </h4>
              <p className="text-xs font-semibold text-slate-500 mb-3">
                Criterion: <span className="text-slate-800 font-bold">{currentMatch.range}</span>
              </p>

              <p className="text-xs text-slate-600 leading-relaxed mb-6">{currentMatch.desc}</p>

              <div className="space-y-2 mb-6 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Registration Window: 8:00 AM – 1:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Proforma Fee: ₹100/- with Birth Certificate</span>
                </div>
              </div>

              <Link
                href={`/admissions?grade=${encodeURIComponent(currentMatch.routeParam)}#enquiry-form`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-white text-xs sm:text-sm shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: currentMatch.color,
                }}
              >
                <span>Apply for {currentMatch.grade.split(" ")[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
