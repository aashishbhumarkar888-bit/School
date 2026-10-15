"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, BookOpen, Shield, Bell, MapPin, ArrowRight } from "lucide-react";

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEARCH_ITEMS = [
  { title: "Admissions & Age Calculator", href: "/admissions", category: "Admissions", desc: "Eligibility rules, June session, fees & registration proforma" },
  { title: "The Four Houses System", href: "/school-life", category: "Student Life", desc: "Teresa, Amartya, Tagore & Raman Houses championships" },
  { title: "About SAEC & History (1989)", href: "/about", category: "Heritage", desc: "Sri Aurobindo Education Centre society & founding timeline" },
  { title: "Chairman Umesh Trivedi's Address", href: "/about#chairmans-message", category: "Leadership", desc: "Official leadership message on integral learning" },
  { title: "Three-Term Examination Cycle", href: "/academics", category: "Academics", desc: "September, December, and March–April board examination structure" },
  { title: "Physics, Chemistry & Biology Labs", href: "/academics", category: "Academics", desc: "Demonstrable working models and viva practicals" },
  { title: "Campus Photo Showcase", href: "/gallery", category: "Gallery", desc: "Real photos of classrooms, sports fields & events" },
  { title: "Official Gazette & Circulars", href: "/notices", category: "Notices", desc: "Latest school notices and downloadable PDFs" },
  { title: "Campus Location & Map", href: "/contact", category: "Contact", desc: "Auro Mandir Parisar, Tulsi Nagar, Bhopal" },
];

export function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        // Toggle if needed
      } else if (e.key === "Escape" && isOpen) {
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
    : SEARCH_ITEMS.slice(0, 5);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[95] flex items-start justify-center pt-24 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="relative w-full max-w-xl rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_20px_60px_rgba(15,23,42,0.15)] overflow-hidden z-10"
          >
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search Sri Aurobindo School (e.g. admissions, houses, labs, fees)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-slate-900 text-sm focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 max-h-80 overflow-y-auto space-y-1">
              {filtered.map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleSelect(item.href)}
                  className="w-full p-3 rounded-2xl text-left hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Quick Navigation</span>
              <span>Press Esc to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
