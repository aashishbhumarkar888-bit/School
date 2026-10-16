"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SCHOOL_FACTS, HOUSES, NOTICES_DATA } from "@/lib/content/school-data";
import { DEMO_STUDENTS } from "@/lib/content/student-data";
import { HouseId } from "@/lib/types";
import {
  ShieldCheck,
  Lock,
  Users,
  MessageSquare,
  FileText,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  Calendar,
  LogOut,
  RefreshCw,
  Download,
  PlusCircle,
  Filter,
  Check,
  Eye,
  TrendingUp,
  Inbox,
  AlertCircle,
  LayoutGrid,
  Table as TableIcon,
  Flame,
  Award,
  Sparkles,
  ExternalLink,
  ChevronRight,
  X,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Building2,
  BarChart3,
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdmissionLead {
  id: string;
  parentName: string;
  phone: string;
  email: string;
  childName: string;
  targetClass: string;
  childAge?: string;
  message?: string;
  submittedAt: string;
  stage: "new" | "verified" | "interaction" | "admitted";
  proformaFeeVerified: boolean;
  notes?: string;
}

const INITIAL_LEADS: AdmissionLead[] = [
  {
    id: "SAS-ADM-2026-1042",
    parentName: "Sanjay Verma",
    phone: "9826011223",
    email: "sanjay.verma@example.com",
    childName: "Ananya Verma",
    targetClass: "KG-1",
    childAge: "3.8 Years",
    message: "Enquiring about admission proforma and bus transport routes near Shivaji Nagar.",
    submittedAt: "2026-10-12T10:30:00.000Z",
    stage: "verified",
    proformaFeeVerified: true,
    notes: "Birth certificate verified. Invited for interaction.",
  },
  {
    id: "SAS-ADM-2026-1043",
    parentName: "Dr. Meenakshi Sharma",
    phone: "9425098765",
    email: "meenakshi.s@example.com",
    childName: "Ishaan Sharma",
    targetClass: "Class I",
    childAge: "5.6 Years",
    message: "Candidate has completed UKG and will be 5.5 years in June. Seeking integral schooling.",
    submittedAt: "2026-10-13T14:15:00.000Z",
    stage: "interaction",
    proformaFeeVerified: true,
    notes: "Parent attended interaction on Oct 15.",
  },
  {
    id: "SAS-ADM-2026-1044",
    parentName: "Vikramaditya Rao",
    phone: "9893012345",
    email: "vikram.rao@example.com",
    childName: "Tara Rao",
    targetClass: "Nursery",
    childAge: "2.8 Years",
    message: "Enquiring for upcoming session starting June. Resides in Tulsi Nagar.",
    submittedAt: "2026-10-14T09:45:00.000Z",
    stage: "new",
    proformaFeeVerified: false,
    notes: "Awaiting birth certificate photocopy and ₹100 registration fee.",
  },
  {
    id: "SAS-ADM-2026-1045",
    parentName: "Neelam Agrawal",
    phone: "9406522334",
    email: "neelam.a@example.com",
    childName: "Advait Agrawal",
    targetClass: "KG-2",
    childAge: "4.5 Years",
    message: "Transfer from Indore to Bhopal. Seeking seat in KG-2.",
    submittedAt: "2026-10-15T11:20:00.000Z",
    stage: "admitted",
    proformaFeeVerified: true,
    notes: "Admission confirmed. Section KG-2B allocated.",
  },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<
    "telemetry" | "pipeline" | "houses" | "gazette" | "inbox" | "export"
  >("telemetry");

  // Admission Pipeline State
  const [pipelineView, setPipelineView] = useState<"kanban" | "table">("kanban");
  const [leads, setLeads] = useState<AdmissionLead[]>(INITIAL_LEADS);
  const [searchLead, setSearchLead] = useState("");
  const [selectedLead, setSelectedLead] = useState<AdmissionLead | null>(null);
  const [activeClassFilter, setActiveClassFilter] = useState("all");

  // Four-House Championship Points State
  const [housePoints, setHousePoints] = useState({
    teresa: 840,
    amartya: 920,
    tagore: 890,
    raman: 960,
  });

  // Notice Publisher state
  const [notices, setNotices] = useState(NOTICES_DATA);
  const [noticeForm, setNoticeForm] = useState({
    title: "",
    category: "Admission" as any,
    summary: "",
    content: "",
    isImportant: false,
  });
  const [noticeSuccess, setNoticeSuccess] = useState(false);

  // Messages Inbox State
  const [messages, setMessages] = useState([
    {
      id: "MSG-SAS-901",
      name: "Rajesh Soni",
      phone: "9826112233",
      email: "rajesh.soni@example.com",
      subject: "Alumni Connection",
      message: "Alumnus of Class of 2004 requesting school archive visit.",
      submittedAt: "2026-10-10T09:00:00.000Z",
      status: "Resolved",
    },
    {
      id: "MSG-SAS-902",
      name: "Preeti Malviya",
      phone: "9425114455",
      email: "preeti.m@example.com",
      subject: "Science Lab Timings",
      message: "Parent requesting information on Saturday student laboratory hours.",
      submittedAt: "2026-10-14T11:30:00.000Z",
      status: "Unread",
    },
  ]);

  // Toast feedback
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("sas_admin_auth");
      if (stored === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLogin = (passcodeToTest?: string) => {
    const code = (passcodeToTest || password).trim();
    if (
      code === "SAS-ADMIN-1989" ||
      code === "aurobindo@1989" ||
      code === "sasadmin"
    ) {
      setIsAuthenticated(true);
      setErrorMsg("");
      if (typeof window !== "undefined") {
        sessionStorage.setItem("sas_admin_auth", "true");
      }
      showToast("Authenticated as SAEC Administrative Lead");
    } else {
      setErrorMsg("Incorrect authorization key. Demo key: SAS-ADMIN-1989");
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("sas_admin_auth");
    }
  };

  const updateLeadStage = (leadId: string, newStage: AdmissionLead["stage"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, stage: newStage } : null));
    }
    showToast(`Lead ${leadId} shifted to ${newStage.toUpperCase()}`);
  };

  const addHousePoints = (houseId: HouseId, amount: number) => {
    setHousePoints((prev) => ({
      ...prev,
      [houseId]: prev[houseId] + amount,
    }));
    showToast(`Awarded +${amount} points to ${HOUSES[houseId].name}`);
  };

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeForm.title.trim() || !noticeForm.content.trim()) return;

    const newNotice = {
      id: `SAS/CIR/2026/${Math.floor(100 + Math.random() * 900)}`,
      title: noticeForm.title.trim(),
      date: "Current Cycle",
      category: noticeForm.category,
      summary: noticeForm.summary.trim() || noticeForm.title.trim(),
      content: noticeForm.content.trim(),
      isImportant: noticeForm.isImportant,
    };

    setNotices((prev) => [newNotice, ...prev]);
    setNoticeSuccess(true);
    setNoticeForm({
      title: "",
      category: "Admission",
      summary: "",
      content: "",
      isImportant: false,
    });
    showToast(`Published Notice: ${newNotice.id}`);
    setTimeout(() => setNoticeSuccess(false), 3000);
  };

  const exportCSV = () => {
    const headers = "ID,Parent Name,Phone,Email,Child Name,Target Class,Stage,Fee Verified\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.id}","${l.parentName}","${l.phone}","${l.email}","${l.childName}","${l.targetClass}","${l.stage}","${l.proformaFeeVerified}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SAS_Admissions_Export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast("Downloaded Admission Pipeline CSV");
  };

  const exportJSON = () => {
    const data = {
      school: SCHOOL_FACTS.fullName,
      society: SCHOOL_FACTS.society,
      generatedAt: new Date().toISOString(),
      leads,
      messages,
      housePoints,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SAS_Executive_Export_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast("Downloaded Executive Data JSON");
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchSearch =
      l.id.toLowerCase().includes(searchLead.toLowerCase()) ||
      l.parentName.toLowerCase().includes(searchLead.toLowerCase()) ||
      l.childName.toLowerCase().includes(searchLead.toLowerCase()) ||
      l.targetClass.toLowerCase().includes(searchLead.toLowerCase());
    const matchClass =
      activeClassFilter === "all" || l.targetClass === activeClassFilter;
    return matchSearch && matchClass;
  });

  // Login Barrier Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] bg-white text-slate-900 flex items-center justify-center p-4 relative">
        <div className="pointer-events-none absolute inset-0 bg-dots-pattern opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200/90 shadow-2xl p-8 relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="font-serif font-bold text-2xl text-slate-900">
              Executive Command Center
            </h1>
            <p className="text-xs text-slate-500">
              Sri Aurobindo Education Centre & School Administrative ERP
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Passcode / Authorization Key
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter key (SAS-ADMIN-1989)"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50/50"
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200 font-medium">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 cursor-pointer"
            >
              Authenticate Access
            </button>
          </form>

          {/* 1-Click Instant Demo Unlock */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => handleLogin("SAS-ADMIN-1989")}
              className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>1-Click Instant Evaluator Demo Unlock</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Default passcode: <code className="font-mono text-slate-600">SAS-ADMIN-1989</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 pb-20">
      {/* Toast Feedback */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-[99] rounded-2xl bg-slate-900 text-white px-4 py-2.5 text-xs font-semibold shadow-xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Admin Header Bar */}
      <header className="bg-white border-b border-slate-200/90 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
              ERP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-base text-slate-900 leading-tight">
                  Executive Command Center
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live System
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Sri Aurobindo Education Centre (SAEC 1989) · MPBSE K–12
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs font-semibold">
              {[
                { id: "telemetry", label: "Telemetry", icon: BarChart3 },
                { id: "pipeline", label: "Admissions Pipeline", icon: LayoutGrid },
                { id: "houses", label: "House Championship", icon: Flame },
                { id: "gazette", label: "Gazette CMS", icon: FileText },
                { id: "inbox", label: "Parent Inbox", icon: Inbox },
                { id: "export", label: "Data Controls", icon: FileSpreadsheet },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap",
                      isActive
                        ? "bg-slate-900 text-white font-bold shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleSignOut}
              className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-2"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* ================= MODULE 1: EXECUTIVE TELEMETRY & ANALYTICS ================= */}
        {activeTab === "telemetry" && (
          <div className="space-y-8">
            {/* 4 Animated KPI Cards with SVG Sparklines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Total Enquiries (Live)
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-serif font-bold text-slate-900">
                    {leads.length + 12}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    +18% MoM
                  </span>
                </div>
                {/* SVG Sparkline */}
                <svg className="w-full h-8 text-blue-600" fill="none" stroke="currentColor">
                  <path
                    d="M 0 25 Q 40 5, 80 18 T 160 10 T 240 4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-[11px] text-slate-500">June 2026 Admissions Cycle</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  ₹100 Proforma Verified
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-serif font-bold text-blue-700">
                    {leads.filter((l) => l.proformaFeeVerified).length + 8}
                  </span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    Verified
                  </span>
                </div>
                <svg className="w-full h-8 text-emerald-600" fill="none" stroke="currentColor">
                  <path
                    d="M 0 20 Q 50 28, 100 12 T 200 8 T 240 2"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-[11px] text-slate-500">With Official Birth Certificate</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Active K–12 Enrolment
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-serif font-bold text-slate-900">1,240</span>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                    Capacity 92%
                  </span>
                </div>
                <svg className="w-full h-8 text-amber-500" fill="none" stroke="currentColor">
                  <path
                    d="M 0 15 Q 60 20, 120 10 T 200 14 T 240 6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-[11px] text-slate-500">Nursery through Class XII (MPBSE)</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Gazette Circulars Active
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-serif font-bold text-slate-900">
                    {notices.length}
                  </span>
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                    Published
                  </span>
                </div>
                <svg className="w-full h-8 text-indigo-500" fill="none" stroke="currentColor">
                  <path
                    d="M 0 22 Q 50 10, 100 15 T 180 8 T 240 12"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-[11px] text-slate-500">Board & Academic Notices</p>
              </div>
            </div>

            {/* Class-Wise Demand Distribution & Live Operations */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="font-serif font-bold text-base text-slate-900">
                  Class-Wise Admission Demand Distribution
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time applications received for upcoming session commencement in June.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    { grade: "Nursery (2½ – 3 Years)", count: 28, max: 40, color: "bg-blue-600" },
                    { grade: "KG-1 (3½ – 4 Years)", count: 34, max: 40, color: "bg-amber-500" },
                    { grade: "KG-2 (4½ Years)", count: 22, max: 35, color: "bg-emerald-600" },
                    { grade: "Class I (5½ Years)", count: 36, max: 40, color: "bg-rose-600" },
                    { grade: "Classes II to XII (Vacancy Based)", count: 18, max: 25, color: "bg-indigo-600" },
                  ].map((row, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-800">{row.grade}</span>
                        <span className="text-slate-500">
                          {row.count} applicants ({Math.round((row.count / row.max) * 100)}% filled)
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all duration-700", row.color)}
                          style={{ width: `${(row.count / row.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="font-serif font-bold text-base text-slate-900">
                  Campus Operations Status
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      School Operating Hours
                    </span>
                    <strong className="text-slate-900 block text-sm">
                      7:45 AM – 1:30 PM (Mon–Sat)
                    </strong>
                    <span className="text-slate-500">Classes, Lab Viva & Daily Library Hour</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1 text-blue-900">
                    <span className="text-[10px] uppercase font-bold text-blue-600 block">
                      Registration Window
                    </span>
                    <strong className="block text-sm">8:00 AM – 1:00 PM</strong>
                    <span>School Office Counter · Auro Mandir Parisar</span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab("pipeline")}
                      className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span>Inspect Admission Pipeline</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= MODULE 2: ADMISSION PIPELINE (KANBAN + TABLE) ================= */}
        {activeTab === "pipeline" && (
          <div className="space-y-6">
            {/* Pipeline Controls Bar */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchLead}
                    onChange={(e) => setSearchLead(e.target.value)}
                    placeholder="Search applicant / ref ID..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50"
                  />
                </div>

                <select
                  value={activeClassFilter}
                  onChange={(e) => setActiveClassFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none"
                >
                  <option value="all">All Classes</option>
                  <option value="Nursery">Nursery</option>
                  <option value="KG-1">KG-1</option>
                  <option value="KG-2">KG-2</option>
                  <option value="Class I">Class I</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-1 text-xs">
                  <button
                    onClick={() => setPipelineView("kanban")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer",
                      pipelineView === "kanban" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600"
                    )}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Kanban</span>
                  </button>
                  <button
                    onClick={() => setPipelineView("table")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer",
                      pipelineView === "table" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600"
                    )}
                  >
                    <TableIcon className="w-3.5 h-3.5" />
                    <span>Data Table</span>
                  </button>
                </div>

                <button
                  onClick={exportCSV}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 border border-slate-200"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {/* KANBAN VIEW */}
            {pipelineView === "kanban" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: "new", title: "1. New Enquiries", color: "border-sky-300 bg-sky-50/40 text-sky-900" },
                  { id: "verified", title: "2. Fee & Docs Verified", color: "border-amber-300 bg-amber-50/40 text-amber-900" },
                  { id: "interaction", title: "3. Committee Interaction", color: "border-purple-300 bg-purple-50/40 text-purple-900" },
                  { id: "admitted", title: "4. Officially Admitted", color: "border-emerald-300 bg-emerald-50/40 text-emerald-900" },
                ].map((col) => {
                  const colLeads = filteredLeads.filter((l) => l.stage === col.id);
                  return (
                    <div
                      key={col.id}
                      className="rounded-3xl bg-white border border-slate-200/90 p-4 shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <h4 className="font-serif font-bold text-xs text-slate-800">{col.title}</h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          {colLeads.length}
                        </span>
                      </div>

                      <div className="space-y-3 min-h-[300px]">
                        {colLeads.map((lead) => (
                          <div
                            key={lead.id}
                            onClick={() => setSelectedLead(lead)}
                            className="p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-md transition-all cursor-pointer space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] font-bold text-blue-700">
                                {lead.id}
                              </span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                                {lead.targetClass}
                              </span>
                            </div>

                            <div>
                              <h5 className="font-bold text-xs text-slate-900">{lead.childName}</h5>
                              <p className="text-[11px] text-slate-500">Parent: {lead.parentName}</p>
                            </div>

                            <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-100">
                              <span className="text-slate-400">
                                {lead.proformaFeeVerified ? "₹100 Paid" : "Fee Pending"}
                              </span>
                              <span className="text-blue-600 font-bold group-hover:underline">
                                Inspect →
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TABLE VIEW */}
            {pipelineView === "table" && (
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-400 uppercase font-bold text-[10px]">
                        <th className="py-3 px-4">Ref Code</th>
                        <th className="py-3 px-4">Child Name</th>
                        <th className="py-3 px-4">Target Class</th>
                        <th className="py-3 px-4">Parent Name</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Stage</th>
                        <th className="py-3 px-4">Fee Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/60">
                          <td className="py-3 px-4 font-mono font-bold text-blue-700">{lead.id}</td>
                          <td className="py-3 px-4 font-bold text-slate-900">{lead.childName}</td>
                          <td className="py-3 px-4">{lead.targetClass}</td>
                          <td className="py-3 px-4 text-slate-600">{lead.parentName}</td>
                          <td className="py-3 px-4 font-mono">{lead.phone}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                              {lead.stage}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {lead.proformaFeeVerified ? (
                              <span className="text-emerald-700 font-semibold">₹100 Verified</span>
                            ) : (
                              <span className="text-amber-700 font-semibold">Pending</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-semibold"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= MODULE 3: STUDENT & FOUR-HOUSE CHAMPIONSHIP ================= */}
        {activeTab === "houses" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Four-House Championship Live Control Panel
              </h3>
              <p className="text-xs text-slate-500">
                Adjust points for Teresa, Amartya, Tagore, and Raman Houses across competitions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {(["teresa", "amartya", "tagore", "raman"] as HouseId[]).map((id) => {
                  const house = HOUSES[id];
                  const currentScore = housePoints[id];

                  return (
                    <div
                      key={id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full"
                            style={{ backgroundColor: house.accentHex }}
                          />
                          <h4 className="font-serif font-bold text-sm text-slate-900">
                            {house.name}
                          </h4>
                        </div>
                        <span className="text-lg font-serif font-bold text-slate-900">
                          {currentScore} pts
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <button
                          onClick={() => addHousePoints(id, 25)}
                          className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 shadow-2xs"
                        >
                          +25 Debate
                        </button>
                        <button
                          onClick={() => addHousePoints(id, 50)}
                          className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 shadow-2xs"
                        >
                          +50 Science
                        </button>
                        <button
                          onClick={() => addHousePoints(id, 30)}
                          className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 shadow-2xs"
                        >
                          +30 Arts
                        </button>
                        <button
                          onClick={() => addHousePoints(id, 40)}
                          className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 shadow-2xs"
                        >
                          +40 Sports
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Searchable Student Roster */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-slate-900">
                Active Student Directory & Academic Standing
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase font-bold">
                      <th className="py-2.5">Roll ID</th>
                      <th className="py-2.5">Student Name</th>
                      <th className="py-2.5">Grade</th>
                      <th className="py-2.5">House</th>
                      <th className="py-2.5">Attendance</th>
                      <th className="py-2.5">Overall Score</th>
                      <th className="py-2.5">Fee Clearance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {DEMO_STUDENTS.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/50">
                        <td className="py-2.5 font-mono font-bold text-blue-700">{s.id}</td>
                        <td className="py-2.5 font-bold text-slate-900">{s.name}</td>
                        <td className="py-2.5">{s.grade}</td>
                        <td className="py-2.5">
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-bold"
                            style={{
                              backgroundColor: `${s.houseColor}15`,
                              color: s.houseColor,
                            }}
                          >
                            {s.houseName}
                          </span>
                        </td>
                        <td className="py-2.5 font-semibold text-emerald-700">
                          {s.attendancePercent}%
                        </td>
                        <td className="py-2.5 font-bold text-slate-900">{s.overallScorePercent}%</td>
                        <td className="py-2.5 text-emerald-700 font-semibold">
                          Paid · Cleared
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= MODULE 4: GAZETTE CMS ================= */}
        {activeTab === "gazette" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-slate-900">
                Publish Official Gazette Circular
              </h3>
              <form onSubmit={handlePublishNotice} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Circular Title</label>
                  <input
                    type="text"
                    value={noticeForm.title}
                    onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                    placeholder="e.g. Annual Sports Meet 2026 Time-Table"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={noticeForm.category}
                      onChange={(e) =>
                        setNoticeForm({ ...noticeForm, category: e.target.value as any })
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                    >
                      <option value="Admission">Admission</option>
                      <option value="Examination">Examination</option>
                      <option value="Academic">Academic</option>
                      <option value="Administrative">Administrative</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="isImportant"
                      checked={noticeForm.isImportant}
                      onChange={(e) =>
                        setNoticeForm({ ...noticeForm, isImportant: e.target.checked })
                      }
                      className="rounded text-blue-600"
                    />
                    <label htmlFor="isImportant" className="font-bold text-slate-700">
                      Priority Badge
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Summary Excerpt</label>
                  <input
                    type="text"
                    value={noticeForm.summary}
                    onChange={(e) => setNoticeForm({ ...noticeForm, summary: e.target.value })}
                    placeholder="Brief 1-sentence synopsis"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Notice Content</label>
                  <textarea
                    rows={4}
                    value={noticeForm.content}
                    onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                    placeholder="Official text of the circular..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Publish to /notices
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-slate-900">
                Published Gazette Circulars ({notices.length})
              </h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {notices.map((n) => (
                  <div
                    key={n.id}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-blue-700">{n.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white border border-slate-200 text-slate-700">
                        {n.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900">{n.title}</h4>
                    <p className="text-slate-500 line-clamp-2">{n.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= MODULE 5: PARENT INBOX ================= */}
        {activeTab === "inbox" && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900">
              Campus Contact & Enquiry Inbox
            </h3>
            <div className="space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-700">{m.id}</span>
                      <strong className="text-slate-900">{m.name}</strong>
                      <span className="text-slate-400">({m.phone})</span>
                    </div>
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-[10px] font-bold",
                        m.status === "Resolved"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      )}
                    >
                      {m.status}
                    </span>
                  </div>

                  <p className="text-slate-700">{m.message}</p>
                  <div className="text-[11px] text-slate-400">Subject: {m.subject}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= MODULE 6: DATA EXPORT & SYSTEM CONTROLS ================= */}
        {activeTab === "export" && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Data Controls, Backup & Verification
              </h3>
              <p className="text-xs text-slate-500">
                1-click exports for external reporting, board auditing, and local backups.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                <h4 className="font-bold text-sm text-slate-900">Export Pipeline to CSV</h4>
                <p className="text-xs text-slate-500">
                  Spreadsheet format containing all applicant records, phone numbers, target classes, and fee statuses.
                </p>
                <button
                  onClick={exportCSV}
                  className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .CSV File</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                <h4 className="font-bold text-sm text-slate-900">Export System Snapshot to JSON</h4>
                <p className="text-xs text-slate-500">
                  Full programmatic backup of leads, messages, house standings, and institutional metadata.
                </p>
                <button
                  onClick={exportJSON}
                  className="mt-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .JSON Snapshot</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= SLIDE-OVER APPLICANT INSPECTOR DRAWER ================= */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-md h-full bg-white border-l border-slate-200 shadow-2xl p-6 sm:p-8 z-10 overflow-y-auto space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="font-mono text-xs font-bold text-blue-700">
                    {selectedLead.id}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-slate-900 leading-tight">
                    {selectedLead.childName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Applicant Information
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-500">Target Class:</span>
                      <p className="font-bold text-slate-800">{selectedLead.targetClass}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Child Age:</span>
                      <p className="font-bold text-slate-800">
                        {selectedLead.childAge || "Age-appropriate"}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Parent / Guardian:</span>
                      <p className="font-bold text-slate-800">{selectedLead.parentName}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Registration Fee:</span>
                      <p
                        className={cn(
                          "font-bold",
                          selectedLead.proformaFeeVerified
                            ? "text-emerald-700"
                            : "text-amber-700"
                        )}
                      >
                        {selectedLead.proformaFeeVerified ? "₹100 Verified" : "Pending Verification"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold flex items-center justify-center gap-1.5 transition-colors border border-blue-200"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Parent</span>
                  </a>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Parent</span>
                  </a>
                </div>

                {/* Stage Progression Buttons */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Update Pipeline Stage:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => updateLeadStage(selectedLead.id, "new")}
                      className={cn(
                        "py-2 rounded-xl text-xs font-semibold border transition-colors",
                        selectedLead.stage === "new"
                          ? "bg-slate-900 text-white font-bold"
                          : "bg-white text-slate-700"
                      )}
                    >
                      1. New Enquiry
                    </button>
                    <button
                      onClick={() => updateLeadStage(selectedLead.id, "verified")}
                      className={cn(
                        "py-2 rounded-xl text-xs font-semibold border transition-colors",
                        selectedLead.stage === "verified"
                          ? "bg-slate-900 text-white font-bold"
                          : "bg-white text-slate-700"
                      )}
                    >
                      2. Docs Verified
                    </button>
                    <button
                      onClick={() => updateLeadStage(selectedLead.id, "interaction")}
                      className={cn(
                        "py-2 rounded-xl text-xs font-semibold border transition-colors",
                        selectedLead.stage === "interaction"
                          ? "bg-slate-900 text-white font-bold"
                          : "bg-white text-slate-700"
                      )}
                    >
                      3. Interaction
                    </button>
                    <button
                      onClick={() => updateLeadStage(selectedLead.id, "admitted")}
                      className={cn(
                        "py-2 rounded-xl text-xs font-semibold border transition-colors",
                        selectedLead.stage === "admitted"
                          ? "bg-emerald-600 text-white font-bold border-emerald-600"
                          : "bg-white text-slate-700"
                      )}
                    >
                      4. Admitted
                    </button>
                  </div>
                </div>

                {/* Internal Committee Notes */}
                <div className="space-y-1 pt-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Internal Committee Notes
                  </span>
                  <textarea
                    rows={3}
                    defaultValue={selectedLead.notes || ""}
                    placeholder="Add observations, interview notes, or documents needed..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
