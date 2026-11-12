import React from "react";
import Image from "next/image";

interface SchoolCrestLogoProps {
  variant?: "seal-only" | "full-lockup" | "emblem-lockup" | "stacked-official";
  className?: string;
  size?: number;
  theme?: "light" | "dark";
}

export function SchoolCrestLogo({
  variant = "emblem-lockup",
  className = "",
  size = 44,
  theme = "light",
}: SchoolCrestLogoProps) {
  // If user requested the stacked official logo (crest centered directly above the calligraphy text)
  if (variant === "stacked-official") {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <Image
          src={
            theme === "dark"
              ? "/images/official/official-user-logo-white.png"
              : "/images/official/official-user-logo-transparent.png"
          }
          alt="Sri Aurobindo School Official Emblem & Wordmark"
          width={260}
          height={87}
          className="h-14 w-auto object-contain hover:scale-105 transition-transform"
          priority
        />
      </div>
    );
  }

  // Circular / Rounded emblem graphic containing the authentic Sri Aurobindo geometric seal
  const emblemGraphic = (
    <div
      className={`relative shrink-0 rounded-2xl bg-gradient-to-br from-blue-50/90 via-white to-slate-50 border border-blue-600/25 shadow-xs p-1 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-blue-600/60 group-hover:shadow-md ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image
        src="/images/official/seal-crest.png"
        alt="Sri Aurobindo School Official Seal"
        width={size}
        height={size}
        className="object-contain p-0.5 group-hover:scale-105 transition-transform"
        priority
      />
    </div>
  );

  if (variant === "seal-only") {
    return emblemGraphic;
  }

  return (
    <div className="flex items-center gap-3 select-none">
      {emblemGraphic}
      <div className="flex flex-col justify-center">
        {/* Official calligraphy wordmark image on desktop, with sharp typographic fallback */}
        <div className="hidden sm:block">
          <Image
            src={
              theme === "dark"
                ? "/images/official/school-wordmark-white.png"
                : "/images/official/school-wordmark-blue.png"
            }
            alt="Sri Aurobindo School"
            width={180}
            height={27}
            className="h-6 w-auto object-contain object-left group-hover:brightness-110 transition-all"
            priority
          />
        </div>
        <div className="sm:hidden flex flex-col">
          <span className="font-serif font-bold text-sm tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
            SRI AUROBINDO SCHOOL
          </span>
        </div>
        <span className="text-[9px] sm:text-[9.5px] font-bold uppercase tracking-[0.18em] text-blue-700 whitespace-nowrap mt-0.5">
          BHOPAL · EST. JULY 1989 · MPBSE
        </span>
      </div>
    </div>
  );
}
