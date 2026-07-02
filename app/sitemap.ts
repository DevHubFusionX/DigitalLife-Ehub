import { MetadataRoute } from "next";
import { RESOURCES_DATA } from "@/components/resources/resourcesData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://digitallife-ehub.com";

  // Base pages of the application
  const staticPages = [
    "",
    "/about",
    "/services",
    "/resources",
    "/community",
    "/trainings"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic resource details pages
  const resourcePages = RESOURCES_DATA.map((resource) => ({
    url: `${baseUrl}/resources/${resource.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...resourcePages];
}
