import { Metadata } from "next";
import { NewsPageClient } from "@/components/pages/NewsPageClient";

export const metadata: Metadata = {
  title: "School News & Journal | Sri Aurobindo School, Bhopal",
  description:
    "Read the latest articles, academic achievements, and co-curricular milestones from Sri Aurobindo School, Bhopal.",
};

export default function NewsIndexPage() {
  return <NewsPageClient />;
}
