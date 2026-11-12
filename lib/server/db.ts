import fs from "fs";
import path from "path";
import { hashSecret } from "./security";

export interface StudentRecord {
  scholarId: string;
  rollNumber: string;
  dob: string; // YYYY-MM-DD
  passwordHash: string;
  name: string;
  classSection: string;
  house: "teresa" | "amartya" | "tagore" | "raman";
  attendance: number;
  overallScore: number;
  termMarks: {
    term1: { total: number; max: number; percentage: number };
    term2: { total: number; max: number; percentage: number };
    term3: { total: number; max: number; percentage: number };
  };
  feeStatus: {
    term1: "Paid" | "Pending";
    term2: "Paid" | "Pending";
    term3: "Paid" | "Pending";
  };
  libraryBooks: Array<{ title: string; issueDate: string; dueDate: string }>;
  assignments: Array<{ title: string; subject: string; status: "Submitted" | "Pending"; dueDate: string }>;
  createdAt: string;
}

export interface AdminRecord {
  username: string;
  email: string;
  passwordHash: string;
  role: "superadmin" | "principal" | "admission_officer";
  name: string;
  createdAt: string;
}

export interface AdmissionEnquiry {
  id: string;
  referenceNo: string;
  studentName: string;
  dob: string;
  targetClass: string;
  parentName: string;
  phone: string;
  email: string;
  status: "New Enquiry" | "Verified" | "Interaction" | "Admitted";
  notes?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  referenceNo: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: "Unread" | "Replied" | "Archived";
  createdAt: string;
}

export interface NoticeRecord {
  id: string;
  code: string;
  title: string;
  category: "Academic" | "Examination" | "Admission" | "General";
  date: string;
  priority: "High" | "Normal" | "Urgent";
  body: string;
  pinned: boolean;
}

export interface FeeScheduleItem {
  id: string;
  grade: string;
  registrationFee: string; // "₹100 (Verified)"
  admissionFee: string;
  tuitionFee: string;
  annualCharges: string;
  transportCharges: string;
  verificationStatus: "Confirmed by SAEC Office" | "As per Official SAEC Office Schedule — Confirm at School Office";
  updatedAt: string;
}

export interface AdmissionSettings {
  activeSession: string;
  registrationOpenDate: string;
  officeHours: string;
  locationText: string;
  midSessionStatusNotice: string;
  proformaFee: string;
}

export interface GalleryItemRecord {
  id: string;
  title: string;
  category: "Campus & Parisar" | "Science Labs" | "Central Library" | "Sports & Grounds" | "Cultural & Heritage";
  imageUrl: string;
  caption: string;
  featured: boolean;
}

export interface AchievementItemRecord {
  id: string;
  title: string;
  category: "Institutional Milestone" | "Academic Framework" | "Science & Innovation" | "House Championship" | "Literary & Cultural";
  yearOrTerm: string;
  description: string;
  verifiedStatus: string;
}

export interface EventRecord {
  id: string;
  title: string;
  date: string;
  term: "First Term" | "Second Term" | "Annual Term" | "Co-Curricular";
  location: string;
  summary: string;
}

export interface SchoolDatabase {
  students: StudentRecord[];
  admins: AdminRecord[];
  enquiries: AdmissionEnquiry[];
  contacts: ContactMessage[];
  notices: NoticeRecord[];
  housePoints: {
    teresa: number;
    amartya: number;
    tagore: number;
    raman: number;
  };
  feeSchedule: FeeScheduleItem[];
  admissionSettings: AdmissionSettings;
  galleryItems: GalleryItemRecord[];
  achievements: AchievementItemRecord[];
  events: EventRecord[];
}

const isServerless = process.env.VERCEL === "1" || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
const DB_PATH = isServerless
  ? path.join("/tmp", "school-db.json")
  : path.join(process.cwd(), "data", "school-db.json");

// In-memory cache for ultra-fast serverless execution
let memoryDb: SchoolDatabase | null = null;

