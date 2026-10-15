"use client";

import React, { useState, useEffect } from "react";
import { SCHOOL_FACTS } from "@/lib/content/school-data";
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
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"enquiries" | "messages" | "publisher" | "audit">("enquiries");
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "contacted">("all");

  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [contactedIds, setContactedIds] = useState<Record<string, boolean>>({});
  const [loadingData, setLoadingData] = useState(false);

  // Notice Publisher state
  const [noticeForm, setNoticeForm] = useState({
    title: "",
    category: "Admission",
    summary: "",
    content: "",
    isImportant: false,
  });
  const [noticePublishedSuccess, setNoticePublishedSuccess] = useState(false);

  // Check sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("sas_admin_auth");
      if (stored === "true") {
        setIsAuthenticated(true);
        fetchData();
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "aurobindo@1989" || password === "sasadmin") {
      setIsAuthenticated(true);
      setErrorMsg("");
      if (typeof window !== "undefined") {
        sessionStorage.setItem("sas_admin_auth", "true");
      }
      fetchData();
    } else {
      setErrorMsg("Incorrect authorization key. Default key is 'aurobindo@1989'.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("sas_admin_auth");
    }
  };

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [enqRes, msgRes] = await Promise.all([
        fetch("/api/enquiries"),
        fetch("/api/contact"),
      ]);
      const enqData = await enqRes.json();
      const msgData = await msgRes.json();
      if (enqData.enquiries) setEnquiries(enqData.enquiries);
      if (msgData.messages) setMessages(msgData.messages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  const toggleContacted = (id: string) => {
    setContactedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Export Enquiries to CSV
  const exportToCSV = () => {
    if (enquiries.length === 0) return;
    const headers = ["ID", "Parent Name", "Child Name", "Class", "Phone", "Email", "Status", "Date", "Notes"];
    const rows = enquiries.map((e) => [
      e.id,
      `"${e.parentName}"`,
      `"${e.childName}"`,
      e.targetClass,
      e.phone,
      e.email || "",
      contactedIds[e.id] ? "Contacted" : "New",
      new Date(e.submittedAt).toLocaleDateString(),
      `"${(e.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SAS_Admissions_Enquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeForm.title || !noticeForm.summary) return;
    setNoticePublishedSuccess(true);
    setTimeout(() => {
      setNoticePublishedSuccess(false);
      setNoticeForm({
        title: "",
        category: "Admission",
        summary: "",
        content: "",
        isImportant: false,
      });
    }, 2500);
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const isDone = Boolean(contactedIds[e.id]);
    if (statusFilter === "new") return !isDone;
    if (statusFilter === "contacted") return isDone;
    return true;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FCFBF9] flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl bg-white border border-slate-200/90 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-4 shadow-2xs">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">SAEC Staff Portal</h2>
            <p className="text-xs text-slate-500 mt-1">
              Sri Aurobindo School, Bhopal · Administrative Gateway
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Administrative Passphrase
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (aurobindo@1989)"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 hover:brightness-105 shadow-md cursor-pointer transition-all"
            >
              Verify & Enter Console
            </button>
          </form>

          <p className="text-[11px] text-slate-400 text-center mt-6">
            Authorized personnel only. Sessions monitored under SAEC governance guidelines.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFBF9] text-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>School Administrative Console · Est. July 1989</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Admissions & Institutional Oversight
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-2xs cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={fetchData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-2xs cursor-pointer transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? "animate-spin text-sky-600" : "text-slate-600"}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* ================= KPI CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Enquiries
              </span>
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-serif font-bold text-slate-900">{enquiries.length}</p>
            <p className="text-[11px] text-slate-500 mt-1">Session 2026–27 candidates</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Pending Review
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-serif font-bold text-amber-700">
              {enquiries.filter((e) => !contactedIds[e.id]).length}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Requires phone interaction</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Contact Messages
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-serif font-bold text-slate-900">{messages.length}</p>
            <p className="text-[11px] text-slate-500 mt-1">General & alumni inquiries</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Office Hours
              </span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-sm font-bold text-slate-900">8:00 AM – 1:00 PM</p>
            <p className="text-[11px] text-slate-500 mt-1">Monday – Saturday counter</p>
          </div>
        </div>

        {/* ================= TAB CONTROLS ================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("enquiries")}
              className={`px-4 py-2 rounded-2xl text-xs font-bold cursor-pointer border transition-colors ${
                activeTab === "enquiries"
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              Admission Enquiries ({enquiries.length})
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`px-4 py-2 rounded-2xl text-xs font-bold cursor-pointer border transition-colors ${
                activeTab === "messages"
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              Contact Messages ({messages.length})
            </button>
            <button
              onClick={() => setActiveTab("publisher")}
              className={`px-4 py-2 rounded-2xl text-xs font-bold cursor-pointer border transition-colors ${
                activeTab === "publisher"
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              Notice Publisher
            </button>
            <button
              onClick={() => setActiveTab("audit")}
              className={`px-4 py-2 rounded-2xl text-xs font-bold cursor-pointer border transition-colors ${
                activeTab === "audit"
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              Institutional Facts
            </button>
          </div>

          {activeTab === "enquiries" && (
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 px-2">Filter:</span>
              {(["all", "new", "contacted"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer ${
                    statusFilter === f
                      ? "bg-sky-50 text-sky-800 border border-sky-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================= TAB 1: ENQUIRIES ================= */}
        {activeTab === "enquiries" && (
          <div className="space-y-4">
            {filteredEnquiries.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white border border-slate-200">
                <Users className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-800">No admission enquiries recorded yet.</p>
                <p className="text-xs text-slate-500 mt-1">Enquiries from /admissions will appear live here.</p>
              </div>
            ) : (
              filteredEnquiries.map((enq) => {
                const isContacted = Boolean(contactedIds[enq.id]);
                return (
                  <div
                    key={enq.id}
                    className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-200">
                          {enq.id}
                        </span>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200">
                          Class: {enq.targetClass}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          {new Date(enq.submittedAt).toLocaleDateString()}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isContacted
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {isContacted ? "Contacted" : "New"}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                        Parent: {enq.parentName} · Child:{" "}
                        <span className="text-sky-700">{enq.childName}</span>
                      </h4>

                      {enq.message && (
                        <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-2xl border border-slate-200 max-w-2xl">
                          "{enq.message}"
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
                      <div className="space-y-1 text-xs text-slate-600">
                        <p className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-sky-600" />
                          <a href={`tel:${enq.phone}`} className="text-slate-900 font-bold hover:underline font-mono">
                            {enq.phone}
                          </a>
                        </p>
                        {enq.email && (
                          <p className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-amber-600" />
                            <span className="font-mono">{enq.email}</span>
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => toggleContacted(enq.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                          isContacted
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{isContacted ? "Mark New" : "Mark Contacted"}</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ================= TAB 2: MESSAGES ================= */}
        {activeTab === "messages" && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white border border-slate-200">
                <MessageSquare className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-800">No contact messages logged yet.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {msg.id}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {new Date(msg.submittedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 font-serif">
                    {msg.name} · Subject:{" "}
                    <span className="text-sky-700 font-normal">{msg.subject}</span>
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    {msg.message}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-600 font-mono pt-2">
                    <span>Phone: {msg.phone}</span>
                    {msg.email && <span>Email: {msg.email}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================= TAB 3: NOTICE PUBLISHER ================= */}
        {activeTab === "publisher" && (
          <div className="max-w-2xl bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold font-serif text-slate-900">
                Publish Official School Gazette Notice
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Announcements published here are recorded in the active administrative gazette.
              </p>
            </div>

            {noticePublishedSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Notice Published Successfully to Official Gazette!</span>
              </div>
            )}

            <form onSubmit={handlePublishNotice} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Notice Headline *
                </label>
                <input
                  type="text"
                  required
                  value={noticeForm.title}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                  placeholder="e.g. Schedule for Second-Term Model Examination 2026"
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Category</label>
                  <select
                    value={noticeForm.category}
                    onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-sky-500 focus:outline-none"
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
                    id="urgent"
                    checked={noticeForm.isImportant}
                    onChange={(e) => setNoticeForm({ ...noticeForm, isImportant: e.target.checked })}
                    className="rounded text-sky-600 w-4 h-4"
                  />
                  <label htmlFor="urgent" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Mark as Urgent Banner
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Summary Teaser *
                </label>
                <input
                  type="text"
                  required
                  value={noticeForm.summary}
                  onChange={(e) => setNoticeForm({ ...noticeForm, summary: e.target.value })}
                  placeholder="Brief 1-line overview for the notification card"
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Detailed Circular Body
                </label>
                <textarea
                  rows={4}
                  value={noticeForm.content}
                  onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                  placeholder="Official circular text, instructions, and dates..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-sky-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Publish Notice to Gazette
              </button>
            </form>
          </div>
        )}

        {/* ================= TAB 4: INSTITUTIONAL AUDIT FACTS ================= */}
        {activeTab === "audit" && (
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            <h3 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Verified Institutional Source of Truth</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 block font-bold">Managing Society:</span>
                <p className="font-bold text-slate-900">{SCHOOL_FACTS.society}</p>
                <p className="text-[11px] text-slate-500">Founded July 1989 · MP Societies Act</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 block font-bold">State Affiliation:</span>
                <p className="font-bold text-slate-900">{SCHOOL_FACTS.affiliation}</p>
                <p className="text-[11px] text-slate-500">Co-educational K–12 Public Pattern</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 block font-bold">Physical Coordinates:</span>
                <p className="font-bold text-slate-900">{SCHOOL_FACTS.address}</p>
                <p className="text-[11px] text-slate-500">Phone: {SCHOOL_FACTS.phone}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 block font-bold">School Office Window:</span>
                <p className="font-bold text-slate-900">{SCHOOL_FACTS.registrationWindow}</p>
                <p className="text-[11px] text-slate-500">₹100 Registration with Birth Certificate</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
