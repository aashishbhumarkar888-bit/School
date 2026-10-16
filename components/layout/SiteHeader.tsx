"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { QuickSearchModal } from "@/components/ui/QuickSearchModal";
import {
  Search,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  BookOpen,
  Award,
  Sparkles,
  MapPin,
  Camera,
  GraduationCap,
  Users,
  Compass,
  ShieldCheck,
  Building2,
  Calendar,
  Briefcase,
  Flame,
  FileText,
  HelpCircle,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownItem {
  title: string;
  subtitle: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

interface DropdownGroup {
  label: string;
  href: string;
  items: DropdownItem[];
}

const NAV_GROUPS: DropdownGroup[] = [
  {
    label: "Discover",
    href: "/about",
    items: [
      {
        title: "Heritage & Society",
        subtitle: "SAEC founded July 1989 & Sri Aurobindo integral ideals",
        href: "/about",
        icon: Compass,
        badge: "Est. 1989",
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      },
      {
        title: "Leadership & Chairman",
        subtitle: "Shri Umesh Trivedi's address & governing charter",
        href: "/leadership",
        icon: Award,
        badge: "Governance",
        badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      },
      {
        title: "MPBSE Affiliation",
        subtitle: "Board credentials, safety compliance & public disclosures",
        href: "/affiliation",
        icon: ShieldCheck,
        badge: "Statutory",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      },
      {
        title: "Campus & Laboratories",
        subtitle: "Auro Mandir Parisar, Science labs & Central Library",
        href: "/campus",
        icon: Building2,
        badge: "Infrastructure",
        badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      },
      {
        title: "Alumni Network",
        subtitle: "35+ years of proud scholars since 1989",
        href: "/alumni",
        icon: Users,
        badge: "Community",
        badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
      },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    items: [
      {
        title: "K–12 Academic Wings",
        subtitle: "Pre-Primary, Primary, Middle & Senior Secondary",
        href: "/academics",
        icon: BookOpen,
        badge: "Nursery–XII",
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      },
      {
        title: "Teaching Methodology",
        subtitle: "Flight Path, Different Strokes & Joy of Flying",
        href: "/methodology",
        icon: Sparkles,
        badge: "Pedagogy",
        badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      },
      {
        title: "Faculty Directory",
        subtitle: "Dedicated mentors and subject specialists",
        href: "/faculty",
        icon: Users,
        badge: "Mentors",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      },
      {
        title: "Three-Term Calendar",
        subtitle: "First Term (Sept), Second (Dec) & Annual (Mar–Apr)",
        href: "/calendar",
        icon: Calendar,
        badge: "Examinations",
        badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
      },
    ],
  },
  {
    label: "Houses & Life",
    href: "/houses",
    items: [
      {
        title: "The Four Houses",
        subtitle: "Teresa, Amartya, Tagore & Raman Championship",
        href: "/houses",
        icon: Flame,
        badge: "Championship",
        badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      },
      {
        title: "Sports & Co-Curriculars",
        subtitle: "Volleyball, Basketball, Badminton, Chess & Table Tennis",
        href: "/school-life",
        icon: Award,
        badge: "Vitality",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      },
      {
        title: "Visual Archive (Gallery)",
        subtitle: "Full-screen photo showcase of authentic campus life",
        href: "/gallery",
        icon: Camera,
        badge: "Gallery",
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      },
      {
        title: "Campus Events",
        subtitle: "Annual celebrations, sports meets & exhibitions",
        href: "/events",
        icon: Calendar,
        badge: "Events",
        badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      },
    ],
  },
  {
    label: "Gazette",
    href: "/notices",
    items: [
      {
        title: "Official Circulars",
        subtitle: "Searchable notices, schedules & downloadable proformas",
        href: "/notices",
        icon: FileText,
        badge: "Gazette",
        badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
      },
      {
        title: "Campus Chronicles",
        subtitle: "Editorial articles, student stories & milestones",
        href: "/news",
        icon: BookOpen,
        badge: "News",
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      },
      {
        title: "Careers at SAS",
        subtitle: "Teaching & administrative opportunities at Tulsi Nagar",
        href: "/careers",
        icon: Briefcase,
        badge: "Hiring",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      },
    ],
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown and mobile menu on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-3 z-50 mx-auto max-w-7xl px-3 sm:px-4">
        <nav
          ref={navRef}
          aria-label="Main Navigation"
          className="relative flex items-center justify-between rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)] px-4 py-2.5 sm:px-5 sm:py-3 transition-all"
        >
          {/* ================= LEFT ZONE: BRAND IDENTITY ================= */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
            aria-label="Sri Aurobindo School, Bhopal - Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-slate-50 border border-slate-200/80 p-0.5 shrink-0 shadow-xs group-hover:border-blue-400 transition-colors">
              <Image
                src="/images/official/logo.png"
                alt="Sri Aurobindo School Crest"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-sm sm:text-base tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
                SRI AUROBINDO SCHOOL
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 tracking-wider">
                BHOPAL · EST. JULY 1989
              </span>
            </div>
          </Link>

          {/* ================= CENTER ZONE: STRUCTURED NAVIGATION ================= */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {/* Home Link */}
            <Link
              href="/"
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors",
                pathname === "/"
                  ? "text-blue-700 bg-blue-50/80 font-bold"
                  : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/70"
              )}
            >
              Home
            </Link>

            {/* Dropdown Groups */}
            {NAV_GROUPS.map((group) => {
              const isOpen = activeDropdown === group.label;
              const isGroupActive = group.items.some((item) => pathname === item.href);

              return (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(group.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() =>
                      setActiveDropdown((prev) => (prev === group.label ? null : group.label))
                    }
                    className={cn(
                      "inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer",
                      isGroupActive || isOpen
                        ? "text-blue-700 bg-blue-50/80 font-bold"
                        : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/70"
                    )}
                    aria-expanded={isOpen}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200 text-slate-400",
                        isOpen && "rotate-180 text-blue-700"
                      )}
                    />
                  </button>

                  {/* Mega-Dropdown Flyout */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.12)] p-2 z-50 overflow-hidden"
                      >
                        <div className="space-y-1">
                          {group.items.map((item) => {
                            const Icon = item.icon;
                            const isItemActive = pathname === item.href;

                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setActiveDropdown(null)}
                                className={cn(
                                  "group flex items-start gap-3 p-2.5 rounded-xl transition-all",
                                  isItemActive
                                    ? "bg-blue-50/80 text-blue-900"
                                    : "hover:bg-slate-50 text-slate-700 hover:text-slate-950"
                                )}
                              >
                                <div
                                  className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors mt-0.5",
                                    isItemActive
                                      ? "bg-blue-600 text-white border-blue-600"
                                      : "bg-slate-50 border-slate-200 text-slate-600 group-hover:border-blue-300 group-hover:text-blue-700 group-hover:bg-blue-50"
                                  )}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-xs font-bold leading-tight truncate">
                                      {item.title}
                                    </span>
                                    {item.badge && (
                                      <span
                                        className={cn(
                                          "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border shrink-0",
                                          item.badgeColor || "bg-slate-100 text-slate-600 border-slate-200"
                                        )}
                                      >
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-slate-500 leading-snug line-clamp-1 mt-0.5">
                                    {item.subtitle}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Direct Contact Link */}
            <Link
              href="/contact"
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors",
                pathname === "/contact"
                  ? "text-blue-700 bg-blue-50/80 font-bold"
                  : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/70"
              )}
            >
              Contact
            </Link>
          </div>

          {/* ================= RIGHT ZONE: ACTION & PORTAL BAR ================= */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Command Search (Ctrl+K) */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200/60 text-slate-600 hover:text-slate-900 text-xs font-medium transition-colors cursor-pointer"
              aria-label="Quick Search"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[11px]">Search</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.2 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Student Portal CTA */}
            <Link
              href="/student/login"
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all shadow-2xs",
                pathname.startsWith("/student")
                  ? "bg-blue-50 border-blue-300 text-blue-700 font-bold"
                  : "bg-white hover:bg-slate-50 border-slate-200/90 text-slate-800 hover:text-blue-700 hover:border-blue-200"
              )}
            >
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Student</span> Portal
            </Link>

            {/* Admissions CTA (High Contrast Royal Sapphire) */}
            <Link
              href="/admissions"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 shadow-md shadow-blue-600/20 hover:brightness-105 active:scale-95 transition-all"
            >
              <span>Admissions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-1.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* ================= MOBILE NAVIGATION DRAWER ================= */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2 rounded-2xl bg-white border border-slate-200 shadow-xl p-4 max-h-[82vh] overflow-y-auto space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Navigation Menu
                </span>
                <button
                  onClick={() => setSearchOpen(true)}
                  className="inline-flex items-center gap-1 text-xs text-blue-700 font-semibold"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search site</span>
                </button>
              </div>

              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
                    {group.label}
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                      >
                        <span className="truncate">{item.title}</span>
                        {item.badge && (
                          <span className="text-[10px] text-slate-500 font-normal">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Contact Campus & Directions
                </Link>
                <Link
                  href="/student/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Student & Parent Portal Login</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Quick Search Modal */}
      <QuickSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
