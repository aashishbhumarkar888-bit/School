import { Metadata } from "next";
import { EVENTS_DATA, THREE_TERM_CALENDAR } from "@/lib/content/school-data";
import { Calendar, Clock, MapPin, CheckCircle2, CalendarDays } from "lucide-react";

export const metadata: Metadata = {
  title: "Academic Calendar & Events | Sri Aurobindo School, Bhopal",
  description:
    "Official three-term examination schedules and co-curricular sports events at Sri Aurobindo School, Bhopal.",
};

export default function EventsPage() {
  return (
    <div className="bg-[#FCFBF9] text-slate-900 min-h-screen">
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-amber-50/60 via-white to-[#FCFBF9] border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-xs inline-flex items-center gap-1.5 mb-4">
              <CalendarDays className="w-3.5 h-3.5 text-amber-600" />
              <span>Institutional Chronology · Session 2026–27</span>
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 mt-2 tracking-tight leading-tight">
              Academic Calendar & Milestones
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
              Planned schedule for the First Term (September), Second Term (December), and Annual
              Promotional MPBSE Examinations (March–April), alongside sports championships.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Chronological Calendar */}
      <section className="py-16 bg-[#FCFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS_DATA.map((evt) => (
              <div
                key={evt.id}
                className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                      {evt.term}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{evt.date}</span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">{evt.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">{evt.description}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{evt.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
