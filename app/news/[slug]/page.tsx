import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NEWS_DATA, HOUSES, SCHOOL_FACTS } from "@/lib/content/school-data";
import { Calendar, ArrowLeft, Tag, Share2 } from "lucide-react";

interface NewsProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return NEWS_DATA.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: NewsProps): Metadata {
  const article = NEWS_DATA.find((n) => n.slug === params.slug);
  if (!article) return { title: "Story Not Found" };

  return {
    title: `${article.title} | SAS News`,
    description: article.excerpt,
  };
}

export default function NewsDetailPage({ params }: NewsProps) {
  const article = NEWS_DATA.find((n) => n.slug === params.slug);

  if (!article) {
    notFound();
  }

  const house = article.houseTag ? HOUSES[article.houseTag] : null;

  return (
    <div className="bg-[#FCFBF9] text-slate-900 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to News Journal</span>
        </Link>

        <article className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 text-sky-800 border border-sky-200">
              {article.category}
            </span>
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            {house && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-50 text-slate-700 border border-slate-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: house.accentHex }} />
                <span>{house.name}</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal italic mb-8 border-l-3 border-amber-500 pl-6 bg-amber-50/50 p-4 rounded-r-2xl border border-slate-200/60">
            "{article.excerpt}"
          </p>

          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-5 border-t border-slate-100 pt-8 mb-10">
            <p>{article.body}</p>
          </div>

          <div className="pt-8 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Published by Editorial Board, Sri Aurobindo School</span>
            <span className="font-mono">Tulsi Nagar, Bhopal</span>
          </div>
        </article>
      </div>
    </div>
  );
}
