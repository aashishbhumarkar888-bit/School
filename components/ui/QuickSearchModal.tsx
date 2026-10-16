"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  BookOpen,
  Shield,
  Bell,
  MapPin,
  ArrowRight,
  GraduationCap,
  Award,
  Users,
  Building2,
  Calendar,
  Briefcase,
  Flame,
  Camera,
  FileText,
  Lock,
} from "lucide-react";

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEARCH_ITEMS = [
  { title: "Admissions Concierge & Age Calculator", href: "/admissions", category: "Admissions", desc: "Eligibility rules, June session, fees & registration proforma" },
  { title: "Student & Parent Portal Dashboard", href: "/student/login", category: "Portal", desc: "Report cards, daily schedule, attendance, fees & 3D ID card" },
  { title: "The Four Houses Championship Hub", href: "/houses", category: "Houses", desc: "Teresa (Blue), Amartya (Gold), Tagore (Green), Raman (Red) standings & quiz" },
  { title: "Institutional Heritage & SAEC (1989)", href: "/about", category: "Heritage", desc: "Sri Aurobindo Education Centre society & founding timeline" },
  { title: "Leadership & Chairman Umesh Trivedi", href: "/leadership", category: "Leadership", desc: "Chairman's message, Principal's vision & governing body" },
  { title: "MPBSE Affiliation & Public Disclosure", href: "/affiliation", category: "Statutory", desc: "Official MP state board affiliation, safety compliance & bylaws" },
  { title: "K–12 Academic Wings & Examination Scheme", href: "/academics", category: "Academics", desc: "Nursery to Class XII wings, 33-40% pass criteria & labs" },
  { title: "Teaching Methodology & Multiple Intelligences", href: "/methodology", category: "Pedagogy", desc: "The Flight Path, Different Strokes & Joy of Flying pillars" },
  { title: "Campus Tour, Science Labs & Central Library", href: "/campus", category: "Infrastructure", desc: "Auro Mandir Parisar, physics/chemistry/biology labs & smart classes" },
  { title: "Faculty Directory & Subject Mentors", href: "/faculty", category: "Faculty", desc: "Pre-primary to senior secondary educators and departments" },
  { title: "Three-Term Academic & Examination Calendar", href: "/calendar", category: "Calendar", desc: "First Term (Sept), Second Term (Dec) & Final Board Exams (Mar–Apr)" },
  { title: "Sports, Co-Curriculars & Athletics", href: "/school-life", category: "Student Life", desc: "Volleyball, basketball, badminton, chess, carrom & table tennis" },
  { title: "Official Campus Visual Archive (Gallery)", href: "/gallery", category: "Gallery", desc: "Authentic documentary photography of classes, labs & sports" },
  { title: "Official Gazette & Circulars", href: "/notices", category: "Gazette", desc: "Searchable circulars, admission notifications & PDF downloads" },
  { title: "Campus Chronicles & Student News", href: "/news", category: "News", desc: "Editorial news articles and achievement chronicles" },
  { title: "Campus Events & Inter-House Meets", href: "/events", category: "Events", desc: "Upcoming campus observances, celebrations and tournaments" },
  { title: "SAEC Alumni Network Since 1989", href: "/alumni", category: "Alumni", desc: "Alumni registry, success stories & mentorship network" },
  { title: "Careers & Faculty Recruitment", href: "/careers", category: "Careers", desc: "Teaching & administrative job vacancies with online application" },
  { title: "Campus Connect, Location & Map", href: "/contact", category: "Contact", desc: "Auro Mandir Parisar, Behind Kannad Bhawan, Tulsi Nagar, Bhopal" },
  { title: "Executive Admin Command Center", href: "/admin", category: "Administration", desc: "Staff ERP console, admission pipeline & notice publisher (Ctrl+Shift+A)" },
];

export function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = query.trim()
    ? SEARCH_ITEMS.filter(
        (it) =>
          it.title.toLowerCase().includes(query.toLowerCase()) ||
          it.desc.toLowerCase().includes(query.toLowerCase()) ||
          it.category.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_ITEMS.slice(0, 6);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[95] flex items-start justify-center pt-20 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-xl rounded-2xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
              <Search className="w-5 h-5 text-blue-600 shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search all 28 pages, portals, houses, circulars..."
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleSelect(item.href)}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {item.title}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/60">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{item.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </button>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-slate-500">
                  No institutional pages matched &quot;{query}&quot;. Try &quot;admissions&quot;, &quot;houses&quot;, or &quot;portal&quot;.
                </div>
              )}
            </div>

            {/* Modal Footer Key Hints */}
            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-500">
                  Esc
                </kbd>
                <span>to close</span>
              </span>
              <span className="text-[10px] text-slate-400">
                Sri Aurobindo School, Bhopal · Command Directory
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
