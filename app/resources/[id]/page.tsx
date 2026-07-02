import { RESOURCES_DATA } from "@/components/resources/resourcesData";
import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ResourceDetailClient from "@/components/resources/ResourceDetailClient";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return RESOURCES_DATA.map((resource) => ({
    id: resource.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const resource = RESOURCES_DATA.find((r) => r.id === id);
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
  const resource = RESOURCES_DATA.find((r) => r.id === id);

  if (!resource) {
    notFound();
  }

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
        <ResourceDetailClient resource={resource} />
        <Footer />
      </main>
    </>
  );
}
