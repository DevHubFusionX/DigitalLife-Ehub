import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Community – Specialized Circles, Mentorship & Visibility Tools",
    description:
        "Explore the DigitalLife Ehub community: join Specialized Circles for targeted networking, access mentorship pairing, visibility tools, an opportunity board, and exclusive founding member benefits.",
    keywords: [
        "DigitalLife Ehub community",
        "business networking circles",
        "mentorship pairing",
        "visibility tools",
        "opportunity board",
        "founding member benefits",
        "SME community",
        "entrepreneur networking",
    ],
    openGraph: {
        title: "DigitalLife Ehub Community – Your Gateway to Growth",
        description:
            "Join Specialized Circles, access mentorship, visibility tools, and exclusive founding member benefits in the DigitalLife Ehub community.",
        url: "https://digitallife-ehub.com/community",
    },
    alternates: {
        canonical: "https://digitallife-ehub.com/community",
    },
};

export default function CommunityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
