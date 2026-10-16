import { HouseId } from "@/lib/types";

export interface StudentProfile {
  id: string; // Scholar ID
  name: string;
  grade: string;
  house: HouseId;
  houseName: string;
  houseColor: string;
  avatar: string;
  dob: string;
  bloodGroup: string;
  parentName: string;
  emergencyPhone: string;
  attendancePercent: number;
  overallScorePercent: number;
  housePointsContributed: number;
  pendingProjectsCount: number;
  reportCard: {
    term: "First Term (Sept)" | "Second Term (Dec)" | "Annual Exam (Mar-Apr)";
    subjects: {
      name: string;
      theoryMax: number;
      theoryObtained: number;
      practicalMax: number;
      practicalObtained: number;
      grade: string;
    }[];
    teacherRemarks: string;
    conduct: string;
    rankInClass: number;
  }[];
  schedule: {
    time: string;
    period: string;
    subject: string;
    teacher: string;
    room: string;
    type: "assembly" | "academic" | "smartclass" | "lab" | "library" | "sports";
  }[];
  assignments: {
    id: string;
    title: string;
    subject: string;
    dueDate: string;
    status: "Pending" | "Submitted";
    type: "Flight Path Model" | "Multiple Intelligences" | "Lab Viva Journal";
  }[];
  libraryBooks: {
    id: string;
    title: string;
    author: string;
    issuedDate: string;
    dueDate: string;
    status: "Active" | "Renewed";
  }[];
  fees: {
    term: string;
    amount: string;
    dueDate: string;
    status: "Paid · Exam Hall Ticket Unlocked" | "Pending";
    receiptNumber: string;
    paidDate: string;
  }[];
}

