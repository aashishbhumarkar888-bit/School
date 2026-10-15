export type HouseId = "teresa" | "amartya" | "tagore" | "raman";

export interface HouseInfo {
  id: HouseId;
  name: string;
  patron: string;
  colorName: string;
  accentHex: string;
  secondaryHex: string;
  darkHex: string;
  gradient: string;
  motto: string;
  values: string[];
  patronStory: string;
  competitions: string[];
  badgeRole: string;
}

export interface WingInfo {
  id: string;
  title: string;
  gradeRange: string;
  ageBracket: string;
  description: string;
  keySubjects: string[];
  focus: string;
}

export interface PedagogicalPillar {
  title: string;
  tagline: string;
  description: string;
  points: string[];
  houseAlignment: HouseId;
}

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  category: "Academic" | "Examination" | "Admission" | "Administrative";
  summary: string;
  content: string;
  isImportant?: boolean;
  attachmentName?: string;
}

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: string;
  featuredImage?: string;
  houseTag?: HouseId;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  term: "First Term" | "Second Term" | "Annual Term" | "Co-Curricular";
  location: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Campus" | "Academics" | "Four Houses" | "Sports" | "Cultural";
  caption: string;
  aspect: "landscape" | "portrait" | "square";
  imageUrl?: string;
  houseTag?: HouseId;
}

export interface AdmissionEnquiry {
  id: string;
  parentName: string;
  phone: string;
  email: string;
  childName: string;
  targetClass: string;
  message?: string;
  submittedAt: string;
  status: "new" | "contacted" | "scheduled";
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}
