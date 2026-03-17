import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services – Business Growth, Visibility & Mentorship Solutions",
    description:
        "Explore DigitalLife Ehub services: community hub access, sub-group networking, mentorship pairing, business visibility tools, and strategic growth solutions for SMEs and entrepreneurs.",
    keywords: [
        "DigitalLife Ehub services",
        "business growth services",
        "SME mentorship",
        "business visibility",
        "community hub",
        "sub-group networking",
        "business consulting",
    ],
    openGraph: {
        title: "DigitalLife Ehub Services – Growth Solutions for SMEs",
        description:
            "Community hub, mentorship pairing, visibility tools, and networking — explore the full suite of DigitalLife Ehub services.",
        url: "https://digitallife-ehub.com/services",
    },
    alternates: {
        canonical: "https://digitallife-ehub.com/services",
    },
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
