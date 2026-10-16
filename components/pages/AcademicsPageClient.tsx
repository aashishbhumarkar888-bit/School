"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ACADEMIC_WINGS,
  PEDAGOGICAL_PILLARS,
  THREE_TERM_CALENDAR,
  CAMPUS_FACILITIES,
} from "@/lib/content/school-data";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileCheck,
  AlertCircle,
  Clock,
  ArrowRight,
  FlaskConical,
  Sparkles,
  Award,
  ChevronDown,
  Layers,
  Atom,
} from "lucide-react";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ScrollReveal, KineticText } from "@/components/ui/ScrollReveal";
import { InteractiveHeroShowcase } from "@/components/ui/InteractiveHeroShowcase";
import { AnimatedTimeline } from "@/components/ui/AnimatedTimeline";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { cn } from "@/lib/utils";

export function AcademicsPageClient() {
  const [activeWingId, setActiveWingId] = useState<string>(ACADEMIC_WINGS[0].id);

  return (
    <div className="bg-[#FCFBF9] text-slate-900 min-h-screen">
      {/* ================= 1. HEADER BANNER WITH LIVING AURORA & SHOWCASE ================= */}
      <section className="relative pt-28 pb-20 overflow-hidden border-b border-slate-200/80">
        <AuroraBackground className="absolute inset-0 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal variant="fade-up">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 shadow-2xs inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                  <span>Curriculum & Examination Framework · MPBSE K–12</span>
                </span>
              </ScrollReveal>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12]">
                <KineticText
                  text="Academic Excellence Rooted in Wonder"
                  highlightWords={["Academic", "Excellence"]}
                  delay={0.1}
                />
              </h1>

              <ScrollReveal variant="fade-up" delay={0.2}>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  From foundational sensory learning in the Pre-Primary wing to rigorous Madhya Pradesh
                  Board of Secondary Education (MPBSE) preparation in Senior Secondary, we cultivate
                  inquiry, scientific precision, and expressive confidence.
                </p>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={0.3}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="#wings"
                    className="px-5 py-2.5 rounded-full bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition-colors shadow-sm inline-flex items-center gap-1.5"
                  >
                    <span>Explore 4 Academic Wings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="#evaluation"
                    className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    Three-Term System
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right 5 Columns: Interactive 3D Showcase */}
            <div className="lg:col-span-5">
              <ScrollReveal variant="tilt-in" delay={0.25}>
                <InteractiveHeroShowcase
                  imageSrc="/images/official/affiliation.jpg"
                  altText="MPBSE Affiliated Academic Block - Sri Aurobindo School, Bhopal"
                  title="MPBSE Recognized Academic Block"
                  subtitle="Nursery through Class XII · Affiliated to MP State Board"
                  aspectRatio="aspect-[4/3]"
                  priority
                  badges={[
                    {
                      position: "top-left",
                      duration: 3.8,
                      content: (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-sky-200 shadow-md text-xs font-bold text-sky-800">
                          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                          <span>MPBSE K–12</span>
                        </div>
                      ),
                    },
                    {
                      position: "top-right",
                      duration: 4.5,
                      delay: 0.4,
                      content: (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-amber-200 shadow-md text-xs font-bold text-amber-900">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          <span>3-Term Exam System</span>
                        </div>
                      ),
                    },
                    {
                      position: "bottom-left",
                      duration: 5.2,
                      delay: 0.8,
                      content: (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-emerald-200 shadow-md text-xs font-bold text-emerald-900">
                          <Atom className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Physics, Chem & Bio Labs</span>
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

      {/* ================= 2. FOUR ACADEMIC WINGS WITH INTERACTIVE TABS & 3D CARDS ================= */}
      <section id="wings" className="py-24 bg-white relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <ScrollReveal variant="fade-up">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs">
                K–12 Learning Structure
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-4 tracking-tight">
                The Four Academic Wings
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Structured developmental tiers aligned with age-appropriate milestones and state board excellence.
              </p>
            </ScrollReveal>

            {/* Quick interactive wing selector pills */}
            <div className="flex flex-wrap gap-2 mt-6">
              {ACADEMIC_WINGS.map((wing) => (
                <button
                  key={wing.id}
                  onClick={() => setActiveWingId(wing.id)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border",
                    activeWingId === wing.id
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200/80"
                  )}
                >
                  {wing.title.split(" (")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ACADEMIC_WINGS.map((wing, idx) => {
              const houses = ["teresa", "amartya", "tagore", "raman"];
              const isSelected = activeWingId === wing.id;

              return (
                <ScrollReveal key={wing.id} variant="fade-up" delay={idx * 0.1}>
                  <SpotlightCard
                    house={houses[idx % 4]}
                    className={cn(
                      "p-8 bg-slate-50/80 border border-slate-200/90 flex flex-col justify-between h-full transition-all duration-300",
                      isSelected && "ring-2 ring-sky-500 bg-white shadow-lg"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          {wing.gradeRange}
                        </span>
                        <span className="text-xs text-slate-500 font-mono font-medium">
                          Age: {wing.ageBracket}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold font-serif text-slate-900 mb-3">
                        {wing.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                        {wing.description}
                      </p>

                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                            Core Curricular Focus:
                          </p>
                          <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs leading-relaxed">
                            {wing.focus}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                            Key Subjects & Domains:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {wing.keySubjects.map((subj) => (
                              <span
                                key={subj}
                                className="text-xs px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 font-medium"
                              >
                                {subj}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                      <span className="font-medium">MPBSE Standards Compliant</span>
                      <Link
                        href={`/admissions?grade=${encodeURIComponent(wing.gradeRange.split(" ")[0])}#enquiry-form`}
                        className="text-sky-700 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        Check Eligibility <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 2.5. SCROLL-LINKED PEDAGOGICAL ODYSSEY WITH 3D METHOD PHOTO ================= */}
      <section className="py-24 bg-gradient-to-b from-white via-slate-50/70 to-white relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
            <div className="lg:col-span-7">
              <ScrollReveal variant="fade-up">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs">
                  The Pedagogical Beam · Flight Path → Different Strokes → Joy of Flying
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 mt-4 tracking-tight">
                  Scroll-Linked Pedagogical Odyssey
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                  Follow the developmental trajectory of Sri Aurobindo School students, from playful early
                  childhood wonder to confident MPBSE board candidates.
                </p>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5">
              <ScrollReveal variant="tilt-in" delay={0.2}>
                <InteractiveHeroShowcase
                  imageSrc="/images/official/method.jpg"
                  altText="Teaching Methodology and Student Joy of Learning"
                  title="Integral Pedagogical Delivery"
                  subtitle="Active Enquiry & Child-Centric Development"
                  aspectRatio="aspect-[16/10]"
                  badges={[
                    {
                      position: "top-left",
                      content: (
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 border border-sky-200 shadow-md text-xs font-bold text-sky-800">
                          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                          <span>Joyful Pedagogy</span>
                        </div>
                      ),
                    },
                  ]}
                />
              </ScrollReveal>
            </div>
          </div>

          <AnimatedTimeline />
        </div>
      </section>

      {/* ================= 3. THREE-TERM EXAMINATION SYSTEM WITH 3D CURRICULUM PHOTO ================= */}
      <section id="evaluation" className="py-24 bg-white relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-7">
              <ScrollReveal variant="fade-up">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
                  Rigorous Evaluation Standards
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-4 tracking-tight">
                  The Three-Term Examination System
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2">
                  Continuous academic feedback through three planned cycles every academic year.
                </p>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5">
              <ScrollReveal variant="tilt-in" delay={0.2}>
                <InteractiveHeroShowcase
                  imageSrc="/images/official/curriculum.jpg"
                  altText="Curriculum & Board Examination Preparation"
                  title="Examination Hall & Board Preparations"
                  subtitle="Rigorous Diagnostics & Subject Diagnostic Testing"
                  aspectRatio="aspect-[16/10]"
                  badges={[
                    {
                      position: "top-right",
                      content: (
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 border border-amber-200 shadow-md text-xs font-bold text-amber-900">
                          <Award className="w-3.5 h-3.5 text-amber-600" />
                          <span>Three Formal Cycles</span>
                        </div>
                      ),
                    },
                  ]}
                />
              </ScrollReveal>
            </div>
          </div>

          {/* 3 Term Cycles Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {THREE_TERM_CALENDAR.map((term, i) => {
              const houses = ["teresa", "amartya", "tagore"];
              return (
                <ScrollReveal key={term.term} variant="fade-up" delay={i * 0.1}>
                  <SpotlightCard
                    house={houses[i]}
                    className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200/90 flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-bold text-amber-700 uppercase">
                          Cycle 0{i + 1}
                        </span>
                        <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-white text-slate-800 border border-slate-200">
                          {term.period}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">{term.term}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">{term.description}</p>

                      <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-200 pt-4">
                        {term.milestones.map((m, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Promotion & Examination Rules Card */}
          <ScrollReveal variant="scale-up" delay={0.2}>
            <div className="relative rounded-3xl bg-slate-50/90 border border-slate-200/90 p-6 sm:p-8 overflow-hidden">
              <BorderBeam borderWidth={1.5} duration={9} />
              <h4 className="text-lg font-bold font-serif text-slate-900 mb-4 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                <span>Statutory Examination & Promotion Guidelines</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-600">
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 block">Pass Percentage:</span>
                  <p>
                    Minimum 33% to 40% aggregate marks required across each registered subject as per
                    state board mandates.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 block">Parent Signature:</span>
                  <p>
                    Report cards are presented at formal Parent-Teacher Meetings and must be signed by
                    the parent or registered guardian.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 block">Supplementary Exam:</span>
                  <p>
                    Students failing in 1 or 2 subjects are eligible for remedial supplementary
                    re-assessment before promotion.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 block">Fee Clearance:</span>
                  <p>
                    All term tuition dues must be cleared prior to hall ticket release and examination
                    hall entry.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 4. SCIENCE LABS & VIVA TRAINING ================= */}
      <section className="py-24 bg-slate-50/60 relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <ScrollReveal variant="fade-up">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
                  Practical Laboratory Mastery
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
                  Physics, Chemistry & Biology Laboratories
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Science cannot be mastered through textbooks alone. At Sri Aurobindo School, our
                  laboratories are vibrant research workshops where students build demonstrable working
                  models, perform rigorous titrations, and receive intensive viva-voce preparation for
                  MPBSE board examinations.
                </p>

                <div className="space-y-3 pt-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <FlaskConical className="w-4 h-4 text-sky-600" />
                    <span>Demonstrable working models exhibited at the annual science symposium</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Standardized optical apparatus, spectrometers, and chemical benches</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span>Individual viva-voce coaching by senior secondary subject faculty</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/gallery"
                    className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-sky-800"
                  >
                    <span>View Lab Photographs in Gallery</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-6">
              <ScrollReveal variant="scale-up" delay={0.2}>
                <SpotlightCard
                  house="amartya"
                  className="p-8 bg-white/95 border border-slate-200/90 shadow-sm space-y-6"
                >
                  <h3 className="text-2xl font-bold font-serif text-slate-900">
                    Central Library & Scheduled Reading Hours
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Our library is a peaceful sanctuary containing encyclopedias, literature classics,
                    general knowledge compendiums, and computer research texts. Daily reading periods are
                    scheduled for every single class, establishing lifelong habits of quiet inquiry.
                  </p>
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                    <span className="font-bold block mb-1">Daily Class Schedule:</span>
                    Every class has a designated daily library hour to borrow books, review national
                    periodicals, and engage in supervised research.
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
