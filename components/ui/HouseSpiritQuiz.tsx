"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useHouse } from "@/lib/context/HouseContext";
import { HOUSES } from "@/lib/content/school-data";
import { HouseId } from "@/lib/types";
import { Sparkles, ArrowRight, RotateCcw, Heart, BookOpen, Palette, Zap, Award, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  question: string;
  tagline: string;
  options: {
    text: string;
    subtext: string;
    house: HouseId;
    icon: React.ElementType;
    color: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What activity brings out the brightest sparkle in your child?",
    tagline: "Every child carries a distinctive spark of genius",
    options: [
      {
        text: "Helping peers, empathy & community service",
        subtext: "Naturally cares for younger students and team wellbeing",
        house: "teresa",
        icon: Heart,
        color: "text-sky-600 bg-sky-50 border-sky-200 hover:border-sky-400",
      },
      {
        text: "Asking 'Why?', reading deeply & solving puzzles",
        subtext: "Fascinated by books, logic, debates and trivia",
        house: "amartya",
        icon: BookOpen,
        color: "text-amber-600 bg-amber-50 border-amber-200 hover:border-amber-400",
      },
      {
        text: "Painting, music, nature walks & storytelling",
        subtext: "Expressive, creative, and emotionally connected to nature",
        house: "tagore",
        icon: Palette,
        color: "text-emerald-600 bg-emerald-50 border-emerald-200 hover:border-emerald-400",
      },
      {
        text: "Tinkering, science experiments & sports track sprints",
        subtext: "Fearless energy, loves sports, gadgets and movement",
        house: "raman",
        icon: Zap,
        color: "text-rose-600 bg-rose-50 border-rose-200 hover:border-rose-400",
      },
    ],
  },
  {
    id: 2,
    question: "When facing a fresh challenge, what is their instinctive strength?",
    tagline: "Character reveals itself in moments of curiosity and effort",
    options: [
      {
        text: "Patient listening & peaceful collaboration",
        subtext: "Unites classmates and resolves disputes with kindness",
        house: "teresa",
        icon: Heart,
        color: "text-sky-600 bg-sky-50 border-sky-200 hover:border-sky-400",
      },
      {
        text: "Careful reasoning & questioning assumptions",
        subtext: "Looks at facts, weighs arguments and seeks the truth",
        house: "amartya",
        icon: BookOpen,
        color: "text-amber-600 bg-amber-50 border-amber-200 hover:border-amber-400",
      },
      {
        text: "Original imagination & poetic interpretation",
        subtext: "Finds beauty and unconventional angles to solve problems",
        house: "tagore",
        icon: Palette,
        color: "text-emerald-600 bg-emerald-50 border-emerald-200 hover:border-emerald-400",
      },
      {
        text: "Audacious courage & hands-on trial-and-error",
        subtext: "Leaps into action, learns by doing and loves competition",
        house: "raman",
        icon: Zap,
        color: "text-rose-600 bg-rose-50 border-rose-200 hover:border-rose-400",
      },
    ],
  },
  {
    id: 3,
    question: "Which field of mentorship would inspire them to blossom most?",
    tagline: "Integral Education nurtures all five layers of the being",
    options: [
      {
        text: "Social empathy & values-based leadership",
        subtext: "Nurturing heart, ethical conscience and global citizenship",
        house: "teresa",
        icon: Heart,
        color: "text-sky-600 bg-sky-50 border-sky-200 hover:border-sky-400",
      },
      {
        text: "Scholastic mastery, philosophy & inquiry",
        subtext: "Academic rigor, research mindset and analytical scholarship",
        house: "amartya",
        icon: BookOpen,
        color: "text-amber-600 bg-amber-50 border-amber-200 hover:border-amber-400",
      },
      {
        text: "Fine arts, stage dramatics & ecological harmony",
        subtext: "Cultivating aesthetic sensibility and literary depth",
        house: "tagore",
        icon: Palette,
        color: "text-emerald-600 bg-emerald-50 border-emerald-200 hover:border-emerald-400",
      },
      {
        text: "STEM discovery, lab models & athletics",
        subtext: "Physical agility, scientific courage and experimental rigor",
        house: "raman",
        icon: Zap,
        color: "text-rose-600 bg-rose-50 border-rose-200 hover:border-rose-400",
      },
    ],
  },
];

