"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HOUSES, CAMPUS_FACILITIES } from "@/lib/content/school-data";
import { HouseId } from "@/lib/types";
import { useHouse } from "@/lib/context/HouseContext";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ScrollReveal, KineticText } from "@/components/ui/ScrollReveal";
import { InteractiveHeroShowcase } from "@/components/ui/InteractiveHeroShowcase";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { HouseSpiritQuiz } from "@/components/ui/HouseSpiritQuiz";
import {
  Shield,
  Trophy,
  Users,
  Sparkles,
  Award,
  CheckCircle2,
  Volleyball,
  ArrowRight,
  Flame,
  Star,
  Activity,
  Heart,
  BookOpen,
  Atom,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SchoolLifePage() {
  const { activeHouse, setHouse } = useHouse();
  const [selectedHouse, setSelectedHouse] = useState<HouseId>(activeHouse || "teresa");
  const [particleTrigger, setParticleTrigger] = useState(0);

  const houseKeys: HouseId[] = ["teresa", "amartya", "tagore", "raman"];
  const currentHouse = HOUSES[selectedHouse];

  const handleHouseSelect = (id: HouseId) => {
    setSelectedHouse(id);
    setHouse(id);
    setParticleTrigger((prev) => prev + 1);
  };

  const houseIcons: Record<HouseId, React.ElementType> = {
    teresa: Heart,
    amartya: Star,
    tagore: BookOpen,
    raman: Atom,
  };

  const HouseIcon = houseIcons[selectedHouse];

  return (
    <div
      className="text-slate-900 min-h-screen transition-colors duration-700"
      style={{
        backgroundColor: "#FCFBF9",
      }}
    >
      {/* ================= 1. HEADER BANNER WITH LIVING AURORA & 3D SHOWCASE ================= */}
      <section className="relative pt-28 pb-20 overflow-hidden border-b border-slate-200/80">
        <AuroraBackground className="absolute inset-0 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal variant="fade-up">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <Flame className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Co-Curricular Culture, Athletics & Leadership</span>
                </span>
              </ScrollReveal>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12]">
                <KineticText
                  text="School Life & The Four Houses"
                  highlightWords={["Four", "Houses"]}
                  delay={0.1}
                />
              </h1>

              <ScrollReveal variant="fade-up" delay={0.2}>
                <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
                  At Sri Aurobindo School, holistic education comes alive through the Four Houses. From
                  high-energy volleyball matches and chess leagues to science symposia and cultural
                  celebrations, every student discovers their innate leadership and team spirit.
                </p>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={0.3}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="#house-championship"
                    className="px-5 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm inline-flex items-center gap-1.5"
                  >
                    <span>Explore House Championship</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="#quiz"
                    className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    Take House Spirit Quiz
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right 5 Columns: Interactive 3D Showcase */}
            <div className="lg:col-span-5">
              <ScrollReveal variant="tilt-in" delay={0.25}>
                <InteractiveHeroShowcase
                  imageSrc="/images/official/event-01.jpg"
                  altText="Campus Events and Student Life at Sri Aurobindo School"
                  title="Inter-House Campus Events & Celebrations"
                  subtitle="Fostering Camaraderie, Athletic Vigour & Expressive Arts"
                  aspectRatio="aspect-[4/3]"
                  priority
                  badges={[
                    {
                      position: "top-left",
                      duration: 3.5,
                      content: (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-emerald-200 shadow-md text-xs font-bold text-emerald-800">
                          <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                          <span>SAEC House Cup</span>
                        </div>
                      ),
                    },
                    {
                      position: "top-right",
                      duration: 4.2,
                      delay: 0.5,
                      content: (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-amber-200 shadow-md text-xs font-bold text-amber-900">
                          <Volleyball className="w-3.5 h-3.5 text-amber-600" />
                          <span>Sports & Cultural Leagues</span>
                        </div>
                      ),
                    },
                  ]}
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. INTERACTIVE 4-HOUSE LIVE CHAMPIONSHIP & VALUES SWITCHER ================= */}
      <section
        id="house-championship"
        className="py-24 relative overflow-hidden transition-all duration-700 border-b border-slate-200/80"
        style={{
          background: `radial-gradient(1000px circle at 50% 30%, ${currentHouse.accentHex}14, transparent 80%), #FFFFFF`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <ScrollReveal variant="fade-up">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs inline-flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Live Interactive House Championship Arena</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 mt-4 tracking-tight">
                Select a House to Experience its Energy
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3">
                Click any of the Four Houses below to activate its live ambient wash, championship roster,
                and cultural identity.
              </p>
            </ScrollReveal>

            {/* 4 Interactive House Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
              {houseKeys.map((id) => {
                const h = HOUSES[id];
                const isSelected = selectedHouse === id;

                return (
                  <motion.button
                    key={id}
                    onClick={() => handleHouseSelect(id)}
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2.5 border shadow-sm",
                      isSelected
                        ? "bg-white text-slate-900 ring-2 shadow-lg"
                        : "bg-white/80 text-slate-600 hover:bg-white"
                    )}
                    style={{
                      borderColor: isSelected ? h.accentHex : `${h.accentHex}30`,
                      boxShadow: isSelected
                        ? `0 12px 28px -6px ${h.accentHex}40, 0 0 0 2px ${h.accentHex}`
                        : undefined,
                    }}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full ring-2 ring-white shadow-2xs"
                      style={{ backgroundColor: h.accentHex }}
                    />
                    <span>{h.name}</span>
                    <span className="text-[11px] font-mono opacity-60 uppercase hidden sm:inline">
                      ({h.colorName})
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Morphing Dynamic Full-Width House Championship Banner with AnimatePresence */}
          <div className="relative">
            {/* Burst Particles Container */}
            <div key={particleTrigger} className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
              {Array.from({ length: 14 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{
                    x: "50%",
                    y: "40%",
                    scale: 0.2,
                    opacity: 1,
                  }}
                  animate={{
                    x: `${50 + (Math.cos((i * Math.PI) / 7) * (30 + (i % 3) * 15))}%`,
                    y: `${40 + (Math.sin((i * Math.PI) / 7) * (30 + (i % 3) * 15))}%`,
                    scale: [0.2, 1.2, 0],
                    opacity: [1, 0.8, 0],
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute w-3 h-3 rounded-full shadow-md"
                  style={{ backgroundColor: currentHouse.accentHex }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHouse}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.97 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="relative rounded-[32px] p-8 sm:p-12 md:p-16 border overflow-hidden shadow-xl"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: `${currentHouse.accentHex}40`,
                  boxShadow: `0 24px 60px -15px ${currentHouse.accentHex}25`,
                }}
              >
                <BorderBeam borderWidth={2} duration={7} />

                {/* Top Colored Identity Accent Strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-2"
                  style={{ backgroundColor: currentHouse.accentHex }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-50 border border-slate-200">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: currentHouse.accentHex }}
                      />
                      <span>{currentHouse.colorName}</span>
                      <span className="text-slate-400">•</span>
                      <span>Patron: {currentHouse.patron}</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
                      {currentHouse.name}
                    </h3>

                    <p
                      className="text-lg font-serif font-semibold italic"
                      style={{ color: currentHouse.accentHex }}
                    >
                      "{currentHouse.motto}"
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {currentHouse.patronStory}
                    </p>

                    <div className="pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Core Values Cultivated:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {currentHouse.values.map((v) => (
                          <span
                            key={v}
                            className="px-3 py-1 rounded-xl text-xs font-bold border shadow-2xs"
                            style={{
                              backgroundColor: `${currentHouse.accentHex}10`,
                              borderColor: `${currentHouse.accentHex}30`,
                              color: currentHouse.accentHex,
                            }}
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-200/90 space-y-6">
                    <div>
                      <h4 className="text-sm font-bold font-serif text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Trophy className="w-4 h-4" style={{ color: currentHouse.accentHex }} />
                        <span>Key Inter-House Competitions & Leagues</span>
                      </h4>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                        {currentHouse.competitions.map((comp) => (
                          <li
                            key={comp}
                            className="p-3.5 rounded-2xl bg-white border border-slate-200/90 flex items-start gap-2.5 shadow-2xs"
                          >
                            <CheckCircle2
                              className="w-4 h-4 shrink-0 mt-0.5"
                              style={{ color: currentHouse.accentHex }}
                            />
                            <span className="font-semibold text-slate-800">{comp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                      <span>
                        Domain Leadership Role:{" "}
                        <strong className="text-slate-900">{currentHouse.badgeRole}</strong>
                      </span>
                      <span className="font-bold text-slate-700">SAEC House Cup</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= 3. PARENT MAGNET: HOUSE SPIRIT QUIZ ================= */}
      <section id="quiz" className="py-24 bg-white relative border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <ScrollReveal variant="fade-up">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs">
                Interactive House Discovery
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3 tracking-tight">
                Discover Where Your Child Belongs
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Answer 4 quick questions to see which of the Four School Houses matches your child's personality.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal variant="scale-up" delay={0.15}>
            <HouseSpiritQuiz />
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 4. SPORTS & ATHLETICS ARENA ================= */}
      <section className="py-24 bg-slate-50/70 relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <ScrollReveal variant="fade-up">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
                Physical Vitality & Sportsmanship
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3 tracking-tight">
                Playgrounds & Indoor Strategic Games
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Sports at Sri Aurobindo School build resilience, collaborative spirit, and physical poise.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal variant="fade-up" delay={0.1}>
              <SpotlightCard
                house="teresa"
                className="p-8 bg-white/95 border border-slate-200/90 space-y-5 h-full"
              >
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
                  Outdoor Sports Grounds
                </span>
                <h3 className="text-2xl font-bold font-serif text-slate-900">
                  Volleyball, Basketball & Badminton
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Spacious outdoor courts within Auro Mandir Parisar host daily coaching sessions and
                  inter-house athletic meets. Guided by trained sports instructors, students develop
                  aerobic stamina, agility, and teamwork.
                </p>
                <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>Inter-house Volleyball League</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>Basketball championship & shooting drills</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>Badminton tournaments for junior & senior wings</span>
                  </li>
                </ul>
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.2}>
              <SpotlightCard
                house="amartya"
                className="p-8 bg-white/95 border border-slate-200/90 space-y-5 h-full"
              >
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  Indoor Strategy Arena
                </span>
                <h3 className="text-2xl font-bold font-serif text-slate-900">
                  Chess, Carrom & Table Tennis
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Strategic mental faculties and hand-eye coordination are honed in our indoor sports
                  hall. The school regularly hosts inter-house Chess leagues where analytical reasoning
                  and tactical foresight are celebrated.
                </p>
                <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Amartya House Annual Chess League</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Table Tennis singles and doubles tournaments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Precision carrom matches during sports week</span>
                  </li>
                </ul>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
