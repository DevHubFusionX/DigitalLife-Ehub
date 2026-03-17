import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy – DigitalLife Ehub",
    description: "Learn how DigitalLife Ehub collects, uses, and protects your personal data.",
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
