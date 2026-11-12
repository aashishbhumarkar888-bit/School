import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/lib/seo-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONFIG.siteUrl;
  const now = new Date();

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/admissions", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/academics", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/campus", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/leadership", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/affiliation", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/methodology", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/houses", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/school-life", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/faculty", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/calendar", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/gallery", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/notices", priority: 0.85, changeFrequency: "daily" as const },
    { path: "/achievements", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/events", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/news", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/alumni", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/careers", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/student/login", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
