import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PEDAGOGICAL_PILLARS, HOUSES } from "@/lib/content/school-data";
import { EditorialImageFrame } from "@/components/ui/EditorialImageFrame";
import {
  Sparkles,
  Award,
  BookOpen,
  CheckCircle2,
  Users,
  Compass,
  ArrowRight,
  Flame,
  Brain,
  Palette,
  Music,
  Activity,
  Heart,
  Eye,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Teaching Methodology & Multiple Intelligences | Sri Aurobindo School, Bhopal",
  description:
    "Explore the three pedagogical pillars: The Flight Path, Different Strokes, and Joy of Flying, along with Howard Gardner's Multiple Intelligences at Sri Aurobindo School, Bhopal.",
};

export default function MethodologyPage() {
  const intelligences = [
    { title: "Linguistic & Verbal", icon: BookOpen, desc: "Storytelling, rhetoric, poetry recitations & Savitri verse analysis.", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { title: "Logical & Mathematical", icon: Brain, desc: "Problem sets, scientific inquiry, coding foundations & chess strategy.", color: "bg-amber-50 text-amber-800 border-amber-200" },
    { title: "Visual & Spatial", icon: Eye, desc: "Geometry, drawing, botany herbarium models & multimedia smart classes.", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { title: "Kinesthetic & Physical", icon: Activity, desc: "Volleyball, basketball, athletics sprints, yoga & laboratory experimentation.", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { title: "Musical & Rhythmic", icon: Music, desc: "Morning choir, cultural sangeet, drama cadences & auditory memory.", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { title: "Interpersonal & Empathy", icon: Heart, desc: "Teresa House peer mentoring, collaborative projects & community service.", color: "bg-sky-50 text-sky-700 border-sky-200" },
    { title: "Intrapersonal & Mindful", icon: Compass, desc: "Morning silent reflection, self-paced reading & ethical goal setting.", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { title: "Naturalistic & Ecological", icon: Palette, desc: "Auro Mandir Parisar green botany tours, eco-conservation & biology flora.", color: "bg-teal-50 text-teal-700 border-teal-200" },
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Integral Pedagogical Architecture</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                The Flight Path · Different Strokes · Joy of Flying
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                True education awakens the inner teacher within every child. Inspired by the integral
                philosophy of Sri Aurobindo and The Mother, our teaching methodology rejects rigid rote
                drills in favour of experiential discovery, multi-sensory stimulation, and joyful mastery.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Howard Gardner Multiple Intelligences</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Quad-Partnership Guidance</span>
                </span>
              </div>
            </div>

            {/* Right 5 Columns: Editorial Frame */}
            <div className="lg:col-span-5">
              <EditorialImageFrame
                src="/images/official/method.jpg"
                alt="Students in Indoor Strategic Thinking Arena"
                caption="Strategic Chess & Tactical Multiple Intelligence Training"
                badgeTopLeft={{
                  title: "Different Strokes",
                  subtitle: "Tactile Multi-Sensory Stimuli",
                  iconName: "sparkles",
                }}
                badgeBottomRight={{
                  title: "Joy of Flying",
                  subtitle: "Engaged Enthusiastic Learning",
                  iconName: "compass",
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
                Pillar 1
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                The Flight Path
              </strong>
              <p className="text-xs text-slate-500">Quad-Partnership Bond</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Pillar 2
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                Different Strokes
              </strong>
              <p className="text-xs text-slate-500">Multiple Intelligences</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Pillar 3
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                Joy of Flying
              </strong>
              <p className="text-xs text-slate-500">Vital & Spiritual Calm</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Mandatory Habit
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                Daily Library Hour
              </strong>
              <p className="text-xs text-slate-500">Scheduled for Every Class</p>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Core Pillars in Full Detail */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {PEDAGOGICAL_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-3xl bg-slate-50/70 border border-slate-200/90 shadow-xs space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    0{idx + 1}
                  </span>
                  <div>
                    <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                      {pillar.title}
                    </h2>
                    <p className="text-xs text-blue-700 font-semibold">{pillar.tagline}</p>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 w-fit">
                  Pillar {idx + 1} of 3
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {pillar.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {pillar.points.map((pt, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Howard Gardner's Multiple Intelligences Matrix */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Cognitive Diversity Framework
              </span>
              <h3 className="font-serif font-bold text-2xl text-slate-900">
                Howard Gardner&apos;s Multiple Intelligences
              </h3>
              <p className="text-xs text-slate-600">
                Every child possesses a distinct architecture of potential. We design varied learning
                modalities to unlock every student&apos;s innate genius:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {intelligences.map((intItem, idx) => {
                const Icon = intItem.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all space-y-2 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div className={cn("w-7 h-7 rounded-lg border flex items-center justify-center shrink-0", intItem.color)}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="font-bold text-slate-900">{intItem.title}</h4>
                    </div>
                    <p className="text-slate-600 leading-snug">{intItem.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
