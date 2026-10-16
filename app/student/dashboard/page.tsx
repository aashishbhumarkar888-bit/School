"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DEMO_STUDENTS, StudentProfile } from "@/lib/content/student-data";
import { SCHOOL_FACTS } from "@/lib/content/school-data";
import {
  GraduationCap,
  Calendar,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  RotateCw,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  LogOut,
  Flame,
  ShieldCheck,
  Building2,
  Sparkles,
  Phone,
  Download,
  Check,
  Layers,
  ArrowRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudentDashboardPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentProfile>(DEMO_STUDENTS[0]);
  const [activeTab, setActiveTab] = useState<
    "overview" | "academics" | "assignments" | "library" | "fees" | "idcard"
  >("overview");
  const [activeTermIndex, setActiveTermIndex] = useState(0);
  const [assignments, setAssignments] = useState(DEMO_STUDENTS[0].assignments);
  const [books, setBooks] = useState(DEMO_STUDENTS[0].libraryBooks);
  const [idCardFlipped, setIdCardFlipped] = useState(false);
  const [showReportCardModal, setShowReportCardModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load student on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("sas_active_student_id");
      if (storedId) {
        const found = DEMO_STUDENTS.find((s) => s.id === storedId);
        if (found) {
          setStudent(found);
          setAssignments(found.assignments);
          setBooks(found.libraryBooks);
        }
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStudentSwitch = (newId: string) => {
    const nextStudent = DEMO_STUDENTS.find((s) => s.id === newId);
    if (nextStudent) {
      setStudent(nextStudent);
      setAssignments(nextStudent.assignments);
      setBooks(nextStudent.libraryBooks);
      if (typeof window !== "undefined") {
        localStorage.setItem("sas_active_student_id", newId);
      }
      showToast(`Switched profile to ${nextStudent.name} (${nextStudent.grade})`);
    }
  };

  const toggleAssignmentStatus = (id: string) => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === "Pending" ? "Submitted" : "Pending";
          showToast(`Assignment "${a.title}" marked as ${nextStatus}`);
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const handleRenewBook = (id: string) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          showToast(`Book "${b.title}" renewed for an additional 14 days`);
          return { ...b, dueDate: "10-Nov-2026", status: "Renewed" };
        }
        return b;
      })
    );
  };

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("sas_active_student_id");
    }
    router.push("/student/login");
  };

  const currentReport = student.reportCard[activeTermIndex] || student.reportCard[0];

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 pb-20">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-[99] rounded-2xl bg-slate-900 text-white px-4 py-2.5 text-xs font-semibold shadow-xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= 1. TOP EXECUTIVE STUDENT BAR ================= */}
      <div className="bg-white border-b border-slate-200/90 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Student Identity */}
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm text-white shadow-xs shrink-0"
                style={{ backgroundColor: student.houseColor }}
              >
                {student.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-tight">
                    {student.name}
                  </h1>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${student.houseColor}15`,
                      color: student.houseColor,
                    }}
                  >
                    {student.houseName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span>{student.grade}</span>
                  <span>•</span>
                  <span className="font-mono text-slate-600 font-semibold">{student.id}</span>
                  <span>•</span>
                  <span className="text-slate-400">Session 2026–27</span>
                </div>
              </div>
            </div>

            {/* Right: Quick Demo Profile Switcher + Sign Out */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200/80 text-xs">
                <span className="text-[11px] font-semibold text-slate-500 px-1.5 hidden sm:inline">
                  Switch:
                </span>
                {DEMO_STUDENTS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleStudentSwitch(s.id)}
                    className={cn(
                      "px-2 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                      student.id === s.id
                        ? "bg-white text-slate-900 shadow-2xs font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {s.name.split(" ")[0]}
                  </button>
                ))}
              </div>

              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation Navigation Strip */}
          <div className="flex items-center gap-1 overflow-x-auto pt-3 border-t border-slate-100 mt-3 no-scrollbar text-xs font-semibold">
            {[
              { id: "overview", label: "Overview & Schedule", icon: Clock },
              { id: "academics", label: "Three-Term Exams", icon: Award },
              { id: "assignments", label: "Assignments & Projects", icon: Layers },
              { id: "library", label: "Central Library Loans", icon: BookOpen },
              { id: "fees", label: "Term Fees & Receipts", icon: FileText },
              { id: "idcard", label: "3D Digital Student ID", icon: GraduationCap },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer",
                    isActive
                      ? "bg-blue-600 text-white shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ================= TAB 1: OVERVIEW & SCHEDULE ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* 4 KPI Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Cumulative Attendance
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    {student.attendancePercent}%
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Regular
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  182 / 188 Working Days · Minimum 75% required
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Latest Term Aggregate
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-blue-700">
                    {student.overallScorePercent}%
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    Grade A1
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Pass Threshold: 33%–40% per MPBSE
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Flight Path Projects
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-600">
                    3 Active
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    In Progress
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Hands-on Science & Literature Modules
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Personal House Points
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    +{student.housePointsContributed}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                    style={{
                      backgroundColor: `${student.houseColor}15`,
                      color: student.houseColor,
                    }}
                  >
                    {student.houseName}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Contributed to SAEC Rolling Trophy
                </p>
              </div>
            </div>

            {/* Daily Schedule (7:45 AM – 1:30 PM) */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Daily Campus Timetable (7:45 AM – 1:30 PM)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Structured quad-partnership schedule including daily Central Library hour, lab viva, and sports.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Mon–Sat Regular Order</span>
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {student.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/60 rounded-xl px-2.5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-slate-400 w-24 shrink-0">
                        {item.time}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{item.subject}</span>
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Mentor: {item.teacher} • Venue: {item.room}
                        </p>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full w-fit",
                        item.type === "assembly" && "bg-amber-50 text-amber-800 border border-amber-200",
                        item.type === "academic" && "bg-blue-50 text-blue-800 border border-blue-200",
                        item.type === "smartclass" && "bg-purple-50 text-purple-800 border border-purple-200",
                        item.type === "lab" && "bg-rose-50 text-rose-800 border border-rose-200",
                        item.type === "library" && "bg-emerald-50 text-emerald-800 border border-emerald-200",
                        item.type === "sports" && "bg-sky-50 text-sky-800 border border-sky-200"
                      )}
                    >
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: THREE-TERM EXAMINATIONS ================= */}
        {activeTab === "academics" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Three-Term Examination Performance Analytics
                  </h3>
                  <p className="text-xs text-slate-500">
                    MPBSE-aligned Theory & Practical/Viva scores. Passing threshold: 33%–40% per subject.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowReportCardModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Official Report Card</span>
                  </button>
                </div>
              </div>

              {/* Term Selector Pills */}
              <div className="flex items-center gap-2 pb-2">
                {student.reportCard.map((rc, idx) => (
                  <button
                    key={rc.term}
                    onClick={() => setActiveTermIndex(idx)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer",
                      activeTermIndex === idx
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                    )}
                  >
                    {rc.term}
                  </button>
                ))}
              </div>

              {/* Subject Breakdown Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-2.5">Subject</th>
                      <th className="py-2.5 text-center">Theory (Max)</th>
                      <th className="py-2.5 text-center">Theory (Obt)</th>
                      <th className="py-2.5 text-center">Practical/Viva (Max)</th>
                      <th className="py-2.5 text-center">Practical (Obt)</th>
                      <th className="py-2.5 text-center">Total (100)</th>
                      <th className="py-2.5 text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentReport.subjects.map((sub, idx) => {
                      const totalObt = sub.theoryObtained + sub.practicalObtained;
                      const totalMax = sub.theoryMax + sub.practicalMax;
                      const percentage = Math.round((totalObt / totalMax) * 100);

                      return (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-3 font-semibold text-slate-900">{sub.name}</td>
                          <td className="py-3 text-center text-slate-500">{sub.theoryMax}</td>
                          <td className="py-3 text-center font-semibold text-slate-800">
                            {sub.theoryObtained}
                          </td>
                          <td className="py-3 text-center text-slate-500">{sub.practicalMax}</td>
                          <td className="py-3 text-center font-semibold text-slate-800">
                            {sub.practicalObtained}
                          </td>
                          <td className="py-3 text-center">
                            <span className="font-bold text-slate-900">{totalObt}</span>
                            <span className="text-slate-400">/{totalMax}</span>
                          </td>
                          <td className="py-3 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {sub.grade}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Teacher Remarks Box */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-1">
                <span className="font-bold block uppercase tracking-wider text-[10px]">
                  Class Teacher & Principal Evaluation:
                </span>
                <p className="italic">&quot;{currentReport.teacherRemarks}&quot;</p>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ASSIGNMENTS & FLIGHT PATH ================= */}
        {activeTab === "assignments" && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Flight Path & Joy of Flying Assignment Tracker
                  </h3>
                  <p className="text-xs text-slate-500">
                    Click status pill to toggle between Pending and Submitted.
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {assignments.filter((a) => a.status === "Submitted").length} of {assignments.length} Completed
                </span>
              </div>

              <div className="space-y-3">
                {assignments.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 hover:bg-white hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-700">
                          {item.id}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      </div>
                      <p className="text-xs text-slate-500">
                        Subject: {item.subject} • Due Date: {item.dueDate}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {item.type}
                      </span>
                      <button
                        onClick={() => toggleAssignmentStatus(item.id)}
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer",
                          item.status === "Submitted"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
                        )}
                      >
                        {item.status === "Submitted" ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Submitted</span>
                          </>
                        ) : (
                          <span>Mark as Submitted</span>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: CENTRAL LIBRARY LOANS ================= */}
        {activeTab === "library" && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Central Reading Sanctuary & Library Loans
                  </h3>
                  <p className="text-xs text-slate-500">
                    Books currently issued during daily mandatory library reading hour at Auro Mandir Parisar.
                  </p>
                </div>
                <BookOpen className="w-5 h-5 text-emerald-600" />
              </div>

              <div className="space-y-3">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-emerald-700">
                          {book.id}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{book.title}</h4>
                      </div>
                      <p className="text-xs text-slate-500">
                        Author: {book.author} • Issued: {book.issuedDate} • Return Due:{" "}
                        <strong className="text-slate-800">{book.dueDate}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {book.status}
                      </span>
                      <button
                        onClick={() => handleRenewBook(book.id)}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3 text-slate-500" />
                        <span>Renew 14 Days</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: TERM FEES & OFFICIAL RECEIPTS ================= */}
        {activeTab === "fees" && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Three-Term Tuition Fee Schedule & Hall-Ticket Clearance
                </h3>
                <p className="text-xs text-slate-500">
                  Mandatory fee clearance is required prior to examination hall-ticket and admit card release.
                </p>
              </div>

              <div className="space-y-3">
                {student.fees.map((fee, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{fee.term}</h4>
                        <span className="text-xs font-bold text-slate-900">{fee.amount}</span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Paid on: {fee.paidDate} • Receipt:{" "}
                        <span className="font-mono">{fee.receiptNumber}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{fee.status}</span>
                      </span>

                      <button
                        onClick={() => {
                          setSelectedReceipt(fee);
                          setShowReceiptModal(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-500" />
                        <span>View Receipt</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: 3D DIGITAL STUDENT ID CARD ================= */}
        {activeTab === "idcard" && (
          <div className="py-6 flex flex-col items-center justify-center space-y-6">
            <div className="text-center space-y-1">
              <h3 className="font-serif font-bold text-xl text-slate-900">
                Official Digital Student Identity Card
              </h3>
              <p className="text-xs text-slate-500">
                Click the flip button below to inspect Front & Reverse of the credential.
              </p>
            </div>

            {/* 3D Flippable Card Frame */}
            <div className="w-full max-w-sm h-80 [perspective:1000px] select-none">
              <motion.div
                animate={{ rotateY: idCardFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                className="relative w-full h-full [transform-style:preserve-3d] rounded-3xl shadow-xl"
              >
                {/* FRONT FACE */}
                <div
                  className="absolute inset-0 [backface-visibility:hidden] rounded-3xl bg-white border-2 border-slate-200/90 p-6 flex flex-col justify-between overflow-hidden shadow-md"
                  style={{ borderColor: student.houseColor }}
                >
                  {/* Top Bar with School Crest */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/official/logo.png"
                        alt="Logo"
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                      <div>
                        <h4 className="font-serif font-bold text-xs text-slate-900 leading-tight">
                          SRI AUROBINDO SCHOOL
                        </h4>
                        <span className="text-[9px] text-slate-400 font-medium">
                          BHOPAL · EST. JULY 1989
                        </span>
                      </div>
                    </div>
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold uppercase text-white shadow-xs"
                      style={{ backgroundColor: student.houseColor }}
                    >
                      {student.houseName.split(" ")[0]}
                    </span>
                  </div>

                  {/* Center Identity */}
                  <div className="flex items-center gap-4 py-3">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-xs shrink-0"
                      style={{ backgroundColor: student.houseColor }}
                    >
                      {student.avatar}
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-serif font-bold text-base text-slate-900">
                        {student.name}
                      </h3>
                      <p className="text-xs font-bold text-blue-700">{student.grade}</p>
                      <p className="text-[11px] font-mono text-slate-500">ID: {student.id}</p>
                      <p className="text-[10px] text-slate-400">Blood Group: {student.bloodGroup}</p>
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Session: 2026–27</span>
                    <span className="font-bold text-slate-800">MPBSE Co-Ed K–12</span>
                  </div>
                </div>

                {/* BACK FACE */}
                <div
                  className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl bg-slate-900 text-white p-6 flex flex-col justify-between overflow-hidden shadow-md"
                  style={{ border: `2px solid ${student.houseColor}` }}
                >
                  <div className="pb-2 border-b border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-300">CAMPUS EMERGENCY & VERIFICATION</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Address</span>
                      <p className="leading-snug">
                        Auro Mandir Parisar, Behind Kannad Bhawan, 2nd Stop, Tulsi Nagar, Bhopal – 462003
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Guardian</span>
                        <p className="font-medium text-white">{student.parentName}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">School Office</span>
                        <p className="font-mono text-white">0755-2558286</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Authorized Signature: SAEC Chairman</span>
                    <span className="font-mono">VALID 2026-27</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <button
              onClick={() => setIdCardFlipped((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Flip ID Card ({idCardFlipped ? "Viewing Back" : "Viewing Front"})</span>
            </button>
          </div>
        )}
      </main>

      {/* ================= MODAL: PRINTABLE REPORT CARD ================= */}
      <AnimatePresence>
        {showReportCardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/official/logo.png"
                    alt="Logo"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-base text-slate-900">
                      SRI AUROBINDO SCHOOL, BHOPAL
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Official MPBSE Pattern Statement of Marks · {currentReport.term}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReportCardModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-2xl">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Scholar Name</span>
                  <strong className="text-slate-900">{student.name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Roll / ID</span>
                  <span className="font-mono text-slate-800">{student.id}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Class & House</span>
                  <span className="text-slate-800">
                    {student.grade} · {student.houseName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Attendance</span>
                  <strong className="text-emerald-700">{student.attendancePercent}%</strong>
                </div>
              </div>

              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase font-bold">
                    <th className="py-2">Subject</th>
                    <th className="py-2 text-center">Theory</th>
                    <th className="py-2 text-center">Practical</th>
                    <th className="py-2 text-center">Total</th>
                    <th className="py-2 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentReport.subjects.map((sub, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 font-medium text-slate-800">{sub.name}</td>
                      <td className="py-2.5 text-center text-slate-600">
                        {sub.theoryObtained}/{sub.theoryMax}
                      </td>
                      <td className="py-2.5 text-center text-slate-600">
                        {sub.practicalObtained}/{sub.practicalMax}
                      </td>
                      <td className="py-2.5 text-center font-bold text-slate-900">
                        {sub.theoryObtained + sub.practicalObtained}
                      </td>
                      <td className="py-2.5 text-center font-bold text-emerald-700">{sub.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Pass Status: <strong>PROMOTED / CLEARED</strong></span>
                <span>Affiliation: MPBSE Bhopal (SAEC 1989)</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL: FEE RECEIPT ================= */}
      <AnimatePresence>
        {showReceiptModal && selectedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-serif font-bold text-sm text-slate-900">
                  Official Fee Clearance Receipt
                </h3>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Receipt Number</span>
                  <span className="font-mono font-bold text-slate-800">
                    {selectedReceipt.receiptNumber}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Student Name</span>
                  <span className="font-bold text-slate-800">{student.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Scholar Roll ID</span>
                  <span className="font-mono text-slate-800">{student.id}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Academic Period</span>
                  <span className="text-slate-800">{selectedReceipt.term}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Amount Received</span>
                  <span className="font-bold text-emerald-700 text-sm">{selectedReceipt.amount}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Status</span>
                  <span className="font-semibold text-emerald-700">Verified & Reconciled</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 text-[11px] text-slate-500 border border-slate-200">
                Issued by Sri Aurobindo Education Centre Accounts Office, Tulsi Nagar, Bhopal.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
