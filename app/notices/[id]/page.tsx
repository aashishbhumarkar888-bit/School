import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NOTICES_DATA, SCHOOL_FACTS } from "@/lib/content/school-data";
import {
  Calendar,
  FileText,
  Download,
  ArrowLeft,
  Share2,
  Printer,
  ShieldAlert,
} from "lucide-react";

interface NoticeProps {
  params: { id: string };
}

export function generateStaticParams() {
  return NOTICES_DATA.map((n) => ({ id: n.id }));
}

export function generateMetadata({ params }: NoticeProps): Metadata {
  const notice = NOTICES_DATA.find((n) => n.id === params.id);
  if (!notice) return { title: "Notice Not Found" };

  return {
    title: `${notice.title} | Notice Board`,
    description: notice.summary,
  };
}

export default function NoticeDetailPage({ params }: NoticeProps) {
  const notice = NOTICES_DATA.find((n) => n.id === params.id);

  if (!notice) {
    notFound();
  }

  return (
    <div className="bg-[#FCFBF9] text-slate-900 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/notices"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Notice Board</span>
        </Link>

        {/* Notice Reader Document Sheet */}
        <article className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.06)] relative overflow-hidden">
          {/* Header Strip */}
          <div className="border-b border-slate-100 pb-6 mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
                {SCHOOL_FACTS.fullName} · School Office
              </span>
              <p className="text-xs text-sky-700 font-mono mt-0.5 font-semibold">
                Circular Ref: {notice.id}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 text-sky-800 border border-sky-200">
                {notice.category}
              </span>
              <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {notice.date}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6 leading-tight">
            {notice.title}
          </h1>

          {/* Summary Callout */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-900 italic mb-8">
            "{notice.summary}"
          </div>

          {/* Full Content */}
          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 mb-10">
            <p>{notice.content}</p>
          </div>

          {/* Optional Attachment Card */}
          {notice.attachmentName && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700 border border-sky-200">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{notice.attachmentName}</h4>
                  <p className="text-[11px] text-slate-500">Official PDF Document · Verified SAEC Seal</p>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>Download Attachment</span>
              </button>
            </div>
          )}

          {/* Official Signoff Footer */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              <p className="font-bold text-slate-800">Office of Administration</p>
              <p>Sri Aurobindo School, Auro Mandir Parisar, Tulsi Nagar, Bhopal</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                MPBSE Affiliated
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                SAEC Est. 1989
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
