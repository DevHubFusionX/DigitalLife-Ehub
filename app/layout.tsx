import type { Metadata } from "next";
import { Inter, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/shared/Preloader";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import JsonLd from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-display",
  subsets: ["latin"],
});

const SITE_URL = "https://digitallife-ehub.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "DigitalLife Ehub – SME Growth Community, Mentorship & Business Visibility",
    template: "%s | DigitalLife Ehub",
  },
  description:
    "DigitalLife Ehub is the premier growth community for SMEs, creators, and professionals. Access mentorship, business visibility tools, specialized networking circles, and exclusive founding member benefits to scale your business.",
  keywords: [
    "DigitalLife Ehub",
    "digitallife ehub",
    "SME growth community",
    "business mentorship",
    "business visibility tools",
    "founding member community",
    "entrepreneur networking",
    "small business growth",
    "startup community",
    "business coaching",
    "professional development",
    "online business community",
    "mentorship pairing",
    "business accelerator",
    "digital entrepreneurship",
  ],
  authors: [{ name: "DigitalLife Ehub" }],
  creator: "DigitalLife Ehub",
  publisher: "DigitalLife Ehub",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "DigitalLife Ehub",
    title: "DigitalLife Ehub – SME Growth Community, Mentorship & Business Visibility",
    description:
      "Join the DigitalLife Ehub community — mentorship, visibility tools, and specialized networking circles designed to scale your business. Become a founding member today.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "DigitalLife Ehub – Your Gateway to Business Growth",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "DigitalLife Ehub – SME Growth Community & Mentorship",
    description:
      "Access mentorship, business visibility tools, and exclusive founding member benefits. Join DigitalLife Ehub today.",
    images: ["/opengraph-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },

  alternates: {
    canonical: SITE_URL,
  },

  category: "Business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${instrumentSans.variable} antialiased`}
      >
        <JsonLd />
        <Preloader />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
