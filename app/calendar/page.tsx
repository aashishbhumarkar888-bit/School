"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { THREE_TERM_CALENDAR } from "@/lib/content/school-data";
import { EditorialImageFrame } from "@/components/ui/EditorialImageFrame";
import {
  Calendar as CalendarIcon,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  month: string;
  term: "First Term" | "Second Term" | "Annual Term" | "Co-Curricular";
  dates: string;
  title: string;
  type: "Exam" | "Academic" | "Sports" | "Cultural" | "Holiday";
  description: string;
}

const ACADEMIC_EVENTS: CalendarEvent[] = [
  {
    month: "June 2026",
    term: "First Term",
    dates: "15 June Onwards",
    title: "New Academic Session Commencement & Admissions",
    type: "Academic",
    description: "Classes commence for Nursery through Class XII. Registration desk open 8:00 AM – 1:00 PM.",
  },
  {
    month: "July 2026",
    term: "First Term",
    dates: "10 – 15 July",
    title: "Four Houses Investiture Ceremony & Prefect Badges",
    type: "Cultural",
    description: "Captains and vice-captains sworn in for Teresa, Amartya, Tagore, and Raman Houses.",
  },
  {
    month: "August 2026",
    term: "First Term",
    dates: "15 August",
    title: "Sri Aurobindo Jayanti & Independence Day Observance",
    type: "Cultural",
    description: "Special morning assembly, Savitri Dawn recitations, and national tricolour unfurling at Auro Mandir Parisar.",
  },
  {
    month: "September 2026",
    term: "First Term",
    dates: "15 – 26 September",
    title: "First Term Half-Yearly Examinations (Classes I to XII)",
    type: "Exam",
    description: "Theory papers and continuous internal assessment evaluations. Tuition fee clearance required for admit cards.",
  },
  {
    month: "October 2026",
    term: "Second Term",
    dates: "08 October",
    title: "Parent-Teacher Consultation & Signed Report Card Day",
    type: "Academic",
    description: "Mandatory term consultation between parents, teachers, and student scholars.",
  },
  {
    month: "November 2026",
    term: "Co-Curricular",
    dates: "18 – 22 November",
    title: "Annual Inter-House Sports Meet & Athletics Championship",
    type: "Sports",
    description: "Volleyball, Basketball, Badminton, Table Tennis, Chess, and Track events for SAEC Rolling Trophy.",
  },
  {
    month: "December 2026",
    term: "Second Term",
    dates: "12 – 23 December",
    title: "Second Term Examinations & Science Practical Viva",
    type: "Exam",
    description: "Classes IX–XII practical journal submissions and working model demonstrations in science laboratories.",
  },
  {
    month: "January 2027",
    term: "Annual Term",
    dates: "16 – 20 January",
    title: "Annual Science, Robotics & Savitri Literary Colloquium",
    type: "Cultural",
    description: "Exhibition of demonstrable hydraulic lifts, optics models, and inter-house philosophical debate.",
  },
  {
    month: "February 2027",
    term: "Annual Term",
    dates: "01 – 15 February",
    title: "Consolidation & Pre-Board Evaluations for Classes X & XII",
    type: "Exam",
    description: "Comprehensive MPBSE blueprint model examinations preparing students for state board boards.",
  },
  {
    month: "March – April 2027",
    term: "Annual Term",
    dates: "01 March – 10 April",
    title: "Annual MPBSE Final Board Promotional Examinations",
    type: "Exam",
    description: "Culminating promotional assessment determining grade advance. Passing threshold: 33%–40% per subject.",
  },
];

export default function CalendarPage() {
  const [filterTerm, setFilterTerm] = useState<string>("All");

  const terms = ["All", "First Term", "Second Term", "Annual Term", "Co-Curricular"];

  const filteredEvents =
    filterTerm === "All"
      ? ACADEMIC_EVENTS
      : ACADEMIC_EVENTS.filter((e) => e.term === filterTerm);

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      {/* Background Architectural Dot Grid */}
      <div className="pointer-events-none absolute inset-0 bg-dots-pattern opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
                <span>Academic Session 2026–27 Schedule</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Three-Term Academic & Examination Calendar
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                The school year runs on a structured three-term cycle from June to March–April. Rigorous
                September, December, and Annual examinations are balanced by lively inter-house sports
                meets, cultural assemblies, and science exhibitions.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>3-Term Examination Cycle</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Annual Sports & Science Exhibits</span>
                </span>
              </div>
            </div>

            {/* Right 5 Columns: Editorial Frame */}
            <div className="lg:col-span-5">
              <EditorialImageFrame
                src="/images/official/event-01.jpg"
                alt="Annual Sports and Academic Calendar Highlights"
                caption="Inter-House Championship & Exam Calendar Timetable"
                badgeTopLeft={{
                  title: "Session 2026–27",
                  subtitle: "June to March–April",
                  iconName: "calendar",
                }}
                badgeBottomRight={{
                  title: "Three Terms",
                  subtitle: "Continuous Evaluation",
                  iconName: "award",
                }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Institutional Key-Facts Ribbon */}
      <section className="bg-slate-50/80 border-b border-slate-200/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Session Commencement
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                June Annually
              </strong>
              <p className="text-xs text-slate-500">Admissions 15th June</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Term 1 Exams
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                September Cycle
              </strong>
              <p className="text-xs text-slate-500">Half-Yearly Assessments</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Term 2 Exams
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                December Cycle
              </strong>
              <p className="text-xs text-slate-500">Lab Viva & Practicals</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Annual Board Exams
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                March – April
              </strong>
              <p className="text-xs text-slate-500">Promotion Determinations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Timeline Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Term Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {terms.map((t) => (
              <button
                key={t}
                onClick={() => setFilterTerm(t)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                  filterTerm === t
                    ? "bg-slate-900 text-white shadow-xs font-bold"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {filteredEvents.map((evt, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-700">{evt.month}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-semibold text-slate-500">{evt.dates}</span>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ml-1",
                        evt.type === "Exam" && "bg-rose-50 text-rose-700 border border-rose-200",
                        evt.type === "Academic" && "bg-blue-50 text-blue-700 border border-blue-200",
                        evt.type === "Sports" && "bg-emerald-50 text-emerald-700 border border-emerald-200",
                        evt.type === "Cultural" && "bg-amber-50 text-amber-800 border border-amber-200"
                      )}
                    >
                      {evt.type}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-slate-900">{evt.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{evt.description}</p>
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 block sm:inline-block">
                    {evt.term}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
