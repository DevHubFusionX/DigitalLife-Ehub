import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service – DigitalLife Ehub",
    description: "Read the terms and conditions for using the DigitalLife Ehub platform and services.",
};

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
