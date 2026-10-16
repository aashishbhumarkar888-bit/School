"use client";

import React from "react";
import Link from "next/link";
import { NEWS_DATA, HOUSES } from "@/lib/content/school-data";
import { Calendar, ArrowRight, Tag, BookOpen, Sparkles } from "lucide-react";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ScrollReveal, KineticText } from "@/components/ui/ScrollReveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function NewsPageClient() {
  return (
    <div className="bg-[#FCFBF9] text-slate-900 min-h-screen">
      {/* 1. Header Banner with Living Aurora */}
      <section className="relative pt-28 pb-20 overflow-hidden border-b border-slate-200/80">
        <AuroraBackground className="absolute inset-0 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal variant="fade-up">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs inline-flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Campus Highlights & Journal</span>
              </span>
            </ScrollReveal>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12]">
              <KineticText
                text="School News & Perspectives"
                highlightWords={["News", "Perspectives"]}
                delay={0.1}
              />
            </h1>

            <ScrollReveal variant="fade-up" delay={0.2}>
              <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
                Reflections on integral education, scientific symposia, literary colloquia, and student
                achievements from the campus of Sri Aurobindo School, Bhopal.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. News Article Grid */}
      <section className="py-20 bg-[#FCFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS_DATA.map((article, idx) => {
              const houseKey = article.houseTag || (["teresa", "amartya", "tagore", "raman"][idx % 4] as any);
              const house = HOUSES[houseKey];

              return (
                <ScrollReveal key={article.slug} variant="fade-up" delay={idx * 0.1}>
                  <SpotlightCard
                    house={houseKey}
                    className="p-8 bg-white/95 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                          {article.category}
                        </span>
                        <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {article.date}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-serif text-slate-900 mb-3 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      {house && (
                        <span className="text-slate-600 font-medium flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: house.accentHex }}
                          />
                          <span>{house.name}</span>
                        </span>
                      )}

                      <Link
                        href={`/news/${article.slug}`}
                        className="text-sky-700 font-bold hover:underline inline-flex items-center gap-1 ml-auto"
                      >
                        <span>Read Story</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
