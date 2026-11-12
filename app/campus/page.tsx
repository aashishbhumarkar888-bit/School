import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CAMPUS_FACILITIES, SCHOOL_FACTS } from "@/lib/content/school-data";
import { EditorialImageFrame } from "@/components/ui/EditorialImageFrame";
import {
  Building2,
  BookOpen,
  FlaskConical,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  MapPin,
  Flame,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Campus Infrastructure, Science Labs & Central Library | Sri Aurobindo School, Bhopal",
  description:
    "Explore Auro Mandir Parisar at Tulsi Nagar, Bhopal: Specialized Physics, Chemistry, and Biology laboratories, Digital Smart Classrooms, Central Library, and sports arena.",
};

export default function CampusPage() {
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
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Auro Mandir Parisar · Tulsi Nagar, Bhopal</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Campus Infrastructure & Learning Sanctuaries
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                Nestled behind Kannad Bhawan at 2nd Stop, Tulsi Nagar, the Auro Mandir Parisar provides a
                serene, green ecological haven. Spacious, sunlit classrooms, fully equipped laboratories,
                a central reading sanctuary, and expansive athletic playgrounds combine to foster total
                child development.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>State-of-the-Art Science Laboratories</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Daily Central Library Reading Hours</span>
                </span>
              </div>
            </div>

            {/* Right 5 Columns: Editorial Frame */}
            <div className="lg:col-span-5">
              <EditorialImageFrame
                src="/images/official/curriculum.jpg"
                alt="Central School Library & Reading Sanctuary"
                caption="Curated Volumes & Scheduled Class Reading Periods"
                badgeTopLeft={{
                  title: "Central Library",
                  subtitle: "Mandatory Daily Reading",
                  iconName: "book",
                }}
                badgeBottomRight={{
                  title: "Auro Mandir Parisar",
                  subtitle: "Green Sanctuary",
                  iconName: "building",
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
                Campus Area
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                Auro Mandir Parisar
              </strong>
              <p className="text-xs text-slate-500">Tulsi Nagar, Bhopal</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Science Labs
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                Physics, Chem & Bio
              </strong>
              <p className="text-xs text-slate-500">Working Model Stations</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Digital Aids
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                Smart AV Classrooms
              </strong>
              <p className="text-xs text-slate-500">Interactive Visual Boards</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Sports Grounds
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                Volleyball & Basketball
              </strong>
              <p className="text-xs text-slate-500">Indoor Chess & Table Tennis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Breakdown */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Purpose-Built Spaces
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Infrastructure Engineered for Mind, Vitality & Soul
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Every wing of Sri Aurobindo School is thoughtfully arranged to cultivate intellectual
              focus, scientific wonder, physical vitality, and emotional peace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAMPUS_FACILITIES.map((facility) => (
              <div
                key={facility.id}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {facility.category}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {facility.badge}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-slate-900">
                    {facility.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {facility.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Active Daily Access</span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-400 uppercase">
                    Auro Mandir Parisar
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Photo Gallery Showcase Strip */}
          <div className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200/90 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Authentic Campus Photography Showcase
                </h3>
                <p className="text-xs text-slate-500">
                  Explore full-resolution documentary photographs captured across our learning wings.
                </p>
              </div>
              <Link
                href="/gallery"
                className="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 group"
              >
                <span>Open Full-Screen Lightbox Gallery</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { src: "/images/official/society.jpg", label: "Green Campus Parisar" },
                { src: "/images/official/affiliation.jpg", label: "Senior Science Labs" },
                { src: "/images/official/curriculum.jpg", label: "Central Library" },
                { src: "/images/official/event-01.jpg", label: "Playgrounds & Courts" },
              ].map((pic, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden aspect-[4/3] group border border-slate-200">
                  <Image
                    src={pic.src}
                    alt={pic.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-white text-xs font-semibold">{pic.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Specifications & Verification Disclosure Notice */}
          <div className="mt-8 p-6 rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Verified Facility Standards & Statutory Compliance
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                All campus facilities—including science laboratories (Physics, Chemistry, Biology), audiovisual smart classrooms, library cataloguing, fire safety systems, and water purification installations—comply with Madhya Pradesh Board of Secondary Education (MPBSE) affiliation mandates and are subject to annual audit by the Sri Aurobindo Education Society (SAEC) Governing Body. Room dimensions, stock registers, and lab safety logs are maintained at the administrative office for inspection.
              </p>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-[11px] font-mono font-bold text-slate-400 block">
                AUDIT COMPLIANT
              </span>
              <span className="text-xs font-bold text-slate-700">
                SAEC Charter 1989
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