export function HouseSpiritQuiz() {
  const { setHouse } = useHouse();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<HouseId[]>([]);
  const [resultHouse, setResultHouse] = useState<HouseId | null>(null);

  const handleSelectOption = (house: HouseId) => {
    const updated = [...selectedAnswers, house];
    setSelectedAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate winner
      const counts: Record<HouseId, number> = {
        teresa: 0,
        amartya: 0,
        tagore: 0,
        raman: 0,
      };
      updated.forEach((h) => {
        counts[h] = (counts[h] || 0) + 1;
      });

      let winner: HouseId = "teresa";
      let maxCount = -1;
      (Object.keys(counts) as HouseId[]).forEach((h) => {
        if (counts[h] > maxCount) {
          maxCount = counts[h];
          winner = h;
        }
      });

      setResultHouse(winner);
      setHouse(winner);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setResultHouse(null);
  };

  const currentQ = QUESTIONS[currentStep];

  return (
    <div className="relative rounded-3xl bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.08)] overflow-hidden p-6 sm:p-10">
      {/* Decorative top rainbow bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-amber-400 via-emerald-400 to-rose-400" />

      <AnimatePresence mode="wait">
        {!resultHouse ? (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Header with step pill */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Child House Spirit Matcher</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  {currentQ.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {currentQ.tagline}
                </p>
              </div>

              {/* Progress counter */}
              <div className="flex items-center gap-1.5 self-start sm:self-center">
                {QUESTIONS.map((_, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      "w-7 h-2 rounded-full transition-all",
                      idx === currentStep
                        ? "bg-sky-600 w-10"
                        : idx < currentStep
                        ? "bg-slate-300"
                        : "bg-slate-200"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {currentQ.options.map((opt, i) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt.house)}
                    className={cn(
                      "text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer bg-white group hover:shadow-md hover:-translate-y-0.5",
                      opt.color
                    )}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border bg-white shadow-xs group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
                          {opt.text}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-relaxed">
                          {opt.subtext}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span>Step {currentStep + 1} of {QUESTIONS.length}</span>
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="text-slate-600 hover:text-slate-900 font-semibold"
                >
                  ← Previous Question
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, type: "spring", stiffness: 260, damping: 20 }}
            className="text-center py-4 sm:py-6 space-y-6"
          >
            {/* Celebratory badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Perfect House Resonance Identified!</span>
            </div>

            <div className="max-w-md mx-auto">
              <div
                className="w-20 h-20 mx-auto rounded-3xl p-1 shadow-xl mb-4 flex items-center justify-center"
                style={{ backgroundColor: HOUSES[resultHouse].accentHex }}
              >
                <div className="w-full h-full rounded-[20px] bg-white flex items-center justify-center">
                  <Award
                    className="w-10 h-10"
                    style={{ color: HOUSES[resultHouse].accentHex }}
                  />
                </div>
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">
                Your Child Resonates With
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                {HOUSES[resultHouse].name}
              </h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                Patron: {HOUSES[resultHouse].patron}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 italic leading-relaxed">
                "{HOUSES[resultHouse].motto}"
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-lg mx-auto text-left">
              <p className="text-xs text-slate-600 leading-relaxed">
                We have shifted the website aura to <strong>{HOUSES[resultHouse].name}</strong>! In Sri Aurobindo School’s House System, your child will be paired with compassionate faculty mentors and given wings in sports, laboratories, arts, and scholastic championships.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
              <Link
                href={`/admissions?house=${resultHouse}#enquiry-form`}
                className="w-full sm:w-auto"
              >
                <button
                  className="w-full sm:w-auto py-3 px-6 rounded-2xl text-white font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105"
                  style={{ backgroundColor: HOUSES[resultHouse].accentHex }}
                >
                  <span>Enquire in {HOUSES[resultHouse].name} Spirit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
