import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SCHOOL_FACTS, HOUSES } from "@/lib/content/school-data";
import { SavitriMonument } from "@/components/ui/SavitriMonument";
import {
  Sparkles,
  Shield,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Users,
  Compass,
  ArrowRight,
  Heart,
  Quote,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About The School | Heritage, Society & Vision",
  description:
    "Explore the founding heritage of Sri Aurobindo School, Bhopal. Founded in July 1989 by Sri Aurobindo Education Centre (SAEC), fostering integral human education.",
};

const TIMELINE_EVENTS = [
  {
    year: "July 1989",
    title: "Founding of Sri Aurobindo Education Centre (SAEC)",
    description:
      "Visionary educationists and devotees registered the Sri Aurobindo Education Centre under the MP Registrar of Firms & Societies with a written constitution to nurture integral education in Bhopal.",
  },
  {
    year: "1990s",
    title: "Inception of Auro Mandir Parisar Campus",
    description:
      "Establishment of the permanent green campus at 2nd Stop, Tulsi Nagar, Bhopal, designed with ventilated classrooms and open playgrounds for holistic youth development.",
  },
  {
    year: "2000s",
    title: "MPBSE Affiliation & Laboratory Expansion",
    description:
      "Formal affiliation with the Madhya Pradesh Board of Secondary Education (MPBSE) and commissioning of dedicated Physics, Chemistry, and Biology laboratories.",
  },
  {
    year: "2010s",
    title: "Institution of the Four School Houses",
    description:
      "Formalization of Teresa (Blue), Amartya (Yellow), Tagore (Green), and Raman (Red) Houses to institutionalize student leadership and year-round co-curricular championships.",
  },
  {
    year: "Present Day",
    title: "Digital Smart Classrooms & Integral Learning",
    description:
      "Over 35 years of educational credibility, blending modern multimedia teaching aids with timeless human ethics and spiritual mindfulness.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#FCFBF9] text-slate-900 min-h-screen">
      {/* ================= 1. HEADER HERO BANNER ================= */}
      <section className="relative py-20 bg-gradient-to-b from-sky-50/70 via-white to-[#FCFBF9] border-b border-slate-200/80 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-sky-200/30 blur-[130px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 shadow-xs inline-flex items-center gap-1.5 mb-4">
                <Compass className="w-3.5 h-3.5 text-sky-600" />
                <span>Institutional Heritage · Est. July 1989</span>
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                A Legacy of Integral Education in Bhopal
              </h1>
              <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
                Sri Aurobindo School, Bhopal was established in July 1989 under the auspices of the
                Sri Aurobindo Education Centre (SAEC) to cultivate physically healthy, intellectually
                stimulated, emotionally balanced, and spiritually conscious human beings.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl p-3 bg-white/90 backdrop-blur-xl border border-slate-200 shadow-lg">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src="/images/official/society.jpg"
                    alt="Sri Aurobindo Education Centre Campus Building"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover"
                  />
                </div>
                <div className="p-3 text-center">
                  <p className="font-serif font-bold text-xs text-slate-800">
                    Sri Aurobindo Education Centre (SAEC)
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Managing Society Founded July 1989 · Tulsi Nagar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. CHAIRMAN MR. UMESH TRIVEDI EXECUTIVE MESSAGE ================= */}
      <section id="chairman" className="py-20 bg-white relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-amber-50/80 via-white to-sky-50/60 border border-amber-200/80 p-8 sm:p-12 shadow-[0_16px_40px_rgba(245,158,11,0.08)] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Chairman Official Portrait */}
              <div className="lg:col-span-4 text-center lg:text-left">
                <div className="relative w-36 h-36 mx-auto lg:mx-0 rounded-3xl p-1 bg-gradient-to-tr from-amber-400 via-sky-400 to-rose-400 shadow-lg">
                  <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-white">
                    <Image
                      src="/images/official/cm.jpg"
                      alt="Chairman Shri Umesh Trivedi - Sri Aurobindo School, Bhopal"
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-900 mt-4">
                  {SCHOOL_FACTS.chairman.name}
                </h3>
                <p className="text-xs text-amber-700 font-bold uppercase tracking-wider mt-0.5">
                  {SCHOOL_FACTS.chairman.title}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Sri Aurobindo Education Centre (SAEC)
                </p>
              </div>

              {/* Verbatim Quote */}
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-100/70 px-3 py-1 rounded-full">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Chairman's Official Address</span>
                </div>
                <blockquote className="text-base sm:text-lg text-slate-700 leading-relaxed italic border-l-3 border-amber-500 pl-6 bg-white/70 p-4 rounded-r-2xl border border-slate-200/60 shadow-xs">
                  "{SCHOOL_FACTS.chairman.messageExcerpt}"
                </blockquote>
                <p className="text-xs text-slate-500 pt-1">
                  — Guided by the institutional charter of SAEC since July 1989.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. VISION, MISSION & EDUCATIONAL IDEOLOGY ================= */}
      <section id="vision-mission" className="py-20 bg-slate-50/70 relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Foundational Triad
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
              Vision, Mission & Educational Ideology
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center font-bold mb-4">
                  01
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-900 mb-3">Our Vision</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To awaken the latent divine potential within every child, nurturing enlightened
                  intellects and compassionate hearts capable of creating an elevated, harmonious
                  society.
                </p>
              </div>
              <p className="text-xs font-bold text-sky-700 mt-6 pt-4 border-t border-slate-100">
                Inspired by Sri Aurobindo
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold mb-4">
                  02
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-900 mb-3">Our Mission</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To provide an active, joy-filled learning atmosphere where teachers and students
                  learn with enthusiasm. Classrooms are never passive listening chambers, but
                  vibrant hubs of creative exploration.
                </p>
              </div>
              <p className="text-xs font-bold text-amber-700 mt-6 pt-4 border-t border-slate-100">
                "We are a happy school"
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold mb-4">
                  03
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-900 mb-3">Integral Ideology</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Education is four-fold: Physical vitality through sports, Mental clarity through
                  science and math, Emotional richness through arts and houses, and Spiritual poise
                  through inner reflection.
                </p>
              </div>
              <p className="text-xs font-bold text-emerald-700 mt-6 pt-4 border-t border-slate-100">
                Four-Fold Realization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. THE 6 AIMS & OBJECTIVES OF SAEC ================= */}
      <section className="py-20 bg-white relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
              Constitutional Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
              The 6 Aims & Objectives of SAEC
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Drawn directly from the written constitution of Sri Aurobindo Education Centre,
              guiding all school practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCHOOL_FACTS.aimsAndObjectives.map((aim, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex items-start gap-4 hover:bg-white hover:shadow-sm transition-all"
              >
                <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-xs font-bold text-slate-800 shrink-0">
                  0{index + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{aim}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. HISTORICAL TIMELINE ================= */}
      <section className="py-20 bg-slate-50/60 relative border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
              Chronological Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
              Over Three Decades of Educational Trust
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-slate-200">
            {TIMELINE_EVENTS.map((event, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={event.year}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Center Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-sky-600 border-4 border-white shadow-md z-10 mt-1" />

                  {/* Content Card */}
                  <div className="ml-10 md:ml-0 md:w-1/2 px-4 md:px-8">
                    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
                      <span className="px-2.5 py-1 rounded text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
                        {event.year}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold font-serif text-slate-900 mt-2 mb-1">
                        {event.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 6. SAVITRI MONUMENT ================= */}
      <SavitriMonument />
    </div>
  );
}
