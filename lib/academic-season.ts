export interface AcademicSessionConfig {
  sessionYear: string;
  commencementMonth: string;
  registrationOpenDate: string;
  counterTimings: string;
  registrationFee: string;
  midSessionBanner: {
    status: string;
    subtext: string;
    actionLabel: string;
  };
}

export const CURRENT_ACADEMIC_SEASON: AcademicSessionConfig = {
  sessionYear: "2026–27",
  commencementMonth: "June",
  registrationOpenDate: "15th June Onwards",
  counterTimings: "8:00 AM – 1:00 PM (Monday – Saturday)",
  registrationFee: "₹100/- (Rs. 100/-)",
  midSessionBanner: {
    status: "Regular Session 2026–27 in Progress",
    subtext:
      "The 2026–27 regular academic session commenced in June. For the upcoming June 2027–28 session, priority registration notifications are open. For Classes II through XII, mid-session vacancy transfer inquiries are accepted at the School Office.",
    actionLabel: "Join 2027–28 Priority Waitlist / Vacancy Inquiry",
  },
};

export const VERIFIED_AGE_CRITERIA = [
  { grade: "Nursery", minAge: "2½ Years", maxAge: "3 Years", cutoffNote: "As on session commencement in June" },
  { grade: "KG-1 (LKG)", minAge: "3½ Years", maxAge: "4 Years", cutoffNote: "As on session commencement in June" },
  { grade: "KG-2 (UKG)", minAge: "4½ Years", maxAge: "4½+ Years", cutoffNote: "As on session commencement in June" },
  { grade: "Class I (1st)", minAge: "5½ Years", maxAge: "6 Years", cutoffNote: "As on session commencement in June" },
  { grade: "Classes II to XII", minAge: "Age Appropriate", maxAge: "Board Standards", cutoffNote: "Subject to vacancy & valid Transfer Certificate (TC)" },
];
