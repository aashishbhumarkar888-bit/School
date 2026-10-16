import { Metadata } from "next";
import { AboutPageClient } from "@/components/pages/AboutPageClient";

export const metadata: Metadata = {
  title: "About The School | Heritage, Society & Vision",
  description:
    "Explore the founding heritage of Sri Aurobindo School, Bhopal. Founded in July 1989 by Sri Aurobindo Education Centre (SAEC), fostering integral human education.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
