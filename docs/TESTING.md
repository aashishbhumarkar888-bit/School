# Sri Aurobindo School, Bhopal — Testing & Quality Assurance Protocol

## Automated & Manual Verification Suite

### 1. Functional Tests
- [x] Route Resolution: `/`, `/about`, `/academics`, `/admissions`, `/school-life`, `/gallery`, `/notices`, `/news`, `/events`, `/contact`, `/admin`.
- [x] Four-House Chromatic Switcher: Interactive state updates custom CSS variables and UI accent glows.
- [x] Age Eligibility Matcher: Real-time calculation accurately maps exact age inputs to corresponding classes (Nursery, KG-1, KG-2, Class I, II–XII).
- [x] Admission Enquiry Form: Client validation for names, phone numbers, and email; API route `/api/enquiries` responds with success and a unique submission registration ID.
- [x] Contact Form: Validated message submissions sent to `/api/contact`.
- [x] Gallery & Lightbox: Category filter switching, full-screen image expansion, keyboard dismiss (`Escape`) and arrow controls (`ArrowLeft`, `ArrowRight`).
- [x] Admin Portal: Password-protected access with enquiry lead review and notice manager.

### 2. Accessibility & SEO
- [x] Semantic HTML landmarks (`header`, `main`, `nav`, `section`, `article`, `footer`).
- [x] Dynamic JSON-LD structured data for `EducationalOrganization` on all pages.
- [x] Open Graph & Twitter Cards with verified metadata.
- [x] Reduced-motion compliance via Framer Motion `useReducedMotion()`.
- [x] Accessible contrast ratios meeting WCAG 2.2 AA standards on both Obsidian and Pearl color surfaces.
