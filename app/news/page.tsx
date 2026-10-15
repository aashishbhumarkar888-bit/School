import { Metadata } from "next";
import Link from "next/link";
import { NEWS_DATA, HOUSES } from "@/lib/content/school-data";
import { Calendar, ArrowRight, Tag, BookOpen, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "School News & Journal | Sri Aurobindo School, Bhopal",
  description:
    "Read the latest articles, academic achievements, and co-curricular milestones from Sri Aurobindo School, Bhopal.",
};

export default function NewsIndexPage() {
  return (
    <div className="bg-[#FCFBF9] text-slate-900 min-h-screen">
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-emerald-50/60 via-white to-[#FCFBF9] border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs inline-flex items-center gap-1.5 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Campus Highlights & Journal</span>
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 mt-2 tracking-tight leading-tight">
              School News & Perspectives
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
              Reflections on integral education, scientific symposia, literary colloquia, and student
              achievements from the campus of Sri Aurobindo School, Bhopal.
            </p>
          </div>
        </div>
      </section>

      {/* 2. News Article Grid */}
      <section className="py-16 bg-[#FCFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS_DATA.map((article) => {
              const house = article.houseTag ? HOUSES[article.houseTag] : null;
              return (
                <div
                  key={article.slug}
                  className="rounded-3xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                        {article.category}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">{article.date}</span>
                    </div>

                    <h3 className="text-xl font-bold font-serif text-slate-900 mb-3 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">{article.excerpt}</p>
                  </div>

                  <div className="p-8 pt-0 border-t border-slate-100 flex items-center justify-between text-xs">
                    {house && (
                      <span className="text-slate-600 font-medium flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: house.accentHex }}
                        />
                        {house.name}
                      </span>
                    )}

                    <Link
                      href={`/news/${article.slug}`}
                      className="text-sky-700 font-bold hover:underline inline-flex items-center gap-1 ml-auto"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
