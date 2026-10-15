"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HouseSwitcher } from "@/components/ui/HouseSwitcher";
import { MagneticButton } from "@/components/ui/MagneticButton";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MegaItem {
  title: string;
  subtitle: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  color: string;
}

const DISCOVER_ITEMS: MegaItem[] = [
  {
    title: "Heritage & Society",
    subtitle: "SAEC Managing Society founded in July 1989 & Integral Ideals",
    href: "/about",
    icon: Compass,
    badge: "Est. 1989",
    color: "text-sky-600 bg-sky-50 border-sky-200",
  },
  {
    title: "Chairman's Address",
    subtitle: "Shri Umesh Trivedi's vision for holistic student character",
    href: "/about#chairman",
    icon: Award,
    badge: "Leadership",
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
  {
    title: "Campus Photo Gallery",
    subtitle: "Full-screen photo showcase of labs, sports fields & events",
    href: "/gallery",
    icon: Camera,
    badge: "Showcase",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  {
    title: "Campus Location & Visit",
    subtitle: "Auro Mandir Parisar, Tulsi Nagar — Directions & Hours",
    href: "/contact",
    icon: MapPin,
    badge: "Tulsi Nagar",
    color: "text-rose-600 bg-rose-50 border-rose-200",
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const discoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global keydown for Cmd/Ctrl + K
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

  // Close drawers/menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDiscoverOpen(false);
  }, [pathname]);

  const handleDiscoverEnter = () => {
    if (discoverTimeoutRef.current) clearTimeout(discoverTimeoutRef.current);
    setDiscoverOpen(true);
  };

  const handleDiscoverLeave = () => {
    discoverTimeoutRef.current = setTimeout(() => {
      setDiscoverOpen(false);
    }, 200);
  };

  const isDiscoverActive =
    pathname.startsWith("/about") ||
    pathname.startsWith("/gallery") ||
    pathname.startsWith("/contact");

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "py-2 sm:py-3 px-3 sm:px-6"
            : "py-3 sm:py-5 px-4 sm:px-8 bg-gradient-to-b from-white/90 via-white/70 to-transparent backdrop-blur-[2px]"
        )}
      >
        <div
          className={cn(
            "mx-auto transition-all duration-500 ease-out flex items-center justify-between gap-4",
            isScrolled
              ? "max-w-6xl h-16 px-4 sm:px-6 rounded-full bg-white/90 backdrop-blur-2xl shadow-[0_12px_36px_rgba(15,23,42,0.08)] border border-slate-200/90"
              : "max-w-7xl h-16 sm:h-20 px-4 sm:px-6 rounded-3xl bg-white/75 backdrop-blur-xl border border-slate-200/70 shadow-sm"
          )}
        >
          {/* ================= LEFT ZONE: BRAND & CREST ================= */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-3 group select-none"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-400 via-amber-300 to-rose-400 p-[1.5px] shadow-sm group-hover:shadow-md transition-all">
              <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden p-1">
                <Image
                  src="/images/official/logo.png"
                  alt="Sri Aurobindo School Crest"
                  width={36}
                  height={36}
                  className="object-contain"
                  onError={(e) => {
                    // Fallback to text initials if image has issue
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="font-serif font-black text-xs text-slate-800 tracking-wider">
                  SAS
                </span>
              </div>
            </div>
            <div>
              <span className="font-serif font-bold text-slate-900 text-sm sm:text-base tracking-tight leading-tight block group-hover:text-sky-700 transition-colors">
                Sri Aurobindo School
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Bhopal · Est. 1989
              </span>
            </div>
          </Link>

          {/* ================= CENTER ZONE: STRICTLY 5 TOP ITEMS ================= */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/85 backdrop-blur-xl p-1.5 rounded-full border border-slate-200/80 shadow-inner">
            {/* 1. Home */}
            <Link
              href="/"
              className={cn(
                "relative px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-colors cursor-pointer",
                pathname === "/"
                  ? "text-slate-900 font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {pathname === "/" && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 rounded-full bg-white shadow-sm border border-slate-200/80"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <span className="relative z-10">Home</span>
            </Link>

            {/* 2. Discover Mega-Popover */}
            <div
              className="relative"
              onMouseEnter={handleDiscoverEnter}
              onMouseLeave={handleDiscoverLeave}
            >
              <button
                type="button"
                onClick={() => setDiscoverOpen((prev) => !prev)}
                className={cn(
                  "relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-colors cursor-pointer",
                  isDiscoverActive || discoverOpen
                    ? "text-slate-900 font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {isDiscoverActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-white shadow-sm border border-slate-200/80"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10">Discover</span>
                <ChevronDown
                  className={cn(
                    "relative z-10 w-3.5 h-3.5 transition-transform duration-200",
                    discoverOpen ? "rotate-180 text-sky-600" : "text-slate-400"
                  )}
                />
              </button>

              {/* 2-Column Frosted Glass Mega-Popover */}
              <AnimatePresence>
                {discoverOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.12)] p-4 z-50 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-amber-400 via-emerald-400 to-rose-400" />
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 mb-2">
                      Institutional Discoveries
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {DISCOVER_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setDiscoverOpen(false)}
                            className="group p-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200/60"
                          >
                            <div className="flex items-center gap-2.5 mb-1.5">
                              <div
                                className={cn(
                                  "w-7 h-7 rounded-xl flex items-center justify-center border",
                                  item.color
                                )}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                                {item.title}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                              {item.subtitle}
                            </p>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between px-3 text-[11px] text-slate-500">
                      <span>Sri Aurobindo Education Centre · Est. July 1989</span>
                      <Link
                        href="/about"
                        onClick={() => setDiscoverOpen(false)}
                        className="font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                      >
                        Explore Heritage <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Academics */}
            <Link
              href="/academics"
              className={cn(
                "relative px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-colors cursor-pointer",
                pathname.startsWith("/academics")
                  ? "text-slate-900 font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {pathname.startsWith("/academics") && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 rounded-full bg-white shadow-sm border border-slate-200/80"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <span className="relative z-10">Academics</span>
            </Link>

            {/* 4. Houses & Life */}
            <Link
              href="/school-life"
              className={cn(
                "relative px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-colors cursor-pointer",
                pathname.startsWith("/school-life")
                  ? "text-slate-900 font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {pathname.startsWith("/school-life") && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 rounded-full bg-white shadow-sm border border-slate-200/80"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <span className="relative z-10">Houses & Life</span>
            </Link>

            {/* 5. Gazette */}
            <Link
              href="/notices"
              className={cn(
                "relative px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-colors cursor-pointer",
                pathname.startsWith("/notices") || pathname.startsWith("/news") || pathname.startsWith("/events")
                  ? "text-slate-900 font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {(pathname.startsWith("/notices") ||
                pathname.startsWith("/news") ||
                pathname.startsWith("/events")) && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 rounded-full bg-white shadow-sm border border-slate-200/80"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <span className="relative z-10">Gazette</span>
            </Link>
          </nav>

          {/* ================= RIGHT ZONE: HOUSE DOTS, SEARCH & CTA ================= */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {/* Compact 4-House Color Orb Switcher */}
            <div className="hidden sm:block">
              <HouseSwitcher variant="compact" />
            </div>

            {/* ⌘K Search Icon Pill */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/90 hover:bg-slate-50 border border-slate-200 shadow-sm text-slate-600 hover:text-slate-900 text-xs font-medium transition-all group cursor-pointer"
              title="Search Sri Aurobindo School (Ctrl+K or ⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-600 transition-colors" />
              <span className="hidden xl:inline text-slate-400 text-[11px] font-mono">⌘K</span>
            </button>

            {/* Primary Magnetic CTA Button */}
            <Link href="/admissions">
              <MagneticButton
                variant="primary"
                className="py-2 sm:py-2.5 px-4 sm:px-5 text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(37,99,235,0.2)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.3)]"
              >
                <span>Admissions Open</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-2xl text-slate-700 hover:text-slate-900 bg-white/90 border border-slate-200 shadow-sm lg:hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE EXPANDED MENU ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-20 z-40 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 p-5 shadow-2xl lg:hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-1.5 mb-4">
              <Link
                href="/"
                className="px-4 py-2.5 rounded-2xl font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between"
              >
                <span>Home</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-1">
                  Discover
                </span>
                {DISCOVER_ITEMS.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-white hover:text-sky-700 transition-colors"
                  >
                    <span>{item.title}</span>
                    <span className="text-[10px] text-slate-400">{item.badge}</span>
                  </Link>
                ))}
              </div>

              <Link
                href="/academics"
                className="px-4 py-2.5 rounded-2xl font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between"
              >
                <span>Academics & Four Wings</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/school-life"
                className="px-4 py-2.5 rounded-2xl font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between"
              >
                <span>Houses & Student Life</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/notices"
                className="px-4 py-2.5 rounded-2xl font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between"
              >
                <span>Gazette & Circulars</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Mobile House Switcher */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Active House Aura:</span>
              <HouseSwitcher variant="compact" />
            </div>

            {/* Mobile Action Buttons */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link href="/admissions">
                <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2">
                  <span>Admissions Open 2026–27</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full py-2.5 rounded-2xl bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>Search Anything (⌘K)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Quick Search Modal */}
      <QuickSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
