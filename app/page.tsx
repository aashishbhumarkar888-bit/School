"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  SCHOOL_FACTS,
  HOUSES,
  PEDAGOGICAL_PILLARS,
  CAMPUS_FACILITIES,
  NOTICES_DATA,
  EVENTS_DATA,
} from "@/lib/content/school-data";
import { HouseId } from "@/lib/types";
import { useHouse } from "@/lib/context/HouseContext";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HouseSwitcher } from "@/components/ui/HouseSwitcher";
import { SavitriMonument } from "@/components/ui/SavitriMonument";
import { AgeEligibilityCalculator } from "@/components/ui/AgeEligibilityCalculator";
import { AnimatedTimeline } from "@/components/ui/AnimatedTimeline";
import { HouseSpiritQuiz } from "@/components/ui/HouseSpiritQuiz";
import {
  Sparkles,
  ArrowRight,
  Shield,
  BookOpen,
  FlaskConical,
  Trophy,
  Compass,
  Calendar,
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  ChevronRight,
  Award,
  GraduationCap,
  Heart,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const { activeHouse, setHouse } = useHouse();
  const [activeGazetteTab, setActiveGazetteTab] = useState<"notices" | "events">("notices");

  const currentHouseInfo = HOUSES[activeHouse];

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFBF9] text-slate-900">
      {/* ================= 1. CINEMATIC LUMINOUS DAYLIGHT HERO SECTION ================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-6 pb-20">
        <AuroraBackground className="absolute inset-0 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 7 Columns: Editorial Headline & Copy */}
            <div className="lg:col-span-7 text-left space-y-6">
              {/* Institutional Heritage Badge */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/90 shadow-sm text-xs text-slate-700"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-slate-900">Est. July 1989</span>
                <span className="text-slate-300">•</span>
                <span>Sri Aurobindo Education Centre (SAEC)</span>
                <span className="text-slate-300">•</span>
                <span className="text-sky-700 font-semibold">MPBSE K–12</span>
              </motion.div>

              {/* Kinetic Luminous Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.08]"
              >
                Nurturing the <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600">
                  Sun-Eyed Children
                </span>{" "}
                <br />
                <span className="text-3xl sm:text-4xl md:text-5xl font-light italic text-slate-600">
                  of a Marvellous Dawn
                </span>
              </motion.h1>

              {/* Subtitle Grounded in Verified Ethos */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
              >
                Welcome to <strong>Sri Aurobindo School, Bhopal</strong> — an integral co-educational K–12 sanctuary at Tulsi Nagar. Guided by Sri Aurobindo and The Mother, we cultivate razor-sharp intellect, spirited courage, and noble character.
              </motion.p>

              {/* Dual Magnetic Action CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link href="/admissions">
                  <MagneticButton
                    variant="primary"
                    className="px-7 py-3.5 text-sm sm:text-base font-bold shadow-[0_8px_24px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.35)]"
                  >
                    <span>Apply for Admission 2026–27</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </Link>

                <Link href="/about">
                  <MagneticButton
                    variant="glass"
                    className="px-6 py-3.5 text-sm sm:text-base font-semibold border-slate-200 text-slate-800 bg-white/80 hover:bg-white"
                  >
                    <Compass className="w-4 h-4 text-sky-600" />
                    <span>Explore Heritage</span>
                  </MagneticButton>
                </Link>
              </motion.div>

              {/* Verified Credibility Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                <div className="p-3 rounded-2xl bg-white/70 border border-slate-200/80 shadow-xs">
                  <p className="text-xl font-bold font-serif text-sky-600">July 1989</p>
                  <p className="text-[11px] text-slate-500 font-medium">Founded by SAEC</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/70 border border-slate-200/80 shadow-xs">
                  <p className="text-xl font-bold font-serif text-amber-600">K–12 Co-ed</p>
                  <p className="text-[11px] text-slate-500 font-medium">Nursery to XII</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/70 border border-slate-200/80 shadow-xs">
                  <p className="text-xl font-bold font-serif text-emerald-600">MPBSE</p>
                  <p className="text-[11px] text-slate-500 font-medium">Board Affiliated</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/70 border border-slate-200/80 shadow-xs">
                  <p className="text-xl font-bold font-serif text-rose-600">4 Houses</p>
                  <p className="text-[11px] text-slate-500 font-medium">Championship</p>
                </div>
              </motion.div>
            </div>

            {/* Right 5 Columns: 3D Floating Official Campus Building Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl p-3 bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)]">
                {/* 4-House subtle corner aura */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src="/images/official/society.jpg"
                    alt="Sri Aurobindo Education Centre & School Campus, Tulsi Nagar, Bhopal"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                      Official Campus Photo
                    </span>
                    <h3 className="font-serif font-bold text-base leading-tight">
                      Sri Aurobindo Education Centre (SAEC)
                    </h3>
                    <p className="text-xs text-slate-200 font-light mt-0.5">
                      Auro Mandir Parisar, Behind Kannad Bhawan, Tulsi Nagar, Bhopal
                    </p>
                  </div>
                </div>

                {/* Floating Glass Badges */}
                <div className="absolute -bottom-4 -left-3 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-md flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Origin
                    </span>
                    <span className="text-xs font-bold text-slate-800">Founded July 1989</span>
                  </div>
                </div>

                <div className="absolute -top-3 -right-3 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-md flex items-center gap-2">
                  <Shield className="w-4 h-4 text-sky-600" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Recognition
                    </span>
                    <span className="text-xs font-bold text-slate-800">MPBSE K–12</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 2. INTERACTIVE FOUR-HOUSE PORTAL ================= */}
      <section className="py-20 bg-gradient-to-b from-transparent via-slate-100/50 to-white relative border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold mb-3 border border-sky-200">
                <Shield className="w-3.5 h-3.5" />
                <span>The Core Student Culture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">
                The Four School Houses
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl">
                Every student at Sri Aurobindo School is inducted into one of four vibrant houses,
                fostering camaraderie, civic responsibility, and healthy inter-house athletic and
                academic competition.
              </p>
            </div>

            <Link
              href="/school-life"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-sky-800"
            >
              <span>Explore House Championships</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4-House Interactive Grid */}
          <HouseSwitcher
            currentHouse={activeHouse}
            onChange={(h) => setHouse(h)}
            variant="full"
          />

          {/* Active House Feature Banner */}
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_12px_36px_rgba(15,23,42,0.06)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span
                  className="w-3.5 h-3.5 rounded-full shadow-sm"
                  style={{ backgroundColor: currentHouseInfo.accentHex }}
                />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Active House Identity
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-serif">
                {currentHouseInfo.name} · "{currentHouseInfo.motto}"
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                {currentHouseInfo.patronStory}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <Link href="/school-life">
                <MagneticButton
                  variant="outline"
                  className="px-5 py-2.5 text-xs font-semibold border-slate-300 text-slate-800 bg-white hover:bg-slate-50"
                >
                  View Competitions
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. PARENT-MAGNET FEATURE #1: HOUSE SPIRIT QUIZ ================= */}
      <section className="py-16 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <HouseSpiritQuiz />
        </div>
      </section>

      {/* ================= 4. SUNLIT SAVITRI MONUMENT ================= */}
      <SavitriMonument />

      {/* ================= 5. FROSTED SPOTLIGHT BENTO GRID: CAMPUS & INFRASTRUCTURE ================= */}
      <section className="py-24 bg-gradient-to-b from-white via-slate-50/80 to-white relative border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Auro Mandir Parisar Infrastructure
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 mt-4 tracking-tight">
              Spaces Designed for Discovery
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3">
              From hands-on experimental laboratories to our serene central library and vast sports
              playgrounds, our green campus nurtures every dimension of child growth.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAMPUS_FACILITIES.map((facility, index) => {
              const isLarge = index === 0 || index === 3;
              return (
                <SpotlightCard
                  key={facility.id}
                  house={facility.house}
                  className={isLarge ? "lg:col-span-2" : "col-span-1"}
                >
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {facility.category}
                        </span>
                        <span className="text-xs text-amber-600 font-bold">
                          {facility.badge}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mb-3">
                        {facility.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {facility.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="capitalize">Aligned with {facility.house} House</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 6. METHODOLOGY & SCROLL-LINKED TIMELINE ================= */}
      <section className="py-24 bg-white relative border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              Teaching Methodology
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 mt-4 tracking-tight">
              The Three Pedagogical Pillars
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3">
              Crafted from the foundational charter of Sri Aurobindo Education Centre, our learning
              framework takes students from early childhood wonder to confident board mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PEDAGOGICAL_PILLARS.map((pillar, i) => (
              <div
                key={pillar.title}
                className="relative p-8 rounded-3xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between hover:bg-white hover:shadow-lg transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-lg font-serif font-bold text-slate-800 mb-6">
                    0{i + 1}
                  </div>

                  <span className="text-xs uppercase font-bold tracking-wider text-amber-600">
                    {pillar.tagline}
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-slate-900 mt-1 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-200/60 pt-4">
                    {pillar.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 flex justify-between">
                  <span>Pillar {i + 1} of 3</span>
                  <span className="capitalize font-semibold text-slate-700">{pillar.houseAlignment} Spirit</span>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll-Linked Pedagogical Odyssey Timeline */}
          <div className="mt-20 pt-16 border-t border-slate-200/80">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                Educational Journey · Nursery to Class XII
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-3">
                Scroll-Linked Pedagogical Odyssey
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                As children progress through the school's developmental tiers, our curriculum
                illuminates their path from early sensory play to state board excellence.
              </p>
            </div>

            <AnimatedTimeline />
          </div>
        </div>
      </section>

      {/* ================= 7. AGE ELIGIBILITY CALCULATOR CONCIERGE ================= */}
      <section className="py-20 bg-gradient-to-b from-white via-slate-50/70 to-white relative border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AgeEligibilityCalculator />
        </div>
      </section>

      {/* ================= 8. LIVE GAZETTE & EVENTS ================= */}
      <section className="py-20 bg-white relative border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                Official School Gazette
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-2">
                Notices & Academic Milestones
              </h2>
            </div>

            {/* Tab Switcher */}
            <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200">
              <button
                onClick={() => setActiveGazetteTab("notices")}
                className={cn(
                  "px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer",
                  activeGazetteTab === "notices"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Active Circulars ({NOTICES_DATA.length})
              </button>
              <button
                onClick={() => setActiveGazetteTab("events")}
                className={cn(
                  "px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer",
                  activeGazetteTab === "events"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Three-Term Calendar
              </button>
            </div>
          </div>

          {activeGazetteTab === "notices" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {NOTICES_DATA.slice(0, 4).map((notice) => (
                <div
                  key={notice.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-sky-800 border border-sky-200">
                        {notice.category}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">{notice.date}</span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                      {notice.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {notice.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Ref: {notice.id}</span>
                    <Link
                      href={`/notices/${notice.id}`}
                      className="text-sky-700 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      Read Circular <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {EVENTS_DATA.map((evt) => (
                <div
                  key={evt.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-amber-700">
                        {evt.term}
                      </span>
                      <span className="text-xs text-slate-500">{evt.date}</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-1.5">{evt.title}</h4>
                    <p className="text-xs text-slate-600 mb-4 leading-relaxed">{evt.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-sky-600" />
                      <span>{evt.time}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>{evt.location}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= 9. CAMPUS LOCATION & VISITATION STRIP ================= */}
      <section className="py-20 bg-slate-50/60 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Auro Mandir Parisar
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900">
                Visit Sri Aurobindo School, Bhopal
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our green campus is situated at Auro Mandir Parisar, Behind Kannad Bhawan, 2nd Stop,
                Tulsi Nagar, Bhopal. The School Office registration window is open Monday through
                Saturday from 8:00 AM to 1:00 PM.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-600">
                <a
                  href={`tel:${SCHOOL_FACTS.phone.replace(/[^0-9]/g, "")}`}
                  className="flex items-center gap-2 hover:text-slate-900"
                >
                  <Phone className="w-4 h-4 text-sky-600" />
                  <span className="font-bold text-slate-800">{SCHOOL_FACTS.phone}</span>
                </a>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>8:00 AM – 1:00 PM (Mon–Sat)</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Link href="/contact">
                <MagneticButton variant="glass" className="px-6 py-3 text-sm font-semibold border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800">
                  <span>Campus Directions</span>
                </MagneticButton>
              </Link>
              <Link href="/admissions">
                <MagneticButton variant="primary" className="px-6 py-3 text-sm font-bold shadow-md">
                  <span>Admission Enquiry Form</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
