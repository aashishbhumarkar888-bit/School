"use client";

import React, { useState } from "react";
import { SCHOOL_FACTS } from "@/lib/content/school-data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Enquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage("Please complete all required fields (Name, Phone, and Message).");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to transmit message.");
      }

      setSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while transmitting your message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FCFBF9] text-slate-900 min-h-screen">
      {/* ================= 1. HEADER BANNER ================= */}
      <section className="relative py-20 bg-gradient-to-b from-sky-50/70 via-white to-[#FCFBF9] border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 shadow-xs inline-flex items-center gap-1.5 mb-4">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              <span>Campus Connect · Tulsi Nagar, Bhopal</span>
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 mt-2 tracking-tight leading-tight">
              Connect with Our School Office
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
              We welcome prospective families, alumni, and guardians to visit our campus at Auro
              Mandir Parisar, Tulsi Nagar, Bhopal. Reach out directly by phone, email, or using our
              contact form below.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 2. CONTACT COORDINATES GRID ================= */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Telephone Contact</h4>
                <p className="text-xs text-slate-500 mb-4">Monday – Saturday (School Hours)</p>
              </div>
              <a
                href={`tel:${SCHOOL_FACTS.phone.replace(/[^0-9]/g, "")}`}
                className="text-base font-bold font-mono text-slate-900 hover:text-sky-700 transition-colors"
              >
                {SCHOOL_FACTS.phone}
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Official Email</h4>
                <p className="text-xs text-slate-500 mb-4">For enquiries & submissions</p>
              </div>
              <a
                href={`mailto:${SCHOOL_FACTS.email}`}
                className="text-sm font-bold font-mono text-slate-900 hover:text-amber-700 transition-colors break-all"
              >
                {SCHOOL_FACTS.email}
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Campus Location</h4>
                <p className="text-xs text-slate-500 mb-4">{SCHOOL_FACTS.address}</p>
              </div>
              <span className="text-xs font-bold text-emerald-700">Tulsi Nagar, Bhopal</span>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Office Hours</h4>
                <p className="text-xs text-slate-500 mb-4">Registration Window</p>
              </div>
              <span className="text-xs font-bold text-rose-700">
                8:00 AM – 1:00 PM (Mon–Sat)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. FORM & MAP SECTION ================= */}
      <section className="py-20 bg-[#FCFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
              {success ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Your correspondence has been received by the Sri Aurobindo School office team. We
                    will respond to your query shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">
                    Send an Institutional Message
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-8">
                    Whether you are an alumnus, prospective parent, or partner, please use this form
                    to contact the administration.
                  </p>

                  {errorMessage && (
                    <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Priyanshu Patel"
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">
                          Mobile Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 98260XXXXX"
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. you@example.com"
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">
                          Subject Area
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                        >
                          <option value="General Enquiry">General Enquiry</option>
                          <option value="Admission Question">Admission Question</option>
                          <option value="Transfer Certificate / Document">
                            Transfer Certificate / Document
                          </option>
                          <option value="Alumni Connection">Alumni Connection</option>
                          <option value="Academic Feedback">Academic Feedback</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Your Detailed Message *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please elaborate on your inquiry or request..."
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <p className="text-[11px] text-slate-500">
                        Official communications transmitted securely.
                      </p>

                      <MagneticButton
                        type="submit"
                        disabled={loading}
                        variant="primary"
                        className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold shadow-md"
                      >
                        {loading ? <span>Transmitting...</span> : <span>Send Message</span>}
                      </MagneticButton>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Map & Direction Information Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl bg-white p-8 border border-slate-200/90 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-2">
                  Campus Address & Landmark
                </span>
                <h4 className="text-xl font-bold font-serif text-slate-900 mb-3">
                  Auro Mandir Parisar
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Located behind Kannad Bhawan at the 2nd Stop, Tulsi Nagar, Bhopal. The campus is
                  easily accessible by city transit and central road arteries.
                </p>

                {/* Map Display Card */}
                <div className="relative aspect-[4/3] w-full rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h5 className="text-sm font-bold text-slate-900 font-serif">
                    Sri Aurobindo School, Bhopal
                  </h5>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    2nd Stop, Tulsi Nagar, Bhopal, MP – 462003
                  </p>
                  <a
                    href="https://maps.google.com/?q=Sri+Aurobindo+School+Bhopal+Tulsi+Nagar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-800 hover:bg-slate-50 transition-colors border border-slate-200 shadow-2xs"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