function getInitialDatabase(): SchoolDatabase {
  return {
    students: [
      {
        scholarId: "SAS-2026-1042",
        rollNumber: "1042",
        dob: "2010-04-15",
        passwordHash: hashSecret("Aarav@1042"),
        name: "Aarav Sharma",
        classSection: "Class X-A",
        house: "raman",
        attendance: 96.5,
        overallScore: 94.2,
        termMarks: {
          term1: { total: 468, max: 500, percentage: 93.6 },
          term2: { total: 474, max: 500, percentage: 94.8 },
          term3: { total: 471, max: 500, percentage: 94.2 },
        },
        feeStatus: { term1: "Paid", term2: "Paid", term3: "Paid" },
        libraryBooks: [
          { title: "Savitri — Sri Aurobindo (Volume I)", issueDate: "2026-10-01", dueDate: "2026-10-20" },
          { title: "Concepts of Modern Physics (Beiser)", issueDate: "2026-10-05", dueDate: "2026-10-25" },
        ],
        assignments: [
          { title: "Electromagnetic Induction Working Model", subject: "Physics", status: "Submitted", dueDate: "2026-10-18" },
          { title: "Quadratic Equation Roots Exploration", subject: "Mathematics", status: "Submitted", dueDate: "2026-10-22" },
        ],
        createdAt: "2026-06-15T08:00:00.000Z",
      },
      {
        scholarId: "SAS-2026-0819",
        rollNumber: "0819",
        dob: "2012-09-22",
        passwordHash: hashSecret("Ananya@0819"),
        name: "Ananya Verma",
        classSection: "Class VIII-B",
        house: "teresa",
        attendance: 98.0,
        overallScore: 91.8,
        termMarks: {
          term1: { total: 452, max: 500, percentage: 90.4 },
          term2: { total: 466, max: 500, percentage: 93.2 },
          term3: { total: 459, max: 500, percentage: 91.8 },
        },
        feeStatus: { term1: "Paid", term2: "Paid", term3: "Paid" },
        libraryBooks: [
          { title: "Wings of Fire — Dr. A.P.J. Abdul Kalam", issueDate: "2026-10-03", dueDate: "2026-10-24" },
        ],
        assignments: [
          { title: "Plant Cell Microscopy Specimen Chart", subject: "Biology", status: "Submitted", dueDate: "2026-10-20" },
        ],
        createdAt: "2026-06-15T08:30:00.000Z",
      },
      {
        scholarId: "SAS-2026-1205",
        rollNumber: "1205",
        dob: "2008-11-05",
        passwordHash: hashSecret("Kabir@1205"),
        name: "Kabir Nair",
        classSection: "Class XII (Science)",
        house: "amartya",
        attendance: 94.8,
        overallScore: 95.6,
        termMarks: {
          term1: { total: 476, max: 500, percentage: 95.2 },
          term2: { total: 480, max: 500, percentage: 96.0 },
          term3: { total: 478, max: 500, percentage: 95.6 },
        },
        feeStatus: { term1: "Paid", term2: "Paid", term3: "Paid" },
        libraryBooks: [
          { title: "Organic Chemistry Reaction Mechanisms", issueDate: "2026-10-02", dueDate: "2026-10-22" },
        ],
        assignments: [
          { title: "Titration Analysis of Unknown Acid", subject: "Chemistry", status: "Submitted", dueDate: "2026-10-19" },
        ],
        createdAt: "2026-06-15T09:00:00.000Z",
      },
      {
        scholarId: "SAS-2026-0614",
        rollNumber: "0614",
        dob: "2014-02-18",
        passwordHash: hashSecret("Meera@0614"),
        name: "Meera Joshi",
        classSection: "Class VI-A",
        house: "tagore",
        attendance: 97.2,
        overallScore: 92.4,
        termMarks: {
          term1: { total: 458, max: 500, percentage: 91.6 },
          term2: { total: 466, max: 500, percentage: 93.2 },
          term3: { total: 462, max: 500, percentage: 92.4 },
        },
        feeStatus: { term1: "Paid", term2: "Paid", term3: "Paid" },
        libraryBooks: [
          { title: "Tales from Rabindranath Tagore", issueDate: "2026-10-08", dueDate: "2026-10-28" },
        ],
        assignments: [
          { title: "Solar System Scale Model", subject: "General Science", status: "Submitted", dueDate: "2026-10-24" },
        ],
        createdAt: "2026-06-15T09:30:00.000Z",
      },
    ],
    admins: [
      {
        username: "admin",
        email: "admin@sas.edu.in",
        passwordHash: hashSecret("SAS-ADMIN-1989"),
        role: "superadmin",
        name: "Executive Administrator",
        createdAt: "2026-06-01T00:00:00.000Z",
      },
      {
        username: "principal",
        email: "principal@sas.edu.in",
        passwordHash: hashSecret("SAS-PRINCIPAL-1989"),
        role: "principal",
        name: "Principal Academic Office",
        createdAt: "2026-06-01T00:00:00.000Z",
      },
    ],
    enquiries: [
      {
        id: "enq-01",
        referenceNo: "SAS-ADM-2026-1092",
        studentName: "Devansh Saxena",
        dob: "2023-01-14",
        targetClass: "Nursery",
        parentName: "Dr. Alok Saxena",
        phone: "9826014521",
        email: "alok.saxena@example.com",
        status: "Verified",
        notes: "Birth certificate verified. Registration fee received.",
        createdAt: "2026-10-12T10:15:00.000Z",
      },
      {
        id: "enq-02",
        referenceNo: "SAS-ADM-2026-1093",
        studentName: "Rhea Chawla",
        dob: "2020-08-19",
        targetClass: "Class I",
        parentName: "Sunita Chawla",
        phone: "9826147890",
        email: "sunita.chawla@example.com",
        status: "Interaction",
        notes: "Parent-teacher interaction scheduled for Saturday.",
        createdAt: "2026-10-14T11:30:00.000Z",
      },
    ],
    contacts: [
      {
        id: "msg-01",
        referenceNo: "MSG-SAS-0891",
        name: "Vikas Malhotra",
        phone: "9425012389",
        email: "vikas.malhotra@gmail.com",
        subject: "Bus Route Availability for Arera Colony",
        message: "Requesting information regarding pickup timing for Nursery students from Arera Colony E-3 stop.",
        status: "Unread",
        createdAt: "2026-10-15T09:20:00.000Z",
      },
    ],
    notices: [
      {
        id: "not-01",
        code: "SAS/CIR/2026/04",
        title: "Academic Session 2026–27 Admission Forms Available",
        category: "Admission",
        date: "2026-06-15",
        priority: "Urgent",
        body: "Registration proforma for Nursery to Class IX & XI will be issued from the school administrative office between 8:00 AM and 1:00 PM upon submission of child birth certificate and Rs. 100/- registration fee.",
        pinned: true,
      },
      {
        id: "not-02",
        code: "SAS/CIR/2026/03",
        title: "Three-Term Examination Timetable (Term I — September)",
        category: "Examination",
        date: "2026-08-20",
        priority: "High",
        body: "Term I Examinations will commence on 12th September. As per official rules, all school dues must be cleared before the issue of examination admit cards.",
        pinned: true,
      },
    ],
    housePoints: {
      teresa: 420,
      amartya: 445,
      tagore: 410,
      raman: 460,
    },
    feeSchedule: [
      {
        id: "fee-01",
        grade: "Nursery",
        registrationFee: "₹100 (Verified)",
        admissionFee: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        tuitionFee: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        annualCharges: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        transportCharges: "Distance-Slab Based (Confirm at School Office)",
        verificationStatus: "As per Official SAEC Office Schedule — Confirm at School Office",
        updatedAt: "2026-06-15",
      },
      {
        id: "fee-02",
        grade: "KG-1 (LKG)",
        registrationFee: "₹100 (Verified)",
        admissionFee: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        tuitionFee: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        annualCharges: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        transportCharges: "Distance-Slab Based (Confirm at School Office)",
        verificationStatus: "As per Official SAEC Office Schedule — Confirm at School Office",
        updatedAt: "2026-06-15",
      },
      {
        id: "fee-03",
        grade: "KG-2 (UKG)",
        registrationFee: "₹100 (Verified)",
        admissionFee: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        tuitionFee: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        annualCharges: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        transportCharges: "Distance-Slab Based (Confirm at School Office)",
        verificationStatus: "As per Official SAEC Office Schedule — Confirm at School Office",
        updatedAt: "2026-06-15",
      },
      {
        id: "fee-04",
        grade: "Classes I–V (Primary Wing)",
        registrationFee: "₹100 (Verified)",
        admissionFee: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        tuitionFee: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        annualCharges: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        transportCharges: "Distance-Slab Based (Confirm at School Office)",
        verificationStatus: "As per Official SAEC Office Schedule — Confirm at School Office",
        updatedAt: "2026-06-15",
      },
      {
        id: "fee-05",
        grade: "Classes VI–VIII (Middle Wing)",
        registrationFee: "₹100 (Verified)",
        admissionFee: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        tuitionFee: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        annualCharges: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        transportCharges: "Distance-Slab Based (Confirm at School Office)",
        verificationStatus: "As per Official SAEC Office Schedule — Confirm at School Office",
        updatedAt: "2026-06-15",
      },
      {
        id: "fee-06",
        grade: "Classes IX–X (Secondary MPBSE)",
        registrationFee: "₹100 (Verified)",
        admissionFee: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        tuitionFee: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        annualCharges: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        transportCharges: "Distance-Slab Based (Confirm at School Office)",
        verificationStatus: "As per Official SAEC Office Schedule — Confirm at School Office",
        updatedAt: "2026-06-15",
      },
      {
        id: "fee-07",
        grade: "Classes XI–XII (Senior Secondary MPBSE)",
        registrationFee: "₹100 (Verified)",
        admissionFee: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        tuitionFee: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        annualCharges: "As per Official SAEC Schedule (Issued at School Office, 8:00 AM – 1:00 PM)",
        transportCharges: "Distance-Slab Based (Confirm at School Office)",
        verificationStatus: "As per Official SAEC Office Schedule — Confirm at School Office",
        updatedAt: "2026-06-15",
      },
    ],
    admissionSettings: {
      activeSession: "Academic Session 2026–27",
      registrationOpenDate: "15th June Onwards",
      officeHours: "8:00 AM – 1:00 PM (Monday – Saturday)",
      locationText: "Auro Mandir Parisar, Behind Kannad Bhawan, 2nd Stop, Tulsi Nagar, Bhopal – 462003",
      midSessionStatusNotice:
        "Academic Session 2026–27 is currently in progress. Pre-registration & Priority Notifications for June 2027–28 session and mid-term vacancy transfers (Classes II–XII) are currently being processed at the School Office.",
      proformaFee: "₹100 (Verified)",
    },
    galleryItems: [
      {
        id: "gal-01",
        title: "Sri Aurobindo Education Centre & School Parisar",
        category: "Campus & Parisar",
        imageUrl: "/images/official/society.jpg",
        caption: "Auro Mandir Parisar, Tulsi Nagar, Bhopal (Est. July 1989)",
        featured: true,
      },
      {
        id: "gal-02",
        title: "Senior Science Laboratories & Viva Hall",
        category: "Science Labs",
        imageUrl: "/images/official/affiliation.jpg",
        caption: "Physics, Chemistry and Biology practical laboratories with working models",
        featured: true,
      },
      {
        id: "gal-03",
        title: "Central Reading Sanctuary & Library",
        category: "Central Library",
        imageUrl: "/images/official/curriculum.jpg",
        caption: "Curated academic and cultural volumes with scheduled class reading hours",
        featured: true,
      },
      {
        id: "gal-04",
        title: "Annual Inter-House Sports Championship",
        category: "Sports & Grounds",
        imageUrl: "/images/official/event-01.jpg",
        caption: "Athletics and court sports at Auro Mandir Parisar grounds",
        featured: true,
      },
      {
        id: "gal-05",
        title: "Integral Education Welcome Desk",
        category: "Cultural & Heritage",
        imageUrl: "/images/official/admissions.jpg",
        caption: "Welcoming students under the ideals of Sri Aurobindo and The Mother",
        featured: false,
      },
    ],
    achievements: [
      {
        id: "ach-01",
        title: "Establishment of Sri Aurobindo Education Centre",
        category: "Institutional Milestone",
        yearOrTerm: "July 1989",
        description: "Registered under MP Society Registrikaran Adhiniyam, establishing a sanctuary for integral human education in Bhopal.",
        verifiedStatus: "Confirmed by SAEC Charter",
      },
      {
        id: "ach-02",
        title: "MPBSE Permanent Affiliation (Nursery to Class XII)",
        category: "Academic Framework",
        yearOrTerm: "Ongoing",
        description: "Complete educational continuum under the Madhya Pradesh Board of Secondary Education with regular state board practicals.",
        verifiedStatus: "Board Affiliated",
      },
      {
        id: "ach-03",
        title: "Annual Science & Working Model Exhibition",
        category: "Science & Innovation",
        yearOrTerm: "Annual Term",
        description: "Demonstrable hydraulic systems, optics setups, and botanical exhibits presented by student innovators across all four houses.",
        verifiedStatus: "Institutional Annual Feature",
      },
      {
        id: "ach-04",
        title: "SAEC Four-House Rolling Trophy League",
        category: "House Championship",
        yearOrTerm: "Academic Session",
        description: "Annual championship across sports, academic quiz olympiads, and cultural performances between Teresa, Amartya, Tagore, and Raman Houses.",
        verifiedStatus: "Official House Trophy",
      },
    ],
    events: [
      {
        id: "evt-01",
        title: "First Term Examination Cycle (September)",
        date: "September Cycle",
        term: "First Term",
        location: "Examination Hall, Parisar",
        summary: "Evaluates foundational half-yearly curriculum mastery with continuous class assessment feedback.",
      },
      {
        id: "evt-02",
        title: "Second Term & Science Lab Viva Evaluations (December)",
        date: "December Cycle",
        term: "Second Term",
        location: "Science Laboratories",
        summary: "Second-phase progression, working model submissions, and laboratory practical assessments.",
      },
      {
        id: "evt-03",
        title: "Annual Board & Cumulative Promotional Examinations (March–April)",
        date: "March – April Cycle",
        term: "Annual Term",
        location: "Senior Wing & MPBSE Centers",
        summary: "The culminating academic assessment determining annual promotion in accordance with MPBSE statutory guidelines.",
      },
    ],
  };
}

