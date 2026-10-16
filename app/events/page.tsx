import { Metadata } from "next";
import { EventsPageClient } from "@/components/pages/EventsPageClient";

export const metadata: Metadata = {
  title: "Academic Calendar & Events | Sri Aurobindo School, Bhopal",
  description:
    "Official three-term examination schedules and co-curricular sports events at Sri Aurobindo School, Bhopal.",
};

export default function EventsPage() {
  return <EventsPageClient />;
}
