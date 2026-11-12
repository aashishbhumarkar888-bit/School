"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EditorialImageFrame } from "@/components/ui/EditorialImageFrame";
import {
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Mail,
  Search,
  FlaskConical,
  Trophy,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DepartmentWing {
  id: string;
  wingTitle: string;
  gradeBracket: string;
  curriculumFocus: string;
  methodology: string;
  rolesIncluded: string[];
  houseAlignment: string;
  coordinatorsNotice: string;
}

const ACADEMIC_WINGS: DepartmentWing[] = [
  {
    id: "pre-primary",
    wingTitle: "Pre-Primary Wing (Tiny Tots)",
    gradeBracket: "Nursery, KG-1 & KG-2",
    curriculumFocus: "Play-based phonics, sensorial discovery, fine motor coordination, and emotional security.",
    methodology: "Different Strokes & Joy of Flying early childhood pedagogy.",
    rolesIncluded: [
      "Head of Early Childhood Learning",
      "Phonics & Language Arts Instructors",
      "Sensori-Motor & Creative Play Specialists",
      "Child Counseling & Care Associates",
    ],
    houseAlignment: "Teresa House (Care & Empathy)",
    coordinatorsNotice: "Faculty roster reviewed annually by SAEC Pre-Primary Advisory Panel.",
  },
  {
    id: "primary",
    wingTitle: "Primary Wing",
    gradeBracket: "Classes I to V",
    curriculumFocus: "Foundational literacy, mental arithmetic, Environmental Studies (EVS), and expressive arts.",
    methodology: "Multiple Intelligences Framework with hands-on activity sessions.",
    rolesIncluded: [
      "Primary Wing Academic Coordinator",
      "English & Hindi Language Specialists",
      "Arithmetic & Problem Solving Mentors",
      "Environmental Science Instructors",
      "Visual Arts & Creative Expression Faculty",
    ],
    houseAlignment: "Amartya & Tagore Houses",
    coordinatorsNotice: "Continuous comprehensive assessment aligned with MPBSE foundational guidelines.",
  },
  {
    id: "middle",
    wingTitle: "Middle School Wing",
    gradeBracket: "Classes VI to VIII",
    curriculumFocus: "Formal scientific inquiry, social sciences, integrated mathematics, and Sanskrit/third language.",
    methodology: "The Flight Path inquiry-based learning and project collaboration.",
    rolesIncluded: [
      "Middle School Academic Supervisor",
      "Integrated Science Instructors",
      "Mathematics & Logical Analysis Mentors",
      "History, Civics & Geography Faculty",
      "Sanskrit & Classical Languages Specialists",
    ],
    houseAlignment: "Inter-House Academic Debating League",
    coordinatorsNotice: "Cumulative promotion criteria evaluated across Three Examination Terms.",
  },
  {
    id: "secondary",
    wingTitle: "Secondary & Senior Secondary Wing",
    gradeBracket: "Classes IX to XII (MPBSE)",
    curriculumFocus: "Rigorous preparation for Madhya Pradesh Board examinations across Science, Commerce & Humanities.",
    methodology: "Rigorous theory consolidation, board answer drafting, and remedial subject mentoring.",
    rolesIncluded: [
      "Senior Secondary Academic Coordinator",
      "Senior Physics & Applied Mechanics Faculty",
      "Chemistry & Analytical Assay Faculty",
      "Higher Mathematics & Vector Calculus Faculty",
      "Biology & Ecological Systems Mentors",
      "Commerce, Accountancy & Economics Faculty",
    ],
    houseAlignment: "All Four Championship Houses",
    coordinatorsNotice: "Specialized board examiners supervising 33%–40% passing benchmarks and remedial clinics.",
  },
  {
    id: "science-labs",
    wingTitle: "Science Laboratory & Practical Viva Faculty",
    gradeBracket: "Classes IX to XII Practicals",
    curriculumFocus: "Hands-on laboratory experiments, certified journal maintenance, and external board viva training.",
    methodology: "Authentic scientific apparatus operation, chemical titration safety, and demonstrable working models.",
    rolesIncluded: [
      "Physics Laboratory Custodian & Viva Specialist",
      "Chemistry Laboratory Officer & Reagent Manager",
      "Biological Sciences Specimen Demonstrator",
      "Working Model Exhibition Coordinators",
    ],
    houseAlignment: "Raman House (Scientific Inquiry & Truth)",
    coordinatorsNotice: "Statutory laboratory apparatus and safety standards audited by MPBSE inspection committees.",
  },
  {
    id: "library",
    wingTitle: "Central Library & Research Faculty",
    gradeBracket: "School-Wide (Classes I to XII)",
    curriculumFocus: "Curated academic volumes, Indian heritage literature, Sri Aurobindo's Savitri, and general knowledge journals.",
    methodology: "Daily mandatory scheduled class reading periods fostering lifelong literary communion.",
    rolesIncluded: [
      "Chief Librarian & Knowledge Sanctuary Curator",
      "Assistant Librarian & Periodicals Custodian",
      "Digital Research & Reference Guide",
    ],
    houseAlignment: "Tagore House (Literary Brilliance & Poise)",
    coordinatorsNotice: "Catalogued book lending, open-stack reading hours, and annual literary colloquium supervision.",
  },
  {
    id: "sports",
    wingTitle: "Physical Education & Sports Coaches",
    gradeBracket: "School-Wide (Pre-Primary to Class XII)",
    curriculumFocus: "Physical vitality, competitive sportsmanship, and mental focus across indoor and outdoor sports.",
    methodology: "Daily drill, specialized team coaching, and SAEC Rolling Trophy tournament matches.",
    rolesIncluded: [
      "Director of Physical Education",
      "Outdoor Court Coaches (Volleyball, Basketball, Badminton)",
      "Indoor Arena Instructors (Chess, Carrom, Table Tennis)",
      "Annual Athletic Meet Coordinators",
    ],
    houseAlignment: "Four-House Rolling Trophy Athletics League",
    coordinatorsNotice: "Coaching sessions conducted on official Parisar sports grounds and indoor arena.",
  },
];

export default function FacultyPage() {
  const [selectedWing, setSelectedWing] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWings = ACADEMIC_WINGS.filter((wing) => {
    const matchesFilter = selectedWing === "all" || wing.id === selectedWing;
    const matchesSearch =
      wing.wingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wing.curriculumFocus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wing.rolesIncluded.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>Academic Faculty & Departmental Structure</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Our Dedicated Educators & Academic Wings
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                Guided by the integral educational philosophy of Sri Aurobindo and The Mother, our teaching
                faculty combines deep subject mastery with nurturing care. Structured across dedicated
                wings—from Pre-Primary play to Senior Secondary state board practicals—our educators
                foster clarity of intellect, strength of will, and poise of heart.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>MPBSE Affiliated Pedagogy</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>The Flight Path & Multiple Intelligences</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Four-House Mentor Framework</span>
                </span>
              </div>
            </div>

            {/* Right 5 Columns: Editorial Frame */}
            <div className="lg:col-span-5">
              <EditorialImageFrame
                src="/images/official/method.jpg"
                alt="Teaching Faculty and Pedagogical Methodology at Sri Aurobindo School"
                caption="Pedagogical Excellence Guided by Integral Harmony"
                badgeTopLeft={{
                  title: "Integral Faculty",
                  subtitle: "Child-Centric Pedagogy",
                  iconName: "award",
                }}
                badgeBottomRight={{
                  title: "Auro Mandir Parisar",
                  subtitle: "Tulsi Nagar, Bhopal",
                  iconName: "building",
                }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Management CMS Integration Notice Bar */}
      <section className="bg-slate-50 border-b border-slate-200/90 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Official Academic Governance & Staff Registry
                </span>
              </div>
              <p className="text-xs text-slate-600 font-normal">
                Faculty appointments, department coordinator assignments, and teacher-in-charge rosters
                are approved by the Sri Aurobindo Education Centre (SAEC) Academic Council.
              </p>
            </div>

            <Link
              href="/admin"
              className="shrink-0 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin CMS: Manage Faculty</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4-Column Verified Institutional Metrics Ribbon */}
      <section className="bg-white border-b border-slate-200/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Founding Society
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                SAEC (Est. July 1989)
              </strong>
              <p className="text-xs text-slate-500">35+ Years in Bhopal</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Academic Framework
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                MPBSE K–12 Continuum
              </strong>
              <p className="text-xs text-slate-500">Nursery to Class XII</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Evaluation Cycle
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                Three-Term Examination
              </strong>
              <p className="text-xs text-slate-500">Sept · Dec · Mar–Apr</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                House Mentorship
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                4 Championship Houses
              </strong>
              <p className="text-xs text-slate-500">Teresa · Amartya · Tagore · Raman</p>
            </div>
          </div>
        </div>
      </section>

      {/* Departmental Directory Filter & Wing Cards */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Controls Bar */}
          <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Wing Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              {[
                { id: "all", label: "All Academic Wings" },
                { id: "pre-primary", label: "Pre-Primary" },
                { id: "primary", label: "Primary Wing" },
                { id: "middle", label: "Middle Wing" },
                { id: "secondary", label: "Secondary / Senior" },
                { id: "science-labs", label: "Science Labs" },
                { id: "library", label: "Central Library" },
                { id: "sports", label: "Physical Education" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedWing(pill.id)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                    selectedWing === pill.id
                      ? "bg-slate-900 text-white shadow-xs font-bold"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  )}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wing or role..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Departmental Wings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWings.map((wing) => (
              <div
                key={wing.id}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                      {wing.gradeBracket}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {wing.houseAlignment.split(" ")[0]}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-lg text-slate-900 leading-tight">
                      {wing.wingTitle}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {wing.curriculumFocus}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400 block">
                      Pedagogical Approach
                    </span>
                    <p className="text-xs leading-normal font-medium">{wing.methodology}</p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Official Department Roles & Faculty
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {wing.rolesIncluded.map((role, rIdx) => (
                        <li key={rIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">SAEC Department Wing</span>
                  <Link
                    href="/contact"
                    className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Contact Academic Desk</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