export const DEMO_STUDENTS: StudentProfile[] = [
  {
    id: "SAS-2026-1042",
    name: "Aarav Sharma",
    grade: "Class X-A",
    house: "raman",
    houseName: "Raman House",
    houseColor: "#E11D48",
    avatar: "AS",
    dob: "14-Aug-2010",
    bloodGroup: "O+",
    parentName: "Dr. Vinod Sharma",
    emergencyPhone: "0755-2558286",
    attendancePercent: 96.5,
    overallScorePercent: 94.2,
    housePointsContributed: 145,
    pendingProjectsCount: 1,
    reportCard: [
      {
        term: "First Term (Sept)",
        subjects: [
          { name: "Science (Physics, Chem, Bio)", theoryMax: 75, theoryObtained: 72, practicalMax: 25, practicalObtained: 24, grade: "A1" },
          { name: "Mathematics", theoryMax: 80, theoryObtained: 78, practicalMax: 20, practicalObtained: 19, grade: "A1" },
          { name: "English Language & Literature", theoryMax: 80, theoryObtained: 74, practicalMax: 20, practicalObtained: 18, grade: "A1" },
          { name: "Social Sciences", theoryMax: 80, theoryObtained: 71, practicalMax: 20, practicalObtained: 18, grade: "A2" },
          { name: "Hindi / Sanskrit", theoryMax: 80, theoryObtained: 75, practicalMax: 20, practicalObtained: 19, grade: "A1" },
          { name: "Information Technology", theoryMax: 50, theoryObtained: 48, practicalMax: 50, practicalObtained: 49, grade: "A1" },
        ],
        teacherRemarks: "Exemplary scientific aptitude and leadership in Raman House laboratory models.",
        conduct: "Distinguished",
        rankInClass: 2,
      },
      {
        term: "Second Term (Dec)",
        subjects: [
          { name: "Science (Physics, Chem, Bio)", theoryMax: 75, theoryObtained: 73, practicalMax: 25, practicalObtained: 25, grade: "A1" },
          { name: "Mathematics", theoryMax: 80, theoryObtained: 79, practicalMax: 20, practicalObtained: 20, grade: "A1" },
          { name: "English Language & Literature", theoryMax: 80, theoryObtained: 76, practicalMax: 20, practicalObtained: 19, grade: "A1" },
          { name: "Social Sciences", theoryMax: 80, theoryObtained: 73, practicalMax: 20, practicalObtained: 19, grade: "A1" },
          { name: "Hindi / Sanskrit", theoryMax: 80, theoryObtained: 76, practicalMax: 20, practicalObtained: 19, grade: "A1" },
          { name: "Information Technology", theoryMax: 50, theoryObtained: 49, practicalMax: 50, practicalObtained: 50, grade: "A1" },
        ],
        teacherRemarks: "Consistently top-tier academic rigor. High viva-voce precision.",
        conduct: "Distinguished",
        rankInClass: 1,
      },
      {
        term: "Annual Exam (Mar-Apr)",
        subjects: [
          { name: "Science (Physics, Chem, Bio)", theoryMax: 75, theoryObtained: 74, practicalMax: 25, practicalObtained: 25, grade: "A1" },
          { name: "Mathematics", theoryMax: 80, theoryObtained: 80, practicalMax: 20, practicalObtained: 20, grade: "A1" },
          { name: "English Language & Literature", theoryMax: 80, theoryObtained: 75, practicalMax: 20, practicalObtained: 19, grade: "A1" },
          { name: "Social Sciences", theoryMax: 80, theoryObtained: 74, practicalMax: 20, practicalObtained: 19, grade: "A1" },
          { name: "Hindi / Sanskrit", theoryMax: 80, theoryObtained: 77, practicalMax: 20, practicalObtained: 20, grade: "A1" },
          { name: "Information Technology", theoryMax: 50, theoryObtained: 50, practicalMax: 50, practicalObtained: 50, grade: "A1" },
        ],
        teacherRemarks: "Promoted with High Distinction. Recommended for Board Honours.",
        conduct: "Exemplary",
        rankInClass: 1,
      },
    ],
    schedule: [
      { time: "07:45 – 08:15 AM", period: "Assembly", subject: "Morning Assembly & Savitri Reflection", teacher: "Staff & House Prefects", room: "Central Courtyard", type: "assembly" },
      { time: "08:15 – 09:00 AM", period: "Period 1", subject: "Science (Physics Lab Demonstration)", teacher: "Dr. R.K. Mishra", room: "Physics Lab (Room 104)", type: "lab" },
      { time: "09:00 – 09:45 AM", period: "Period 2", subject: "Advanced Mathematics", teacher: "Mrs. Shashi Saxena", room: "Classroom X-A", type: "academic" },
      { time: "09:45 – 10:30 AM", period: "Period 3", subject: "Smart Classroom Audio-Visual", teacher: "Mr. Deepak Sen", room: "Multimedia Wing 2", type: "smartclass" },
      { time: "10:30 – 10:50 AM", period: "Recess", subject: "Nutrition & Guided Relaxation", teacher: "Supervising Mentors", room: "Campus Parisar", type: "assembly" },
      { time: "10:50 – 11:35 AM", period: "Period 4", subject: "Mandatory Central Library Hour", teacher: "Librarian Mrs. Joshi", room: "Central Library", type: "library" },
      { time: "11:35 – 12:20 PM", period: "Period 5", subject: "Social Sciences & Civics", teacher: "Mr. Anand Tiwari", room: "Classroom X-A", type: "academic" },
      { time: "12:20 – 01:00 PM", period: "Period 6", subject: "English Literature & Rhetoric", teacher: "Mrs. Priya Nambiar", room: "Classroom X-A", type: "academic" },
      { time: "01:00 – 01:30 PM", period: "Period 7", subject: "Sports Vitality (Volleyball & Chess)", teacher: "Coach Vikram Singh", room: "Main Playgrounds", type: "sports" },
    ],
    assignments: [
      { id: "ASN-01", title: "Demonstrable Hydraulic Lift Physics Model", subject: "Science Lab", dueDate: "24-Oct-2026", status: "Submitted", type: "Flight Path Model" },
      { id: "ASN-02", title: "Comparative Monologue on Savitri Book III", subject: "English & Ethics", dueDate: "28-Oct-2026", status: "Pending", type: "Multiple Intelligences" },
      { id: "ASN-03", title: "Certified Chemistry Practical Journal", subject: "Chemistry Lab", dueDate: "02-Nov-2026", status: "Submitted", type: "Lab Viva Journal" },
    ],
    libraryBooks: [
      { id: "LIB-4401", title: "The Life Divine & Essays on Gita", author: "Sri Aurobindo", issuedDate: "10-Oct-2026", dueDate: "25-Oct-2026", status: "Active" },
      { id: "LIB-3289", title: "Fundamentals of Experimental Physics", author: "Halliday & Resnick", issuedDate: "05-Oct-2026", dueDate: "20-Oct-2026", status: "Active" },
    ],
    fees: [
      { term: "First Term (June – September)", amount: "₹8,500/-", dueDate: "10-July-2026", status: "Paid · Exam Hall Ticket Unlocked", receiptNumber: "SAS-REC-2026-9021", paidDate: "08-July-2026" },
      { term: "Second Term (October – December)", amount: "₹8,500/-", dueDate: "10-October-2026", status: "Paid · Exam Hall Ticket Unlocked", receiptNumber: "SAS-REC-2026-9442", paidDate: "05-October-2026" },
      { term: "Annual Term (January – March)", amount: "₹8,500/-", dueDate: "10-January-2027", status: "Paid · Exam Hall Ticket Unlocked", receiptNumber: "SAS-REC-2027-1002", paidDate: "07-January-2027" },
    ],
  },
  {
    id: "SAS-2026-0819",
    name: "Ananya Verma",
    grade: "Class VIII-B",
    house: "teresa",
    houseName: "Teresa House",
    houseColor: "#0284C7",
    avatar: "AV",
    dob: "22-Nov-2012",
    bloodGroup: "B+",
    parentName: "Sanjay Verma",
    emergencyPhone: "0755-2558286",
    attendancePercent: 98.0,
    overallScorePercent: 91.8,
    housePointsContributed: 130,
    pendingProjectsCount: 1,
    reportCard: [
      {
        term: "First Term (Sept)",
        subjects: [
          { name: "Science", theoryMax: 70, theoryObtained: 65, practicalMax: 30, practicalObtained: 28, grade: "A1" },
          { name: "Mathematics", theoryMax: 80, theoryObtained: 72, practicalMax: 20, practicalObtained: 18, grade: "A1" },
          { name: "English Language", theoryMax: 80, theoryObtained: 76, practicalMax: 20, practicalObtained: 19, grade: "A1" },
          { name: "Social Studies", theoryMax: 80, theoryObtained: 74, practicalMax: 20, practicalObtained: 18, grade: "A1" },
          { name: "Hindi", theoryMax: 80, theoryObtained: 75, practicalMax: 20, practicalObtained: 19, grade: "A1" },
        ],
        teacherRemarks: "Remarkable empathy and active leadership in community service initiatives.",
        conduct: "Exemplary",
        rankInClass: 3,
      },
    ],
    schedule: [
      { time: "07:45 – 08:15 AM", period: "Assembly", subject: "Morning Reflection & Mindfulness", teacher: "Mentors", room: "Central Quad", type: "assembly" },
      { time: "08:15 – 09:00 AM", period: "Period 1", subject: "English Grammar & Comprehension", teacher: "Mrs. Nambiar", room: "Classroom VIII-B", type: "academic" },
      { time: "09:00 – 09:45 AM", period: "Period 2", subject: "Integrated Science", teacher: "Dr. Mishra", room: "Lab Junior Wing", type: "lab" },
      { time: "09:45 – 10:30 AM", period: "Period 3", subject: "Mathematics Foundations", teacher: "Mrs. Saxena", room: "Classroom VIII-B", type: "academic" },
      { time: "10:30 – 10:50 AM", period: "Recess", subject: "Lunch & Social Bonding", teacher: "Staff", room: "Campus Grounds", type: "assembly" },
      { time: "10:50 – 11:35 AM", period: "Period 4", subject: "Daily Scheduled Central Library Hour", teacher: "Mrs. Joshi", room: "Central Library", type: "library" },
      { time: "11:35 – 12:20 PM", period: "Period 5", subject: "Social Sciences (History of MP)", teacher: "Mr. Tiwari", room: "Classroom VIII-B", type: "academic" },
      { time: "12:20 – 01:00 PM", period: "Period 6", subject: "Computer Applications & Coding", teacher: "Mr. Sen", room: "IT Lab", type: "smartclass" },
      { time: "01:00 – 01:30 PM", period: "Period 7", subject: "Sports & Physical Education", teacher: "Coach Vikram", room: "Badminton Court", type: "sports" },
    ],
    assignments: [
      { id: "ASN-11", title: "Eco-Botany Herbarium of Auro Mandir Parisar", subject: "Science", dueDate: "25-Oct-2026", status: "Submitted", type: "Flight Path Model" },
      { id: "ASN-12", title: "Storytelling & Peer Care Reflections", subject: "Teresa House Project", dueDate: "30-Oct-2026", status: "Pending", type: "Multiple Intelligences" },
    ],
    libraryBooks: [
      { id: "LIB-1029", title: "Gitanjali & Selected Stories", author: "Rabindranath Tagore", issuedDate: "12-Oct-2026", dueDate: "27-Oct-2026", status: "Active" },
    ],
    fees: [
      { term: "First Term (June – September)", amount: "₹7,200/-", dueDate: "10-July-2026", status: "Paid · Exam Hall Ticket Unlocked", receiptNumber: "SAS-REC-2026-7811", paidDate: "05-July-2026" },
      { term: "Second Term (October – December)", amount: "₹7,200/-", dueDate: "10-October-2026", status: "Paid · Exam Hall Ticket Unlocked", receiptNumber: "SAS-REC-2026-8344", paidDate: "08-October-2026" },
    ],
  },
  {
    id: "SAS-2026-1205",
    name: "Kabir Nair",
    grade: "Class XII (Science)",
    house: "amartya",
    houseName: "Amartya House",
    houseColor: "#D97706",
    avatar: "KN",
    dob: "03-May-2008",
    bloodGroup: "A+",
    parentName: "Sunil Nair",
    emergencyPhone: "0755-2558286",
    attendancePercent: 94.8,
    overallScorePercent: 95.6,
    housePointsContributed: 160,
    pendingProjectsCount: 2,
    reportCard: [
      {
        term: "First Term (Sept)",
        subjects: [
          { name: "Physics (Senior Practical & Theory)", theoryMax: 70, theoryObtained: 68, practicalMax: 30, practicalObtained: 29, grade: "A1" },
          { name: "Chemistry (Analytical Titrations)", theoryMax: 70, theoryObtained: 67, practicalMax: 30, practicalObtained: 29, grade: "A1" },
          { name: "Mathematics (Calculus & Vectors)", theoryMax: 80, theoryObtained: 79, practicalMax: 20, practicalObtained: 20, grade: "A1" },
          { name: "English Core", theoryMax: 80, theoryObtained: 75, practicalMax: 20, practicalObtained: 19, grade: "A1" },
          { name: "Physical Education", theoryMax: 70, theoryObtained: 68, practicalMax: 30, practicalObtained: 29, grade: "A1" },
        ],
        teacherRemarks: "Exceptional analytical faculties. Lead debater for Amartya House.",
        conduct: "Distinguished",
        rankInClass: 1,
      },
    ],
    schedule: [
      { time: "07:45 – 08:15 AM", period: "Assembly", subject: "Morning Assembly & Intellectual Thought", teacher: "Staff", room: "Auditorium", type: "assembly" },
      { time: "08:15 – 09:00 AM", period: "Period 1", subject: "Senior Chemistry Practical Viva", teacher: "Dr. Roy", room: "Chemistry Lab", type: "lab" },
      { time: "09:00 – 09:45 AM", period: "Period 2", subject: "Senior Physics Problem Seminar", teacher: "Dr. Mishra", room: "Physics Lab", type: "academic" },
      { time: "09:45 – 10:30 AM", period: "Period 3", subject: "Higher Mathematics & Analysis", teacher: "Mrs. Saxena", room: "Classroom XII", type: "academic" },
      { time: "10:30 – 10:50 AM", period: "Recess", subject: "Break & Peer Mentoring", teacher: "Staff", room: "Courtyard", type: "assembly" },
      { time: "10:50 – 11:35 AM", period: "Period 4", subject: "Central Library Research & Journals", teacher: "Mrs. Joshi", room: "Central Library", type: "library" },
      { time: "11:35 – 12:20 PM", period: "Period 5", subject: "English Core & Rhetorical Analysis", teacher: "Mrs. Nambiar", room: "Classroom XII", type: "academic" },
      { time: "12:20 – 01:00 PM", period: "Period 6", subject: "Computer Science & Data Structures", teacher: "Mr. Sen", room: "IT Lab", type: "smartclass" },
      { time: "01:00 – 01:30 PM", period: "Period 7", subject: "Indoor Strategic Arena (Chess & TT)", teacher: "Coach Vikram", room: "Indoor Sports Hall", type: "sports" },
    ],
    assignments: [
      { id: "ASN-21", title: "Spectrophotometry Working Assay Model", subject: "Chemistry Lab", dueDate: "26-Oct-2026", status: "Submitted", type: "Flight Path Model" },
      { id: "ASN-22", title: "Parliamentary Debate Brief on Capability Approach", subject: "Amartya House", dueDate: "31-Oct-2026", status: "Pending", type: "Multiple Intelligences" },
    ],
    libraryBooks: [
      { id: "LIB-9011", title: "Development as Freedom", author: "Amartya Sen", issuedDate: "08-Oct-2026", dueDate: "23-Oct-2026", status: "Active" },
    ],
    fees: [
      { term: "First Term (June – September)", amount: "₹9,800/-", dueDate: "10-July-2026", status: "Paid · Exam Hall Ticket Unlocked", receiptNumber: "SAS-REC-2026-6612", paidDate: "02-July-2026" },
      { term: "Second Term (October – December)", amount: "₹9,800/-", dueDate: "10-October-2026", status: "Paid · Exam Hall Ticket Unlocked", receiptNumber: "SAS-REC-2026-7120", paidDate: "04-October-2026" },
    ],
  },
  {
    id: "SAS-2026-0614",
    name: "Meera Joshi",
    grade: "Class VI-A",
    house: "tagore",
    houseName: "Tagore House",
    houseColor: "#059669",
    avatar: "MJ",
    dob: "19-Jan-2014",
    bloodGroup: "AB+",
    parentName: "Rajesh Joshi",
    emergencyPhone: "0755-2558286",
    attendancePercent: 97.2,
    overallScorePercent: 92.4,
    housePointsContributed: 125,
    pendingProjectsCount: 1,
    reportCard: [
      {
        term: "First Term (Sept)",
        subjects: [
          { name: "General Science", theoryMax: 70, theoryObtained: 66, practicalMax: 30, practicalObtained: 28, grade: "A1" },
          { name: "Mathematics", theoryMax: 80, theoryObtained: 73, practicalMax: 20, practicalObtained: 18, grade: "A1" },
          { name: "English Literature", theoryMax: 80, theoryObtained: 77, practicalMax: 20, practicalObtained: 19, grade: "A1" },
          { name: "Social Studies & Geography", theoryMax: 80, theoryObtained: 72, practicalMax: 20, practicalObtained: 18, grade: "A1" },
          { name: "Sanskrit Foundations", theoryMax: 80, theoryObtained: 74, practicalMax: 20, practicalObtained: 18, grade: "A1" },
        ],
        teacherRemarks: "Outstanding creative imagination and expressive recitation in Tagore House drama.",
        conduct: "Exemplary",
        rankInClass: 2,
      },
    ],
    schedule: [
      { time: "07:45 – 08:15 AM", period: "Assembly", subject: "Savitri Chorus & Morning Reflection", teacher: "Staff", room: "Central Stage", type: "assembly" },
      { time: "08:15 – 09:00 AM", period: "Period 1", subject: "Creative Writing & Literature", teacher: "Mrs. Nambiar", room: "Classroom VI-A", type: "academic" },
      { time: "09:00 – 09:45 AM", period: "Period 2", subject: "General Science Inquiry", teacher: "Dr. Mishra", room: "Science Room 2", type: "lab" },
      { time: "09:45 – 10:30 AM", period: "Period 3", subject: "Mathematics Problem Solving", teacher: "Mrs. Saxena", room: "Classroom VI-A", type: "academic" },
      { time: "10:30 – 10:50 AM", period: "Recess", subject: "Healthy Snack & Outdoor Play", teacher: "Staff", room: "Courtyard", type: "assembly" },
      { time: "10:50 – 11:35 AM", period: "Period 4", subject: "Scheduled Library Hour & Mythology", teacher: "Mrs. Joshi", room: "Central Library", type: "library" },
      { time: "11:35 – 12:20 PM", period: "Period 5", subject: "Social Sciences & Heritage", teacher: "Mr. Tiwari", room: "Classroom VI-A", type: "academic" },
      { time: "12:20 – 01:00 PM", period: "Period 6", subject: "Visual Art & Tagore Sangeet", teacher: "Mrs. Sen", room: "Art Studio", type: "smartclass" },
      { time: "01:00 – 01:30 PM", period: "Period 7", subject: "Co-Curricular Athletics & Badminton", teacher: "Coach Vikram", room: "Courts", type: "sports" },
    ],
    assignments: [
      { id: "ASN-31", title: "Recitation Journal: Lines from Savitri Dawn", subject: "Tagore House Arts", dueDate: "27-Oct-2026", status: "Submitted", type: "Multiple Intelligences" },
      { id: "ASN-32", title: "Basic Light Prism Reflection Diagram", subject: "Science", dueDate: "01-Nov-2026", status: "Pending", type: "Flight Path Model" },
    ],
    libraryBooks: [
      { id: "LIB-5521", title: "The Post Office & Short Stories", author: "Rabindranath Tagore", issuedDate: "11-Oct-2026", dueDate: "26-Oct-2026", status: "Active" },
    ],
    fees: [
      { term: "First Term (June – September)", amount: "₹6,800/-", dueDate: "10-July-2026", status: "Paid · Exam Hall Ticket Unlocked", receiptNumber: "SAS-REC-2026-5519", paidDate: "06-July-2026" },
      { term: "Second Term (October – December)", amount: "₹6,800/-", dueDate: "10-October-2026", status: "Paid · Exam Hall Ticket Unlocked", receiptNumber: "SAS-REC-2026-5991", paidDate: "07-October-2026" },
    ],
  },
];
