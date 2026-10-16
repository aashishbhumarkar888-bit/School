"use client";

import React from "react";
import { EVENTS_DATA } from "@/lib/content/school-data";
import { Calendar, Clock, MapPin, CalendarDays, Sparkles } from "lucide-react";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ScrollReveal, KineticText } from "@/components/ui/ScrollReveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function EventsPageClient() {
  const houses = ["teresa", "amartya", "tagore", "raman"];

  return (
    <div className="bg-[#FCFBF9] text-slate-900 min-h-screen">
      {/* 1. Header Banner with Living Aurora */}
      <section className="relative pt-28 pb-20 overflow-hidden border-b border-slate-200/80">
        <AuroraBackground className="absolute inset-0 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal variant="fade-up">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 shadow-2xs inline-flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <CalendarDays className="w-3.5 h-3.5 text-amber-600" />
                <span>Institutional Chronology · Session 2026–27</span>
              </span>
            </ScrollReveal>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12]">
              <KineticText
                text="Academic Calendar & Milestones"
                highlightWords={["Academic", "Milestones"]}
                delay={0.1}
              />
            </h1>

            <ScrollReveal variant="fade-up" delay={0.2}>
              <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
                Planned schedule for the First Term (September), Second Term (December), and Annual
                Promotional MPBSE Examinations (March–April), alongside sports championships.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Chronological Calendar */}
      <section className="py-20 bg-[#FCFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS_DATA.map((evt, idx) => (
              <ScrollReveal key={evt.id} variant="fade-up" delay={idx * 0.08}>
                <SpotlightCard
                  house={houses[idx % 4]}
                  className="p-8 bg-white/95 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                        {evt.term}
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-semibold">{evt.date}</span>
                    </div>

                    <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">{evt.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {evt.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{evt.location}</span>
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
