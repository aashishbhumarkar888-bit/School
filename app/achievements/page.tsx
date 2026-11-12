import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EditorialImageFrame } from "@/components/ui/EditorialImageFrame";
import {
  Trophy,
  Award,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  BookOpen,
  FlaskConical,
  Flame,
  Sliders,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Verified Institutional Milestones & Achievements | Sri Aurobindo School, Bhopal",
  description:
    "Explore the verified institutional milestones of Sri Aurobindo School, Bhopal: 1989 SAEC founding, MPBSE K–12 affiliation, Three-Term academic rigor, Science Working Model exhibitions, and Inter-House Championships.",
};

const VERIFIED_MILESTONES = [
  {
    year: "July 1989",
    title: "Founding & Registration under SAEC",
    category: "Institutional Milestone",
    badge: "100% Verified Charter",
    description:
      "Sri Aurobindo School was founded under the auspices of the Sri Aurobindo Education Centre (SAEC) and registered under the Madhya Pradesh Society Registrikaran Adhiniyam, establishing a sanctuary for integral human education in Bhopal.",
    highlight: "Registered Society Adhiniyam 1973 · July 1989",
  },
  {
    year: "Statutory Affiliation",
    title: "MPBSE Board Affiliation (Nursery to Class XII)",
    category: "Academic Framework",
    badge: "State Board Affiliated",
    description:
      "Fully affiliated with the Madhya Pradesh Board of Secondary Education (MPBSE), offering a comprehensive K–12 academic curriculum with recognized state board examinations, practicals, and certified promotion pathways.",
    highlight: "Co-educational K–12 Public School",
  },
  {
    year: "Pedagogical Structure",
    title: "Three-Term Academic Architecture & Merit Framework",
    category: "Academic Excellence",
    badge: "Continuous Assessment",
    description:
      "Implementation of the structured Three-Term Examination framework—First Term (September), Second Term (December), and Annual Promotional Examinations (March–April)—with strict 33%–40% passing thresholds and parent-teacher consultative reviews.",
    highlight: "Continuous Assessment & Cumulative Promotion",
  },
  {
    year: "Science & Innovation",
    title: "Annual Science Laboratory Working Model Exhibitions",
    category: "Experimental Science",
    badge: "Hands-on Viva & Models",
    description:
      "Regular demonstrable physics hydraulics, chemical titration journals, and biological specimen microscopy exhibitions where students demonstrate working prototypes before faculty and visiting academic mentors.",
    highlight: "Physics, Chemistry & Biology Laboratory Practicals",
  },
  {
    year: "Literary Fellowship",
    title: "Daily Scheduled Central Library Reading Programme",
    category: "Knowledge Sanctuary",
    badge: "Daily Class Reading Hours",
    description:
      "Institution of mandatory daily class reading periods in the Central Library, providing students open access to world classical literature, Savitri philosophical poetry, encyclopedias, and current affairs journals.",
    highlight: "Scheduled Daily Reading Hours for Every Standard",
  },
  {
    year: "Co-Curricular Culture",
    title: "SAEC Four-House Rolling Championship League",
    category: "Character & Sportsmanship",
    badge: "Four Houses Championship",
    description:
      "Annual championship contest across Teresa (Blue), Amartya (Yellow), Tagore (Green), and Raman (Red) Houses spanning athletics, volleyball, basketball, badminton, chess, debate colloquia, and cultural performances.",
    highlight: "Teresa · Amartya · Tagore · Raman Rolling Trophy",
  },
];

export default function AchievementsPage() {
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
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>Verified Milestones & Institutional Honours</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Verified Institutional Milestones & Honours
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                Founded in July 1989 under the Sri Aurobindo Education Centre (SAEC), Sri Aurobindo School
                has forged a 35+ year legacy of academic rigour, scientific inquiry, and integral character
                formation in Bhopal. Below are verified milestones and programme honours substantiated by
                governing records.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Est. July 1989 by SAEC</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>MPBSE K–12 Affiliation</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>SAEC Four-House Trophy</span>
                </span>
              </div>
            </div>

            {/* Right 5 Columns: Editorial Frame */}
            <div className="lg:col-span-5">
              <EditorialImageFrame
                src="/images/official/event-01.jpg"
                alt="Annual Sports Meet & Inter-House Championship at Auro Mandir Parisar"
                caption="Annual Championship & Athletic Honours at Auro Mandir Parisar"
                badgeTopLeft={{
                  title: "SAEC Trophy",
                  subtitle: "Annual Championship",
                  iconName: "award",
                }}
                badgeBottomRight={{
                  title: "Est. July 1989",
                  subtitle: "35+ Years Legacy",
                  iconName: "shield",
                }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Admin CMS Integration Notice */}
      <section className="bg-slate-50 border-b border-slate-200/90 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Verified Institutional Registry & Student Award Publisher
                </span>
              </div>
              <p className="text-xs text-slate-600 font-normal">
                To maintain 100% authenticity, student toppers and external awards are published only after
                written verification by the Principal and Chairman. Management can publish new award records
                directly via the Admin CMS.
              </p>
            </div>

            <Link
              href="/admin"
              className="shrink-0 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin CMS: Manage Honours</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4-Column Institutional Key-Facts Ribbon */}
      <section className="bg-white border-b border-slate-200/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Founding Year
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                July 1989
              </strong>
              <p className="text-xs text-slate-500">Registered Society Adhiniyam</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Board Affiliation
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                MPBSE K–12 Co-Ed
              </strong>
              <p className="text-xs text-slate-500">Nursery to Class XII</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Exam System
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                Three-Term Structure
              </strong>
              <p className="text-xs text-slate-500">Sept · Dec · Mar–Apr</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Championship
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                4 Official Houses
              </strong>
              <p className="text-xs text-slate-500">Teresa · Amartya · Tagore · Raman</p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Milestones Timeline Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
              Documented Institutional Legacy
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Key Institutional Milestones
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Each milestone represents a verified pedagogical and infrastructural pillar of our school.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VERIFIED_MILESTONES.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {item.year}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-slate-900 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">{item.highlight}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
