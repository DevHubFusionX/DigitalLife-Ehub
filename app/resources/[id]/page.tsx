import { RESOURCES_DATA, Resource } from "@/components/resources/resourcesData";
import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ResourceDetailClient from "@/components/resources/ResourceDetailClient";
import { Metadata } from "next";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const dynamicParams = true;

interface Props {
  params: Promise<{ id: string }>;
}

async function getResourceById(id: string): Promise<Resource | null> {
  try {
    const docRef = doc(db, "resources", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Resource;
    }
  } catch (e) {
    console.warn("Failed to fetch resource from Firestore, checking static fallback:", e);
  }
  return RESOURCES_DATA.find((r) => r.id === id) || null;
}

async function getRelatedResources(currentResource: Resource): Promise<Resource[]> {
  let allResources: Resource[] = RESOURCES_DATA;
  try {
    const querySnapshot = await getDocs(collection(db, "resources"));
    if (!querySnapshot.empty) {
      const items: Resource[] = [];
      querySnapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() } as Resource);
      });
      allResources = items;
    }
  } catch (e) {
    console.warn("Failed to fetch related resources from Firestore, falling back to static resources list", e);
  }

  // Filter: exclude current
  const candidates = allResources.filter(r => r.id !== currentResource.id);
  
  // Score candidates based on matching topic and category
  const scored = candidates.map(r => {
    let score = 0;
    if (r.topic === currentResource.topic) score += 10;
    if (currentResource.categorySlug && r.categorySlug === currentResource.categorySlug) score += 5;
    return { resource: r, score };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map(item => item.resource);
}

export async function generateStaticParams() {
  const staticParams = RESOURCES_DATA.map((resource) => ({
    id: resource.id,
  }));

  try {
    const querySnapshot = await getDocs(collection(db, "resources"));
    const items = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
    }));
    const uniqueMap = new Map();
    [...staticParams, ...items].forEach((p) => uniqueMap.set(p.id, p));
    return Array.from(uniqueMap.values());
  } catch (e) {
    return staticParams;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const resource = await getResourceById(id);
  if (!resource) {
    return {
      title: "Resource Not Found | DigitalLife",
    };
  }

  return {
    title: `${resource.title} | Free Template & Guide | DigitalLife`,
    description: resource.description,
    keywords: `free download, ${resource.title.toLowerCase()}, standard operating procedures, small business systems, corporate workflow design, msme resources, ${resource.categorySlug || ""}`,
    openGraph: {
      title: `${resource.title} | Free Template & Guide | DigitalLife`,
      description: resource.description,
      type: "article",
      url: `https://digitallife-ehub.com/resources/${resource.id}`,
    },
  };
}

export default async function ResourceDetailPage({ params }: Props) {
  const { id } = await params;
  const resource = await getResourceById(id);

  if (!resource) {
    notFound();
  }

  const relatedResources = await getRelatedResources(resource);

  // Define structured JSON-LD schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": resource.title,
    "description": resource.description,
    "author": {
      "@type": "Organization",
      "name": "DigitalLife Ehub",
      "url": "https://digitallife-ehub.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DigitalLife Ehub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://digitallife-ehub.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://digitallife-ehub.com/resources/${resource.id}`
    }
  };

  const documentSchema = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    "name": resource.title,
    "description": resource.description,
    "fileFormat": resource.infoLabel || "PDF / Excel / Word Document",
    "accessibilityHazard": "none"
  };

  return (
    <>
      {/* Schema Markup for SEO Crawling */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(documentSchema) }}
      />

      <main className="min-h-screen bg-slate-900">
        <Navbar />
        <ResourceDetailClient resource={resource} relatedResources={relatedResources} />
        <Footer />
      </main>
    </>
  );
}
