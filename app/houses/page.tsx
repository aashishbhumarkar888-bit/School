import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HOUSES } from "@/lib/content/school-data";
import { HouseId } from "@/lib/types";
import { HouseSpiritQuiz } from "@/components/ui/HouseSpiritQuiz";
import { EditorialImageFrame } from "@/components/ui/EditorialImageFrame";
import {
  Flame,
  Award,
  Trophy,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Heart,
  Brain,
  Palette,
  Atom,
} from "lucide-react";

export const metadata: Metadata = {
  title: "The Four Houses Championship Hub | Sri Aurobindo School, Bhopal",
  description:
    "Explore the Four School Houses: Teresa (Blue), Amartya (Gold), Tagore (Green), and Raman (Red). Live trophy standings, captain rosters, and interactive House Spirit Quiz.",
};

export default function HousesPage() {
  const houseKeys: HouseId[] = ["teresa", "amartya", "tagore", "raman"];

  const houseIcons: Record<HouseId, React.ElementType> = {
    teresa: Heart,
    amartya: Brain,
    tagore: Palette,
    raman: Atom,
  };

  const houseCaptains = {
    teresa: { captain: "Ananya Verma", viceCaptain: "Prateek Saxena", badge: "Community & Care" },
    amartya: { captain: "Kabir Nair", viceCaptain: "Shruti Sharma", badge: "Debates & Quizzes" },
    tagore: { captain: "Meera Joshi", viceCaptain: "Aditya Sen", badge: "Arts & Environment" },
    raman: { captain: "Aarav Sharma", viceCaptain: "Ishita Rao", badge: "Science Labs & Athletics" },
  };

  const standings = [
    { rank: 1, houseId: "raman" as HouseId, points: 960, house: "Raman House", color: "#E11D48", lead: "+40 pts" },
    { rank: 2, houseId: "amartya" as HouseId, points: 920, house: "Amartya House", color: "#D97706", lead: "-40 pts" },
    { rank: 3, houseId: "tagore" as HouseId, points: 890, house: "Tagore House", color: "#059669", lead: "-70 pts" },
    { rank: 4, houseId: "teresa" as HouseId, points: 840, house: "Teresa House", color: "#0284C7", lead: "-120 pts" },
  ];

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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>Co-Curricular Culture · SAEC Championship Trophy</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                The Four Houses Championship Hub
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                Every student at Sri Aurobindo School belongs to one of four historic Houses named after
                global intellectual and humanitarian colossi: <strong>Teresa</strong>, <strong>Amartya</strong>,
                <strong>Tagore</strong>, and <strong>Raman</strong>. Across athletics, science exhibitions,
                literary colloquia, and community service, our houses kindle camaraderie, discipline, and
                character.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Annual SAEC Rolling Trophy Contest</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Four Fixed Emblem Colors</span>
                </span>
              </div>
            </div>

            {/* Right 5 Columns: Editorial Frame */}
            <div className="lg:col-span-5">
              <EditorialImageFrame
                src="/images/official/event-01.jpg"
                alt="Inter-House Athletic Championship"
                caption="Inter-House Sports Champions at Auro Mandir Parisar"
                badgeTopLeft={{
                  title: "Annual Sports Meet",
                  subtitle: "SAEC Rolling Trophy",
                  iconName: "award",
                }}
                badgeBottomRight={{
                  title: "Four Houses",
                  subtitle: "Lifelong Camaraderie",
                  iconName: "flame",
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
                Teresa House
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                Sapphire Blue (#0284C7)
              </strong>
              <p className="text-xs text-slate-500">Service & Humility</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Amartya House
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                Solar Gold (#D97706)
              </strong>
              <p className="text-xs text-slate-500">Wisdom & Capability</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Tagore House
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                Emerald Green (#059669)
              </strong>
              <p className="text-xs text-slate-500">Arts & Literature</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Raman House
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                Crimson Red (#E11D48)
              </strong>
              <p className="text-xs text-slate-500">Science & Athletic Fire</p>
            </div>
          </div>
        </div>
      </section>

      {/* Standings + House Profiles */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Live Standings Leaderboard */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                  Current Session Championship Trophy Standings
                </h2>
                <p className="text-xs text-slate-500">
                  Aggregated across Academic Honors, Science Exhibitions, Debates, and Athletics.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                Updated Weekly by Administration
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {standings.map((st) => (
                <div
                  key={st.houseId}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2 relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: st.color }}
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      RANK 0{st.rank}
                    </span>
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${st.color}15`,
                        color: st.color,
                      }}
                    >
                      {st.lead}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-slate-900">{st.house}</h3>
                  <div className="text-2xl font-serif font-bold text-slate-900">{st.points} pts</div>

                  <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    Captain: <strong>{houseCaptains[st.houseId].captain}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Profiles for All 4 Houses */}
          <div className="space-y-6">
            <h2 className="font-serif font-bold text-2xl text-slate-900 text-center">
              The Four Pillars of Character & Leadership
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {houseKeys.map((id) => {
                const house = HOUSES[id];
                const Icon = houseIcons[id];
                const captains = houseCaptains[id];

                return (
                  <div
                    key={id}
                    className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-xs"
                          style={{ backgroundColor: house.accentHex }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-lg text-slate-900">
                            {house.name}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">Patron: {house.patron}</p>
                        </div>
                      </div>
                      <span
                        className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                        style={{
                          backgroundColor: `${house.accentHex}15`,
                          color: house.accentHex,
                        }}
                      >
                        {captains.badge}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                      &quot;{house.motto}&quot;
                    </p>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      {house.patronStory}
                    </p>

                    <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">House Captain:</span>
                        <strong className="text-slate-800">{captains.captain}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Vice Captain:</span>
                        <span className="text-slate-700">{captains.viceCaptain}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {house.values.map((val, vIdx) => (
                        <span
                          key={vIdx}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200/60"
                        >
                          {val}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive House Spirit Sorting Quiz */}
          <div className="pt-8">
            <HouseSpiritQuiz />
          </div>
        </div>
      </section>
    </div>
  );
}
