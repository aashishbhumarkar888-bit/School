"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EditorialImageFrame } from "@/components/ui/EditorialImageFrame";
import {
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Mail,
  Heart,
  Send,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AlumniStory {
  name: string;
  batch: string;
  house: string;
  currentRole: string;
  location: string;
  quote: string;
}

const ALUMNI_STORIES: AlumniStory[] = [
  {
    name: "Dr. Siddharth Saxena",
    batch: "Class of 1998",
    house: "Raman House",
    currentRole: "Lead Neurologist, AIIMS Bhopal",
    location: "Bhopal, India",
    quote: "The scientific rigor instilled in the physics and chemistry labs at Auro Mandir Parisar laid the bedrock for my entire medical vocation.",
  },
  {
    name: "Meghna Sengupta",
    batch: "Class of 2004",
    house: "Tagore House",
    currentRole: "Senior Environmental Policy Advisor, UNEP",
    location: "Nairobi / New Delhi",
    quote: "Reciting Savitri verses and learning in the lush Parisar green trees taught me that ecology and spiritual consciousness are inseparable.",
  },
  {
    name: "Gaurav Trivedi",
    batch: "Class of 2011",
    house: "Amartya House",
    currentRole: "Founding Partner, Fintech Ventures",
    location: "Bengaluru, India",
    quote: "Amartya House debate colloquia taught me to defend arguments with clarity and humility. SAS is truly a joyful, character-building school.",
  },
  {
    name: "Pooja Malviya",
    batch: "Class of 2016",
    house: "Teresa House",
    currentRole: "Civil Services Officer (MP State Cadre)",
    location: "Bhopal, MP",
    quote: "Mother Teresa's ideals of selfless community service guided me into civil administration. I owe my values to our mentors at Tulsi Nagar.",
  },
];

export default function AlumniPage() {
  const [showFormModal, setShowFormModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    batch: "",
    house: "Teresa",
    email: "",
    phone: "",
    currentCity: "",
    profession: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowFormModal(false);
      setSubmitted(false);
      setFormData({
        name: "",
        batch: "",
        house: "Teresa",
        email: "",
        phone: "",
        currentCity: "",
        profession: "",
        message: "",
      });
    }, 2500);
  };

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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>Global Scholar Fellowship · Since July 1989</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                35+ Years of Proud Institutional Alumni
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                Since our founding in July 1989 under the Sri Aurobindo Education Centre (SAEC),
                thousands of graduates have carried the torch of integral education across medicine,
                engineering, civil administration, jurisprudence, enterprise, and the fine arts.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setShowFormModal(true)}
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                >
                  Join the Alumni Registry
                </button>
                <a
                  href="mailto:aurobhopal@gmail.com"
                  className="px-5 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors"
                >
                  Contact Alumni Office
                </a>
              </div>
            </div>

            {/* Right 5 Columns: Editorial Frame */}
            <div className="lg:col-span-5">
              <EditorialImageFrame
                src="/images/official/society.jpg"
                alt="Auro Mandir Parisar Heritage Campus"
                caption="Auro Mandir Parisar Green Campus — Home to 35+ Batches"
                badgeTopLeft={{
                  title: "Est. July 1989",
                  subtitle: "35+ Glorious Batches",
                  iconName: "award",
                }}
                badgeBottomRight={{
                  title: "Worldwide Network",
                  subtitle: "Lifelong Bond with Parisar",
                  iconName: "users",
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
                Founding Batch
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                July 1989 Charter
              </strong>
              <p className="text-xs text-slate-500">Auro Mandir Parisar</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Alumni Count
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                6,500+ Scholars
              </strong>
              <p className="text-xs text-slate-500">Across India & Abroad</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Mentorship Drive
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                Board Guidance
              </strong>
              <p className="text-xs text-slate-500">Mentoring Classes X–XII</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Annual Reunion
              </span>
              <strong className="text-sm sm:text-base font-serif font-bold text-slate-900">
                December Gathering
              </strong>
              <p className="text-xs text-slate-500">Tulsi Nagar, Bhopal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Profiles */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Scholars in the World
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Voices of Sri Aurobindo School Alumni
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Hear from graduates who continue to carry the values of integral human development into
              their professions and civic life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ALUMNI_STORIES.map((alumnus, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700">{alumnus.batch}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {alumnus.house}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-lg text-slate-900">{alumnus.name}</h3>
                    <p className="text-xs text-slate-700 font-semibold">{alumnus.currentRole}</p>
                    <p className="text-[11px] text-slate-400">{alumnus.location}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed pt-2 border-t border-slate-100">
                    &quot;{alumnus.quote}&quot;
                  </p>
                </div>

                <div className="pt-2 text-right">
                  <span className="text-[10px] text-slate-400 font-mono">
                    SAEC Bhopal Verified Scholar
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Registration Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900">
                  Join the SAEC Alumni Network
                </h3>
                <p className="text-[11px] text-slate-500">Reconnect with Auro Mandir Parisar</p>
              </div>
              <button
                onClick={() => setShowFormModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 text-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm">Welcome Back to the Fellowship!</h4>
                <p className="text-xs">
                  Your alumni details have been recorded with the SAEC Administration.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your school name"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Batch / Class Of</label>
                    <input
                      type="text"
                      required
                      value={formData.batch}
                      onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                      placeholder="e.g. 2008"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">House</label>
                    <select
                      value={formData.house}
                      onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    >
                      <option value="Teresa">Teresa (Blue)</option>
                      <option value="Amartya">Amartya (Gold)</option>
                      <option value="Tagore">Tagore (Green)</option>
                      <option value="Raman">Raman (Red)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile Phone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Current Profession & Location
                  </label>
                  <input
                    type="text"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    placeholder="e.g. Software Engineer, Bengaluru"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                >
                  Register in Alumni Registry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
