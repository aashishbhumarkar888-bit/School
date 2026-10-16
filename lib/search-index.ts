export interface SearchEntry {
  id: string;
  title: string;
  href: string;
  category: "Pages & Portals" | "Academic Rules" | "Official Notices" | "Quick Actions";
  description: string;
  keywords: string[];
}

export interface InstantAnswerCard {
  triggerKeywords: string[];
  type: "contact" | "admission" | "exam" | "houses" | "timings";
  title: string;
  headline: string;
  details: string[];
  actionLabel: string;
  actionHref: string;
}

export const INSTANT_ANSWERS: InstantAnswerCard[] = [
  {
    triggerKeywords: ["phone", "call", "contact", "number", "address", "location", "map", "where", "reach", "email"],
    type: "contact",
    title: "Campus Location & Direct Contact",
    headline: "0755-2558286 · aurobhopal@gmail.com",
    details: [
      "Auro Mandir Parisar, Behind Kannad Bhawan",
      "2nd Stop, Tulsi Nagar, Bhopal – 462003 (M.P.)",
      "Office Desk Active: Mon–Sat 7:45 AM – 1:30 PM",
    ],
    actionLabel: "Open Contact & Directions",
    actionHref: "/contact",
  },
  {
    triggerKeywords: ["age", "nursery", "kg", "kg-1", "kg-2", "eligibility", "admission", "fee", "registration", "form", "apply", "enquiry"],
    type: "admission",
    title: "Admission Criteria & Age Eligibility (2026–27)",
    headline: "Registration Commences 15th June · 8:00 AM – 1:00 PM",
    details: [
      "Nursery: 2½ – 3 Years · KG-1: 3½ – 4 Years",
      "KG-2: 4½ Years · Class I: 5½ Years as of 30th June",
      "Registration Proforma Fee: Rs. 100/- + Official Birth Certificate",
    ],
    actionLabel: "Launch Admission Concierge",
    actionHref: "/admissions",
  },
  {
    triggerKeywords: ["exam", "term", "result", "promotion", "marks", "grade", "percentage", "supplementary", "pass"],
    type: "exam",
    title: "Three-Term Examination Architecture",
    headline: "First Term (Sept) · Second Term (Dec) · Annual (Mar–Apr)",
    details: [
      "Minimum Passing Threshold: 33% – 40% as per MPBSE rules",
      "Theory Marks + Laboratory Viva-Voce Assessment",
      "Cumulative internal evaluation up to Class VIII",
    ],
    actionLabel: "View Examination Bylaws",
    actionHref: "/academics",
  },
  {
    triggerKeywords: ["house", "teresa", "amartya", "tagore", "raman", "championship", "trophy", "shield", "spirit"],
    type: "houses",
    title: "The Four Institutional Houses",
    headline: "Teresa (Blue) · Amartya (Gold) · Tagore (Green) · Raman (Red)",
    details: [
      "Named after Mother Teresa, Amartya Sen, Rabindranath Tagore, Sir C.V. Raman",
      "Year-round athletic meets, science model debates & cultural arts",
      "Annual Inter-House Rolling Trophy Championship",
    ],
    actionLabel: "Explore Houses & Take Quiz",
    actionHref: "/houses",
  },
  {
    triggerKeywords: ["timing", "hours", "open", "schedule", "time", "bell", "assembly"],
    type: "timings",
    title: "Daily Campus Timetable & School Hours",
    headline: "School Hours: 7:45 AM – 1:30 PM (Mon–Sat)",
    details: [
      "Morning Assembly & Spiritual Contemplation: 7:45 AM",
      "Admission & Registration Desk: 8:00 AM – 1:00 PM",
      "Mandatory Central Library Reading Hour scheduled daily for all wings",
    ],
    actionLabel: "View Daily Schedule & Timetable",
    actionHref: "/campus",
  },
];

