"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  Phone,
  Calendar,
  GraduationCap,
  ShieldCheck,
  Building2,
  FileText,
  Clock,
  Compass,
  MapPin,
  ExternalLink,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import {
  MASTER_SEARCH_INDEX,
  INSTANT_ANSWERS,
  SearchEntry,
  InstantAnswerCard,
} from "@/lib/search-index";

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FILTER_CHIPS = [
  { label: "All", value: "all" },
  { label: "Admissions & Age", value: "admission" },
  { label: "Exams & Terms", value: "exam" },
  { label: "Four Houses", value: "house" },
  { label: "Contact & Hours", value: "contact" },
  { label: "Academic Rules", value: "academic" },
];

export function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
      setSelectedFilter("all");
    }
  }, [isOpen]);

  // Find matching Instant Answer Card
  const matchedInstantCard: InstantAnswerCard | null = useMemo(() => {
    if (!query.trim()) return null;
    const clean = query.toLowerCase().trim();
    const tokens = clean.split(/\s+/);

    return (
      INSTANT_ANSWERS.find((card) =>
        tokens.some((token) => card.triggerKeywords.includes(token)) ||
        card.triggerKeywords.some((kw) => clean.includes(kw))
      ) || null
    );
  }, [query]);

  // Scored matching of search entries
  const searchResults = useMemo(() => {
    let base = MASTER_SEARCH_INDEX;
    if (selectedFilter !== "all") {
      base = base.filter((item) =>
        item.keywords.some((kw) => kw.includes(selectedFilter)) ||
        item.category.toLowerCase().includes(selectedFilter)
      );
    }

    if (!query.trim()) {
      return base.slice(0, 6);
    }

    const clean = query.toLowerCase().trim();
    const tokens = clean.split(/\s+/);

    const scored = base
      .map((entry) => {
        let score = 0;
        const titleLower = entry.title.toLowerCase();
        const descLower = entry.description.toLowerCase();

        // Exact Title Match (+100)
        if (titleLower.includes(clean)) score += 100;

        // Token matches
        tokens.forEach((token) => {
          if (titleLower.includes(token)) score += 40;
          if (descLower.includes(token)) score += 15;
          if (entry.keywords.some((k) => k.includes(token))) score += 60;
          if (entry.category.toLowerCase().includes(token)) score += 30;
        });

        return { entry, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.entry);

    return scored.slice(0, 8);
  }, [query, selectedFilter]);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, searchResults.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? Math.max(0, searchResults.length - 1) : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (searchResults[selectedIndex]) {
        handleSelect(searchResults[selectedIndex].href);
      } else if (matchedInstantCard) {
        handleSelect(matchedInstantCard.actionHref);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[95] flex items-start justify-center pt-16 sm:pt-24 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.16 }}
            className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden z-10 text-slate-900"
          >
            {/* Search Input Bar */}
            <div className="relative border-b border-slate-200/80 p-4 sm:p-5 flex items-center gap-3 bg-white">
              <Search className="w-5 h-5 text-blue-700 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search admission rules, phone, fees, exams, houses, circulars..."
                className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono text-slate-500 font-bold">
                ESC
              </span>
            </div>

            {/* Quick Filter Chips */}
            <div className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 bg-slate-50/70 border-b border-slate-200/60 overflow-x-auto no-scrollbar text-xs">
              {FILTER_CHIPS.map((chip) => (
                <button
                  key={chip.value}
                  onClick={() => setSelectedFilter(chip.value)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedFilter === chip.value
                      ? "bg-blue-700 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Results Body */}
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-4">
              {/* 1. INSTANT ANSWER CARD (If Matched) */}
              {matchedInstantCard && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/90 via-sky-50/50 to-white border border-blue-200/90 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100/80 text-blue-800 text-[11px] font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Instant Institutional Answer</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">Verified SAS Data</span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {matchedInstantCard.title}
                    </h4>
                    <p className="text-base sm:text-lg font-serif font-bold text-slate-900 mt-0.5">
                      {matchedInstantCard.headline}
                    </p>
                  </div>

                  <ul className="space-y-1 text-xs text-slate-600">
                    {matchedInstantCard.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 flex items-center justify-end">
                    <button
                      onClick={() => handleSelect(matchedInstantCard.actionHref)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                    >
                      <span>{matchedInstantCard.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* 2. MATCHED SEARCH RESULTS */}
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
                  {query ? "Relevant Platform Matches" : "Popular Campus Navigation"}
                </p>

                {searchResults.length > 0 ? (
                  searchResults.map((entry, idx) => {
                    const isSelected = selectedIndex === idx;
                    return (
                      <button
                        key={entry.id}
                        onClick={() => handleSelect(entry.href)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full text-left p-3 rounded-2xl flex items-center justify-between gap-4 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-slate-100 text-slate-900 shadow-2xs"
                            : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-blue-700 flex items-center justify-center shrink-0 shadow-2xs">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                {entry.title}
                              </p>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 shrink-0">
                                {entry.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 truncate mt-0.5">
                              {entry.description}
                            </p>
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </button>
                    );
                  })
                ) : (
                  <div className="text-center py-8 space-y-2">
                    <p className="text-sm font-bold text-slate-700">No exact match found</p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Try searching for <strong>&quot;admissions&quot;</strong>, <strong>&quot;fees&quot;</strong>, <strong>&quot;phone&quot;</strong>, or <strong>&quot;exams&quot;</strong>.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Navigation Hints */}
            <div className="p-3 bg-slate-50 border-t border-slate-200/80 px-5 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Open Route</span>
                <span>ESC Close</span>
              </div>
              <span>Sri Aurobindo School, Bhopal</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
