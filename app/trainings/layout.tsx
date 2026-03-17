import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Trainings – Business Skills, AI Tools & Marketing Masterclasses",
    description:
        "Access the DigitalLife Ehub learning library: business guides, AI tools training, marketing masterclasses, and expert-led sessions for self-paced professional development.",
    keywords: [
        "DigitalLife Ehub trainings",
        "business training",
        "AI tools training",
        "marketing masterclasses",
        "professional development",
        "business education",
        "learning library",
        "entrepreneur training",
    ],
    openGraph: {
        title: "DigitalLife Ehub Trainings – Level Up Your Business Skills",
        description:
            "Business guides, AI tools training, and marketing masterclasses — access expert-led learning at DigitalLife Ehub.",
        url: "https://digitallife-ehub.com/trainings",
    },
    alternates: {
        canonical: "https://digitallife-ehub.com/trainings",
    },
};

export default function TrainingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
