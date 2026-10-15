"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NOTICES_DATA } from "@/lib/content/school-data";
import { NoticeItem } from "@/lib/types";
import {
  Bell,
  Search,
  Calendar,
  FileText,
  Download,
  ArrowRight,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NOTICE_CATEGORIES = ["All", "Admission", "Examination", "Academic", "Administrative"] as const;

export default function NoticesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("All");

  const filteredNotices = NOTICES_DATA.filter((n) => {
    const matchesCat = selectedCat === "All" || n.category === selectedCat;
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-[#FCFBF9] text-slate-900 min-h-screen">
      {/* ================= 1. HEADER BANNER ================= */}
      <section className="relative py-20 bg-gradient-to-b from-rose-50/60 via-white to-[#FCFBF9] border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-xs inline-flex items-center gap-1.5 mb-4">
              <Bell className="w-3.5 h-3.5 text-rose-600" />
              <span>Official Institutional Gazette · Circulars</span>
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 mt-2 tracking-tight leading-tight">
              School Notices & Circulars
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
              Official administrative notifications, examination schedules, admission updates, and
              academic guidelines issued by the School Office and SAEC.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 2. SEARCH & CATEGORY FILTER ================= */}
      <section className="py-8 bg-white border-b border-slate-200/80 sticky top-16 sm:top-20 z-30 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search circulars, admission dates, exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {NOTICE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={cn(
                    "px-4 py-1.5 text-xs font-bold rounded-full border transition-all cursor-pointer",
                    selectedCat === cat
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. NOTICES LISTING ================= */}
      <section className="py-16 bg-[#FCFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNotices.length === 0 ? (
            <div className="text-center py-20 rounded-3xl bg-white border border-slate-200 p-8 shadow-xs">
              <Bell className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No notices match your criteria</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for different terms or reset the category filter.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCat("All");
                }}
                className="mt-4 px-4 py-2 rounded-full text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-sky-800 border border-sky-200">
                        {notice.category}
                      </span>
                      <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {notice.date}
                      </span>
                      {notice.isImportant && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Urgent
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                      {notice.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {notice.summary}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <Link
                      href={`/notices/${notice.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 transition-colors"
                    >
                      <span>Read Full Notice</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