export const MASTER_SEARCH_INDEX: SearchEntry[] = [
  {
    id: "home",
    title: "Flagship Institutional Homepage",
    href: "/",
    category: "Pages & Portals",
    description: "Overview of Auro Mandir Parisar, Savitri Monument, and Four-House championship.",
    keywords: ["home", "main", "sri aurobindo school", "bhopal", "index"],
  },
  {
    id: "about",
    title: "Institutional Heritage & SAEC (Founded July 1989)",
    href: "/about",
    category: "Pages & Portals",
    description: "History of Sri Aurobindo Education Centre, registered constitution, and 6 core aims.",
    keywords: ["about", "heritage", "history", "saec", "1989", "society", "constitution"],
  },
  {
    id: "leadership",
    title: "Leadership & Chairman Shri Umesh Trivedi",
    href: "/leadership",
    category: "Pages & Portals",
    description: "Executive spotlight, Principal vision, governing body, and parent-teacher synergy.",
    keywords: ["leadership", "chairman", "umesh trivedi", "principal", "governance", "committee"],
  },
  {
    id: "affiliation",
    title: "MPBSE Affiliation & Mandatory Public Disclosures",
    href: "/affiliation",
    category: "Academic Rules",
    description: "State board accreditation credentials, fire safety, lab compliance, and promotion rules.",
    keywords: ["affiliation", "mpbse", "board", "disclosure", "safety", "fire", "regulations"],
  },
  {
    id: "academics",
    title: "K–12 Academic Architecture & Three-Term Exam System",
    href: "/academics",
    category: "Academic Rules",
    description: "Pre-primary to senior secondary wings, curriculum matrix, pass criteria (33%-40%).",
    keywords: ["academics", "curriculum", "syllabus", "wings", "exams", "primary", "secondary"],
  },
  {
    id: "methodology",
    title: "Pedagogy: Flight Path, Different Strokes & Joy of Flying",
    href: "/methodology",
    category: "Academic Rules",
    description: "Howard Gardner Multiple Intelligences matrix, experiential models, and holistic growth.",
    keywords: ["methodology", "flight path", "different strokes", "joy of flying", "gardner", "pedagogy"],
  },
  {
    id: "campus",
    title: "Campus Infrastructure, Science Labs & Central Library",
    href: "/campus",
    category: "Pages & Portals",
    description: "Physics/Chemistry/Biology laboratories, smart classrooms, sports ground, daily library hour.",
    keywords: ["campus", "labs", "library", "infrastructure", "smart class", "physics", "chemistry"],
  },
  {
    id: "houses",
    title: "The Four Houses Championship Hub",
    href: "/houses",
    category: "Pages & Portals",
    description: "Teresa, Amartya, Tagore, and Raman house standings, house captains, and spirit quiz.",
    keywords: ["houses", "teresa", "amartya", "tagore", "raman", "championship", "quiz"],
  },
  {
    id: "school-life",
    title: "Sports, Co-Curriculars & Student Life",
    href: "/school-life",
    category: "Pages & Portals",
    description: "Volleyball, basketball, badminton, chess, carrom, table tennis, and literary clubs.",
    keywords: ["sports", "co-curricular", "volleyball", "basketball", "chess", "athletics"],
  },
  {
    id: "faculty",
    title: "Faculty Directory & Academic Mentors",
    href: "/faculty",
    category: "Pages & Portals",
    description: "Directory of qualified educators across Pre-Primary, Science, Maths, Languages, and IT.",
    keywords: ["faculty", "teachers", "staff", "mentors", "educators", "pgt", "tgt", "prt"],
  },
  {
    id: "admissions",
    title: "Admissions Concierge & Child Age Calculator",
    href: "/admissions",
    category: "Pages & Portals",
    description: "Eligibility calculator, 4-step registration guide, fee overview, and online enquiry form.",
    keywords: ["admission", "apply", "age", "eligibility", "calculator", "registration", "fees"],
  },
  {
    id: "calendar",
    title: "Three-Term Academic & Examination Calendar",
    href: "/calendar",
    category: "Academic Rules",
    description: "Month-by-month session schedule from June opening through September, December, and Annual exams.",
    keywords: ["calendar", "dates", "schedule", "holidays", "terms", "vacations"],
  },
  {
    id: "gallery",
    title: "Official Visual Archive & Photo Documentary",
    href: "/gallery",
    category: "Pages & Portals",
    description: "Authentic documentary photography of science experiments, cultural functions, and sports.",
    keywords: ["gallery", "photos", "images", "pictures", "events", "campus"],
  },
  {
    id: "notices",
    title: "Official Gazette & Circulars",
    href: "/notices",
    category: "Official Notices",
    description: "Searchable circulars, admission notifications, and exam schedules with printable views.",
    keywords: ["notices", "circulars", "gazette", "announcements", "admit card"],
  },
  {
    id: "events",
    title: "Upcoming Campus Events & Sports Meets",
    href: "/events",
    category: "Official Notices",
    description: "Inter-house competitions, Sri Aurobindo Jayanti, and science exhibition schedules.",
    keywords: ["events", "competitions", "sports meet", "annual day", "science fair"],
  },
  {
    id: "news",
    title: "Campus Chronicles & Educational Dispatches",
    href: "/news",
    category: "Official Notices",
    description: "Student articles, science model achievements, and board examination merit list news.",
    keywords: ["news", "articles", "chronicles", "updates", "blog"],
  },
  {
    id: "alumni",
    title: "SAEC Alumni Network Since 1989",
    href: "/alumni",
    category: "Pages & Portals",
    description: "Alumni registry, graduate journeys across 35+ years, and mentorship connections.",
    keywords: ["alumni", "graduates", "network", "past students", "saec 1989"],
  },
  {
    id: "careers",
    title: "Careers & Faculty Recruitment Portal",
    href: "/careers",
    category: "Pages & Portals",
    description: "Teaching vacancies (PGT, TGT, PRT, ECCE) and interactive educator application form.",
    keywords: ["careers", "jobs", "recruitment", "hiring", "apply teacher", "vacancies"],
  },
  {
    id: "contact",
    title: "Campus Connect, Location & Inquiry Desk",
    href: "/contact",
    category: "Pages & Portals",
    description: "Directions to Auro Mandir Parisar, phone 0755-2558286, email, and live office hours.",
    keywords: ["contact", "phone", "email", "address", "location", "tulsi nagar", "map"],
  },
  {
    id: "student-portal",
    title: "Student & Parent Digital Campus Gateway",
    href: "/student/login",
    category: "Pages & Portals",
    description: "Sign in with Scholar ID or activate new account for report cards, timetable, and 3D ID card.",
    keywords: ["student login", "parent portal", "report card", "marks", "attendance", "id card"],
  },
  {
    id: "admin-center",
    title: "Executive Admin Command Center",
    href: "/admin",
    category: "Pages & Portals",
    description: "ERP telemetries, Kanban admission pipeline, House points manager, and CSV data export.",
    keywords: ["admin", "erp", "command center", "dashboard", "staff login", "pipeline"],
  },
];
