"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { SCHOOL_FACTS, AGE_ELIGIBILITY_TABLE } from "@/lib/content/school-data";
import { AgeEligibilityCalculator } from "@/components/ui/AgeEligibilityCalculator";
import { MagneticButton } from "@/components/ui/MagneticButton";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "When does the new academic session begin?",
    a: "The academic session at Sri Aurobindo School commences in June every year. Admission registrations open from 15th June onwards.",
  },
  {
    q: "What are the school office hours for admission enquiries?",
    a: "The School Office registration and enquiry counter is open Monday through Saturday between 8:00 AM and 1:00 PM at Auro Mandir Parisar, Tulsi Nagar, Bhopal.",
  },
  {
    q: "What is the minimum age requirement for Nursery and Class I?",
    a: "As on the session commencement in June: Nursery requires 2½ to 3 years; KG-1 requires 3½ to 4 years; KG-2 requires 4½ years; and Class I requires 5½ years.",
  },
  {
    q: "What documents must be submitted during registration?",
    a: "Parents must submit the official Certificate of Birth (original for verification along with an attested copy) and the prescribed registration proforma with the ₹100/- registration fee. For Classes II through XII, a valid Transfer Certificate (TC) and previous year's mark sheet are required.",
  },
  {
    q: "Is Sri Aurobindo School co-educational and which board is it affiliated with?",
    a: "Yes, Sri Aurobindo School is a co-educational K–12 institution fully affiliated with the Madhya Pradesh Board of Secondary Education (MPBSE).",
  },
  {
    q: "Are admissions open to all communities?",
    a: "Yes. In keeping with the universal ideals of Sri Aurobindo and The Mother, admission is open to all eligible children irrespective of caste, creed, gender, or community.",
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

  return (
    <div className="bg-[#FCFBF9] text-slate-900 min-h-screen">
      {/* ================= 1. HEADER BANNER WITH OFFICIAL ADMISSIONS PHOTO ================= */}
      <section className="relative py-20 bg-gradient-to-b from-sky-50/70 via-white to-[#FCFBF9] border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 shadow-xs inline-flex items-center gap-1.5 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Session Commencing June 2026–27 · Nursery to Class XII</span>
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Begin Your Child's Journey with Us
              </h1>
              <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
                Welcome to Sri Aurobindo School, Bhopal. We welcome all children irrespective of caste,
                creed, or community into an active, joyous, and academically inspiring learning home.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs font-medium">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Office Counter: 8:00 AM – 1:00 PM</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs font-medium">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Proforma: ₹100/- with Birth Certificate</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl p-3 bg-white/90 backdrop-blur-xl border border-slate-200 shadow-lg">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src="/images/official/admissions.jpg"
                    alt="Students Welcomed at Sri Aurobindo School, Bhopal"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover"
                  />
                </div>
                <div className="p-3 text-center">
                  <p className="font-serif font-bold text-xs text-slate-800">
                    Welcome to Sri Aurobindo School, Bhopal
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Nurturing young minds through integral harmony & care
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. AGE ELIGIBILITY CALCULATOR CONCIERGE ================= */}
      <section id="age-calculator" className="py-20 bg-white relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AgeEligibilityCalculator />
        </div>
      </section>

      {/* ================= 3. 4-STEP ADMISSION ROADMAP ================= */}
      <section className="py-20 bg-slate-50/60 relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Official Admission Procedure
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
              The 4-Step Enrollment Roadmap
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Procure Registration Proforma",
                desc: "Visit the School Office counter between 8:00 AM and 1:00 PM on working days. Obtain the official registration form for ₹100/-.",
              },
              {
                step: "02",
                title: "Document Verification",
                desc: "Attach the candidate's verified Certificate of Birth and previous class transfer certificates or mark sheets where applicable.",
              },
              {
                step: "03",
                title: "Parent-Child Interaction",
                desc: "A warm, informal interaction with school counselors and faculty to understand the child's emotional and learning needs.",
              },
              {
                step: "04",
                title: "Admission Confirmation",
                desc: "Finalized by the School Admission Committee based on age eligibility criteria and classroom vacancy availability.",
              },
            ].map((st) => (
              <div
                key={st.step}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-serif font-bold text-sky-600 block mb-3">
                    {st.step}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">{st.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. VALIDATED ADMISSION ENQUIRY FORM ================= */}
      <section id="enquiry-form" className="py-20 bg-white relative border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
            {successResult ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  Admission Enquiry Received!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you. Your enquiry has been registered in the school database with reference:
                </p>
                <div className="inline-block px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 font-mono text-lg font-bold text-sky-700">
                  {successResult.id}
                </div>
                <p className="text-xs text-slate-500 max-w-lg mx-auto">
                  The School Office will review your child's age criteria and contact you at{" "}
                  <span className="text-slate-900 font-bold">{formData.phone}</span> during office hours
                  (8:00 AM – 1:00 PM).
                </p>
                <button
                  onClick={() => setSuccessResult(null)}
                  className="mt-4 px-6 py-2.5 text-xs font-semibold rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
                    Direct School Office Connect
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-2">
                    Online Admission Enquiry Form
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Fill out this form to connect with the School Office regarding eligibility,
                    registration proforma, and campus visits.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Parent / Guardian Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) =>
                          setFormData({ ...formData, parentName: e.target.value })
                        }
                        placeholder="e.g. Ramesh Sharma"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="e.g. 98260XXXXX"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="e.g. parent@example.com"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Child's Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.childName}
                        onChange={(e) =>
                          setFormData({ ...formData, childName: e.target.value })
                        }
                        placeholder="e.g. Aarav Sharma"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Class Seeking Admission For *
                    </label>
                    <select
                      value={formData.targetClass}
                      onChange={(e) =>
                        setFormData({ ...formData, targetClass: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                    >
                      <option value="Nursery">Nursery (2½ – 3 Years)</option>
                      <option value="KG-1">KG-1 (3½ – 4 Years)</option>
                      <option value="KG-2">KG-2 (4½ Years)</option>
                      <option value="Class I">Class I (5½ Years)</option>
                      <option value="Class II">Class II</option>
                      <option value="Class III">Class III</option>
                      <option value="Class IV">Class IV</option>
                      <option value="Class V">Class V</option>
                      <option value="Class VI">Class VI</option>
                      <option value="Class VII">Class VII</option>
                      <option value="Class VIII">Class VIII</option>
                      <option value="Class IX">Class IX (MPBSE)</option>
                      <option value="Class X">Class X (MPBSE)</option>
                      <option value="Class XI">Class XI (Science / Commerce)</option>
                      <option value="Class XII">Class XII (Science / Commerce)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Specific Questions or Message (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share details on previous school, siblings at SAS, or queries about the registration proforma..."
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="text-[11px] text-slate-500">
                      Privacy Protected · Enquiries handled directly by School Office
                    </p>

                    <MagneticButton
                      type="submit"
                      disabled={loading}
                      variant="primary"
                      className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold shadow-md"
                    >
                      {loading ? (
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          <span>Submit Enquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </MagneticButton>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= 5. FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="py-20 bg-slate-50/60 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
              Clear Guidance
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
              Admission Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180 text-sky-600" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
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
        <div className="min-h-screen bg-[#FCFBF9] flex items-center justify-center text-slate-500">
          Loading admissions...
        </div>
      }
    >
      <AdmissionsContent />
    </Suspense>
  );
}
