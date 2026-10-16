"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { DEMO_STUDENTS } from "@/lib/content/student-data";
import {
  GraduationCap,
  ArrowRight,
  Lock,
  User,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Phone,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudentLoginPage() {
  const router = useRouter();
  const [scholarId, setScholarId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const matched = DEMO_STUDENTS.find(
      (s) => s.id.toLowerCase() === scholarId.trim().toLowerCase()
    );

    if (matched || scholarId.trim().length > 3) {
      const selected = matched || DEMO_STUDENTS[0];
      if (typeof window !== "undefined") {
        localStorage.setItem("sas_active_student_id", selected.id);
      }
      setTimeout(() => {
        router.push("/student/dashboard");
      }, 500);
    } else {
      setErrorMsg("Please enter a valid Scholar ID or click any Demo Account below.");
      setLoading(false);
    }
  };

  const handleDemoSelect = (studentId: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sas_active_student_id", studentId);
    }
    router.push("/student/dashboard");
  };

  return (
    <div className="min-h-[88vh] bg-white text-slate-900 py-12 sm:py-16 px-4 relative flex items-center justify-center">
      {/* Background Architectural Grid */}
      <div className="pointer-events-none absolute inset-0 bg-dots-pattern opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="w-full max-w-4xl relative z-10">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Sri Aurobindo School · Student & Parent Digital Campus</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Scholar & Guardian Gateway
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Access three-term report cards, daily timetable (7:45 AM – 1:30 PM), library loans,
            assignments, fee clearance, and your 3D digital student identity card.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Login Card */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-serif font-bold text-slate-900">
                  Portal Sign In
                </h2>
                <p className="text-xs text-slate-500">Session 2026–27 Academic Year</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Scholar / Roll ID
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={scholarId}
                    onChange={(e) => setScholarId(e.target.value)}
                    placeholder="e.g. SAS-2026-1042"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Access Key / Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-slate-50/50"
                  />
                </div>
                <div className="flex justify-between items-center mt-1 text-[11px] text-slate-500">
                  <span>Default password: scholar birthdate</span>
                  <a href="tel:07552558286" className="text-blue-600 hover:underline">
                    Forgot Key?
                  </a>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{loading ? "Verifying..." : "Sign In to Portal"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-slate-500">
              Need assistance? Call School Office:{" "}
              <a href="tel:07552558286" className="text-blue-700 font-semibold hover:underline">
                0755-2558286
              </a>
            </div>
          </div>

          {/* Right Column: 1-Click Instant Demo Accounts (All 4 Houses) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-3xl bg-slate-50/90 border border-slate-200/90 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Instant 1-Click Evaluator Accounts</span>
                </span>
                <span className="text-[11px] font-semibold text-blue-700">
                  4 Houses Represented
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Click any pre-configured student profile below to instantly explore the complete interactive dashboard:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DEMO_STUDENTS.map((student) => (
                <button
                  key={student.id}
                  onClick={() => handleDemoSelect(student.id)}
                  className="text-left p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all group cursor-pointer relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: student.houseColor }}
                  />

                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-2xs"
                        style={{ backgroundColor: student.houseColor }}
                      >
                        {student.avatar}
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
                          {student.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-mono">{student.id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{student.grade}</span>
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${student.houseColor}15`,
                        color: student.houseColor,
                      }}
                    >
                      {student.houseName}
                    </span>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-500 pt-1">
                    <span>Score: <strong className="text-slate-800">{student.overallScorePercent}%</strong></span>
                    <span>Attend: <strong className="text-slate-800">{student.attendancePercent}%</strong></span>
                  </div>

                  <div className="mt-3 flex items-center justify-end text-[11px] font-bold text-blue-600 group-hover:text-blue-800 gap-1">
                    <span>Launch Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-3 text-xs text-blue-900">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <span>
                Data integrity strictly adheres to MPBSE academic privacy standards. No external tracking or data collection.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
