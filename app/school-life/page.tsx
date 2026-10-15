"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HOUSES, CAMPUS_FACILITIES } from "@/lib/content/school-data";
import { HouseId } from "@/lib/types";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { HouseSwitcher } from "@/components/ui/HouseSwitcher";
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
} from "lucide-react";

export default function SchoolLifePage() {
  const [selectedHouse, setSelectedHouse] = useState<HouseId>("teresa");
  const houseKeys: HouseId[] = ["teresa", "amartya", "tagore", "raman"];

  return (
    <div className="bg-[#FCFBF9] text-slate-900 min-h-screen">
      {/* ================= 1. HEADER BANNER WITH OFFICIAL EVENT PHOTO ================= */}
      <section className="relative py-20 bg-gradient-to-b from-emerald-50/60 via-white to-[#FCFBF9] border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs inline-flex items-center gap-1.5 mb-4">
                <Flame className="w-3.5 h-3.5 text-emerald-600" />
                <span>Co-Curricular Culture, Athletics & Leadership</span>
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                School Life & The Four Houses
              </h1>
              <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
                At Sri Aurobindo School, holistic education comes alive through the Four Houses. From
                high-energy volleyball matches and chess leagues to science symposia and cultural
                celebrations, every student discovers their innate leadership and team spirit.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl p-3 bg-white/90 backdrop-blur-xl border border-slate-200 shadow-lg">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src="/images/official/event-01.jpg"
                    alt="Campus Events and Student Life at Sri Aurobindo School"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover"
                  />
                </div>
                <div className="p-3 text-center">
                  <p className="font-serif font-bold text-xs text-slate-800">
                    Inter-House Campus Events & Celebrations
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Fostering camaraderie, athletic vigour & expressive arts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. PARENT MAGNET: HOUSE SPIRIT QUIZ ================= */}
      <section className="py-16 bg-white relative border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
              Interactive House Discovery
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-2">
              Discover Where Your Child Belongs
            </h2>
          </div>
          <HouseSpiritQuiz />
        </div>
      </section>

      {/* ================= 3. FOUR HOUSES IN-DEPTH BREAKDOWN ================= */}
      <section className="py-20 bg-slate-50/60 relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
              The Four Pillars of Character
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
              Championship System & House Identities
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Named after luminaries who shaped modern thought, service, and discovery.
            </p>
          </div>

          <div className="space-y-10">
            {houseKeys.map((id) => {
              const house = HOUSES[id];
              return (
                <div
                  key={id}
                  id={id}
                  className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 relative overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  {/* Top Bar indicator */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: house.accentHex }}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: `${house.accentHex}15`,
                            color: house.accentHex,
                          }}
                        >
                          {house.colorName}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">Patron: {house.patron}</span>
                      </div>

                      <h3 className="text-3xl font-bold font-serif text-slate-900">{house.name}</h3>
                      <p className="text-base font-semibold italic" style={{ color: house.accentHex }}>
                        "{house.motto}"
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{house.patronStory}</p>

                      <div className="pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Core Values Cultivated:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {house.values.map((v) => (
                            <span
                              key={v}
                              className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-50 text-slate-700 border border-slate-200"
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-7 bg-slate-50/70 rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-6">
                      <div>
                        <h4 className="text-sm font-bold font-serif text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Trophy
                            className="w-4 h-4"
                            style={{ color: house.accentHex }}
                          />
                          <span>Key Inter-House Competitions & Events</span>
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                          {house.competitions.map((comp) => (
                            <li
                              key={comp}
                              className="p-3 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-2 shadow-2xs"
                            >
                              <CheckCircle2
                                className="w-3.5 h-3.5 shrink-0 mt-0.5"
                                style={{ color: house.accentHex }}
                              />
                              <span className="font-medium text-slate-700">{comp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                        <span>Domain Role: <strong className="text-slate-800">{house.badgeRole}</strong></span>
                        <span className="font-bold text-slate-700">SAEC House Cup</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 4. SPORTS & ATHLETICS ARENA ================= */}
      <section className="py-20 bg-white relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
              Physical Vitality & Sportsmanship
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
              Playgrounds & Indoor Strategic Games
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Sports at Sri Aurobindo School build resilience, collaborative spirit, and physical poise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200/90 space-y-4 hover:bg-white hover:shadow-md transition-all">
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
                Outdoor Sports Grounds
              </span>
              <h3 className="text-2xl font-bold font-serif text-slate-900">
                Volleyball, Basketball & Badminton
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Spacious outdoor courts within Auro Mandir Parisar host daily coaching sessions and
                inter-house athletic meets. Guided by trained sports instructors, students develop
                aerobic stamina, agility, and teamwork.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2">
                <li>• Inter-house Volleyball League</li>
                <li>• Basketball championship & shooting drills</li>
                <li>• Badminton tournaments for junior & senior wings</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200/90 space-y-4 hover:bg-white hover:shadow-md transition-all">
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                Indoor Strategy Arena
              </span>
              <h3 className="text-2xl font-bold font-serif text-slate-900">
                Chess, Carrom & Table Tennis
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Strategic mental faculties and hand-eye coordination are honed in our indoor sports
                hall. The school regularly hosts inter-house Chess leagues where analytical reasoning
                and tactical foresight are celebrated.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2">
                <li>• Amartya House Annual Chess League</li>
                <li>• Table Tennis singles and doubles tournaments</li>
                <li>• Precision carrom matches during sports week</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
