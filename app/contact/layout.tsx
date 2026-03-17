import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us – DigitalLife Ehub",
    description: "Get in touch with DigitalLife Ehub for support, partnership inquiries, or to learn more about our community.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
