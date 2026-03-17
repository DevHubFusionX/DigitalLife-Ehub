import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cookie Policy – DigitalLife Ehub",
    description: "Information about how we use cookies and similar technologies on the DigitalLife Ehub platform.",
};

export default function CookiesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
