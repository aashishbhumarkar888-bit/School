"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SCHOOL_FACTS, HOUSES } from "@/lib/content/school-data";
import { SavitriMonument } from "@/components/ui/SavitriMonument";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ScrollReveal, KineticText } from "@/components/ui/ScrollReveal";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { InteractiveHeroShowcase } from "@/components/ui/InteractiveHeroShowcase";
import { AnimatedCounterStrip } from "@/components/ui/AnimatedCounterStrip";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { AnimatedTimeline, TimelineItem } from "@/components/ui/AnimatedTimeline";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import {
  Compass,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Users,
  Sparkles,
  Shield,
  Heart,
  Quote,
  ArrowRight,
  Target,
  Sun,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TIMELINE_EVENTS: TimelineItem[] = [
  {
    stage: "July 1989",
    title: "Founding of Sri Aurobindo Education Centre (SAEC)",
    desc: "Visionary educationists and devotees registered the Sri Aurobindo Education Centre under the MP Registrar of Firms & Societies with a written constitution to nurture integral education in Bhopal.",
    house: "teresa",
    pillar: "SAEC Charter",
    tagline: "Registered Educational Society · Written Constitution",
  },
  {
    stage: "1990s",
    title: "Inception of Auro Mandir Parisar Campus",
    desc: "Establishment of the permanent green campus at 2nd Stop, Tulsi Nagar, Bhopal, designed with ventilated classrooms and open playgrounds for holistic youth development.",
    house: "amartya",
    pillar: "Parisar Grounds",
    tagline: "2nd Stop, Tulsi Nagar Permanent Campus",
  },
  {
    stage: "2000s",
    title: "MPBSE Affiliation & Laboratory Expansion",
    desc: "Formal affiliation with the Madhya Pradesh Board of Secondary Education (MPBSE) and commissioning of dedicated Physics, Chemistry, and Biology laboratories.",
    house: "tagore",
    pillar: "State Affiliation",
    tagline: "MPBSE Board & Science Experimental Viva",
  },
  {
    stage: "2010s",
    title: "Institution of the Four School Houses",
    desc: "Formalization of Teresa (Blue), Amartya (Yellow), Tagore (Green), and Raman (Red) Houses to institutionalize student leadership and year-round co-curricular championships.",
    house: "raman",
    pillar: "House Championships",
    tagline: "Teresa · Amartya · Tagore · Raman Houses",
  },
  {
    stage: "Present Day",
    title: "Digital Smart Classrooms & Integral Learning",
    desc: "Over 35 years of educational credibility, blending modern multimedia teaching aids with timeless human ethics and spiritual mindfulness.",
    house: "teresa",
    pillar: "Integral Evolution",
    tagline: "Over 35 Years of Continuous Educational Trust",
  },
];

import { EditorialImageFrame } from "@/components/ui/EditorialImageFrame";

export function AboutPageClient() {
  const [selectedHouse, setSelectedHouse] = useState<string>("teresa");

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      {/* ================= 1. HEADER HERO BANNER WITH ARCHITECTURAL DOT MATRIX ================= */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        {/* Subtle architectural dot grid matrix with soft radial mask */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-6">
              {/* Institutional Heritage Badge */}
              <ScrollReveal variant="fade-up" delay={0.05}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm text-xs font-bold text-blue-800">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                  </span>
                  <Compass className="w-3.5 h-3.5 text-blue-600" />
                  <span>Institutional Heritage · Est. July 1989</span>
                </div>
              </ScrollReveal>

              {/* Kinetic Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12]">
                <KineticText
                  text="A Legacy of Integral Education in Bhopal"
                  highlightWords={["Integral", "Education"]}
                  delay={0.1}
                />
              </h1>

              {/* Verified Editorial Narrative */}
              <ScrollReveal variant="fade-up" delay={0.2}>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  Sri Aurobindo School, Bhopal was established in July 1989 under the auspices of the{" "}
                  <strong className="text-slate-800 font-semibold">Sri Aurobindo Education Centre (SAEC)</strong>.
                  Guided by a written constitution registered with the MP Registrar of Firms and Societies,
                  we nurture physically healthy, intellectually stimulated, emotionally balanced, and spiritually
                  conscious human beings.
                </p>
              </ScrollReveal>

              {/* 4 Interactive House Pill Tags */}
              <ScrollReveal variant="fade-up" delay={0.3}>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
                    Houses:
                  </span>
                  {Object.entries(HOUSES).map(([key, h]) => (
                    <motion.button
                      key={key}
                      onClick={() => setSelectedHouse(key)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs border",
                        selectedHouse === key
                          ? "bg-white text-slate-900 ring-2 shadow-sm"
                          : "bg-white/80 text-slate-600 hover:bg-white"
                      )}
                      style={{
                        borderColor: `${h.accentHex}40`,
                        boxShadow: selectedHouse === key ? `0 0 12px ${h.accentHex}35` : undefined,
                      }}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: h.accentHex }}
                      />
                      <span>{h.name}</span>
                      <span className="text-[10px] opacity-60">({h.motto})</span>
                    </motion.button>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right 5 Columns: Multi-Layered Architectural Showcase Card with EditorialImageFrame */}
            <div className="lg:col-span-5">
              <ScrollReveal variant="tilt-in" delay={0.25}>
                <EditorialImageFrame
                  src="/images/official/society.jpg"
                  alt="Sri Aurobindo Education Centre Campus Building"
                  aspectRatio="aspect-[4/3]"
                  caption="Sri Aurobindo Education Centre · Founded July 1989"
                  priority
                  badgeTopLeft={{
                    title: "Registered July 1989",
                    subtitle: "Registrar of Firms & Societies, MP",
                    iconName: "shield",
                  }}
                  badgeBottomRight={{
                    title: "MPBSE Affiliated",
                    subtitle: "Nursery to Class XII · Co-Ed",
                    iconName: "award",
                  }}
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4-COLUMN INSTITUTIONAL KEY-FACTS RIBBON ================= */}
      <section className="bg-slate-50/80 border-b border-slate-200/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Founded July 1989</p>
                <p className="text-[11px] text-slate-500">35+ Years of Service</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Registered MP Society</p>
                <p className="text-[11px] text-slate-500">Written Constitution</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Nursery – Class XII</p>
                <p className="text-[11px] text-slate-500">MPBSE Affiliated</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Four House System</p>
                <p className="text-[11px] text-slate-500">Teresa · Amartya · Tagore · Raman</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. LIVE MILESTONE COUNTERS & MARQUEE ================= */}
      <section className="relative -mt-6 z-20">
        <AnimatedCounterStrip />
        <InfiniteMarquee className="mt-4" />
      </section>

      {/* ================= 3. CHAIRMAN SHRI UMESH TRIVEDI EXECUTIVE MESSAGE ================= */}
      <section id="chairman" className="py-24 bg-white relative border-b border-slate-200/80 overflow-hidden">
        {/* Subtle background ambient orb */}
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-amber-200/30 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal variant="scale-up" duration={0.8}>
            <div className="relative rounded-[32px] bg-gradient-to-br from-amber-50/90 via-white to-sky-50/70 border border-amber-200/90 p-8 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(245,158,11,0.1)] overflow-hidden">
              <BorderBeam borderWidth={2} duration={8} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Chairman 3D Tilting Official Portrait with Animated Halo */}
                <div className="lg:col-span-5 text-center lg:text-left flex flex-col items-center lg:items-start">
                  <div className="relative group">
                    {/* Glowing Aura Ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-3 rounded-[32px] bg-gradient-to-r from-amber-400 via-sky-400 to-rose-400 opacity-60 blur-md group-hover:opacity-90 transition-opacity"
                    />

                    {/* Ennobled Portrait Card */}
                    <div className="relative w-48 h-56 rounded-[28px] p-1.5 bg-white shadow-2xl overflow-hidden">
                      <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-slate-100">
                        <Image
                          src="/images/official/cm.jpg"
                          alt="Chairman Shri Umesh Trivedi - Sri Aurobindo School, Bhopal"
                          fill
                          sizes="240px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Quote Seal Badge */}
                      <div className="absolute bottom-2 right-2 w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                        <Quote className="w-4 h-4 fill-white" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center lg:text-left">
                    <h3 className="text-2xl font-bold font-serif text-slate-900 tracking-tight">
                      {SCHOOL_FACTS.chairman.name}
                    </h3>
                    <p className="text-xs text-amber-700 font-extrabold uppercase tracking-wider mt-1 inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      {SCHOOL_FACTS.chairman.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      Sri Aurobindo Education Centre (SAEC)
                    </p>
                  </div>
                </div>

                {/* Verbatim Address */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-widest bg-amber-100/90 border border-amber-200/90 px-3.5 py-1.5 rounded-full shadow-2xs">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Chairman's Official Address</span>
                  </div>

                  <blockquote className="text-base sm:text-xl text-slate-800 leading-relaxed italic border-l-4 border-amber-500 pl-6 bg-white/80 p-6 rounded-r-3xl border border-amber-100 shadow-sm relative">
                    <span className="text-4xl text-amber-300 font-serif leading-none absolute -top-2 left-2">
                      “
                    </span>
                    <span className="relative z-10">{SCHOOL_FACTS.chairman.messageExcerpt}</span>
                  </blockquote>

                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-500">
                    <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 font-semibold text-slate-700">
                      SAEC Institutional Charter
                    </span>
                    <span>•</span>
                    <span>Continuous Guidance Since July 1989</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 4. VISION, MISSION & EDUCATIONAL IDEOLOGY ================= */}
      <section id="vision-mission" className="py-24 bg-slate-50/70 relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal variant="fade-up">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                Foundational Triad
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 mt-4 tracking-tight">
                Vision, Mission & Educational Ideology
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                Integral education harmonizes physical agility, intellectual discernment, emotional
                generosity, and spiritual consciousness.
              </p>
            </ScrollReveal>
          </div>

          {/* Upper Hero Showcase for Campus Architecture */}
          <div className="mb-14 max-w-4xl mx-auto">
            <InteractiveHeroShowcase
              imageSrc="/images/official/vm.jpg"
              altText="Sri Aurobindo Parisar Campus Architecture and Garden Grounds"
              title="Auro Mandir Parisar · Academic & Spiritual Sanctum"
              subtitle="Verdant Green Environment designed for Quiet Reflection & Joyful Discovery"
              aspectRatio="aspect-[16/9]"
              badges={[
                {
                  position: "top-left",
                  content: (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-sky-200 shadow-md text-xs font-bold text-sky-800">
                      <Sun className="w-3.5 h-3.5 text-sky-600" />
                      <span>Four-Fold Integral Realization</span>
                    </div>
                  ),
                },
                {
                  position: "bottom-right",
                  content: (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-amber-200 shadow-md text-xs font-bold text-amber-800">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>"We are a happy school"</span>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          {/* 3 Staggered 3D Spotlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal variant="fade-up" delay={0.1}>
              <SpotlightCard
                house="teresa"
                className="p-8 bg-white/95 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center font-serif font-bold text-base mb-6 shadow-2xs">
                    01
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-slate-900 mb-3">Our Vision</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    To awaken the latent divine potential within every child, nurturing enlightened
                    intellects and compassionate hearts capable of creating an elevated, harmonious
                    society.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-700">Inspired by Sri Aurobindo</span>
                  <Sun className="w-4 h-4 text-sky-500" />
                </div>
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.2}>
              <SpotlightCard
                house="amartya"
                className="p-8 bg-white/95 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-serif font-bold text-base mb-6 shadow-2xs">
                    02
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-slate-900 mb-3">Our Mission</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    To provide an active, joy-filled learning atmosphere where teachers and students
                    learn with enthusiasm. Classrooms are never passive listening chambers, but vibrant
                    hubs of creative exploration.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700">"We are a happy school"</span>
                  <Heart className="w-4 h-4 text-amber-500" />
                </div>
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.3}>
              <SpotlightCard
                house="tagore"
                className="p-8 bg-white/95 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-serif font-bold text-base mb-6 shadow-2xs">
                    03
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-slate-900 mb-3">Integral Ideology</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Education is four-fold: Physical vitality through sports, Mental clarity through
                    science and math, Emotional richness through arts and houses, and Spiritual poise
                    through inner reflection.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700">Four-Fold Realization</span>
                  <Flame className="w-4 h-4 text-emerald-500" />
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 5. THE 6 AIMS & OBJECTIVES OF SAEC ================= */}
      <section className="py-24 bg-white relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <ScrollReveal variant="fade-up">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
                Constitutional Framework
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-4 tracking-tight">
                The 6 Aims & Objectives of SAEC
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Drawn directly from the written constitution of Sri Aurobindo Education Centre, guiding
                every policy and classroom practice.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCHOOL_FACTS.aimsAndObjectives.map((aim, index) => {
              const colors = ["teresa", "amartya", "tagore", "raman", "teresa", "amartya"];
              return (
                <ScrollReveal key={index} variant="fade-up" delay={index * 0.08}>
                  <SpotlightCard
                    house={colors[index]}
                    className="p-6 bg-slate-50/70 border border-slate-200/80 flex items-start gap-4 hover:bg-white h-full"
                  >
                    <span className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-xs font-bold text-slate-800 shrink-0">
                      0{index + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {aim}
                    </p>
                  </SpotlightCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 6. HISTORICAL SCROLL-LINKED TIMELINE ================= */}
      <section className="py-24 bg-slate-50/60 relative border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScrollReveal variant="fade-up">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs">
                Chronological Journey
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 mt-4 tracking-tight">
                Over Three Decades of Educational Trust
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl mx-auto">
                Scroll to follow the growth of SAEC from its founding in July 1989 to today.
              </p>
            </ScrollReveal>
          </div>

          {/* Dynamic Scroll-Linked Animated Timeline with Glowing 4-House Beam */}
          <AnimatedTimeline items={TIMELINE_EVENTS} showPedagogyPillars={true} />
        </div>
      </section>

      {/* ================= 7. SAVITRI MONUMENT ================= */}
      <SavitriMonument />
    </div>
  );
}
