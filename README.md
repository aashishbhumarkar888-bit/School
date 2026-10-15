# Sri Aurobindo School, Bhopal — Official Portal & Digital Platform

> **Next-Generation Interactive Digital Platform, Four-House Chromatic Architecture & Framer Motion Experience**  
> **Official Reference:** [https://sas.edu.in/](https://sas.edu.in/)  
> **Managing Body:** Sri Aurobindo Education Centre (SAEC), Bhopal (Est. July 1989)  
> **Affiliation:** Madhya Pradesh Board of Secondary Education (MPBSE), Co-educational K–12  
> **Campus Address:** Auro Mandir Parisar, Behind Kannad Bhawan, 2nd Stop, Tulsi Nagar, Bhopal, MP – 462003  

---

## 1. Project Overview

This project is a bespoke, 21st-century digital platform engineered for **Sri Aurobindo School, Bhopal**. It replaces outdated, generic static templates with an interactive, emotionally resonant, and rigorously fact-grounded web application.

### Key Architectural Highlights:
1. **Four-House Chromatic Architecture:**
   - **Teresa House (Blue):** `#0EA5E9 → #2563EB → #1E3A8A` (Compassion, community service, pre-primary care)
   - **Amartya House (Yellow):** `#FDE047 → #F59E0B → #B45309` (Wisdom, scholarship, Savitri dawn monument)
   - **Tagore House (Green):** `#34D399 → #10B981 → #064E3B` (Creative arts, literature, Parisar nature)
   - **Raman House (Red):** `#FB7185 → #EF4444 → #881337` (Laboratories, athletics, high-intent CTAs)
   - **Dual-Surface Rhythm:** Deep Obsidian/Cosmic Ink (`#070B14 / #0B1120`) and Luminous Pearl (`#F8FAFC / #FFFFFF`).
2. **Framer Motion & 21st.dev Primitives:**
   - Aurora mesh & cursor-tracking spotlight hero.
   - Interactive Four-House championship portal with live accent switching.
   - 3D perspective tilt & glowing border Bento Grid (`SpotlightCard`).
   - Kinetic Savitri Verse Monument with sequential scroll-illuminated typography.
   - Floating glass dock navigation bar with sliding `layoutId` pill indicators.
   - High-conversion interactive admission concierge & age calculator with celebratory confetti.
   - Shared-layout filterable Lightbox gallery with keyboard navigation.
3. **100% Verified Institutional Source of Truth:**
   - No fabricated counters or stock template statistics.
   - Authentic Three-Term Examination cycle (September, December, March–April).
   - Documented age eligibility rules (Nursery 2½–3 yrs, KG-1 3½–4 yrs, KG-2 4½ yrs, Class I 5½ yrs).
   - Real office window: 8:00 AM – 1:00 PM on working days.

---

## 2. Technology Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript 5+ (Strict Mode)
- **Styling:** Tailwind CSS + Custom CSS Properties + Glassmorphism
- **Animations:** Framer Motion (`useMotionValue`, `useMotionTemplate`, `useSpring`, `AnimatePresence`, `layoutId`)
- **Icons:** Lucide React
- **Confetti:** Canvas-Confetti
- **SEO & Structured Data:** Schema.org `EducationalOrganization` JSON-LD, Open Graph, Twitter Cards, 301 Redirects for legacy `.html` routes.

---

## 3. Directory Structure

```
├── app/
│   ├── about/page.tsx               # Heritage, SAEC Timeline, Chairman message, 6 Aims
│   ├── academics/page.tsx           # Four Wings, 3-Term Exam System, Science Labs
│   ├── admissions/page.tsx          # Age Concierge, 4-step roadmap, Enquiry Form, FAQs
│   ├── school-life/page.tsx         # Four Houses deep-dive, athletics, sports arena
│   ├── gallery/page.tsx             # Filterable Bento gallery + Framer Motion Lightbox
│   ├── notices/page.tsx             # Searchable Gazette & Circulars
│   ├── notices/[id]/page.tsx        # Circular Reader & Document Simulator
│   ├── news/page.tsx                # News Journal & Campus Highlights
│   ├── news/[slug]/page.tsx         # Article Detail Page
│   ├── events/page.tsx              # Three-term academic milestones & events
│   ├── contact/page.tsx             # Coordinates, Map card, Validated Message Form
│   ├── admin/page.tsx               # Password-protected staff console (enquiries & notes)
│   ├── api/
│   │   ├── enquiries/route.ts       # Validated admission enquiry persistence
│   │   └── contact/route.ts         # Validated message persistence
│   ├── not-found.tsx                # Custom 404 handler
│   ├── globals.css                  # Custom house variables & glass utilities
│   └── layout.tsx                   # Root layout, fonts, header, footer & JSON-LD
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx           # Floating glass dock with layoutId active pill
│   │   └── SiteFooter.tsx           # Chromatic 4-house strip, sitemap, coordinates
│   └── ui/
│       ├── SpotlightCard.tsx        # 3D tilt + cursor perimeter border glow
│       ├── AuroraBackground.tsx     # 4-House aurora mesh with cursor tracking
│       ├── MagneticButton.tsx       # Physics spring magnetic button
│       ├── HouseSwitcher.tsx        # Interactive house aura toggle
│       ├── AgeEligibilityCalculator.tsx # Instant grade calculator & confetti
│       └── SavitriMonument.tsx      # Kinetic scroll-illuminated typography
├── docs/
│   ├── SCHOOL_CONTENT_AUDIT.md      # Verified institutional facts audit
│   ├── DESIGN_SYSTEM.md             # Chromatic palette & tokens
│   ├── CONTENT_MIGRATION.md         # Legacy HTML URL 301 redirects
│   ├── DEPLOYMENT.md                # Production hosting instructions
│   ├── TESTING.md                   # QA & verification report
│   └── BUILD_PROGRESS.md            # Execution phase log
└── lib/
    ├── content/school-data.ts       # Verified single source of truth
    ├── types/index.ts               # Strict TypeScript definitions
    └── utils.ts                     # Class merge & formatting helpers
```

---

## 4. Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
http://localhost:3000

# 4. Run production build verification
npm run build

# 5. Start production server
npm start
```

### Administrative Console Credentials:
- URL: `/admin`
- Default Key: `aurobindo@1989`
- Functionality: View parent admission enquiries, contact notes, and verified institutional facts.
