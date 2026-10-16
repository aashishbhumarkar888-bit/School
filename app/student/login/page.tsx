"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  ArrowRight,
  Lock,
  User,
  ShieldCheck,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building2,
  Users,
} from "lucide-react";

export default function StudentLoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"signin" | "activate">("signin");

  // Sign In Form State
  const [identifier, setIdentifier] = useState("");
  const [secret, setSecret] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);

  // Activation Form State
  const [regName, setRegName] = useState("");
  const [regScholarId, setRegScholarId] = useState("");
  const [regClass, setRegClass] = useState("Class X-A");
  const [regHouse, setRegHouse] = useState<"teresa" | "amartya" | "tagore" | "raman">("teresa");
  const [regDob, setRegDob] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignInLoading(true);
    setSignInError("");

    try {
      const res = await fetch("/api/auth/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, secret }),
      });

      const data = await res.json();

      if (!res.ok || !data.authenticated) {
        setSignInError(data.error || "Authentication failed. Please verify credentials.");
        setSignInLoading(false);
        return;
      }

      // Store active session student details locally for quick UI hydration
      if (typeof window !== "undefined" && data.student) {
        localStorage.setItem("sas_active_student_id", data.student.scholarId);
        localStorage.setItem("sas_student_profile", JSON.stringify(data.student));
      }

      router.push("/student/dashboard");
    } catch {
      setSignInError("Network error. Please check connection and try again.");
      setSignInLoading(false);
    }
  };

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegLoading(true);
    setRegError("");

    try {
      const res = await fetch("/api/auth/student/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName,
          scholarId: regScholarId,
          classSection: regClass,
          house: regHouse,
          dob: regDob,
          password: regPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.authenticated) {
        setRegError(data.error || "Activation failed. Please check inputs.");
        setRegLoading(false);
        return;
      }

      if (typeof window !== "undefined" && data.student) {
        localStorage.setItem("sas_active_student_id", data.student.scholarId);
        localStorage.setItem("sas_student_profile", JSON.stringify(data.student));
      }

      router.push("/student/dashboard");
    } catch {
      setRegError("Network error during registration. Please try again.");
      setRegLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-white text-slate-900 py-12 sm:py-16 px-4 relative flex items-center justify-center">
      {/* Subtle architectural dot grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-50" />

      <div className="w-full max-w-xl relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-2 shadow-xs">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Sri Aurobindo School · Student & Parent Digital Campus</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Institutional Scholar Gateway
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Secure portal for Three-Term report cards, daily timetable, central library records,
            fee clearance, and the 3D Digital Student ID Card.
          </p>
        </div>

        {/* Dual Mode Card */}
        <div className="rounded-3xl bg-white border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50/60 p-1.5 gap-1.5">
            <button
              onClick={() => setActiveTab("signin")}
              className={`py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "signin"
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <User className="w-3.5 h-3.5 text-blue-700" />
              <span>Sign In to Campus</span>
            </button>

            <button
              onClick={() => setActiveTab("activate")}
              className={`py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "activate"
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Activate Scholar ID</span>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {/* TAB A: Real Sign In */}
            {activeTab === "signin" && (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Scholar ID or Roll Number
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. SAS-2026-1042 or 1042"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Demo records: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">SAS-2026-1042</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">SAS-2026-0819</code>, or newly registered Scholar ID.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Password or Date of Birth (YYYY-MM-DD)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={secret}
                      onChange={(e) => setSecret(e.target.value)}
                      placeholder="Password or YYYY-MM-DD (e.g. 2010-04-15)"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
                    <span>Default student key: Date of Birth in YYYY-MM-DD format</span>
                    <a href="tel:07552558286" className="text-blue-700 font-semibold hover:underline">
                      Need Help?
                    </a>
                  </div>
                </div>

                {signInError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{signInError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={signInLoading}
                  className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-blue-700/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>{signInLoading ? "Verifying Credentials..." : "Sign In to Digital Campus"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* TAB B: New Scholar Portal Activation */}
            {activeTab === "activate" && (
              <form onSubmit={handleActivate} className="space-y-4">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                  <strong>First-Time Scholar Activation:</strong> Enter your student details and create a secure password to generate your real digital campus record.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Siddharth Verma"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Scholar ID / Roll No *
                    </label>
                    <input
                      type="text"
                      required
                      value={regScholarId}
                      onChange={(e) => setRegScholarId(e.target.value)}
                      placeholder="e.g. SAS-2026-1188"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Class & Section *
                    </label>
                    <select
                      value={regClass}
                      onChange={(e) => setRegClass(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50/50"
                    >
                      <option value="Nursery">Nursery</option>
                      <option value="KG-1">KG-1</option>
                      <option value="KG-2">KG-2</option>
                      <option value="Class I-A">Class I-A</option>
                      <option value="Class V-B">Class V-B</option>
                      <option value="Class VI-A">Class VI-A</option>
                      <option value="Class VIII-B">Class VIII-B</option>
                      <option value="Class X-A">Class X-A</option>
                      <option value="Class XII (Science)">Class XII (Science)</option>
                      <option value="Class XII (Commerce)">Class XII (Commerce)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Institutional House *
                    </label>
                    <select
                      value={regHouse}
                      onChange={(e) => setRegHouse(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50/50"
                    >
                      <option value="teresa">Teresa House (Blue)</option>
                      <option value="amartya">Amartya House (Gold)</option>
                      <option value="tagore">Tagore House (Green)</option>
                      <option value="raman">Raman House (Red)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Date of Birth (YYYY-MM-DD) *
                    </label>
                    <input
                      type="date"
                      required
                      value={regDob}
                      onChange={(e) => setRegDob(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Create Portal Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50/50"
                    />
                  </div>
                </div>

                {regError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{regError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={regLoading}
                  className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-blue-700/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>{regLoading ? "Activating Record..." : "Activate & Launch Dashboard"}</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Institutional Security Footnote */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Encrypted MPBSE Session</span>
              </div>
              <a href="tel:07552558286" className="text-slate-600 hover:text-slate-900 font-medium">
                Campus: 0755-2558286
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
