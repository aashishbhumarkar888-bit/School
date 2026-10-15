# Sri Aurobindo School, Bhopal — Design System & Chromatic Engine

## 1. Creative Philosophy & Visual Concept

Sri Aurobindo School's digital identity blends timeless academic dignity with 21st-century tactile digital craftsmanship. The design system is anchored in the school's Four Official Houses, alternating between:
- **Obsidian Dark / Cosmic Ink (#070B14 / #0B1120):** Used for cinematic sections (Hero, Four-House Championship Portal, Savitri Verse Monument, Admission Concierge), where multi-layered aurora glows and glowing border bento cards create an awe-inspiring first impression.
- **Luminous Pearl / Warm Ivory (#F8FAFC / #FFFFFF / #F7F5EF):** Used for content-heavy and readability-focused sections (Academics detail, Detailed Admission Roadmap, Board Exam regulations, Gazette).

---

## 2. The Four-House Chromatic Palette

| House | Patron | Core Gradient Stops | CSS Variable | UI Domain |
|---|---|---|---|---|
| **Teresa House** | Mother Teresa | `#0EA5E9` → `#2563EB` → `#1E3A8A` | `--house-teresa` | Community, Pre-Primary, Empathy & Care |
| **Amartya House** | Amartya Sen | `#FDE047` → `#F59E0B` → `#B45309` | `--house-amartya` | Academic Wings, Savitri Monument, Scholarship |
| **Tagore House** | Rabindranath Tagore | `#34D399` → `#10B981` → `#064E3B` | `--house-tagore` | Arts, Parisar Greenery, Library & Environment |
| **Raman House** | Sir C.V. Raman | `#FB7185` → `#EF4444` → `#881337` | `--house-raman` | Laboratories, Sports, High-Intent CTAs |

---

## 3. Typography Stack

- **Display & Headings:** `Cinzel` / Classic Serif fallback — evokes architectural permanence, monumental dignity, and philosophical depth.
- **Body & Interface:** `Inter` / Modern Sans — crisp geometric readability at all scales, optimized for tabular data and admission forms.

---

## 4. Custom Motion & Interactive Primitives (Framer Motion)

1. **Aurora Mesh & Cursor Spotlight:**
   - Mouse coordinate tracking via `useMotionValue` & `useMotionTemplate`.
   - Projects soft radial illuminations (`radial-gradient(circle 350px at ${mouseX}px ${mouseY}px, ...)`).
2. **3D Tilt & Glowing Border Bento Grid (SpotlightCard):**
   - Perspective 3D rotation (`rotateX`, `rotateY`) governed by `useSpring(..., { stiffness: 300, damping: 30 })`.
   - Cursor-following 1px gradient border highlight on card perimeter.
3. **Floating Glass Dock Navigation:**
   - Pill-shaped glassmorphism (`backdrop-blur-xl bg-slate-950/75 border border-white/10`).
   - Smooth `layoutId="activePill"` spring animation on route change.
4. **House Spirit Switcher (Global & Section-Level):**
   - Clickable / hoverable selector dynamically shifting `--active-house-glow` and accent highlights across components.
5. **Interactive Admission Age Calculator:**
   - Real-time grade eligibility matching based on exact birthdate / age bracket inputs.
   - Smooth card highlight with dynamic confetti celebration.
