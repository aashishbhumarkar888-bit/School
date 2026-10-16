"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime route error caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] bg-white flex items-center justify-center p-6 text-slate-900">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl border border-slate-200 bg-slate-50/50 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            Page Experience Interrupted
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            A temporary component error occurred while rendering this campus view.
            Our auto-recovery system can re-initialize the page immediately.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Page</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
