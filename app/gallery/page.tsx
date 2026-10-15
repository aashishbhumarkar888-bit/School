"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GALLERY_ITEMS, HOUSES } from "@/lib/content/school-data";
import { GalleryItem } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Tag,
  Shield,
  Camera,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Campus", "Academics", "Sports", "Cultural"] as const;

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;

      if (e.key === "Escape") {
        setActiveItem(null);
      } else if (e.key === "ArrowRight") {
        const currentIndex = filteredItems.findIndex((it) => it.id === activeItem.id);
        const nextIndex = (currentIndex + 1) % filteredItems.length;
        setActiveItem(filteredItems[nextIndex]);
      } else if (e.key === "ArrowLeft") {
        const currentIndex = filteredItems.findIndex((it) => it.id === activeItem.id);
        const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        setActiveItem(filteredItems[prevIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, filteredItems]);

  return (
    <div className="bg-[#FCFBF9] text-slate-900 min-h-screen">
      {/* ================= 1. HEADER BANNER ================= */}
      <section className="relative py-20 bg-gradient-to-b from-sky-50/70 via-white to-[#FCFBF9] border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 shadow-xs inline-flex items-center gap-1.5 mb-4">
              <Camera className="w-3.5 h-3.5 text-sky-600" />
              <span>Visual Chronicles · Auro Mandir Parisar</span>
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 mt-2 tracking-tight leading-tight">
              Life at Auro Mandir Parisar
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
              Explore authentic glimpses into daily life at Sri Aurobindo School: our green campus,
              hands-on science laboratories, central library, and inter-house athletic tournaments.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 2. INTERACTIVE FILTER BAR ================= */}
      <section className="py-8 bg-white border-b border-slate-200/80 sticky top-16 sm:top-20 z-30 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "relative px-5 py-2 text-xs font-bold rounded-full transition-colors cursor-pointer",
                    isSelected ? "text-white" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="galleryCatPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 3. PHOTO GRID SHOWCASE WITH REAL IMAGES ================= */}
      <section className="py-16 bg-[#FCFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredItems.map((item) => {
                const house = item.houseTag ? HOUSES[item.houseTag] : null;
                const imgSrc = item.imageUrl || "/images/official/event-01.jpg";
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setActiveItem(item)}
                    className="group relative rounded-3xl bg-white border border-slate-200/90 overflow-hidden cursor-pointer hover:border-slate-300 transition-all shadow-xs hover:shadow-lg hover:-translate-y-1"
                  >
                    {/* Real Photograph with Next/Image */}
                    <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={imgSrc}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-white text-xs font-bold inline-flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>View Fullscreen</span>
                        </span>
                      </div>

                      {/* Top Category Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-slate-800 backdrop-blur-md shadow-xs border border-slate-200">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Metadata Card Footer */}
                    <div className="p-4 bg-white space-y-1">
                      <h4 className="text-sm font-bold font-serif text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{item.caption}</p>
                      {house && (
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: house.accentHex }}
                          />
                          <span>{house.name}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ================= 4. FULLSCREEN LIGHTBOX MODAL WITH REAL IMAGES ================= */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setActiveItem(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md cursor-pointer z-50 transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const curIdx = filteredItems.findIndex((it) => it.id === activeItem.id);
                const prev = (curIdx - 1 + filteredItems.length) % filteredItems.length;
                setActiveItem(filteredItems[prev]);
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md cursor-pointer z-50 transition-colors"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const curIdx = filteredItems.findIndex((it) => it.id === activeItem.id);
                const nxt = (curIdx + 1) % filteredItems.length;
                setActiveItem(filteredItems[nxt]);
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md cursor-pointer z-50 transition-colors"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full rounded-2xl bg-slate-100 overflow-hidden mb-6 border border-slate-200">
                <Image
                  src={activeItem.imageUrl || "/images/official/event-01.jpg"}
                  alt={activeItem.title}
                  fill
                  sizes="900px"
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-sky-800 border border-sky-200">
                      {activeItem.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Ref: {activeItem.id}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 font-serif">{activeItem.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">{activeItem.caption}</p>
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  <span>Use ← → keys to navigate</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
