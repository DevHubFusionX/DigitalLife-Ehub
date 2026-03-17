import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us – Our Mission, Vision & Story",
    description:
        "Learn about DigitalLife Ehub — our mission to empower SMEs, creators, and professionals with community support, business visibility tools, and strategic mentorship for sustainable growth.",
    keywords: [
        "about DigitalLife Ehub",
        "SME empowerment",
        "business growth mission",
        "entrepreneur support",
        "community-driven growth",
    ],
    openGraph: {
        title: "About DigitalLife Ehub – Empowering SMEs & Entrepreneurs",
        description:
            "Discover our mission to empower SMEs, creators, and professionals through community, mentorship, and visibility tools.",
        url: "https://digitallife-ehub.com/about",
    },
    alternates: {
        canonical: "https://digitallife-ehub.com/about",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
