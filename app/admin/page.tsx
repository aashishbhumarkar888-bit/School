"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SCHOOL_FACTS, HOUSES } from "@/lib/content/school-data";
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
  Receipt,
  Settings,
  Image as ImageIcon,
  Edit2,
  Trash2,
  Sliders,
  Send,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FeeScheduleItem,
  AdmissionSettings,
  NoticeRecord,
  EventRecord,
  GalleryItemRecord,
  AchievementItemRecord,
  AdmissionEnquiry,
} from "@/lib/server/db";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("admin");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Active Tab: 7 Master Tabs required by SAEC Institutional CMS
  const [activeTab, setActiveTab] = useState<
    "pipeline" | "fees" | "session" | "notices" | "events" | "gallery" | "houses"
  >("pipeline");

  // CMS Collections Data
  const [feeSchedule, setFeeSchedule] = useState<FeeScheduleItem[]>([]);
  const [admissionSettings, setAdmissionSettings] = useState<AdmissionSettings>({
    activeSession: "Academic Session 2026–27",
    registrationOpenDate: "15th June Onwards",
    officeHours: "8:00 AM – 1:00 PM (Monday – Saturday)",
    locationText: "Auro Mandir Parisar, Behind Kannad Bhawan, 2nd Stop, Tulsi Nagar, Bhopal – 462003",
    midSessionStatusNotice:
      "Academic Session 2026–27 is currently in progress. Pre-registration & Priority Notifications for June 2027–28 session and mid-term vacancy transfers (Classes II–XII) are currently being processed at the School Office.",
    proformaFee: "₹100 (Verified)",
  });
  const [notices, setNotices] = useState<NoticeRecord[]>([]);
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItemRecord[]>([]);
  const [achievements, setAchievements] = useState<AchievementItemRecord[]>([]);
  const [housePoints, setHousePoints] = useState({
    teresa: 840,
    amartya: 920,
    tagore: 890,
    raman: 960,
  });
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>([]);

  // Pipeline Filter & Search
  const [searchEnquiry, setSearchEnquiry] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdmissionEnquiry | null>(null);

  // Form Modals State
  const [editingFee, setEditingFee] = useState<FeeScheduleItem | null>(null);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeForm, setNoticeForm] = useState({
    title: "",
    category: "Admission" as const,
    priority: "Normal" as const,
    date: new Date().toISOString().split("T")[0],
    body: "",
    pinned: false,
  });

  const [showEventModal, setShowEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    term: "First Term" as const,
    location: "Examination Hall, Parisar",
    summary: "",
  });

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "Campus & Parisar" as const,
    imageUrl: "/images/official/society.jpg",
    caption: "",
    featured: true,
  });

  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [achievementForm, setAchievementForm] = useState({
    title: "",
    category: "Institutional Milestone" as const,
    yearOrTerm: "Academic Session 2026–27",
    description: "",
    verifiedStatus: "Confirmed by SAEC Office",
  });

  // Toast feedback
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Load CMS Data on Authentication
  const fetchCmsData = async () => {
    try {
      const res = await fetch("/api/cms");
      const json = await res.json();
      if (json.success && json.data) {
        setFeeSchedule(json.data.feeSchedule || []);
        if (json.data.admissionSettings) setAdmissionSettings(json.data.admissionSettings);
        setNotices(json.data.notices || []);
        setEvents(json.data.events || []);
        setGalleryItems(json.data.galleryItems || []);
        setAchievements(json.data.achievements || []);
        if (json.data.housePoints) setHousePoints(json.data.housePoints);
        setEnquiries(json.data.enquiries || []);
      }
    } catch (err) {
      console.error("Failed to fetch CMS data", err);
    }
  };

  useEffect(() => {
    async function verifyAdminSession() {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        if (data.authenticated && data.admin) {
          setIsAuthenticated(true);
          fetchCmsData();
          return;
        }
      } catch {}
      if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem("sas_admin_auth");
        if (stored === "true") {
          setIsAuthenticated(true);
          fetchCmsData();
        }
      }
    }
    verifyAdminSession();
  }, []);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername: usernameOrEmail, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.authenticated) {
        setErrorMsg(data.error || "Authentication failed. Invalid passcode.");
        setLoading(false);
        return;
      }
      setIsAuthenticated(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("sas_admin_auth", "true");
      }
      showToast("Authenticated as SAEC Administrative Lead");
      fetchCmsData();
    } catch {
      setErrorMsg("Network error connecting to administrative verification gateway.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("sas_admin_auth");
    }
  };

  // Generic CMS Action Invoker
  const invokeCmsAction = async (action: string, payload: any) => {
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, payload }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Failed to update CMS record");
        return false;
      }
      fetchCmsData();
      return true;
    } catch (err: any) {
      showToast("Network error executing CMS action");
      return false;
    }
  };

  // Export Enquiries as CSV
  const handleExportCsv = () => {
    if (enquiries.length === 0) {
      showToast("No enquiries available to export.");
      return;
    }
    const headers = ["Reference ID", "Candidate Name", "Target Class", "DOB", "Parent Name", "Phone", "Email", "Status", "Notes", "Date"];
    const rows = enquiries.map((e) => [
      e.referenceNo || e.id,
      `"${e.studentName.replace(/"/g, '""')}"`,
      e.targetClass,
      e.dob || "",
      `"${e.parentName.replace(/"/g, '""')}"`,
      e.phone,
      e.email,
      e.status,
      `"${(e.notes || "").replace(/"/g, '""')}"`,
      e.createdAt,
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `SAS_Admission_Enquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exported Admission Enquiries to CSV");
  };

  // Export Enquiries as JSON
  const handleExportJson = () => {
    const jsonStr = JSON.stringify(enquiries, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `SAS_Enquiries_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exported Admission Enquiries to JSON");
  };

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus = statusFilter === "all" || e.status.toLowerCase().includes(statusFilter.toLowerCase());
    const matchesSearch =
      e.studentName.toLowerCase().includes(searchEnquiry.toLowerCase()) ||
      e.parentName.toLowerCase().includes(searchEnquiry.toLowerCase()) ||
      e.phone.includes(searchEnquiry) ||
      (e.referenceNo && e.referenceNo.toLowerCase().includes(searchEnquiry.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // ================= RENDER: AUTHENTICATION GATE =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-3xl bg-slate-800/90 border border-slate-700 p-8 shadow-2xl space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-bold font-serif">Executive Admin CMS</h1>
            <p className="text-xs text-slate-400">
              Sri Aurobindo Education Centre (SAEC) · Bhopal (Est. July 1989)
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Administrator Identifier
              </label>
              <input
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Executive Passcode
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter executive passcode"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Default Master Passcode: <code className="text-amber-400">SAS-ADMIN-1989</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Sign In to Admin Command Center"}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-700/60 text-center text-[11px] text-slate-400">
            Self-Service No-Developer CMS · Manage Fees, Notices, Events & Roster
          </div>
        </motion.div>
      </div>
    );
  }

  // ================= RENDER: AUTHENTICATED NO-DEVELOPER INSTITUTIONAL CMS =================
  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-xl border border-slate-700 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-bold font-serif text-base">
              SAS
            </div>
            <div>
              <h1 className="font-serif font-bold text-sm text-slate-900">
                Institutional Admin Command Center
              </h1>
              <p className="text-[10px] text-slate-500 font-medium">
                Sri Aurobindo Education Centre (SAEC) · No-Code Management CMS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>View Public Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold hover:bg-rose-100 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 7 Master Tabs Ribbon */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-slate-100 py-2">
          {[
            { id: "pipeline", label: "1. Enquiries Pipeline", icon: Users, count: enquiries.length },
            { id: "fees", label: "2. Fee Schedule Manager", icon: Receipt },
            { id: "session", label: "3. Admission Dates & Settings", icon: Calendar },
            { id: "notices", label: "4. Notices & Circulars", icon: FileText, count: notices.length },
            { id: "events", label: "5. Three-Term Events", icon: Clock, count: events.length },
            { id: "gallery", label: "6. Gallery & Media", icon: ImageIcon, count: galleryItems.length },
            { id: "houses", label: "7. House Points & Honours", icon: Trophy },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                  isActive
                    ? "bg-slate-900 text-white shadow-xs font-bold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-amber-400" : "text-slate-400")} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={cn(
                      "px-1.5 py-0.2 rounded-md text-[10px] font-mono",
                      isActive ? "bg-slate-800 text-amber-300" : "bg-slate-200 text-slate-700"
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* ================= TAB 1: ADMISSION ENQUIRIES PIPELINE ================= */}
        {activeTab === "pipeline" && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {["all", "New Enquiry", "Verified", "Interaction", "Admitted"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer",
                      statusFilter === st
                        ? "bg-slate-900 text-white font-bold"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    )}
                  >
                    {st === "all" ? "All Enquiries" : st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchEnquiry}
                    onChange={(e) => setSearchEnquiry(e.target.value)}
                    placeholder="Search candidate, phone, ID..."
                    className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 w-48 sm:w-64 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <button
                  onClick={handleExportCsv}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={handleExportJson}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>JSON</span>
                </button>
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-slate-900">
                    Live Admission Enquiries & Waitlist
                  </h3>
                  <p className="text-xs text-slate-500">
                    Showing {filteredEnquiries.length} enquiry records. Click on an enquiry to update notes or status.
                  </p>
                </div>
                <button
                  onClick={fetchCmsData}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  title="Refresh Enquiries"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-6">Reference ID</th>
                      <th className="py-3 px-4">Candidate Child</th>
                      <th className="py-3 px-4">Grade</th>
                      <th className="py-3 px-4">Parent Name</th>
                      <th className="py-3 px-4">Phone / Email</th>
                      <th className="py-3 px-4">Status Stage</th>
                      <th className="py-3 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          No admission enquiries match the selected filter.
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-6 font-mono font-bold text-sky-700">
                            {enq.referenceNo || enq.id}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900 font-serif">
                            {enq.studentName}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold text-[11px]">
                              {enq.targetClass}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">{enq.parentName}</td>
                          <td className="py-3.5 px-4">
                            <a href={`tel:${enq.phone}`} className="text-blue-600 hover:underline block font-mono">
                              {enq.phone}
                            </a>
                            <span className="text-[11px] text-slate-400">{enq.email}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={enq.status}
                              onChange={(e) =>
                                invokeCmsAction("update_enquiry_status", {
                                  id: enq.id,
                                  status: e.target.value,
                                })
                              }
                              className={cn(
                                "px-2.5 py-1 rounded-lg text-[11px] font-bold border focus:outline-none cursor-pointer",
                                enq.status === "Admitted"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                  : enq.status === "Verified"
                                  ? "bg-sky-50 text-sky-800 border-sky-200"
                                  : enq.status === "Interaction"
                                  ? "bg-amber-50 text-amber-800 border-amber-200"
                                  : "bg-slate-100 text-slate-700 border-slate-200"
                              )}
                            >
                              <option value="New Enquiry">New Enquiry</option>
                              <option value="Verified">Verified Proforma</option>
                              <option value="Interaction">Interaction Scheduled</option>
                              <option value="Admitted">Admitted (Seat Confirmed)</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <button
                              onClick={() => {
                                if (confirm("Are you sure you want to remove this enquiry?")) {
                                  invokeCmsAction("delete_enquiry", { id: enq.id });
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: OFFICIAL FEE SCHEDULE MANAGER ================= */}
        {activeTab === "fees" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wider">
                    Zero Unverified Figures Policy
                  </span>
                  <h3 className="font-serif font-bold text-lg text-slate-900 mt-1">
                    Official Fee Schedule Manager (Nursery through Class XII)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Publish approved Tuition, Admission, Annual, and Transport fee amounts once verified by SAEC Governing Body.
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (confirm("Reset all class tariffs to 'As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)'?")) {
                      feeSchedule.forEach((item) => {
                        invokeCmsAction("update_fee", {
                          id: item.id,
                          admissionFee: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
                          tuitionFee: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
                          annualCharges: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
                          transportCharges: "Distance-Slab Based (Confirm at School Office)",
                          verificationStatus: "As per Official SAEC Office Schedule — Confirm at School Office",
                        });
                      });
                      showToast("All class fees reset to official attached schedule notice");
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcwIcon className="w-3.5 h-3.5 text-slate-500" />
                  <span>Enforce Official Notice Default</span>
                </button>
              </div>

              {/* Fee Schedule Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-6">Class / Wing</th>
                      <th className="py-3 px-4">Proforma Fee</th>
                      <th className="py-3 px-4">Admission Fee</th>
                      <th className="py-3 px-4">Tuition Fee (3-Terms)</th>
                      <th className="py-3 px-4">Annual Charges</th>
                      <th className="py-3 px-4">Transport Basis</th>
                      <th className="py-3 px-4">Verification Status</th>
                      <th className="py-3 px-6 text-right">Edit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {feeSchedule.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-900 font-serif">
                          {item.grade}
                        </td>
                        <td className="py-4 px-4 font-mono font-bold text-sky-700">
                          {item.registrationFee}
                        </td>
                        <td className="py-4 px-4 text-xs font-medium text-slate-800">
                          {item.admissionFee}
                        </td>
                        <td className="py-4 px-4 text-xs font-medium text-slate-800">
                          {item.tuitionFee}
                        </td>
                        <td className="py-4 px-4 text-xs font-medium text-slate-800">
                          {item.annualCharges}
                        </td>
                        <td className="py-4 px-4 text-xs text-slate-600">
                          {item.transportCharges}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={cn(
                              "px-2.5 py-1 rounded-full text-[10px] font-bold inline-block",
                              item.verificationStatus === "Confirmed by SAEC Office"
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : "bg-amber-50 text-amber-800 border border-amber-200"
                            )}
                          >
                            {item.verificationStatus}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => setEditingFee(item)}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 font-semibold flex items-center gap-1 ml-auto cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal: Edit Class Fee */}
            {editingFee && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-serif font-bold text-base text-slate-900">
                      Edit Fee Schedule: {editingFee.grade}
                    </h3>
                    <button onClick={() => setEditingFee(null)} className="p-1 text-slate-400 hover:text-slate-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await invokeCmsAction("update_fee", editingFee);
                      setEditingFee(null);
                      showToast(`Fee schedule updated for ${editingFee.grade}`);
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Registration Proforma Fee (Verified Statutory)
                      </label>
                      <input
                        type="text"
                        value={editingFee.registrationFee}
                        disabled
                        className="w-full px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">One-Time Admission Fee</label>
                      <input
                        type="text"
                        value={editingFee.admissionFee}
                        onChange={(e) => setEditingFee({ ...editingFee, admissionFee: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Tuition Fee (3-Terms Cycle)</label>
                      <input
                        type="text"
                        value={editingFee.tuitionFee}
                        onChange={(e) => setEditingFee({ ...editingFee, tuitionFee: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Annual Development Charges</label>
                      <input
                        type="text"
                        value={editingFee.annualCharges}
                        onChange={(e) => setEditingFee({ ...editingFee, annualCharges: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Transport Slabs Description</label>
                      <input
                        type="text"
                        value={editingFee.transportCharges}
                        onChange={(e) => setEditingFee({ ...editingFee, transportCharges: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Verification Status</label>
                      <select
                        value={editingFee.verificationStatus}
                        onChange={(e) => setEditingFee({ ...editingFee, verificationStatus: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        <option value="As per Official SAEC Office Schedule — Confirm at School Office">
                          As per Official SAEC Office Schedule — Confirm at School Office
                        </option>
                        <option value="Confirmed by SAEC Office">Confirmed by SAEC Office</option>
                      </select>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setEditingFee(null)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
                      >
                        Save & Publish
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: ADMISSION DATES & SETTINGS ================= */}
        {activeTab === "session" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6 max-w-3xl">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Admission Season & Session Settings
                </h3>
                <p className="text-xs text-slate-500">
                  Update active academic year, counter hours, and the mid-session banner shown across public admissions.
                </p>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await invokeCmsAction("update_admission_settings", admissionSettings);
                  showToast("Admission session settings successfully published to public site");
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Current Academic Session</label>
                    <input
                      type="text"
                      value={admissionSettings.activeSession}
                      onChange={(e) => setAdmissionSettings({ ...admissionSettings, activeSession: e.target.value })}
                      placeholder="e.g. Academic Session 2026–27"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Registration Opening Date</label>
                    <input
                      type="text"
                      value={admissionSettings.registrationOpenDate}
                      onChange={(e) => setAdmissionSettings({ ...admissionSettings, registrationOpenDate: e.target.value })}
                      placeholder="e.g. 15th June Onwards"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Counter Office Hours</label>
                    <input
                      type="text"
                      value={admissionSettings.officeHours}
                      onChange={(e) => setAdmissionSettings({ ...admissionSettings, officeHours: e.target.value })}
                      placeholder="8:00 AM – 1:00 PM (Monday – Saturday)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Prescribed Proforma Fee</label>
                    <input
                      type="text"
                      value={admissionSettings.proformaFee}
                      onChange={(e) => setAdmissionSettings({ ...admissionSettings, proformaFee: e.target.value })}
                      placeholder="₹100 (Verified)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Office Counter Location Text</label>
                  <input
                    type="text"
                    value={admissionSettings.locationText}
                    onChange={(e) => setAdmissionSettings({ ...admissionSettings, locationText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Mid-Session Status Notice (Shown on Public Admissions & Hero)
                  </label>
                  <textarea
                    rows={3}
                    value={admissionSettings.midSessionStatusNotice}
                    onChange={(e) => setAdmissionSettings({ ...admissionSettings, midSessionStatusNotice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs leading-relaxed"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
                  >
                    Save & Publish Session Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= TAB 4: OFFICIAL NOTICES & CIRCULARS PUBLISHER ================= */}
        {activeTab === "notices" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Official Notices & Circulars Publisher
                  </h3>
                  <p className="text-xs text-slate-500">
                    Publish administrative circulars, datesheets, fee reminders, and public school announcements.
                  </p>
                </div>

                <button
                  onClick={() => setShowNoticeModal(true)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-slate-800 cursor-pointer shadow-sm"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Publish New Circular</span>
                </button>
              </div>

              {/* Notices List */}
              <div className="space-y-3">
                {notices.map((n) => (
                  <div
                    key={n.id}
                    className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-sky-700">{n.code}</span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-200 text-slate-700">
                          {n.category}
                        </span>
                        {n.pinned && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800">
                            PINNED
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400">{n.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{n.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{n.body}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() =>
                          invokeCmsAction("update_notice", { id: n.id, pinned: !n.pinned })
                        }
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer",
                          n.pinned
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        )}
                      >
                        {n.pinned ? "Unpin" : "Pin Notice"}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Delete this circular permanently?")) {
                            invokeCmsAction("delete_notice", { id: n.id });
                          }
                        }}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal: Publish Notice */}
            {showNoticeModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-serif font-bold text-base text-slate-900">
                      Publish Official School Circular
                    </h3>
                    <button onClick={() => setShowNoticeModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await invokeCmsAction("create_notice", noticeForm);
                      setShowNoticeModal(false);
                      setNoticeForm({
                        title: "",
                        category: "Admission",
                        priority: "Normal",
                        date: new Date().toISOString().split("T")[0],
                        body: "",
                        pinned: false,
                      });
                      showToast("Circular published to /notices and homepage");
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Circular Title *</label>
                      <input
                        type="text"
                        value={noticeForm.title}
                        onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                        placeholder="e.g. First Term Examination Schedule & Fee Clearance"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Category</label>
                        <select
                          value={noticeForm.category}
                          onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        >
                          <option value="Admission">Admission</option>
                          <option value="Examination">Examination</option>
                          <option value="Academic">Academic</option>
                          <option value="General">General Notice</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Priority</label>
                        <select
                          value={noticeForm.priority}
                          onChange={(e) => setNoticeForm({ ...noticeForm, priority: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        >
                          <option value="Normal">Normal</option>
                          <option value="High">High</option>
                          <option value="Urgent">Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Circular Content / Instructions *</label>
                      <textarea
                        rows={4}
                        value={noticeForm.body}
                        onChange={(e) => setNoticeForm({ ...noticeForm, body: e.target.value })}
                        placeholder="Detailed instructions for parents and students..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="pinned"
                        checked={noticeForm.pinned}
                        onChange={(e) => setNoticeForm({ ...noticeForm, pinned: e.target.checked })}
                        className="w-4 h-4 text-sky-600 rounded"
                      />
                      <label htmlFor="pinned" className="font-semibold text-slate-700">
                        Pin to top of public homepage and notices feed
                      </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setShowNoticeModal(false)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
                      >
                        Publish Circular
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: THREE-TERM EVENTS & CALENDAR ================= */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Events & Three-Term Calendar Manager
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add examination cycles, parent-teacher meets, science exhibitions, and inter-house competitions.
                  </p>
                </div>

                <button
                  onClick={() => setShowEventModal(true)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-slate-800 cursor-pointer shadow-sm"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add School Event</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                          {evt.term}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-500">{evt.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 font-serif">{evt.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{evt.summary}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Venue: <strong>{evt.location}</strong></span>
                      <button
                        onClick={() => {
                          if (confirm("Remove this event?")) {
                            invokeCmsAction("delete_event", { id: evt.id });
                          }
                        }}
                        className="text-rose-600 hover:underline font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal: Add Event */}
            {showEventModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-serif font-bold text-base text-slate-900">Add School Calendar Event</h3>
                    <button onClick={() => setShowEventModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await invokeCmsAction("create_event", eventForm);
                      setShowEventModal(false);
                      setEventForm({
                        title: "",
                        date: "",
                        term: "First Term",
                        location: "Examination Hall, Parisar",
                        summary: "",
                      });
                      showToast("Event published to /calendar and /events");
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Event Title *</label>
                      <input
                        type="text"
                        value={eventForm.title}
                        onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                        placeholder="e.g. Second Term Science Lab Viva Assessments"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Date / Cycle *</label>
                        <input
                          type="text"
                          value={eventForm.date}
                          onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                          placeholder="e.g. 15th December 2026"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                          required
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Academic Term</label>
                        <select
                          value={eventForm.term}
                          onChange={(e) => setEventForm({ ...eventForm, term: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        >
                          <option value="First Term">First Term</option>
                          <option value="Second Term">Second Term</option>
                          <option value="Annual Term">Annual Term</option>
                          <option value="Co-Curricular">Co-Curricular & Sports</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Campus Venue / Location</label>
                      <input
                        type="text"
                        value={eventForm.location}
                        onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Brief Description *</label>
                      <textarea
                        rows={3}
                        value={eventForm.summary}
                        onChange={(e) => setEventForm({ ...eventForm, summary: e.target.value })}
                        placeholder="Event purpose, instructions for participants..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setShowEventModal(false)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
                      >
                        Add Event
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 6: GALLERY & MEDIA MANAGER ================= */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Gallery & Media Asset Manager
                  </h3>
                  <p className="text-xs text-slate-500">
                    Manage documentary photography for Campus, Science Labs, Library, and Sports visible on /gallery.
                  </p>
                </div>

                <button
                  onClick={() => setShowGalleryModal(true)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-slate-800 cursor-pointer shadow-sm"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Gallery Photo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {galleryItems.map((gal) => (
                  <div
                    key={gal.id}
                    className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] bg-slate-100">
                      <Image src={gal.imageUrl} alt={gal.title} fill className="object-cover" />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                        {gal.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-serif font-bold text-sm text-slate-900">{gal.title}</h4>
                      <p className="text-xs text-slate-600">{gal.caption}</p>
                    </div>

                    <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400">
                        {gal.featured ? "Featured on Home" : "Standard"}
                      </span>
                      <button
                        onClick={() => {
                          if (confirm("Delete this gallery photo?")) {
                            invokeCmsAction("delete_gallery", { id: gal.id });
                          }
                        }}
                        className="text-rose-600 hover:underline font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal: Add Gallery */}
            {showGalleryModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-serif font-bold text-base text-slate-900">Add Gallery Image</h3>
                    <button onClick={() => setShowGalleryModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await invokeCmsAction("create_gallery", galleryForm);
                      setShowGalleryModal(false);
                      showToast("Gallery asset added to /gallery");
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Photo Title *</label>
                      <input
                        type="text"
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        placeholder="e.g. Physics Laboratory Working Model Display"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Category</label>
                      <select
                        value={galleryForm.category}
                        onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        <option value="Campus & Parisar">Campus & Parisar</option>
                        <option value="Science Labs">Science Labs</option>
                        <option value="Central Library">Central Library</option>
                        <option value="Sports & Grounds">Sports & Grounds</option>
                        <option value="Cultural & Heritage">Cultural & Heritage</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Image Path / URL *</label>
                      <select
                        value={galleryForm.imageUrl}
                        onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono text-xs"
                      >
                        <option value="/images/official/society.jpg">/images/official/society.jpg (Campus Parisar)</option>
                        <option value="/images/official/affiliation.jpg">/images/official/affiliation.jpg (Science Labs)</option>
                        <option value="/images/official/curriculum.jpg">/images/official/curriculum.jpg (Library)</option>
                        <option value="/images/official/event-01.jpg">/images/official/event-01.jpg (Athletics / Sports)</option>
                        <option value="/images/official/admissions.jpg">/images/official/admissions.jpg (Welcome)</option>
                        <option value="/images/official/method.jpg">/images/official/method.jpg (Pedagogy)</option>
                        <option value="/images/official/cm.jpg">/images/official/cm.jpg (Chairman)</option>
                        <option value="/images/official/vm.jpg">/images/official/vm.jpg (Vision)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Caption *</label>
                      <input
                        type="text"
                        value={galleryForm.caption}
                        onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                        placeholder="Concise documentary caption..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={galleryForm.featured}
                        onChange={(e) => setGalleryForm({ ...galleryForm, featured: e.target.checked })}
                        className="w-4 h-4 text-sky-600 rounded"
                      />
                      <label htmlFor="featured" className="font-semibold text-slate-700">
                        Feature in homepage highlight strip
                      </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setShowGalleryModal(false)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
                      >
                        Add Photo
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 7: HOUSE POINTS & ACHIEVEMENTS MANAGER ================= */}
        {activeTab === "houses" && (
          <div className="space-y-6">
            {/* House Championship Points Standings Editor */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Four-House Championship Points Standings
                </h3>
                <p className="text-xs text-slate-500">
                  Update live points for Teresa, Amartya, Tagore, and Raman Houses contesting for the SAEC Rolling Trophy.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: "teresa", name: "Teresa House (Blue)", color: "border-sky-500", text: "text-sky-700" },
                  { key: "amartya", name: "Amartya House (Gold)", color: "border-amber-500", text: "text-amber-700" },
                  { key: "tagore", name: "Tagore House (Green)", color: "border-emerald-500", text: "text-emerald-700" },
                  { key: "raman", name: "Raman House (Red)", color: "border-rose-500", text: "text-rose-700" },
                ].map((h) => (
                  <div key={h.key} className={cn("p-4 rounded-2xl border-2 bg-slate-50/50 space-y-2", h.color)}>
                    <span className={cn("text-xs font-bold font-serif", h.text)}>{h.name}</span>
                    <input
                      type="number"
                      value={(housePoints as any)[h.key]}
                      onChange={(e) =>
                        setHousePoints({
                          ...housePoints,
                          [h.key]: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-mono font-bold text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={async () => {
                    await invokeCmsAction("update_house_points", housePoints);
                    showToast("House Championship standings updated on /houses and homepage");
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
                >
                  Save & Publish House Standings
                </button>
              </div>
            </div>

            {/* Institutional Achievements Publisher */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Institutional Milestones & Student Honours Publisher
                  </h3>
                  <p className="text-xs text-slate-500">
                    Publish verified institutional milestones and approved student awardees visible on /achievements.
                  </p>
                </div>

                <button
                  onClick={() => setShowAchievementModal(true)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-slate-800 cursor-pointer shadow-sm"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Publish New Honour</span>
                </button>
              </div>

              <div className="space-y-3">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 font-mono">
                          {ach.yearOrTerm}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">{ach.category}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                          {ach.verifiedStatus}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 font-serif">{ach.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{ach.description}</p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm("Delete this milestone entry?")) {
                          invokeCmsAction("delete_achievement", { id: ach.id });
                        }
                      }}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 self-end sm:self-center cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal: Publish Achievement */}
            {showAchievementModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-serif font-bold text-base text-slate-900">
                      Publish Institutional Milestone / Honour
                    </h3>
                    <button onClick={() => setShowAchievementModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await invokeCmsAction("create_achievement", achievementForm);
                      setShowAchievementModal(false);
                      showToast("Honour published to /achievements");
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Title / Award Name *</label>
                      <input
                        type="text"
                        value={achievementForm.title}
                        onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
                        placeholder="e.g. State Science Exhibition Working Model First Prize"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Category</label>
                        <select
                          value={achievementForm.category}
                          onChange={(e) => setAchievementForm({ ...achievementForm, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        >
                          <option value="Institutional Milestone">Institutional Milestone</option>
                          <option value="Academic Framework">Academic Framework</option>
                          <option value="Science & Innovation">Science & Innovation</option>
                          <option value="House Championship">House Championship</option>
                          <option value="Literary & Cultural">Literary & Cultural</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Year / Term *</label>
                        <input
                          type="text"
                          value={achievementForm.yearOrTerm}
                          onChange={(e) => setAchievementForm({ ...achievementForm, yearOrTerm: e.target.value })}
                          placeholder="e.g. Session 2026–27"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Description / Citation *</label>
                      <textarea
                        rows={3}
                        value={achievementForm.description}
                        onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })}
                        placeholder="Detailed citation and verified student/house details..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Verification Status Citation</label>
                      <input
                        type="text"
                        value={achievementForm.verifiedStatus}
                        onChange={(e) => setAchievementForm({ ...achievementForm, verifiedStatus: e.target.value })}
                        placeholder="Confirmed by SAEC Office"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setShowAchievementModal(false)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
                      >
                        Publish Honour
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// Small icon helper
function RotateCcwIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}
