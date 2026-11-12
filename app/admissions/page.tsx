"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  SCHOOL_FACTS,
  AGE_ELIGIBILITY_TABLE,
  APPROVED_FEE_POLICY,
  ADMISSION_DOCUMENT_CHECKLIST,
} from "@/lib/content/school-data";
import { AgeEligibilityCalculator } from "@/components/ui/AgeEligibilityCalculator";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ScrollReveal, KineticText } from "@/components/ui/ScrollReveal";
import { InteractiveHeroShowcase } from "@/components/ui/InteractiveHeroShowcase";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { BorderBeam } from "@/components/ui/BorderBeam";
import {
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Send,
  UserCheck,
  Award,
  Receipt,
  AlertCircle,
  FileCheck2,
  Info,
  CreditCard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "When does the new academic session begin and when does registration start?",
    a: "The academic session at Sri Aurobindo School commences in June every year. Admission registration opens from 15th June onwards at the School Office counter.",
  },
  {
    q: "What is the official registration fee and how are tuition fees determined?",
    a: "The official registration fee is strictly ₹100/- payable upon obtaining the registration proforma at the school counter. Class-wise tuition fees (Nursery through Class XII), one-time admission charges, annual activity fees, and bus transport fees are payable according to an Official Attached Schedule approved annually by the Sri Aurobindo Education Society (SAEC) Governing Body and notified at the accounts counter.",
  },
  {
    q: "What are the school office hours for admission enquiries?",
    a: "The School Office registration and enquiry counter is open Monday through Saturday between 8:00 AM and 1:00 PM at Auro Mandir Parisar, Tulsi Nagar, Bhopal.",
  },
  {
    q: "What is the minimum age requirement for Nursery, Kindergarten, and Class I?",
    a: "As on session commencement in June: Nursery requires 2½ to 3 years; KG-1 requires 3½ to 4 years; KG-2 requires 4½ years; and Class I requires 5½ years.",
  },
  {
    q: "What documents must be submitted during registration?",
    a: "Parents must submit the official Certificate of Birth (original for verification along with an attested copy), the prescribed registration proforma with the ₹100/- registration fee receipt, and 3 recent passport photographs. For Classes II through XII, an official Transfer Certificate (TC) and previous year's mark sheet are mandatory.",
  },
  {
    q: "What is the rule regarding fee clearance and terminal examinations?",
    a: "Per institutional regulations, tuition and transport fee installments must be cleared prior to the commencement of each terminal examination (First Term in September, Second Term in December, and Annual Board Examinations in March/April) to receive examination admit cards.",
  },
  {
    q: "Is Sri Aurobindo School co-educational and which board is it affiliated with?",
    a: "Yes, Sri Aurobindo School is a co-educational K–12 institution fully affiliated with the Madhya Pradesh Board of Secondary Education (MPBSE).",
  },
];

