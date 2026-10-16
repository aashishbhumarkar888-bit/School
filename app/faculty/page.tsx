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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FacultyMember {
  name: string;
  role: string;
  department: "Science" | "Mathematics" | "Humanities" | "Languages" | "Pre-Primary" | "IT & Library" | "Sports";
  qualifications: string;
  experienceYears: number;
  houseMentorship?: string;
  focusArea: string;
}

const FACULTY_LIST: FacultyMember[] = [
  {
    name: "Dr. R.K. Mishra",
    role: "Head of Department — Physics & Senior Sciences",
    department: "Science",
    qualifications: "M.Sc. (Physics), Ph.D., B.Ed.",
    experienceYears: 18,
    houseMentorship: "Raman House Mentor",
    focusArea: "Board Practical Viva-Voce & Working Hydraulic / Optics Models",
  },
  {
    name: "Dr. Ananya Roy",
    role: "Senior Faculty — Chemistry",
    department: "Science",
    qualifications: "M.Sc. (Chemistry), Ph.D.",
    experienceYears: 14,
    houseMentorship: "Raman House Mentor",
    focusArea: "Organic Synthesis & Practical Titration Journals",
  },
  {
    name: "Mrs. Shashi Saxena",
    role: "Head of Department — Mathematics",
    department: "Mathematics",
    qualifications: "M.Sc. (Mathematics), B.Ed.",
    experienceYears: 16,
    houseMentorship: "Amartya House Mentor",
    focusArea: "Calculus, Coordinate Geometry & Vedic Mental Arithmetic",
  },
  {
    name: "Mrs. Priya Nambiar",
    role: "Head of Department — English & Classical Literature",
    department: "Languages",
    qualifications: "M.A. (English), M.Phil., B.Ed.",
    experienceYears: 15,
    houseMentorship: "Tagore House Mentor",
    focusArea: "Savitri Literary Analysis, Rhetoric & Creative Expression",
  },
  {
    name: "Mr. Anand Tiwari",
    role: "Senior Faculty — Social Sciences & History",
    department: "Humanities",
    qualifications: "M.A. (History), B.Ed.",
    experienceYears: 12,
    houseMentorship: "Amartya House Mentor",
    focusArea: "Indian Constitution, Heritage of MP & Global Geopolitics",
  },
  {
    name: "Mrs. Sunita Joshi",
    role: "Head of Pre-Primary Wing (Tiny Tots)",
    department: "Pre-Primary",
    qualifications: "B.Sc., Early Childhood Care & Education (ECCE)",
    experienceYears: 13,
    houseMentorship: "Teresa House Mentor",
    focusArea: "Phonics Blends, Sensori-Motor Play & Emotional Security",
  },
  {
    name: "Mr. Deepak Sen",
    role: "Coordinator — Computer Science & Smart Classrooms",
    department: "IT & Library",
    qualifications: "M.C.A., B.Ed.",
    experienceYears: 10,
    houseMentorship: "Amartya House Mentor",
    focusArea: "Foundational Python, Multimedia Smart Class & IT Literacy",
  },
  {
    name: "Mrs. Vandana Joshi",
    role: "Chief Librarian & Knowledge Sanctuary Curator",
    department: "IT & Library",
    qualifications: "M.Lib.Sc., B.Lib.",
    experienceYears: 15,
    houseMentorship: "Tagore House Mentor",
    focusArea: "Daily Class Library Hours, Research Cataloging & Reading Logs",
  },
  {
    name: "Coach Vikram Singh",
    role: "Director of Physical Education & Athletics",
    department: "Sports",
    qualifications: "M.P.Ed., Certified NIS Volleyball Coach",
    experienceYears: 14,
    houseMentorship: "Raman House Sports Advisor",
    focusArea: "Volleyball Premier League, Basketball Drills & Strategic Chess",
  },
];

export default function FacultyPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const departments = ["All", "Science", "Mathematics", "Languages", "Humanities", "Pre-Primary", "IT & Library", "Sports"];

  const filteredFaculty = FACULTY_LIST.filter((f) => {
    const matchDept = selectedDept === "All" || f.department === selectedDept;
    const matchSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.focusArea.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchSearch;
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>Dedicated Subject Specialists & Character Mentors</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Faculty Directory & Mentorship Charter
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                At Sri Aurobindo School, our educators are not merely deliverers of curriculum; they are
                living exemplars of patience, empathy, and intellectual rigour. With an enviable 1:20
                teacher-student ratio, every child is personally guided through their academic and emotional
                growth.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Trained & Certified Mentors</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Quad-Partnership Parent Consultations</span>
                </span>
              </div>
            </div>

            {/* Right 5 Columns: Editorial Frame */}
            <div className="lg:col-span-5">
              <EditorialImageFrame
                src="/images/official/vm.jpg"
                alt="Faculty and Students in Cultural Assembly"
                caption="Mentors & Scholars Celebrating Sri Aurobindo Foundation Day"
                badgeTopLeft={{
                  title: "1:20 Mentorship",
                  subtitle: "Individual Care Ratio",
                  iconName: "users",
                }}
                badgeBottomRight={{
                  title: "Lifelong Mentors",
                  subtitle: "Continuous Professional Training",
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
                Mentorship Ratio
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                1:20 Teacher : Student
              </strong>
              <p className="text-xs text-slate-500">Tailored Guidance</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Average Experience
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                14+ Years in Teaching
              </strong>
              <p className="text-xs text-slate-500">Board Examiners & HODs</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Professional Dev.
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                Continuous Workshops
              </strong>
              <p className="text-xs text-slate-500">Annual MPBSE Pedagogy</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                House Mentors
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                4 Official Houses
              </strong>
              <p className="text-xs text-slate-500">Teresa, Amartya, Tagore, Raman</p>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Directory Filter & Cards */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Controls Bar */}
          <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Department Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                    selectedDept === dept
                      ? "bg-slate-900 text-white shadow-xs font-bold"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  )}
                >
                  {dept}
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
                placeholder="Search mentor or subject..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Faculty Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculty.map((fac, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                      {fac.department}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {fac.experienceYears} Years Exp.
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-base text-slate-900 leading-tight">
                      {fac.name}
                    </h3>
                    <p className="text-xs text-blue-700 font-semibold mt-0.5">{fac.role}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{fac.qualifications}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                    <strong className="text-slate-800">Specialization:</strong> {fac.focusArea}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">{fac.houseMentorship}</span>
                  <a
                    href="mailto:aurobhopal@gmail.com"
                    className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Contact Office</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
