"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SCHOOL_FACTS, HOUSES } from "@/lib/content/school-data";
import { HouseId } from "@/lib/types";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Command,
  Compass,
  CheckCircle2,
  Calendar,
  GraduationCap,
  ShieldCheck,
  Building2,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [istTimeStr, setIstTimeStr] = useState("");

  // Live IST Campus Status Check (Mon–Sat, 7:45 AM – 1:30 PM)
  useEffect(() => {
    const updateIST = () => {
      const now = new Date();
      // IST offset is UTC +5:30
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istDate = new Date(utc + 3600000 * 5.5);

      const day = istDate.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const totalMinutes = hours * 60 + minutes;

      // 7:45 AM is 7 * 60 + 45 = 465 minutes
      // 1:30 PM is 13 * 60 + 30 = 810 minutes
      const isWorkingDay = day >= 1 && day <= 6;
      const isDuringHours = totalMinutes >= 465 && totalMinutes <= 810;

      setIsOpenNow(isWorkingDay && isDuringHours);

      setIstTimeStr(
        istDate.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }) + " IST"
      );
    };

    updateIST();
    const timer = setInterval(updateIST, 60000);
    return () => clearInterval(timer);
  }, []);

  const openAdminModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-admin-modal"));
    }
  };

  const houseKeys: HouseId[] = ["teresa", "amartya", "tagore", "raman"];

  return (
    <footer className="relative bg-white border-t border-slate-200/90 text-slate-700 pt-16 sm:pt-20 pb-12 overflow-hidden">
      {/* Background Architectural Dot Grid */}
      <div className="pointer-events-none absolute inset-0 bg-dots-pattern opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* ================= 1. OVERLAPPING PRE-FOOTER CONVERSION CARD ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="relative rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white p-8 sm:p-12 shadow-[0_24px_60px_-15px_rgba(30,58,138,0.25)] overflow-hidden">
          {/* Subtle Top 4-House Gradient Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-amber-400 via-emerald-400 to-rose-400" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Admissions 2026–27 · Nursery to Class XII</span>
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                Nurture Your Child at Sri Aurobindo School
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Empowering the "Sun-Eyed Children of a Marvellous Dawn" through integral education,
                equipping them with moral courage, intellectual vigour, and physical vitality.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>MPBSE State Board Affiliated</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>SAEC Society Est. July 1989</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>₹100/- Registration Proforma</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-stretch lg:items-end">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-blue-900 font-bold text-sm shadow-lg transition-transform hover:scale-[1.02] active:scale-95 text-center"
              >
                <span>Admission Roadmap & Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/student/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold backdrop-blur-md transition-colors text-center"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student & Parent Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= 2. FOUR HOUSES INSTITUTIONAL CREST RIBBON ================= */}
        <div className="mb-14 p-6 rounded-3xl bg-slate-50/80 border border-slate-200/90">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-600" />
              <h3 className="font-serif font-bold text-sm text-slate-900">
                The Four Houses Championship Culture
              </h3>
            </div>
            <Link
              href="/houses"
              className="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 group"
            >
              <span>Explore House Standings & Quiz</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {houseKeys.map((id) => {
              const house = HOUSES[id];
              return (
                <Link
                  key={id}
                  href="/houses"
                  className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all group"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 shadow-2xs"
                      style={{ backgroundColor: house.accentHex }}
                    />
                    <h4 className="font-serif font-bold text-xs text-slate-900 group-hover:text-blue-700 transition-colors">
                      {house.name}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium truncate">
                    {house.patron}
                  </p>
                  <p className="text-[10px] text-slate-600 mt-0.5 italic line-clamp-1">
                    "{house.motto}"
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ================= 3. 12-COLUMN EDITORIAL DIRECTORY GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-16">
          {/* Cols 1–4: Institutional Identity & Live Office Status */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-slate-50 border border-blue-600/25 p-1 shrink-0 shadow-xs flex items-center justify-center">
                <Image
                  src="/images/official/seal-crest.png"
                  alt="Sri Aurobindo School Emblem"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <Image
                  src="/images/official/school-wordmark-blue.png"
                  alt="Sri Aurobindo School"
                  width={180}
                  height={30}
                  className="h-6 w-auto object-contain object-left mb-0.5"
                />
                <p className="text-xs text-slate-500 font-medium">
                  {SCHOOL_FACTS.shortAddress} · Est. July 1989
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Managed by <strong>{SCHOOL_FACTS.society}</strong> (Registered with Registrar of Firms & Societies, Madhya Pradesh). Affiliated with the Madhya Pradesh Board of Secondary Education (MPBSE) for Co-educational K–12 Integral Education.
            </p>

            {/* Live IST Campus Status Pill */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className={cn(
                      "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                      isOpenNow ? "bg-emerald-400" : "bg-amber-400"
                    )}
                  />
                  <span
                    className={cn(
                      "relative inline-flex rounded-full h-2.5 w-2.5",
                      isOpenNow ? "bg-emerald-500" : "bg-amber-500"
                    )}
                  />
                </span>
                <div>
                  <span className="font-bold text-slate-900 block leading-tight">
                    {isOpenNow ? "Campus Open" : "Campus Closed"}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Mon–Sat: 7:45 AM – 1:30 PM
                  </span>
                </div>
              </div>
              <span className="font-mono text-[11px] text-slate-500 font-medium">
                {istTimeStr}
              </span>
            </div>
          </div>

          {/* Cols 5–6: Discover & Society */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-slate-900">
              Discover & Society
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/about" className="hover:text-blue-700 transition-colors">
                  Heritage & SAEC (1989)
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="hover:text-blue-700 transition-colors">
                  Chairman's Address
                </Link>
              </li>
              <li>
                <Link href="/affiliation" className="hover:text-blue-700 transition-colors">
                  MPBSE Affiliation
                </Link>
              </li>
              <li>
                <Link href="/campus" className="hover:text-blue-700 transition-colors">
                  Campus & Science Labs
                </Link>
              </li>
              <li>
                <Link href="/alumni" className="hover:text-blue-700 transition-colors">
                  SAEC Alumni Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Cols 7–8: Academics & Life */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-slate-900">
              Academics & Life
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/academics" className="hover:text-blue-700 transition-colors">
                  K–12 Academic Wings
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-blue-700 transition-colors">
                  Flight Path Pedagogy
                </Link>
              </li>
              <li>
                <Link href="/houses" className="hover:text-blue-700 transition-colors">
                  Four Houses Hub
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-blue-700 transition-colors">
                  Faculty Directory
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-blue-700 transition-colors">
                  Three-Term Calendar
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-blue-700 transition-colors">
                  Visual Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Cols 9–12: Verified Campus Contact Card */}
          <div className="lg:col-span-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
              <h4 className="font-serif text-xs font-bold text-slate-900 uppercase tracking-wider">
                Auro Mandir Parisar Coordinates
              </h4>
              <p className="text-xs text-slate-600 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{SCHOOL_FACTS.address}</span>
              </p>
              <div className="pt-2 border-t border-slate-200/60 space-y-1.5 text-xs">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <a href="tel:+917552558286" className="text-slate-800 font-semibold hover:underline">
                    0755-2558286
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                  <a href="mailto:aurobhopal@gmail.com" className="text-slate-800 hover:underline">
                    aurobhopal@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Office: 8:00 AM – 1:00 PM</span>
                </p>
              </div>

              <div className="pt-1">
                <a
                  href="https://maps.google.com/?q=Sri+Aurobindo+School+Tulsi+Nagar+Bhopal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200 shadow-2xs"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 4. GIANT ARCHITECTURAL WATERMARK & COPYRIGHT ================= */}
        <div className="pt-4 pb-2">
          <div className="text-[clamp(1.8rem,5.5vw,4.5rem)] font-serif font-black tracking-tight text-slate-200/70 select-none text-center uppercase leading-none">
            Sri Aurobindo School · 1989
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {SCHOOL_FACTS.fullName}. Affiliated with MPBSE. Managed by SAEC (Reg. July 1989).
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/notices" className="hover:text-slate-900 transition-colors">
              Gazette Notices
            </Link>
            <Link href="/admissions" className="hover:text-slate-900 transition-colors">
              Admission Norms
            </Link>
            <Link href="/careers" className="hover:text-slate-900 transition-colors">
              Careers
            </Link>
            <button
              onClick={openAdminModal}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors border border-slate-200 cursor-pointer"
              title="Staff Gateway (Ctrl + Shift + A)"
            >
              <Command className="w-3 h-3 text-slate-500" />
              <span>Staff Gateway</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
