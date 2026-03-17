import type { MetadataRoute } from "next";

const SITE_URL = "https://digitallife-ehub.com";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${SITE_URL}/community`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/services`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${SITE_URL}/trainings`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ];
}
