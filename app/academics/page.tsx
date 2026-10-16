import { Metadata } from "next";
import { AcademicsPageClient } from "@/components/pages/AcademicsPageClient";

export const metadata: Metadata = {
  title: "Academics & Pedagogy | MPBSE Board Curriculum",
  description:
    "Discover the academic curriculum from Nursery to Class XII at Sri Aurobindo School, Bhopal. MPBSE affiliated, three-term examination structure, and laboratory viva.",
};

export default function AcademicsPage() {
  return <AcademicsPageClient />;
}
