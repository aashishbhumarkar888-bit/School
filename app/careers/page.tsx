"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  Send,
  Building2,
  BookOpen,
  HeartHandshake,
  ShieldCheck,
  Award,
  ChevronRight,
  Filter,
  FileText,
  User,
  Mail,
  Phone,
} from "lucide-react";

interface JobOpening {
  id: string;
  title: string;
  department: "Senior Secondary (PGT)" | "Secondary (TGT)" | "Primary (PRT)" | "Pre-Primary (ECCE)" | "Administration & Labs";
  qualification: string;
  experience: string;
  type: "Full-Time" | "Permanent";
  description: string;
  responsibilities: string[];
  vacancies: number;
}

const OPENINGS: JobOpening[] = [
  {
    id: "pgt-physics",
    title: "PGT Physics & Practical Lab Demonstrator",
    department: "Senior Secondary (PGT)",
    qualification: "M.Sc. Physics (55%+ marks) with B.Ed. from recognized university",
    experience: "3+ years teaching Class XI–XII MPBSE/CBSE curriculum",
    type: "Full-Time",
    description: "Lead senior secondary Physics theory, experiment conduction in our dedicated Physics laboratory, and viva-voce preparation for board examinations.",
    responsibilities: [
      "Conduct regular laboratory sessions in optics, mechanics, and electromagnetism",
      "Mentor students in annual Science Model exhibitions and state science congresses",
      "Deliver weekly multimedia interactive lessons in Digital Smart Classrooms",
    ],
    vacancies: 1,
  },
  {
    id: "tgt-mathematics",
    title: "TGT Mathematics & Mental Reasoning",
    department: "Secondary (TGT)",
    qualification: "B.Sc./M.Sc. Mathematics with B.Ed. and CTET/MPTET qualification",
    experience: "2–5 years teaching Middle & High School (Classes VI–X)",
    type: "Full-Time",
    description: "Cultivate conceptual clarity, geometric intuition, and Vedic mathematics foundations across Middle and Secondary wings.",
    responsibilities: [
      "Incorporate hands-on math puzzles, graph models, and algebra manipulative tools",
      "Conduct remedial workshops for students needing cumulative reinforcement",
      "Organize Ramanujan Mathematics Week and Inter-House speed calculation quizzes",
    ],
    vacancies: 2,
  },
  {
    id: "prt-english",
    title: "PRT English & Literary Activities Coordinator",
    department: "Primary (PRT)",
    qualification: "B.A./M.A. English Literature with D.El.Ed or B.Ed.",
    experience: "2+ years in Primary Wing English phonetics and creative writing",
    type: "Full-Time",
    description: "Guide young minds through phonics, vocabulary acquisition, speech elocution, and stage recitation under 'The Flight Path' pedagogy.",
    responsibilities: [
      "Oversee primary reading logs in our daily Central Library reading hour",
      "Direct one-act plays, debates, and elocution for Teresa & Tagore House competitions",
      "Design communicative worksheets and multi-sensory grammar modules",
    ],
    vacancies: 2,
  },
  {
    id: "ecce-nursery",
    title: "Early Childhood Care & Education (ECCE) Educator",
    department: "Pre-Primary (ECCE)",
    qualification: "NTT / ECCE Diploma or Montessori Certification with Graduate degree",
    experience: "1–3 years working with tiny tots (Ages 2½ to 5 years)",
    type: "Full-Time",
    description: "Nurture tiny tots in Nursery, KG-1, and KG-2 through activity-based play, sensory motor training, storytelling, and joyful discovery.",
    responsibilities: [
      "Implement child-centric playway learning aligned with Sri Aurobindo's free progress education",
      "Maintain child developmental milestone journals for parent-teacher interactions",
      "Foster gross and fine motor skills through clay modelling, music, and physical play",
    ],
    vacancies: 2,
  },
  {
    id: "central-librarian",
    title: "Assistant Librarian & Digital Knowledge Cataloger",
    department: "Administration & Labs",
    qualification: "B.Lib.I.Sc or M.Lib.I.Sc with computer proficiency",
    experience: "1+ years in school library cataloging or academic documentation",
    type: "Full-Time",
    description: "Manage Central Library operations, accession registers, daily student reading hour schedules, and book recommendations across all classes.",
    responsibilities: [
      "Coordinate the daily scheduled reading hour for each class from Nursery to Class XII",
      "Oversee circulation, Dewey decimal shelf arrangement, and reference journals",
      "Maintain the Savitri and Sri Aurobindo philosophical archival collection",
    ],
    vacancies: 1,
  },
];

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    qualification: "",
    experience: "",
    coverNote: "",
  });

  const filteredOpenings =
    selectedDept === "All"
      ? OPENINGS
      : OPENINGS.filter((job) => job.department.includes(selectedDept));

  const handleOpenApply = (job: JobOpening) => {
    setSelectedJob(job);
    setFormData((prev) => ({ ...prev, position: job.title }));
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `SAS-FAC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefId(generatedId);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* 1. EDITORIAL HERO WITH ARCHITECTURAL DOT GRID */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-800 mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Sri Aurobindo Education Centre · Faculty Recruitment</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12]">
              Join Our Community of <span className="text-blue-700">Dedicated Mentors</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              At Sri Aurobindo School, Bhopal, teaching is an elevated vocation. We invite visionary
              educators, researchers, and pedagogues who share Sri Aurobindo&apos;s philosophy of integral
              education to shape thoughtful, ethical leaders of tomorrow.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#openings"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-md shadow-blue-700/20 transition-all hover:scale-[1.02]"
              >
                <span>View Current Openings</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="mailto:aurobhopal@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold text-sm transition-all"
              >
                <Mail className="w-4 h-4 text-slate-600" />
                <span>aurobhopal@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4-COLUMN INSTITUTIONAL KEY-FACTS RIBBON */}
      <section className="bg-slate-50/80 border-b border-slate-200/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Auro Mandir Parisar</p>
                <p className="text-[11px] text-slate-500">2nd Stop, Tulsi Nagar Campus</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Est. July 1989</p>
                <p className="text-[11px] text-slate-500">35+ Years Institutional Trust</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Low Student-Teacher Ratio</p>
                <p className="text-[11px] text-slate-500">1:25 Focused Mentorship</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">EPF & Welfare</p>
                <p className="text-[11px] text-slate-500">Statutory Benefits as per Norms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY TEACH AT SRI AUROBINDO SCHOOL */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Institutional Culture
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
              Why Build Your Career at SAS Bhopal?
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Empowering teachers with pedagogical autonomy, continuous developmental workshops, and a supportive collegiate community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/70 border border-slate-200/90 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Pedagogical Autonomy</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Teach through &apos;Different Strokes&apos; and hands-on experimental methods. We value creative lesson plans, working science models, and interdisciplinary inquiry beyond rote textbooks.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/70 border border-slate-200/90 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Continuous Teacher Workshops</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Regular in-service capacity building, educational technology training in Digital Smart Classrooms, and seminars on Howard Gardner&apos;s Multiple Intelligences framework.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/70 border border-slate-200/90 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Serene Green Campus</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Located at Auro Mandir Parisar, Tulsi Nagar, our campus provides a peaceful environment with open playgrounds, central library facilities, and a collaborative staff room culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURRENT JOB OPENINGS */}
      <section id="openings" className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Session 2026–27 Vacancies
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
                Current Employment Openings
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Explore positions across academic wings and educational support staff.
              </p>
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {["All", "PGT", "TGT", "PRT", "ECCE", "Administration"].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedDept === dept
                      ? "bg-blue-700 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job Openings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOpenings.map((job) => (
              <div
                key={job.id}
                className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      {job.department}
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {job.vacancies} {job.vacancies > 1 ? "Vacancies" : "Vacancy"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-slate-900">{job.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Eligibility:</strong> {job.qualification}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Experience:</strong> {job.experience}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span><strong>Location:</strong> Auro Mandir Parisar, Tulsi Nagar, Bhopal</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Key Highlights:
                    </p>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Session 2026–27 Intake</span>
                  <button
                    onClick={() => handleOpenApply(job)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-sm transition-all hover:scale-105"
                  >
                    <span>Apply for this Role</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE APPLICATION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-xl font-bold w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>

              {!isSubmitted ? (
                <div>
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                      Faculty Application
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mt-2">
                      Apply: {selectedJob?.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Sri Aurobindo Education Centre · 2nd Stop, Tulsi Nagar, Bhopal
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Ramesh Chandra"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="ramesh@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 9826012345"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Highest Qualification *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.qualification}
                          onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                          placeholder="e.g. M.Sc. Physics + B.Ed."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Teaching Experience (Years) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          placeholder="e.g. 4 Years in Higher Secondary"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Brief Statement of Pedagogical Vision
                      </label>
                      <textarea
                        rows={3}
                        value={formData.coverNote}
                        onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                        placeholder="Tell us briefly how your teaching style aligns with Sri Aurobindo's integral philosophy..."
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
                      ℹ️ Shortlisted applicants will be invited for an in-person interaction and demonstration class at Auro Mandir Parisar, Tulsi Nagar. Please carry original educational certificates and 2 passport photos.
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-md shadow-blue-700/20 transition-all"
                      >
                        Submit Faculty Application
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong className="text-slate-800">{formData.name}</strong>. Your application for{" "}
                    <strong>{formData.position}</strong> has been registered with the SAEC Academic Selection Committee.
                  </p>
                  <div className="inline-block px-4 py-2 rounded-xl bg-slate-100 border border-slate-300 text-xs font-mono font-bold text-slate-800">
                    Application Ref: {refId}
                  </div>
                  <p className="text-xs text-slate-500">
                    A confirmation has been logged. Our office may contact you on{" "}
                    <span className="font-semibold">{formData.phone}</span> for the next round of interviews.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