function AdmissionsContent() {
  const searchParams = useSearchParams();
  const initialGrade = searchParams.get("grade") || "Nursery";

  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    email: "",
    childName: "",
    targetClass: initialGrade,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState<{ id: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const paramGrade = searchParams.get("grade");
    if (paramGrade) {
      setFormData((prev) => ({ ...prev, targetClass: paramGrade }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!formData.parentName.trim() || !formData.phone.trim() || !formData.childName.trim()) {
      setErrorMessage("Please complete all required fields (Parent Name, Phone, and Child Name).");
      setLoading(false);
      return;
    }

    if (formData.phone.replace(/[^0-9]/g, "").length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile contact number.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setSuccessResult({ id: data.enquiryId || "SAS-ADM-2026-REC" });
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while transmitting your enquiry.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      step: "01",
      title: "Procure Registration Proforma",
      desc: "Visit the School Office counter between 8:00 AM and 1:00 PM (from 15th June onwards). Procure the official registration proforma for ₹100/-.",
      house: "teresa",
    },
    {
      step: "02",
      title: "Document Submission & Verification",
      desc: "Submit with verified Municipal Birth Certificate, 3 photos, and official TC / previous mark sheet for Classes II through XII.",
      house: "amartya",
    },
    {
      step: "03",
      title: "Parent-Child Interaction",
      desc: "A warm, informal interaction with school counselors and faculty to understand the child's emotional and learning needs.",
      house: "tagore",
    },
    {
      step: "04",
      title: "Admission Confirmation & Schedule",
      desc: "Finalized by the School Admission Committee; admission and tuition charges payable as per the approved attached schedule.",
      house: "raman",
    },
  ];

  return (
    <div className="bg-[#FCFBF9] text-slate-900 min-h-screen">
      {/* ================= 1. HEADER BANNER WITH LIVING AURORA & 3D SHOWCASE ================= */}
      <section className="relative pt-28 pb-20 overflow-hidden border-b border-slate-200/80">
        <AuroraBackground className="absolute inset-0 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal variant="fade-up">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 shadow-2xs inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>Session Commencing June 2026–27 · Nursery to Class XII</span>
                </span>
              </ScrollReveal>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12]">
                <KineticText
                  text="Begin Your Child's Journey with Us"
                  highlightWords={["Child's", "Journey"]}
                  delay={0.1}
                />
              </h1>

              <ScrollReveal variant="fade-up" delay={0.2}>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  Welcome to Sri Aurobindo School, Bhopal. We welcome all children irrespective of caste,
                  creed, or community into an active, joyous, and academically inspiring learning home.
                </p>
              </ScrollReveal>

              {/* October Mid-Session & June 2027-28 Waitlist Banner */}
              <ScrollReveal variant="fade-up" delay={0.25}>
                <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-xs text-amber-900 space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <strong className="font-semibold text-amber-950 uppercase tracking-wider text-[11px]">
                      Session Status: Regular 2026–27 Session in Progress (Commenced June)
                    </strong>
                  </div>
                  <p className="text-slate-600 font-normal leading-relaxed">
                    The 2026–27 academic session commenced in June. For parents seeking admission for the upcoming <strong>June 2027–28 session</strong>, priority notifications and waitlist registrations are open. For Classes II through XII, mid-session vacancy transfer inquiries are accepted at the School Office counter (8:00 AM – 1:00 PM).
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={0.3}>
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs font-medium">
                    <Calendar className="w-4 h-4 text-sky-600" />
                    <span>Registration from 15th June Onwards</span>
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs font-medium">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Office Counter: 8:00 AM – 1:00 PM</span>
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs font-medium">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Proforma Fee: ₹100/-</span>
                  </span>
                </div>
              </ScrollReveal>
            </div>

            {/* Right 5 Columns: Interactive 3D Showcase */}
            <div className="lg:col-span-5">
              <ScrollReveal variant="tilt-in" delay={0.25}>
                <InteractiveHeroShowcase
                  imageSrc="/images/official/admissions.jpg"
                  altText="Students Welcomed at Sri Aurobindo School, Bhopal"
                  title="Welcome to Sri Aurobindo School, Bhopal"
                  subtitle="Nurturing Young Minds Through Integral Harmony & Care"
                  aspectRatio="aspect-[4/3]"
                  priority
                  badges={[
                    {
                      position: "top-left",
                      duration: 3.5,
                      content: (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-sky-200 shadow-md text-xs font-bold text-sky-800">
                          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                          <span>Session June 2026–27</span>
                        </div>
                      ),
                    },
                    {
                      position: "top-right",
                      duration: 4.2,
                      delay: 0.5,
                      content: (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-emerald-200 shadow-md text-xs font-bold text-emerald-900">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Proforma ₹100/-</span>
                        </div>
                      ),
                    },
                    {
                      position: "bottom-left",
                      duration: 4.8,
                      delay: 1,
                      content: (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-amber-200 shadow-md text-xs font-bold text-amber-900">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>Counter: 8 AM – 1 PM</span>
                        </div>
                      ),
                    },
                  ]}
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. AGE ELIGIBILITY CALCULATOR CONCIERGE ================= */}
      <section id="age-calculator" className="py-24 bg-white relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="scale-up">
            <AgeEligibilityCalculator />
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 3. 4-STEP ADMISSION ROADMAP WITH ANIMATED CONNECTORS ================= */}
      <section className="py-24 bg-slate-50/70 relative border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal variant="fade-up">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                Official Admission Procedure
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 mt-4 tracking-tight">
                The 4-Step Enrollment Roadmap
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                A transparent, stress-free admissions pathway guided by school faculty.
              </p>
            </ScrollReveal>
          </div>

          {/* Connected Step Cards with Animated Beam */}
          <div className="relative">
            {/* Horizontal Connector Line for Desktop */}
            <div className="hidden md:block absolute top-1/2 left-10 right-10 h-1 -translate-y-6 bg-slate-200 rounded-full z-0">
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-sky-500 via-amber-400 via-emerald-400 to-rose-500 rounded-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
              {steps.map((st, idx) => (
                <ScrollReveal key={st.step} variant="fade-up" delay={idx * 0.12}>
                  <SpotlightCard
                    house={st.house}
                    className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 border border-sky-200 font-serif font-black text-base flex items-center justify-center shadow-2xs">
                          {st.step}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Step 0{idx + 1}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 mb-2 font-serif">{st.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">{st.desc}</p>
                    </div>

                    <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Official SAS Guideline</span>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. APPROVED SCHOOL FEES & ATTACHED SCHEDULE REGULATIONS ================= */}
      <section id="fee-structure" className="py-24 bg-white relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <ScrollReveal variant="fade-up">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 shadow-2xs inline-flex items-center gap-2">
                <Receipt className="w-3.5 h-3.5 text-sky-600" />
                <span>SAEC Governing Body Approved Regulations</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 mt-4 tracking-tight">
                Approved School Fees & Fee Schedule
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                In adherence to official school guidelines, only confirmed figures are published. Class-wise
                tuition and admission fees are governed by the approved attached schedule.
              </p>
            </ScrollReveal>
          </div>

          {/* Official Policy Governance Banner */}
          <ScrollReveal variant="fade-up" delay={0.1}>
            <div className="mb-10 rounded-3xl bg-slate-50 border border-slate-200/90 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    Official Fee Notice
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Sri Aurobindo Education Centre (SAEC)
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                  Confirmed Registration Proforma Fee: ₹100/-
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  The official registration fee is strictly <strong className="text-slate-900">₹100/-</strong>,
                  payable upon obtaining the admission proforma at the School Accounts Counter. In strict
                  accordance with school regulations, detailed class-wise tuition fees (Nursery through Class XII),
                  one-time admission deposits, annual charges, and transport slabs are payable according to the
                  <strong className="text-slate-900"> Official Attached Schedule</strong> approved annually
                  by the SAEC Governing Body and displayed at the accounts office.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto">
                <a
                  href="tel:07552558286"
                  className="px-5 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-sky-700 transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Accounts (0755-2558286)</span>
                </a>
                <a
                  href="mailto:aurobhopal@gmail.com?subject=Enquiry%20Regarding%20Approved%20Fee%20Schedule"
                  className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>Email Accounts Desk</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Verified Fee Heads Breakdown Table */}
          <ScrollReveal variant="fade-up" delay={0.15}>
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden mb-10">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Approved Fee Structure Categories (Academic Year 2026–27)
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Counter Hours: 8:00 AM – 1:00 PM (Monday – Saturday)
                </span>
              </div>

              <div className="divide-y divide-slate-100 overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50/50 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3.5 px-6">Fee Head</th>
                      <th className="py-3.5 px-4">Amount / Tariff</th>
                      <th className="py-3.5 px-4">Frequency</th>
                      <th className="py-3.5 px-4">Institutional Status</th>
                      <th className="py-3.5 px-6">Regulation & Applicability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-normal">
                    {APPROVED_FEE_POLICY.feeHeads.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-900 font-serif">
                          {item.head}
                        </td>
                        <td className="py-4 px-4 font-mono font-bold text-sky-700">
                          {item.amount}
                        </td>
                        <td className="py-4 px-4 text-slate-600">
                          {item.frequency}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={cn(
                              "px-2.5 py-1 rounded-full text-[10px] font-bold inline-block",
                              item.status === "Confirmed Official Figure"
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : item.status === "Optional Facility"
                                ? "bg-amber-50 text-amber-800 border border-amber-200"
                                : "bg-sky-50 text-sky-800 border border-sky-200"
                            )}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-600 text-xs">
                          {item.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          {/* Statutory Examination Clearance & Accounts Policy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal variant="fade-up" delay={0.2}>
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold font-serif text-slate-900">
                    Terminal Examination Fee Clearance Rule
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    In compliance with the school's three-term academic architecture, all tuition installments
                    and transport fees must be settled prior to the commencement of the First Term (September),
                    Second Term (December), and Annual Examinations (March/April) for the issuance of examination
                    roll slips and hall tickets.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-200 text-[11px] font-bold text-slate-500">
                  Official SAS Academic & Accounts Regulation
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.25}>
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold font-serif text-slate-900">
                    Counter Payments & Concession Applications
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    All fee deposits must be made directly at the School Accounts Counter against an official
                    stamped receipt. In alignment with SAEC's founding ideals of service, applications for fee
                    concessions on merit or economic grounds must be submitted in writing to the Chairman with
                    income verification documents.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-200 text-[11px] font-bold text-slate-500">
                  Sri Aurobindo Education Centre (SAEC) Charter
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 5. MANDATORY ADMISSION DOCUMENT CHECKLIST ================= */}
      <section id="document-checklist" className="py-24 bg-slate-50/70 relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <ScrollReveal variant="fade-up">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs inline-flex items-center gap-2">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verification Requirements</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 mt-4 tracking-tight">
                Mandatory Document Checklist
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Please prepare the following documents prior to visiting the admission counter at Auro Mandir Parisar.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADMISSION_DOCUMENT_CHECKLIST.map((doc, idx) => (
              <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.08}>
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center text-xs font-mono font-bold">
                        0{idx + 1}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-600">
                        Required
                      </span>
                    </div>

                    <h4 className="text-base font-bold font-serif text-slate-900">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {doc.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mandatory Verification Record</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6. VALIDATED ADMISSION ENQUIRY FORM ================= */}
      <section id="enquiry-form" className="py-24 bg-white relative border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="scale-up">
            <div className="relative rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.08)] overflow-hidden">
              <BorderBeam borderWidth={2} duration={8} />

              {successResult ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    Admission Enquiry Recorded
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you. Your enquiry receipt ID is{" "}
                    <strong className="text-sky-700 font-mono font-bold">{successResult.id}</strong>.
                    Our admissions committee will reach out to schedule your interaction.
                  </p>
                  <button
                    onClick={() => setSuccessResult(null)}
                    className="px-6 py-2.5 rounded-full bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition-colors shadow-sm"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center max-w-xl mx-auto mb-8">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs">
                      Official Admission Desk
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-2">
                      Online Admission Enquiry (2026–27)
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Fill out this quick form and our admissions desk will call you to confirm documentation and seat availability.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Parent / Guardian Name *
                      </label>
                      <input
                        type="text"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Contact Mobile Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Child's Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.childName}
                        onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                        placeholder="Candidate child's name"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Target Grade for Admission *
                      </label>
                      <select
                        value={formData.targetClass}
                        onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                      >
                        <option value="Nursery">Nursery (Age 2½–3)</option>
                        <option value="KG-1">KG-1 / LKG (Age 3½–4)</option>
                        <option value="KG-2">KG-2 / UKG (Age 4½)</option>
                        <option value="Class 1">Class I (Age 5½)</option>
                        <option value="Class 2">Class II</option>
                        <option value="Class 3">Class III</option>
                        <option value="Class 4">Class IV</option>
                        <option value="Class 5">Class V</option>
                        <option value="Class 6">Class VI</option>
                        <option value="Class 7">Class VII</option>
                        <option value="Class 8">Class VIII</option>
                        <option value="Class 9">Class IX (MPBSE)</option>
                        <option value="Class 10">Class X (MPBSE)</option>
                        <option value="Class 11">Class XI (MPBSE)</option>
                        <option value="Class 12">Class XII (MPBSE)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="parent@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Any Specific Query or Note
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention previous school or questions about bus transport, fee concessions, etc."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                    />
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3.5 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-sky-700 transition-colors shadow-md inline-flex items-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Transmitting Enquiry...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Admission Enquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 5. FREQUENTLY ASKED ADMISSION QUESTIONS ================= */}
      <section className="py-24 bg-slate-50/70 relative border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <ScrollReveal variant="fade-up">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
                Parent Guidance
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3 tracking-tight">
                Frequently Asked Admission Questions
              </h2>
            </ScrollReveal>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.05}>
                <div className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden transition-all">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-sky-700 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0",
                        openFaq === idx && "rotate-180 text-sky-600"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AdmissionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FCFBF9]">
          <div className="w-8 h-8 rounded-full border-2 border-sky-600 border-t-transparent animate-spin" />
        </div>
      }
    >
      <AdmissionsContent />
    </Suspense>
  );
}