// Atomically read database with auto-initialization and backward-compatibility backfill
export function getDb(): SchoolDatabase {
  if (memoryDb) {
    return memoryDb;
  }

  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      try {
        fs.mkdirSync(dir, { recursive: true });
      } catch (e) {
        console.warn("Could not create dir, using in-memory:", e);
      }
    }

    const initial = getInitialDatabase();
    if (!fs.existsSync(DB_PATH)) {
      try {
        fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), "utf8");
      } catch (e) {
        console.warn("Could not write initial DB file, using memory:", e);
      }
      memoryDb = initial;
      return initial;
    }

    const data = fs.readFileSync(DB_PATH, "utf8");
    const parsed = JSON.parse(data) as Partial<SchoolDatabase>;

    // Ensure all collections are present
    const consolidated: SchoolDatabase = {
      students: parsed.students || initial.students,
      admins: parsed.admins || initial.admins,
      enquiries: parsed.enquiries || initial.enquiries,
      contacts: parsed.contacts || initial.contacts,
      notices: parsed.notices || initial.notices,
      housePoints: parsed.housePoints || initial.housePoints,
      feeSchedule: parsed.feeSchedule || initial.feeSchedule,
      admissionSettings: parsed.admissionSettings || initial.admissionSettings,
      galleryItems: parsed.galleryItems || initial.galleryItems,
      achievements: parsed.achievements || initial.achievements,
      events: parsed.events || initial.events,
    };

    memoryDb = consolidated;
    return consolidated;
  } catch (err) {
    console.error("Error reading database, falling back to initial seed:", err);
    memoryDb = getInitialDatabase();
    return memoryDb;
  }
}

// Atomically write database to prevent corruption
export function saveDb(data: SchoolDatabase): void {
  memoryDb = data;
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const tempPath = `${DB_PATH}.tmp.${Date.now()}`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf8");
    fs.renameSync(tempPath, DB_PATH);
  } catch (err) {
    console.warn("Persistence to disk skipped (serverless read-only filesystem), maintained in memory:", err);
  }
}
