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
}

const DB_PATH = path.join(process.cwd(), "data", "school-db.json");

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
  };
}

// Atomically read database with auto-initialization
export function getDb(): SchoolDatabase {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(DB_PATH)) {
      const initial = getInitialDatabase();
      fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), "utf8");
      return initial;
    }

    const data = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(data) as SchoolDatabase;
  } catch (err) {
    console.error("Error reading database, falling back to initial seed:", err);
    return getInitialDatabase();
  }
}

// Atomically write database to prevent corruption
export function saveDb(data: SchoolDatabase): void {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const tempPath = `${DB_PATH}.tmp.${Date.now()}`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf8");
    fs.renameSync(tempPath, DB_PATH);
  } catch (err) {
    console.error("Error writing database:", err);
    throw new Error("Database persistence error");
  }
}
