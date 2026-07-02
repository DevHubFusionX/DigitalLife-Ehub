import { MetadataRoute } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { RESOURCES_DATA, Resource } from "@/components/resources/resourcesData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  let resourcesList: Resource[] = RESOURCES_DATA;
  try {
    const querySnapshot = await getDocs(collection(db, "resources"));
    if (!querySnapshot.empty) {
      const items: Resource[] = [];
      querySnapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() } as Resource);
      });
      resourcesList = items;
    }
  } catch (e) {
    console.warn("Sitemap failed to fetch live Firestore resources, falling back to static resources list", e);
  }

  // Dynamic resource details pages
  const resourcePages = resourcesList.map((resource) => ({
    url: `${baseUrl}/resources/${resource.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...resourcePages];
}
