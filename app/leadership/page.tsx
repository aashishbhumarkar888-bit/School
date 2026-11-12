import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SCHOOL_FACTS } from "@/lib/content/school-data";
import { EditorialImageFrame } from "@/components/ui/EditorialImageFrame";
import {
  Award,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Building2,
  Quote,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Leadership & Chairman's Desk | Sri Aurobindo School, Bhopal",
  description:
    "Official message from Chairman Shri Umesh Trivedi and the academic leadership charter of Sri Aurobindo Education Centre (SAEC), Bhopal.",
};

export default function LeadershipPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      {/* Background Architectural Dot Grid */}
      <div className="pointer-events-none absolute inset-0 bg-dots-pattern opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Executive Governance · Sri Aurobindo Education Centre</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Awakening Wisdom, Humility & Moral Courage
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                Under the visionary stewardship of the Sri Aurobindo Education Centre (SAEC), founded in
                July 1989, our leadership team ensures that traditional pedagogical rigour harmonizes
                flawlessly with modern technological tools and spiritual equanimity.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Chairman Shri Umesh Trivedi</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Quad-Partnership Synergy Charter</span>
                </span>
              </div>
            </div>

            {/* Right 5 Columns: Editorial Frame of Chairman Portrait */}
            <div className="lg:col-span-5">
              <EditorialImageFrame
                src="/images/official/cm.jpg"
                alt="Chairman Shri Umesh Trivedi"
                caption="Chairman Shri Umesh Trivedi Addressing Assembly"
                badgeTopLeft={{
                  title: "Shri Umesh Trivedi",
                  subtitle: "Chairman, SAEC & SAS Bhopal",
                  iconName: "award",
                }}
                badgeBottomRight={{
                  title: "Leadership Charter",
                  subtitle: "Integral Education Visionary",
                  iconName: "sparkles",
                }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Institutional Key-Facts Ribbon */}
      <section className="bg-slate-50/80 border-b border-slate-200/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Executive Body
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                SAEC Board of Trustees
              </strong>
              <p className="text-xs text-slate-500">Regd. Society July 1989</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Academic Direction
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                MPBSE Curriculum Matrix
              </strong>
              <p className="text-xs text-slate-500">K–12 Public School</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Academic Evaluation
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                3 Exam Terms
              </strong>
              <p className="text-xs text-slate-500">Sept · Dec · Mar–Apr</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Campus Location
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                Auro Mandir Parisar
              </strong>
              <p className="text-xs text-slate-500">Tulsi Nagar, Bhopal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chairman's Address In Full */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50/70 border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200/80">
              <Quote className="w-8 h-8 text-amber-600 shrink-0" />
              <div>
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                  Message from the Chairman&apos;s Desk
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Shri Umesh Trivedi · Sri Aurobindo Education Centre
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p>
                &quot;Education is not the mere mechanical accumulation of information; it is the living
                awakening of wisdom, humility, moral fortitude, and self-confidence in each child. At Sri
                Aurobindo School, Bhopal, our sacred purpose is to nurture what Sri Aurobindo termed the
                <em> &apos;sun-eyed children of a marvellous dawn&apos;</em>.&quot;
              </p>
              <p>
                &quot;We equip our classrooms with state-of-the-art technological aids, modern computer
                terminals, and dedicated science laboratories, while grounding every lesson in universal
                human values. True education addresses the body, the emotions, the mind, and the spirit in
                one harmonious continuum.&quot;
              </p>
              <p>
                &quot;Our classrooms are seldom quiet because they are vibrant with purposeful inquiry.
                Happy children learn far better than unhappy ones, and it is our perpetual commitment that
                every child at Auro Mandir Parisar feels treasured, encouraged, and challenged to achieve
                their highest potential.&quot;
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-slate-800">Shri Umesh Trivedi</span>
              <span>Chairman, Sri Aurobindo Education Centre & School</span>
            </div>
          </div>

          {/* Governing Body & Quad Partnership */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                SAEC Governing Body Structure
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Founded in July 1989 with a formal written constitution, the Sri Aurobindo Education
                Centre comprises seasoned educationists, civic leaders, and devotees who guide the school
                in accordance with statutory MPBSE mandates and non-profit societal governance.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                Parent-Teacher-Management Synergy
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Known as <em>The Flight Path</em>, our quad-partnership guarantees quarterly signed PTM
                evaluations, transparent fee schedules, personalized student remedial plans, and open
                communication between guardians and school leadership.
              </p>
            </div>
          </div>

          <div className="text-center pt-6">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-blue-600/20"
            >
              <span>Explore Admissions for June Session</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
