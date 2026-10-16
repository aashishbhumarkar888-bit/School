import Link from "next/link";
import { Compass, GraduationCap, Phone, Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-white flex items-center justify-center p-6 text-slate-900">
      <div className="max-w-lg w-full text-center space-y-8 p-8 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Error 404 · Page Not Found
          </span>
          <h1 className="text-4xl font-serif font-bold text-slate-900 mt-2">
            Campus Route Undefined
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
            The page or document you are seeking has been moved or does not exist
            within Sri Aurobindo School, Bhopal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <Link
            href="/"
            className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Home className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Home</p>
              <p className="text-[10px] text-slate-500 truncate">Flagship campus portal</p>
            </div>
          </Link>

          <Link
            href="/admissions"
            className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Admissions</p>
              <p className="text-[10px] text-slate-500 truncate">Eligibility & Registration</p>
            </div>
          </Link>

          <Link
            href="/academics"
            className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Academics</p>
              <p className="text-[10px] text-slate-500 truncate">K–12 wings & exams</p>
            </div>
          </Link>

          <Link
            href="/contact"
            className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Contact</p>
              <p className="text-[10px] text-slate-500 truncate">Tulsi Nagar, Bhopal</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
