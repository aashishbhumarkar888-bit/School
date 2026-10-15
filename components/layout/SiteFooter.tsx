"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useHouse } from "@/lib/context/HouseContext";
import { SCHOOL_FACTS, HOUSES } from "@/lib/content/school-data";
import { HouseId } from "@/lib/types";
import { MagneticButton } from "@/components/ui/MagneticButton";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const { activeHouse, setHouse } = useHouse();
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

      // Format time string
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
    <footer className="relative bg-gradient-to-b from-white via-slate-50/95 to-sky-50/40 border-t border-slate-200/80 text-slate-700 pt-16 sm:pt-24 pb-12 overflow-hidden">
      {/* ================= 1. OVERLAPPING PRE-FOOTER ADMISSION CONVERSION CARD ================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative -mt-28 sm:-mt-36 mb-16 sm:mb-20 z-20">
        <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-sky-400 via-amber-400 via-emerald-400 to-rose-500 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
          <div className="relative rounded-[22px] bg-white/95 backdrop-blur-2xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Admissions Window Open · Session 2026–27</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                Begin Your Child’s Journey at Sri Aurobindo School, Bhopal
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Co-educational K–12 (MPBSE) · Managed by Sri Aurobindo Education Centre (Est. July 1989) · Registration Window: 8:00 AM – 1:00 PM
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
              <Link href="/admissions" className="w-full sm:w-auto">
                <MagneticButton
                  variant="primary"
                  className="w-full sm:w-auto py-3 px-6 text-sm font-bold shadow-lg"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </Link>
              <a
                href="tel:+917552558286"
                className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-200"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                <span>0755-2558286</span>
              </a>
              <Link
                href="/admissions#age-calculator"
                className="w-full sm:w-auto py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
              >
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Match Age</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= 2. INTERACTIVE FOUR-HOUSE CREST RIBBON ================= */}
        <div className="mb-14 pb-12 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Four Official School Houses
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Click to Shift Website Theme & Aura
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              Active: <strong className="capitalize text-slate-800">{activeHouse} House</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {houseKeys.map((id) => {
              const house = HOUSES[id];
              const isSelected = activeHouse === id;
              return (
                <button
                  key={id}
                  onClick={() => setHouse(id)}
                  className={cn(
                    "text-left p-4 rounded-2xl border transition-all duration-300 relative group cursor-pointer",
                    isSelected
                      ? "bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] border-slate-300 scale-[1.02]"
                      : "bg-white/60 hover:bg-white border-slate-200/80 hover:-translate-y-1 hover:shadow-sm"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full shadow-sm"
                        style={{ backgroundColor: house.accentHex }}
                      />
                      <h4 className="font-serif font-bold text-sm text-slate-900">
                        {house.name}
                      </h4>
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-white">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{house.patron}</p>
                  <p className="text-[11px] font-medium text-slate-700 mt-1 italic">
                    "{house.values.slice(0, 3).join(", ")}"
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= 3. SPACIOUS 12-COLUMN EDITORIAL DIRECTORY GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-16">
          {/* Cols 1–4: Institutional Identity & Live Office Status */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 via-amber-300 to-rose-400 p-[1.5px] shadow-sm">
                <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center p-1">
                  <Image
                    src="/images/official/logo.png"
                    alt="Sri Aurobindo School Crest"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900 leading-tight">
                  {SCHOOL_FACTS.fullName}
                </h3>
                <p className="text-xs text-slate-500">
                  {SCHOOL_FACTS.shortAddress} · Est. July 1989
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Managed by <strong>{SCHOOL_FACTS.society}</strong> (Registered with Registrar of Firms & Societies, Madhya Pradesh). Affiliated to the Madhya Pradesh Board of Secondary Education (MPBSE) for Co-educational K–12 Integral Education.
            </p>

            {/* Live IST Campus Status Pill */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span
                    className={cn(
                      "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                      isOpenNow ? "bg-emerald-400" : "bg-amber-400"
                    )}
                  />
                  <span
                    className={cn(
                      "relative inline-flex rounded-full h-3 w-3",
                      isOpenNow ? "bg-emerald-500" : "bg-amber-500"
                    )}
                  />
                </span>
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                    {isOpenNow
                      ? "Campus Open Now (7:45 AM – 1:30 PM)"
                      : "Office Opens Mon–Sat at 7:45 AM"}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Registration Desk: 8:00 AM – 1:00 PM ({istTimeStr || "IST"})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cols 5–6: Discover & Academics */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-xs font-bold text-slate-900 uppercase tracking-wider">
              Discover & Heritage
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/about" className="hover:text-sky-700 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">About SAEC & History</span>
                </Link>
              </li>
              <li>
                <Link href="/about#vision-mission" className="hover:text-sky-700 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Vision, Mission & Ideology</span>
                </Link>
              </li>
              <li>
                <Link href="/about#chairman" className="hover:text-sky-700 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Chairman’s Message</span>
                </Link>
              </li>
              <li>
                <Link href="/academics" className="hover:text-sky-700 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Four Academic Wings</span>
                </Link>
              </li>
              <li>
                <Link href="/academics#methodology" className="hover:text-sky-700 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Teaching Methodology</span>
                </Link>
              </li>
              <li>
                <Link href="/academics#examination" className="hover:text-sky-700 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Three-Term Exam System</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Cols 7–8: Student Life & Admissions */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-xs font-bold text-slate-900 uppercase tracking-wider">
              Campus & Life
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/admissions" className="hover:text-sky-700 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Admissions & Age Matcher</span>
                </Link>
              </li>
              <li>
                <Link href="/school-life" className="hover:text-sky-700 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Four Houses Championship</span>
                </Link>
              </li>
              <li>
                <Link href="/academics#labs" className="hover:text-sky-700 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Science & Computer Labs</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-sky-700 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Campus Photo Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-sky-700 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Official Notices Gazette</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-700 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Directions & Visit</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Cols 9–12: Verified Campus Contact Card */}
          <div className="lg:col-span-4">
            <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3">
              <h4 className="font-serif text-sm font-bold text-slate-900">
                Verified Campus Coordinates
              </h4>
              <p className="text-xs text-slate-600 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{SCHOOL_FACTS.address}</span>
              </p>
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-sky-600 shrink-0" />
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
                  <span>Registration Window: 8:00 AM – 1:00 PM</span>
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Sri+Aurobindo+School+Tulsi+Nagar+Bhopal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                >
                  <span>Get Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 4. GIANT ARCHITECTURAL WATERMARK & COPYRIGHT ================= */}
        <div className="pt-8 pb-4">
          <div className="text-[clamp(2.2rem,6.5vw,5.5rem)] font-serif font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-500/15 via-amber-500/15 via-emerald-500/15 to-rose-500/15 select-none text-center uppercase leading-none">
            Sri Aurobindo School · 1989
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {SCHOOL_FACTS.fullName}. All rights reserved. Affiliated to MPBSE.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/about#vision-mission" className="hover:text-slate-900 transition-colors">
              Vision & Mission
            </Link>
            <Link href="/admissions#rules" className="hover:text-slate-900 transition-colors">
              Admission Norms
            </Link>
            <a
              href="https://sas.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors"
            >
              Institutional Portal
            </a>
            {/* Clickable Keyboard Shortcut Pill */}
            <button
              onClick={openAdminModal}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-colors border border-slate-200 cursor-pointer"
              title="Staff & Administrator Gateway (Ctrl + Shift + A)"
            >
              <Command className="w-3 h-3 text-slate-500" />
              <span>Staff Gateway · Ctrl + Shift + A</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
