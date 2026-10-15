"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Calendar, ArrowRight, X, Sparkles, MessageCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingConcierge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-72 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.15)] p-4 overflow-hidden"
          >
            {/* Top color bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-amber-400 via-emerald-400 to-rose-400" />

            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-serif font-bold text-xs text-slate-900">
                  Admission Helpdesk
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close concierge dock"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 py-3">
              <Link
                href="/admissions#enquiry-form"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-100 text-sky-900 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block leading-tight">Apply for 2026–27</span>
                    <span className="text-[10px] text-sky-700">Registration proforma</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-sky-600 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/admissions#age-calculator"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-800 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block leading-tight">Match Child Age</span>
                    <span className="text-[10px] text-slate-500">MPBSE eligibility rules</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <a
                href="tel:+917552558286"
                className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-800 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block leading-tight">Call Campus Desk</span>
                    <span className="text-[10px] text-slate-500">0755-2558286 (8 AM – 1 PM)</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 text-center">
              Auro Mandir Parisar, Tulsi Nagar, Bhopal
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_12px_30px_rgba(15,23,42,0.12)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.18)] transition-all cursor-pointer group"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500" />
        </span>
        <span className="text-xs font-bold text-slate-800 group-hover:text-sky-700 transition-colors">
          Quick Admissions
        </span>
        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
          {isOpen ? <X className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5 text-sky-600" />}
        </div>
      </motion.button>
    </div>
  );
}
