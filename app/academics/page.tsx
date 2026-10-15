import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ACADEMIC_WINGS,
  PEDAGOGICAL_PILLARS,
  THREE_TERM_CALENDAR,
  CAMPUS_FACILITIES,
} from "@/lib/content/school-data";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileCheck,
  AlertCircle,
  Clock,
  ArrowRight,
  FlaskConical,
  Sparkles,
  Award,
} from "lucide-react";
import { AnimatedTimeline } from "@/components/ui/AnimatedTimeline";

export const metadata: Metadata = {
  title: "Academics & Pedagogy | MPBSE Board Curriculum",
  description:
    "Discover the academic curriculum from Nursery to Class XII at Sri Aurobindo School, Bhopal. MPBSE affiliated, three-term examination structure, and laboratory viva.",
};

export default function AcademicsPage() {
  return (
    <div className="bg-[#FCFBF9] text-slate-900 min-h-screen">
      {/* ================= 1. HEADER BANNER WITH OFFICIAL AFFILIATION PHOTO ================= */}
      <section className="relative py-20 bg-gradient-to-b from-sky-50/70 via-white to-[#FCFBF9] border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-xs inline-flex items-center gap-1.5 mb-4">
                <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                <span>Curriculum & Examination Framework · MPBSE K–12</span>
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Academic Excellence Rooted in Wonder
              </h1>
              <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
                From foundational sensory learning in the Pre-Primary wing to rigorous Madhya Pradesh
                Board of Secondary Education (MPBSE) preparation in Senior Secondary, we cultivate
                inquiry, scientific precision, and expressive confidence.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl p-3 bg-white/90 backdrop-blur-xl border border-slate-200 shadow-lg">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src="/images/official/affiliation.jpg"
                    alt="MPBSE Affiliated Academic Block - Sri Aurobindo School, Bhopal"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover"
                  />
                </div>
                <div className="p-3 text-center">
                  <p className="font-serif font-bold text-xs text-slate-800">
                    MPBSE Recognized Academic Block
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Nursery through Class XII · Affiliated to MP State Board
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. FOUR ACADEMIC WINGS ================= */}
      <section className="py-20 bg-white relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
              K–12 Learning Structure
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
              The Four Academic Wings
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Structured developmental tiers aligned with age-appropriate milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ACADEMIC_WINGS.map((wing) => (
              <div
                key={wing.id}
                className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      {wing.gradeRange}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      Age: {wing.ageBracket}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-serif text-slate-900 mb-3">{wing.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">{wing.description}</p>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Core Curricular Focus:
                      </p>
                      <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
                        {wing.focus}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Key Subjects & Domains:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {wing.keySubjects.map((subj) => (
                          <span
                            key={subj}
                            className="text-xs px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 font-medium"
                          >
                            {subj}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span>MPBSE Standards Compliant</span>
                  <Link
                    href={`/admissions?grade=${encodeURIComponent(wing.gradeRange.split(" ")[0])}#enquiry-form`}
                    className="text-sky-700 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    Check Eligibility <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 2.5. SCROLL-LINKED PEDAGOGICAL ODYSSEY WITH METHOD PHOTO ================= */}
      <section className="py-24 bg-gradient-to-b from-white via-slate-50/70 to-white relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
            <div className="lg:col-span-8">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
                The Pedagogical Beam · Flight Path → Different Strokes → Joy of Flying
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
                Scroll-Linked Pedagogical Odyssey
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Follow the developmental trajectory of Sri Aurobindo School students, from playful early childhood wonder to confident MPBSE board candidates.
              </p>
            </div>
            <div className="lg:col-span-4">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <Image
                  src="/images/official/method.jpg"
                  alt="Teaching Methodology and Student Joy of Learning"
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <AnimatedTimeline />
        </div>
      </section>

      {/* ================= 3. THREE-TERM EXAMINATION SYSTEM WITH CURRICULUM PHOTO ================= */}
      <section className="py-20 bg-white relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-8">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                Rigorous Evaluation Standards
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
                The Three-Term Examination System
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Continuous academic feedback through three planned cycles every academic year.
              </p>
            </div>
            <div className="lg:col-span-4">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <Image
                  src="/images/official/curriculum.jpg"
                  alt="Curriculum & Board Examination Preparation"
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {THREE_TERM_CALENDAR.map((term, i) => (
              <div
                key={term.term}
                className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between hover:bg-white hover:shadow-sm transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-amber-700 uppercase">
                      Cycle 0{i + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-white text-slate-800 border border-slate-200">
                      {term.period}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">{term.term}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{term.description}</p>

                  <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-200 pt-4">
                    {term.milestones.map((m, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Promotion & Examination Rules Card */}
          <div className="rounded-3xl bg-slate-50/80 border border-slate-200/90 p-6 sm:p-8">
            <h4 className="text-lg font-bold font-serif text-slate-900 mb-4 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-600" />
              <span>Statutory Examination & Promotion Guidelines</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-600">
              <div className="space-y-1">
                <span className="font-bold text-slate-900 block">Pass Percentage:</span>
                <p>
                  Minimum 33% to 40% aggregate marks required across each registered subject as per
                  state board mandates.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-900 block">Parent Signature:</span>
                <p>
                  Report cards are presented at formal Parent-Teacher Meetings and must be signed by
                  the parent or registered guardian.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-900 block">Supplementary Exam:</span>
                <p>
                  Students failing in 1 or 2 subjects are eligible for remedial supplementary
                  re-assessment before promotion.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-900 block">Fee Clearance:</span>
                <p>
                  All term tuition dues must be cleared prior to hall ticket release and examination
                  hall entry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. SCIENCE LABS & VIVA TRAINING ================= */}
      <section className="py-20 bg-slate-50/60 relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                Practical Laboratory Mastery
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                Physics, Chemistry & Biology Laboratories
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Science cannot be mastered through textbooks alone. At Sri Aurobindo School, our
                laboratories are vibrant research workshops where students build demonstrable
                working models, perform rigorous titrations, and receive intensive viva-voce
                preparation for MPBSE board examinations.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2.5">
                  <FlaskConical className="w-4 h-4 text-sky-600" />
                  <span>Demonstrable working models exhibited at the annual science symposium</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Standardized optical apparatus, spectrometers, and chemical benches</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Individual viva-voce coaching by senior secondary subject faculty</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-sky-800"
                >
                  <span>View Lab Photographs in Gallery</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
              <h3 className="text-xl font-bold font-serif text-slate-900">
                Central Library & Scheduled Reading Hours
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our library is a peaceful sanctuary containing encyclopedias, literature classics,
                general knowledge compendiums, and computer research texts. Daily reading periods
                are scheduled for every single class, establishing lifelong habits of quiet inquiry.
              </p>
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                <span className="font-bold block mb-1">
                  Daily Class Schedule:
                </span>
                Every class has a designated daily library hour to borrow books, review national
                periodicals, and engage in supervised research.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
