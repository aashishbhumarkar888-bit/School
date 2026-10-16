import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SCHOOL_FACTS } from "@/lib/content/school-data";
import { EditorialImageFrame } from "@/components/ui/EditorialImageFrame";
import {
  ShieldCheck,
  Award,
  BookOpen,
  CheckCircle2,
  Building2,
  FileText,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Scale,
} from "lucide-react";

export const metadata: Metadata = {
  title: "MPBSE Affiliation & Mandatory Public Disclosure | Sri Aurobindo School, Bhopal",
  description:
    "Official credentials of Sri Aurobindo School, Bhopal affiliated with the Madhya Pradesh Board of Secondary Education (MPBSE), safety compliance, and societal registry.",
};

export default function AffiliationPage() {
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Statutory State Board Affiliation & Compliance</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                MPBSE Affiliation & Public Disclosure
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                Sri Aurobindo School, Bhopal is a certified co-educational K–12 institution fully
                affiliated with the <strong>Madhya Pradesh Board of Secondary Education (MPBSE)</strong>.
                Governed by the registered society Sri Aurobindo Education Centre (SAEC), the school operates
                under strict compliance with state educational bylaws and safety guidelines.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>MPBSE State Code Recognized</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Registered MP Society (July 1989)</span>
                </span>
              </div>
            </div>

            {/* Right 5 Columns: Editorial Frame */}
            <div className="lg:col-span-5">
              <EditorialImageFrame
                src="/images/official/affiliation.jpg"
                alt="MPBSE Senior Science Laboratory Inspection"
                caption="Certified Physics & Chemistry Working Apparatus"
                badgeTopLeft={{
                  title: "MPBSE Affiliated",
                  subtitle: "Co-Ed Public School K–12",
                  iconName: "shieldCheck",
                }}
                badgeBottomRight={{
                  title: "Statutory Standards",
                  subtitle: "Certified Laboratories",
                  iconName: "award",
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
                Affiliation Body
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                MPBSE Bhopal
              </strong>
              <p className="text-xs text-slate-500">Board of Secondary Ed.</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                School Character
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                Co-educational K–12
              </strong>
              <p className="text-xs text-slate-500">Nursery to Class XII</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Society Registration
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                July 1989 Charter
              </strong>
              <p className="text-xs text-slate-500">Registrar of Firms & Soc.</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Curriculum Mode
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                English & Hindi Medium
              </strong>
              <p className="text-xs text-slate-500">Integral Education</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Mandatory Disclosures Table */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Statutory Credentials Table */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <Scale className="w-5 h-5 text-blue-700" />
              <h2 className="font-serif font-bold text-lg text-slate-900">
                Institutional Credential Registry & Disclosures
              </h2>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {[
                { title: "Name of the Institution", value: "Sri Aurobindo School, Bhopal" },
                { title: "Managing Educational Society", value: "Sri Aurobindo Education Centre (SAEC)" },
                { title: "Society Registration Status", value: "Registered under MP Society Registrikaran Adhiniyam, July 1989" },
                { title: "State Affiliation Board", value: "Madhya Pradesh Board of Secondary Education (MPBSE)" },
                { title: "Campus Address", value: "Auro Mandir Parisar, Behind Kannad Bhawan, 2nd Stop, Tulsi Nagar, Bhopal, MP – 462003" },
                { title: "Leadership & Chairman", value: "Shri Umesh Trivedi (Chairman, SAEC & School)" },
                { title: "School Contact Telephony", value: "0755-2558286 (+91 755 2558286)" },
                { title: "Official Contact Email", value: "aurobhopal@gmail.com" },
                { title: "Medium of Instruction", value: "English Medium with Comprehensive Hindi & Sanskrit Arts" },
                { title: "Academic Session Interval", value: "June to March–April annually" },
              ].map((row, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-semibold text-slate-600 sm:w-1/3">{row.title}</span>
                  <span className="text-slate-900 font-medium sm:w-2/3">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure Safety & Environmental Compliance */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50/70 border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Campus Infrastructure & Safety Certifications
            </h3>
            <p className="text-xs text-slate-600">
              Auro Mandir Parisar maintains stringent standards for pupil safety, hygienic amenities, and disaster preparedness:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {[
                {
                  title: "Fire Safety & Emergency Exits",
                  desc: "Certified fire extinguishers, marked evacuation stairwells, and regular drill orientations.",
                  status: "Certified & Audited",
                },
                {
                  title: "RO-Purified Drinking Water",
                  desc: "Commercial reverse-osmosis filtration units delivering clean drinking water across all wings.",
                  status: "Potable Tested",
                },
                {
                  title: "Uninterrupted Power Backup",
                  desc: "24/7 dedicated generator setup powering digital smart classrooms and science labs.",
                  status: "Operational",
                },
                {
                  title: "Medical & First Aid Suite",
                  desc: "Equipped medical infirmary with qualified emergency kits and direct pediatric hospital access.",
                  status: "Ready",
                },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Promotion & Examination Bylaws */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Three-Term Examination & Academic Promotion Bylaws
            </h3>
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <p>
                • <strong>Pass Threshold:</strong> Students must attain a minimum aggregate score of 33% to 40% across each registered subject in theory and practicals.
              </p>
              <p>
                • <strong>Continuous Comprehensive Evaluation (CCE):</strong> Cumulative assessments throughout the academic year ensure student progress is tracked holistically.
              </p>
              <p>
                • <strong>Supplementary Examinations:</strong> Candidates who fail to clear one or two subjects in the annual examinations are eligible for remedial supplementary examinations prior to the new June session.
              </p>
              <p>
                • <strong>Fee Clearance Prerequisite:</strong> All institutional and tuition fees must be cleared prior to the release of admit cards and examination roll slips.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
